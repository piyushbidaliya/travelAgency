from django.urls import path
from .views import ItineraryListView, ItineraryDetailView

urlpatterns = [
    path('', ItineraryListView.as_view(), name='itinerary-list'),
    path('<slug:slug>/', ItineraryDetailView.as_view(), name='itinerary-detail'),
]
