import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

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
