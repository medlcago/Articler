from django.contrib.auth import get_user_model
from django.core.validators import MinLengthValidator, MaxLengthValidator
from django.db import models

User = get_user_model()


class Post(models.Model):
    class Status(models.IntegerChoices):
        DRAFT = (0, "Черновик")
        PUBLISHED = (1, "Опубликовано")

    author = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="posts", null=True)
    title = models.CharField(
        max_length=255,
        blank=False,
        null=False,
        validators=[
            MinLengthValidator(5), MaxLengthValidator(255)
        ]
    )
    description = models.TextField(blank=False, null=False, validators=[MinLengthValidator(128)])
    is_published = models.BooleanField(
        choices=tuple(map(lambda x: (bool(x[0]), x[1]), Status.choices)),
        default=Status.DRAFT,
        blank=False,
        null=False
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = models.Manager()

    def __str__(self):
        return f"{self.title} [{self.author}]"

    class Meta:
        ordering = ("-created_at",)
