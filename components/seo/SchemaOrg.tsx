import React from 'react';

/**
 * Global Organization & Website JSON-LD Schema
 */
export function OrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.geteasycv.com';

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GetEasyCV',
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    description: 'GetEasyCV provides professional, ATS-optimized resume builder tools and templates.',
    sameAs: [
      'https://twitter.com/geteasycv',
      'https://linkedin.com/company/geteasycv',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

/**
 * WebApplication / SoftwareApplication JSON-LD Schema for Homepage & Resume Tools
 */
export function SoftwareAppSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.geteasycv.com';

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'GetEasyCV Resume Builder',
    operatingSystem: 'All (Web Browser)',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
    url: baseUrl,
    description: 'Online ATS-friendly resume builder and CV maker with live PDF export.',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

/**
 * Article JSON-LD Schema for Blog Posts
 */
export function ArticleSchema({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  authorName,
}: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished?: string;
  authorName?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.geteasycv.com';

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: url.startsWith('http') ? url : `${baseUrl}${url}`,
    image: imageUrl || `${baseUrl}/images/templates/modern_professional.png`,
    datePublished: datePublished || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: authorName || 'GetEasyCV Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GetEasyCV',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.svg`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

/**
 * FAQPage JSON-LD Schema (Triggers Google FAQ Rich Snippets in SERPs)
 */
export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (!faqs || faqs.length === 0) return null;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

/**
 * BreadcrumbList JSON-LD Schema
 */
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.geteasycv.com';

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
