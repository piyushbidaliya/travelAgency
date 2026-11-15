from django.db import models
from apps.destinations.models import Destination, Region

class TourPackage(models.Model):
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True, blank=True, related_name='packages')
    destinations = models.ManyToManyField(Destination, related_name='packages', blank=True)
    
    featured_image = models.ImageField(upload_to='packages/', blank=True, null=True)
    short_description = models.CharField(max_length=350)
    detailed_description = models.TextField()
    
    duration_days = models.PositiveIntegerField(default=7)
    duration_nights = models.PositiveIntegerField(default=6)
    
    # Financial: DecimalField as required by spec
    starting_price_inr = models.DecimalField(max_digits=12, decimal_places=2, help_text="Price in INR")
    base_currency = models.CharField(max_length=10, default='INR')
    
    best_time_to_visit = models.CharField(max_length=200, default='October to April')
    tour_highlights = models.JSONField(default=list)
    inclusions = models.JSONField(default=list)
    exclusions = models.JSONField(default=list)
    
    accommodation_info = models.TextField(default='Luxury heritage palaces & 5-star boutique hotels.')
    transportation_info = models.TextField(default='Private air-conditioned chauffeur-driven vehicle throughout.')
    
    travel_category = models.CharField(max_length=100, default='Luxury Heritage')
    travel_style = models.CharField(max_length=100, default='Private Chauffeur Tour')
    
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', 'starting_price_inr']

    def __str__(self):
        return f"{self.name} ({self.duration_days}D/{self.duration_nights}N)"
