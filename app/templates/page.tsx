import React from 'react';
import type { Metadata } from 'next';
import TemplatesClientContent from '@/components/templates/TemplatesClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: '200+ Free ATS-Friendly Resume Templates & Variations | GetEasyCV',
  description:
    'Browse 200+ ATS-tested professional resume template variations designed by career experts. Customize layouts, colors, and download high-resolution PDFs.',
  alternates: {
    canonical: `${baseUrl}/templates`,
  },
  openGraph: {
    title: '200+ Free ATS-Friendly Resume Templates & Variations | GetEasyCV',
    description: 'Browse recruiter-tested resume templates and layout variations for every career level.',
    url: `${baseUrl}/templates`,
  },
};

export default function TemplatesPage() {
  return <TemplatesClientContent />;
}
