from django.contrib import admin
from .models import Region, DestinationCategory, Destination, DestinationImage

class DestinationImageInline(admin.TabularInline):
    model = DestinationImage
    extra = 1

@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'best_time_to_visit', 'display_order')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(DestinationCategory)
class DestinationCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ('name', 'state', 'region', 'recommended_duration', 'is_featured', 'is_published')
    list_filter = ('region', 'is_featured', 'is_published', 'state')
    search_fields = ('name', 'state', 'short_description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [DestinationImageInline]
