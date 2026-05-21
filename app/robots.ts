import { MetadataRoute } from 'next';
import { WEBSITE } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${WEBSITE}/sitemap.xml`,
  };
}