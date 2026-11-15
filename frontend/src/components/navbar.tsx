'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu, X, MessageSquare, ClipboardList } from 'lucide-react';
import { useInquiry } from '@/lib/inquiry-context';
import { CurrencySelector } from './currency-selector';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalSelectedCount, generateWhatsAppLink } = useInquiry();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Tourist Vehicles', href: '/vehicles' },
    { label: 'Tour Guides', href: '/guides' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ];

  // Homepage starts with a full dark hero banner, so it can start transparent.
  // Other pages have solid background for high contrast & full visibility.
  const isSolid = isScrolled || pathname !== '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid
          ? 'bg-[#0A0F1D] py-3 shadow-luxury border-b border-white/10'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
      style={isSolid ? { backgroundColor: '#0A0F1D' } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center text-white shadow-gold-glow">
              <Compass className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" />
            </div>
            <div>
              <span className="font-serif tracking-widest text-lg md:text-xl font-bold text-white uppercase block">
                Namaste Journeys
              </span>
              <span className="text-[10px] tracking-widest text-primary-300 uppercase block font-sans">
                Chauffeured Vehicles & Tour Guides
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2 text-sm tracking-wide font-medium transition-colors rounded-lg ${
                    isActive
                      ? 'text-primary-400 font-semibold bg-white/10'
                      : 'text-stone-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls: Currency, My Inquiry, WhatsApp, CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Currency Selector */}
            <CurrencySelector />

            {/* My Inquiry button with badge counter */}
            <Link
              href="/my-inquiry"
              className="relative px-3 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center gap-1.5 transition-all"
            >
              <ClipboardList className="w-3.5 h-3.5 text-primary-300" />
              <span>My Inquiry</span>
              {totalSelectedCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center -mr-1">
                  {totalSelectedCount}
                </span>
              )}
            </Link>

            {/* WhatsApp Quick Inquiry */}
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Inquiry"
              className="p-2 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white transition-all shadow-sm flex items-center justify-center"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            {/* Enquire Now CTA */}
            <Link
              href="/my-inquiry"
              className="px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-lg bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white shadow-luxury transition-all"
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile Menu & Action Buttons */}
          <div className="flex items-center space-x-2 lg:hidden">
            <CurrencySelector />

            <Link
              href="/my-inquiry"
              className="relative p-2 rounded-lg bg-white/10 text-white border border-white/15"
              aria-label="My Travel Inquiry Selection"
            >
              <ClipboardList className="w-4 h-4 text-primary-300" />
              {totalSelectedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {totalSelectedCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden bg-[#0A0F1D] border-b border-stone-700/80 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl animate-in slide-in-from-top duration-300"
          style={{ backgroundColor: '#0A0F1D' }}
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                  pathname === link.href ? 'text-primary-400 bg-white/5 font-semibold' : 'text-stone-200 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/my-inquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-primary-500 to-primary-700 text-white uppercase tracking-wider"
            >
              Review Inquiry {totalSelectedCount > 0 ? `(${totalSelectedCount} Selected)` : ''}
            </Link>
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 text-sm font-semibold rounded-lg bg-emerald-600 text-white flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Inquiry
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
