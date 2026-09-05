import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const isExplicitComingSoon = process.env.COMING_SOON_MODE === 'true';

  if (isExplicitComingSoon) {
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
      disallow: [
        '/admin/',
        '/api/',
        '/dashboard/',
        '/editor/',
        '/my-resumes/',
        '/settings/',
        '/profile/',
        '/subscription/',
        '/billing/',
        '/coming-soon',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
