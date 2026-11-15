from django.contrib import admin
from .models import TourPackage

@admin.register(TourPackage)
class TourPackageAdmin(admin.ModelAdmin):
    list_display = ('name', 'region', 'duration_days', 'duration_nights', 'starting_price_inr', 'is_featured', 'is_published')
    list_filter = ('region', 'travel_category', 'is_featured', 'is_published')
    search_fields = ('name', 'short_description')
    prepopulated_fields = {'slug': ('name',)}
    filter_horizontal = ('destinations',)
