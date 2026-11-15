import uuid
from django.db import models
from apps.destinations.models import Destination
from apps.packages.models import TourPackage
from django.contrib.auth import get_user_model

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
    
    # Trip Details
    adults_count = models.PositiveSmallIntegerField(default=2)
    children_count = models.PositiveSmallIntegerField(default=0)
    start_date = models.DateField(null=True, blank=True)
    flexible_dates = models.BooleanField(default=False)
    duration_days = models.PositiveSmallIntegerField(null=True, blank=True)
    preferred_region = models.CharField(max_length=100, blank=True)
    
    # Selections
    destinations = models.ManyToManyField(Destination, blank=True, through='InquiryDestination')
    packages = models.ManyToManyField(TourPackage, blank=True, through='InquiryPackage')
    
    # Preferences & Financial
    travel_budget = models.CharField(max_length=100, blank=True)
    preferred_currency = models.CharField(max_length=10, default='USD')
    travel_style = models.CharField(max_length=100, blank=True)
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

class InquiryDestination(models.Model):
    inquiry = models.ForeignKey(Inquiry, on_delete=models.CASCADE)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
    visit_order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['visit_order']
        unique_together = ('inquiry', 'destination')

class InquiryPackage(models.Model):
    inquiry = models.ForeignKey(Inquiry, on_delete=models.CASCADE)
    package = models.ForeignKey(TourPackage, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('inquiry', 'package')

class InquiryNote(models.Model):
    inquiry = models.ForeignKey(Inquiry, on_delete=models.CASCADE, related_name='notes')
    note = models.TextField()
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
