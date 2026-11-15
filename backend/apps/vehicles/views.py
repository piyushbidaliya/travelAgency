from rest_framework import generics, filters
from .models import VehicleCategory, Vehicle
from .serializers import VehicleCategorySerializer, VehicleListSerializer, VehicleDetailSerializer

class VehicleCategoryListView(generics.ListAPIView):
    queryset = VehicleCategory.objects.all().order_by('display_order')
    serializer_class = VehicleCategorySerializer

class VehicleListView(generics.ListAPIView):
    serializer_class = VehicleListSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'brand', 'model_name', 'category__name', 'description']
    ordering_fields = ['price_inr', 'seating_capacity', 'created_at']

    def get_queryset(self):
        queryset = Vehicle.objects.filter(is_published=True).select_related('category')
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category)
        seats = self.request.query_params.get('min_seats')
        if seats:
            queryset = queryset.filter(seating_capacity__gte=int(seats))
        featured = self.request.query_params.get('featured')
        if featured in ['true', '1', 'True']:
            queryset = queryset.filter(is_featured=True)
        return queryset.distinct()

class VehicleDetailView(generics.RetrieveAPIView):
    queryset = Vehicle.objects.filter(is_published=True).select_related('category').prefetch_related('images')
    serializer_class = VehicleDetailSerializer
    lookup_field = 'slug'
