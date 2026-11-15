import { Metadata } from 'next';
import { RegionalPageTemplate } from '@/components/regional-page-template';

export const metadata: Metadata = {
  title: 'North India Tours & Destinations | Rajasthan, Delhi, Agra & Himalayas',
  description:
    'Explore North India with private chauffeured journeys across Delhi, Agra’s Taj Mahal, royal Rajasthan palaces of Jaipur and Udaipur, holy Varanasi, and high Ladakh passes.',
};

export default function NorthIndiaPage() {
  return <RegionalPageTemplate regionSlug="north-india" />;
}
