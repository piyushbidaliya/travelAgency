import React from 'react';
import { Metadata } from 'next';
import { VEHICLE_CATEGORIES, VEHICLES_DATA } from '@/lib/mock-data';
import { VehiclesClient } from './vehicles-client';

export const metadata: Metadata = {
  title: 'Tourist Vehicles & Chauffeurs in India | Sedans, SUVs, Tempo Travellers & Luxury Cars',
  description:
    'Discover our premium fleet of air-conditioned tourist vehicles with professional English-speaking chauffeurs. From Toyota Innova and Fortuner to Mercedes-Benz and Force Urbania luxury vans across India.',
  keywords: [
    'India tourist car rental with driver',
    'Chauffeured car rental India',
    'Toyota Innova Crysta rental India',
    'Tempo Traveller luxury hire India',
    'Mercedes Benz chauffeur India',
  ],
};

export default function VehiclesPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Hero Header */}
      <section className="relative py-20 bg-luxury-dark text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-primary-400 block mb-2">
            Pan-India Tourist Transport
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Tourist Vehicles & Chauffeurs
          </h1>
          <p className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            All vehicles in our fleet are air-conditioned, commercially licensed for tourist travel, and piloted by vetted, courteous chauffeurs trained in international hospitality.
          </p>
        </div>
      </section>

      {/* Main Interactive Fleet Explorer */}
      <VehiclesClient
        categories={VEHICLE_CATEGORIES}
        vehicles={VEHICLES_DATA}
      />
    </div>
  );
}
