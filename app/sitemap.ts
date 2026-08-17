import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

  let isComingSoon = true;
  // Guard Prisma call at build time if DATABASE_URL is not set
  if (process.env.DATABASE_URL) {
    try {
      const config = await (prisma.systemConfig as any).findUnique({ where: { id: 'system' } });
      if (config && config.comingSoonMode === false) {
        isComingSoon = false;
      }
    } catch (err) {
      // Default pre-launch state
    }
  }

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
    '/resume-examples',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '' || route === '/templates' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/templates' || route === '/pricing' ? 0.9 : 0.7,
  }));
}
