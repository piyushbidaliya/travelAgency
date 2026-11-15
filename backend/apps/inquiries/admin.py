from django.contrib import admin
from .models import Inquiry, InquiryDestination, InquiryPackage, InquiryNote

class InquiryDestinationInline(admin.TabularInline):
    model = InquiryDestination
    extra = 0

class InquiryPackageInline(admin.TabularInline):
    model = InquiryPackage
    extra = 0

class InquiryNoteInline(admin.StackedInline):
    model = InquiryNote
    extra = 1

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('reference_code', 'full_name', 'email', 'country_of_residence', 'status', 'created_at')
    list_filter = ('status', 'preferred_region', 'created_at')
    search_fields = ('reference_code', 'full_name', 'email', 'phone_number')
    readonly_fields = ('reference_code', 'created_at', 'updated_at')
    inlines = [InquiryDestinationInline, InquiryPackageInline, InquiryNoteInline]
