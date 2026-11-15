from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Language

class LanguageTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        Language.objects.create(name='German', code='de', is_active=True)

    def test_language_list(self):
        url = reverse('language-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertGreaterEqual(len(results), 1)
        self.assertEqual(results[0]['code'], 'de')
