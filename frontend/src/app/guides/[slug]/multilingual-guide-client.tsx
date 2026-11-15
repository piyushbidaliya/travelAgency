'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Guide, Language } from '@/lib/types';
import { useInquiry } from '@/lib/inquiry-context';
import {
  Globe,
  Award,
  ShieldCheck,
  Star,
  Check,
  Plus,
  MessageSquare,
  ArrowRight,
  ClipboardList,
} from 'lucide-react';

interface MultilingualGuideClientProps {
  language: Language;
  guides: Guide[];
}

export const MultilingualGuideClient: React.FC<MultilingualGuideClientProps> = ({
  language,
  guides,
}) => {
  const { inquiry, addGuide, removeGuide, toggleLanguage } = useInquiry();

  const isGuideSelected = (guideId: number) => inquiry.guides.some((g) => g.id === guideId);
  const isLanguageSelected = inquiry.preferredLanguages.some((l) => l.id === language.id);

  const whatsappText = encodeURIComponent(
    `Hello Namaste Journeys! I am looking for licensed ${language.name}-speaking tour guides for my trip to India. Please share availability and profiles.`
  );
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappText}`;

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-20 bg-luxury-dark text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wider uppercase mb-3 border border-white/15">
            <Globe className="w-3.5 h-3.5 text-primary-400" />
            <span>Dedicated Language Directory &bull; {language.name}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Licensed {language.name}-Speaking Tour Guides in India
          </h1>
          <p className="max-w-3xl mx-auto text-stone-300 text-sm sm:text-base leading-relaxed font-light mb-8">
            Experience the architectural wonders and living heritage of India narrated fluently in {language.name}. Our government-approved scholars eliminate language barriers, ensuring subtle nuances, architectural terms, and cultural context are communicated effortlessly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => toggleLanguage(language)}
              className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                isLanguageSelected
                  ? 'bg-emerald-600 text-white'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              {isLanguageSelected ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{language.name} Added to Inquiry</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add {language.name} to My Inquiry</span>
                </>
              )}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Why Native Language Guide Section */}
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm mb-12 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Why Choose a {language.name}-Speaking Guide in India?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Historical monuments such as the Taj Mahal, the Amber Fort of Jaipur, and the ancient temples of South India carry centuries of complex mythology, dynastic politics, and religious philosophy. Having an expert guide fluent in {language.name} allows seamless Q&A, deep intellectual discussions, and tailored pacing for you and your family.
          </p>
        </div>

        {/* Guides Roster */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs uppercase font-bold tracking-widest text-primary-600">
                Verified Experts
              </p>
              <h3 className="font-serif text-3xl font-bold text-stone-900">
                Available {language.name}-Speaking Guides ({guides.length})
              </h3>
            </div>
            <Link
              href="/guides"
              className="text-xs font-bold text-primary-700 hover:underline flex items-center gap-1"
            >
              <span>All Tour Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => {
              const isSelected = isGuideSelected(guide.id);
              const langProficiency = guide.languages.find(
                (l) => l.language_code.toLowerCase() === language.code.toLowerCase() ||
                       l.language_name.toLowerCase() === language.name.toLowerCase()
              );

              return (
                <div
                  key={guide.id}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative h-64 w-full overflow-hidden bg-stone-200">
                    <Image
                      src={guide.profile_photo}
                      alt={guide.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-stone-900/85 backdrop-blur-md text-[11px] font-semibold text-white">
                        {guide.category_name}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="bg-emerald-700/90 backdrop-blur-md px-2.5 py-1 rounded font-medium flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {guide.license_number}
                      </span>
                      <span className="bg-black/75 backdrop-blur-md px-2 py-1 rounded font-bold flex items-center gap-1 text-amber-300">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {guide.rating} ({guide.reviews_count})
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-xl font-bold text-stone-900 mb-1 group-hover:text-primary-700 transition-colors">
                        <Link href={`/guides/${guide.slug}`}>{guide.name}</Link>
                      </h4>
                      <p className="text-xs text-primary-700 font-semibold mb-3">
                        {guide.years_of_experience} Years Experience &bull; {guide.primary_city}, {guide.state}
                      </p>
                      <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                        {guide.bio}
                      </p>

                      {/* Language Proficiency Badge */}
                      <div className="mb-4 p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-700">
                          {language.name} Proficiency:
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-800">
                          {langProficiency?.proficiency_level || 'Fluent'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          if (isSelected) removeGuide(guide.id);
                          else addGuide(guide);
                        }}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-primary-600 hover:bg-primary-700 text-white'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Guide Selected</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Inquiry</span>
                          </>
                        )}
                      </button>

                      <Link
                        href={`/guides/${guide.slug}`}
                        className="py-2.5 px-4 rounded-xl text-xs font-bold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 transition-colors"
                      >
                        Profile &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Other Languages */}
        <div className="pt-8 border-t border-stone-200 text-center">
          <p className="text-xs uppercase font-bold tracking-widest text-stone-500 mb-4">
            Browse Other Multilingual Guides
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/guides/french-speaking-guides"
              className="px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:border-primary-500 hover:text-primary-700"
            >
              French Speaking Guides
            </Link>
            <Link
              href="/guides/german-speaking-guides"
              className="px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:border-primary-500 hover:text-primary-700"
            >
              German Speaking Guides
            </Link>
            <Link
              href="/guides/spanish-speaking-guides"
              className="px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:border-primary-500 hover:text-primary-700"
            >
              Spanish Speaking Guides
            </Link>
            <Link
              href="/guides/english-speaking-guides"
              className="px-4 py-2 rounded-xl bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:border-primary-500 hover:text-primary-700"
            >
              English Speaking Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
