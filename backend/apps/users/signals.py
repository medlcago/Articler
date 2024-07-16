from django.contrib.auth import get_user_model
from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django_rest_passwordreset.signals import reset_password_token_created, post_password_reset

from config.settings import RESET_PASSWORD_URL
from .models import Profile

User = get_user_model()


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if not hasattr(instance, "profile"):
        with transaction.atomic():
            Profile.objects.create(user=instance)


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    subject = "Password Reset"
    from_email = "noreply@articler.com"
    context = {
        "user": reset_password_token.user.email,
        "reset_url": RESET_PASSWORD_URL.format(token=reset_password_token.key)
    }
    html_content = render_to_string("email/password_reset.html", context)
    text_content = strip_tags(html_content)
    reset_password_token.user.email_user(
        subject=subject,
        message=text_content,
        from_email=from_email,
        html_message=html_content
    )


@receiver(post_password_reset)
def password_reset(sender, user, reset_password_token, *args, **kwargs):
    print(f"Password reset for user {user.email!r}")
