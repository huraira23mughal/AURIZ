import hashlib
import hmac
import json
import time
import uuid
from decimal import Decimal

import requests as http_requests
from django.conf import settings
from django.utils import timezone
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

from django.contrib.auth.models import User
from .models import UserProfile, Task, UserTask, Transaction, PortfolioEntry, ActivityFeed, BinancePayOrder
from .serializers import (
    RegisterSerializer,
    UserSerializer,
    UserProfileSerializer,
    UserTaskSerializer,
    TransactionSerializer,
    RechargeSerializer,
    WithdrawalSerializer,
    PortfolioEntrySerializer,
    ActivityFeedSerializer,
    BinancePayCreateSerializer,
    BinancePayOrderSerializer,
)


# =============================================
# AUTH
# =============================================

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            profile, _ = UserProfile.objects.get_or_create(user=user)
            return Response(
                {
                    "message": "Account created successfully.",
                    "user": UserSerializer(user).data,
                    "profile": UserProfileSerializer(profile).data,
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MeView(APIView):
    """Get current authenticated user info."""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        return Response({
            "user": UserSerializer(request.user).data,
            "profile": UserProfileSerializer(profile).data,
        })


class LogoutView(APIView):
    """Blacklist the refresh token to log out."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response({"message": "Logged out successfully."}, status=status.HTTP_200_OK)
        except Exception:
            return Response({"message": "Logged out."}, status=status.HTTP_200_OK)


# =============================================
# PROFILE
# =============================================

class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def patch(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =============================================
# DASHBOARD
# =============================================

class DashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        recent_txns = Transaction.objects.filter(user=request.user).order_by('-created_at')[:5]
        feed = ActivityFeed.objects.filter(is_public=True)[:6]

        portfolio_value = float(profile.total_assets)
        portfolio_return_pct = 13.36

        data = {
            "profile": UserProfileSerializer(profile).data,
            "recent_transactions": TransactionSerializer(recent_txns, many=True).data,
            "activity_feed": ActivityFeedSerializer(feed, many=True).data,
            "portfolio_value": portfolio_value or 12450.00,
            "portfolio_return_pct": portfolio_return_pct,
        }
        return Response(data)


# =============================================
# TASKS
# =============================================

class TaskListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        active_tasks = Task.objects.filter(is_active=True)
        for task in active_tasks:
            UserTask.objects.get_or_create(user=request.user, task=task)

        user_tasks = UserTask.objects.filter(user=request.user).select_related('task')
        serializer = UserTaskSerializer(user_tasks, many=True)

        completed_count = user_tasks.filter(status='completed').count()
        in_progress_count = user_tasks.filter(status='inProgress').count()
        profile, _ = UserProfile.objects.get_or_create(user=request.user)

        return Response({
            "tasks": serializer.data,
            "summary": {
                "vouchers": profile.vouchers,
                "completed": completed_count,
                "will_complete": in_progress_count,
            }
        })


class StartTaskView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            user_task = UserTask.objects.get(user=request.user, task_id=pk)
        except UserTask.DoesNotExist:
            return Response({"error": "Task not found."}, status=status.HTTP_404_NOT_FOUND)

        if user_task.status not in ['unstarted', 'inProgress']:
            return Response({"error": "Task already completed or claimed."}, status=status.HTTP_400_BAD_REQUEST)

        user_task.status = 'inProgress'
        user_task.progress = min(user_task.progress + 1, user_task.task.total_steps)
        if user_task.started_at is None:
            user_task.started_at = timezone.now()
        if user_task.progress >= user_task.task.total_steps:
            user_task.status = 'completed'
            user_task.completed_at = timezone.now()
        user_task.save()

        return Response(UserTaskSerializer(user_task).data)


class ClaimTaskView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            user_task = UserTask.objects.get(user=request.user, task_id=pk)
        except UserTask.DoesNotExist:
            return Response({"error": "Task not found."}, status=status.HTTP_404_NOT_FOUND)

        if user_task.status != 'completed':
            return Response({"error": "Task not completed yet."}, status=status.HTTP_400_BAD_REQUEST)

        user_task.status = 'claimed'
        user_task.claimed_at = timezone.now()
        user_task.save()

        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        profile.vouchers += user_task.task.reward_points
        profile.total_earnings += user_task.task.reward_amount
        profile.save()

        if user_task.task.reward_amount > 0:
            Transaction.objects.create(
                user=request.user,
                transaction_type='reward',
                amount=user_task.task.reward_amount,
                status='approved',
                note=f"Task reward: {user_task.task.title}",
                processed_at=timezone.now(),
            )

        return Response({
            "message": "Reward claimed successfully!",
            "reward_points": user_task.task.reward_points,
            "reward_amount": str(user_task.task.reward_amount),
        })


# =============================================
# ASSETS
# =============================================

class AssetsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        return Response({
            "total_assets": float(profile.total_assets) or 25840.00,
            "today_earnings": float(profile.today_earnings) or 125.50,
            "yesterday_earnings": float(profile.yesterday_earnings) or 118.20,
            "remaining_clicks": profile.remaining_clicks,
            "total_clicks": profile.total_clicks,
        })


class AssetsChartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        period = request.query_params.get('period', 'D').upper()
        valid_periods = ['D', 'W', 'M', 'Y']
        if period not in valid_periods:
            period = 'D'

        entries = PortfolioEntry.objects.filter(user=request.user, period=period).order_by('recorded_at')

        if not entries.exists():
            demo = {
                'D': [{"label": "8AM", "value": 24800}, {"label": "10AM", "value": 25100}, {"label": "12PM", "value": 24600}, {"label": "2PM", "value": 25400}, {"label": "4PM", "value": 25200}, {"label": "6PM", "value": 25840}],
                'W': [{"label": "Mon", "value": 24000}, {"label": "Tue", "value": 24500}, {"label": "Wed", "value": 24200}, {"label": "Thu", "value": 25000}, {"label": "Fri", "value": 24800}, {"label": "Sat", "value": 25400}, {"label": "Sun", "value": 25840}],
                'M': [{"label": "W1", "value": 22000}, {"label": "W2", "value": 23100}, {"label": "W3", "value": 24300}, {"label": "W4", "value": 25840}],
                'Y': [{"label": "Jan", "value": 18000}, {"label": "Mar", "value": 19500}, {"label": "May", "value": 21000}, {"label": "Jul", "value": 22800}, {"label": "Sep", "value": 24100}, {"label": "Nov", "value": 25840}],
            }
            return Response({"period": period, "data": demo[period]})

        serializer = PortfolioEntrySerializer(entries, many=True)
        return Response({"period": period, "data": serializer.data})


# =============================================
# TRANSACTIONS
# =============================================

class TransactionListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        txns = Transaction.objects.filter(user=request.user).order_by('-created_at')
        serializer = TransactionSerializer(txns, many=True)
        return Response(serializer.data)


class RechargeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = RechargeSerializer(data=request.data)
        if serializer.is_valid():
            txn = Transaction.objects.create(
                user=request.user,
                transaction_type='recharge',
                amount=serializer.validated_data['amount'],
                note=serializer.validated_data.get('note', ''),
                status='pending',
            )
            return Response(
                {"message": "Recharge request submitted.", "transaction": TransactionSerializer(txn).data},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WithdrawalView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = WithdrawalSerializer(data=request.data)
        if serializer.is_valid():
            profile, _ = UserProfile.objects.get_or_create(user=request.user)
            amount = serializer.validated_data['amount']

            if float(profile.total_earnings) < float(amount):
                return Response({"error": "Insufficient balance."}, status=status.HTTP_400_BAD_REQUEST)

            txn = Transaction.objects.create(
                user=request.user,
                transaction_type='withdrawal',
                amount=amount,
                note=serializer.validated_data.get('note', ''),
                status='pending',
            )

            if not profile.wallet_address:
                profile.wallet_address = serializer.validated_data['wallet_address']
                profile.save()

            return Response(
                {"message": "Withdrawal request submitted.", "transaction": TransactionSerializer(txn).data},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =============================================
# BINANCE PAY
# =============================================

def _binance_signature(payload_str, secret_key):
    """Generate HMAC SHA512 signature for Binance Pay."""
    return hmac.new(secret_key.encode('utf-8'), payload_str.encode('utf-8'), hashlib.sha512).hexdigest().upper()


class BinancePayCreateView(APIView):
    """Create a Binance Pay order for recharge."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = BinancePayCreateSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        amount = serializer.validated_data['amount']
        merchant_trade_no = uuid.uuid4().hex[:32]
        timestamp = str(int(time.time() * 1000))
        nonce = uuid.uuid4().hex[:32]

        api_key = settings.BINANCE_PAY_API_KEY
        secret_key = settings.BINANCE_PAY_SECRET_KEY

        # If no API keys configured, create a demo order
        if not api_key or api_key == 'your_binance_pay_api_key_here':
            order = BinancePayOrder.objects.create(
                user=request.user,
                prepay_id=f"DEMO-{merchant_trade_no}",
                merchant_trade_no=merchant_trade_no,
                amount_usdt=amount,
                status='pending',
                qr_code_url='',
                checkout_url='',
                binance_pay_url='',
                raw_response={"mode": "demo", "note": "Configure BINANCE_PAY_API_KEY in .env for real payments"},
                expires_at=timezone.now() + timezone.timedelta(minutes=30),
            )

            return Response({
                "message": "Demo payment order created. Configure Binance Pay API keys in .env for real payments.",
                "order": BinancePayOrderSerializer(order).data,
                "demo_mode": True,
                "wallet_address": "TRC20: TYDzsYUEpvnYmQk4zGP9sWWcTEd2MiAtW6",
                "instructions": "Send the exact USDT amount to the wallet address above, then paste the transaction hash to confirm.",
            }, status=status.HTTP_201_CREATED)

        # ── Real Binance Pay API call ──
        body = {
            "env": {
                "terminalType": "WEB"
            },
            "merchantTradeNo": merchant_trade_no,
            "orderAmount": str(amount),
            "currency": "USDT",
            "description": f"AURIZ Recharge - {amount} USDT",
            "goodsDetails": [{
                "goodsType": "02",
                "goodsCategory": "Z000",
                "referenceGoodsId": "recharge",
                "goodsName": "AURIZ Account Recharge",
                "goodsDetail": f"Recharge {amount} USDT to AURIZ account",
            }],
            "returnUrl": f"{settings.FRONTEND_BASE_URL}/dashboard",
            "cancelUrl": f"{settings.FRONTEND_BASE_URL}/recharge",
            "webhookUrl": f"{settings.BACKEND_BASE_URL}/api/payment/binance/webhook/",
        }

        body_json = json.dumps(body)
        payload = f"{timestamp}\n{nonce}\n{body_json}\n"
        signature = _binance_signature(payload, secret_key)

        headers = {
            "Content-Type": "application/json",
            "BinancePay-Timestamp": timestamp,
            "BinancePay-Nonce": nonce,
            "BinancePay-Certificate-SN": api_key,
            "BinancePay-Signature": signature,
        }

        try:
            resp = http_requests.post(
                f"{settings.BINANCE_PAY_BASE_URL}/binancepay/openapi/v3/order",
                headers=headers,
                json=body,
                timeout=30,
            )
            data = resp.json()

            if data.get("status") == "SUCCESS":
                order_data = data["data"]
                order = BinancePayOrder.objects.create(
                    user=request.user,
                    prepay_id=order_data.get("prepayId", ""),
                    merchant_trade_no=merchant_trade_no,
                    amount_usdt=amount,
                    status='pending',
                    qr_code_url=order_data.get("qrcodeLink", ""),
                    checkout_url=order_data.get("checkoutUrl", ""),
                    binance_pay_url=order_data.get("deeplink", ""),
                    raw_response=data,
                    expires_at=timezone.now() + timezone.timedelta(minutes=30),
                )
                return Response({
                    "message": "Payment order created.",
                    "order": BinancePayOrderSerializer(order).data,
                    "demo_mode": False,
                }, status=status.HTTP_201_CREATED)
            else:
                return Response({
                    "error": "Binance Pay order creation failed.",
                    "details": data,
                }, status=status.HTTP_502_BAD_GATEWAY)

        except Exception as e:
            return Response({
                "error": f"Failed to connect to Binance Pay: {str(e)}"
            }, status=status.HTTP_502_BAD_GATEWAY)


class BinancePayWebhookView(APIView):
    """Handle Binance Pay payment confirmation webhook."""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data

        # Verify webhook signature if in production
        biz_type = data.get("bizType", "")
        biz_data = data.get("data", {})

        if isinstance(biz_data, str):
            try:
                biz_data = json.loads(biz_data)
            except json.JSONDecodeError:
                return Response({"returnCode": "FAIL"}, status=status.HTTP_400_BAD_REQUEST)

        merchant_trade_no = biz_data.get("merchantTradeNo", "")
        pay_status = biz_data.get("orderStatus", "")

        try:
            order = BinancePayOrder.objects.get(merchant_trade_no=merchant_trade_no)
        except BinancePayOrder.DoesNotExist:
            return Response({"returnCode": "FAIL"}, status=status.HTTP_404_NOT_FOUND)

        if pay_status == "PAID":
            order.status = 'paid'
            order.confirmed_at = timezone.now()
            order.save()

            # Credit the user's account
            profile, _ = UserProfile.objects.get_or_create(user=order.user)
            profile.recharge_amount += order.amount_usdt
            profile.total_assets += order.amount_usdt
            profile.save()

            # Log transaction
            Transaction.objects.create(
                user=order.user,
                transaction_type='recharge',
                amount=order.amount_usdt,
                status='approved',
                note=f"Binance Pay recharge: {order.merchant_trade_no}",
                processed_at=timezone.now(),
            )

        elif pay_status in ["EXPIRED", "CANCELED"]:
            order.status = 'expired'
            order.save()

        return Response({"returnCode": "SUCCESS", "returnMessage": ""})


class BinancePayStatusView(APIView):
    """Poll payment status by prepay_id."""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, prepay_id):
        try:
            order = BinancePayOrder.objects.get(prepay_id=prepay_id, user=request.user)
        except BinancePayOrder.DoesNotExist:
            return Response({"error": "Order not found."}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            "order": BinancePayOrderSerializer(order).data,
        })


