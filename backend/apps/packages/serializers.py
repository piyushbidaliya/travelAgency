from rest_framework import serializers
from .models import TourPackage
from apps.destinations.serializers import DestinationListSerializer

class TourPackageListSerializer(serializers.ModelSerializer):
    destinations = DestinationListSerializer(many=True, read_only=True)
    region_name = serializers.CharField(source='region.get_name_display', read_only=True)

    class Meta:
        model = TourPackage
        fields = [
            'id', 'name', 'slug', 'region_name', 'featured_image',
            'short_description', 'duration_days', 'duration_nights',
            'starting_price_inr', 'base_currency', 'best_time_to_visit',
            'tour_highlights', 'travel_category', 'travel_style',
            'is_featured', 'destinations'
        ]

class TourPackageDetailSerializer(serializers.ModelSerializer):
    destinations = DestinationListSerializer(many=True, read_only=True)
    region_name = serializers.CharField(source='region.get_name_display', read_only=True)

    class Meta:
        model = TourPackage
        fields = [
            'id', 'name', 'slug', 'region_name', 'featured_image',
            'short_description', 'detailed_description',
            'duration_days', 'duration_nights', 'starting_price_inr', 'base_currency',
            'best_time_to_visit', 'tour_highlights', 'inclusions', 'exclusions',
            'accommodation_info', 'transportation_info', 'travel_category',
            'travel_style', 'is_featured', 'destinations', 'meta_title', 'meta_description'
        ]
