from rest_framework import generics
from .models import Itinerary
from .serializers import ItineraryListSerializer, ItineraryDetailSerializer

class ItineraryListView(generics.ListAPIView):
    queryset = Itinerary.objects.filter(is_published=True).prefetch_related('destinations')
    serializer_class = ItineraryListSerializer

class ItineraryDetailView(generics.RetrieveAPIView):
    queryset = Itinerary.objects.filter(is_published=True).prefetch_related('destinations', 'days')
    serializer_class = ItineraryDetailSerializer
    lookup_field = 'slug'
