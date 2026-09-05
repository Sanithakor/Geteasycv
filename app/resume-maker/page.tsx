import React from 'react';
import type { Metadata } from 'next';
import { SoftwareAppSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import ResumeBuilderClientContent from '@/components/resume-builder/ResumeBuilderClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Online Resume Maker | Create Job Resumes Online | GetEasyCV',
  description:
    'Easy online resume maker for job seekers. Choose recruiter-tested layouts, write experience bullets with AI, and download high-resolution PDFs.',
  alternates: {
    canonical: `${baseUrl}/resume-maker`,
  },
  openGraph: {
    title: 'Online Resume Maker | Create Job Resumes Online | GetEasyCV',
    description: 'Easy online resume maker with AI bullet generator and PDF download.',
    url: `${baseUrl}/resume-maker`,
  },
};

export default function ResumeMakerPage() {
  return (
    <>
      <SoftwareAppSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Resume Maker', url: '/resume-maker' },
        ]}
      />
      <ResumeBuilderClientContent />
    </>
  );
}
