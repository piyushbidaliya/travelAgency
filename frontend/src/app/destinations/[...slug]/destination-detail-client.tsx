'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Destination, TourPackage, Itinerary } from '@/lib/types';
import { useTrip } from '@/lib/trip-context';
import { useComparison } from '@/lib/comparison-context';
import { DestinationCard } from '@/components/destination-card';
import { DestinationComparisonBarAndModal } from '@/components/destination-comparison-modal';
import {
  MapPin,
  Calendar,
  Clock,
  Compass,
  Plus,
  Check,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Share2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface DestinationDetailClientProps {
  destination: Destination;
  nearbyDestinations: Destination[];
  relatedPackages: TourPackage[];
  relatedItineraries: Itinerary[];
}

export const DestinationDetailClient: React.FC<DestinationDetailClientProps> = ({
  destination,
  nearbyDestinations,
  relatedPackages,
  relatedItineraries,
}) => {
  const { trip, addDestination, removeDestination } = useTrip();
  const { addToComparison, isComparing } = useComparison();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const isSelectedInTrip = trip.destinations.some((d) => d.id === destination.id);
  const comparing = isComparing(destination.id);

  // Pre-filled WhatsApp inquiry link specifically for this destination
  const encodedMsg = encodeURIComponent(
    `Hello Namaste Journeys! I am interested in planning a private trip to ${destination.name} (${destination.state}, ${destination.region_name}). Please share customized itinerary details and luxury hotel options.`
  );
  const destinationWhatsAppLink = `https://wa.me/919876543210?text=${encodedMsg}`;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Destination-specific FAQs
  const destinationFaqs = [
    {
      q: `What is the best season and weather in ${destination.name}?`,
      a: `${destination.name} is generally best visited during ${destination.best_time_to_visit}. During these months, daytime temperatures are comfortable for heritage touring, photography, and private excursions.`,
    },
    {
      q: `How many days are recommended to experience ${destination.name}?`,
      a: `We recommend a duration of ${destination.recommended_duration} to comfortably explore key monuments without feeling rushed, allowing time for private artisan encounters and heritage dining.`,
    },
    {
      q: `Can ${destination.name} be combined with other destinations?`,
      a: `Yes, ${destination.name} pairs seamlessly with nearby ${destination.region_name} gems like ${nearbyDestinations.map((d) => d.name).join(', ')}. Our private chauffeurs provide comfortable, door-to-door transit between cities.`,
    },
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* 1. Breadcrumbs */}
      <div className="pt-24 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-stone-500 flex items-center gap-2">
        <Link href="/" className="hover:text-primary-700">Home</Link>
        <span>/</span>
        <Link href="/destinations" className="hover:text-primary-700">Destinations</Link>
        <span>/</span>
        <Link href={`/destinations/${destination.region_slug}-india`} className="hover:text-primary-700">
          {destination.region_name}
        </Link>
        <span>/</span>
        <span className="font-semibold text-stone-900">{destination.name}</span>
      </div>

      {/* 2. Hero Destination Banner */}
      <section className="relative min-h-[50vh] sm:min-h-[58vh] flex items-end overflow-hidden bg-luxury-dark">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${destination.primary_image?.image || destination.images?.[0]?.image})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-20 w-full text-white">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-primary-600/90 text-white text-xs font-semibold uppercase tracking-wider">
              {destination.region_name}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-stone-200 text-xs font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary-300" />
              {destination.state}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4">
            {destination.name}
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-stone-200 font-light leading-relaxed mb-6">
            {destination.short_description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300">
            <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
              <Clock className="w-4 h-4 text-primary-400" />
              <span>Recommended: {destination.recommended_duration}</span>
            </span>
            <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
              <Calendar className="w-4 h-4 text-primary-400" />
              <span>Best Season: {destination.best_time_to_visit}</span>
            </span>
          </div>
        </div>
      </section>

      {/* 3. Main Content & Floating Action Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview & Detailed Description */}
            <section className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                About {destination.name}
              </h2>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
                {destination.detailed_description || destination.short_description}
              </p>

              {/* Travel styles tags */}
              <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mr-2">
                  Atmosphere & Styles:
                </span>
                {destination.travel_styles?.map((style, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-stone-100 text-stone-800 text-xs font-semibold rounded-lg"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </section>

            {/* Key Attractions */}
            {destination.main_attractions && destination.main_attractions.length > 0 && (
              <section className="space-y-6">
                <div>
                  <p className="text-xs uppercase font-bold tracking-widest text-primary-600 mb-1">
                    Monumental Highlights
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                    Main Attractions in {destination.name}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destination.main_attractions.map((attraction, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-start gap-3.5"
                    >
                      <div className="w-8 h-8 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center font-serif font-bold text-sm flex-shrink-0 mt-0.5">
                        0{idx + 1}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-stone-900 text-base">
                          {attraction}
                        </h4>
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                          Handpicked sight curated for architectural distinction, historical resonance, and private access.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Curated Activities & Local Experiences */}
            <section className="bg-[#FAF8F5] p-8 rounded-3xl border border-stone-200 space-y-6">
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-primary-600 mb-1">
                  Private Immersions
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Curated Activities & Local Experiences
                </h3>
              </div>

              <div className="space-y-3">
                {destination.activities?.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-stone-200/90 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-800">
                        {act}
                      </h4>
                    </div>
                  </div>
                ))}

                {destination.local_experiences?.map((exp, idx) => (
                  <div
                    key={`exp-${idx}`}
                    className="p-4 rounded-xl bg-primary-50/50 border border-primary-200/60 flex items-start gap-3"
                  >
                    <Sparkles className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-800">
                        {exp}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Insider Travel Tips */}
            {destination.travel_tips && destination.travel_tips.length > 0 && (
              <section className="bg-white p-8 rounded-3xl border border-stone-200 space-y-4">
                <div className="flex items-center gap-2 text-primary-600">
                  <AlertCircle className="w-5 h-5" />
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                    Travel Specialist Tips for {destination.name}
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600 list-disc list-inside">
                  {destination.travel_tips.map((tip, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Destination Specific FAQs */}
            <section className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Frequently Asked Questions about {destination.name}
              </h3>
              <div className="space-y-3">
                {destinationFaqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-stone-200 bg-white overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full p-5 text-left flex items-center justify-between font-serif font-bold text-sm sm:text-base text-stone-900 hover:text-primary-700"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-primary-600 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 border-t border-stone-100">
                          <p>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sticky Sidebar Action Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              
              {/* Main Booking / Trip Planner Action Box */}
              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-luxury space-y-5">
                <div>
                  <span className="text-[11px] font-bold text-primary-600 uppercase tracking-widest block">
                    Plan Your Visit
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                    Explore {destination.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Add this destination to your custom itinerary or speak directly with our private travel concierge.
                  </p>
                </div>

                {/* Add to My Trip Button */}
                <button
                  onClick={() => {
                    if (isSelectedInTrip) {
                      removeDestination(destination.id);
                    } else {
                      addDestination(destination);
                    }
                  }}
                  className={`w-full py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all ${
                    isSelectedInTrip
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                      : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-gold-glow'
                  }`}
                >
                  {isSelectedInTrip ? (
                    <>
                      <Check className="w-4 h-4" /> Added to My Trip
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" /> Add to My Trip
                    </>
                  )}
                </button>

                {/* Enquire Now Button */}
                <Link
                  href={`/contact?destination=${destination.slug}`}
                  className="w-full py-3 rounded-xl bg-luxury-dark hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Enquire For This Destination</span>
                </Link>

                {/* Direct WhatsApp Contact Button */}
                <a
                  href={destinationWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire via WhatsApp</span>
                </a>

                {/* Add to comparison */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                  <button
                    onClick={() => addToComparison(destination)}
                    className="hover:text-primary-700 font-semibold"
                  >
                    {comparing ? '✓ In Comparison' : '+ Compare with other places'}
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1 hover:text-stone-900"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'Copied!' : 'Share'}</span>
                  </button>
                </div>
              </div>

              {/* Concierge Guarantee Box */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-xs text-stone-600 space-y-2.5">
                <div className="flex items-center gap-2 text-stone-900 font-bold">
                  <ShieldCheck className="w-4 h-4 text-primary-600" />
                  <span>The Namaste Standard Guarantee</span>
                </div>
                <p className="leading-relaxed">
                  Every private journey includes verified chauffeured transport, handpicked 5-star or luxury boutique hotels, and dedicated round-the-clock concierge support.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Nearby Destinations in Same Region */}
        {nearbyDestinations.length > 0 && (
          <section className="mt-20 pt-16 border-t border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-primary-600">
                  Continue the Journey
                </p>
                <h3 className="font-serif text-3xl font-bold text-stone-900">
                  Nearby in {destination.region_name}
                </h3>
              </div>
              <Link
                href={`/destinations/${destination.region_slug}-india`}
                className="text-xs font-bold text-primary-700 hover:underline flex items-center gap-1"
              >
                <span>View All {destination.region_name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {nearbyDestinations.map((d) => (
                <DestinationCard key={d.id} destination={d} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Floating comparison drawer */}
      <DestinationComparisonBarAndModal />
    </div>
  );
};
