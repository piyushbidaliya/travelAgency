from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import WebsiteSettings
from .serializers import WebsiteSettingsSerializer

class PublicSettingsView(APIView):
    """Returns public website settings."""
    def get(self, request):
        settings = WebsiteSettings.get_settings()
        serializer = WebsiteSettingsSerializer(settings, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
