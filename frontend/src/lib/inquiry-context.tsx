'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle, InquiryPlanState } from './types';

interface InquiryContextType {
  inquiry: InquiryPlanState;
  addVehicle: (vehicle: Vehicle) => void;
  removeVehicle: (id: number) => void;
  updateInquiryDetails: (details: Partial<InquiryPlanState>) => void;
  clearInquiry: () => void;
  totalSelectedCount: number;
  generateWhatsAppLink: (whatsappNumber?: string) => string;
  generateEmailLink: (recipientEmail?: string) => string;
}

const DEFAULT_INQUIRY: InquiryPlanState = {
  vehicles: [],
  startDate: '',
  endDate: '',
  flexibleDates: false,
  adultsCount: 2,
  childrenCount: 0,
  pickupLocation: '',
  dropoffLocation: '',
  travelDestinations: '',
  preferredVehicleCategory: '',
  vehiclesCountRequired: 1,
  specialRequirements: '',
  customMessage: '',
};

const InquiryContext = createContext<InquiryContextType>({
  inquiry: DEFAULT_INQUIRY,
  addVehicle: () => {},
  removeVehicle: () => {},
  updateInquiryDetails: () => {},
  clearInquiry: () => {},
  totalSelectedCount: 0,
  generateWhatsAppLink: () => '',
  generateEmailLink: () => '',
});

export const InquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inquiry, setInquiry] = useState<InquiryPlanState>(DEFAULT_INQUIRY);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('namaste_travel_inquiry');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure legacy parsed objects don't break
        setInquiry({
          ...DEFAULT_INQUIRY,
          ...parsed,
          vehicles: parsed.vehicles || [],
        });
      } catch {
        // ignore parse error
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('namaste_travel_inquiry', JSON.stringify(inquiry));
    }
  }, [inquiry, isHydrated]);

  const addVehicle = (vehicle: Vehicle) => {
    setInquiry((prev) => {
      if (prev.vehicles.some((v) => v.id === vehicle.id)) {
        return prev;
      }
      return { ...prev, vehicles: [...prev.vehicles, vehicle] };
    });
  };

  const removeVehicle = (id: number) => {
    setInquiry((prev) => ({
      ...prev,
      vehicles: prev.vehicles.filter((v) => v.id !== id),
    }));
  };

  const updateInquiryDetails = (details: Partial<InquiryPlanState>) => {
    setInquiry((prev) => ({ ...prev, ...details }));
  };

  const clearInquiry = () => {
    setInquiry(DEFAULT_INQUIRY);
  };

  const totalSelectedCount = inquiry.vehicles.length;

  const generateWhatsAppLink = (whatsappNumber: string = '919876543210') => {
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    let msg = 'Hello! I am inquiring about chauffeured tourist vehicles in India.\n\n';

    if (inquiry.vehicles.length > 0) {
      msg += 'Selected Tourist Vehicles:\n';
      inquiry.vehicles.forEach((v) => {
        msg += `- ${v.name} (${v.category_name}).\n`;
      });
      msg += '\n';
    }

    if (inquiry.startDate) {
      msg += 'Travel dates:\n';
      if (inquiry.endDate) {
        msg += `- ${inquiry.startDate} to ${inquiry.endDate}${inquiry.flexibleDates ? ' (Flexible)' : ''}.\n\n`;
      } else {
        msg += `- Starting ${inquiry.startDate}${inquiry.flexibleDates ? ' (Flexible)' : ''}.\n\n`;
      }
    }

    msg += 'Travelers:\n';
    msg += `- ${inquiry.adultsCount} adults${inquiry.childrenCount > 0 ? `, ${inquiry.childrenCount} children` : ''}.\n\n`;

    if (inquiry.travelDestinations) {
      msg += `Destinations to visit:\n- ${inquiry.travelDestinations}.\n\n`;
    }

    if (inquiry.pickupLocation) {
      msg += `Pickup location:\n- ${inquiry.pickupLocation}.\n\n`;
    }

    if (inquiry.dropoffLocation) {
      msg += `Drop-off location:\n- ${inquiry.dropoffLocation}.\n\n`;
    }

    if (inquiry.specialRequirements) {
      msg += `Special requirements:\n- ${inquiry.specialRequirements}.\n\n`;
    }

    if (inquiry.customMessage) {
      msg += `Additional note:\n- ${inquiry.customMessage}.\n\n`;
    }

    msg += 'Please share availability and customized quotation.';

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
  };

  const generateEmailLink = (recipientEmail: string = 'concierge@namastejourneys.com') => {
    const subject = inquiry.vehicles.length > 0
      ? `Travel Inquiry: ${inquiry.vehicles.length} Vehicle(s) Selected - Namaste Journeys`
      : 'Inquiry: India Private Chauffeured Travel Services';

    let body = 'Hello Namaste Journeys Concierge Team,\n\nI would like to inquire about chauffeured tourist vehicles and travel services in India.\n\n';

    if (inquiry.vehicles.length > 0) {
      body += 'Selected Tourist Vehicles:\n';
      inquiry.vehicles.forEach((v) => {
        body += `- ${v.name} (${v.category_name})\n`;
      });
      body += '\n';
    }

    if (inquiry.startDate) {
      body += 'Travel Dates:\n';
      if (inquiry.endDate) {
        body += `- ${inquiry.startDate} to ${inquiry.endDate}${inquiry.flexibleDates ? ' (Flexible)' : ''}\n\n`;
      } else {
        body += `- Starting ${inquiry.startDate}${inquiry.flexibleDates ? ' (Flexible)' : ''}\n\n`;
      }
    }

    body += 'Travelers:\n';
    body += `- ${inquiry.adultsCount} adults${inquiry.childrenCount > 0 ? `, ${inquiry.childrenCount} children` : ''}\n\n`;

    if (inquiry.travelDestinations) {
      body += `Destinations to Visit:\n- ${inquiry.travelDestinations}\n\n`;
    }

    if (inquiry.pickupLocation) {
      body += `Pickup Location:\n- ${inquiry.pickupLocation}\n\n`;
    }

    if (inquiry.dropoffLocation) {
      body += `Drop-off Location:\n- ${inquiry.dropoffLocation}\n\n`;
    }

    if (inquiry.specialRequirements) {
      body += `Special Requirements:\n- ${inquiry.specialRequirements}\n\n`;
    }

    if (inquiry.customMessage) {
      body += `Additional Notes:\n- ${inquiry.customMessage}\n\n`;
    }

    body += 'Please share vehicle availability, itinerary recommendations, and a transparent quotation.\n\nThank you!';

    return `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <InquiryContext.Provider
      value={{
        inquiry,
        addVehicle,
        removeVehicle,
        updateInquiryDetails,
        clearInquiry,
        totalSelectedCount,
        generateWhatsAppLink,
        generateEmailLink,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => useContext(InquiryContext);
