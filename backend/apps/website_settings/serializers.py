from rest_framework import serializers
from .models import WebsiteSettings

class WebsiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebsiteSettings
        fields = [
            'company_name', 'tagline', 'logo', 'email_address',
            'phone_number', 'whatsapp_number', 'address',
            'social_facebook', 'social_instagram', 'social_twitter', 'social_linkedin',
            'default_currency', 'supported_currencies',
            'meta_title', 'meta_description', 'updated_at'
        ]
