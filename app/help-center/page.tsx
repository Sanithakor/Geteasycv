import React from 'react';
import type { Metadata } from 'next';
import HelpCenterClientContent from '@/components/help-center/HelpCenterClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Help Center & Customer Support | GetEasyCV',
  description:
    'Get support with your GetEasyCV account, resume formatting, PDF downloads, billing, and subscription management.',
  alternates: {
    canonical: `${baseUrl}/help-center`,
  },
  openGraph: {
    title: 'Help Center & Customer Support | GetEasyCV',
    description: 'Find user guides and support resources for building your resume.',
    url: `${baseUrl}/help-center`,
  },
};

export default function HelpCenterPage() {
  return <HelpCenterClientContent />;
}
