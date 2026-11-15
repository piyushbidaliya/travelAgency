'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Award, Globe, Star, ShieldCheck, Check, Plus, ArrowRight } from 'lucide-react';
import { GUIDES_DATA } from '@/lib/mock-data';
import { useInquiry } from '@/lib/inquiry-context';
import { Guide } from '@/lib/types';

export const GuidesPreview: React.FC = () => {
  const { inquiry, addGuide, removeGuide } = useInquiry();

  const previewGuides = GUIDES_DATA.filter((g) => g.is_featured).slice(0, 3);

  const isGuideSelected = (guideId: number) => {
    return inquiry.guides.some((g) => g.id === guideId);
  };

  const handleToggleGuide = (guide: Guide) => {
    if (isGuideSelected(guide.id)) {
      removeGuide(guide.id);
    } else {
      addGuide(guide);
    }
  };

  return (
    <section className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wider uppercase mb-3 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Government-Approved & Multilingual</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Licensed Professional Tour Guides
            </h2>
            <p className="mt-3 text-stone-600 max-w-2xl text-sm sm:text-base leading-relaxed">
              Experience the depth of India through certified regional historians and naturalists fluent in French, German, Spanish, Japanese, and English. No hurried lectures — only deep, authentic storytelling.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end gap-2">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 group"
            >
              <span>Explore All Licensed Guides</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
              <Link href="/guides/french-speaking-guides" className="hover:text-primary-700 underline">
                French Guides
              </Link>
              <span>&bull;</span>
              <Link href="/guides/german-speaking-guides" className="hover:text-primary-700 underline">
                German Guides
              </Link>
              <span>&bull;</span>
              <Link href="/guides/spanish-speaking-guides" className="hover:text-primary-700 underline">
                Spanish Guides
              </Link>
            </div>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewGuides.map((guide) => {
            const isSelected = isGuideSelected(guide.id);
            return (
              <div
                key={guide.id}
                className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image and Badges */}
                <div className="relative h-64 w-full overflow-hidden bg-stone-200">
                  <Image
                    src={guide.profile_photo}
                    alt={guide.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-stone-900/85 backdrop-blur-md text-[11px] font-semibold text-white flex items-center gap-1">
                      <Award className="w-3 h-3 text-primary-400" />
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

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900 mb-1 group-hover:text-primary-700 transition-colors">
                      {guide.name}
                    </h3>
                    <p className="text-xs text-primary-700 font-semibold mb-3">
                      {guide.years_of_experience} Years Experience &bull; Based in {guide.primary_city}, {guide.state}
                    </p>
                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                      {guide.bio}
                    </p>

                    {/* Languages Spoken Chips */}
                    <div className="mb-4">
                      <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-stone-400" />
                        <span>Languages Fluent</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {guide.languages.map((l) => (
                          <span
                            key={l.id}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-white border border-stone-200 text-stone-700"
                          >
                            {l.language_name} ({l.proficiency_level})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-2">
                    <Link
                      href={`/guides/${guide.slug}`}
                      className="text-xs font-semibold text-stone-600 hover:text-stone-900"
                    >
                      Guide Profile &rarr;
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleToggleGuide(guide)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
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
