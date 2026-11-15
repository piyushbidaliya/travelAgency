from rest_framework import generics
from .models import FAQ
from .serializers import FAQSerializer

class FAQListView(generics.ListAPIView):
    queryset = FAQ.objects.filter(is_published=True)
    serializer_class = FAQSerializer
