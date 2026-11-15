'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Guide } from '@/lib/types';
import { useInquiry } from '@/lib/inquiry-context';
import {
  Users,
  Award,
  Globe,
  Star,
  ShieldCheck,
  Check,
  Plus,
  MessageSquare,
  Sparkles,
  ClipboardList,
  MapPin,
  Clock,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface GuideDetailClientProps {
  guide: Guide;
  otherGuides: Guide[];
}

export const GuideDetailClient: React.FC<GuideDetailClientProps> = ({
  guide,
  otherGuides,
}) => {
  const { inquiry, addGuide, removeGuide } = useInquiry();
  const isSelected = inquiry.guides.some((g) => g.id === guide.id);

  const langs = guide.languages.map((l) => l.language_name).join(', ');

  const whatsappText = encodeURIComponent(
    `Hello Namaste Journeys! I would like to inquire about booking certified guide ${guide.name} (${guide.category_name}, fluent in ${langs}) for our travel in India. Please check availability.`
  );
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappText}`;

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-stone-500 flex items-center gap-2">
        <Link href="/" className="hover:text-primary-700">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-primary-700">Tour Guides</Link>
        <span>/</span>
        <span className="font-semibold text-stone-900">{guide.name}</span>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Profile & Credentials */}
          <div className="lg:col-span-2 space-y-10">
            {/* Guide Header Banner */}
            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative w-36 h-36 rounded-2xl overflow-hidden bg-stone-200 flex-shrink-0 shadow-md">
                <Image
                  src={guide.profile_photo}
                  alt={guide.name}
                  fill
                  priority
                  sizes="144px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-md bg-stone-900 text-[11px] font-semibold text-white">
                    {guide.category_name}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-semibold flex items-center gap-1 border border-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    License: {guide.license_number}
                  </span>
                </div>

                <h1 className="font-serif text-3xl font-bold text-stone-900 mb-2">
                  {guide.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary-600" />
                    {guide.primary_city}, {guide.state}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary-600" />
                    {guide.years_of_experience} Years Field Experience
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {guide.rating} ({guide.reviews_count} Reviews)
                  </span>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed font-sans">
                  {guide.bio}
                </p>
              </div>
            </div>

            {/* Language Proficiencies */}
            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary-600" />
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  Multilingual Proficiencies
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-500">
                All guide language proficiencies are verified through academic credentials and Ministry of Tourism language certifications.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guide.languages.map((l) => (
                  <div
                    key={l.id}
                    className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-serif text-base font-bold text-stone-900">
                        {l.language_name}
                      </h4>
                      <span className="text-xs text-stone-500 uppercase tracking-wider">
                        ISO Code: {l.language_code.toUpperCase()}
                      </span>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        (l.proficiency_level || l.proficiency || '').toLowerCase() === 'native'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : (l.proficiency_level || l.proficiency || '').toLowerCase() === 'fluent'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-primary-100 text-primary-800 border border-primary-200'
                      }`}
                    >
                      {l.proficiency_level || l.proficiency_display || 'Fluent'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialization & Expertise */}
            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-600" />
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  Signature Walking Immersions & Historical Focus
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Whether deciphering Mughal architectural inscriptions, navigating temple ritual symbolism in Varanasi, or explaining the complex geopolitical history of Rajput bastions, {guide.name} provides nuanced narrative context tailored to international travelers and scholars.
              </p>
            </div>

            {/* Verification Guarantee */}
            <div className="bg-primary-50 p-6 rounded-2xl border border-primary-200 flex items-start gap-3 text-xs sm:text-sm text-primary-900">
              <ShieldCheck className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Government License Credential Verified:</strong> This guide carries active Ministry of Tourism Regional Guide authorization ({guide.license_number}) and is permitted to escort guests inside protected ASI monuments.
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Action Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-luxury space-y-6">
                <div>
                  <span className="text-[11px] font-bold text-primary-600 uppercase tracking-widest block mb-1">
                    Certified Guide
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    {guide.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Add this guide to your consolidated travel inquiry to check scheduling for your travel dates.
                  </p>
                </div>

                {/* Add Guide Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      removeGuide(guide.id);
                    } else {
                      addGuide(guide);
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
                      <Check className="w-4 h-4" /> Guide In Inquiry
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" /> Add Guide to Inquiry
                    </>
                  )}
                </button>

                {/* Review Complete Inquiry */}
                <Link
                  href="/my-inquiry"
                  className="w-full py-3 rounded-xl bg-luxury-dark hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <ClipboardList className="w-4 h-4 text-primary-300" />
                  <span>Review Inquiry ({inquiry.guides.length} Guides)</span>
                </Link>

                {/* WhatsApp Button */}
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

              {/* Service Standard */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 text-xs text-stone-600 space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Guaranteed Standards</span>
                </div>
                <p className="leading-relaxed">
                  No commissioned shopping traps. Our certified guides focus 100% on historical narrative, monument exploration, and guest care.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Guides Carousel / Grid */}
        {otherGuides.length > 0 && (
          <section className="mt-20 pt-14 border-t border-stone-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-primary-600">
                  Explore More Scholars
                </p>
                <h3 className="font-serif text-3xl font-bold text-stone-900">
                  Other Licensed Tour Guides
                </h3>
              </div>
              <Link
                href="/guides"
                className="text-xs font-bold text-primary-700 hover:underline flex items-center gap-1"
              >
                <span>View Full Roster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherGuides.map((g) => (
                <div
                  key={g.id}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex flex-col justify-between group p-5"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-stone-200 flex-shrink-0">
                      <Image
                        src={g.profile_photo}
                        alt={g.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-stone-900 group-hover:text-primary-700 transition-colors">
                        <Link href={`/guides/${g.slug}`}>{g.name}</Link>
                      </h4>
                      <p className="text-xs text-primary-700 font-medium">
                        {g.category_name}
                      </p>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        {g.primary_city}, {g.state}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 mb-4">
                    {g.bio}
                  </p>

                  <Link
                    href={`/guides/${g.slug}`}
                    className="text-xs font-bold text-stone-800 hover:text-primary-700 flex items-center justify-between pt-3 border-t border-stone-100"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
