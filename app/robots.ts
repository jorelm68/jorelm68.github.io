import { MetadataRoute } from 'next';
import { WEBSITE } from '@/lib/constants';

// Required for static export:
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: new URL("/sitemap.xml", WEBSITE).toString(),
  };
}