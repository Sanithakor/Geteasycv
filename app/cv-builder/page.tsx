import React from 'react';
import type { Metadata } from 'next';
import { SoftwareAppSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import CvBuilderClientContent from '@/components/cv-builder/CvBuilderClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Free Online CV Builder | Professional Curriculum Vitae Maker | GetEasyCV',
  description:
    'Create an international academic, medical, or executive Curriculum Vitae online in minutes. Multi-page pagination, Europass compliance, ATS layout checks, and vector PDF downloads.',
  alternates: {
    canonical: `${baseUrl}/cv-builder`,
  },
  openGraph: {
    title: 'Free Online CV Builder | Professional Curriculum Vitae Maker | GetEasyCV',
    description: 'Create an international academic and executive CV online with ATS-tested templates.',
    url: `${baseUrl}/cv-builder`,
  },
};

const CV_BUILDER_FAQS = [
  {
    question: 'What is the difference between a CV and a Resume?',
    answer:
      'A Curriculum Vitae (CV) provides a comprehensive overview of your complete career, education, and credentials (often multi-page), whereas a Resume is a concise 1-2 page summary tailored to a specific job role.',
  },
  {
    question: 'Can I build a multi-page CV with GetEasyCV?',
    answer:
      'Yes, GetEasyCV automatically handles pagination, font scaling, and page breaks to keep your multi-page CV clean and readable across PDF exports.',
  },
];

export default function CvBuilderLandingPage() {
  return (
    <>
      <SoftwareAppSchema />
      <FAQSchema faqs={CV_BUILDER_FAQS} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'CV Builder', url: '/cv-builder' },
        ]}
      />
      <CvBuilderClientContent />
    </>
  );
}
