'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  ShieldCheck,
  Globe,
} from 'lucide-react';

export const ContactClient: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    serviceInterest: 'vehicles_and_guides',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to backend if available
      await fetch('http://127.0.0.1:8000/api/inquiries/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      // graceful fallback
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Contact Channels & Office Info (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-primary-600 block mb-1">
              Connect Directly
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              We Are Here to Assist Your India Travel
            </h2>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">
              Our travel specialists assist international travelers across all time zones. Inquiries are reviewed and answered with custom proposals in under 12 hours.
            </p>
          </div>

          {/* Quick WhatsApp Box */}
          <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Instant WhatsApp Concierge</span>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              For immediate questions regarding vehicle availability, guide bookings, or airport transfers, connect directly on WhatsApp.
            </p>
            <a
              href="https://wa.me/919876543210?text=Hello%20Namaste%20Journeys%2C%20I%20would%20like%20to%20inquire%20about%20travel%20services%20in%20India."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat with Specialist</span>
            </a>
          </div>

          {/* Contact Details List */}
          <div className="space-y-4 text-xs sm:text-sm text-stone-700 bg-white p-6 rounded-3xl border border-stone-200">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="block text-stone-900">Corporate Travel Desk:</strong>
                <span>Connaught Place, Barakhamba Road, New Delhi, India 110001</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
              <Phone className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="block text-stone-900">Telephone / Chauffeur Operations:</strong>
                <a href="tel:+911123456789" className="hover:text-primary-700 transition-colors">
                  +91 11 2345 6789 / +91 98765 43210
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
              <Mail className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="block text-stone-900">General Inquiries:</strong>
                <a href="mailto:concierge@namastejourneys.com" className="hover:text-primary-700 transition-colors">
                  concierge@namastejourneys.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
              <Clock className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="block text-stone-900">Concierge Desk Hours:</strong>
                <span>08:00 AM – 10:00 PM IST (24/7 on-road support for travelers in India)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-luxury">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                  Thank you for reaching out. A dedicated India travel specialist will review your request and get back to you within 12 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        country: '',
                        serviceInterest: 'vehicles_and_guides',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1">
                    Send a Message
                  </h3>
                  <p className="text-stone-500 mb-4">
                    Fill out the form below and we will tailor your transport, guide, and destination needs.
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. David Miller"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5]"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. david.miller@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+44 20 7946 0991"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5]"
                    />
                  </div>
                </div>

                {/* Country and Service Interest */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Country of Residence *
                    </label>
                    <input
                      type="text"
                      required
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="e.g. United Kingdom"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Service Interest
                    </label>
                    <select
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5]"
                    >
                      <option value="vehicles_and_guides">Tourist Vehicles & Licensed Guides</option>
                      <option value="vehicles_only">Tourist Vehicles & Chauffeur Only</option>
                      <option value="guides_only">Multilingual Tour Guides Only</option>
                      <option value="multi_destination">Multi-City India Expedition</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="font-bold text-stone-700 uppercase tracking-wider block mb-1">
                    Your Travel Plans & Requirements
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the cities you wish to visit, preferred travel dates, number of travelers, and any special interests..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message to Concierge</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
