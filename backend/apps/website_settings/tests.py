from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import WebsiteSettings

class WebsiteSettingsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.settings = WebsiteSettings.get_settings()
        self.settings.company_name = "Namaste Journeys"
        self.settings.whatsapp_number = "+919876543210"
        self.settings.save()

    def test_public_settings_endpoint(self):
        url = reverse('public-settings')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['company_name'], "Namaste Journeys")
        self.assertEqual(response.data['whatsapp_number'], "+919876543210")
        self.assertIn("INR", response.data['supported_currencies'])
