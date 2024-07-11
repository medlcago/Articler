from PIL import Image
from django.core.validators import FileExtensionValidator
from django.db.models.fields.files import ImageFieldFile
from rest_framework.exceptions import ValidationError

from config import settings


def validate_image(value: ImageFieldFile) -> None:
    validator = FileExtensionValidator(allowed_extensions=settings.ALLOWED_IMAGE_EXTENSIONS)
    try:
        validator(value)
        image = Image.open(value)
        image.verify()
    except Exception as ex:
        print(f"{ex.__class__}: {ex}")
        raise ValidationError("Unable to process this image")
