'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Vehicle } from '@/lib/types';
import { useCurrency } from '@/lib/currency';
import { useInquiry } from '@/lib/inquiry-context';
import {
  Car,
  Users,
  Luggage,
  Snowflake,
  ShieldCheck,
  Check,
  Plus,
  MessageSquare,
  Sparkles,
  ClipboardList,
  Fuel,
  Compass,
  ArrowRight,
  Info,
} from 'lucide-react';

interface VehicleDetailClientProps {
  vehicle: Vehicle;
  relatedVehicles: Vehicle[];
}

export const VehicleDetailClient: React.FC<VehicleDetailClientProps> = ({
  vehicle,
  relatedVehicles,
}) => {
  const { formatPrice } = useCurrency();
  const { inquiry, addVehicle, removeVehicle } = useInquiry();

  const isSelected = inquiry.vehicles.some((v) => v.id === vehicle.id);

  // Pre-filled WhatsApp link for this specific vehicle
  const whatsappText = encodeURIComponent(
    `Hello Namaste Journeys! I am interested in inquiring about the ${vehicle.name} (${vehicle.category_name}) with chauffeur for my travel across India. Please share availability and a custom quote.`
  );
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappText}`;

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-stone-500 flex items-center gap-2">
        <Link href="/" className="hover:text-primary-700">Home</Link>
        <span>/</span>
        <Link href="/vehicles" className="hover:text-primary-700">Tourist Vehicles</Link>
        <span>/</span>
        <span className="font-semibold text-stone-900">{vehicle.name}</span>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Visuals & Specifications */}
          <div className="lg:col-span-2 space-y-10">
            {/* Primary Visual */}
            <div className="relative h-80 sm:h-[420px] rounded-3xl overflow-hidden bg-stone-900 border border-stone-200 shadow-lg">
              <Image
                src={vehicle.featured_image}
                alt={vehicle.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-stone-900/85 backdrop-blur-md text-xs font-semibold text-white">
                  {vehicle.category_name}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-emerald-600/90 backdrop-blur-md text-xs font-semibold text-white">
                  Commercial Tourist Permit
                </span>
              </div>
            </div>

            {/* Title & Overview */}
            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-800 text-xs font-semibold tracking-wider uppercase border border-primary-200">
                <Car className="w-3.5 h-3.5 text-primary-600" />
                <span>{vehicle.brand} &bull; {vehicle.model_name}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                {vehicle.name}
              </h1>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {vehicle.description}
              </p>
            </div>

            {/* Technical Specifications Grid */}
            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Vehicle Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-center">
                  <Users className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Passenger Capacity
                  </span>
                  <span className="text-lg font-bold text-stone-900 mt-1 block">
                    {vehicle.seating_capacity} Persons
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-center">
                  <Luggage className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Luggage Space
                  </span>
                  <span className="text-lg font-bold text-stone-900 mt-1 block">
                    {vehicle.luggage_capacity} Suitcases
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-center">
                  <Snowflake className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Climate Control
                  </span>
                  <span className="text-lg font-bold text-stone-900 mt-1 block">
                    Dual AC Vents
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-center">
                  <Fuel className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Fleet Status
                  </span>
                  <span className="text-lg font-bold text-emerald-600 mt-1 block capitalize">
                    {vehicle.availability_status}
                  </span>
                </div>
              </div>
            </div>

            {/* Onboard Amenities & Inclusions */}
            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Included Amenities & Facilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicle.facilities.map((fac, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-3 text-xs sm:text-sm font-semibold text-stone-800"
                  >
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chauffeur Service Standards */}
            <div className="bg-[#FAF8F5] p-8 rounded-3xl border border-stone-200 space-y-4">
              <div className="flex items-center gap-2 text-primary-700 font-bold">
                <ShieldCheck className="w-5 h-5 text-primary-600" />
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  The Namaste Journeys Chauffeur Standard
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Driving on Indian highways requires skill, patience, and profound local knowledge. Every chauffeur assigned to your journey is police-verified, possesses over 5 years of commercial tourist driving experience, wears a clean uniform, speaks communicative English, and understands international guest etiquette.
              </p>
            </div>
          </div>

          {/* Right Column: Pricing & Inquiry Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Inquiry Action Box */}
              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-luxury space-y-6">
                <div>
                  <span className="text-[11px] font-bold text-primary-600 uppercase tracking-widest block mb-1">
                    Chauffeured Hire
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    {vehicle.name}
                  </h3>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                  <span className="text-[11px] text-stone-400 font-bold uppercase tracking-wider block">
                    Indicative Base Price
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif text-3xl font-bold text-stone-900">
                      {formatPrice(vehicle.price_inr)}
                    </span>
                    <span className="text-xs text-stone-500">
                      / {vehicle.pricing_unit}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-2 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                    <span>Includes vehicle hire, fuel, and chauffeur allowance. Tolls and state permits calculated upon itinerary.</span>
                  </p>
                </div>

                {/* Add to Inquiry Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      removeVehicle(vehicle.id);
                    } else {
                      addVehicle(vehicle);
                    }
                  }}
                  className={`w-full py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                      : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-gold-glow'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4" /> Vehicle In Inquiry
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" /> Add Vehicle to Inquiry
                    </>
                  )}
                </button>

                {/* Review Consolidated Inquiry */}
                <Link
                  href="/my-inquiry"
                  className="w-full py-3 rounded-xl bg-luxury-dark hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <ClipboardList className="w-4 h-4 text-primary-300" />
                  <span>Review Inquiry ({inquiry.vehicles.length} Selected)</span>
                </Link>

                {/* Direct WhatsApp Contact Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire via WhatsApp</span>
                </a>
              </div>

              {/* Safety & Hygiene Guarantee */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 text-xs text-stone-600 space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Tourist Vehicle Standards</span>
                </div>
                <p className="leading-relaxed">
                  Every vehicle undergoes sanitization before pickup, carries GPS fleet tracking, and has commercial passenger transport insurance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Vehicles in Fleet */}
        {relatedVehicles.length > 0 && (
          <section className="mt-20 pt-14 border-t border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-primary-600">
                  Alternative Fleet Options
                </p>
                <h3 className="font-serif text-3xl font-bold text-stone-900">
                  Other Tourist Vehicles
                </h3>
              </div>
              <Link
                href="/vehicles"
                className="text-xs font-bold text-primary-700 hover:underline flex items-center gap-1"
              >
                <span>View All Fleet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedVehicles.map((v) => (
                <div
                  key={v.id}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex flex-col justify-between group"
                >
                  <div className="relative h-44 w-full bg-stone-100">
                    <Image
                      src={v.featured_image}
                      alt={v.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 text-[10px] font-semibold text-white">
                      {v.category_name}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-base font-bold text-stone-900 mb-1 group-hover:text-primary-700 transition-colors">
                        <Link href={`/vehicles/${v.slug}`}>{v.name}</Link>
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-2 mb-3">
                        {v.description}
                      </p>
                      <div className="text-sm font-bold text-stone-900 mb-4">
                        {formatPrice(v.price_inr)} <span className="text-xs font-normal text-stone-500">/ Day</span>
                      </div>
                    </div>
                    <Link
                      href={`/vehicles/${v.slug}`}
                      className="text-xs font-bold text-primary-700 hover:underline flex items-center justify-between"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
