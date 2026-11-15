import type { Metadata } from 'next';
import './globals.css';
import { CurrencyProvider } from '@/lib/currency';
import { TripProvider } from '@/lib/trip-context';
import { ComparisonProvider } from '@/lib/comparison-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { WhatsAppFloatingButton } from '@/components/whatsapp-button';

export const metadata: Metadata = {
  title: 'Namaste Journeys | Discover the Extraordinary India | Luxury Tours & Itineraries',
  description:
    'Bespoke, private, luxury journeys across India for international travelers. Explore royal palaces of Rajasthan, backwaters of Kerala, spiritual ghats of Varanasi, and Himalayan high passes.',
  keywords: [
    'India luxury tours',
    'Golden triangle tour',
    'Rajasthan heritage palaces',
    'Kerala backwaters private houseboat',
    'Bespoke India travel agency',
    'India private chauffeur tour',
  ],
  authors: [{ name: 'Namaste Journeys' }],
  metadataBase: new URL('https://www.namastejourneys.com'),
  openGraph: {
    title: 'Discover the Extraordinary India | Namaste Journeys',
    description:
      'Curated private expeditions, heritage palace stays, and authentic cultural journeys across North, South, East, and West India.',
    siteName: 'Namaste Journeys',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-primary-500 selection:text-white">
        <CurrencyProvider>
          <TripProvider>
            <ComparisonProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <WhatsAppFloatingButton />
            </ComparisonProvider>
          </TripProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
