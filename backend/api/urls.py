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
    # User tickets
    TicketListView,
    TicketPurchaseView,
    # Admin
    AdminStatsView,
    AdminUserListView,
    AdminUserDetailView,
    AdminTransactionListView,
    AdminTransactionApproveView,
    AdminTransactionRejectView,
    AdminTaskListView,
    AdminTaskDetailView,
    AdminActivityFeedListView,
    AdminActivityFeedDetailView,
    AdminBinanceOrderListView,
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

    # ── User Tickets ──
    path('tickets/', TicketListView.as_view(), name='ticket-list'),
    path('tickets/purchase/', TicketPurchaseView.as_view(), name='ticket-purchase'),

    # ── Admin ──
    path('admin/stats/', AdminStatsView.as_view(), name='admin-stats'),
    path('admin/users/', AdminUserListView.as_view(), name='admin-user-list'),
    path('admin/users/<int:pk>/', AdminUserDetailView.as_view(), name='admin-user-detail'),
    path('admin/transactions/', AdminTransactionListView.as_view(), name='admin-transaction-list'),
    path('admin/transactions/<int:pk>/approve/', AdminTransactionApproveView.as_view(), name='admin-transaction-approve'),
    path('admin/transactions/<int:pk>/reject/', AdminTransactionRejectView.as_view(), name='admin-transaction-reject'),
    path('admin/tasks/', AdminTaskListView.as_view(), name='admin-task-list'),
    path('admin/tasks/<int:pk>/', AdminTaskDetailView.as_view(), name='admin-task-detail'),
    path('admin/activity-feed/', AdminActivityFeedListView.as_view(), name='admin-activity-feed-list'),
    path('admin/activity-feed/<int:pk>/', AdminActivityFeedDetailView.as_view(), name='admin-activity-feed-detail'),
    path('admin/orders/', AdminBinanceOrderListView.as_view(), name='admin-orders'),
]