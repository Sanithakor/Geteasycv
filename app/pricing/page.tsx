import React from 'react';
import type { Metadata } from 'next';
import PricingClientContent from '@/components/pricing/PricingClientContent';
import { ProductSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Transparent Pricing & Plans | GetEasyCV Resume Builder',
  description:
    'Choose the perfect resume plan for your job search. Simple one-time payment options and monthly pro plans with zero hidden fees.',
  alternates: {
    canonical: `${baseUrl}/pricing`,
  },
  openGraph: {
    title: 'Transparent Pricing & Plans | GetEasyCV Resume Builder',
    description: 'Simple, affordable pricing plans for professional ATS resume building.',
    url: `${baseUrl}/pricing`,
  },
};

export default function PricingPage() {
  return (
    <>
      <ProductSchema
        name="GetEasyCV Premium Resume Plan"
        description="Access 200+ ATS resume template variations, AI bullet optimization, unlimited PDF downloads, and cover letter builder."
        price="0"
        url="/pricing"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Pricing', url: '/pricing' },
        ]}
      />
      <PricingClientContent />
    </>
  );
}
