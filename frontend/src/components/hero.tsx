import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Shield, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-luxury-dark">
      {/* Background Image with Dark Vignette */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2000&q=85')`, // Taj Mahal at golden hour
        }}
      >
        {/* Layered cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/60 to-black/70" />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        
        {/* Subtitle pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-stone-200 text-xs tracking-widest uppercase mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-primary-400" />
          <span>Curated Private Expeditions for International Voyagers</span>
        </div>

        {/* Master Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
          Discover the <span className="gold-gradient-text italic font-normal">Extraordinary</span> India
        </h1>

        {/* Editorial Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-stone-200 font-sans leading-relaxed mb-10 font-light">
          Step into a realm of opulent Rajput palaces, tranquil backwater lagoons, sacred river ghats, and high Himalayan passes — tailored with private chauffeurs, heritage suites, and seasoned local scholars.
        </p>

        {/* Primary Call to Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/destinations"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white font-semibold text-sm tracking-wider uppercase shadow-gold-glow flex items-center justify-center gap-2.5 transition-all hover:scale-105 active:scale-95"
          >
            <span>Explore Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/my-trip"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 font-semibold text-sm tracking-wider uppercase transition-all hover:border-white/40 flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-primary-300" />
            <span>Plan Your Journey</span>
          </Link>
        </div>

        {/* Trust points underneath hero */}
        <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-stone-300 text-xs">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>100% Bespoke Itineraries</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-400" />
            <span>Private Chauffeur & Sedan</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Handpicked Heritage Palaces</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>24/7 Dedicated Concierge</span>
          </div>
        </div>
      </div>
    </section>
  );
};
