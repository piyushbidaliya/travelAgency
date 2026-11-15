import React from 'react';
import Link from 'next/link';
import { Compass, Phone, Mail, MapPin, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-luxury-dark text-stone-300 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center text-white shadow-gold-glow">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif tracking-widest text-xl font-bold text-white uppercase block">
                  Namaste Journeys
                </span>
                <span className="text-[10px] tracking-widest text-primary-300 uppercase block font-sans">
                  Extraordinary India
                </span>
              </div>
            </Link>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm font-sans">
              Dedicated to crafting bespoke, private, and highly authentic journeys across India for discerning international travelers. Experience majestic palaces, sacred traditions, pristine backwaters, and untamed wilderness with private chauffeured luxury.
            </p>

            <div className="pt-2 flex items-center gap-4 text-stone-400 text-sm">
              <span className="flex items-center gap-1.5 text-xs text-primary-300">
                <ShieldCheck className="w-4 h-4 text-primary-400" />
                Verified Local Chauffeurs & Historians
              </span>
            </div>
          </div>

          {/* Regional Destinations */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-white mb-4 border-b border-white/10 pb-2">
              Regions of India
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/destinations/north-india" className="hover:text-primary-400 transition-colors">
                  North India (Rajasthan & Delhi)
                </Link>
              </li>
              <li>
                <Link href="/destinations/south-india" className="hover:text-primary-400 transition-colors">
                  South India (Kerala & Hampi)
                </Link>
              </li>
              <li>
                <Link href="/destinations/east-india" className="hover:text-primary-400 transition-colors">
                  East India (Sikkim & Kolkata)
                </Link>
              </li>
              <li>
                <Link href="/destinations/west-india" className="hover:text-primary-400 transition-colors">
                  West India (Goa, Mumbai & Kutch)
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-primary-400 hover:text-primary-300 font-medium">
                  All 50+ Destinations &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-white mb-4 border-b border-white/10 pb-2">
              Explore Journeys
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/packages" className="hover:text-primary-400 transition-colors">
                  Curated Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/itineraries" className="hover:text-primary-400 transition-colors">
                  Recommended Itineraries
                </Link>
              </li>
              <li>
                <Link href="/my-trip" className="hover:text-primary-400 transition-colors text-primary-400 font-semibold">
                  Build Your Own Trip
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">
                  About Our Company
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition-colors">
                  Contact Our Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-white mb-4 border-b border-white/10 pb-2">
              Travel Concierge
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-stone-400">Connaught Place, New Delhi, India 110001</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="tel:+911123456789" className="text-xs hover:text-white transition-colors">
                  +91 11 2345 6789
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:underline"
                >
                  WhatsApp: +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="mailto:inquiries@indiatourtravel.com" className="text-xs hover:text-white transition-colors">
                  inquiries@indiatourtravel.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Currency & Financial Clarification Notice */}
        <div className="py-6 border-b border-white/10 text-xs text-stone-400 leading-relaxed">
          <p>
            <strong>Financial Notice:</strong> All package prices are primarily established in Indian Rupees (INR). Converted prices shown in USD ($), EUR (€), and GBP (£) are indicative estimates calculated via live exchange rates. Final quotations are subject to mutual confirmation upon itinerary finalization.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Namaste Journeys. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Booking Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
