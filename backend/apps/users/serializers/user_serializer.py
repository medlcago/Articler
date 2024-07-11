from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.users.serializers import ProfileSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            "id", "email", "password", "date_joined", "is_active", "is_staff", "is_superuser", "last_login", "profile"
        )
        extra_kwargs = {
            "password": {"write_only": True},
            "is_active": {"read_only": True},
            "is_staff": {"read_only": True},
            "is_superuser": {"read_only": True},
        }

    def create(self, validated_data) -> User:
        validated_data.pop("profile", None)
        user = User.objects.create_user(
            **validated_data
        )
        return user

    def update(self, instance, validated_data) -> User:
        validated_data.pop("password", None)
        profile_data = validated_data.pop("profile", None)
        user = super().update(instance, validated_data)
        if profile_data:
            profile = user.profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()
        return user
