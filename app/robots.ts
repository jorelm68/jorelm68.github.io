import { MetadataRoute } from 'next';
import { WEBSITE } from '@/lib/constants';

// Add this line to satisfy the static export requirement:
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${WEBSITE}/sitemap.xml`,
  };
}