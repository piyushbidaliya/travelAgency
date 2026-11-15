from rest_framework import serializers
from apps.destinations.models import Destination
from apps.packages.models import TourPackage

class TripValidationSerializer(serializers.Serializer):
    destination_ids = serializers.ListField(child=serializers.IntegerField(), required=False)
    package_ids = serializers.ListField(child=serializers.IntegerField(), required=False)
