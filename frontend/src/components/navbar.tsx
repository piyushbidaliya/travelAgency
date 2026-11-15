'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu, X, ChevronDown, MessageSquare, Briefcase } from 'lucide-react';
import { useTrip } from '@/lib/trip-context';
import { CurrencySelector } from './currency-selector';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const pathname = usePathname();
  const { totalSelectedCount } = useTrip();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDestinationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDestinationsOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    {
      label: 'Destinations',
      href: '/destinations',
      hasDropdown: true,
      subItems: [
        { label: 'North India', desc: 'Delhi, Agra, Rajasthan & Himalayas', href: '/destinations/north-india' },
        { label: 'South India', desc: 'Kerala, Hampi, Mysore & Tamil Nadu', href: '/destinations/south-india' },
        { label: 'East India', desc: 'Kolkata, Sikkim, Darjeeling & Assam', href: '/destinations/east-india' },
        { label: 'West India', desc: 'Mumbai, Goa, Gujarat & Gir', href: '/destinations/west-india' },
      ],
    },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ];

  // Homepage starts with a full dark hero banner, so it can start transparent.
  // Other pages (e.g. /destinations, destination detail pages, etc.) have light backgrounds,
  // so navbar must always have a solid dark background for high contrast & full visibility.
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
                Extraordinary India
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              if (link.hasDropdown) {
                const isDestinationsActive = pathname.startsWith('/destinations');
                return (
                  <div
                    key={link.label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setDestinationsOpen(true)}
                    onMouseLeave={() => setDestinationsOpen(false)}
                  >
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setDestinationsOpen((prev) => !prev);
                        }}
                        className={`px-3 py-2 text-sm tracking-wide font-medium flex items-center gap-1.5 transition-colors rounded-lg cursor-pointer ${
                          isDestinationsActive
                            ? 'text-primary-400 font-semibold bg-white/10'
                            : destinationsOpen
                            ? 'text-white bg-white/10'
                            : 'text-stone-200 hover:text-white hover:bg-white/5'
                        }`}
                        aria-expanded={destinationsOpen}
                        aria-haspopup="true"
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            destinationsOpen ? 'rotate-180 text-primary-400' : 'text-stone-400'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Regional Dropdown Menu with bridging padding to prevent hover gap */}
                    {destinationsOpen && (
                      <div className="absolute left-0 top-full pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div
                          className="rounded-xl bg-[#0A0F1D] border border-stone-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)] py-3 px-2 ring-1 ring-white/10"
                          style={{ backgroundColor: '#0A0F1D' }}
                        >
                          <div className="px-3 py-2 border-b border-white/10 mb-1 flex items-center justify-between">
                            <p className="text-[11px] font-semibold text-primary-400 uppercase tracking-wider">
                              Explore Regions of India
                            </p>
                            <Compass className="w-3.5 h-3.5 text-primary-400/80" />
                          </div>
                          {link.subItems?.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setDestinationsOpen(false)}
                              className="block px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors group/sub"
                            >
                              <div className="text-sm font-medium text-white group-hover/sub:text-primary-300 flex items-center justify-between">
                                <span>{sub.label}</span>
                                <span className="text-xs text-primary-400 opacity-0 group-hover/sub:opacity-100 transition-opacity">
                                  &rarr;
                                </span>
                              </div>
                              <div className="text-xs text-stone-400 font-sans mt-0.5">
                                {sub.desc}
                              </div>
                            </Link>
                          ))}
                          <div className="mt-2 pt-2 border-t border-white/10 px-3">
                            <Link
                              href="/destinations"
                              onClick={() => setDestinationsOpen(false)}
                              className="text-xs font-semibold text-primary-400 hover:text-primary-300 flex items-center justify-between group/all"
                            >
                              <span>View All Indian Destinations</span>
                              <span className="group-hover/all:translate-x-1 transition-transform">&rarr;</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

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

          {/* Right Action Controls: Currency, My Trip, WhatsApp, CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Currency Selector */}
            <CurrencySelector />

            {/* My Trip button with badge counter */}
            <Link
              href="/my-trip"
              className="relative px-3 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center gap-1.5 transition-all"
            >
              <Briefcase className="w-3.5 h-3.5 text-primary-300" />
              <span>My Trip</span>
              {totalSelectedCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center -mr-1">
                  {totalSelectedCount}
                </span>
              )}
            </Link>

            {/* WhatsApp Quick Inquiry */}
            <a
              href="https://wa.me/919876543210?text=Hello%20Namaste%20Journeys%2C%20I%20would%20like%20to%20plan%20a%20luxury%20tour%20to%20India."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Inquiry"
              className="p-2 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white transition-all shadow-sm flex items-center justify-center"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            {/* Plan Your Trip CTA */}
            <Link
              href="/my-trip"
              className="px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-lg bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white shadow-luxury transition-all"
            >
              Plan Your Trip
            </Link>
          </div>

          {/* Mobile Menu & Action Buttons */}
          <div className="flex items-center space-x-2 lg:hidden">
            <CurrencySelector />

            <Link
              href="/my-trip"
              className="relative p-2 rounded-lg bg-white/10 text-white border border-white/15"
              aria-label="My Trip Selection"
            >
              <Briefcase className="w-4 h-4 text-primary-300" />
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
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                    pathname === link.href ? 'text-primary-400 bg-white/5 font-semibold' : 'text-stone-200 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
                {link.hasDropdown && (
                  <div className="pl-6 space-y-1 mt-1 border-l-2 border-primary-500/30 ml-3">
                    {link.subItems?.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 text-sm text-stone-400 hover:text-white"
                      >
                        {sub.label}
                      </Link>
                    ))}
                    <Link
                      href="/destinations"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300"
                    >
                      View All Destinations &rarr;
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/my-trip"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-primary-500 to-primary-700 text-white uppercase tracking-wider"
            >
              Plan Your Trip {totalSelectedCount > 0 ? `(${totalSelectedCount} Selected)` : ''}
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hello%20Namaste%20Journeys%2C%20I%20would%20like%20to%20plan%20a%20luxury%20tour%20to%20India."
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
