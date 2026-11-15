import { Metadata } from 'next';
import { RegionalPageTemplate } from '@/components/regional-page-template';

export const metadata: Metadata = {
  title: 'South India Luxury Tours | Kerala Backwaters, Hampi, Mysore & Tamil Nadu',
  description:
    'Discover South India: private luxury houseboats in Alleppey, aromatic tea plantations of Munnar, UNESCO ruins of Hampi, and Dravidian temple architecture of Madurai.',
};

export default function SouthIndiaPage() {
  return <RegionalPageTemplate regionSlug="south-india" />;
}
