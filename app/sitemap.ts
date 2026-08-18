import { MetadataRoute } from 'next';
import { getSystemSettings } from '@/lib/settings';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

  const settings = await getSystemSettings();
  const isComingSoon = settings.comingSoonMode ?? true;

  if (isComingSoon) {
    return [
      {
        url: `${baseUrl}/coming-soon`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'daily',
        priority: 1.0,
      },
    ];
  }

  const routes = [
    '',
    '/templates',
    '/pricing',
    '/about',
    '/blog',
    '/contact',
    '/faq',
    '/ats-checker',
    '/cover-letter',
    '/privacy',
    '/terms',
    '/refund',
    '/cookie-policy',
    '/help-center',
    '/reviews',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '' || route === '/templates' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/templates' || route === '/pricing' ? 0.9 : 0.7,
  }));
}
