from django.contrib import admin
from .models import GuideCategory, Guide, GuideLanguage

class GuideLanguageInline(admin.TabularInline):
    model = GuideLanguage
    extra = 1

@admin.register(GuideCategory)
class GuideCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'display_order')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Guide)
class GuideAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'category', 'years_of_experience', 'price_inr', 'pricing_unit', 'availability_status', 'is_featured', 'is_published')
    list_filter = ('category', 'availability_status', 'is_featured', 'is_published')
    search_fields = ('full_name', 'short_intro', 'biography')
    prepopulated_fields = {'slug': ('full_name',)}
    inlines = [GuideLanguageInline]
