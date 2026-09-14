import React from 'react';
import type { Metadata } from 'next';
import AtsCheckerClientContent from '@/components/ats-checker/AtsCheckerClientContent';
import { ToolAppSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Free ATS Resume Checker & Format Scanner | GetEasyCV',
  description:
    'Scan your resume against ATS readability standards to improve formatting, keyword optimization, and layout parseability before applying for jobs.',
  alternates: {
    canonical: `${baseUrl}/ats-checker`,
  },
  openGraph: {
    title: 'Free ATS Resume Checker & Format Scanner | GetEasyCV',
    description: 'Scan your resume against ATS readability standards for instant feedback.',
    url: `${baseUrl}/ats-checker`,
  },
};

export default function ATSCheckerPage() {
  return (
    <>
      <ToolAppSchema
        name="Free ATS Resume Checker & Format Scanner"
        description="Scan your resume against ATS readability standards to improve formatting and keyword optimization."
        url="/ats-checker"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'ATS Checker', url: '/ats-checker' },
        ]}
      />
      <AtsCheckerClientContent />
    </>
  );
}
