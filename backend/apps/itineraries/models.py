from django.db import models
from apps.destinations.models import Destination
from apps.packages.models import TourPackage

class Itinerary(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    package = models.ForeignKey(TourPackage, on_delete=models.SET_NULL, null=True, blank=True, related_name='itineraries')
    destinations = models.ManyToManyField(Destination, related_name='itineraries', blank=True)
    
    duration_days = models.PositiveIntegerField(default=7)
    duration_nights = models.PositiveIntegerField(default=6)
    
    overview = models.TextField()
    best_time_to_visit = models.CharField(max_length=200, default='October to March')
    total_distance_km = models.PositiveIntegerField(blank=True, null=True, help_text="Verified total route distance")
    
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Itineraries'
        ordering = ['-is_featured', 'duration_days']

    def __str__(self):
        return f"{self.title} ({self.duration_days} Days)"

class ItineraryDay(models.Model):
    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE, related_name='days')
    day_number = models.PositiveIntegerField()
    title = models.CharField(max_length=200)
    destination = models.ForeignKey(Destination, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField()
    activities = models.JSONField(default=list)
    accommodation = models.CharField(max_length=200, default='Heritage Hotel / Luxury Boutique Resort')
    meals = models.CharField(max_length=100, default='Breakfast included')
    transport_info = models.CharField(max_length=250, default='Private chauffeur-driven vehicle')

    class Meta:
        ordering = ['day_number']
        unique_together = ('itinerary', 'day_number')

    def __str__(self):
        return f"Day {self.day_number}: {self.title}"
