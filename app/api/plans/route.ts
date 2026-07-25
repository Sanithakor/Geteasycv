import { NextResponse } from 'next/server';

const defaultPlans = [
  {
    id: 'plan-free',
    name: 'Free',
    price: '$0',
    billingPeriod: 'forever',
    description: 'Perfect for getting started and building your first resume.',
    features: [
      '3 Resume Documents',
      'Access to Standard Templates',
      'Basic Export (PDF)',
      'Live Preview',
      'Community Support'
    ],
    popular: false,
    ctaText: 'Get Started Free',
    isCurrentPlan: false
  },
  {
    id: 'plan-pro',
    name: 'Pro',
    price: '$9.99',
    billingPeriod: 'per month',
    description: 'Best for active job seekers looking for modern ATS templates.',
    features: [
      'Unlimited Resume Documents',
      'All Premium & ATS Templates',
      'High-Resolution PDF, PNG & JPG Export',
      'AI Bullet Point Suggestions',
      'Custom Layout & Section Drag-and-Drop',
      'Priority Support'
    ],
    popular: true,
    ctaText: 'Upgrade to Pro',
    isCurrentPlan: false
  },
  {
    id: 'plan-lifetime',
    name: 'Lifetime',
    price: '$49.99',
    billingPeriod: 'one-time payment',
    description: 'Lifetime access with unlimited updates & premium features forever.',
    features: [
      'Everything in Pro Plan',
      'Lifetime Updates & New Templates',
      'Unlimited AI Resume Writing Credits',
      'Custom Domain Hosting & Share Links',
      '1-on-1 Resume Review Discount'
    ],
    popular: false,
    ctaText: 'Get Lifetime Access',
    isCurrentPlan: false
  }
];

export async function GET() {
  return NextResponse.json({ success: true, data: defaultPlans });
}
