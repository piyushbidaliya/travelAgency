from rest_framework import serializers
from django.db import transaction
from .models import Inquiry, InquiryVehicle, InquiryGuide, InquiryLanguage, InquiryNote
from apps.vehicles.models import Vehicle
from apps.guides.models import Guide
from apps.languages.models import Language

class InquiryCreateSerializer(serializers.ModelSerializer):
    vehicle_ids = serializers.ListField(child=serializers.IntegerField(), required=False, write_only=True)
    guide_ids = serializers.ListField(child=serializers.IntegerField(), required=False, write_only=True)
    language_ids = serializers.ListField(child=serializers.IntegerField(), required=False, write_only=True)
    honeypot = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = Inquiry
        fields = [
            'id', 'reference_code', 'full_name', 'email', 'country_of_residence',
            'phone_number', 'calling_code', 'start_date', 'end_date', 'flexible_dates',
            'adults_count', 'children_count', 'pickup_location', 'dropoff_location',
            'preferred_region', 'preferred_vehicle_categories', 'vehicles_count_required',
            'special_transport_requirements', 'guide_specialization_requested',
            'guide_proficiency_requested', 'travel_budget', 'preferred_currency',
            'special_requirements', 'message', 'vehicle_ids',
            'guide_ids', 'language_ids', 'honeypot', 'created_at'
        ]
        read_only_fields = ['id', 'reference_code', 'created_at']

    def validate(self, attrs):
        # Anti-spam protection: honeypot field must be left blank by genuine humans
        honeypot = attrs.pop('honeypot', None)
        if honeypot:
            raise serializers.ValidationError("Spam submission detected.")
        return attrs

    def create(self, validated_data):
        vehicle_ids = validated_data.pop('vehicle_ids', [])
        guide_ids = validated_data.pop('guide_ids', [])
        language_ids = validated_data.pop('language_ids', [])

        with transaction.atomic():
            inquiry = Inquiry.objects.create(**validated_data)

            # Associate vehicles
            for veh_id in vehicle_ids:
                try:
                    veh = Vehicle.objects.get(id=veh_id)
                    InquiryVehicle.objects.create(inquiry=inquiry, vehicle=veh)
                except Vehicle.DoesNotExist:
                    pass

            # Associate guides
            for guide_id in guide_ids:
                try:
                    g = Guide.objects.get(id=guide_id)
                    InquiryGuide.objects.create(inquiry=inquiry, guide=g)
                except Guide.DoesNotExist:
                    pass

            # Associate languages
            for lang_id in language_ids:
                try:
                    lang = Language.objects.get(id=lang_id)
                    InquiryLanguage.objects.create(inquiry=inquiry, language=lang)
                except Language.DoesNotExist:
                    pass

        return inquiry
