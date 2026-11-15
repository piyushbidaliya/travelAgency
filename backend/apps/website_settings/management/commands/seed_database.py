from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from decimal import Decimal
from apps.website_settings.models import WebsiteSettings
from apps.destinations.models import Region, Destination, DestinationImage
from apps.packages.models import TourPackage
from apps.itineraries.models import Itinerary, ItineraryDay
from apps.testimonials.models import Testimonial
from apps.faqs.models import FAQ
from apps.currency.models import CurrencyRate

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with verified initial destinations, packages, itineraries, testimonials, FAQs and currency rates.'

    def handle(self, *args, **options):
        self.stdout.write("Seeding comprehensive database...")

        # 1. Admin superuser
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin12345')
            self.stdout.write(self.style.SUCCESS("Created admin user (admin / admin12345)"))

        # 2. Website Settings
        settings = WebsiteSettings.get_settings()
        settings.company_name = "Namaste Journeys"
        settings.tagline = "Extraordinary Journeys Through India"
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

        # 4. Regions
        regions_info = [
            {
                'name': 'north', 'slug': 'north-india', 'title': 'North India',
                'tagline': 'Imperial Palaces, Sacred Rivers & Majestic Himalayan Heights',
                'description': 'Home to the iconic Golden Triangle, regal Rajput fortresses of Rajasthan, holy spirituality of Varanasi, and snow-crowned Himalayan valleys.',
                'best_time_to_visit': 'October to March (Himalayas: May to September)',
                'popular_experiences': ['Taj Mahal at sunrise with senior historian', 'Private palace dinners in Rajasthan', 'Ganga Aarti ceremonies in Varanasi', 'Chauffeur expeditions across Ladakh passes'],
                'display_order': 1
            },
            {
                'name': 'south', 'slug': 'south-india', 'title': 'South India',
                'tagline': 'Tranquil Backwaters, Ancient Dravidian Temples & Lush Plantations',
                'description': 'A serene sanctuary of palm-fringed backwaters, aromatic spice hills of Munnar and Coorg, and the stone-carved ruins of Hampi.',
                'best_time_to_visit': 'September to March',
                'popular_experiences': ['Private Kettuvallam houseboat journeys', 'Ayurvedic wellness retreats in Kovalam', 'Exploring the Vijayanagara ruins of Hampi', 'Tea estate bungalows in Munnar'],
                'display_order': 2
            },
            {
                'name': 'east', 'slug': 'east-india', 'title': 'East & North-East India',
                'tagline': 'Colonial Elegance, Living Root Bridges & Rhino Sanctuaries',
                'description': 'From Kolkata’s literary heritage to the mystical clouds of Meghalaya, organic tea slopes of Darjeeling, and wild safaris of Kaziranga.',
                'best_time_to_visit': 'October to April',
                'popular_experiences': ['Toy Train ride overlooking Kanchenjunga', 'One-horned rhino safaris in Kaziranga', 'Trekking living root bridges in Cherrapunji', 'Kolkata heritage walk & culinary trail'],
                'display_order': 3
            },
            {
                'name': 'west', 'slug': 'west-india', 'title': 'West India',
                'tagline': 'Golden Coastlines, White Salt Deserts & Asiatic Lions',
                'description': 'Dynamic metropolis of Mumbai, bohemian luxury villas of Goa, the stark ethereal White Rann of Kutch, and Gir’s untamed wildlife.',
                'best_time_to_visit': 'November to February',
                'popular_experiences': ['Full-moon glamping in Rann of Kutch', 'Private sailing & luxury villas in South Goa', 'Art deco architectural walks in South Mumbai', 'Tracking Asiatic lions in Gir National Park'],
                'display_order': 4
            },
        ]
        created_regions = {}
        for r_data in regions_info:
            reg, _ = Region.objects.update_or_create(name=r_data['name'], defaults=r_data)
            created_regions[r_data['name']] = reg

        # 5. Core Destinations Database Import
        destinations_data = [
            # NORTH
            ('Delhi', 'delhi', 'Delhi NCR', 'north', 'India’s majestic capital blending 8 historic empires with tree-lined colonial avenues and vibrant spice bazaars.', 'October to March', '2-3 Days', ['Humayun’s Tomb', 'Qutub Minar', 'Red Fort', 'Jama Masjid', 'India Gate'], ['Heritage cycle tour', 'Chandni Chowk tasting'], ['Heritage', 'Culture'], ['Winter', 'Spring'], True),
            ('Agra', 'agra', 'Uttar Pradesh', 'north', 'Home of the eternal Taj Mahal, monumental Agra Fort, and the deserted Mughal dream city of Fatehpur Sikri.', 'October to March', '1-2 Days', ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh'], ['Sunrise private viewing of Taj Mahal', 'Marble Pietra Dura atelier visit'], ['Heritage', 'Architecture'], ['Winter', 'Autumn'], True),
            ('Jaipur', 'jaipur', 'Rajasthan', 'north', 'The storied Pink City, famed for Amer Fort, pastel-hued royal palaces, and gemstone artisans.', 'October to March', '3-4 Days', ['Amer Fort', 'Hawa Mahal', 'City Palace', 'Jantar Mantar'], ['Sunrise balloon safari over Amer', 'Private gemologist consultation'], ['Heritage', 'Palace Stay'], ['Winter', 'Spring'], True),
            ('Udaipur', 'udaipur', 'Rajasthan', 'north', 'The romantic City of Lakes with marble palaces floating on serene Lake Pichola.', 'October to March', '3-4 Days', ['City Palace Complex', 'Lake Pichola', 'Jag Mandir', 'Saheliyon-ki-Bari'], ['Private sunset solar boat charter', 'Miniature painting masterclass'], ['Romantic', 'Luxury', 'Heritage'], ['Winter'], True),
            ('Jodhpur', 'jodhpur', 'Rajasthan', 'north', 'The Sun City crowned by towering Mehrangarh Fort and labyrinths of indigo-painted houses.', 'October to March', '2-3 Days', ['Mehrangarh Fort', 'Jaswant Thada', 'Umaid Bhawan Palace'], ['Ziplining fort battlements', 'Blue city Brahmin walk'], ['Heritage', 'Photography'], ['Winter'], False),
            ('Jaisalmer', 'jaisalmer', 'Rajasthan', 'north', 'The Golden City rising like a mirage from the Thar Desert with a living medieval sandstone fort.', 'October to March', '2-3 Days', ['Jaisalmer Fort', 'Patwon-ki-Haveli', 'Sam Sand Dunes'], ['Glamping in Thar dunes', 'Camel ride at sunset'], ['Desert', 'Heritage'], ['Winter'], False),
            ('Varanasi', 'varanasi', 'Uttar Pradesh', 'north', 'One of the oldest living cities on earth, where ancient Vedic rituals meet the sacred Ganges River.', 'October to March', '2-3 Days', ['Dashashwamedh Ghat', 'Assi Ghat', 'Kashi Vishwanath', 'Sarnath'], ['Sunrise riverboat ride', 'VIP seating for Ganga Aarti'], ['Spiritual', 'Ancient Culture'], ['Winter'], True),
            ('Rishikesh', 'rishikesh', 'Uttarakhand', 'north', 'The Yoga Capital of the World where the turquoise Ganga tumbles from Himalayan foothills.', 'September to April', '3-4 Days', ['Parmarth Niketan', 'Ram Jhula', 'Beatles Ashram'], ['Yoga & breathwork with master yogi', 'Aarti at Triveni Ghat'], ['Wellness', 'Yoga'], ['Spring', 'Autumn'], False),
            ('Haridwar', 'haridwar', 'Uttarakhand', 'north', 'Ancient pilgrimage gateway at Har Ki Pauri where millions witness floating leaf lamps at dusk.', 'October to March', '1-2 Days', ['Har Ki Pauri', 'Mansa Devi Temple', 'Chandi Devi'], ['Evening diya prayer ceremony', 'Ropeway ascent'], ['Spiritual', 'Heritage'], ['Winter'], False),
            ('Shimla', 'shimla', 'Himachal Pradesh', 'north', 'The historic British summer capital with Tudor-style lodges, pine forests, and Toy Train.', 'March to June & Oct to Feb', '3 Days', ['The Ridge & Mall Road', 'Viceregal Lodge', 'UNESCO Toy Train'], ['Toy train scenic ride', 'Colonial heritage walk'], ['Mountains', 'Colonial'], ['Summer', 'Winter'], False),
            ('Manali', 'manali', 'Himachal Pradesh', 'north', 'Alpine pine valley of snow summits, roaring Beas River, and gateway to high mountain passes.', 'April to June & Oct to Feb', '3-4 Days', ['Solang Valley', 'Hadimba Temple', 'Atal Tunnel'], ['Drive through Atal Tunnel', 'Cedar forest trekking'], ['Adventure', 'Alpine'], ['Summer', 'Winter'], False),
            ('Leh-Ladakh', 'leh-ladakh', 'Ladakh', 'north', 'The Moonland of high mountain passes, sapphire-colored Pangong Lake, and centuries-old Buddhist monasteries.', 'May to September', '6-8 Days', ['Pangong Tso Lake', 'Nubra Valley', 'Thiksey Monastery'], ['Monastic chanting at dawn', 'Bactrian camel ride'], ['Adventure', 'High Altitude'], ['Summer'], True),
            ('Kashmir', 'kashmir', 'Jammu & Kashmir', 'north', 'Paradise on Earth: cedar-lined Dal Lake houseboats, Mughal pleasure gardens, and alpine meadows.', 'March to October', '5-7 Days', ['Dal Lake', 'Gulmarg Gondola', 'Pahalgam', 'Shalimar Bagh'], ['Shikara sunset ride', 'Gulmarg Gondola to Apharwat peak'], ['Luxury Houseboat', 'Romantic'], ['Spring', 'Summer'], False),
            ('Amritsar', 'amritsar', 'Punjab', 'north', 'Spiritual center of Sikhism housing the glistening Golden Temple and legendary Punjabi hospitality.', 'October to March', '2 Days', ['Golden Temple', 'Wagah Border', 'Jallianwala Bagh'], ['Langar community kitchen service', 'Wagah Border ceremony'], ['Spiritual', 'Heritage'], ['Winter'], False),
            
            # SOUTH
            ('Kerala', 'kerala', 'Kerala', 'south', 'God’s Own Country: tranquil waterways, Ayurvedic sanctuaries, and misty mountain plantations.', 'September to March', '7-10 Days', ['Alleppey Backwaters', 'Munnar Tea Hills', 'Fort Kochi'], ['Houseboat cruise', 'Ayurvedic wellness rejuvenation'], ['Backwaters', 'Wellness'], ['Winter'], True),
            ('Munnar', 'munnar', 'Kerala', 'south', 'Rolling carpet of emerald tea estates nestled among the highest peaks of South India.', 'September to April', '2-3 Days', ['Eravikulam National Park', 'Mattupetty Dam', 'Tea Museum'], ['Tea plucking and tasting masterclass', 'Shola forest walk'], ['Plantations', 'Hills'], ['Winter', 'Autumn'], False),
            ('Alleppey', 'alleppey', 'Kerala', 'south', 'Venice of the East, famed for private luxury houseboats cruising calm, palm-canopied lagoons.', 'September to March', '2-3 Days', ['Vembanad Lake', 'Backwaters canals', 'Marari Beach'], ['Overnight luxury private houseboat journey', 'Village canoe trail'], ['Backwaters', 'Wellness'], ['Winter'], True),
            ('Kochi', 'kochi', 'Kerala', 'south', 'Historic port city weaving Chinese fishing nets, Portuguese havelis, and Dutch palaces.', 'October to March', '2 Days', ['Chinese Fishing Nets', 'Mattancherry Dutch Palace', 'Jew Town'], ['Fort Kochi walking tour', 'Kathakali classical dance show'], ['Colonial Heritage', 'Maritime'], ['Winter'], False),
            ('Wayanad', 'wayanad', 'Kerala', 'south', 'Lush rainforest sanctuary with Neolithic rock art caves, spice estates, and wild elephant corridors.', 'October to May', '3 Days', ['Edakkal Caves', 'Banasura Sagar Dam', 'Wayanad Wildlife Sanctuary'], ['Guided safari in wildlife sanctuary', 'Bamboo rafting'], ['Nature', 'Wildlife'], ['Winter'], False),
            ('Bengaluru', 'bengaluru', 'Karnataka', 'south', 'The Garden City and cosmopolitan tech innovation capital with leafy parks and craft breweries.', 'Year-round', '2 Days', ['Lalbagh Botanical Garden', 'Bangalore Palace', 'Cubbon Park'], ['Lalbagh morning walk', 'Artisan filter coffee tasting'], ['Urban', 'Gardens'], ['Winter', 'Spring'], False),
            ('Mysore', 'mysore', 'Karnataka', 'south', 'The City of Palaces, fragrant with sandalwood, rich Mysore silk, and royal Dasara heritage.', 'October to March', '2 Days', ['Mysore Palace', 'Chamundi Hill', 'Devaraja Market'], ['Mysore Palace royal art tour', 'Sandalwood & silk workshop'], ['Heritage', 'Palace'], ['Winter'], False),
            ('Ooty', 'ooty', 'Tamil Nadu', 'south', 'Queen of Hill Stations in the blue Nilgiri Mountains with UNESCO mountain railway.', 'October to June', '2-3 Days', ['Nilgiri Mountain Railway', 'Ooty Botanical Gardens', 'Pykara Lake'], ['UNESCO toy train steam ride', 'Nilgiri tea tasting'], ['Hills', 'Toy Train'], ['Spring', 'Summer'], False),
            ('Coorg', 'coorg', 'Karnataka', 'south', 'The Scotland of India: mist-veiled coffee plantations, spice gardens, and Tibetan settlements.', 'October to April', '2-3 Days', ['Namdroling Golden Temple', 'Abbey Falls', 'Raja’s Seat'], ['Private coffee estate walk', 'Monastery prayer chanting'], ['Plantations', 'Wellness'], ['Winter'], False),
            ('Chennai', 'chennai', 'Tamil Nadu', 'south', 'Gateway to South India, renowned for classical Carnatic music, Dravidian temples, and Marina Beach.', 'November to February', '2 Days', ['Kapaleeshwarar Temple', 'San Thome Basilica', 'Marina Beach'], ['Mylapore heritage walk', 'Chola bronzes inspection'], ['Dravidian Heritage', 'Coastal'], ['Winter'], False),
            ('Mahabalipuram', 'mahabalipuram', 'Tamil Nadu', 'south', 'UNESCO coastal sanctuary of 7th-century rock-cut monolithic temples and shore shrines.', 'October to March', '1-2 Days', ['Shore Temple', 'Descent of the Ganges', 'Pancha Rathas'], ['Archaeological survey walk', 'Shore temple photography'], ['Archaeology', 'UNESCO'], ['Winter'], False),
            ('Madurai', 'madurai', 'Tamil Nadu', 'south', 'The Athens of the East centered around the towering sculpted gopurams of Meenakshi Temple.', 'October to March', '1-2 Days', ['Meenakshi Amman Temple', 'Thirumalai Nayakkar Mahal'], ['Meenakshi Temple evening procession', 'Old bazaar rickshaw trail'], ['Temple Architecture', 'Spiritual'], ['Winter'], False),
            ('Rameswaram', 'rameswaram', 'Tamil Nadu', 'south', 'Sacred island temple sanctuary with the longest stone-pillared corridors in the world.', 'October to March', '1-2 Days', ['Ramanathaswamy Temple', 'Pamban Sea Bridge', 'Dhanushkodi'], ['1000-pillar corridor walk', '4x4 trip to Dhanushkodi'], ['Pilgrimage', 'Oceanic'], ['Winter'], False),
            ('Hampi', 'hampi', 'Karnataka', 'south', 'UNESCO World Heritage wonderland of boulder-strewn hills and monolithic ruins of the Vijayanagara Empire.', 'October to February', '3 Days', ['Virupaksha Temple', 'Vittala Stone Chariot', 'Lotus Mahal'], ['Sunset coracle boat ride', 'Matanga Hill sunrise hike'], ['History', 'Archaeology', 'UNESCO'], ['Winter'], True),
            ('Hyderabad', 'hyderabad', 'Telangana', 'south', 'City of Pearls and Nizami splendor, home to Charminar, Golconda Fort, and world-famous Biryani.', 'October to March', '2-3 Days', ['Charminar', 'Golconda Fort', 'Taj Falaknuma Palace'], ['High tea at Taj Falaknuma', 'Golconda sound and light show'], ['Nizami Heritage', 'Culinary'], ['Winter'], False),

            # EAST
            ('Kolkata', 'kolkata', 'West Bengal', 'east', 'Cultural & intellectual capital of India, filled with Victorian grandeur, tramways, and literary soul.', 'October to March', '2-3 Days', ['Victoria Memorial', 'Howrah Bridge', 'College Street'], ['Heritage tram ride', 'Kumartuli sculptor studio walk'], ['Colonial Heritage', 'Literature'], ['Winter'], True),
            ('Darjeeling', 'darjeeling', 'West Bengal', 'east', 'The Champagne of Teas hill retreat with panoramic views of Mount Kanchenjunga.', 'March to May & Oct to Dec', '3 Days', ['Tiger Hill', 'UNESCO Toy Train', 'Happy Valley Tea Estate'], ['Sunrise over Kanchenjunga', 'Tea tasting with master blender'], ['Tea Estates', 'Himalayas'], ['Spring', 'Autumn'], True),
            ('Sikkim', 'sikkim', 'Sikkim', 'east', 'India’s 100% organic Himalayan kingdom of sacred alpine lakes, rhododendrons, and monasteries.', 'March to May & Oct to Dec', '5-7 Days', ['Rumtek Monastery', 'Tsomgo Lake', 'Nathula Pass'], ['Monastery butter lamp ritual', 'Glacial lake excursion'], ['Organic Himalayan', 'Monasteries'], ['Spring', 'Autumn'], False),
            ('Gangtok', 'gangtok', 'Sikkim', 'east', 'Vibrant capital of Sikkim perched on mountain ridge with ropeway views and Buddhist sanctuaries.', 'October to May', '2-3 Days', ['MG Marg Promenade', 'Rumtek Dharma Chakra Centre', 'Enchey Monastery'], ['Gangtok ropeway ride', 'Tibetology institute exploration'], ['Himalayan Town', 'Culture'], ['Winter', 'Spring'], False),
            ('Pelling', 'pelling', 'Sikkim', 'east', 'Closest vantage town facing Mt. Kanchenjunga with glass skywalk and sacred forest monasteries.', 'October to May', '2 Days', ['Pemayangtse Monastery', 'Rabdentse Ruins', 'Glass Skywalk'], ['Glass skywalk stroll', 'Sunrise over Kanchenjunga'], ['Snow Views', 'Monasteries'], ['Winter', 'Spring'], False),
            ('Shillong', 'shillong', 'Meghalaya', 'east', 'The Scotland of the East: pine-scented hills, crystal waterfalls, and India’s rock music capital.', 'September to May', '2-3 Days', ['Umiam Lake', 'Elephant Falls', 'Laitlum Canyons'], ['Boating on Umiam Lake', 'Indigenous tribal culture museum'], ['Hills', 'Music & Youth'], ['Autumn', 'Winter'], False),
            ('Meghalaya', 'meghalaya', 'Meghalaya', 'east', 'The Abode of Clouds: living root bridges, mystical limestone caves, and transparent river waters.', 'October to April', '5-6 Days', ['Double Decker Living Root Bridge', 'Dawki Umngot River', 'Cherrapunji Waterfalls'], ['Living root bridge trek', 'Transparent boat ride on Umngot River'], ['Living Bridges', 'Adventure'], ['Autumn', 'Winter'], True),
            ('Cherrapunji', 'cherrapunji', 'Meghalaya', 'east', 'Land of thunderous waterfalls and the legendary double-decker living root bridges.', 'September to May', '2 Days', ['Nohkalikai Falls', 'Seven Sisters Falls', 'Mawsmai Cave'], ['Rainforest botanical hike', 'Mawsmai limestone cave exploration'], ['Waterfalls', 'Nature'], ['Autumn', 'Winter'], False),
            ('Kaziranga', 'kaziranga', 'Assam', 'east', 'UNESCO World Heritage home to two-thirds of the world’s great one-horned rhinoceros population.', 'November to April', '2-3 Days', ['Central & Western Safari Ranges', 'Brahmaputra Sanctuary'], ['Private 4x4 open-top jeep safari', 'Close-range rhino observation'], ['Wildlife Safari', 'UNESCO'], ['Winter', 'Spring'], True),
            ('Assam', 'assam', 'Assam', 'east', 'The Brahmaputra River valley of orthodox black tea estates, river islands, and ancient Ahom kingdom.', 'October to April', '4-6 Days', ['Brahmaputra Cruises', 'Majuli River Island', 'Kamakhya Temple'], ['Majuli mask making studio', 'River cruise excursion'], ['River Cruise', 'Tea Plantations'], ['Winter', 'Spring'], False),
            ('Puri', 'puri', 'Odisha', 'east', 'Coastal pilgrimage city housing the 12th-century Jagannath Temple and annual Rath Yatra.', 'October to March', '2 Days', ['Jagannath Temple', 'Golden Beach', 'Konark Sun Temple nearby'], ['Konark sun temple excursion', 'Pattachitra artisan village tour'], ['Pilgrimage', 'Beach'], ['Winter'], False),
            ('Bhubaneswar', 'bhubaneswar', 'Odisha', 'east', 'The Temple City of India, preserving over 500 historic Kalinga-style sandstone shrines.', 'October to March', '2 Days', ['Mukteshvara Temple', 'Lingaraj Temple', 'Udayagiri Caves'], ['Temple architecture heritage walk', 'Ancient Jain rock-cut caves'], ['Archaeology', 'History'], ['Winter'], False),

            # WEST
            ('Mumbai', 'mumbai', 'Maharashtra', 'west', 'The Financial Capital: Victorian Gothic & Art Deco architecture, Marine Drive, and Bollywood.', 'November to February', '2-3 Days', ['Gateway of India', 'CSMT UNESCO Station', 'Marine Drive', 'Elephanta Caves'], ['Sunset harbour sailing', 'Art deco architectural walking tour'], ['Metropolis', 'Colonial & Art Deco'], ['Winter'], True),
            ('Goa', 'goa', 'Goa', 'west', 'Portuguese colonial heritage villas, golden palm beaches, and slow bohemian coastal luxury.', 'November to March', '4-6 Days', ['Basilica of Bom Jesus', 'Fontainhas Latin Quarter', 'Palolem Beach'], ['Private yacht cruise on Mandovi', 'Fontainhas heritage architecture walk'], ['Beaches', 'Portuguese Heritage'], ['Winter'], True),
            ('Pune', 'pune', 'Maharashtra', 'west', 'Oxford of the East and capital of the Maratha Empire with Shaniwar Wada and Aga Khan Palace.', 'October to March', '2 Days', ['Aga Khan Palace', 'Shaniwar Wada', 'Sinhagad Fort'], ['Aga Khan Palace memorial tour', 'Sinhagad morning fort hike'], ['Maratha Heritage', 'Culture'], ['Winter'], False),
            ('Lonavala', 'lonavala', 'Maharashtra', 'west', 'Sahyadri mountain hill station famous for Karla & Bhaja ancient Buddhist caves and waterfalls.', 'July to March', '1-2 Days', ['Karla Caves', 'Bhaja Caves', 'Lohagad Fort'], ['Climbing to ancient rock-cut chaitya', 'Lohagad fort ramparts walk'], ['Hills', 'Rock-cut Caves'], ['Monsoon', 'Winter'], False),
            ('Mahabaleshwar', 'mahabaleshwar', 'Maharashtra', 'west', 'Strawberry capital of India with panoramic Western Ghats cliff viewpoints and colonial estates.', 'October to June', '2 Days', ['Arthur’s Seat', 'Venna Lake', 'Pratapgad Fort'], ['Strawberry farm picking', 'Pratapgad fort expedition'], ['Hills', 'Plantations'], ['Winter', 'Spring'], False),
            ('Ahmedabad', 'ahmedabad', 'Gujarat', 'west', 'India’s first UNESCO World Heritage City, famed for intricate stepwells and Gandhi’s Sabarmati Ashram.', 'October to March', '2 Days', ['Sabarmati Ashram', 'Adalaj Stepwell', 'Sidi Saiyyed Mosque'], ['Old city pols morning walk', 'Calico textile museum private tour'], ['UNESCO Heritage', 'Architecture'], ['Winter'], True),
            ('Rann of Kutch', 'rann-of-kutch', 'Gujarat', 'west', 'The ethereal White Desert: endless glistening salt plains under full moon and master tribal artisans.', 'November to February', '2-3 Days', ['White Rann Salt Desert', 'Kalo Dungar', 'Nirona Craft Village'], ['Sunset and full moon walk on white salt', 'Rogan oil art demonstration'], ['Salt Desert', 'Artisan Crafts'], ['Winter'], True),
            ('Gir National Park', 'gir-national-park', 'Gujarat', 'west', 'The sole remaining sanctuary on earth for the majestic Asiatic Lion (Panthera leo persica).', 'December to March', '2-3 Days', ['Gir Wildlife Sanctuary Core', 'Devalia Safari Park'], ['Tracking Asiatic lions in open 4x4 Gypsy', 'Kamleshwar crocodile lake visit'], ['Wildlife Safari', 'Asiatic Lions'], ['Winter', 'Spring'], True),
            ('Mount Abu', 'mount-abu', 'Rajasthan', 'west', 'Rajasthan’s sole hill station harboring the ethereal 11th-century Dilwara Marble Jain Temples.', 'October to March', '2 Days', ['Dilwara Jain Temples', 'Nakki Lake', 'Guru Shikhar'], ['Marveling at carved marble ceilings of Dilwara', 'Paddle boating on Nakki Lake'], ['Marble Architecture', 'Hills'], ['Winter'], False),
            ('Dwarka', 'dwarka', 'Gujarat', 'west', 'Ancient coastal kingdom of Lord Krishna on the Arabian Sea with the 2,000-year-old Dwarkadhish Temple.', 'October to March', '2 Days', ['Dwarkadhish Temple', 'Bet Dwarka Island', 'Shivrajpur Blue Flag Beach'], ['Ferry crossing to Bet Dwarka', 'Sunset at Gomti river confluence'], ['Pilgrimage', 'Oceanic'], ['Winter'], False),
        ]

        count = 0
        for name, slug, state, reg_key, short_desc, best_time, duration, atts, acts, styles, seasons, is_feat in destinations_data:
            dest, _ = Destination.objects.update_or_create(
                slug=slug,
                defaults={
                    'name': name,
                    'state': state,
                    'region': created_regions[reg_key],
                    'short_description': short_desc,
                    'detailed_description': f"{name} in {state} ({created_regions[reg_key].title}) offers international voyagers an extraordinary private journey. {short_desc}",
                    'best_time_to_visit': best_time,
                    'recommended_duration': duration,
                    'main_attractions': atts,
                    'activities': acts,
                    'travel_styles': styles,
                    'ideal_seasons': seasons,
                    'is_featured': is_feat,
                    'is_published': True,
                }
            )
            count += 1

        self.stdout.write(self.style.SUCCESS(f"Successfully seeded {count} destinations covering North, South, East, and West India."))
