import uuid
from django.db import models
from django.contrib.auth import get_user_model
from apps.vehicles.models import Vehicle
from apps.guides.models import Guide
from apps.languages.models import Language

User = get_user_model()

class Inquiry(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('follow_up', 'Follow-up Required'),
        ('in_discussion', 'In Discussion'),
        ('converted', 'Converted'),
        ('closed', 'Closed'),
    ]

    reference_code = models.CharField(max_length=20, unique=True, editable=False)
    
    # Customer Details
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    country_of_residence = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=30)
    calling_code = models.CharField(max_length=10, default='+1')
    
    # Travel Dates & Party
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    flexible_dates = models.BooleanField(default=False)
    adults_count = models.PositiveSmallIntegerField(default=2)
    children_count = models.PositiveSmallIntegerField(default=0)
    pickup_location = models.CharField(max_length=200, blank=True, help_text="e.g. Delhi Airport / Hotel")
    dropoff_location = models.CharField(max_length=200, blank=True, help_text="e.g. Mumbai Airport")
    preferred_region = models.CharField(max_length=100, blank=True)
    
    # Relational Service Selections
    vehicles = models.ManyToManyField(Vehicle, blank=True, through='InquiryVehicle')
    guides = models.ManyToManyField(Guide, blank=True, through='InquiryGuide')
    languages = models.ManyToManyField(Language, blank=True, through='InquiryLanguage')
    
    # Service Specifications
    preferred_vehicle_categories = models.JSONField(default=list, blank=True)
    vehicles_count_required = models.PositiveSmallIntegerField(default=1)
    special_transport_requirements = models.TextField(blank=True)
    
    guide_specialization_requested = models.CharField(max_length=200, blank=True)
    guide_proficiency_requested = models.CharField(max_length=50, blank=True)
    
    # Financial & Notes
    travel_budget = models.CharField(max_length=100, blank=True)
    preferred_currency = models.CharField(max_length=10, default='USD')
    special_requirements = models.TextField(blank=True)
    message = models.TextField(blank=True)
    
    # Admin / System status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    email_sent_to_company = models.BooleanField(default=False)
    email_sent_to_customer = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Inquiries'

    def save(self, *args, **kwargs):
        if not self.reference_code:
            self.reference_code = 'INQ-' + uuid.uuid4().hex[:8].upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.reference_code} - {self.full_name}"

class InquiryVehicle(models.Model):
    inquiry = models.ForeignKey(Inquiry, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('inquiry', 'vehicle')

class InquiryGuide(models.Model):
    inquiry = models.ForeignKey(Inquiry, on_delete=models.CASCADE)
    guide = models.ForeignKey(Guide, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('inquiry', 'guide')

class InquiryLanguage(models.Model):
    inquiry = models.ForeignKey(Inquiry, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    preferred_proficiency = models.CharField(max_length=50, blank=True)

    class Meta:
        unique_together = ('inquiry', 'language')

class InquiryNote(models.Model):
    inquiry = models.ForeignKey(Inquiry, on_delete=models.CASCADE, related_name='notes')
    note = models.TextField()
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
