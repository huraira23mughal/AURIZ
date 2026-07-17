from django.contrib import admin
from .models import UserProfile, Task, UserTask, Transaction, PortfolioEntry, ActivityFeed, UserTicketOption


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'level', 'total_earnings', 'personal_gain', 'total_assets', 'members_referred']
    list_filter = ['level']
    search_fields = ['user__username', 'user__email']


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'task_type', 'reward_points', 'reward_amount', 'total_steps', 'is_active']
    list_filter = ['task_type', 'is_active']
    search_fields = ['title']


@admin.register(UserTask)
class UserTaskAdmin(admin.ModelAdmin):
    list_display = ['user', 'task', 'status', 'progress', 'started_at', 'completed_at']
    list_filter = ['status']
    search_fields = ['user__username', 'task__title']


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['user', 'transaction_type', 'amount', 'status', 'created_at']
    list_filter = ['transaction_type', 'status']
    search_fields = ['user__username']


@admin.register(PortfolioEntry)
class PortfolioEntryAdmin(admin.ModelAdmin):
    list_display = ['user', 'period', 'label', 'value', 'recorded_at']
    list_filter = ['period']


@admin.register(ActivityFeed)
class ActivityFeedAdmin(admin.ModelAdmin):
    list_display = ['text', 'icon', 'is_public', 'created_at']
    list_filter = ['is_public']


@admin.register(UserTicketOption)
class UserTicketOptionAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'price', 'profit', 'status', 'created_at']
    list_filter = ['status']
    search_fields = ['user__username', 'title']

