from rest_framework import serializers

from apps.users.models import User


class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, attrs):
        if User.objects.filter(**attrs).exists():
            raise serializers.ValidationError(detail={
                "email": "Email already exists"
            },
                code="conflict"
            )
        return attrs
