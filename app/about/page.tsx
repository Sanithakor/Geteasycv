import React from 'react';
import type { Metadata } from 'next';
import AboutClientContent from '@/components/about/AboutClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'About GetEasyCV | ATS-Friendly Resume Builder Mission',
  description:
    'Learn about GetEasyCV mission to empower job seekers with recruiter-tested, ATS-friendly resume building tools, transparent pricing, and privacy.',
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    title: 'About GetEasyCV | ATS-Friendly Resume Builder Mission',
    description: 'Empowering job seekers worldwide with recruiter-approved resume tools.',
    url: `${baseUrl}/about`,
  },
};

export default function AboutPage() {
  return <AboutClientContent />;
}