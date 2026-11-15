'use client';

import React from 'react';
import Link from 'next/link';
import { RECOMMENDED_ITINERARIES } from '@/lib/mock-data';
import { Calendar, Compass, ArrowRight, Route } from 'lucide-react';

export const RecommendedItineraries: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase font-bold tracking-widest text-primary-600 mb-2">
            Seamless Routes & Timelines
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            Recommended Itineraries
          </h2>
          <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
            Thoughtfully calibrated travel schedules designed by regional experts. Balanced driving times, handpicked scenic stops, and private chauffeur pacing.
          </p>
        </div>

        {/* Itinerary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RECOMMENDED_ITINERARIES.map((itin, index) => (
            <div
              key={itin.id}
              className="relative p-8 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Accent Bar */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-primary-700 uppercase tracking-wider bg-primary-100/60 px-3 py-1 rounded-full">
                  Route 0{index + 1}
                </span>
                {itin.total_distance_km && (
                  <span className="text-xs text-stone-500 flex items-center gap-1">
                    <Route className="w-3.5 h-3.5 text-primary-600" />
                    <span>{itin.total_distance_km} km total</span>
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3 hover:text-primary-700 transition-colors">
                  <Link href={`/itineraries/${itin.slug}`}>{itin.title}</Link>
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed mb-6">
                  {itin.overview}
                </p>

                {/* Duration & Season tags */}
                <div className="flex flex-wrap items-center gap-2 mb-8 text-xs text-stone-600">
                  <span className="px-2.5 py-1 rounded-md bg-white border border-stone-200 font-medium">
                    {itin.duration_days} Days / {itin.duration_nights} Nights
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-stone-200 font-medium">
                    {itin.best_time_to_visit}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-stone-200 flex items-center justify-between gap-4">
                <Link
                  href={`/itineraries/${itin.slug}`}
                  className="text-xs font-bold text-stone-800 hover:text-primary-700 transition-colors"
                >
                  View Day Schedule &rarr;
                </Link>

                <Link
                  href={`/my-trip`}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-luxury-dark hover:bg-stone-800 transition-colors"
                >
                  Customize Route
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA for all itineraries */}
        <div className="mt-12 text-center">
          <Link
            href="/itineraries"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-800"
          >
            <span>Explore All Recommended Timelines</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
