from django.utils.text import Truncator
from rest_framework import serializers

from ..models import Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    truncated_description = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            "id", "author", "title", "description",
            "truncated_description", "is_published", "created_at", "updated_at",
        )

    def get_truncated_description(self, obj):
        return Truncator(obj.description).words(200, html=True)

    def get_author(self, obj):
        return {
            "id": obj.author.id,
            "email": obj.author.email,
        }
