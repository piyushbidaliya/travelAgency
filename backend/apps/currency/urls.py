from django.urls import path
from .views import CurrencyRateListView

urlpatterns = [
    path('rates/', CurrencyRateListView.as_view(), name='currency-rates'),
]
