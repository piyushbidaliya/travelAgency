import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Compass,
  ShieldCheck,
  Car,
  Award,
  Globe,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Namaste Journeys - India Travel Services & Chauffeurs',
  description:
    'Learn about Namaste Journeys. We provide international travelers with verified tourist vehicles, professional English-speaking chauffeurs, and licensed multilingual tour guides across India.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-24 bg-luxury-dark text-white border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-primary-400 block mb-2">
            Our Purpose & Vision
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-6">
            Connecting International Voyagers with the Soul of India
          </h1>
          <p className="max-w-3xl mx-auto text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Founded to eliminate travel friction, uncertainty, and linguistic barriers, Namaste Journeys empowers international guests to explore the vast cultural expanse of India with elegance, safety, and authentic local scholarship.
          </p>
        </div>
      </section>

      {/* Main Philosophy Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Vetted Tourist Fleet & Chauffeurs
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Navigating India by road is an experience in itself. Every vehicle in our fleet is air-conditioned, commercially permitted for interstate tourist transit, and piloted by a vetted, polite chauffeur trained in defensive driving.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Licensed Multilingual Scholars
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              No hurried scripts or commission-driven shopping stops. Our guides carry official Ministry of Tourism licenses, university historical degrees, and fluency in French, German, Spanish, Japanese, and English.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Transparent, Direct Operations
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We operate with genuine transparency. All quotations are calculated with clear mileage bounds, transparent toll policies, and direct communication through WhatsApp and verified corporate email.
            </p>
          </div>
        </div>

        {/* Why Private Chauffeured Travel */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-primary-600 block">
              Travel Philosophy
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 leading-tight">
              Why Private Chauffeured Transit is the Finest Way to Discover India
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              India is a land of spontaneous discoveries: a roadside peacock sanctuary in Rajasthan, a serene tea stall overlooking Kerala’s hills, or an impromptu blessing at a countryside shrine.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              With your dedicated chauffeur, your schedule remains entirely yours. There are no crowds of 50 tourists to wait on, no luggage transfers between shared shuttles, and no timetable stress.
            </p>
          </div>

          <div className="space-y-3 bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-stone-700">
                <strong>Door-to-door comfort:</strong> From airport arrival gates to remote heritage palace courtyards.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-stone-700">
                <strong>Clean, chilled vehicles:</strong> Continuous air conditioning and bottled mineral water on long drives.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-stone-700">
                <strong>Local navigation expertise:</strong> Navigating interstate expressways, mountain passes, and town bazaars with ease.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-stone-700">
                <strong>Flexible stops:</strong> Pause anytime for photography, authentic chai, or artisan demonstrations.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="p-10 rounded-3xl bg-luxury-dark text-white text-center space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Ready to Plan Your Indian Journey?
          </h2>
          <p className="max-w-xl mx-auto text-stone-300 text-sm">
            Browse our destinations, select your private tourist vehicle, and choose certified tour guides in your preferred language.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/destinations"
              className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              Explore Destinations
            </Link>
            <Link
              href="/my-inquiry"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-colors border border-white/20"
            >
              Open Travel Inquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
