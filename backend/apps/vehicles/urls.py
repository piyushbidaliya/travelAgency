from django.urls import path
from .views import VehicleCategoryListView, VehicleListView, VehicleDetailView

urlpatterns = [
    path('categories/', VehicleCategoryListView.as_view(), name='vehicle-category-list'),
    path('', VehicleListView.as_view(), name='vehicle-list'),
    path('<slug:slug>/', VehicleDetailView.as_view(), name='vehicle-detail'),
]
