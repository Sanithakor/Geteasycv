import React from 'react';
import type { Metadata } from 'next';
import { SoftwareAppSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import ResumeBuilderClientContent from '@/components/resume-builder/ResumeBuilderClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Resume Builder for Students | College & High School | GetEasyCV',
  description:
    'Build a student resume with no work experience. Highlight academic projects, coursework, leadership skills, and extracurricular activities.',
  alternates: {
    canonical: `${baseUrl}/resume-builder-for-students`,
  },
  openGraph: {
    title: 'Resume Builder for Students | College & High School | GetEasyCV',
    description: 'Build an impressive student resume highlighting coursework and projects.',
    url: `${baseUrl}/resume-builder-for-students`,
  },
};

export default function ResumeBuilderForStudentsPage() {
  return (
    <>
      <SoftwareAppSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Resume Builder for Students', url: '/resume-builder-for-students' },
        ]}
      />
      <ResumeBuilderClientContent />
    </>
  );
}
