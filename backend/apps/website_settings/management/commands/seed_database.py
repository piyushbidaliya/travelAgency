from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from decimal import Decimal
from apps.website_settings.models import WebsiteSettings
from apps.languages.models import Language
from apps.vehicles.models import VehicleCategory, Vehicle, VehicleImage
from apps.guides.models import GuideCategory, Guide, GuideLanguage
from apps.testimonials.models import Testimonial
from apps.faqs.models import FAQ
from apps.currency.models import CurrencyRate

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with verified initial vehicles, guides, languages, testimonials, FAQs and currency rates.'

    def handle(self, *args, **options):
        self.stdout.write("Seeding travel services discovery platform database...")

        # 1. Admin superuser
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin12345')
            self.stdout.write(self.style.SUCCESS("Created admin user (admin / admin12345)"))

        # 2. Website Settings
        settings = WebsiteSettings.get_settings()
        settings.company_name = "Namaste Journeys"
        settings.tagline = "Premium Indian Travel Services: Vehicles & Multilingual Guides"
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

        # 4. Languages
        languages_seed = [
            ('English', 'en', 1),
            ('Hindi', 'hi', 2),
            ('French', 'fr', 3),
            ('German', 'de', 4),
            ('Spanish', 'es', 5),
            ('Italian', 'it', 6),
            ('Russian', 'ru', 7),
            ('Japanese', 'ja', 8),
            ('Chinese', 'zh', 9),
            ('Arabic', 'ar', 10),
            ('Korean', 'ko', 11),
        ]
        created_languages = {}
        for l_name, l_code, l_order in languages_seed:
            lang, _ = Language.objects.update_or_create(
                code=l_code,
                defaults={'name': l_name, 'display_order': l_order, 'is_active': True}
            )
            created_languages[l_code] = lang
        self.stdout.write(self.style.SUCCESS("Created Languages"))

        # 5. Vehicle Categories & Vehicles
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
                'facilities': ['2x1 Pushback Reclining Seats', 'Roof AC', 'LED Reading Lights', 'Ice Box & First Aid Kit', 'Microphone System for Guide'],
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
                'facilities': ['Air Suspension Ride', 'Ergonomic Reclining Seats', 'PA System & Guide Microphone', 'Underfloor Vast Cargo Hold', 'Emergency Exits & CCTV'],
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

        # 8. Guide Categories & Tour Guides
        guide_categories_data = [
            ('Professional Tour Guide', 'professional-tour-guide', 'Govt. certified regional tour leaders with extensive national itinerary expertise', 1),
            ('Local City Guide', 'local-city-guide', 'Deep experts in individual historical cities and UNESCO monument zones', 2),
            ('Heritage Guide', 'heritage-guide', 'Specialists in ancient temple epigraphy, fort architecture, and dynasties', 3),
            ('Cultural Guide', 'cultural-guide', 'Experts in living traditions, festivals, culinary walks, and classical arts', 4),
            ('Wildlife Guide', 'wildlife-guide', 'Certified naturalists and birding specialists for national parks and tiger reserves', 5),
            ('Adventure Guide', 'adventure-guide', 'High Himalayan trekking, pass crossings, and river expedition leaders', 6),
            ('Religious and Spiritual Guide', 'religious-and-spiritual-guide', 'Scholars in Vedic rituals, Hindu philosophy, Buddhism, and sacred ghats', 7),
            ('Nature Guide', 'nature-guide', 'Botanical, plantation, and rainforest biosphere educators', 8),
        ]
        created_guide_cats = {}
        for g_name, g_slug, g_desc, g_order in guide_categories_data:
            gc, _ = GuideCategory.objects.update_or_create(
                slug=g_slug,
                defaults={'name': g_name, 'description': g_desc, 'display_order': g_order}
            )
            created_guide_cats[g_slug] = gc

        guides_data = [
            {
                'full_name': 'Vikramaditya Sharma',
                'slug': 'vikramaditya-sharma',
                'category': created_guide_cats['heritage-guide'],
                'short_intro': 'Senior ASI-certified architectural historian specializing in the Mughal Empire and Rajput fortresses.',
                'biography': 'With over 18 years guiding diplomatic delegations, academic researchers, and discerning travelers across Delhi, Agra, and Rajasthan, Vikram brings ancient stone inscriptions and palace intrigue vividly to life.',
                'years_of_experience': 18,
                'areas_of_expertise': ['Mughal Architecture', 'Rajput Fortifications', 'Pietra Dura Stone Inlay', 'Old Delhi Heritage Trails'],
                'specializations': ['Ministry of Tourism Regional Certified', 'Senior ASI Historian', 'VIP Diplomatic Guide'],
                'price_inr': Decimal('5500.00'),
                'pricing_unit': 'Per Day (Full Day Guide)',
                'availability_status': 'available',
                'certifications': 'Govt. of India Ministry of Tourism Northern Region Certified Guide (License #NR-9812)',
                'is_featured': True,
                'languages': [('en', 'native'), ('fr', 'fluent'), ('hi', 'native')],
            },
            {
                'full_name': 'Marie-Claire Dubois (Kishore)',
                'slug': 'marie-claire-kishore',
                'category': created_guide_cats['cultural-guide'],
                'short_intro': 'Native French-speaking cultural specialist with deep expertise in Rajasthan palaces and culinary heritage.',
                'biography': 'Marie-Claire has resided in Jaipur for 14 years. Fluent in both French and English, she bridges Western expectations with authentic Indian cultural immersion, from private haveli visits to gemstone ateliers.',
                'years_of_experience': 14,
                'areas_of_expertise': ['Rajasthani Royal Living', 'Handicraft & Textile Traditions', 'Bespoke Culinary Walks', 'Living Art Workshops'],
                'specializations': ['Native French Speaker', 'Bespoke Private Group Guide'],
                'price_inr': Decimal('6500.00'),
                'pricing_unit': 'Per Day',
                'availability_status': 'available',
                'certifications': 'Certified Regional Cultural Tour Guide (License #RJ-4412)',
                'is_featured': True,
                'languages': [('fr', 'native'), ('en', 'fluent'), ('es', 'conversational')],
            },
            {
                'full_name': 'Klaus Schneider',
                'slug': 'klaus-schneider',
                'category': created_guide_cats['professional-tour-guide'],
                'short_intro': 'German-speaking expert guide for Golden Triangle, Varanasi, and South India temple circuits.',
                'biography': 'Klaus specializes in guiding travelers from Germany, Austria, and Switzerland. His scholarly knowledge of Indian philosophy and classical architecture makes complex histories accessible and engrossing.',
                'years_of_experience': 16,
                'areas_of_expertise': ['Indo-Islamic History', 'Buddhist Circuit (Sarnath, Bodh Gaya)', 'Dravidian Temples', 'Spiritual Rituals'],
                'specializations': ['Native German Speaker', 'Philosophy Lecturer', 'Ministry of Tourism Certified'],
                'price_inr': Decimal('6500.00'),
                'pricing_unit': 'Per Day',
                'availability_status': 'available',
                'certifications': 'Ministry of Tourism Certified National Tour Guide',
                'is_featured': True,
                'languages': [('de', 'native'), ('en', 'fluent')],
            },
            {
                'full_name': 'Rameshwar Nair',
                'slug': 'rameshwar-nair',
                'category': created_guide_cats['nature-guide'],
                'short_intro': 'Kerala backwaters and Western Ghats biodiversity expert with native fluency in English and Spanish.',
                'biography': 'Born in Fort Kochi, Rameshwar has spent 12 years guiding visitors through Kerala’s spice plantations, tea estates of Munnar, and backwaters of Alleppey, sharing botanical insights and local folklore.',
                'years_of_experience': 12,
                'areas_of_expertise': ['Ayurvedic Medicinal Plants', 'Backwater Ecology', 'Colonial Fort Kochi History', 'Kathakali Dance Philosophy'],
                'specializations': ['Kerala Tourism Certified', 'Botanist & Naturalist', 'Spanish Speaking Guide'],
                'price_inr': Decimal('4500.00'),
                'pricing_unit': 'Per Day',
                'availability_status': 'available',
                'certifications': 'Kerala Tourism Development Corporation Certified Guide',
                'is_featured': True,
                'languages': [('es', 'fluent'), ('en', 'fluent'), ('hi', 'conversational')],
            },
            {
                'full_name': 'Dr. Tashi Norbu',
                'slug': 'dr-tashi-norbu',
                'category': created_guide_cats['religious-and-spiritual-guide'],
                'short_intro': 'Tibetan Buddhist scholar and high-altitude trans-Himalayan guide across Ladakh and Sikkim.',
                'biography': 'Holding a doctorate in Buddhist philosophy, Dr. Tashi Norbu leads travelers through Ladakh’s ancient gompas (Hemis, Thiksey, Diskit) and high-altitude mountain passes with profound spiritual and geological depth.',
                'years_of_experience': 15,
                'areas_of_expertise': ['Tibetan Buddhist Art & Frescoes', 'Gompa Architecture', 'Himalayan Dark Sky Stargazing', 'High-altitude Acclimatization'],
                'specializations': ['Monastic Ritual Scholar', 'Ladakh Tourism Certified Explorer'],
                'price_inr': Decimal('5800.00'),
                'pricing_unit': 'Per Day',
                'availability_status': 'available',
                'certifications': 'Ladakh Autonomous Hill Development Council Certified Guide',
                'is_featured': True,
                'languages': [('en', 'fluent'), ('hi', 'fluent')],
            },
            {
                'full_name': 'Kenji Takahashi (Verma)',
                'slug': 'kenji-verma',
                'category': created_guide_cats['local-city-guide'],
                'short_intro': 'Japanese-speaking specialist guide for Delhi, Agra, and Jaipur heritage monuments.',
                'biography': 'Having studied Japanese language and international tourism at JNU Delhi, Kenji has guided Japanese VIPs and cultural missions for over a decade with impeccable punctuality and cultural etiquette.',
                'years_of_experience': 11,
                'areas_of_expertise': ['Taj Mahal Architecture', 'Amer Fort History', 'Japanese Travel Etiquette', 'Tea Ceremonies and Indian Masala Chai'],
                'specializations': ['Certified Japanese Language Guide (JLPT N1)', 'Ministry of Tourism Certified'],
                'price_inr': Decimal('7000.00'),
                'pricing_unit': 'Per Day',
                'availability_status': 'available',
                'certifications': 'Ministry of Tourism Certified Foreign Language Guide (Japanese)',
                'is_featured': False,
                'languages': [('ja', 'fluent'), ('en', 'fluent'), ('hi', 'native')],
            },
        ]

        for g_data in guides_data:
            langs = g_data.pop('languages')
            guide, _ = Guide.objects.update_or_create(
                slug=g_data['slug'],
                defaults=g_data
            )
            
            # Associate languages with proficiency
            for l_code, prof in langs:
                lang_obj = created_languages.get(l_code)
                if lang_obj:
                    GuideLanguage.objects.update_or_create(
                        guide=guide,
                        language=lang_obj,
                        defaults={'proficiency': prof}
                    )
        self.stdout.write(self.style.SUCCESS("Created Tour Guides with Language Proficiencies"))

        # 9. Testimonials
        testimonials_seed = [
            {
                'author_name': 'Dr. Eleanor & Marcus Vance',
                'author_location': 'London, United Kingdom',
                'trip_title': 'Rajasthan Forts & Golden Triangle Private Chauffeur & Guide',
                'review_text': 'From the moment our chauffeur met us at Delhi airport in a spotless Toyota Innova Crysta, until our departure from Udaipur, every transfer was completely effortless. Our private historian Vikram was phenomenal, explaining the sheer scale of Amer Fort and the Taj Mahal with extraordinary depth.',
                'rating': 5,
                'is_featured': True,
                'display_order': 1,
            },
            {
                'author_name': 'David K. Söderström',
                'author_location': 'Stockholm, Sweden',
                'trip_title': 'Kerala Private Chauffeur & Naturalist',
                'review_text': 'As first-time visitors to India, we valued punctuality, comfortable air-conditioned private transport, and personalized pace. The private driver was courteous and drove safely through mountain passes. Highly recommend Namaste Journeys!',
                'rating': 5,
                'is_featured': True,
                'display_order': 2,
            },
            {
                'author_name': 'Claire & Jean-Philippe Mercier',
                'author_location': 'Lyon, France',
                'trip_title': 'Rajasthan Heritage with French-Speaking Tour Guide',
                'review_text': 'Finding a genuine, certified French-speaking guide for our multi-city trip in India made all the difference. Marie-Claire was brilliant, courteous, and attentive to every nuance. The vehicle was immaculate throughout.',
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

        # 10. FAQs
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
                'answer': 'Browse our destinations, vehicles, and tour guides. You can add any number of items into your "My Travel Inquiry" cart, specify your dates, passenger requirements, and preferred languages, and submit one consolidated inquiry or send it via WhatsApp.',
                'display_order': 2,
                'is_featured': True,
            },
            {
                'category': 'general',
                'question': 'Can we request tour guides who speak specific international languages?',
                'answer': 'Yes. We provide certified multilingual guides proficient in English, French, German, Spanish, Italian, Japanese, Russian, Chinese, Arabic, and Hindi with verifiable credentials.',
                'display_order': 3,
                'is_featured': True,
            },
            {
                'category': 'booking',
                'question': 'Are vehicle and guide prices fixed or negotiable?',
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
