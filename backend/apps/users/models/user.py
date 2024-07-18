from django.conf import settings
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from django.db import models
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from common.validators import validate_image


def get_avatar_upload_path(instance, filename: str) -> str:
    return settings.AVATARS_PATH.format(user_id=instance.id, filename=filename)


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, *, email: str, password: str, **extra_fields) -> "User":
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, *, email: str, password: str, **extra_fields) -> "User":
        extra_fields["is_superuser"] = False
        return self._create_user(
            email=email,
            password=password,
            **extra_fields
        )

    def create_superuser(self, *, email: str, password: str, **extra_fields) -> "User":
        extra_fields["is_superuser"] = True
        extra_fields["is_staff"] = True
        return self._create_user(
            email=email,
            password=password,
            **extra_fields
        )

    def create_admin(self, *, email: str, password: str, **extra_fields) -> "User":
        extra_fields["is_staff"] = True
        return self._create_user(
            email=email,
            password=password,
            **extra_fields
        )


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique=True)
    password = models.CharField(
        _("password"),
        max_length=128,
        validators=[
            validate_password
        ])
    date_joined = models.DateTimeField(_("registered"), auto_now_add=True)
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    status = models.CharField(max_length=128, blank=True, null=True)
    avatar = models.ImageField(upload_to=get_avatar_upload_path, blank=True, null=True,
                               validators=[
                                   validate_image
                               ])

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        ordering = ("id",)

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        if self.pk:
            old_instance = User.objects.get(pk=self.pk)
            if old_instance.avatar and self.avatar != old_instance.avatar:
                old_instance.avatar.delete(save=False)
        super().save(*args, **kwargs)

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

    @property
    def access_token(self):
        return str(AccessToken.for_user(self))

    @property
    def refresh_token(self):
        return str(RefreshToken.for_user(self))
