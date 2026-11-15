'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Car, Users, Luggage, Snowflake, ShieldCheck, Check, Plus, ArrowRight } from 'lucide-react';
import { VEHICLES_DATA } from '@/lib/mock-data';
import { useCurrency } from '@/lib/currency';
import { useInquiry } from '@/lib/inquiry-context';
import { Vehicle } from '@/lib/types';

export const VehiclesPreview: React.FC = () => {
  const { formatPrice } = useCurrency();
  const { inquiry, addVehicle, removeVehicle } = useInquiry();

  // Show top 3-4 featured vehicles
  const previewVehicles = VEHICLES_DATA.filter((v) => v.is_featured).slice(0, 4);

  const isVehicleSelected = (vehicleId: number) => {
    return inquiry.vehicles.some((v) => v.id === vehicleId);
  };

  const handleToggleVehicle = (vehicle: Vehicle) => {
    if (isVehicleSelected(vehicle.id)) {
      removeVehicle(vehicle.id);
    } else {
      addVehicle(vehicle);
    }
  };

  return (
    <section className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-800 text-xs font-semibold tracking-wider uppercase mb-3 border border-primary-200">
              <Car className="w-3.5 h-3.5 text-primary-600" />
              <span>Dedicated Tourist Fleet</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Premium Tourist Vehicles & Chauffeurs
            </h2>
            <p className="mt-3 text-stone-600 max-w-2xl text-sm sm:text-base leading-relaxed">
              Explore India with peace of mind. Every vehicle in our fleet is fully air-conditioned, impeccably maintained, and piloted by a vetted, courteous, English-speaking tourist chauffeur.
            </p>
          </div>

          <Link
            href="/vehicles"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 group"
          >
            <span>Browse Full Vehicle Fleet</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewVehicles.map((vehicle) => {
            const isSelected = isVehicleSelected(vehicle.id);
            return (
              <div
                key={vehicle.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={vehicle.featured_image}
                    alt={vehicle.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-md text-[11px] font-semibold text-white">
                      {vehicle.category_name}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 mb-1 line-clamp-1 group-hover:text-primary-700 transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mb-4 leading-relaxed">
                      {vehicle.description}
                    </p>

                    {/* Specs badge row */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-stone-100 text-stone-600 text-xs mb-4">
                      <div className="flex items-center gap-1.5" title="Passenger Capacity">
                        <Users className="w-3.5 h-3.5 text-stone-400" />
                        <span>{vehicle.seating_capacity} Seats</span>
                      </div>
                      <div className="flex items-center gap-1.5" title="Luggage Capacity">
                        <Luggage className="w-3.5 h-3.5 text-stone-400" />
                        <span>{vehicle.luggage_capacity} Bags</span>
                      </div>
                      <div className="flex items-center gap-1.5" title="Air Conditioned">
                        <Snowflake className="w-3.5 h-3.5 text-primary-500" />
                        <span>AC</span>
                      </div>
                    </div>

                    {/* Price display */}
                    <div className="mb-4">
                      <div className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
                        Indicative Rate
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-bold text-stone-900">
                          {formatPrice(vehicle.price_inr)}
                        </span>
                        <span className="text-xs text-stone-500">
                          / {vehicle.pricing_unit.split('(')[0].trim()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <Link
                      href={`/vehicles/${vehicle.slug}`}
                      className="text-xs font-semibold text-stone-600 hover:text-stone-900"
                    >
                      Vehicle Specs &rarr;
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleToggleVehicle(vehicle)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-primary-600 hover:bg-primary-700 text-white'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Inquiry</span>
                        </>
                      )}
                    </button>
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
