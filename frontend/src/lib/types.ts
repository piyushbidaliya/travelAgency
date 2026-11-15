export type RegionSlug = 'north' | 'south' | 'east' | 'west';

export interface Region {
  id: number;
  name: 'north' | 'south' | 'east' | 'west';
  slug: string;
  title: string;
  tagline: string;
  description: string;
  hero_image?: string;
  best_time_to_visit: string;
  popular_experiences: string[];
  destinations_count?: number;
}

export interface DestinationImage {
  id: number;
  image: string;
  alt_text: string;
  is_primary: boolean;
}

export interface Destination {
  id: number;
  name: string;
  slug: string;
  state: string;
  region_name: string;
  region_slug: RegionSlug;
  short_description: string;
  detailed_description?: string;
  best_time_to_visit: string;
  recommended_duration: string;
  main_attractions?: string[];
  activities?: string[];
  local_experiences?: string[];
  travel_tips?: string[];
  travel_styles: string[];
  ideal_seasons: string[];
  primary_image?: DestinationImage;
  images?: DestinationImage[];
  is_featured: boolean;
}

export interface TourPackage {
  id: number;
  name: string;
  slug: string;
  region_name?: string;
  featured_image?: string;
  short_description: string;
  detailed_description?: string;
  duration_days: number;
  duration_nights: number;
  starting_price_inr: number;
  base_currency: string;
  best_time_to_visit: string;
  tour_highlights: string[];
  inclusions?: string[];
  exclusions?: string[];
  accommodation_info?: string;
  transportation_info?: string;
  travel_category: string;
  travel_style: string;
  is_featured: boolean;
  destinations: Destination[];
}

export interface ItineraryDay {
  id: number;
  day_number: number;
  title: string;
  destination_name?: string;
  description: string;
  activities: string[];
  accommodation: string;
  meals: string;
  transport_info: string;
}

export interface Itinerary {
  id: number;
  title: string;
  slug: string;
  duration_days: number;
  duration_nights: number;
  overview: string;
  best_time_to_visit: string;
  total_distance_km?: number;
  is_featured: boolean;
  destinations: Destination[];
  days?: ItineraryDay[];
}

export interface Testimonial {
  id: number;
  author_name: string;
  author_location: string;
  trip_title: string;
  review_text: string;
  rating: number;
  avatar?: string;
  is_featured: boolean;
}

export interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  display_order: number;
  is_featured: boolean;
}

export type SupportedCurrency = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyRates {
  [key: string]: {
    rate: number;
    inverse_rate: number;
    last_updated: string;
  };
}

export interface TripPlannerItem {
  id: number;
  type: 'destination' | 'package';
  name: string;
  slug: string;
  region?: string;
  duration?: string;
  image?: string;
}
