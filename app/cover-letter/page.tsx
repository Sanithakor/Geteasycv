import React from 'react';
import type { Metadata } from 'next';
import CoverLetterClientContent from '@/components/cover-letter/CoverLetterClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'AI Cover Letter Builder & Matching Templates | GetEasyCV',
  description:
    'Write a job-targeted cover letter in seconds. Align your experience with any job description, pick matching templates, and export vector PDFs.',
  alternates: {
    canonical: `${baseUrl}/cover-letter`,
  },
  openGraph: {
    title: 'AI Cover Letter Builder & Matching Templates | GetEasyCV',
    description: 'Write tailored cover letters using AI and matching resume templates.',
    url: `${baseUrl}/cover-letter`,
  },
};

export default function CoverLetterPage() {
  return <CoverLetterClientContent />;
}
