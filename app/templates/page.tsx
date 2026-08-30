import React from 'react';
import type { Metadata } from 'next';
import TemplatesClientContent from '@/components/templates/TemplatesClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: '150+ Free ATS-Friendly Resume Templates | GetEasyCV',
  description:
    'Browse 150+ ATS-tested professional resume templates designed by career experts. Customize layouts, colors, and download high-resolution PDFs.',
  alternates: {
    canonical: `${baseUrl}/templates`,
  },
  openGraph: {
    title: '150+ Free ATS-Friendly Resume Templates | GetEasyCV',
    description: 'Browse recruiter-tested resume templates for every career level.',
    url: `${baseUrl}/templates`,
  },
};

export default function TemplatesPage() {
  return <TemplatesClientContent />;
}
