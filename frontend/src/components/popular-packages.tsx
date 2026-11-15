'use client';

import React from 'react';
import Link from 'next/link';
import { POPULAR_PACKAGES } from '@/lib/mock-data';
import { useCurrency } from '@/lib/currency';
import { useTrip } from '@/lib/trip-context';
import { Clock, Plus, Check, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const PopularPackages: React.FC = () => {
  const { convertAndFormat, currency, isEstimate } = useCurrency();
  const { trip, addPackage, removePackage } = useTrip();

  return (
    <section className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs uppercase font-bold tracking-widest text-primary-600 mb-2">
              Signature Journeys
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
              Popular Travel Packages
            </h2>
          </div>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-800 group"
          >
            <span>View All Tour Packages</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {POPULAR_PACKAGES.map((pkg) => {
            const isSelected = trip.packages.some((p) => p.id === pkg.id);
            const priceFormatted = convertAndFormat(pkg.starting_price_inr);

            return (
              <div
                key={pkg.id}
                className="group rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image & Header */}
                <div className="relative h-60 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${pkg.featured_image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Duration Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-luxury-dark/90 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/15">
                      <Clock className="w-3.5 h-3.5 text-primary-400" />
                      <span>{pkg.duration_days} Days / {pkg.duration_nights} Nights</span>
                    </span>
                  </div>

                  {/* Region badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-medium border border-white/20">
                      {pkg.region_name}
                    </span>
                  </div>

                  {/* Pricing on Image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <span className="text-[11px] text-stone-300 uppercase tracking-wider block font-sans">
                        Starting from
                      </span>
                      <span className="font-serif text-2xl font-bold text-white tracking-tight">
                        {priceFormatted}
                      </span>
                      {isEstimate && (
                        <span className="text-[10px] text-stone-300 block -mt-0.5">
                          *Indicative estimate ({currency})
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-semibold text-primary-300 bg-black/40 px-2 py-0.5 rounded">
                      Per Person
                    </span>
                  </div>
                </div>

                {/* Package Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2 group-hover:text-primary-700 transition-colors">
                      <Link href={`/packages/${pkg.slug}`}>{pkg.name}</Link>
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-5">
                      {pkg.short_description}
                    </p>

                    {/* Highlights bullet list */}
                    <div className="space-y-2 mb-6">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                        Curated Highlights:
                      </p>
                      {pkg.tour_highlights.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary-600 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                    <button
                      onClick={() => {
                        if (isSelected) {
                          removePackage(pkg.id);
                        } else {
                          addPackage(pkg);
                        }
                      }}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-[#FAF8F5] hover:bg-stone-200 text-stone-800 border border-stone-300'
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
                      href={`/contact?package=${pkg.slug}`}
                      className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-sm"
                    >
                      Enquire
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
