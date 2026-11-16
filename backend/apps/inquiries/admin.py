from django.contrib import admin
from .models import Inquiry, InquiryVehicle, InquiryNote

class InquiryVehicleInline(admin.TabularInline):
    model = InquiryVehicle
    extra = 0

class InquiryNoteInline(admin.StackedInline):
    model = InquiryNote
    extra = 1

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('reference_code', 'full_name', 'email', 'country_of_residence', 'needs_guide', 'status', 'created_at')
    list_filter = ('status', 'needs_guide', 'preferred_region', 'created_at')
    search_fields = ('reference_code', 'full_name', 'email', 'phone_number')
    readonly_fields = ('reference_code', 'created_at', 'updated_at')
    inlines = [InquiryVehicleInline, InquiryNoteInline]
