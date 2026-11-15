'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Guide, GuideCategory, Language } from '@/lib/types';
import { useInquiry } from '@/lib/inquiry-context';
import {
  Users,
  Award,
  Globe,
  Star,
  Search,
  Check,
  Plus,
  ShieldCheck,
  Filter,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface GuidesClientProps {
  categories: GuideCategory[];
  languages: Language[];
  guides: Guide[];
}

export const GuidesClient: React.FC<GuidesClientProps> = ({
  categories,
  languages,
  guides,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { inquiry, addGuide, removeGuide } = useInquiry();

  const isGuideSelected = (guideId: number) => inquiry.guides.some((g) => g.id === guideId);

  // Filter guides
  const filteredGuides = useMemo(() => {
    return guides.filter((g) => {
      // Category filter
      if (selectedCategory !== 'all' && g.category_slug !== selectedCategory) {
        return false;
      }

      // Language filter
      if (selectedLanguage !== 'all') {
        const speaks = g.languages.some(
          (l) => l.language_code.toLowerCase() === selectedLanguage.toLowerCase() ||
                 l.language_name.toLowerCase() === selectedLanguage.toLowerCase()
        );
        if (!speaks) return false;
      }

      // Experience filter
      if (selectedExperience !== 'all') {
        if (selectedExperience === '3-5' && (g.years_of_experience < 3 || g.years_of_experience > 5)) return false;
        if (selectedExperience === '5-10' && (g.years_of_experience < 5 || g.years_of_experience > 10)) return false;
        if (selectedExperience === '10+' && g.years_of_experience < 10) return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = g.name.toLowerCase().includes(query);
        const matchesCity = g.primary_city.toLowerCase().includes(query);
        const matchesState = g.state.toLowerCase().includes(query);
        const matchesBio = g.bio.toLowerCase().includes(query);
        if (!matchesName && !matchesCity && !matchesState && !matchesBio) {
          return false;
        }
      }

      return true;
    });
  }, [guides, selectedCategory, selectedLanguage, selectedExperience, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Quick Language Portals Banner */}
      <div className="mb-10 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-primary-600 block mb-1">
            Multilingual Specialist Directories
          </span>
          <h2 className="font-serif text-lg font-bold text-stone-900">
            Dedicated Language Guides for International Guests
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/guides/french-speaking-guides"
            className="px-3.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-800 transition-colors"
          >
            French Guides &rarr;
          </Link>
          <Link
            href="/guides/german-speaking-guides"
            className="px-3.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-800 transition-colors"
          >
            German Guides &rarr;
          </Link>
          <Link
            href="/guides/spanish-speaking-guides"
            className="px-3.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-800 transition-colors"
          >
            Spanish Guides &rarr;
          </Link>
          <Link
            href="/guides/english-speaking-guides"
            className="px-3.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-800 transition-colors"
          >
            English Guides &rarr;
          </Link>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm mb-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by guide name, city, or topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5]"
            />
          </div>

          {/* Language Select */}
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-stone-400 flex-shrink-0" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5]"
            >
              <option value="all">All Languages</option>
              {languages.map((l) => (
                <option key={l.id} value={l.code}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Select */}
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-stone-400 flex-shrink-0" />
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-[#FAF8F5]"
            >
              <option value="all">Any Experience Level</option>
              <option value="3-5">3 to 5 Years Experience</option>
              <option value="5-10">5 to 10 Years Experience</option>
              <option value="10+">10+ Years (Senior Historians)</option>
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
            All Specializations ({guides.length})
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

      {/* Guide Roster Grid */}
      {filteredGuides.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8">
          <Users className="w-12 h-12 text-stone-400 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
            No tour guides found for your criteria
          </h3>
          <p className="text-sm text-stone-500 mb-6">
            Try choosing a different language or clearing your filters.
          </p>
          <button
            onClick={() => {
              setSelectedLanguage('all');
              setSelectedCategory('all');
              setSelectedExperience('all');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide) => {
            const isSelected = isGuideSelected(guide.id);
            return (
              <div
                key={guide.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Photo & Licensing Badges */}
                <div className="relative h-64 w-full overflow-hidden bg-stone-200">
                  <Image
                    src={guide.profile_photo}
                    alt={guide.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
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

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900 mb-1 group-hover:text-primary-700 transition-colors">
                      <Link href={`/guides/${guide.slug}`}>{guide.name}</Link>
                    </h3>
                    <p className="text-xs text-primary-700 font-semibold mb-3">
                      {guide.years_of_experience} Years Experience &bull; Based in {guide.primary_city}, {guide.state}
                    </p>
                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                      {guide.bio}
                    </p>

                    {/* Languages Spoken Badges */}
                    <div className="mb-6">
                      <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-stone-400" />
                        <span>Languages Fluent</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {guide.languages.map((l) => (
                          <span
                            key={l.id}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-stone-100 border border-stone-200 text-stone-700"
                          >
                            {l.language_name} ({l.proficiency_level})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions: Add to Inquiry & View Bio */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          removeGuide(guide.id);
                        } else {
                          addGuide(guide);
                        }
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
      )}
    </div>
  );
};
