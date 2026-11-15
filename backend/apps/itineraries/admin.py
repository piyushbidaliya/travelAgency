from django.contrib import admin
from .models import Itinerary, ItineraryDay

class ItineraryDayInline(admin.StackedInline):
    model = ItineraryDay
    extra = 1

@admin.register(Itinerary)
class ItineraryAdmin(admin.ModelAdmin):
    list_display = ('title', 'duration_days', 'duration_nights', 'is_featured', 'is_published')
    list_filter = ('is_featured', 'is_published')
    search_fields = ('title', 'overview')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('destinations',)
    inlines = [ItineraryDayInline]
