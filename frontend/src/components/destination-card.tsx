'use client';

import React from 'react';
import Link from 'next/link';
import { Destination } from '@/lib/types';
import { useTrip } from '@/lib/trip-context';
import { useComparison } from '@/lib/comparison-context';
import { Plus, Check, Clock, Calendar, MapPin, Scale } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { trip, addDestination, removeDestination } = useTrip();
  const { isComparing, addToComparison } = useComparison();

  const isSelectedInTrip = trip.destinations.some((d) => d.id === destination.id);
  const comparing = isComparing(destination.id);

  return (
    <div className="group rounded-2xl overflow-hidden bg-[#FAF8F5] border border-stone-200/80 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between">
      {/* Destination Image & Badges */}
      <div className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url(${destination.primary_image?.image || destination.images?.[0]?.image})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        {/* Region badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white border border-white/20">
            {destination.region_name}
          </span>
        </div>

        {/* Compare Toggle Button on Top Right */}
        <button
          onClick={() => addToComparison(destination)}
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border transition-all flex items-center gap-1 ${
            comparing
              ? 'bg-primary-600 text-white border-primary-500 shadow-sm'
              : 'bg-black/60 text-stone-200 hover:text-white border-white/20 hover:bg-black/80'
          }`}
          aria-label={`Toggle comparison for ${destination.name}`}
        >
          <Scale className="w-3 h-3" />
          <span>{comparing ? 'Comparing' : 'Compare'}</span>
        </button>

        {/* State badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-medium">
          <MapPin className="w-3.5 h-3.5 text-primary-400" />
          <span>{destination.state}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2 group-hover:text-primary-700 transition-colors">
            <Link href={`/destinations/${destination.slug}`}>{destination.name}</Link>
          </h3>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
            {destination.short_description}
          </p>

          {/* Quick metadata chips */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-500 mb-6 bg-white p-2.5 rounded-xl border border-stone-200/60">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />
              <span className="truncate">{destination.recommended_duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />
              <span className="truncate">{destination.best_time_to_visit.split('(')[0]}</span>
            </div>
          </div>
        </div>

        {/* Actions: Add to My Trip & View Details */}
        <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              if (isSelectedInTrip) {
                removeDestination(destination.id);
              } else {
                addDestination(destination);
              }
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              isSelectedInTrip
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white hover:bg-stone-100 text-stone-800 border border-stone-300'
            }`}
          >
            {isSelectedInTrip ? (
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
            href={`/destinations/${destination.slug}`}
            className="py-2.5 px-4 rounded-xl text-xs font-bold text-stone-700 hover:text-primary-700 transition-colors"
          >
            Explore &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
