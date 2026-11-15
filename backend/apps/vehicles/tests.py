from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from decimal import Decimal
from .models import VehicleCategory, Vehicle

class VehicleTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = VehicleCategory.objects.create(name='MUV', slug='muv', display_order=1)
        self.vehicle = Vehicle.objects.create(
            name='Toyota Innova Crysta',
            slug='toyota-innova-crysta',
            brand='Toyota',
            model_name='Crysta ZX',
            category=self.category,
            seating_capacity=6,
            luggage_capacity=4,
            is_air_conditioned=True,
            price_inr=Decimal('4800.00'),
            pricing_unit='Per Day',
            availability_status='available',
            description='Prime tourist vehicle',
            is_featured=True,
            is_published=True
        )

    def test_vehicle_list_endpoint(self):
        url = reverse('vehicle-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertGreaterEqual(len(results), 1)
        self.assertEqual(results[0]['name'], 'Toyota Innova Crysta')

    def test_vehicle_category_filter(self):
        url = reverse('vehicle-list') + '?category=muv'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)

    def test_vehicle_detail_by_slug(self):
        url = reverse('vehicle-detail', kwargs={'slug': 'toyota-innova-crysta'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['brand'], 'Toyota')
