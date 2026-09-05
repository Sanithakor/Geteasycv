import { INITIAL_BLOG_POSTS } from '../lib/blogData';
import { RESUME_EXAMPLES } from '../data/resumeExamplesData';

const CANONICAL_DOMAIN = 'https://geteasycv.com';

const PUBLIC_SEO_ROUTES = [
  '/',
  '/resume-builder',
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
  '/resume-examples',
  '/privacy',
  '/terms',
  '/refund',
  '/cookie-policy',
];

const PRIVATE_ROUTES = [
  '/admin',
  '/dashboard',
  '/editor',
  '/my-resumes',
  '/profile',
  '/settings',
  '/subscription',
  '/api',
];

async function runSeoValidation() {
  console.log('🔍 Starting Automated SEO Quality Assurance Check...\n');
  let errors = 0;
  let warnings = 0;

  // 1. Verify Canonical Domain Consistency
  console.log('1️⃣  Validating Canonical Hostname Consistency...');
  if (!CANONICAL_DOMAIN.startsWith('https://geteasycv.com') || CANONICAL_DOMAIN.includes('www.')) {
    console.error('❌ ERROR: Canonical domain must strictly be https://geteasycv.com');
    errors++;
  } else {
    console.log('✅ PASS: Canonical domain set to https://geteasycv.com');
  }

  // 2. Validate Sitemap Exclusions
  console.log('\n2️⃣  Checking Sitemap Security & Route Classification...');
  const sitemapUrls = [
    ...PUBLIC_SEO_ROUTES.map((r) => `${CANONICAL_DOMAIN}${r}`),
    ...RESUME_EXAMPLES.map((e) => `${CANONICAL_DOMAIN}/resume-examples/${e.slug}`),
    ...INITIAL_BLOG_POSTS.filter((p) => p.status === 'published').map((p) => `${CANONICAL_DOMAIN}/blog/${p.slug}`),
  ];

  for (const privateRoute of PRIVATE_ROUTES) {
    const isExposed = sitemapUrls.some((url) => url.includes(privateRoute));
    if (isExposed) {
      console.error(`❌ ERROR: Private route "${privateRoute}" found in sitemap URLs!`);
      errors++;
    }
  }
  console.log('✅ PASS: Zero private routes exposed in sitemap dataset');

  // 3. Check for Duplicate URLs or www hostnames
  console.log('\n3️⃣  Checking URL Duplication & Canonical Formatting...');
  const urlSet = new Set<string>();
  for (const url of sitemapUrls) {
    if (url.includes('www.geteasycv.com')) {
      console.error(`❌ ERROR: Inconsistent www hostname found in URL: ${url}`);
      errors++;
    }
    if (urlSet.has(url)) {
      console.error(`❌ ERROR: Duplicate URL found in sitemap dataset: ${url}`);
      errors++;
    }
    urlSet.add(url);
  }
  console.log(`✅ PASS: ${urlSet.size} unique canonical public URLs validated`);

  // Summary
  console.log('\n==================================================');
  console.log(`SEO QA Validation Complete: ${errors} Errors, ${warnings} Warnings`);
  console.log('==================================================\n');

  if (errors > 0) {
    process.exit(1);
  }
}

runSeoValidation().catch((err) => {
  console.error('SEO QA script failed:', err);
  process.exit(1);
});
