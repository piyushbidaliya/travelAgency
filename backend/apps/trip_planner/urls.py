from django.urls import path
from .views import ValidateTripItemsView

urlpatterns = [
    path('validate/', ValidateTripItemsView.as_view(), name='trip-validate'),
]
