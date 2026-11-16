import { MetadataRoute } from 'next';
import { VEHICLES_DATA } from '@/lib/mock-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.namastejourneys.com';
  const now = new Date();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/vehicles`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/my-inquiry`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // Vehicle pages
  const vehicleRoutes: MetadataRoute.Sitemap = VEHICLES_DATA.map((v) => ({
    url: `${baseUrl}/vehicles/${v.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...vehicleRoutes];
}
