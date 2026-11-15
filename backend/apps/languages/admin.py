from django.contrib import admin
from .models import Language

@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'is_active', 'display_order')
    list_editable = ('is_active', 'display_order')
    search_fields = ('name', 'code')
