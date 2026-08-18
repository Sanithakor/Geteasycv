import { MetadataRoute } from 'next';
import { getSystemSettings } from '@/lib/settings';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

  const settings = await getSystemSettings();
  const isComingSoon = settings.comingSoonMode ?? true;

  if (isComingSoon) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/dashboard/', '/coming-soon'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
