from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from ...users.serializers import UserSerializer


class ObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data["user"] = UserSerializer(self.user).data
        return data
