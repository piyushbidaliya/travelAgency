from rest_framework import serializers
from .models import CurrencyRate

class CurrencyRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrencyRate
        fields = ['base_currency', 'target_currency', 'rate', 'inverse_rate', 'last_updated']
