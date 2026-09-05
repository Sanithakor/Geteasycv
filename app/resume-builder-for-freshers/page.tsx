import React from 'react';
import type { Metadata } from 'next';
import { SoftwareAppSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import ResumeBuilderClientContent from '@/components/resume-builder/ResumeBuilderClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Resume Builder for Freshers | Entry-Level Job Resumes | GetEasyCV',
  description:
    'Create an entry-level resume for freshers. Recruiter-approved layouts designed for first job applications, campus placements, and internships.',
  alternates: {
    canonical: `${baseUrl}/resume-builder-for-freshers`,
  },
  openGraph: {
    title: 'Resume Builder for Freshers | Entry-Level Job Resumes | GetEasyCV',
    description: 'Create an entry-level resume for freshers and first-time job seekers.',
    url: `${baseUrl}/resume-builder-for-freshers`,
  },
};

export default function ResumeBuilderForFreshersPage() {
  return (
    <>
      <SoftwareAppSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Resume Builder for Freshers', url: '/resume-builder-for-freshers' },
        ]}
      />
      <ResumeBuilderClientContent />
    </>
  );
}
