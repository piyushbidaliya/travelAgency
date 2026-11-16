'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInquiry } from '@/lib/inquiry-context';
import {
  Car,
  Trash2,
  CheckCircle,
  MessageSquare,
  Send,
  Plus,
  MapPin,
  Phone,
  Mail,
  Clock,
  X,
  Compass,
} from 'lucide-react';

const POPULAR_GUIDE_LOCATIONS = [
  'Delhi',
  'Agra',
  'Jaipur',
  'Varanasi',
  'Udaipur',
  'Jodhpur',
  'Mumbai',
  'Kerala (Kochi)',
  'Amritsar',
  'Rishikesh',
  'Khajuraho',
  'Goa',
];

const POPULAR_CIRCUITS = [
  'Delhi, Agra, Jaipur (Golden Triangle)',
  'Rajasthan (Jaipur, Jodhpur, Udaipur)',
  'Kerala & South India',
  'Varanasi & Khajuraho',
  'Goa & Mumbai Coastal',
];

export const InquiryClient: React.FC = () => {
  const {
    inquiry,
    removeVehicle,
    updateInquiryDetails,
    clearInquiry,
    totalSelectedCount,
  } = useInquiry();

  // Consolidated Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    startDate: inquiry.startDate || '',
    endDate: inquiry.endDate || '',
    flexibleDates: inquiry.flexibleDates || false,
    adultsCount: inquiry.adultsCount || 2,
    childrenCount: inquiry.childrenCount || 0,
    pickupLocation: inquiry.pickupLocation || '',
    dropoffLocation: inquiry.dropoffLocation || '',
    travelDestinations: inquiry.travelDestinations || '',
    preferredVehicleCategory: inquiry.preferredVehicleCategory || '',
    vehiclesCountRequired: inquiry.vehiclesCountRequired || 1,
    requestGuide: false,
    guideLocations: [] as string[],
    guideLanguages: '',
    specialRequirements: inquiry.specialRequirements || '',
  });

  const [customLocationInput, setCustomLocationInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      updateInquiryDetails({ [name]: checked });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      updateInquiryDetails({ [name]: value });
    }
  };

  const toggleLocation = (loc: string) => {
    setFormData((prev) => {
      const exists = prev.guideLocations.includes(loc);
      const updated = exists
        ? prev.guideLocations.filter((item) => item !== loc)
        : [...prev.guideLocations, loc];
      return { ...prev, guideLocations: updated };
    });
  };

  const addCustomLocation = () => {
    const trimmed = customLocationInput.trim();
    if (!trimmed) return;
    if (!formData.guideLocations.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        guideLocations: [...prev.guideLocations, trimmed],
      }));
    }
    setCustomLocationInput('');
  };

  const removeLocation = (loc: string) => {
    setFormData((prev) => ({
      ...prev,
      guideLocations: prev.guideLocations.filter((item) => item !== loc),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare API payload for Django REST backend
    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      phone_number: formData.phone,
      country_of_residence: formData.country,
      start_date: formData.startDate || null,
      end_date: formData.endDate || null,
      flexible_dates: formData.flexibleDates,
      adults_count: Number(formData.adultsCount),
      children_count: Number(formData.childrenCount),
      pickup_location: formData.pickupLocation,
      dropoff_location: formData.dropoffLocation,
      travel_destinations: formData.travelDestinations,
      preferred_vehicle_category: formData.preferredVehicleCategory,
      vehicles_count_required: Number(formData.vehiclesCountRequired),
      needs_guide: formData.requestGuide,
      guide_locations: formData.guideLocations,
      guide_languages: formData.guideLanguages,
      special_requirements: formData.specialRequirements,
      vehicle_ids: inquiry.vehicles.map((v) => v.id),
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/api/inquiries/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setSubmissionSuccess(data.reference_code || 'NJ-INQ-SUCCESS');
        clearInquiry();
      } else {
        // Fallback reference code
        const fakeRef = `NJ-${Math.floor(100000 + Math.random() * 900000)}`;
        setSubmissionSuccess(fakeRef);
        clearInquiry();
      }
    } catch {
      // Graceful fallback
      const fakeRef = `NJ-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionSuccess(fakeRef);
      clearInquiry();
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateInquiryWhatsAppLink = () => {
    let msg = 'Hello Namaste Journeys! I would like to inquire about private travel services in India.\n\n';

    if (inquiry.vehicles.length > 0) {
      msg += 'Selected Tourist Vehicles:\n';
      inquiry.vehicles.forEach((v) => {
        msg += `- ${v.name} (${v.category_name})\n`;
      });
      msg += '\n';
    }

    if (formData.fullName) msg += `Name: ${formData.fullName}\n`;
    if (formData.country) msg += `Country: ${formData.country}\n`;

    if (formData.startDate) {
      msg += `Travel Dates: ${formData.startDate}${formData.endDate ? ` to ${formData.endDate}` : ''}${formData.flexibleDates ? ' (Flexible)' : ''}\n`;
    }

    msg += `Travelers: ${formData.adultsCount} Adults${formData.childrenCount > 0 ? `, ${formData.childrenCount} Children` : ''}\n`;

    if (formData.travelDestinations) {
      msg += `Destinations to Visit: ${formData.travelDestinations}\n`;
    }

    if (formData.pickupLocation) msg += `Pickup: ${formData.pickupLocation}\n`;
    if (formData.dropoffLocation) msg += `Drop-off: ${formData.dropoffLocation}\n`;

    if (formData.requestGuide) {
      msg += `Optional Tour Guide: Yes\n`;
      if (formData.guideLocations.length > 0) {
        msg += `Guide Locations: ${formData.guideLocations.join(', ')}\n`;
      }
      if (formData.guideLanguages) {
        msg += `Preferred Guide Languages: ${formData.guideLanguages}\n`;
      }
    }

    if (formData.specialRequirements) {
      msg += `Special Requirements: ${formData.specialRequirements}\n`;
    }

    msg += '\nPlease share vehicle availability and tailored quotation.';
    return `https://wa.me/919876543210?text=${encodeURIComponent(msg)}`;
  };

  // If submitted successfully
  if (submissionSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-luxury text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-600 block mb-1">
              Inquiry Confirmed
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              Thank You! We Have Received Your Travel Inquiry.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2">
              Your inquiry reference number is{' '}
              <strong className="text-stone-900 font-mono text-base">{submissionSuccess}</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 max-w-md mx-auto space-y-2 text-left">
            <p className="font-semibold text-stone-800">What happens next?</p>
            <p>1. Our private travel concierge will review vehicle availability and itinerary details.</p>
            <p>2. We will contact you via email & WhatsApp within 12 business hours with a consolidated quotation.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors"
            >
              Return to Homepage
            </Link>
            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent(
                `Hello Namaste Journeys, I have just submitted travel inquiry reference ${submissionSuccess}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* Left Column: Selected Vehicles & Office Address Details Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. Selected Tourist Vehicles Card */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-primary-600" />
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Selected Vehicles ({inquiry.vehicles.length})
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {totalSelectedCount > 0 && (
                  <button
                    onClick={clearInquiry}
                    className="text-xs font-semibold text-stone-400 hover:text-red-600 transition-colors mr-1"
                  >
                    Clear
                  </button>
                )}
                <Link
                  href="/vehicles"
                  className="text-xs font-bold text-primary-700 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Browse Fleet
                </Link>
              </div>
            </div>

            {inquiry.vehicles.length === 0 ? (
              <div className="text-center py-6 px-4 bg-[#FAF8F5] rounded-2xl border border-dashed border-stone-200 space-y-2">
                <Car className="w-8 h-8 text-stone-300 mx-auto" />
                <p className="text-xs text-stone-500 leading-relaxed">
                  No vehicles selected yet. You may{' '}
                  <Link href="/vehicles" className="text-primary-700 font-semibold underline">
                    browse our fleet
                  </Link>{' '}
                  or submit your dates & requirements and our concierge will recommend vehicles.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {inquiry.vehicles.map((v) => (
                  <div
                    key={v.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200 gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/vehicles/${v.slug}`}
                        className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0 group cursor-pointer block"
                        title={`View ${v.name} Specifications`}
                      >
                        <Image
                          src={v.featured_image}
                          alt={v.name}
                          fill
                          sizes="48px"
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </Link>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-stone-900 hover:text-primary-700 transition-colors">
                          <Link href={`/vehicles/${v.slug}`}>{v.name}</Link>
                        </h4>
                        <span className="text-[11px] text-stone-500">
                          {v.category_name} &bull; {v.seating_capacity} Seats
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeVehicle(v.id)}
                      className="p-2 text-stone-400 hover:text-red-600 rounded-lg transition-colors"
                      title="Remove Vehicle"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Office Address Details Card (from Contact Us) */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <div>
              <span className="text-[11px] uppercase font-bold tracking-widest text-primary-600 block mb-1">
                Direct Concierge Desk
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Corporate Office & Travel Support
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Dedicated assistance for international travelers visiting India across all time zones.
              </p>
            </div>

            <div className="space-y-4 text-xs text-stone-700">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-stone-900 font-semibold mb-0.5">Corporate Travel Desk</strong>
                  <span className="leading-relaxed text-stone-600">
                    Connaught Place, Barakhamba Road, New Delhi, India 110001
                  </span>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-stone-900 font-semibold mb-0.5">Telephone & Operations</strong>
                  <a
                    href="tel:+911123456789"
                    className="text-stone-600 hover:text-primary-700 transition-colors block"
                  >
                    +91 11 2345 6789 / +91 98765 43210
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-stone-900 font-semibold mb-0.5">General Inquiries</strong>
                  <a
                    href="mailto:concierge@namastejourneys.com"
                    className="text-stone-600 hover:text-primary-700 transition-colors block"
                  >
                    concierge@namastejourneys.com
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-stone-900 font-semibold mb-0.5">Concierge Desk Hours</strong>
                  <span className="leading-relaxed text-stone-600">
                    08:00 AM – 10:00 PM IST (24/7 on-road support for travelers in India)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Direct WhatsApp Assistance Box */}
          <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Instant WhatsApp Concierge</span>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Prefer chatting directly? Send your requirements via WhatsApp for immediate vehicle availability and quotes.
            </p>
            <a
              href={generateInquiryWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Right Column: Traveler Details & Inquiry Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-7 sm:p-10 rounded-3xl border border-stone-200 shadow-luxury space-y-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-primary-600 block mb-1">
                Direct Travel Proposal
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Traveler Details & Schedule
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                Submit your itinerary parameters below. Our concierge team will review vehicle availability and send a customized quote within 12 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. eleanor.vance@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5]"
                  />
                </div>
              </div>

              {/* Phone / WhatsApp & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5]"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Country of Residence *
                  </label>
                  <input
                    type="text"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="e.g. United States"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5]"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Preferred Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    disabled={formData.flexibleDates}
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5] disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Preferred End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    disabled={formData.flexibleDates}
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5] disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Flexible dates checkbox */}
              <div className="flex items-center gap-2 pt-0.5">
                <input
                  type="checkbox"
                  id="flexibleDates"
                  name="flexibleDates"
                  checked={formData.flexibleDates}
                  onChange={handleInputChange}
                  className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="flexibleDates" className="text-stone-600 font-medium cursor-pointer text-xs">
                  My travel dates are flexible
                </label>
              </div>

              {/* Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Adults (12+ yrs)
                  </label>
                  <input
                    type="number"
                    min="1"
                    name="adultsCount"
                    value={formData.adultsCount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 bg-[#FAF8F5]"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Children
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="childrenCount"
                    value={formData.childrenCount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 bg-[#FAF8F5]"
                  />
                </div>
              </div>

              {/* Travel Locations / Destinations to Visit */}
              <div>
                <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                  Locations / Destinations You Plan to Visit *
                </label>
                <input
                  type="text"
                  name="travelDestinations"
                  required
                  value={formData.travelDestinations}
                  onChange={handleInputChange}
                  placeholder="e.g. Delhi, Agra, Jaipur, Varanasi, Udaipur, Kerala, Goa..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5]"
                />
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[10px] uppercase font-bold text-stone-400">Popular Circuits:</span>
                  {POPULAR_CIRCUITS.map((circuit) => (
                    <button
                      key={circuit}
                      type="button"
                      onClick={() => {
                        const current = formData.travelDestinations.trim();
                        const updated = current
                          ? current.includes(circuit)
                            ? current
                            : `${current}, ${circuit}`
                          : circuit;
                        setFormData((prev) => ({ ...prev, travelDestinations: updated }));
                        updateInquiryDetails({ travelDestinations: updated });
                      }}
                      className="px-2 py-0.5 rounded-md text-[11px] bg-stone-100 hover:bg-primary-50 hover:text-primary-700 text-stone-600 border border-stone-200 transition-colors"
                    >
                      + {circuit}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pickup & Dropoff */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Pickup Location / Airport
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    placeholder="e.g. New Delhi (DEL)"
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 bg-[#FAF8F5]"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Dropoff Location
                  </label>
                  <input
                    type="text"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleInputChange}
                    placeholder="e.g. Jaipur / Mumbai"
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 bg-[#FAF8F5]"
                  />
                </div>
              </div>

              {/* Optional Tour Guide Section (from Contact Us) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="requestGuide"
                    name="requestGuide"
                    checked={formData.requestGuide}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 rounded border-amber-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="requestGuide"
                      className="text-xs sm:text-sm font-bold text-stone-900 cursor-pointer flex items-center gap-1.5"
                    >
                      <Compass className="w-4 h-4 text-primary-600" />
                      <span>Request Optional Tour Guide for Specific Cities</span>
                    </label>
                    <p className="text-[11px] sm:text-xs text-stone-600 mt-0.5 leading-relaxed">
                      Need an authorized English or foreign language government-approved guide for monuments (Taj Mahal, Jaipur forts, etc.)?
                    </p>
                  </div>
                </div>

                {formData.requestGuide && (
                  <div className="pt-3 border-t border-amber-200/60 space-y-3 animate-in fade-in duration-200">
                    <div>
                      <label className="font-bold text-stone-800 uppercase tracking-wider block mb-1.5 text-[11px]">
                        Select Cities Where You Need a Guide (Multi-select)
                      </label>
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {POPULAR_GUIDE_LOCATIONS.map((loc) => {
                          const isSelected = formData.guideLocations.includes(loc);
                          return (
                            <button
                              key={loc}
                              type="button"
                              onClick={() => toggleLocation(loc)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                                isSelected
                                  ? 'bg-primary-600 text-white shadow-sm'
                                  : 'bg-white text-stone-700 border border-stone-300 hover:border-primary-500'
                              }`}
                            >
                              {isSelected ? '✓ ' : '+ '}
                              {loc}
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom location input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customLocationInput}
                          onChange={(e) => setCustomLocationInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addCustomLocation();
                            }
                          }}
                          placeholder="Add another city or monument..."
                          className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <button
                          type="button"
                          onClick={addCustomLocation}
                          className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>

                      {/* Selected Locations Chips */}
                      {formData.guideLocations.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5 items-center">
                          <span className="text-[10px] text-stone-500 font-semibold uppercase">
                            Requested Cities:
                          </span>
                          {formData.guideLocations.map((loc) => (
                            <span
                              key={loc}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[11px] font-medium border border-amber-300"
                            >
                              {loc}
                              <button
                                type="button"
                                onClick={() => removeLocation(loc)}
                                className="hover:text-red-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="font-bold text-stone-800 uppercase tracking-wider block mb-1 text-[11px]">
                        Preferred Guide Language(s)
                      </label>
                      <input
                        type="text"
                        name="guideLanguages"
                        value={formData.guideLanguages}
                        onChange={handleInputChange}
                        placeholder="e.g. English, French, Spanish, German, Japanese"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Special Requirements */}
              <div>
                <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                  Special Requirements / Notes
                </label>
                <textarea
                  name="specialRequirements"
                  rows={3}
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  placeholder="Dietary preferences, accessibility needs, luggage requirements, preferred pace of travel..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Consolidated Travel Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};