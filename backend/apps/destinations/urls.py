from django.urls import path
from .views import RegionListView, RegionDetailView, DestinationListView, DestinationDetailView

urlpatterns = [
    path('regions/', RegionListView.as_view(), name='region-list'),
    path('regions/<slug:slug>/', RegionDetailView.as_view(), name='region-detail'),
    path('', DestinationListView.as_view(), name='destination-list'),
    path('<slug:slug>/', DestinationDetailView.as_view(), name='destination-detail'),
]
