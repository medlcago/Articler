from celery import shared_task
from django.core.mail import send_mail


@shared_task
def send_email_user(email, subject, message, from_email, **kwargs):
    return send_mail(
        subject=subject,
        message=message,
        from_email=from_email,
        recipient_list=[email],
        **kwargs
    )