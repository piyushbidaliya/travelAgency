import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { REGIONS_DATA, ALL_DESTINATIONS, POPULAR_PACKAGES, RECOMMENDED_ITINERARIES } from '@/lib/mock-data';
import { DestinationCard } from './destination-card';
import { DestinationComparisonBarAndModal } from './destination-comparison-modal';
import { Calendar, Compass, Clock, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface RegionalPageTemplateProps {
  regionSlug: 'north-india' | 'south-india' | 'east-india' | 'west-india';
}

export const RegionalPageTemplate: React.FC<RegionalPageTemplateProps> = ({ regionSlug }) => {
  const region = REGIONS_DATA.find((r) => r.slug === regionSlug);
  if (!region) {
    notFound();
  }

  // Filter destinations belonging to this region
  const regionalDestinations = ALL_DESTINATIONS.filter(
    (d) => d.region_slug === region.name || d.region_name.toLowerCase().includes(region.title.toLowerCase())
  );

  // Filter related packages and itineraries
  const relatedPackages = POPULAR_PACKAGES.filter((p) => p.region_name?.toLowerCase().includes(region.title.toLowerCase()));
  const relatedItineraries = RECOMMENDED_ITINERARIES.filter((i) =>
    i.destinations.some((d) => d.region_slug === region.name)
  );

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* 1. Cinematic Regional Hero Banner */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-luxury-dark">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${region.hero_image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/60 to-black/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-stone-200 text-xs tracking-widest uppercase mb-4">
            <Compass className="w-3.5 h-3.5 text-primary-400" />
            <span>Regional India Explorer</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight mb-4">
            {region.title}
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-primary-200 mb-6 max-w-2xl mx-auto">
            &ldquo;{region.tagline}&rdquo;
          </p>

          <p className="max-w-3xl mx-auto text-sm sm:text-base text-stone-200 leading-relaxed font-light mb-8">
            {region.description}
          </p>

          {/* Quick Regional Fact Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-stone-200">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
              <Calendar className="w-3.5 h-3.5 text-primary-400" />
              <span>Best Season: {region.best_time_to_visit}</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
              <MapPin className="w-3.5 h-3.5 text-primary-400" />
              <span>{regionalDestinations.length} Curated Destinations</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. Popular Travel Experiences in this Region */}
      <section className="py-12 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs uppercase font-bold tracking-widest text-primary-600 mb-6 text-center">
            Signature Regional Experiences
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {region.popular_experiences?.map((exp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs font-medium text-stone-800 leading-relaxed">
                  {exp}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Regional Destinations Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs uppercase font-bold tracking-widest text-primary-600 mb-1">
              Sanctuaries & Citadels
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Destinations in {region.title}
            </h2>
          </div>
          <Link
            href="/destinations"
            className="text-xs font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1"
          >
            <span>View All All-India Destinations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regionalDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* 4. Related Packages & Suggested Itineraries for Region */}
      {(relatedPackages.length > 0 || relatedItineraries.length > 0) && (
        <section className="py-16 bg-stone-100 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Packages */}
            {relatedPackages.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs uppercase font-bold tracking-widest text-primary-600">
                      Curated Journeys
                    </p>
                    <h3 className="font-serif text-2xl font-bold text-stone-900">
                      Featured Packages in {region.title}
                    </h3>
                  </div>
                  <Link
                    href="/packages"
                    className="text-xs font-bold text-primary-700 hover:underline flex items-center gap-1"
                  >
                    All Packages &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm p-5 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[11px] font-semibold text-primary-700 uppercase tracking-wider block mb-1">
                          {pkg.travel_category}
                        </span>
                        <h4 className="font-serif text-xl font-bold text-stone-900 mb-2">
                          <Link href={`/packages/${pkg.slug}`}>{pkg.name}</Link>
                        </h4>
                        <p className="text-xs text-stone-600 mb-4 line-clamp-2">
                          {pkg.short_description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-stone-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-primary-600" />
                            {pkg.duration_days} Days / {pkg.duration_nights} Nights
                          </span>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                        <Link
                          href={`/packages/${pkg.slug}`}
                          className="text-xs font-bold text-primary-700 hover:underline"
                        >
                          View Itinerary &rarr;
                        </Link>
                        <Link
                          href={`/contact?package=${pkg.slug}`}
                          className="px-3.5 py-1.5 rounded-lg bg-primary-600 text-white text-xs font-semibold hover:bg-primary-700"
                        >
                          Enquire
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Itineraries */}
            {relatedItineraries.length > 0 && (
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mb-6">
                  Suggested {region.title} Itineraries
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedItineraries.map((itin) => (
                    <div
                      key={itin.id}
                      className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                          <span className="font-semibold text-primary-700">
                            {itin.duration_days} Days / {itin.duration_nights} Nights
                          </span>
                          {itin.total_distance_km && (
                            <span>{itin.total_distance_km} km route</span>
                          )}
                        </div>
                        <h4 className="font-serif text-xl font-bold text-stone-900 mb-2">
                          <Link href={`/itineraries/${itin.slug}`}>{itin.title}</Link>
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed mb-4">
                          {itin.overview}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                        <Link
                          href={`/itineraries/${itin.slug}`}
                          className="text-xs font-bold text-stone-800 hover:text-primary-700"
                        >
                          Explore Timeline &rarr;
                        </Link>
                        <Link
                          href="/my-trip"
                          className="px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800"
                        >
                          Customize This
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Internal Cross-Region Navigation Links */}
      <section className="py-12 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase font-bold tracking-widest text-stone-400 mb-4">
            Explore Other Realms of India
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {REGIONS_DATA.filter((r) => r.slug !== regionSlug).map((other) => (
              <Link
                key={other.id}
                href={`/destinations/${other.slug}`}
                className="px-5 py-2.5 rounded-xl bg-[#FAF8F5] border border-stone-300 hover:border-primary-500 text-xs font-bold text-stone-800 hover:text-primary-700 transition-colors"
              >
                {other.title} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Floating Comparison Matrix Component */}
      <DestinationComparisonBarAndModal />
    </div>
  );
};
