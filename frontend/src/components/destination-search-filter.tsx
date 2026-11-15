'use client';

import React, { useState, useMemo } from 'react';
import { Destination } from '@/lib/types';
import { DestinationCard } from './destination-card';
import { Search, SlidersHorizontal, X, Compass, Filter } from 'lucide-react';

interface DestinationSearchFilterProps {
  initialDestinations: Destination[];
  defaultRegion?: string;
}

export const DestinationSearchFilter: React.FC<DestinationSearchFilterProps> = ({
  initialDestinations,
  defaultRegion,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>(defaultRegion || 'all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Extract all unique styles and seasons
  const allStyles = useMemo(() => {
    const set = new Set<string>();
    initialDestinations.forEach((d) => d.travel_styles?.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [initialDestinations]);

  const allSeasons = ['Winter', 'Spring', 'Summer', 'Autumn', 'Monsoon'];

  // Filtered & sorted destinations
  const filteredDestinations = useMemo(() => {
    return initialDestinations
      .filter((dest) => {
        // Query search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = dest.name.toLowerCase().includes(q);
          const matchState = dest.state.toLowerCase().includes(q);
          const matchAttractions = dest.main_attractions?.some((a) => a.toLowerCase().includes(q));
          if (!matchName && !matchState && !matchAttractions) return false;
        }

        // Region filter
        if (selectedRegion !== 'all') {
          if (dest.region_slug !== selectedRegion && dest.region_name.toLowerCase() !== selectedRegion.toLowerCase()) {
            return false;
          }
        }

        // Style filter
        if (selectedStyle !== 'all') {
          if (!dest.travel_styles?.includes(selectedStyle)) return false;
        }

        // Season filter
        if (selectedSeason !== 'all') {
          if (!dest.ideal_seasons?.includes(selectedSeason)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        if (sortBy === 'featured') {
          if (a.is_featured === b.is_featured) return 0;
          return a.is_featured ? -1 : 1;
        }
        return 0;
      });
  }, [initialDestinations, searchQuery, selectedRegion, selectedStyle, selectedSeason, sortBy]);

  const activeFiltersCount =
    (selectedRegion !== 'all' ? 1 : 0) +
    (selectedStyle !== 'all' ? 1 : 0) +
    (selectedSeason !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedStyle('all');
    setSelectedSeason('all');
    setSortBy('featured');
  };

  return (
    <div className="space-y-8">
      {/* Control Bar: Search Input, Filters Toggle & Sort */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          
          {/* Autocomplete / Text Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations by name, state (e.g. Jaipur, Kerala, Agra, Ladakh)..."
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-white border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 font-sans text-stone-900 placeholder-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto py-1">
            {[
              { id: 'all', label: 'All Regions' },
              { id: 'north', label: 'North India' },
              { id: 'south', label: 'South India' },
              { id: 'east', label: 'East India' },
              { id: 'west', label: 'West India' },
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedRegion === reg.id
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="w-full md:w-auto flex items-center justify-end gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2.5 px-3 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="featured">Featured First</option>
              <option value="name-asc">Alphabetical (A-Z)</option>
              <option value="name-desc">Alphabetical (Z-A)</option>
            </select>

            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                isFilterDrawerOpen || activeFiltersCount > 0
                  ? 'bg-primary-50 border-primary-300 text-primary-700'
                  : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
              }`}
              aria-label="Toggle Advanced Filters"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-primary-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Secondary Expandable Filter Drawer (Travel Style & Season) */}
        {isFilterDrawerOpen && (
          <div className="pt-4 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-200">
            {/* Travel Style */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                Travel Style / Category
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Travel Styles</option>
                {allStyles.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Ideal Season */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                Ideal Season
              </label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Seasons</option>
                {allSeasons.map((sn) => (
                  <option key={sn} value={sn}>
                    {sn}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="py-2 px-4 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 hover:bg-white transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>
          Showing <strong>{filteredDestinations.length}</strong> of{' '}
          <strong>{initialDestinations.length}</strong> Indian destinations
        </span>

        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-primary-600 hover:text-primary-800 font-semibold flex items-center gap-1"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Destinations Cards Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center rounded-2xl bg-white border border-stone-200 p-8">
          <Compass className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-bold text-stone-800 mb-2">
            No Matching Destinations Found
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
            We couldn’t find any destinations matching your search and filter criteria. Try adjusting your search query or reset filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
