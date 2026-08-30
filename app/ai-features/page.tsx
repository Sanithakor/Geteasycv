import React from 'react';
import type { Metadata } from 'next';
import AiFeaturesClientContent from '@/components/ai-features/AiFeaturesClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'AI Resume Writer & Bullet Generator | GetEasyCV',
  description:
    'Write recruiter-ready resume bullet points, tailor your professional summary, and match job descriptions using AI intelligence.',
  alternates: {
    canonical: `${baseUrl}/ai-features`,
  },
  openGraph: {
    title: 'AI Resume Writer & Bullet Generator | GetEasyCV',
    description: 'Supercharge your resume writing with intelligent AI bullet generation.',
    url: `${baseUrl}/ai-features`,
  },
};

export default function AiFeaturesPage() {
  return <AiFeaturesClientContent />;
}
