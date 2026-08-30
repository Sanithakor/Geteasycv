import React from 'react';
import type { Metadata } from 'next';
import ContactClientContent from '@/components/contact/ContactClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Contact Support | GetEasyCV Resume Builder',
  description:
    'Get in touch with the GetEasyCV support team for assistance with resume creation, templates, account billing, or technical questions.',
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
  openGraph: {
    title: 'Contact Support | GetEasyCV Resume Builder',
    description: 'Get in touch with GetEasyCV support for help with your resume.',
    url: `${baseUrl}/contact`,
  },
};

export default function ContactPage() {
  return <ContactClientContent />;
}
