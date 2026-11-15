from django.db import models

class VehicleCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = 'Vehicle Categories'
        ordering = ['display_order', 'name']

    def __str__(self):
        return self.name

class Vehicle(models.Model):
    AVAILABILITY_CHOICES = [
        ('available', 'Available'),
        ('on_request', 'Available on Request'),
        ('limited', 'Limited Availability'),
    ]

    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=150, unique=True)
    brand = models.CharField(max_length=100)
    model_name = models.CharField(max_length=100, blank=True)
    category = models.ForeignKey(VehicleCategory, on_delete=models.PROTECT, related_name='vehicles')
    
    featured_image = models.ImageField(upload_to='vehicles/', blank=True, null=True)
    seating_capacity = models.PositiveIntegerField(help_text="Passenger capacity excluding chauffeur")
    luggage_capacity = models.PositiveIntegerField(help_text="Standard large suitcase capacity")
    is_air_conditioned = models.BooleanField(default=True)
    
    facilities = models.JSONField(default=list, help_text="e.g. ['Chauffeur in Uniform', 'Mineral Water', 'USB Chargers']")
    description = models.TextField()
    
    # Financial fields using DecimalField
    price_inr = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True, help_text="Indicative base price in INR")
    pricing_unit = models.CharField(max_length=50, default='Per Day', help_text="e.g. Per Day / 250km or Request a Quote")
    
    availability_status = models.CharField(max_length=20, choices=AVAILABILITY_CHOICES, default='available')
    
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.TextField(blank=True)
    
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['category__display_order', '-is_featured', 'seating_capacity']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['is_published']),
        ]

    def __str__(self):
        return f"{self.name} ({self.category.name} - {self.seating_capacity} Seats)"

class VehicleImage(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='vehicles/gallery/')
    alt_text = models.CharField(max_length=200)
    is_primary = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'id']

    def __str__(self):
        return f"Image for {self.vehicle.name}"
