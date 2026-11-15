from django.contrib import admin
from .models import Testimonial

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('author_name', 'author_location', 'trip_title', 'rating', 'is_featured', 'is_published')
    list_filter = ('is_featured', 'is_published', 'rating')
    search_fields = ('author_name', 'author_location', 'trip_title', 'review_text')
