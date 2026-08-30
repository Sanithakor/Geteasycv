import React from 'react';
import type { Metadata } from 'next';
import BlogClientContent from '@/components/blog/BlogClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Career & Resume Blog | Recruiter Advice | GetEasyCV',
  description:
    'Read expert career guides, resume formatting advice, ATS optimization strategies, and job interview tips from GetEasyCV.',
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    title: 'Career & Resume Blog | Recruiter Advice | GetEasyCV',
    description: 'Expert advice on resume writing, ATS optimization, and career growth.',
    url: `${baseUrl}/blog`,
  },
};

export default function BlogPage() {
  return <BlogClientContent />;
}
