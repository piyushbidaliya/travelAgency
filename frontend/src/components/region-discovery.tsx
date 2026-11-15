import React from 'react';
import Link from 'next/link';
import { REGIONS_DATA } from '@/lib/mock-data';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';

export const RegionDiscovery: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase font-bold tracking-widest text-primary-600 mb-2">
            Territories of Wonder
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            Explore India by Region
          </h2>
          <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
            India is a subcontinent of continents. Choose your realm of exploration — from the grand royal forts of the North to the soothing coastal backwaters of the South.
          </p>
        </div>

        {/* 4 Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REGIONS_DATA.map((region) => (
            <Link
              key={region.id}
              href={`/destinations/${region.slug}`}
              className="group relative rounded-2xl overflow-hidden shadow-luxury card-hover-effect flex flex-col justify-end min-h-[420px] bg-stone-900 border border-stone-200"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${region.hero_image})` }}
              />

              {/* Gradient Dark Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

              {/* Destination badge top right */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-primary-300 border border-white/15">
                  {region.destinations_count} Destinations
                </span>
              </div>

              {/* Card Content */}
              <div className="relative z-10 p-6">
                <h3 className="font-serif text-2xl font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">
                  {region.title}
                </h3>
                <p className="text-xs text-primary-200 font-medium tracking-wide mb-3 line-clamp-1">
                  {region.tagline}
                </p>
                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed mb-4">
                  {region.description}
                </p>

                {/* Best time pill */}
                <div className="flex items-center gap-1.5 text-[11px] text-stone-300 mb-4 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg w-fit">
                  <Calendar className="w-3.5 h-3.5 text-primary-400" />
                  <span>{region.best_time_to_visit.split('(')[0]}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-white pt-2 border-t border-white/15">
                  <span className="text-primary-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Discover {region.title} &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