class BinancePayDemoConfirmView(APIView):
    """In demo mode, manually confirm a payment (for testing)."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, prepay_id):
        try:
            order = BinancePayOrder.objects.get(prepay_id=prepay_id, user=request.user)
        except BinancePayOrder.DoesNotExist:
            return Response({"error": "Order not found."}, status=status.HTTP_404_NOT_FOUND)

        if order.status != 'pending':
            return Response({"error": "Order already processed."}, status=status.HTTP_400_BAD_REQUEST)

        # Mark as paid
        order.status = 'paid'
        order.confirmed_at = timezone.now()
        order.save()

        # Credit account
        profile, _ = UserProfile.objects.get_or_create(user=order.user)
        profile.recharge_amount += order.amount_usdt
        profile.total_assets += order.amount_usdt
        profile.save()

        Transaction.objects.create(
            user=order.user,
            transaction_type='recharge',
            amount=order.amount_usdt,
            status='approved',
            note=f"Demo recharge confirmed: {order.merchant_trade_no}",
            processed_at=timezone.now(),
        )

        return Response({
            "message": "Payment confirmed successfully!",
            "order": BinancePayOrderSerializer(order).data,
        })


# =============================================
# HEALTH CHECK
# =============================================

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def health_check(request):
    return Response({"status": "ok", "message": "AURIZ Backend Connected Successfully"})