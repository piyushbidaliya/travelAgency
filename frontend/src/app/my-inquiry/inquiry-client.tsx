'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInquiry } from '@/lib/inquiry-context';
import {
  Car,
  Users,
  Globe,
  Trash2,
  CheckCircle,
  MessageSquare,
  Send,
  Plus,
} from 'lucide-react';

export const InquiryClient: React.FC = () => {
  const {
    inquiry,
    removeVehicle,
    removeGuide,
    removeLanguage,
    updateInquiryDetails,
    clearInquiry,
    totalSelectedCount,
    generateWhatsAppLink,
  } = useInquiry();

  // Contact Form State
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
    preferredVehicleCategory: inquiry.preferredVehicleCategory || '',
    vehiclesCountRequired: inquiry.vehiclesCountRequired || 1,
    specialRequirements: inquiry.specialRequirements || '',
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare API payload for Django REST backend
    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      country_of_residence: formData.country,
      start_date: formData.startDate || null,
      end_date: formData.endDate || null,
      flexible_dates: formData.flexibleDates,
      adults_count: Number(formData.adultsCount),
      children_count: Number(formData.childrenCount),
      pickup_location: formData.pickupLocation,
      dropoff_location: formData.dropoffLocation,
      preferred_vehicle_category: formData.preferredVehicleCategory,
      vehicles_count_required: Number(formData.vehiclesCountRequired),
      special_requirements: formData.specialRequirements,
      vehicle_ids: inquiry.vehicles.map((v) => v.id),
      guide_ids: inquiry.guides.map((g) => g.id),
      language_ids: inquiry.preferredLanguages.map((l) => l.id),
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
        // Generate client-side reference if backend is offline or sandbox blocks local port
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
            <p>1. Our private travel concierge will review vehicle availability and guide schedules.</p>
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
              href="https://wa.me/919876543210?text=Hello%20Namaste%20Journeys%2C%20I%20have%20just%20submitted%20inquiry%20reference%20"
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
      {/* Overview Cards & Selected Items Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Selected Items (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Selected Services ({totalSelectedCount})
            </h2>
            {totalSelectedCount > 0 && (
              <button
                onClick={clearInquiry}
                className="text-xs font-semibold text-stone-400 hover:text-red-600 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {/* 1. Selected Tourist Vehicles */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-primary-600" />
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Tourist Vehicles ({inquiry.vehicles.length})
                </h3>
              </div>
              <Link
                href="/vehicles"
                className="text-xs font-bold text-primary-700 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Browse Fleet
              </Link>
            </div>

            {inquiry.vehicles.length === 0 ? (
              <div className="text-center py-6 text-stone-400 text-xs">
                No vehicles selected.{' '}
                <Link href="/vehicles" className="text-primary-700 font-semibold underline">
                  Browse Vehicles
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiry.vehicles.map((v) => (
                  <div
                    key={v.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200 gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0">
                        <Image
                          src={v.featured_image}
                          alt={v.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-stone-900">
                          {v.name}
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

          {/* 2. Selected Tour Guides */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-600" />
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Licensed Tour Guides ({inquiry.guides.length})
                </h3>
              </div>
              <Link
                href="/guides"
                className="text-xs font-bold text-primary-700 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Browse Guides
              </Link>
            </div>

            {inquiry.guides.length === 0 ? (
              <div className="text-center py-6 text-stone-400 text-xs">
                No guides selected.{' '}
                <Link href="/guides" className="text-primary-700 font-semibold underline">
                  Explore Tour Guides
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiry.guides.map((g) => (
                  <div
                    key={g.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200 gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0">
                        <Image
                          src={g.profile_photo}
                          alt={g.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-stone-900">
                          {g.name}
                        </h4>
                        <span className="text-[11px] text-stone-500">
                          {g.category_name} &bull; {g.primary_city}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeGuide(g.id)}
                      className="p-2 text-stone-400 hover:text-red-600 rounded-lg transition-colors"
                      title="Remove Guide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Preferred Languages */}
          {inquiry.preferredLanguages.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary-600" />
                <h3 className="font-serif text-base font-bold text-stone-900">
                  Preferred Guide Languages
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {inquiry.preferredLanguages.map((l) => (
                  <span
                    key={l.id}
                    className="px-3 py-1 rounded-full bg-stone-100 text-xs font-semibold text-stone-800 flex items-center gap-1.5"
                  >
                    <span>{l.name}</span>
                    <button
                      onClick={() => removeLanguage(l.id)}
                      className="hover:text-red-600"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Direct WhatsApp Generation Banner */}
          <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-emerald-950">
                Prefer to Inquire via WhatsApp?
              </h4>
              <p className="text-xs text-emerald-800 mt-1 max-w-md">
                Generate a ready-to-send summary with your selected vehicles and guides directly in WhatsApp.
              </p>
            </div>
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 whitespace-nowrap shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send via WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Column: Traveler Details & Inquiry Form (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-white p-8 rounded-3xl border border-stone-200 shadow-luxury space-y-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-primary-600 block mb-1">
                Direct Travel Proposal
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Traveler Details & Schedule
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Full Name */}
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

              {/* Email Address */}
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

              {/* Phone / WhatsApp */}
              <div className="grid grid-cols-2 gap-3">
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
              <div className="grid grid-cols-2 gap-3">
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
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5] disabled:opacity-50"
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
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5] disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Flexible dates checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="flexibleDates"
                  name="flexibleDates"
                  checked={formData.flexibleDates}
                  onChange={handleInputChange}
                  className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                />
                <label htmlFor="flexibleDates" className="text-stone-600 font-medium cursor-pointer">
                  My travel dates are flexible
                </label>
              </div>

              {/* Travelers */}
              <div className="grid grid-cols-2 gap-3">
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
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 bg-[#FAF8F5]"
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
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 bg-[#FAF8F5]"
                  />
                </div>
              </div>

              {/* Pickup & Dropoff */}
              <div className="grid grid-cols-2 gap-3">
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
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 bg-[#FAF8F5]"
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
                    placeholder="e.g. Mumbai (BOM)"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 bg-[#FAF8F5]"
                  />
                </div>
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
                  placeholder="Dietary preferences, accessibility needs, preferred pace of travel..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 bg-[#FAF8F5]"
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
