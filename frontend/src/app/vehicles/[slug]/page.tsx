import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { VEHICLES_DATA } from '@/lib/mock-data';
import { VehicleDetailClient } from './vehicle-detail-client';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const vehicle = VEHICLES_DATA.find((v) => v.slug === params.slug);
  if (!vehicle) {
    return {
      title: 'Vehicle Not Found | Namaste Journeys',
    };
  }

  return {
    title: `${vehicle.name} Chauffeur Hire in India | Rates, Specs & Luggage Capacity`,
    description: `Book ${vehicle.name} (${vehicle.category_name}) with professional English-speaking chauffeur across India. ${vehicle.seating_capacity} passengers, ${vehicle.luggage_capacity} bags, air-conditioned luxury travel.`,
    openGraph: {
      title: `${vehicle.name} - Tourist Vehicle Hire | Namaste Journeys`,
      description: vehicle.description,
      images: [{ url: vehicle.featured_image }],
    },
  };
}

export async function generateStaticParams() {
  return VEHICLES_DATA.map((v) => ({
    slug: v.slug,
  }));
}

export default function VehicleDetailPage({ params }: PageProps) {
  const vehicle = VEHICLES_DATA.find((v) => v.slug === params.slug);

  if (!vehicle) {
    notFound();
  }

  const relatedVehicles = VEHICLES_DATA.filter((v) => v.id !== vehicle.id).slice(0, 3);

  return (
    <VehicleDetailClient
      vehicle={vehicle}
      relatedVehicles={relatedVehicles}
    />
  );
}
