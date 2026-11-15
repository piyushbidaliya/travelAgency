import React from 'react';
import { TESTIMONIALS_DATA } from '@/lib/mock-data';
import { Star, Quote, MapPin } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase font-bold tracking-widest text-primary-600 mb-2">
            International Traveler Experiences
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            Words from Our Guests
          </h2>
          <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
            Read reflections from international voyagers who entrusted their Indian journeys to our private concierge team.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-2xl bg-white border border-stone-200/90 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 mb-4 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-6">
                  &ldquo;{t.review_text}&rdquo;
                </p>
              </div>

              {/* Author & Tour taken */}
              <div className="pt-4 border-t border-stone-100">
                <h4 className="font-serif font-bold text-stone-900 text-sm">
                  {t.author_name}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                  <MapPin className="w-3 h-3 text-primary-600" />
                  <span>{t.author_location}</span>
                </div>
                <p className="text-[11px] text-primary-700 font-medium mt-1">
                  Trip: {t.trip_title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
