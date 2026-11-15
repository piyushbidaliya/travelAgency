from rest_framework import generics, filters
from .models import GuideCategory, Guide
from .serializers import GuideCategorySerializer, GuideListSerializer, GuideDetailSerializer

class GuideCategoryListView(generics.ListAPIView):
    queryset = GuideCategory.objects.all().order_by('display_order')
    serializer_class = GuideCategorySerializer

class GuideListView(generics.ListAPIView):
    serializer_class = GuideListSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['full_name', 'short_intro', 'biography', 'areas_of_expertise', 'specializations', 'languages__language__name']
    ordering_fields = ['years_of_experience', 'price_inr', 'full_name']

    def get_queryset(self):
        queryset = Guide.objects.filter(is_published=True).select_related('category').prefetch_related('languages__language')
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category)
        language = self.request.query_params.get('language')
        if language:
            queryset = queryset.filter(languages__language__code=language)
        featured = self.request.query_params.get('featured')
        if featured in ['true', '1', 'True']:
            queryset = queryset.filter(is_featured=True)
        return queryset.distinct()

class GuideDetailView(generics.RetrieveAPIView):
    queryset = Guide.objects.filter(is_published=True).select_related('category').prefetch_related('languages__language')
    serializer_class = GuideDetailSerializer
    lookup_field = 'slug'
