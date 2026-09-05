import React from 'react';
import type { Metadata } from 'next';
import AtsCheckerClientContent from '@/components/ats-checker/AtsCheckerClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Free ATS Resume Checker & Format Scanner | GetEasyCV',
  description:
    'Scan your resume against ATS algorithms to ensure 100% readability, keyword optimization, and correct formatting before applying for jobs.',
  alternates: {
    canonical: `${baseUrl}/ats-checker`,
  },
  openGraph: {
    title: 'Free ATS Resume Checker & Format Scanner | GetEasyCV',
    description: 'Scan your resume against ATS algorithms for instant feedback.',
    url: `${baseUrl}/ats-checker`,
  },
};

export default function ATSCheckerPage() {
  return <AtsCheckerClientContent />;
}
