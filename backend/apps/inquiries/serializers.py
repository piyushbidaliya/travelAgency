from rest_framework import serializers
from django.db import transaction
from .models import Inquiry, InquiryDestination, InquiryPackage, InquiryNote
from apps.destinations.models import Destination
from apps.packages.models import TourPackage

class InquiryCreateSerializer(serializers.ModelSerializer):
    destination_ids = serializers.ListField(child=serializers.IntegerField(), required=False, write_only=True)
    package_ids = serializers.ListField(child=serializers.IntegerField(), required=False, write_only=True)
    honeypot = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = Inquiry
        fields = [
            'id', 'reference_code', 'full_name', 'email', 'country_of_residence',
            'phone_number', 'calling_code', 'adults_count', 'children_count',
            'start_date', 'flexible_dates', 'duration_days', 'preferred_region',
            'travel_budget', 'preferred_currency', 'travel_style',
            'special_requirements', 'message', 'destination_ids', 'package_ids',
            'honeypot', 'created_at'
        ]
        read_only_fields = ['id', 'reference_code', 'created_at']

    def validate(self, attrs):
        # Spam protection: honeypot field must be empty
        honeypot = attrs.pop('honeypot', None)
        if honeypot:
            raise serializers.ValidationError("Spam submission detected.")
        return attrs

    def create(self, validated_data):
        destination_ids = validated_data.pop('destination_ids', [])
        package_ids = validated_data.pop('package_ids', [])

        with transaction.atomic():
            inquiry = Inquiry.objects.create(**validated_data)

            # Associate destinations with order
            for order, dest_id in enumerate(destination_ids, start=1):
                try:
                    dest = Destination.objects.get(id=dest_id)
                    InquiryDestination.objects.create(inquiry=inquiry, destination=dest, visit_order=order)
                except Destination.DoesNotExist:
                    pass

            # Associate packages
            for pkg_id in package_ids:
                try:
                    pkg = TourPackage.objects.get(id=pkg_id)
                    InquiryPackage.objects.create(inquiry=inquiry, package=pkg)
                except TourPackage.DoesNotExist:
                    pass

        return inquiry
