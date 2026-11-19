import { MetadataRoute } from 'next';
import { WEBSITE } from '@/lib/constants';

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: WEBSITE,
    },
  ];
}