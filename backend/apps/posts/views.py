from django.db.models import Q
from rest_framework import viewsets

from .models import Post
from .permissions import IsOwnerOrReadOnly
from .serializers import PostSerializer

cache_timeout = 60 * 5


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsOwnerOrReadOnly,)
    filterset_fields = ("author__id", "id", "is_published")

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.is_authenticated:
            return queryset.filter(Q(is_published=True) | Q(author=self.request.user))
        return queryset.filter(is_published=True)
