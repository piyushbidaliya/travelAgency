from django.urls import path
from .views import TourPackageListView, TourPackageDetailView

urlpatterns = [
    path('', TourPackageListView.as_view(), name='package-list'),
    path('<slug:slug>/', TourPackageDetailView.as_view(), name='package-detail'),
]
