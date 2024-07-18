from django.conf import settings
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django_rest_passwordreset.signals import reset_password_token_created, post_password_reset

RESET_PASSWORD_URL = getattr(settings, "RESET_PASSWORD_URL")


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
