from typing import TYPE_CHECKING

from config import settings

if TYPE_CHECKING:
    from ..apps.users.models import Profile


def get_avatar_upload_path(instance: "Profile", filename: str) -> str:
    return settings.AVATARS_PATH.format(user_id=instance.user.id, filename=filename)
