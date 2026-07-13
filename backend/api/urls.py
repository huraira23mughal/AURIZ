from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RegisterView,
    MeView,
    LogoutView,
    ProfileView,
    DashboardView,
    TaskListView,
    StartTaskView,
    ClaimTaskView,
    AssetsView,
    AssetsChartView,
    TransactionListView,
    RechargeView,
    WithdrawalView,
    BinancePayCreateView,
    BinancePayWebhookView,
    BinancePayStatusView,
    BinancePayDemoConfirmView,
    health_check,
)

urlpatterns = [
    # ── Health ──
    path('', health_check, name='health-check'),

    # ── Auth ──
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('auth/me/', MeView.as_view(), name='me'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),

    # ── Profile ──
    path('profile/', ProfileView.as_view(), name='profile'),

    # ── Dashboard ──
    path('dashboard/', DashboardView.as_view(), name='dashboard'),

    # ── Tasks ──
    path('tasks/', TaskListView.as_view(), name='task-list'),
    path('tasks/<int:pk>/start/', StartTaskView.as_view(), name='task-start'),
    path('tasks/<int:pk>/claim/', ClaimTaskView.as_view(), name='task-claim'),

    # ── Assets ──
    path('assets/', AssetsView.as_view(), name='assets'),
    path('assets/chart/', AssetsChartView.as_view(), name='assets-chart'),

    # ── Transactions ──
    path('transactions/', TransactionListView.as_view(), name='transaction-list'),
    path('recharge/', RechargeView.as_view(), name='recharge'),
    path('withdraw/', WithdrawalView.as_view(), name='withdraw'),

    # ── Binance Pay ──
    path('payment/binance/create/', BinancePayCreateView.as_view(), name='binance-pay-create'),
    path('payment/binance/webhook/', BinancePayWebhookView.as_view(), name='binance-pay-webhook'),
    path('payment/binance/status/<str:prepay_id>/', BinancePayStatusView.as_view(), name='binance-pay-status'),
    path('payment/binance/demo-confirm/<str:prepay_id>/', BinancePayDemoConfirmView.as_view(), name='binance-pay-demo-confirm'),
]