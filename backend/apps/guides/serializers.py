from rest_framework import serializers
from .models import GuideCategory, Guide, GuideLanguage
from apps.languages.serializers import LanguageSerializer

class GuideCategorySerializer(serializers.ModelSerializer):
    guides_count = serializers.IntegerField(source='guides.count', read_only=True)

    class Meta:
        model = GuideCategory
        fields = ['id', 'name', 'slug', 'description', 'display_order', 'guides_count']

class GuideLanguageSerializer(serializers.ModelSerializer):
    language_name = serializers.CharField(source='language.name', read_only=True)
    language_code = serializers.CharField(source='language.code', read_only=True)
    proficiency_display = serializers.CharField(source='get_proficiency_display', read_only=True)

    class Meta:
        model = GuideLanguage
        fields = ['id', 'language', 'language_name', 'language_code', 'proficiency', 'proficiency_display']

class GuideListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    languages = GuideLanguageSerializer(many=True, read_only=True)

    class Meta:
        model = Guide
        fields = [
            'id', 'full_name', 'slug', 'category_name', 'category_slug',
            'profile_photo', 'short_intro', 'years_of_experience',
            'languages', 'areas_of_expertise', 'specializations',
            'price_inr', 'pricing_unit', 'availability_status', 'is_featured'
        ]

class GuideDetailSerializer(serializers.ModelSerializer):
    category = GuideCategorySerializer(read_only=True)
    languages = GuideLanguageSerializer(many=True, read_only=True)

    class Meta:
        model = Guide
        fields = [
            'id', 'full_name', 'slug', 'category', 'profile_photo',
            'short_intro', 'biography', 'years_of_experience',
            'languages', 'areas_of_expertise', 'specializations',
            'price_inr', 'pricing_unit', 'availability_status',
            'certifications', 'meta_title', 'meta_description', 'is_featured'
        ]
