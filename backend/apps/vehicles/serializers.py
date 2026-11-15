from rest_framework import serializers
from .models import VehicleCategory, Vehicle, VehicleImage

class VehicleCategorySerializer(serializers.ModelSerializer):
    vehicles_count = serializers.IntegerField(source='vehicles.count', read_only=True)

    class Meta:
        model = VehicleCategory
        fields = ['id', 'name', 'slug', 'description', 'display_order', 'vehicles_count']

class VehicleImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleImage
        fields = ['id', 'image', 'alt_text', 'is_primary', 'display_order']

class VehicleListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = Vehicle
        fields = [
            'id', 'name', 'slug', 'brand', 'model_name', 'category_name', 'category_slug',
            'featured_image', 'seating_capacity', 'luggage_capacity', 'is_air_conditioned',
            'facilities', 'price_inr', 'pricing_unit', 'availability_status', 'is_featured'
        ]

class VehicleDetailSerializer(serializers.ModelSerializer):
    category = VehicleCategorySerializer(read_only=True)
    images = VehicleImageSerializer(many=True, read_only=True)

    class Meta:
        model = Vehicle
        fields = [
            'id', 'name', 'slug', 'brand', 'model_name', 'category',
            'featured_image', 'images', 'seating_capacity', 'luggage_capacity',
            'is_air_conditioned', 'facilities', 'description',
            'price_inr', 'pricing_unit', 'availability_status',
            'meta_title', 'meta_description', 'is_featured'
        ]
