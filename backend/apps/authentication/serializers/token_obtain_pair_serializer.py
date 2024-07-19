from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class ObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        token = self.get_token(self.user)
        data["access_exp"] = token.access_token.payload["exp"]
        data["refresh_exp"] = token.payload["exp"]
        return data
