from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Task, UserTask, Transaction, PortfolioEntry, ActivityFeed, BinancePayOrder, UserTicketOption



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    password2 = serializers.CharField(write_only=True, label="Confirm Password")
    first_name = serializers.CharField(required=False, allow_blank=True, default='')
    last_name = serializers.CharField(required=False, allow_blank=True, default='')

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password2']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        if User.objects.filter(email=data.get('email', '')).exists():
            raise serializers.ValidationError({"email": "This email is already registered."})
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    """Lightweight user serializer for /auth/me endpoint."""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined', 'is_staff', 'is_active']


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    level_label = serializers.ReadOnlyField()
    members_target = serializers.ReadOnlyField()
    recharge_target = serializers.ReadOnlyField()
    is_staff = serializers.BooleanField(source='user.is_staff', read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            'username', 'email', 'first_name', 'last_name', 'is_staff',
            'level', 'level_label',
            'total_earnings', 'personal_gain', 'recharge_amount',
            'total_assets', 'today_earnings', 'yesterday_earnings',
            'remaining_clicks', 'total_clicks', 'members_referred',
            'vouchers', 'wallet_address', 'avatar_url',
            'members_target', 'recharge_target',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'task_type',
            'reward_points', 'reward_amount', 'total_steps', 'is_active',
            'created_at',
        ]


class UserTaskSerializer(serializers.ModelSerializer):
    task = TaskSerializer(read_only=True)
    progress_pct = serializers.SerializerMethodField()

    class Meta:
        model = UserTask
        fields = [
            'id', 'task', 'status', 'progress', 'progress_pct',
            'started_at', 'completed_at', 'claimed_at',
        ]

    def get_progress_pct(self, obj):
        if obj.task.total_steps == 0:
            return 0
        return round((obj.progress / obj.task.total_steps) * 100)


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            'id', 'transaction_type', 'amount', 'status',
            'note', 'created_at', 'processed_at',
        ]
        read_only_fields = ['status', 'processed_at', 'created_at']


class RechargeSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=12, decimal_places=2, min_value=10)
    note = serializers.CharField(required=False, allow_blank=True, default='')


class WithdrawalSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=12, decimal_places=2, min_value=10)
    wallet_address = serializers.CharField(max_length=255)
    note = serializers.CharField(required=False, allow_blank=True, default='')


class PortfolioEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioEntry
        fields = ['label', 'value', 'period', 'recorded_at']


class ActivityFeedSerializer(serializers.ModelSerializer):
    time_ago = serializers.SerializerMethodField()

    class Meta:
        model = ActivityFeed
        fields = ['id', 'text', 'icon', 'color', 'time_ago', 'is_public', 'created_at']

    def get_time_ago(self, obj):
        from django.utils import timezone
        diff = timezone.now() - obj.created_at
        seconds = int(diff.total_seconds())
        if seconds < 60:
            return f"{seconds}s ago"
        elif seconds < 3600:
            return f"{seconds // 60}m ago"
        elif seconds < 86400:
            return f"{seconds // 3600}h ago"
        else:
            return f"{seconds // 86400}d ago"


class DashboardSerializer(serializers.Serializer):
    profile = UserProfileSerializer()
    recent_transactions = TransactionSerializer(many=True)
    activity_feed = ActivityFeedSerializer(many=True)
    portfolio_value = serializers.DecimalField(max_digits=14, decimal_places=2)
    portfolio_return_pct = serializers.DecimalField(max_digits=6, decimal_places=2)


class BinancePayCreateSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=12, decimal_places=2, min_value=10)


class BinancePayOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = BinancePayOrder
        fields = [
            'id', 'prepay_id', 'merchant_trade_no', 'amount_usdt',
            'status', 'qr_code_url', 'checkout_url', 'binance_pay_url',
            'created_at', 'confirmed_at', 'expires_at',
        ]


# =============================================
# ADMIN SERIALIZERS
# =============================================

class AdminUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'level', 'total_earnings', 'personal_gain', 'recharge_amount',
            'total_assets', 'today_earnings', 'yesterday_earnings',
            'remaining_clicks', 'total_clicks', 'members_referred',
            'vouchers', 'wallet_address', 'avatar_url',
            'created_at', 'updated_at',
        ]


class AdminUserSerializer(serializers.ModelSerializer):
    profile = AdminUserProfileSerializer(read_only=True)
    transaction_count = serializers.SerializerMethodField()
    total_deposited = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'is_staff', 'is_active', 'date_joined', 'last_login',
            'profile', 'transaction_count', 'total_deposited',
        ]

    def get_transaction_count(self, obj):
        return obj.transactions.count()

    def get_total_deposited(self, obj):
        from django.db.models import Sum
        result = obj.transactions.filter(
            transaction_type='recharge', status='approved'
        ).aggregate(total=Sum('amount'))['total']
        return float(result or 0)


class AdminTransactionSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    user_id = serializers.IntegerField(source='user.id', read_only=True)

    class Meta:
        model = Transaction
        fields = [
            'id', 'user_id', 'username', 'email',
            'transaction_type', 'amount', 'status',
            'note', 'created_at', 'processed_at',
        ]


class AdminActivityFeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityFeed
        fields = ['id', 'text', 'icon', 'color', 'is_public', 'created_at']


class AdminTaskSerializer(serializers.ModelSerializer):
    user_count = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'task_type',
            'reward_points', 'reward_amount', 'total_steps',
            'is_active', 'created_at', 'user_count',
        ]

    def get_user_count(self, obj):
        return obj.user_tasks.count()


class AdminBinanceOrderSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = BinancePayOrder
        fields = [
            'id', 'username', 'prepay_id', 'merchant_trade_no',
            'amount_usdt', 'status', 'created_at', 'confirmed_at', 'expires_at',
        ]


class UserTicketOptionSerializer(serializers.ModelSerializer):
    time_left = serializers.SerializerMethodField()

    class Meta:
        model = UserTicketOption
        fields = [
            'id', 'album_id', 'title', 'artist', 'price', 'profit',
            'image_url', 'duration_seconds', 'status', 'created_at',
            'settled_at', 'time_left',
        ]

    def get_time_left(self, obj):
        if obj.status == 'complete':
            return 0
        from django.utils import timezone
        elapsed = (timezone.now() - obj.created_at).total_seconds()
        remaining = int(obj.duration_seconds - elapsed)
        return max(remaining, 0)

