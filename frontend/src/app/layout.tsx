import type { Metadata } from 'next';
import './globals.css';
import { CurrencyProvider } from '@/lib/currency';
import { InquiryProvider } from '@/lib/inquiry-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { WhatsAppFloatingButton } from '@/components/whatsapp-button';
import { EmailFloatingButton } from '@/components/email-button';

export const metadata: Metadata = {
  title: 'Namaste Journeys | Discover the Extraordinary India | Chauffeured Tourist Vehicles',
  description:
    'Private travel services across India for international visitors. Chauffeured tourist vehicles (sedans, SUVs, luxury cars, tempo travellers) with professional English-speaking chauffeurs across North, South, East, and West India.',
  keywords: [
    'India private tourist driver and car',
    'India chauffeured tourist vehicles',
    'Chauffeured Innova hire India',
    'Luxury tempo traveller rental India',
    'Custom India travel inquiry',
    'Private car hire India with driver',
  ],
  authors: [{ name: 'Namaste Journeys' }],
  metadataBase: new URL('https://www.namastejourneys.com'),
  openGraph: {
    title: 'Discover the Extraordinary India | Namaste Journeys',
    description:
      'Curated private travel services and chauffeured tourist vehicles across India.',
    siteName: 'Namaste Journeys',
    locale: 'en_US',
    type: 'website',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Namaste Journeys',
  image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da',
  '@id': 'https://www.namastejourneys.com',
  url: 'https://www.namastejourneys.com',
  telephone: '+91-11-23456789',
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Connaught Place, Barakhamba Road',
    addressLocality: 'New Delhi',
    postalCode: '110001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.6304,
    longitude: 77.2177,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '08:00',
    closes: '22:00',
  },
  sameAs: ['https://wa.me/919876543210'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-primary-500 selection:text-white">
        <CurrencyProvider>
          <InquiryProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <EmailFloatingButton />
            <WhatsAppFloatingButton />
          </InquiryProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
