import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GUIDES_DATA, LANGUAGES_DATA } from '@/lib/mock-data';
import { GuideDetailClient } from './guide-detail-client';
import { MultilingualGuideClient } from './multilingual-guide-client';

interface PageProps {
  params: {
    slug: string;
  };
}

const MULTILINGUAL_PAGES = [
  { slug: 'french-speaking-guides', langCode: 'fr', langName: 'French' },
  { slug: 'german-speaking-guides', langCode: 'de', langName: 'German' },
  { slug: 'spanish-speaking-guides', langCode: 'es', langName: 'Spanish' },
  { slug: 'english-speaking-guides', langCode: 'en', langName: 'English' },
  { slug: 'italian-speaking-guides', langCode: 'it', langName: 'Italian' },
  { slug: 'japanese-speaking-guides', langCode: 'ja', langName: 'Japanese' },
  { slug: 'russian-speaking-guides', langCode: 'ru', langName: 'Russian' },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Check if multilingual page
  const multi = MULTILINGUAL_PAGES.find((m) => m.slug === params.slug);
  if (multi) {
    return {
      title: `Licensed ${multi.langName}-Speaking Tour Guides in India | Certified Historians`,
      description: `Book licensed government-approved ${multi.langName}-speaking tour guides across India. Expert historical commentary in Delhi, Agra, Jaipur, Varanasi, and Kerala.`,
      openGraph: {
        title: `${multi.langName}-Speaking Tour Guides in India | Namaste Journeys`,
        description: `Verified ${multi.langName} tour guides for international travelers.`,
      },
    };
  }

  // Individual guide
  const guide = GUIDES_DATA.find((g) => g.slug === params.slug);
  if (!guide) {
    return {
      title: 'Guide Not Found | Namaste Journeys',
    };
  }

  const langs = guide.languages.map((l) => l.language_name).join(', ');

  return {
    title: `${guide.name} - Licensed ${guide.category_name} in India (${langs})`,
    description: `${guide.bio.slice(0, 160)} Book ${guide.name}, verified tourist guide based in ${guide.primary_city}, ${guide.state}. Fluent in ${langs}.`,
    openGraph: {
      title: `${guide.name} | Licensed Tour Guide in India`,
      description: guide.bio,
      images: [{ url: guide.profile_photo }],
    },
  };
}

export async function generateStaticParams() {
  const guideSlugs = GUIDES_DATA.map((g) => ({ slug: g.slug }));
  const multiSlugs = MULTILINGUAL_PAGES.map((m) => ({ slug: m.slug }));
  return [...guideSlugs, ...multiSlugs];
}

export default function GuideOrLanguagePage({ params }: PageProps) {
  // 1. Check if multilingual portal
  const multi = MULTILINGUAL_PAGES.find((m) => m.slug === params.slug);
  if (multi) {
    const langObj = LANGUAGES_DATA.find((l) => l.code === multi.langCode) || {
      id: 999,
      name: multi.langName,
      code: multi.langCode,
      native_name: multi.langName,
      is_active: true,
      display_order: 1,
    };

    // Filter guides speaking this language (or fallback to top guides for English/demo)
    let matchingGuides = GUIDES_DATA.filter((g) =>
      g.languages.some(
        (l) => l.language_code.toLowerCase() === multi.langCode.toLowerCase() ||
               l.language_name.toLowerCase() === multi.langName.toLowerCase()
      )
    );
    if (matchingGuides.length === 0) {
      matchingGuides = GUIDES_DATA.slice(0, 3);
    }

    return (
      <MultilingualGuideClient
        language={langObj}
        guides={matchingGuides}
      />
    );
  }

  // 2. Individual guide profile
  const guide = GUIDES_DATA.find((g) => g.slug === params.slug);
  if (!guide) {
    notFound();
  }

  const otherGuides = GUIDES_DATA.filter((g) => g.id !== guide.id).slice(0, 3);

  return (
    <GuideDetailClient
      guide={guide}
      otherGuides={otherGuides}
    />
  );
}
