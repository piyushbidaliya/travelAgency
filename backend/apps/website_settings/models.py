from django.db import models

class WebsiteSettings(models.Model):
    company_name = models.CharField(max_length=200, default='Namaste Journeys')
    tagline = models.CharField(max_length=300, default='Extraordinary Journeys Through India')
    logo = models.ImageField(upload_to='settings/', blank=True, null=True)
    email_address = models.EmailField(default='contact@namastejourneys.com')
    phone_number = models.CharField(max_length=50, default='+91 11 2345 6789')
    whatsapp_number = models.CharField(max_length=50, default='+919876543210')
    address = models.TextField(default='Connaught Place, New Delhi, India 110001')
    
    # Social links
    social_facebook = models.URLField(blank=True, default='https://facebook.com')
    social_instagram = models.URLField(blank=True, default='https://instagram.com')
    social_twitter = models.URLField(blank=True, default='https://x.com')
    social_linkedin = models.URLField(blank=True, default='https://linkedin.com')
    
    # Currency
    default_currency = models.CharField(max_length=10, default='INR')
    supported_currencies = models.JSONField(default=list)
    
    # SEO Defaults
    meta_title = models.CharField(max_length=200, default='Discover Extraordinary India | Luxury India Tours')
    meta_description = models.TextField(default='Bespoke luxury tours and experiential journeys across India for discerning international travelers.')
    
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Website Setting'
        verbose_name_plural = 'Website Settings'

    def __str__(self):
        return self.company_name

    @classmethod
    def get_settings(cls):
        settings, created = cls.objects.get_or_create(id=1, defaults={
            'supported_currencies': ['INR', 'USD', 'EUR', 'GBP']
        })
        return settings
