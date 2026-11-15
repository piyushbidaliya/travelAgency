from django.db import models

class Region(models.Model):
    REGION_CHOICES = [
        ('north', 'North India'),
        ('south', 'South India'),
        ('east', 'East India'),
        ('west', 'West India'),
    ]
    name = models.CharField(max_length=50, choices=REGION_CHOICES, unique=True)
    slug = models.SlugField(max_length=50, unique=True)
    title = models.CharField(max_length=150)
    tagline = models.CharField(max_length=250)
    description = models.TextField()
    hero_image = models.ImageField(upload_to='regions/', blank=True, null=True)
    best_time_to_visit = models.CharField(max_length=200, default='October to March')
    popular_experiences = models.JSONField(default=list, blank=True)
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.TextField(blank=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'name']

    def __str__(self):
        return self.get_name_display()

class DestinationCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = 'Destination Categories'

    def __str__(self):
        return self.name

class Destination(models.Model):
    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=150, unique=True)
    state = models.CharField(max_length=100)
    region = models.ForeignKey(Region, on_delete=models.PROTECT, related_name='destinations')
    categories = models.ManyToManyField(DestinationCategory, blank=True, related_name='destinations')
    
    short_description = models.CharField(max_length=300)
    detailed_description = models.TextField()
    best_time_to_visit = models.CharField(max_length=200)
    recommended_duration = models.CharField(max_length=100, help_text="e.g. 3-4 Days")
    
    # Rich structured arrays
    main_attractions = models.JSONField(default=list, help_text="List of top monuments, sights")
    activities = models.JSONField(default=list, help_text="List of experiences e.g. Heritage walks")
    local_experiences = models.JSONField(default=list, help_text="Culinary, crafts, cultural highlights")
    travel_tips = models.JSONField(default=list, help_text="Dos, don'ts, photography tips")
    
    # Travel Styles & Season
    travel_styles = models.JSONField(default=list, help_text="e.g. ['Heritage', 'Luxury', 'Adventure']")
    ideal_seasons = models.JSONField(default=list, help_text="e.g. ['Winter', 'Spring']")
    
    # Metadata & SEO
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['region', 'is_published']),
        ]

    def __str__(self):
        return f"{self.name}, {self.state}"

class DestinationImage(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='destinations/')
    alt_text = models.CharField(max_length=200)
    is_primary = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'id']

    def __str__(self):
        return f"Image for {self.destination.name}"
