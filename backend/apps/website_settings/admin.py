from django.contrib import admin
from .models import WebsiteSettings

@admin.register(WebsiteSettings)
class WebsiteSettingsAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'email_address', 'phone_number', 'default_currency', 'updated_at')
    
    def has_add_permission(self, request):
        # Prevent adding more than one settings entry
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)
