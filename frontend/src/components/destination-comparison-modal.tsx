'use client';

import React from 'react';
import Link from 'next/link';
import { useComparison } from '@/lib/comparison-context';
import { useTrip } from '@/lib/trip-context';
import { X, ArrowRight, Check, Plus, Clock, Calendar, Compass, Scale } from 'lucide-react';

export const DestinationComparisonBarAndModal: React.FC = () => {
  const {
    comparedDestinations,
    removeFromComparison,
    clearComparison,
    isModalOpen,
    setIsModalOpen,
  } = useComparison();
  const { trip, addDestination, removeDestination } = useTrip();

  if (comparedDestinations.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Comparison Drawer Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-luxury-dark/98 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl px-5 py-3.5 flex items-center gap-4 text-white max-w-xl w-[92%] animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-primary-400" />
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
            Compare ({comparedDestinations.length}/3)
          </span>
        </div>

        {/* Selected miniature thumbnails */}
        <div className="flex items-center gap-2 flex-1 overflow-x-auto py-1">
          {comparedDestinations.map((d) => (
            <div
              key={d.id}
              className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg text-xs border border-white/15 flex-shrink-0"
            >
              <span className="font-serif font-semibold">{d.name}</span>
              <button
                onClick={() => removeFromComparison(d.id)}
                className="text-stone-400 hover:text-white"
                aria-label={`Remove ${d.name} from comparison`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            Compare Now
          </button>
          <button
            onClick={clearComparison}
            className="text-[11px] text-stone-400 hover:text-white px-2 py-1"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Comparison Matrix Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] text-stone-900 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-stone-300 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 bg-luxury-dark text-white flex items-center justify-between border-b border-white/15">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary-400">
                  Side-by-Side Analysis
                </p>
                <h3 className="font-serif text-2xl font-bold">
                  Destination Comparison Matrix
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-stone-300 hover:text-white"
                aria-label="Close comparison modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Matrix Body - Scrollable */}
            <div className="overflow-y-auto p-6 flex-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {comparedDestinations.map((d) => {
                  const isSelectedInTrip = trip.destinations.some((item) => item.id === d.id);

                  return (
                    <div
                      key={d.id}
                      className="rounded-2xl bg-white border border-stone-200 p-5 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        {/* Image */}
                        <div className="relative h-44 rounded-xl overflow-hidden mb-4">
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${d.primary_image?.image})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <span className="absolute bottom-2 left-3 text-xs font-bold text-white">
                            {d.region_name} • {d.state}
                          </span>
                        </div>

                        <h4 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                          {d.name}
                        </h4>

                        <p className="text-xs text-stone-600 mb-4 line-clamp-2">
                          {d.short_description}
                        </p>

                        {/* Specs Grid */}
                        <div className="space-y-3 text-xs border-t border-stone-100 pt-3">
                          <div>
                            <span className="font-bold text-stone-400 uppercase tracking-wider block text-[10px]">
                              Best Time to Visit:
                            </span>
                            <span className="font-medium text-stone-800 flex items-center gap-1.5 mt-0.5">
                              <Calendar className="w-3.5 h-3.5 text-primary-600" />
                              {d.best_time_to_visit}
                            </span>
                          </div>

                          <div>
                            <span className="font-bold text-stone-400 uppercase tracking-wider block text-[10px]">
                              Recommended Duration:
                            </span>
                            <span className="font-medium text-stone-800 flex items-center gap-1.5 mt-0.5">
                              <Clock className="w-3.5 h-3.5 text-primary-600" />
                              {d.recommended_duration}
                            </span>
                          </div>

                          <div>
                            <span className="font-bold text-stone-400 uppercase tracking-wider block text-[10px]">
                              Travel Styles:
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {d.travel_styles?.map((s, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-stone-100 rounded text-[11px] text-stone-700 font-medium"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="font-bold text-stone-400 uppercase tracking-wider block text-[10px]">
                              Key Attractions:
                            </span>
                            <ul className="list-disc list-inside text-stone-700 space-y-0.5 mt-1">
                              {d.main_attractions?.slice(0, 4).map((att, i) => (
                                <li key={i} className="line-clamp-1">
                                  {att}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <span className="font-bold text-stone-400 uppercase tracking-wider block text-[10px]">
                              Top Activities:
                            </span>
                            <ul className="list-disc list-inside text-stone-700 space-y-0.5 mt-1">
                              {d.activities?.slice(0, 3).map((act, i) => (
                                <li key={i} className="line-clamp-1">
                                  {act}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Action CTAs */}
                      <div className="pt-5 border-t border-stone-200 mt-6 flex flex-col gap-2">
                        <button
                          onClick={() => {
                            if (isSelectedInTrip) {
                              removeDestination(d.id);
                            } else {
                              addDestination(d);
                            }
                          }}
                          className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                            isSelectedInTrip
                              ? 'bg-emerald-600 text-white'
                              : 'bg-primary-600 hover:bg-primary-700 text-white'
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

                        <Link
                          href={`/destinations/${d.slug}`}
                          onClick={() => setIsModalOpen(false)}
                          className="w-full text-center py-2 text-xs font-bold text-stone-700 hover:text-primary-700"
                        >
                          View Full Destination Guide &rarr;
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-100 border-t border-stone-200 text-center flex items-center justify-between px-6">
              <span className="text-xs text-stone-500">
                You can select up to 3 destinations across any region in India to compare.
              </span>
              <button
                onClick={clearComparison}
                className="text-xs font-bold text-stone-600 hover:text-stone-900"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
