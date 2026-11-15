from rest_framework import serializers
from .models import Testimonial

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'author_name', 'author_location', 'trip_title', 'review_text', 'rating', 'avatar', 'is_featured', 'display_order']
