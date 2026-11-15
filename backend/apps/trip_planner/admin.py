from django.contrib import admin
from .models import TripPlannerConfig

@admin.register(TripPlannerConfig)
class TripPlannerConfigAdmin(admin.ModelAdmin):
    list_display = ('name', 'max_destinations', 'default_style')
