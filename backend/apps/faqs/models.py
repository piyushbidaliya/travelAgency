from django.db import models

class FAQ(models.Model):
    CATEGORY_CHOICES = [
        ('general', 'General Travel'),
        ('visa_health', 'Visa & Health Guidelines'),
        ('booking', 'Customization & Booking'),
        ('transport', 'Transport & Chauffeurs'),
    ]

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='general')
    question = models.CharField(max_length=300)
    answer = models.TextField()
    display_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order', 'id']
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQs'

    def __str__(self):
        return self.question
