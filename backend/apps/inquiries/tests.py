from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.vehicles.models import VehicleCategory, Vehicle
from apps.guides.models import GuideCategory, Guide
from apps.languages.models import Language
from .models import Inquiry

class InquiryTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.veh_cat = VehicleCategory.objects.create(name='MUV', slug='muv')
        self.vehicle = Vehicle.objects.create(
            name='Toyota Innova Crysta', slug='innova-crysta', brand='Toyota',
            category=self.veh_cat, seating_capacity=6, luggage_capacity=4, description='Comfort vehicle'
        )
        self.guide_cat = GuideCategory.objects.create(name='Heritage Guide', slug='heritage')
        self.guide = Guide.objects.create(
            full_name='Vikramaditya Sharma', slug='vikram-sharma', category=self.guide_cat,
            short_intro='Historian', biography='Bio', years_of_experience=15
        )
        self.french = Language.objects.create(name='French', code='fr')

    def test_consolidated_inquiry_submission(self):
        url = reverse('inquiry-create')
        data = {
            'full_name': 'Jean Dupont',
            'email': 'jean.dupont@example.fr',
            'country_of_residence': 'France',
            'phone_number': '+33612345678',
            'calling_code': '+33',
            'adults_count': 2,
            'children_count': 1,
            'pickup_location': 'Delhi Airport',
            'dropoff_location': 'Jaipur Hotel',
            'vehicle_ids': [self.vehicle.id],
            'guide_ids': [self.guide.id],
            'language_ids': [self.french.id],
            'message': 'We require a French-speaking tour guide for our journey.'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        self.assertTrue(response.data['reference_code'].startswith('INQ-'))

        inquiry = Inquiry.objects.get(reference_code=response.data['reference_code'])
        self.assertEqual(inquiry.vehicles.count(), 1)
        self.assertEqual(inquiry.guides.count(), 1)
        self.assertEqual(inquiry.languages.count(), 1)

    def test_honeypot_spam_rejection(self):
        url = reverse('inquiry-create')
        data = {
            'full_name': 'Bot Spammer',
            'email': 'spam@bot.com',
            'country_of_residence': 'Nowhere',
            'phone_number': '12345',
            'honeypot': 'I am a bot filling hidden fields',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Inquiry.objects.count(), 0)
