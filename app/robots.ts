import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

  let isComingSoon = true;
  try {
    const config = await (prisma.systemConfig as any).findUnique({ where: { id: 'system' } });
    if (config && config.comingSoonMode === false) {
      isComingSoon = false;
    }
  } catch (err) {
    // Default to safe pre-launch robots rule
  }

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
