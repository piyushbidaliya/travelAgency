from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from decimal import Decimal
from .models import GuideCategory, Guide, GuideLanguage
from apps.languages.models import Language

class GuideTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = GuideCategory.objects.create(name='Heritage Guide', slug='heritage-guide')
        self.french = Language.objects.create(name='French', code='fr', display_order=1)
        self.english = Language.objects.create(name='English', code='en', display_order=2)
        
        self.guide = Guide.objects.create(
            full_name='Vikramaditya Sharma',
            slug='vikramaditya-sharma',
            category=self.category,
            short_intro='Senior historian',
            biography='Over 18 years guiding',
            years_of_experience=18,
            price_inr=Decimal('5500.00'),
            is_published=True
        )
        GuideLanguage.objects.create(guide=self.guide, language=self.french, proficiency='fluent')
        GuideLanguage.objects.create(guide=self.guide, language=self.english, proficiency='native')

    def test_guide_list_endpoint(self):
        url = reverse('guide-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertGreaterEqual(len(results), 1)
        self.assertEqual(results[0]['full_name'], 'Vikramaditya Sharma')

    def test_guide_filter_by_language(self):
        url = reverse('guide-list') + '?language=fr'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)

    def test_guide_detail_endpoint(self):
        url = reverse('guide-detail', kwargs={'slug': 'vikramaditya-sharma'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['full_name'], 'Vikramaditya Sharma')
        self.assertEqual(len(response.data['languages']), 2)
