'use client';
import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/layout/Footer';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';

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
  const [billing, setBilling] = React.useState<'monthly' | 'annual'>('monthly');

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
            highlight: p.popular || false,
          }));
          setPlans(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const PLAN_ICONS = [Zap, Sparkles, Crown];

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="bg-white border-b border-slate-100 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200">
              <Sparkles className="w-3.5 h-3.5" /> Simple pricing
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Start free, upgrade when ready
            </h1>
            <p className="text-base text-slate-500 max-w-xl mx-auto">
              No hidden fees. Cancel any time. All plans include a 7-day money-back guarantee.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-2 bg-slate-100 rounded-xl p-1 mt-2">
              <button
                onClick={() => setBilling('monthly')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${billing === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('annual')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${billing === 'annual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Annual <span className="ml-1 text-emerald-600">Save 20%</span>
              </button>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="max-w-5xl mx-auto px-4 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => {
              const Icon = PLAN_ICONS[i] ?? Zap;
              const annualPrice = billing === 'annual' ? Math.round(plan.price * 0.8) : plan.price;
              return (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-2xl border flex flex-col ${
                    plan.highlight
                      ? 'border-violet-500 ring-2 ring-violet-500/20 shadow-md'
                      : 'border-slate-200 shadow-xs'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-violet-600 text-white text-[10px] font-black uppercase tracking-wide shadow-sm">
                      Most Popular
                    </div>
                  )}

                  <div className="p-6 space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-slate-900">{plan.name}</h2>
                        <p className="text-xs text-slate-500">{plan.description}</p>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900">
                        ${plan.price === 0 ? '0' : annualPrice}
                      </span>
                      <span className="text-xs text-slate-500">
                        {plan.price === 0 ? '/ forever' : `/ mo${billing === 'annual' ? ', billed annually' : ''}`}
                      </span>
                    </div>
                    {billing === 'annual' && plan.price > 0 && (
                      <p className="text-xs text-emerald-600 font-semibold -mt-2">
                        Save ${(plan.price - annualPrice) * 12}/yr
                      </p>
                    )}

                    <ul className="space-y-2.5 pt-3 border-t border-slate-100">
                      {plan.features.map((f: string) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={plan.href}
                      className={`block w-full text-center py-3 rounded-xl font-bold text-sm transition-all ${
                        plan.highlight
                          ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-sm'
                          : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-900'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FAQ strip */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
            {[
              { q: '7-day money-back', a: 'Not satisfied? Get a full refund within 7 days, no questions asked.' },
              { q: 'Cancel any time', a: 'Downgrade or cancel your plan at any time from your account settings.' },
              { q: 'No card for free', a: 'Start building for free — no credit card required until you upgrade.' },
            ].map(({ q, a }) => (
              <div key={q} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <p className="text-sm font-bold text-slate-900 mb-1">{q}</p>
                <p className="text-xs text-slate-500">{a}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-slate-500 mt-8">
            Questions?{' '}
            <Link href="/contact" className="text-violet-600 font-semibold hover:underline">Contact us</Link>
            {' '}or check the{' '}
            <Link href="/faq" className="text-violet-600 font-semibold hover:underline">FAQ</Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
