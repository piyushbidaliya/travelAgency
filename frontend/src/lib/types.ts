export interface VehicleCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  vehicles_count?: number;
}

export interface VehicleImageItem {
  id: number;
  image: string;
  alt_text: string;
  label?: string; // 'Exterior', 'Inside Cabin', 'Boot Space', 'Chauffeur Cockpit', 'Rear Comfort'
  is_primary?: boolean;
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
  images?: VehicleImageItem[];
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
  startDate: string;
  endDate: string;
  flexibleDates: boolean;
  adultsCount: number;
  childrenCount: number;
  pickupLocation: string;
  dropoffLocation: string;
  travelDestinations?: string;
  preferredVehicleCategory: string;
  vehiclesCountRequired: number;
  specialRequirements: string;
  customMessage: string;
}
