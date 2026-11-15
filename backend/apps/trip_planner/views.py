from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.destinations.models import Destination
from apps.destinations.serializers import DestinationListSerializer
from apps.packages.models import TourPackage
from apps.packages.serializers import TourPackageListSerializer

class ValidateTripItemsView(APIView):
    """Validates submitted destination and package IDs and returns fresh data."""
    def post(self, request):
        dest_ids = request.data.get('destination_ids', [])
        pkg_ids = request.data.get('package_ids', [])
        
        destinations = Destination.objects.filter(id__in=dest_ids, is_published=True)
        packages = TourPackage.objects.filter(id__in=pkg_ids, is_published=True)
        
        return Response({
            'valid_destinations': DestinationListSerializer(destinations, many=True, context={'request': request}).data,
            'valid_packages': TourPackageListSerializer(packages, many=True, context={'request': request}).data,
        }, status=status.HTTP_200_OK)
