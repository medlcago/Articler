from django.contrib import admin

from ..models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    search_fields = ("author__email",)
    list_display = ("id", "title", "author", "is_published", "created_at", "updated_at")
    list_filter = ("is_published",)
    list_select_related = ("author",)
    list_display_links = ("id", "title", "author")
    list_editable = ("is_published",)
