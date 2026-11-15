'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Destination, TourPackage } from './types';

export interface SelectedDestinationItem {
  id: number;
  name: string;
  slug: string;
  state: string;
  region: string;
  image?: string;
  order: number;
}

export interface SelectedPackageItem {
  id: number;
  name: string;
  slug: string;
  duration_days: number;
  starting_price_inr: number;
  image?: string;
}

export interface TripPlanState {
  destinations: SelectedDestinationItem[];
  packages: SelectedPackageItem[];
  startDate: string;
  flexibleDates: boolean;
  durationDays: number;
  adultsCount: number;
  childrenCount: number;
  travelStyle: string;
  customMessage: string;
}

interface TripContextType {
  trip: TripPlanState;
  addDestination: (destination: Destination) => void;
  removeDestination: (id: number) => void;
  addPackage: (pkg: TourPackage) => void;
  removePackage: (id: number) => void;
  reorderDestinations: (fromIndex: number, toIndex: number) => void;
  updateTripDetails: (details: Partial<TripPlanState>) => void;
  clearTrip: () => void;
  totalSelectedCount: number;
  generateWhatsAppLink: (whatsappNumber?: string) => string;
}

const DEFAULT_TRIP: TripPlanState = {
  destinations: [],
  packages: [],
  startDate: '',
  flexibleDates: false,
  durationDays: 10,
  adultsCount: 2,
  childrenCount: 0,
  travelStyle: 'Luxury Heritage & Cultural',
  customMessage: '',
};

const TripContext = createContext<TripContextType>({
  trip: DEFAULT_TRIP,
  addDestination: () => {},
  removeDestination: () => {},
  addPackage: () => {},
  removePackage: () => {},
  reorderDestinations: () => {},
  updateTripDetails: () => {},
  clearTrip: () => {},
  totalSelectedCount: 0,
  generateWhatsAppLink: () => '',
});

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trip, setTrip] = useState<TripPlanState>(DEFAULT_TRIP);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('namaste_trip_planner');
    if (saved) {
      try {
        setTrip(JSON.parse(saved));
      } catch {
        // ignore parse error
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('namaste_trip_planner', JSON.stringify(trip));
    }
  }, [trip, isHydrated]);

  const addDestination = (destination: Destination) => {
    setTrip((prev) => {
      if (prev.destinations.some((d) => d.id === destination.id)) {
        return prev; // Prevent duplicate
      }
      const newItem: SelectedDestinationItem = {
        id: destination.id,
        name: destination.name,
        slug: destination.slug,
        state: destination.state,
        region: destination.region_name || destination.region_slug,
        image: destination.primary_image?.image || destination.images?.[0]?.image,
        order: prev.destinations.length + 1,
      };
      return {
        ...prev,
        destinations: [...prev.destinations, newItem],
      };
    });
  };

  const removeDestination = (id: number) => {
    setTrip((prev) => ({
      ...prev,
      destinations: prev.destinations
        .filter((d) => d.id !== id)
        .map((item, idx) => ({ ...item, order: idx + 1 })),
    }));
  };

  const addPackage = (pkg: TourPackage) => {
    setTrip((prev) => {
      if (prev.packages.some((p) => p.id === pkg.id)) {
        return prev;
      }
      const newItem: SelectedPackageItem = {
        id: pkg.id,
        name: pkg.name,
        slug: pkg.slug,
        duration_days: pkg.duration_days,
        starting_price_inr: pkg.starting_price_inr,
        image: pkg.featured_image,
      };
      return {
        ...prev,
        packages: [...prev.packages, newItem],
      };
    });
  };

  const removePackage = (id: number) => {
    setTrip((prev) => ({
      ...prev,
      packages: prev.packages.filter((p) => p.id !== id),
    }));
  };

  const reorderDestinations = (fromIndex: number, toIndex: number) => {
    setTrip((prev) => {
      const updated = [...prev.destinations];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return {
        ...prev,
        destinations: updated.map((item, idx) => ({ ...item, order: idx + 1 })),
      };
    });
  };

  const updateTripDetails = (details: Partial<TripPlanState>) => {
    setTrip((prev) => ({ ...prev, ...details }));
  };

  const clearTrip = () => {
    setTrip(DEFAULT_TRIP);
  };

  const totalSelectedCount = trip.destinations.length + trip.packages.length;

  const generateWhatsAppLink = (whatsappNumber: string = '919876543210') => {
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    let msg = 'Hello! I am planning a journey to India with Namaste Journeys.\n\n';
    
    if (trip.destinations.length > 0) {
      msg += 'Selected Destinations:\n';
      trip.destinations.forEach((d, i) => {
        msg += `${i + 1}. ${d.name} (${d.state})\n`;
      });
      msg += '\n';
    }

    if (trip.packages.length > 0) {
      msg += 'Interested Packages:\n';
      trip.packages.forEach((p, i) => {
        msg += `${i + 1}. ${p.name} (${p.duration_days} Days)\n`;
      });
      msg += '\n';
    }

    msg += `Travelers: ${trip.adultsCount} Adults${trip.childrenCount > 0 ? `, ${trip.childrenCount} Children` : ''}\n`;
    if (trip.durationDays) msg += `Target Duration: ${trip.durationDays} Days\n`;
    if (trip.startDate) msg += `Target Start Date: ${trip.startDate}${trip.flexibleDates ? ' (Flexible)' : ''}\n`;
    if (trip.travelStyle) msg += `Travel Style: ${trip.travelStyle}\n`;
    if (trip.customMessage) msg += `Notes: ${trip.customMessage}\n`;

    msg += '\nPlease share a customized itinerary proposal and quotation.';

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <TripContext.Provider
      value={{
        trip,
        addDestination,
        removeDestination,
        addPackage,
        removePackage,
        reorderDestinations,
        updateTripDetails,
        clearTrip,
        totalSelectedCount,
        generateWhatsAppLink,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);
