import React from 'react';
import { EXPERIENCES_DATA } from '@/lib/mock-data';
import { Sparkles } from 'lucide-react';

export const ExperiencesSection: React.FC = () => {
  return (
    <section className="py-24 bg-luxury-dark text-white relative overflow-hidden">
      {/* Subtle backdrop pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase font-bold tracking-widest text-primary-400 mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary-400" />
            <span>Unrivaled Moments</span>
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Special Travel Experiences
          </h2>
          <p className="text-stone-300 font-sans text-sm sm:text-base leading-relaxed">
            Beyond standard sightseeing: immerse yourself in private encounters with master artisans, palace historians, wildlife naturalists, and spiritual guardians.
          </p>
        </div>

        {/* 4 Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPERIENCES_DATA.map((exp, idx) => (
            <div
              key={idx}
              className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-primary-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${exp.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
