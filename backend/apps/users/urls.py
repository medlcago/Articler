from django.urls import path, include
from rest_framework import routers

from .views import UserViewSet

app_name = "users"

router = routers.DefaultRouter()
router.register(r"users", UserViewSet)

urlpatterns = [
    path("users/reset-password/", include("django_rest_passwordreset.urls", namespace="reset-password")),
    path("", include(router.urls)),
]
