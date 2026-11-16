from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from decimal import Decimal
from apps.website_settings.models import WebsiteSettings
from apps.vehicles.models import VehicleCategory, Vehicle, VehicleImage
from apps.testimonials.models import Testimonial
from apps.faqs.models import FAQ
from apps.currency.models import CurrencyRate

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with verified initial vehicles, testimonials, FAQs and currency rates.'

    def handle(self, *args, **options):
        self.stdout.write("Seeding travel services discovery platform database...")

        # 1. Admin superuser
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin12345')
            self.stdout.write(self.style.SUCCESS("Created admin user (admin / admin12345)"))

        # 2. Website Settings
        settings = WebsiteSettings.get_settings()
        settings.company_name = "Namaste Journeys"
        settings.tagline = "Premium Indian Travel Services: Chauffeured Tourist Vehicles"
        settings.email_address = "inquiries@namastejourneys.com"
        settings.phone_number = "+91 11 2345 6789"
        settings.whatsapp_number = "+919876543210"
        settings.default_currency = "INR"
        settings.supported_currencies = ["INR", "USD", "EUR", "GBP"]
        settings.save()

        # 3. Currency Rates
        CurrencyRate.objects.update_or_create(
            target_currency='USD',
            defaults={'base_currency': 'INR', 'rate': Decimal('0.011800'), 'inverse_rate': Decimal('84.750000')}
        )
        CurrencyRate.objects.update_or_create(
            target_currency='EUR',
            defaults={'base_currency': 'INR', 'rate': Decimal('0.011000'), 'inverse_rate': Decimal('90.900000')}
        )
        CurrencyRate.objects.update_or_create(
            target_currency='GBP',
            defaults={'base_currency': 'INR', 'rate': Decimal('0.009300'), 'inverse_rate': Decimal('107.500000')}
        )

        # 4. Vehicle Categories & Vehicles
        veh_categories_data = [
            ('Sedan', 'sedan', 'Comfortable air-conditioned private sedans for couples and solo travelers', 1),
            ('SUV', 'suv', 'Spacious high-ground clearance luxury SUVs for family road trips & hilly terrains', 2),
            ('MUV', 'muv', 'Multi-utility vehicles balancing passenger seating and luggage space', 3),
            ('Premium Cars', 'premium-cars', 'Executive premium sedans for high-comfort long-distance touring', 4),
            ('Luxury Cars', 'luxury-cars', 'Chauffeured luxury Mercedes & BMW sedans for diplomatic and VIP voyagers', 5),
            ('Tempo Traveller', 'tempo-traveller', 'Dedicated group minibuses with high-roof air conditioning & reclining seats', 6),
            ('Mini Bus', 'mini-bus', 'Mid-sized group coaches for private delegation transfers and excursions', 7),
            ('Luxury Coach', 'luxury-coach', 'Full-size luxury air-conditioned coaches for large tour groups', 8),
            ('Tourist Bus', 'tourist-bus', 'Comfortable long-haul interstate tourist coaches', 9),
        ]
        created_veh_cats = {}
        for cat_name, cat_slug, cat_desc, cat_order in veh_categories_data:
            vc, _ = VehicleCategory.objects.update_or_create(
                slug=cat_slug,
                defaults={'name': cat_name, 'description': cat_desc, 'display_order': cat_order}
            )
            created_veh_cats[cat_slug] = vc

        vehicles_data = [
            {
                'name': 'Toyota Innova Crysta (Luxury MUV)',
                'slug': 'toyota-innova-crysta',
                'brand': 'Toyota',
                'model_name': 'Innova Crysta ZX',
                'category': created_veh_cats['muv'],
                'seating_capacity': 6,
                'luggage_capacity': 4,
                'is_air_conditioned': True,
                'facilities': ['Dedicated Verified Chauffeur in Uniform', 'Bottled Mineral Water', 'USB Charging Ports', 'First Aid Kit', 'Air Purifier', 'Reclining Captain Seats'],
                'description': 'India’s most celebrated tourist vehicle. Offers unbeatable suspension comfort across mountain roads and interstate expressways with dedicated chauffeur service.',
                'price_inr': Decimal('4800.00'),
                'pricing_unit': 'Per Day (250 km included)',
                'availability_status': 'available',
                'is_featured': True,
            },
            {
                'name': 'Mercedes-Benz E-Class Luxury Sedan',
                'slug': 'mercedes-benz-e-class',
                'brand': 'Mercedes-Benz',
                'model_name': 'E 220d Exclusive',
                'category': created_veh_cats['luxury-cars'],
                'seating_capacity': 3,
                'luggage_capacity': 3,
                'is_air_conditioned': True,
                'facilities': ['Executive Leather Seating', 'Chauffeur in Formal Attire', 'Ambient Lighting', 'Chilled Bottled Water', 'Wi-Fi Hotspot', 'Sanitized Interior'],
                'description': 'The epitome of diplomatic elegance. Perfect for luxury Golden Triangle journeys, royal palace transfers in Rajasthan, and executive airport receptions.',
                'price_inr': Decimal('14500.00'),
                'pricing_unit': 'Per Day (8 Hours / 80 km)',
                'availability_status': 'available',
                'is_featured': True,
            },
            {
                'name': 'Toyota Fortuner 4x4 Luxury SUV',
                'slug': 'toyota-fortuner-4x4',
                'brand': 'Toyota',
                'model_name': 'Fortuner 2.8L 4x4 AT',
                'category': created_veh_cats['suv'],
                'seating_capacity': 6,
                'luggage_capacity': 4,
                'is_air_conditioned': True,
                'facilities': ['All-Wheel Drive Traction', 'High Ground Clearance', 'Leather Reclining Seats', 'Phone Charging Sockets', 'Mineral Water', 'Luggage Carrier'],
                'description': 'Built for high Himalayan passes in Ladakh and Himachal, desert trails in Jaisalmer, and jungle safari approaches in Kaziranga and Gir.',
                'price_inr': Decimal('7500.00'),
                'pricing_unit': 'Per Day (250 km included)',
                'availability_status': 'available',
                'is_featured': True,
            },
            {
                'name': 'Force Urbania Luxury Van (9-12 Seater)',
                'slug': 'force-urbania-luxury-van',
                'brand': 'Force Motors',
                'model_name': 'Urbania Premium Monocoque',
                'category': created_veh_cats['tempo-traveller'],
                'seating_capacity': 10,
                'luggage_capacity': 8,
                'is_air_conditioned': True,
                'facilities': ['World-class Monocoque Ride Quality', 'Individual AC Vents', 'Individual USB Ports', 'Large Panoramic Windows', 'Overhead Luggage Racks', 'Spacious Central Aisle'],
                'description': 'A new standard in group luxury touring. European styling, ultra-quiet cabin, and plush captain seats designed for discerning family and delegations.',
                'price_inr': Decimal('8500.00'),
                'pricing_unit': 'Per Day (250 km included)',
                'availability_status': 'available',
                'is_featured': True,
            },
            {
                'name': 'Tempo Traveller 16-Seater Deluxe',
                'slug': 'tempo-traveller-16-seater',
                'brand': 'Force Motors',
                'model_name': 'Traveller 3700 WB Deluxe',
                'category': created_veh_cats['tempo-traveller'],
                'seating_capacity': 15,
                'luggage_capacity': 12,
                'is_air_conditioned': True,
                'facilities': ['2x1 Pushback Reclining Seats', 'Roof AC', 'LED Reading Lights', 'Ice Box & First Aid Kit', 'Microphone PA System'],
                'description': 'The proven choice for medium-sized international groups touring Rajasthan, South India, and Buddhist circuits.',
                'price_inr': Decimal('9200.00'),
                'pricing_unit': 'Per Day (250 km included)',
                'availability_status': 'available',
                'is_featured': False,
            },
            {
                'name': 'Luxury Volvo Air-Conditioned Coach (45 Seater)',
                'slug': 'luxury-volvo-coach-45-seater',
                'brand': 'Volvo',
                'model_name': 'Volvo 9600 Multi-Axle',
                'category': created_veh_cats['luxury-coach'],
                'seating_capacity': 45,
                'luggage_capacity': 40,
                'is_air_conditioned': True,
                'facilities': ['Air Suspension Ride', 'Ergonomic Reclining Seats', 'PA Microphone System', 'Underfloor Vast Cargo Hold', 'Emergency Exits & CCTV'],
                'description': 'State-of-the-art multi-axle luxury coach for large international corporate groups, academic tours, and cultural delegations.',
                'price_inr': None,
                'pricing_unit': 'Request a Quote',
                'availability_status': 'on_request',
                'is_featured': True,
            },
            {
                'name': 'Toyota Camry Hybrid Premium Sedan',
                'slug': 'toyota-camry-hybrid',
                'brand': 'Toyota',
                'model_name': 'Camry Hybrid Electric',
                'category': created_veh_cats['premium-cars'],
                'seating_capacity': 3,
                'luggage_capacity': 3,
                'is_air_conditioned': True,
                'facilities': ['Whisper-quiet Hybrid Powertrain', 'Rear Reclining Sunshade Seats', 'Three-zone Climate Control', 'Chilled Water & Mints', 'Uniformed Chauffeur'],
                'description': 'Eco-conscious executive refinement. Ideal for city excursions in Delhi, Mumbai, Bengaluru, and airport transfers.',
                'price_inr': Decimal('9500.00'),
                'pricing_unit': 'Per Day (8 Hours / 80 km)',
                'availability_status': 'available',
                'is_featured': False,
            },
        ]

        for v_data in vehicles_data:
            veh, _ = Vehicle.objects.update_or_create(
                slug=v_data['slug'],
                defaults=v_data
            )
        self.stdout.write(self.style.SUCCESS("Created Vehicles"))

        # 5. Testimonials
        testimonials_seed = [
            {
                'author_name': 'Dr. Eleanor & Marcus Vance',
                'author_location': 'London, United Kingdom',
                'trip_title': 'Rajasthan Forts & Golden Triangle Private Chauffeur',
                'review_text': 'From the moment our chauffeur met us at Delhi airport in a spotless Toyota Innova Crysta, until our departure from Udaipur, every transfer was completely effortless. Punctual, exceptionally polite, and knowledgeable about scenic routes across Rajasthan.',
                'rating': 5,
                'is_featured': True,
                'display_order': 1,
            },
            {
                'author_name': 'David K. Söderström',
                'author_location': 'Stockholm, Sweden',
                'trip_title': 'Kerala Private Chauffeur Tour',
                'review_text': 'As first-time visitors to India, we valued punctuality, comfortable air-conditioned private transport, and personalized pace. The private driver was courteous and drove safely through mountain passes. Highly recommend Namaste Journeys!',
                'rating': 5,
                'is_featured': True,
                'display_order': 2,
            },
            {
                'author_name': 'Claire & Jean-Philippe Mercier',
                'author_location': 'Lyon, France',
                'trip_title': 'Rajasthan Heritage Chauffeured Journey',
                'review_text': 'Finding a reliable, spotless vehicle with a courteous English-speaking chauffeur for our multi-city trip in India made all the difference. The vehicle was immaculate throughout and every transfer was on time.',
                'rating': 5,
                'is_featured': True,
                'display_order': 3,
            },
        ]
        for t_data in testimonials_seed:
            Testimonial.objects.update_or_create(
                author_name=t_data['author_name'],
                defaults=t_data
            )
        self.stdout.write(self.style.SUCCESS("Created Testimonials"))

        # 6. FAQs
        faqs_seed = [
            {
                'category': 'transport',
                'question': 'What type of tourist vehicles do you provide?',
                'answer': 'We provide modern, clean, air-conditioned private vehicles ranging from sedans (Toyota Camry, Dzire), luxury SUVs (Toyota Fortuner, Innova Crysta), executive cars (Mercedes-Benz E-Class), up to Force Urbania luxury vans, Tempo Travellers, and luxury Volvo coaches.',
                'display_order': 1,
                'is_featured': True,
            },
            {
                'category': 'general',
                'question': 'How does the travel service inquiry work?',
                'answer': 'Browse our chauffeured tourist vehicles. You can add any number of items into your "My Travel Inquiry" cart, specify your dates, passenger requirements, and pickup locations, and submit one consolidated inquiry or send it via WhatsApp.',
                'display_order': 2,
                'is_featured': True,
            },
            {
                'category': 'transport',
                'question': 'Are your chauffeurs experienced with international travelers?',
                'answer': 'Yes. All our chauffeurs are vetted professionals with verified commercial driving licenses, background checks, polite etiquette, and extensive experience navigating intercity tourist routes across India.',
                'display_order': 3,
                'is_featured': True,
            },
            {
                'category': 'booking',
                'question': 'Are vehicle prices fixed or negotiable?',
                'answer': 'Displayed prices are indicative estimates in INR (and converted into USD, EUR, GBP). Final quotations are provided transparently based on your exact itinerary, route mileage, travel dates, and toll/parking inclusions without hidden surcharges.',
                'display_order': 4,
                'is_featured': True,
            },
        ]
        for f_data in faqs_seed:
            FAQ.objects.update_or_create(
                question=f_data['question'],
                defaults=f_data
            )
        self.stdout.write(self.style.SUCCESS("Created FAQs"))

        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))
