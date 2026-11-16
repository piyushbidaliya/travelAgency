import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-luxury-dark text-white px-4 py-24">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-primary-600/30 text-primary-400 flex items-center justify-center mx-auto mb-6">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-5xl font-bold mb-3">404</h1>
        <h2 className="font-serif text-2xl font-bold text-primary-300 mb-4">
          Journey Off the Beaten Track
        </h2>
        <p className="text-sm text-stone-300 mb-8 leading-relaxed">
          The page or travel route you are looking for does not exist or has moved. Return to explore our chauffeured fleet.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
