import React from 'react';
import type { Metadata } from 'next';
import FaqClientContent from '@/components/faq/FaqClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Resume Builder Frequently Asked Questions (FAQ) | GetEasyCV',
  description:
    'Find answers to common questions about ATS formatting, resume downloads, account management, PDF exports, and pricing.',
  alternates: {
    canonical: `${baseUrl}/faq`,
  },
  openGraph: {
    title: 'Resume Builder Frequently Asked Questions (FAQ) | GetEasyCV',
    description: 'Get answers regarding resume templates, ATS parsing, and account features.',
    url: `${baseUrl}/faq`,
  },
};

export default function FAQPage() {
  return <FaqClientContent />;
}
