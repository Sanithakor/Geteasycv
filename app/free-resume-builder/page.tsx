import React from 'react';
import type { Metadata } from 'next';
import { SoftwareAppSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import ResumeBuilderClientContent from '@/components/resume-builder/ResumeBuilderClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: '100% Free Online Resume Builder | PDF Export | GetEasyCV',
  description:
    'Build a professional ATS resume for free. Pick from recruiter-tested layouts, customize sections, and download your resume instantly without hidden fees.',
  alternates: {
    canonical: `${baseUrl}/free-resume-builder`,
  },
  openGraph: {
    title: '100% Free Online Resume Builder | PDF Export | GetEasyCV',
    description: 'Build a recruiter-approved resume for free with ATS templates and instant download.',
    url: `${baseUrl}/free-resume-builder`,
  },
};

export default function FreeResumeBuilderPage() {
  return (
    <>
      <SoftwareAppSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Resume Builder', url: '/free-resume-builder' },
        ]}
      />
      <ResumeBuilderClientContent />
    </>
  );
}
