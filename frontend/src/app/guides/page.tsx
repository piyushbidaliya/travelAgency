import React from 'react';
import { Metadata } from 'next';
import { GUIDE_CATEGORIES, GUIDES_DATA, LANGUAGES_DATA } from '@/lib/mock-data';
import { GuidesClient } from './guides-client';

export const metadata: Metadata = {
  title: 'Licensed Multilingual Tour Guides in India | French, German, Spanish, English Historians',
  description:
    'Discover government-certified, multilingual tourist guides across India. Expert regional historians and naturalists fluent in French, German, Spanish, Italian, Japanese, and English.',
  keywords: [
    'India tour guide license',
    'French speaking tour guide India',
    'German speaking tour guide India',
    'Spanish speaking tour guide India',
    'Rajasthan heritage guide',
    'Varanasi cultural historian guide',
  ],
};

export default function GuidesPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Hero Header */}
      <section className="relative py-20 bg-luxury-dark text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-primary-400 block mb-2">
            Government-Licensed Historians & Naturalists
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Professional Tour Guides & Scholars
          </h1>
          <p className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Every monument in India holds centuries of secrets. Explore with licensed regional scholars, art historians, and naturalists fluent in your native language.
          </p>
        </div>
      </section>

      {/* Main Interactive Guide Explorer */}
      <GuidesClient
        categories={GUIDE_CATEGORIES}
        languages={LANGUAGES_DATA}
        guides={GUIDES_DATA}
      />
    </div>
  );
}
