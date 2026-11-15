from rest_framework import generics, filters
from .models import Region, Destination
from .serializers import RegionSerializer, DestinationListSerializer, DestinationDetailSerializer

class RegionListView(generics.ListAPIView):
    queryset = Region.objects.all().order_by('display_order')
    serializer_class = RegionSerializer

class RegionDetailView(generics.RetrieveAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    lookup_field = 'slug'

class DestinationListView(generics.ListAPIView):
    serializer_class = DestinationListSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'state', 'short_description', 'detailed_description', 'main_attractions', 'travel_styles']
    ordering_fields = ['name', 'created_at']

    def get_queryset(self):
        queryset = Destination.objects.filter(is_published=True).select_related('region').prefetch_related('images')
        region_slug = self.request.query_params.get('region')
        if region_slug:
            queryset = queryset.filter(region__slug=region_slug)
        featured = self.request.query_params.get('featured')
        if featured in ['true', '1', 'True']:
            queryset = queryset.filter(is_featured=True)
        return queryset

class DestinationDetailView(generics.RetrieveAPIView):
    queryset = Destination.objects.filter(is_published=True).select_related('region').prefetch_related('images')
    serializer_class = DestinationDetailSerializer
    lookup_field = 'slug'
