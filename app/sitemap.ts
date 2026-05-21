import { MetadataRoute } from 'next';
import { WEBSITE } from '@/lib/constants';

// Add this line here as well:
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: WEBSITE,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}