from django.urls import path
from .views import GuideCategoryListView, GuideListView, GuideDetailView

urlpatterns = [
    path('categories/', GuideCategoryListView.as_view(), name='guide-category-list'),
    path('', GuideListView.as_view(), name='guide-list'),
    path('<slug:slug>/', GuideDetailView.as_view(), name='guide-detail'),
]
