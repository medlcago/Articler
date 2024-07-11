from django.db import models

from common.utils import get_avatar_upload_path
from common.validators import validate_image


class Profile(models.Model):
    user = models.OneToOneField("User", on_delete=models.CASCADE, related_name="profile")
    avatar = models.ImageField(upload_to=get_avatar_upload_path, blank=True, null=True,
                               validators=[
                                   validate_image
                               ])
    status = models.CharField(max_length=128, blank=True, null=True)

    def __str__(self):
        return str(self.user)

    def save(self, *args, **kwargs):
        if self.pk:
            old_instance = Profile.objects.get(pk=self.pk)
            if old_instance.avatar and self.avatar != old_instance.avatar:
                old_instance.avatar.delete(save=False)
        super().save(*args, **kwargs)
