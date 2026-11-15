from rest_framework import serializers
from .models import Region, DestinationCategory, Destination, DestinationImage

class RegionSerializer(serializers.ModelSerializer):
    destinations_count = serializers.IntegerField(source='destinations.count', read_only=True)
    
    class Meta:
        model = Region
        fields = [
            'id', 'name', 'slug', 'title', 'tagline', 'description',
            'hero_image', 'best_time_to_visit', 'popular_experiences',
            'meta_title', 'meta_description', 'display_order', 'destinations_count'
        ]

class DestinationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DestinationImage
        fields = ['id', 'image', 'alt_text', 'is_primary', 'display_order']

class DestinationListSerializer(serializers.ModelSerializer):
    region_name = serializers.CharField(source='region.get_name_display', read_only=True)
    region_slug = serializers.CharField(source='region.slug', read_only=True)
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Destination
        fields = [
            'id', 'name', 'slug', 'state', 'region_name', 'region_slug',
            'short_description', 'best_time_to_visit', 'recommended_duration',
            'travel_styles', 'ideal_seasons', 'primary_image', 'is_featured'
        ]

    def get_primary_image(self, obj):
        img = obj.images.filter(is_primary=True).first() or obj.images.first()
        if img:
            return DestinationImageSerializer(img, context=self.context).data
        return None

class DestinationDetailSerializer(serializers.ModelSerializer):
    region = RegionSerializer(read_only=True)
    images = DestinationImageSerializer(many=True, read_only=True)

    class Meta:
        model = Destination
        fields = [
            'id', 'name', 'slug', 'state', 'region', 'short_description',
            'detailed_description', 'best_time_to_visit', 'recommended_duration',
            'main_attractions', 'activities', 'local_experiences', 'travel_tips',
            'travel_styles', 'ideal_seasons', 'images', 'is_featured',
            'meta_title', 'meta_description'
        ]
