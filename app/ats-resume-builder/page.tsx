import React from 'react';
import type { Metadata } from 'next';
import { SoftwareAppSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import ResumeBuilderClientContent from '@/components/resume-builder/ResumeBuilderClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'ATS Resume Builder | Pass Applicant Tracking Systems | GetEasyCV',
  description:
    'Build an ATS-optimized resume engineered to score high on recruiter software scans (Workday, Greenhouse, Lever). Live formatting check and PDF export.',
  alternates: {
    canonical: `${baseUrl}/ats-resume-builder`,
  },
  openGraph: {
    title: 'ATS Resume Builder | Pass Applicant Tracking Systems | GetEasyCV',
    description: 'Build an ATS-optimized resume engineered for recruiter software scans.',
    url: `${baseUrl}/ats-resume-builder`,
  },
};

export default function AtsResumeBuilderPage() {
  return (
    <>
      <SoftwareAppSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'ATS Resume Builder', url: '/ats-resume-builder' },
        ]}
      />
      <ResumeBuilderClientContent />
    </>
  );
}
