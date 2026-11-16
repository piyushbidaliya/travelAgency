from rest_framework import serializers
from django.db import transaction
from .models import Inquiry, InquiryVehicle, InquiryNote
from apps.vehicles.models import Vehicle

class InquiryCreateSerializer(serializers.ModelSerializer):
    vehicle_ids = serializers.ListField(child=serializers.IntegerField(), required=False, write_only=True)
    honeypot = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = Inquiry
        fields = [
            'id', 'reference_code', 'full_name', 'email', 'country_of_residence',
            'phone_number', 'calling_code', 'start_date', 'end_date', 'flexible_dates',
            'adults_count', 'children_count', 'pickup_location', 'dropoff_location',
            'travel_destinations', 'preferred_region', 'preferred_vehicle_categories',
            'vehicles_count_required', 'special_transport_requirements', 'needs_guide',
            'guide_locations', 'guide_languages', 'travel_budget', 'preferred_currency',
            'special_requirements', 'message', 'vehicle_ids', 'honeypot', 'created_at'
        ]
        read_only_fields = ['id', 'reference_code', 'created_at']

    def validate(self, attrs):
        honeypot = attrs.pop('honeypot', None)
        if honeypot:
            raise serializers.ValidationError("Spam submission detected.")
        return attrs

    def create(self, validated_data):
        vehicle_ids = validated_data.pop('vehicle_ids', [])

        with transaction.atomic():
            inquiry = Inquiry.objects.create(**validated_data)

            for veh_id in vehicle_ids:
                try:
                    veh = Vehicle.objects.get(id=veh_id)
                    InquiryVehicle.objects.create(inquiry=inquiry, vehicle=veh)
                except Vehicle.DoesNotExist:
                    pass

        return inquiry

class ContactSubmissionSerializer(serializers.Serializer):
    fullName = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=50)
    country = serializers.CharField(max_length=100)
    serviceInterest = serializers.CharField(max_length=100, required=False, allow_blank=True)
    requestGuide = serializers.BooleanField(required=False, default=False)
    guideLocations = serializers.ListField(child=serializers.CharField(max_length=100), required=False, default=list)
    guideLanguages = serializers.CharField(max_length=200, required=False, allow_blank=True, default='')
    message = serializers.CharField(required=False, allow_blank=True, default='')

    def create(self, validated_data):
        inquiry = Inquiry.objects.create(
            full_name=validated_data.get('fullName', ''),
            email=validated_data.get('email', ''),
            phone_number=validated_data.get('phone', ''),
            country_of_residence=validated_data.get('country', ''),
            special_transport_requirements=f"Interest: {validated_data.get('serviceInterest', 'General')}",
            needs_guide=validated_data.get('requestGuide', False),
            guide_locations=validated_data.get('guideLocations', []),
            guide_languages=validated_data.get('guideLanguages', ''),
            message=validated_data.get('message', ''),
        )
        return inquiry
