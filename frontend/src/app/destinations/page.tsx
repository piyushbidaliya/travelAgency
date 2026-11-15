import { Metadata } from 'next';
import Link from 'next/link';
import { ALL_DESTINATIONS, REGIONS_DATA } from '@/lib/mock-data';
import { DestinationSearchFilter } from '@/components/destination-search-filter';
import { DestinationComparisonBarAndModal } from '@/components/destination-comparison-modal';
import { Compass, Sparkles, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Indian Destinations Explorer | North, South, East & West India',
  description:
    'Discover over 50 iconic and handpicked luxury destinations across India. Filter by region, travel style, and optimal season to craft your bespoke Indian journey.',
};

export default function DestinationsIndexPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 text-primary-600" />
            <span>The Complete Subcontinent Directory</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight mb-4">
            Explore Indian Destinations
          </h1>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            From the royal palaces and desert fortresses of Rajasthan to the palm backwaters of Kerala and wild Himalayan heights. Search, filter, compare, and assemble your dream expedition.
          </p>
        </div>

        {/* Quick Regional Navigation Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {REGIONS_DATA.map((reg) => (
            <Link
              key={reg.id}
              href={`/destinations/${reg.slug}`}
              className="p-4 rounded-2xl bg-white border border-stone-200/90 hover:border-primary-500 shadow-sm hover:shadow-luxury transition-all group flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-primary-600 uppercase tracking-wider block">
                  Region
                </span>
                <span className="font-serif font-bold text-stone-900 group-hover:text-primary-700 text-base">
                  {reg.title}
                </span>
              </div>
              <span className="text-xs text-stone-400 group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* Search, Filter & Destination Grid with Comparison support */}
        <DestinationSearchFilter initialDestinations={ALL_DESTINATIONS} />

        {/* Floating Comparison Drawer & Side-by-side Modal */}
        <DestinationComparisonBarAndModal />
      </div>
    </div>
  );
}
