from django.contrib.auth import get_user_model
from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created, post_password_reset

from .models import Profile

User = get_user_model()


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if not hasattr(instance, "profile"):
        with transaction.atomic():
            Profile.objects.create(user=instance)


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    print(f"Token {reset_password_token.key!r} created for user {reset_password_token.user.email!r}")


@receiver(post_password_reset)
def password_reset(sender, user, reset_password_token, *args, **kwargs):
    print(f"Password reset for user {user.email!r}")
