import { MetadataRoute } from 'next';
import { WEBSITE } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: WEBSITE,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // If you add a projects page later, add it like this:
    // {
    //   url: `${WEBSITE}/projects`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
  ];
}