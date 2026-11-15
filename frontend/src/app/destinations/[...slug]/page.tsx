import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_DESTINATIONS, POPULAR_PACKAGES, RECOMMENDED_ITINERARIES } from '@/lib/mock-data';
import { DestinationDetailClient } from './destination-detail-client';

interface PageProps {
  params: {
    slug: string[];
  };
}

// Helper to resolve destination from 1 or 2 slug segments
function resolveDestination(slugArray: string[]) {
  if (!slugArray || slugArray.length === 0) return null;

  // If 2 segments, e.g. ['rajasthan', 'jaipur']
  const targetSlug = slugArray.length > 1 ? slugArray[slugArray.length - 1] : slugArray[0];

  return ALL_DESTINATIONS.find((d) => {
    return (
      d.slug.toLowerCase() === targetSlug.toLowerCase() ||
      d.name.toLowerCase() === targetSlug.toLowerCase() ||
      d.slug.toLowerCase().includes(targetSlug.toLowerCase())
    );
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const dest = resolveDestination(params.slug);
  if (!dest) {
    return {
      title: 'Destination Not Found | Namaste Journeys',
    };
  }

  return {
    title: `${dest.name}, ${dest.state} Luxury Tour Guide | Best Time to Visit & Experiences`,
    description: `${dest.short_description} Discover key attractions, curated activities, best seasons to visit, and private chauffeur travel in ${dest.name}, ${dest.state}.`,
    openGraph: {
      title: `${dest.name} - Luxury India Destination | Namaste Journeys`,
      description: dest.short_description,
      images: dest.primary_image ? [{ url: dest.primary_image.image }] : [],
    },
  };
}

export async function generateStaticParams() {
  const paramsList: { slug: string[] }[] = [];

  ALL_DESTINATIONS.forEach((dest) => {
    // 1-segment: e.g. /destinations/jaipur
    paramsList.push({ slug: [dest.slug] });

    // 2-segment with sanitized state: e.g. /destinations/rajasthan/jaipur
    const stateSlug = dest.state.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    paramsList.push({ slug: [stateSlug, dest.slug] });
  });

  return paramsList;
}

export default function DestinationDetailPage({ params }: PageProps) {
  const dest = resolveDestination(params.slug);

  if (!dest) {
    notFound();
  }

  // Find nearby / related destinations in same region
  const nearbyDestinations = ALL_DESTINATIONS.filter(
    (d) => d.id !== dest.id && d.region_slug === dest.region_slug
  ).slice(0, 3);

  // Find related tour packages that cover this destination or region
  const relatedPackages = POPULAR_PACKAGES.filter((p) =>
    p.destinations.some((d) => d.id === dest.id) || p.region_name?.toLowerCase().includes(dest.region_name.toLowerCase())
  ).slice(0, 2);

  // Find related itineraries
  const relatedItineraries = RECOMMENDED_ITINERARIES.filter((i) =>
    i.destinations.some((d) => d.id === dest.id)
  );

  return (
    <DestinationDetailClient
      destination={dest}
      nearbyDestinations={nearbyDestinations}
      relatedPackages={relatedPackages}
      relatedItineraries={relatedItineraries}
    />
  );
}
