export interface VehicleCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  vehicles_count?: number;
}

export interface Vehicle {
  id: number;
  name: string;
  slug: string;
  brand: string;
  model_name: string;
  category_name: string;
  category_slug: string;
  featured_image: string;
  images?: { id: number; image: string; alt_text: string; is_primary: boolean }[];
  seating_capacity: number;
  luggage_capacity: number;
  is_air_conditioned: boolean;
  facilities: string[];
  description: string;
  price_inr?: number;
  pricing_unit: string;
  availability_status: 'available' | 'on_request' | 'limited';
  is_featured: boolean;
}

export interface Language {
  id: number;
  name: string;
  code: string;
  is_active: boolean;
  display_order?: number;
}

export interface GuideLanguage {
  id: number;
  language?: number;
  language_name: string;
  language_code: string;
  proficiency?: 'native' | 'fluent' | 'professional' | 'conversational';
  proficiency_display?: string;
  proficiency_level?: string;
}

export interface GuideCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  display_order?: number;
}

export interface Guide {
  id: number;
  full_name: string;
  name: string;
  slug: string;
  category_name: string;
  category_slug: string;
  profile_photo: string;
  short_intro: string;
  bio: string;
  biography?: string;
  years_of_experience: number;
  languages: GuideLanguage[];
  areas_of_expertise: string[];
  specializations: string[];
  price_inr?: number;
  pricing_unit: string;
  availability_status: 'available' | 'on_request' | 'limited';
  certifications?: string;
  license_number: string;
  primary_city: string;
  state: string;
  rating: number;
  reviews_count: number;
  is_featured: boolean;
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

export interface InquiryPlanState {
  vehicles: Vehicle[];
  guides: Guide[];
  preferredLanguages: Language[];
  startDate: string;
  endDate: string;
  flexibleDates: boolean;
  adultsCount: number;
  childrenCount: number;
  pickupLocation: string;
  dropoffLocation: string;
  preferredVehicleCategory: string;
  vehiclesCountRequired: number;
  specialRequirements: string;
  customMessage: string;
}
