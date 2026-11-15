import React from 'react';
import { Metadata } from 'next';
import { ContactClient } from './contact-client';

export const metadata: Metadata = {
  title: 'Contact Travel Concierge | Namaste Journeys India',
  description:
    'Contact the Namaste Journeys concierge team. Inquire about private tourist vehicles, certified tour guides, and custom travel across India. Fast response via WhatsApp and email.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Hero Header */}
      <section className="relative py-20 bg-luxury-dark text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-primary-400 block mb-2">
            Direct Concierge Assistance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Contact Our India Concierge
          </h1>
          <p className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Have questions about planning your visit to India, vehicle availability, or multilingual guide arrangements? Connect with our dedicated journey planners.
          </p>
        </div>
      </section>

      {/* Main Interactive Form & Contact Details */}
      <ContactClient />
    </div>
  );
}
