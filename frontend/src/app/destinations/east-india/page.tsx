import { Metadata } from 'next';
import { RegionalPageTemplate } from '@/components/regional-page-template';

export const metadata: Metadata = {
  title: 'East & North-East India Tours | Darjeeling, Sikkim, Meghalaya & Kaziranga',
  description:
    'Experience East and North-East India: colonial Kolkata, organic tea slopes of Darjeeling facing Kanchenjunga, living root bridges of Meghalaya, and one-horned rhinos in Kaziranga.',
};

export default function EastIndiaPage() {
  return <RegionalPageTemplate regionSlug="east-india" />;
}
