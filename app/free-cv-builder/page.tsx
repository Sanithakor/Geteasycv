import React from 'react';
import type { Metadata } from 'next';
import { SoftwareAppSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import CvBuilderClientContent from '@/components/cv-builder/CvBuilderClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Free Online CV Builder | Create Professional CVs | GetEasyCV',
  description:
    'Build an academic, professional, or international CV online for free. Custom layouts, automatic page numbering, and instant vector PDF download.',
  alternates: {
    canonical: `${baseUrl}/free-cv-builder`,
  },
  openGraph: {
    title: 'Free Online CV Builder | Create Professional CVs | GetEasyCV',
    description: 'Build a recruiter-approved professional CV online for free.',
    url: `${baseUrl}/free-cv-builder`,
  },
};

export default function FreeCvBuilderPage() {
  return (
    <>
      <SoftwareAppSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free CV Builder', url: '/free-cv-builder' },
        ]}
      />
      <CvBuilderClientContent />
    </>
  );
}
