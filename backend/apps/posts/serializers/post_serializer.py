from rest_framework import serializers

from ..models import Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            "id", "author", "title", "description", "is_published", "created_at", "updated_at",
        )

    def get_author(self, obj):
        return {
            "id": obj.author.id,
            "email": obj.author.email,
        }
