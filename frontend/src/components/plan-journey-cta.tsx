import React from 'react';
import Link from 'next/link';
import { ClipboardList, MessageSquare, ArrowRight } from 'lucide-react';

export const PlanJourneyCTA: React.FC = () => {
  return (
    <section className="py-20 bg-luxury-dark text-white relative overflow-hidden">
      {/* Background imagery with layered gradients */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=80')`, // Indian Palace Architecture
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark via-luxury-dark/95 to-luxury-dark" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs uppercase font-bold tracking-widest text-primary-400 mb-3">
          Your Personal Indian Odyssey Awaits
        </p>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-6">
          Ready to Plan Your Indian Journey?
        </h2>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-300 font-sans leading-relaxed mb-10">
          Select your private chauffeured vehicles and licensed multilingual tour guides. Send one consolidated inquiry and let our team manage every detail with excellence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/my-inquiry"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white font-semibold text-xs tracking-wider uppercase shadow-gold-glow flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <ClipboardList className="w-4 h-4" />
            <span>Review Travel Inquiry</span>
          </Link>

          <a
            href="https://wa.me/919876543210?text=Hello%20Namaste%20Journeys%2C%20I%20would%20like%20to%20inquire%20about%20travel%20services%20in%20India."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat via WhatsApp</span>
          </a>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all"
          >
            <span>General Inquiry Form</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
