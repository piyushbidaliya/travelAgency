import React from 'react';
import { Metadata } from 'next';
import { InquiryClient } from './inquiry-client';

export const metadata: Metadata = {
  title: 'Travel Inquiry & Concierge Desk | Namaste Journeys India',
  description:
    'Plan and submit your private India travel inquiry. Chauffeured tourist vehicles, optional local monument tour guides, and personalized itinerary support from our New Delhi concierge desk.',
};

export default function MyInquiryPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Header */}
      <section className="relative py-20 bg-luxury-dark text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-primary-400 block mb-2">
            Consolidated Travel Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Travel Inquiry & Concierge Desk
          </h1>
          <p className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Review your selected tourist vehicles or request customized transport with optional monument tour guides. Our concierge desk is at your service.
          </p>
        </div>
      </section>

      {/* Main Interactive Inquiry Planner & Form */}
      <InquiryClient />
    </div>
  );
}
