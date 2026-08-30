import { MetadataRoute } from 'next';
import { INITIAL_BLOG_POSTS } from '@/lib/blogData';
import { RESUME_EXAMPLES } from '@/data/resumeExamplesData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';
  const staticReleaseDate = '2026-08-29';

  const staticRoutes = [
    { route: '', priority: 1.0, changeFrequency: 'daily' as const },
    { route: '/free-resume-builder', priority: 1.0, changeFrequency: 'daily' as const },
    { route: '/free-cv-builder', priority: 1.0, changeFrequency: 'daily' as const },
    { route: '/ats-resume-builder', priority: 1.0, changeFrequency: 'daily' as const },
    { route: '/resume-maker', priority: 1.0, changeFrequency: 'daily' as const },
    { route: '/resume-builder-for-students', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/resume-builder-for-freshers', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/resume-builder', priority: 1.0, changeFrequency: 'daily' as const },
    { route: '/cv-builder', priority: 1.0, changeFrequency: 'daily' as const },
    { route: '/templates', priority: 0.9, changeFrequency: 'daily' as const },
    { route: '/ats-checker', priority: 0.9, changeFrequency: 'daily' as const },
    { route: '/resume-examples', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/cover-letter', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/ai-features', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: '/pricing', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/tools/job-description-matcher', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/tools/resume-summary-generator', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { route: '/how-it-works', priority: 0.7, changeFrequency: 'monthly' as const },
    { route: '/faq', priority: 0.7, changeFrequency: 'weekly' as const },
    { route: '/help-center', priority: 0.6, changeFrequency: 'monthly' as const },
    { route: '/reviews', priority: 0.7, changeFrequency: 'weekly' as const },
    { route: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
    { route: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { route: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { route: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { route: '/refund', priority: 0.3, changeFrequency: 'yearly' as const },
    { route: '/cookie-policy', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: staticReleaseDate,
    changeFrequency,
    priority,
  }));

  // Dynamic Resume Examples Entries
  const exampleEntries: MetadataRoute.Sitemap = RESUME_EXAMPLES.map((example) => ({
    url: `${baseUrl}/resume-examples/${example.slug}`,
    lastModified: staticReleaseDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Dynamic Blog Post Entries
  const publishedBlogPosts = INITIAL_BLOG_POSTS.filter((post) => post.status === 'published');
  const blogEntries: MetadataRoute.Sitemap = publishedBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date || staticReleaseDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticEntries, ...exampleEntries, ...blogEntries];
}
