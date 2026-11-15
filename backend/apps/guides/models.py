from django.db import models
from apps.languages.models import Language

class GuideCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = 'Guide Categories'
        ordering = ['display_order', 'name']

    def __str__(self):
        return self.name

class Guide(models.Model):
    AVAILABILITY_CHOICES = [
        ('available', 'Available'),
        ('on_request', 'Available on Request'),
        ('limited', 'Limited Availability'),
    ]

    full_name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=150, unique=True)
    category = models.ForeignKey(GuideCategory, on_delete=models.PROTECT, related_name='guides')
    profile_photo = models.ImageField(upload_to='guides/', blank=True, null=True)
    
    short_intro = models.CharField(max_length=300)
    biography = models.TextField()
    years_of_experience = models.PositiveIntegerField(default=5)
    
    areas_of_expertise = models.JSONField(default=list, help_text="e.g. ['Mughal Architecture', 'Rajput Forts', 'Vedic Rituals']")
    specializations = models.JSONField(default=list, help_text="e.g. ['ASI Certified Historian', 'VIP Diplomatic Guide']")
    
    # Financial fields using DecimalField
    price_inr = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, help_text="Indicative base fee in INR")
    pricing_unit = models.CharField(max_length=50, default='Per Day', help_text="e.g. Per Day / 8 Hours or Request a Quote")
    
    availability_status = models.CharField(max_length=20, choices=AVAILABILITY_CHOICES, default='available')
    certifications = models.CharField(max_length=250, blank=True, help_text="Genuine verification, e.g. Ministry of Tourism Certified")
    
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.TextField(blank=True)
    
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', '-years_of_experience', 'full_name']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['is_published']),
        ]

    def __str__(self):
        return f"{self.full_name} ({self.category.name})"

class GuideLanguage(models.Model):
    PROFICIENCY_CHOICES = [
        ('native', 'Native'),
        ('fluent', 'Fluent'),
        ('professional', 'Professional'),
        ('conversational', 'Conversational'),
    ]

    guide = models.ForeignKey(Guide, on_delete=models.CASCADE, related_name='languages')
    language = models.ForeignKey(Language, on_delete=models.PROTECT, related_name='guide_associations')
    proficiency = models.CharField(max_length=20, choices=PROFICIENCY_CHOICES, default='fluent')

    class Meta:
        unique_together = ('guide', 'language')
        ordering = ['language__name']

    def __str__(self):
        return f"{self.guide.full_name} - {self.language.name} ({self.get_proficiency_display()})"
