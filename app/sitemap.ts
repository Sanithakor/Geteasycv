import { MetadataRoute } from 'next';
import { templateCategories } from '@/data/templateCategories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const isExplicitComingSoon = process.env.COMING_SOON_MODE === 'true';

  if (isExplicitComingSoon) {
    return [
      {
        url: `${baseUrl}/coming-soon`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'daily',
        priority: 1.0,
      },
    ];
  }

  const staticRoutes = [
    '',
    '/templates',
    '/ats-checker',
    '/cover-letter',
    '/ai-features',
    '/pricing',
    '/about',
    '/how-it-works',
    '/faq',
    '/help-center',
    '/reviews',
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
    '/refund',
    '/cookie-policy',
  ];

  const categoryRoutes = templateCategories.map((cat) => `/templates?category=${cat.id}`);

  const allRoutes = [...staticRoutes, ...categoryRoutes];
  const currentDate = new Date().toISOString().split('T')[0];

  return allRoutes.map((route) => {
    const isHome = route === '';
    const isCoreTool = route === '/templates' || route === '/ats-checker' || route === '/pricing';

    return {
      url: `${baseUrl}${route}`,
      lastModified: currentDate,
      changeFrequency: isHome || isCoreTool ? 'daily' : 'weekly',
      priority: isHome ? 1.0 : isCoreTool ? 0.9 : 0.7,
    };
  });
}
