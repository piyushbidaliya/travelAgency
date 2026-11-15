'use client';

import React from 'react';
import Link from 'next/link';
import { FEATURED_DESTINATIONS } from '@/lib/mock-data';
import { useTrip } from '@/lib/trip-context';
import { Plus, Check, Clock, Calendar, MapPin, ArrowRight } from 'lucide-react';

export const FeaturedDestinations: React.FC = () => {
  const { trip, addDestination, removeDestination } = useTrip();

  return (
    <section className="py-24 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs uppercase font-bold tracking-widest text-primary-600 mb-2">
              Crown Jewels of the Subcontinent
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
              Featured Destinations
            </h2>
          </div>
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-800 group"
          >
            <span>Browse All 50+ Destinations</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_DESTINATIONS.map((dest) => {
            const isSelected = trip.destinations.some((d) => d.id === dest.id);

            return (
              <div
                key={dest.id}
                className="group rounded-2xl overflow-hidden bg-[#FAF8F5] border border-stone-200/80 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between"
              >
                {/* Destination Image & Badges */}
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${dest.primary_image?.image})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Region badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white border border-white/20">
                      {dest.region_name}
                    </span>
                  </div>

                  {/* State badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-primary-400" />
                    <span>{dest.state}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2 group-hover:text-primary-700 transition-colors">
                      <Link href={`/destinations/${dest.slug}`}>{dest.name}</Link>
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                      {dest.short_description}
                    </p>

                    {/* Metadata chips */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-500 mb-6 bg-white p-2.5 rounded-xl border border-stone-200/60">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />
                        <span className="truncate">{dest.recommended_duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />
                        <span className="truncate">{dest.best_time_to_visit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Add to My Trip & View Details */}
                  <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        if (isSelected) {
                          removeDestination(dest.id);
                        } else {
                          addDestination(dest);
                        }
                      }}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-white hover:bg-stone-100 text-stone-800 border border-stone-300'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Trip</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-primary-600" />
                          <span>Add to My Trip</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={`/destinations/${dest.slug}`}
                      className="py-2.5 px-4 rounded-xl text-xs font-bold text-stone-700 hover:text-primary-700 transition-colors"
                    >
                      Explore &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
