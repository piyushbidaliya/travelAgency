'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Vehicle, VehicleCategory } from '@/lib/types';
import { useCurrency } from '@/lib/currency';
import { useInquiry } from '@/lib/inquiry-context';
import {
  Car,
  Users,
  Luggage,
  Snowflake,
  Search,
  Check,
  Plus,
  ShieldCheck,
  Filter,
  ArrowRight,
  Info,
} from 'lucide-react';

interface VehiclesClientProps {
  categories: VehicleCategory[];
  vehicles: Vehicle[];
}

export const VehiclesClient: React.FC<VehiclesClientProps> = ({ categories, vehicles }) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { formatPrice } = useCurrency();
  const { inquiry, addVehicle, removeVehicle } = useInquiry();

  const isVehicleSelected = (vehicleId: number) => inquiry.vehicles.some((v) => v.id === vehicleId);

  // Filter vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Category filter
      if (selectedCategory !== 'all' && v.category_slug !== selectedCategory) {
        return false;
      }

      // Capacity filter
      if (selectedCapacity !== 'all') {
        if (selectedCapacity === '1-4' && v.seating_capacity > 4) return false;
        if (selectedCapacity === '5-7' && (v.seating_capacity < 5 || v.seating_capacity > 7)) return false;
        if (selectedCapacity === '8-15' && (v.seating_capacity < 8 || v.seating_capacity > 15)) return false;
        if (selectedCapacity === '16+' && v.seating_capacity < 16) return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = v.name.toLowerCase().includes(query);
        const matchesBrand = v.brand.toLowerCase().includes(query);
        const matchesCat = v.category_name.toLowerCase().includes(query);
        const matchesDesc = v.description.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCat && !matchesDesc) {
          return false;
        }
      }

      return true;
    });
  }, [vehicles, selectedCategory, selectedCapacity, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Controls & Search Filter Bar */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm mb-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model, brand, or category (e.g. Innova, Mercedes)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5]"
            />
          </div>

          {/* Passenger Capacity Select */}
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-stone-400" />
            <span className="text-xs font-semibold text-stone-700">Seating Capacity:</span>
            <select
              value={selectedCapacity}
              onChange={(e) => setSelectedCapacity(e.target.value)}
              className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5]"
            >
              <option value="all">Any Capacity</option>
              <option value="1-4">1 to 4 Passengers (Sedans & Coupes)</option>
              <option value="5-7">5 to 7 Passengers (SUVs & MUVs)</option>
              <option value="8-15">8 to 15 Passengers (Tempo Travellers)</option>
              <option value="16+">16+ Passengers (Coaches & Minibuses)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="pt-4 border-t border-stone-100 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedCategory === 'all'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All Categories ({vehicles.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Standards Banner */}
      <div className="mb-10 p-5 rounded-2xl bg-primary-50 border border-primary-200 text-xs text-primary-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-primary-700 flex-shrink-0" />
          <span>
            <strong>Our Commitment to International Standards:</strong> All tourist vehicles include full air-conditioning, verified tourist permits, first-aid kits, sanitized interiors, and courteous English-speaking chauffeurs.
          </span>
        </div>
        <Link
          href="/my-inquiry"
          className="whitespace-nowrap px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>{inquiry.vehicles.length > 0 ? `My Inquiry (${inquiry.vehicles.length})` : 'Enquire Now'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Vehicles Grid */}
      {filteredVehicles.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8">
          <Car className="w-12 h-12 text-stone-400 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
            No tourist vehicles match your criteria
          </h3>
          <p className="text-sm text-stone-500 mb-6">
            Try adjusting your search terms or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedCapacity('all');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => {
            const isSelected = isVehicleSelected(vehicle.id);
            return (
              <div
                key={vehicle.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image (Clickable - redirects to vehicle spec page) */}
                <Link
                  href={`/vehicles/${vehicle.slug}`}
                  className="block relative h-56 w-full overflow-hidden bg-stone-100 cursor-pointer"
                >
                  <Image
                    src={vehicle.featured_image}
                    alt={vehicle.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-stone-900/85 backdrop-blur-md text-[11px] font-semibold text-white">
                      {vehicle.category_name}
                    </span>
                    {vehicle.is_featured && (
                      <span className="px-2.5 py-1 rounded-md bg-primary-600 backdrop-blur-md text-[11px] font-semibold text-white">
                        Recommended
                      </span>
                    )}
                  </div>
                </Link>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900 mb-2 group-hover:text-primary-700 transition-colors">
                      <Link href={`/vehicles/${vehicle.slug}`}>{vehicle.name}</Link>
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                      {vehicle.description}
                    </p>

                    {/* Technical Specifications */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-stone-100 text-stone-600 text-xs mb-4 bg-stone-50 rounded-xl px-3">
                      <div className="flex items-center gap-1.5" title="Passenger Capacity">
                        <Users className="w-3.5 h-3.5 text-stone-400" />
                        <span>{vehicle.seating_capacity} Seats</span>
                      </div>
                      <div className="flex items-center gap-1.5" title="Luggage Capacity">
                        <Luggage className="w-3.5 h-3.5 text-stone-400" />
                        <span>{vehicle.luggage_capacity} Luggage</span>
                      </div>
                      <div className="flex items-center gap-1.5" title="Air Conditioned">
                        <Snowflake className="w-3.5 h-3.5 text-primary-500" />
                        <span>AC</span>
                      </div>
                    </div>

                    {/* Facilities chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {vehicle.facilities.slice(0, 3).map((fac, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-stone-100 text-stone-700"
                        >
                          {fac}
                        </span>
                      ))}
                    </div>

                    {/* Indicative Pricing */}
                    <div className="mb-4">
                      <div className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
                        Indicative Price (INR Base)
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-serif font-bold text-stone-900">
                          {formatPrice(vehicle.price_inr)}
                        </span>
                        <span className="text-xs text-stone-500">
                          / {vehicle.pricing_unit}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Add to Inquiry & View Details */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (!isSelected) {
                          addVehicle(vehicle);
                        }
                        router.push('/my-inquiry');
                      }}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                          : 'bg-primary-600 hover:bg-primary-700 text-white'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>View in Inquiry</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Inquiry</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={`/vehicles/${vehicle.slug}`}
                      className="py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wider text-primary-950 bg-gradient-to-r from-amber-50 to-primary-100 hover:from-primary-600 hover:to-primary-700 hover:text-white border border-primary-300 hover:border-transparent transition-all duration-200 flex items-center gap-1.5 shadow-sm group whitespace-nowrap"
                    >
                      <span>View Specs</span>
                      <ArrowRight className="w-3.5 h-3.5 text-primary-700 group-hover:text-white transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
