import { Metadata } from 'next';
import { RegionalPageTemplate } from '@/components/regional-page-template';

export const metadata: Metadata = {
  title: 'West India Luxury Tours | Mumbai, Goa, Rann of Kutch & Gir Lions',
  description:
    'Explore West India: vibrant metropolis of Mumbai, Portuguese coastal villas in Goa, the White Salt Desert of Kutch, and tracking wild Asiatic lions in Gir National Park.',
};

export default function WestIndiaPage() {
  return <RegionalPageTemplate regionSlug="west-india" />;
}
