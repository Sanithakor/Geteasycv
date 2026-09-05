import React from 'react';
import type { Metadata } from 'next';
import AtsCheckerClientContent from '@/components/ats-checker/AtsCheckerClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Free ATS Resume Checker & Format Scanner | GetEasyCV',
  description:
    'Scan your resume for ATS compatibility, keyword alignment, and structure optimization before applying for jobs.',
  alternates: {
    canonical: `${baseUrl}/ats-checker`,
  },
  openGraph: {
    title: 'Free ATS Resume Checker & Format Scanner | GetEasyCV',
    description: 'Scan your resume for ATS compatibility and structural feedback.',
    url: `${baseUrl}/ats-checker`,
  },
};

export default function ATSCheckerPage() {
  return <AtsCheckerClientContent />;
}
