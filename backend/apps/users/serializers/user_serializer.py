from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField(source="get_avatar_url")

    def get_avatar(self, obj):
        request = self.context.get("request")
        return obj.get_avatar_url(request)

    class Meta:
        model = User
        fields = (
            "id", "email", "password", "date_joined", "is_active",
            "is_staff", "is_superuser", "last_login", "status", "avatar"
        )
        extra_kwargs = {
            "password": {"write_only": True},
            "is_active": {"read_only": True},
            "is_staff": {"read_only": True},
            "is_superuser": {"read_only": True},
        }

    def create(self, validated_data) -> User:
        user = User.objects.create_user(
            **validated_data
        )
        return user

    def update(self, instance, validated_data) -> User:
        validated_data.pop("password", None)
        return super().update(instance, validated_data)
