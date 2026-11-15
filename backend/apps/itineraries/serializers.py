from rest_framework import serializers
from .models import Itinerary, ItineraryDay
from apps.destinations.serializers import DestinationListSerializer

class ItineraryDaySerializer(serializers.ModelSerializer):
    destination_name = serializers.CharField(source='destination.name', read_only=True)

    class Meta:
        model = ItineraryDay
        fields = [
            'id', 'day_number', 'title', 'destination', 'destination_name',
            'description', 'activities', 'accommodation', 'meals', 'transport_info'
        ]

class ItineraryListSerializer(serializers.ModelSerializer):
    destinations = DestinationListSerializer(many=True, read_only=True)

    class Meta:
        model = Itinerary
        fields = [
            'id', 'title', 'slug', 'duration_days', 'duration_nights',
            'overview', 'best_time_to_visit', 'total_distance_km',
            'is_featured', 'destinations'
        ]

class ItineraryDetailSerializer(serializers.ModelSerializer):
    days = ItineraryDaySerializer(many=True, read_only=True)
    destinations = DestinationListSerializer(many=True, read_only=True)

    class Meta:
        model = Itinerary
        fields = [
            'id', 'title', 'slug', 'duration_days', 'duration_nights',
            'overview', 'best_time_to_visit', 'total_distance_km',
            'is_featured', 'destinations', 'days', 'meta_title', 'meta_description'
        ]
