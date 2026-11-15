from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CurrencyRate

class CurrencyRateListView(APIView):
    """Returns active currency rates for frontend conversion."""
    def get(self, request):
        rates = CurrencyRate.get_rates_dict()
        return Response({
            'base': 'INR',
            'rates': rates,
            'note': 'Indicative rates only. Final quotations subject to company confirmation.'
        }, status=status.HTTP_200_OK)
