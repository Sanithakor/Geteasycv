'use client';
import React from 'react';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect to get started',
    features: ['3 resumes', '5 templates', 'PDF export', 'Basic sections', 'Community support'],
    cta: 'Get Started',
    href: '/signup',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 9,
    period: 'month',
    description: 'For serious job seekers',
    features: ['Unlimited resumes', '20+ premium templates', 'PDF & DOCX export', 'All sections', 'AI suggestions', 'Custom colors & fonts', 'Priority support', 'Resume analytics'],
    cta: 'Start Free Trial',
    href: '/signup?plan=pro',
    highlight: true,
  },
  {
    name: 'Premium',
    price: 19,
    period: 'month',
    description: 'For power users & teams',
    features: ['Everything in Pro', 'Cover letter builder', 'Portfolio builder', 'Custom domain', 'Team collaboration', 'API access', 'Dedicated support', 'White-label export'],
    cta: 'Start Free Trial',
    href: '/signup?plan=premium',
    highlight: false,
  },
];

export default function PricingPage() {
  const [plans, setPlans] = React.useState(PLANS);

  React.useEffect(() => {
    fetch('/api/plans')
      .then(res => res.json())
      .then(data => {
        if (data?.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data.map((p: any) => ({
            name: p.name,
            price: typeof p.price === 'string' ? parseFloat(p.price.replace('$', '')) || 0 : p.price,
            period: p.billingPeriod || 'month',
            description: p.description,
            features: p.features || [],
            cta: p.ctaText || 'Get Started',
            href: `/signup?plan=${p.name.toLowerCase()}`,
            highlight: p.popular || false
          }));
          setPlans(mapped);
        }
      })
      .catch(err => console.warn('Could not fetch dynamic plans, using fallback:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Nav */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <span className="text-white text-sm font-bold">CV</span>
            </div>
            GetEasyCV
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Sign in</Link>
            <Link href="/signup" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">Get Started</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Start free, upgrade when you need more power. No hidden fees.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(plan => (
            <div key={plan.name} className={`relative rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl ${plan.highlight ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}>
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600" />
              )}
              {plan.highlight && (
                <div className="text-center py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className={`p-8 ${plan.highlight ? 'bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-800' : ''}`}>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-bold text-slate-900 dark:text-white">${plan.price}</span>
                  <span className="text-slate-500 dark:text-slate-400">/{plan.period}</span>
                </div>
                <Link href={plan.href} className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${plan.highlight ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl' : 'border-2 border-slate-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 text-slate-900 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}>
                  {plan.cta}
                </Link>
              </div>
              <div className="px-8 pb-8 space-y-3">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 text-center">
          <p className="text-slate-600 dark:text-slate-400">
            Questions? <a href="mailto:support@geteasycv.com" className="text-blue-600 dark:text-blue-400 hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
}
