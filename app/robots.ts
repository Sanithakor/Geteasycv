import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/dashboard', '/my-resumes', '/settings', '/editor', '/profile'],
    },
    sitemap: 'https://geteasycv.com/sitemap.xml',
  };
}
