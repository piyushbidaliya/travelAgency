from rest_framework import generics
from .models import Language
from .serializers import LanguageSerializer

class LanguageListView(generics.ListAPIView):
    queryset = Language.objects.filter(is_active=True)
    serializer_class = LanguageSerializer
