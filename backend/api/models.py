from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    level = models.IntegerField(default=1)
    total_earnings = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    personal_gain = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    recharge_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_assets = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    today_earnings = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    yesterday_earnings = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    remaining_clicks = models.IntegerField(default=20)
    total_clicks = models.IntegerField(default=0)
    members_referred = models.IntegerField(default=0)
    vouchers = models.IntegerField(default=0)
    wallet_address = models.CharField(max_length=255, blank=True, null=True)
    avatar_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} — LV{self.level}"

    @property
    def level_label(self):
        return f"LV{self.level}"

    @property
    def members_target(self):
        return self.level * 3

    @property
    def recharge_target(self):
        return self.level * 500


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()


class Task(models.Model):
    TASK_TYPES = [
        ('watch_ad', 'Watch Ads'),
        ('deposit', 'Deposit'),
        ('referral', 'Referral'),
        ('daily', 'Daily Login'),
    ]
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    task_type = models.CharField(max_length=50, choices=TASK_TYPES, default='daily')
    reward_points = models.IntegerField(default=10)
    reward_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_steps = models.IntegerField(default=1)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class UserTask(models.Model):
    STATUS_CHOICES = [
        ('unstarted', 'Unstarted'),
        ('inProgress', 'In Progress'),
        ('completed', 'Completed'),
        ('claimed', 'Claimed'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_tasks')
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='user_tasks')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='unstarted')
    progress = models.IntegerField(default=0)
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    claimed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'task')

    def __str__(self):
        return f"{self.user.username} — {self.task.title} [{self.status}]"


class Transaction(models.Model):
    TYPE_CHOICES = [
        ('recharge', 'Recharge'),
        ('withdrawal', 'Withdrawal'),
        ('earning', 'Earning'),
        ('reward', 'Reward'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    transaction_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} | {self.transaction_type} | ${self.amount}"


class PortfolioEntry(models.Model):
    PERIOD_CHOICES = [
        ('D', 'Daily'),
        ('W', 'Weekly'),
        ('M', 'Monthly'),
        ('Y', 'Yearly'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='portfolio_entries')
    label = models.CharField(max_length=10)
    value = models.DecimalField(max_digits=14, decimal_places=2)
    period = models.CharField(max_length=5, choices=PERIOD_CHOICES, default='D')
    recorded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['recorded_at']

    def __str__(self):
        return f"{self.user.username} | {self.period} | {self.label}: ${self.value}"


class ActivityFeed(models.Model):
    text = models.CharField(max_length=255)
    icon = models.CharField(max_length=10, default='')
    color = models.CharField(max_length=20, default='#D4AF37')
    created_at = models.DateTimeField(auto_now_add=True)
    is_public = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.text


class BinancePayOrder(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('expired', 'Expired'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='binance_orders')
    prepay_id = models.CharField(max_length=255, unique=True)
    merchant_trade_no = models.CharField(max_length=32, unique=True)
    amount_usdt = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    qr_code_url = models.URLField(blank=True)
    checkout_url = models.URLField(blank=True)
    binance_pay_url = models.URLField(blank=True)
    raw_response = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    confirmed_at = models.DateTimeField(null=True, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} | {self.amount_usdt} USDT | {self.status}"


class UserTicketOption(models.Model):
    STATUS_CHOICES = [
        ('processing', 'Processing'),
        ('complete', 'Complete'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ticket_options')
    album_id = models.IntegerField()
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    profit = models.DecimalField(max_digits=12, decimal_places=2)
    image_url = models.URLField(blank=True, null=True)
    duration_seconds = models.IntegerField(default=60)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='processing')
    created_at = models.DateTimeField(auto_now_add=True)
    settled_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} | {self.title} | {self.status}"

    def is_settled(self):
        if self.status == 'complete':
            return True
        import datetime
        from django.utils import timezone
        elapsed = (timezone.now() - self.created_at).total_seconds()
        if elapsed >= self.duration_seconds:
            self.status = 'complete'
            self.settled_at = self.created_at + datetime.timedelta(seconds=self.duration_seconds)
            self.save()
            
            # Credit user balance & earnings
            profile, _ = UserProfile.objects.get_or_create(user=self.user)
            profile.total_assets += (self.price + self.profit)
            profile.total_earnings += self.profit
            profile.today_earnings += self.profit
            profile.save()
            
            # Log Transaction
            Transaction.objects.create(
                user=self.user,
                transaction_type='earning',
                amount=self.profit,
                status='approved',
                note=f"Yield from ticket option: {self.title}",
                processed_at=timezone.now()
            )
            return True
        return False

