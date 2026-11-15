'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle, Guide, Language, InquiryPlanState } from './types';

interface InquiryContextType {
  inquiry: InquiryPlanState;
  addVehicle: (vehicle: Vehicle) => void;
  removeVehicle: (id: number) => void;
  addGuide: (guide: Guide) => void;
  removeGuide: (id: number) => void;
  toggleLanguage: (language: Language) => void;
  removeLanguage: (id: number) => void;
  updateInquiryDetails: (details: Partial<InquiryPlanState>) => void;
  clearInquiry: () => void;
  totalSelectedCount: number;
  generateWhatsAppLink: (whatsappNumber?: string) => string;
}

const DEFAULT_INQUIRY: InquiryPlanState = {
  vehicles: [],
  guides: [],
  preferredLanguages: [],
  startDate: '',
  endDate: '',
  flexibleDates: false,
  adultsCount: 2,
  childrenCount: 0,
  pickupLocation: '',
  dropoffLocation: '',
  preferredVehicleCategory: '',
  vehiclesCountRequired: 1,
  specialRequirements: '',
  customMessage: '',
};

const InquiryContext = createContext<InquiryContextType>({
  inquiry: DEFAULT_INQUIRY,
  addVehicle: () => {},
  removeVehicle: () => {},
  addGuide: () => {},
  removeGuide: () => {},
  toggleLanguage: () => {},
  removeLanguage: () => {},
  updateInquiryDetails: () => {},
  clearInquiry: () => {},
  totalSelectedCount: 0,
  generateWhatsAppLink: () => '',
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
          guides: parsed.guides || [],
          preferredLanguages: parsed.preferredLanguages || [],
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

  const addGuide = (guide: Guide) => {
    setInquiry((prev) => {
      if (prev.guides.some((g) => g.id === guide.id)) {
        return prev;
      }
      return { ...prev, guides: [...prev.guides, guide] };
    });
  };

  const removeGuide = (id: number) => {
    setInquiry((prev) => ({
      ...prev,
      guides: prev.guides.filter((g) => g.id !== id),
    }));
  };

  const toggleLanguage = (language: Language) => {
    setInquiry((prev) => {
      const exists = prev.preferredLanguages.some((l) => l.id === language.id);
      if (exists) {
        return {
          ...prev,
          preferredLanguages: prev.preferredLanguages.filter((l) => l.id !== language.id),
        };
      }
      return {
        ...prev,
        preferredLanguages: [...prev.preferredLanguages, language],
      };
    });
  };

  const removeLanguage = (id: number) => {
    setInquiry((prev) => ({
      ...prev,
      preferredLanguages: prev.preferredLanguages.filter((l) => l.id !== id),
    }));
  };

  const updateInquiryDetails = (details: Partial<InquiryPlanState>) => {
    setInquiry((prev) => ({ ...prev, ...details }));
  };

  const clearInquiry = () => {
    setInquiry(DEFAULT_INQUIRY);
  };

  const totalSelectedCount =
    inquiry.vehicles.length +
    inquiry.guides.length +
    inquiry.preferredLanguages.length;

  const generateWhatsAppLink = (whatsappNumber: string = '919876543210') => {
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    let msg = 'Hello! I am inquiring about travel services across India.\n\n';

    if (inquiry.vehicles.length > 0) {
      msg += 'Selected Tourist Vehicles:\n';
      inquiry.vehicles.forEach((v) => {
        msg += `- ${v.name} (${v.category_name}).\n`;
      });
      msg += '\n';
    }

    if (inquiry.guides.length > 0) {
      msg += 'Selected Licensed Tour Guides:\n';
      inquiry.guides.forEach((g) => {
        const langs = g.languages?.map((l) => l.language_name).join(', ') || '';
        msg += `- ${g.full_name} (${g.category_name}${langs ? ` - ${langs}` : ''}).\n`;
      });
      msg += '\n';
    }

    if (inquiry.preferredLanguages.length > 0) {
      msg += 'Preferred Guide Languages:\n';
      inquiry.preferredLanguages.forEach((l) => {
        msg += `- ${l.name}.\n`;
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

  return (
    <InquiryContext.Provider
      value={{
        inquiry,
        addVehicle,
        removeVehicle,
        addGuide,
        removeGuide,
        toggleLanguage,
        removeLanguage,
        updateInquiryDetails,
        clearInquiry,
        totalSelectedCount,
        generateWhatsAppLink,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => useContext(InquiryContext);
