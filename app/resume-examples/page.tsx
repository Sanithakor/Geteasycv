import React from 'react';
import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import ResumeExamplesClientContent from '@/components/resume-examples/ResumeExamplesClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Resume Examples & Industry Writing Guides | GetEasyCV',
  description:
    'Browse recruiter-approved resume examples, sample bullet points, and ATS formatting guides tailored for software engineers, nurses, project managers, and students.',
  alternates: {
    canonical: `${baseUrl}/resume-examples`,
  },
  openGraph: {
    title: 'Resume Examples & Industry Writing Guides | GetEasyCV',
    description: 'Browse recruiter-approved resume examples and ATS writing guides.',
    url: `${baseUrl}/resume-examples`,
  },
};

export default function ResumeExamplesIndexPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Resume Examples', url: '/resume-examples' },
        ]}
      />
      <ResumeExamplesClientContent />
    </>
  );
}
