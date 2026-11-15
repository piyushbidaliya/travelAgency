from django.db import models

class Testimonial(models.Model):
    author_name = models.CharField(max_length=150)
    author_location = models.CharField(max_length=150, help_text="e.g. London, United Kingdom")
    trip_title = models.CharField(max_length=200, help_text="e.g. Royal Rajasthan & Golden Triangle")
    review_text = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    avatar = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    is_featured = models.BooleanField(default=True)
    is_published = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order', '-created_at']

    def __str__(self):
        return f"{self.author_name} ({self.author_location})"
