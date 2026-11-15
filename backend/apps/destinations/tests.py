from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Region, Destination

class DestinationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.north_region = Region.objects.create(
            name='north',
            slug='north-india',
            title='North India',
            tagline='Imperial Palaces',
            description='Majestic North',
            best_time_to_visit='October to March'
        )
        self.south_region = Region.objects.create(
            name='south',
            slug='south-india',
            title='South India',
            tagline='Tranquil Backwaters',
            description='Tropical South',
            best_time_to_visit='September to March'
        )
        self.jaipur = Destination.objects.create(
            name='Jaipur',
            slug='jaipur',
            state='Rajasthan',
            region=self.north_region,
            short_description='The Pink City',
            detailed_description='Historical capital of Rajasthan',
            best_time_to_visit='October to March',
            recommended_duration='3 Days',
            is_featured=True,
            is_published=True
        )
        self.alleppey = Destination.objects.create(
            name='Alleppey',
            slug='alleppey',
            state='Kerala',
            region=self.south_region,
            short_description='Venice of the East',
            detailed_description='Serene backwaters and private houseboats',
            best_time_to_visit='September to March',
            recommended_duration='2 Days',
            is_featured=False,
            is_published=True
        )

    def test_region_list_endpoint(self):
        url = reverse('region-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 2)

    def test_destination_list_filter_by_region(self):
        url = reverse('destination-list') + '?region=north-india'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['name'], 'Jaipur')

    def test_destination_search_query(self):
        url = reverse('destination-list') + '?search=Venice'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['name'], 'Alleppey')

    def test_destination_detail_by_slug(self):
        url = reverse('destination-detail', kwargs={'slug': 'jaipur'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Jaipur')
        self.assertEqual(response.data['state'], 'Rajasthan')
