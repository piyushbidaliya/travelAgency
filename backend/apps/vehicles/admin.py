from django.contrib import admin
from .models import VehicleCategory, Vehicle, VehicleImage

class VehicleImageInline(admin.TabularInline):
    model = VehicleImage
    extra = 1

@admin.register(VehicleCategory)
class VehicleCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'display_order')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'category', 'seating_capacity', 'luggage_capacity', 'price_inr', 'pricing_unit', 'availability_status', 'is_featured', 'is_published')
    list_filter = ('category', 'availability_status', 'is_air_conditioned', 'is_featured', 'is_published')
    search_fields = ('name', 'brand', 'model_name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [VehicleImageInline]
