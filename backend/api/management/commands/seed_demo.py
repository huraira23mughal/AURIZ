"""
Management command to seed demo data for AURIZ.
Run: python manage.py seed_demo
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import UserProfile, Task, UserTask, ActivityFeed, PortfolioEntry
from decimal import Decimal


class Command(BaseCommand):
    help = "Seed demo data for AURIZ platform"

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding demo data...")

        # ── Demo User ──
        user, created = User.objects.get_or_create(
            username="alex",
            defaults={"email": "alex.johnson@auriz.com", "first_name": "Alex", "last_name": "Johnson"},
        )
        if created:
            user.set_password("auriz2024")
            user.save()
            self.stdout.write("  Created user: alex / auriz2024")
        else:
            self.stdout.write("  User 'alex' already exists")

        # ── Profile ──
        profile, _ = UserProfile.objects.get_or_create(user=user)
        profile.level = 2
        profile.total_earnings = Decimal("1250.00")
        profile.personal_gain = Decimal("450.00")
        profile.recharge_amount = Decimal("300.00")
        profile.total_assets = Decimal("25840.00")
        profile.today_earnings = Decimal("125.50")
        profile.yesterday_earnings = Decimal("118.20")
        profile.remaining_clicks = 12
        profile.total_clicks = 150
        profile.members_referred = 1
        profile.vouchers = 245
        profile.save()
        self.stdout.write("  Profile updated")

        # ── Tasks ──
        tasks_data = [
            {"title": "Watch 5 Ads Daily", "task_type": "watch_ad", "reward_points": 10, "reward_amount": "5.00", "total_steps": 5},
            {"title": "Daily Deposit $100", "task_type": "deposit", "reward_points": 15, "reward_amount": "10.00", "total_steps": 1},
            {"title": "Watch 20 Ads", "task_type": "watch_ad", "reward_points": 30, "reward_amount": "15.00", "total_steps": 20},
        ]
        for i, td in enumerate(tasks_data):
            task, _ = Task.objects.get_or_create(title=td["title"], defaults={
                "task_type": td["task_type"],
                "reward_points": td["reward_points"],
                "reward_amount": Decimal(td["reward_amount"]),
                "total_steps": td["total_steps"],
                "is_active": True,
            })

            status_map = ["inProgress", "completed", "unstarted"]
            progress_map = [2, 1, 0]
            ut, _ = UserTask.objects.get_or_create(user=user, task=task)
            ut.status = status_map[i]
            ut.progress = progress_map[i]
            ut.save()

        self.stdout.write("  Tasks seeded")

        # ── Activity Feed ──
        feed_items = [
            {"icon": "", "text": "Alex reinvested $500 in Tesla Energy", "color": "#4ade80"},
            {"icon": "", "text": "Sarah earned $120 daily reward", "color": "#D4AF37"},
            {"icon": "", "text": "New VIP plan activated - Gold tier", "color": "#818cf8"},
            {"icon": "", "text": "Withdrawal of $250 processed", "color": "#4ade80"},
            {"icon": "", "text": "Task milestone reached: 18 completed", "color": "#D4AF37"},
        ]
        for item in feed_items:
            ActivityFeed.objects.get_or_create(text=item["text"], defaults={
                "icon": item["icon"],
                "color": item["color"],
                "is_public": True,
            })
        self.stdout.write("  Activity feed seeded")

        # ── Portfolio Entries ──
        daily_data = [
            ("8AM", 24800), ("10AM", 25100), ("12PM", 24600),
            ("2PM", 25400), ("4PM", 25200), ("6PM", 25840),
        ]
        for label, value in daily_data:
            PortfolioEntry.objects.get_or_create(user=user, label=label, period="D", defaults={"value": Decimal(str(value))})

        weekly_data = [
            ("Mon", 24000), ("Tue", 24500), ("Wed", 24200), ("Thu", 25000),
            ("Fri", 24800), ("Sat", 25400), ("Sun", 25840),
        ]
        for label, value in weekly_data:
            PortfolioEntry.objects.get_or_create(user=user, label=label, period="W", defaults={"value": Decimal(str(value))})

        self.stdout.write("  Portfolio chart data seeded")

        self.stdout.write(self.style.SUCCESS("Done! Demo data seeded. Login: alex / auriz2024"))
