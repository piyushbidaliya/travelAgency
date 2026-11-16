from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.vehicles.models import VehicleCategory, Vehicle
from .models import Inquiry

class InquiryTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.veh_cat = VehicleCategory.objects.create(name='MUV', slug='muv')
        self.vehicle = Vehicle.objects.create(
            name='Toyota Innova Crysta', slug='innova-crysta', brand='Toyota',
            category=self.veh_cat, seating_capacity=6, luggage_capacity=4, description='Comfort vehicle'
        )

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
            'travel_destinations': 'Delhi, Agra, Jaipur, Udaipur',
            'vehicle_ids': [self.vehicle.id],
            'needs_guide': True,
            'guide_locations': ['Delhi', 'Agra', 'Jaipur'],
            'message': 'We require a chauffeured vehicle for our journey.'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        self.assertTrue(response.data['reference_code'].startswith('INQ-'))

        inquiry = Inquiry.objects.get(reference_code=response.data['reference_code'])
        self.assertEqual(inquiry.vehicles.count(), 1)
        self.assertTrue(inquiry.needs_guide)
        self.assertEqual(inquiry.travel_destinations, 'Delhi, Agra, Jaipur, Udaipur')
        self.assertEqual(inquiry.guide_locations, ['Delhi', 'Agra', 'Jaipur'])

    def test_contact_submission_with_optional_guide(self):
        url = reverse('inquiry-contact')
        data = {
            'fullName': 'Sarah Jenkins',
            'email': 'sarah@example.com',
            'phone': '+14155552671',
            'country': 'United States',
            'serviceInterest': 'vehicles_only',
            'requestGuide': True,
            'guideLocations': ['Delhi', 'Agra', 'Varanasi'],
            'guideLanguages': 'English, French',
            'message': 'Looking for private car and guide in selected historic cities.'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])

        inquiry = Inquiry.objects.get(reference_code=response.data['reference_code'])
        self.assertEqual(inquiry.full_name, 'Sarah Jenkins')
        self.assertTrue(inquiry.needs_guide)
        self.assertEqual(inquiry.guide_locations, ['Delhi', 'Agra', 'Varanasi'])
        self.assertEqual(inquiry.guide_languages, 'English, French')

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
