from rest_framework import generics, filters
from .models import TourPackage
from .serializers import TourPackageListSerializer, TourPackageDetailSerializer

class TourPackageListView(generics.ListAPIView):
    serializer_class = TourPackageListSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'short_description', 'travel_category', 'travel_style']
    ordering_fields = ['starting_price_inr', 'duration_days', 'created_at']

    def get_queryset(self):
        queryset = TourPackage.objects.filter(is_published=True).select_related('region').prefetch_related('destinations')
        region = self.request.query_params.get('region')
        if region:
            queryset = queryset.filter(region__slug=region)
        featured = self.request.query_params.get('featured')
        if featured in ['true', '1', 'True']:
            queryset = queryset.filter(is_featured=True)
        return queryset

class TourPackageDetailView(generics.RetrieveAPIView):
    queryset = TourPackage.objects.filter(is_published=True).select_related('region').prefetch_related('destinations')
    serializer_class = TourPackageDetailSerializer
    lookup_field = 'slug'
