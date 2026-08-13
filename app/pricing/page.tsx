'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ReadyToBuild from '@/components/sections/ReadyToBuild';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  CreditCard,
} from 'lucide-react';

const FALLBACK_PLANS = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect to explore templates and build your first resume.',
    features: ['3 Resumes', '5 ATS Templates', 'PDF Export', 'Basic Sections', 'Community Support'],
    cta: 'Get Started Free',
    href: '/signup',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 9,
    period: 'month',
    description: 'For active job seekers looking for interviews.',
    features: [
      'Unlimited Resumes',
      '20+ Premium ATS Templates',
      'PDF & DOCX Export',
      'AI Resume Summary Generator',
      'Bullet Point Achievement Rewriter',
      'Custom Colors & Fonts',
      'Priority Customer Support',
      'Resume ATS Score Analytics',
    ],
    cta: 'Start Pro Trial',
    href: '/signup?plan=pro',
    highlight: true,
  },
  {
    name: 'Premium',
    price: 19,
    period: 'month',
    description: 'For serious professionals & power users.',
    features: [
      'Everything in Pro',
      'Cover Letter Builder',
      'Matching Portfolio Layouts',
      'Custom Domain Hosting',
      'Team Collaboration Tools',
      'API & Webhook Access',
      'Dedicated Account Manager',
      'White-label PDF Export',
    ],
    cta: 'Start Premium Trial',
    href: '/signup?plan=premium',
    highlight: false,
  },
];

const FAQS = [
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes! You can cancel your subscription at any time directly from your account settings with zero cancellation fees.',
  },
  {
    question: 'Are the resume templates 100% ATS-friendly?',
    answer: 'Absolutely. Every template is tested against major Applicant Tracking Systems (Workday, Greenhouse, Lever) to guarantee 100% readability.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards (Visa, MasterCard, American Express) and Apple Pay via our encrypted payment gateways.',
  },
];

export default function PricingPage() {
  const [plans, setPlans] = useState(FALLBACK_PLANS);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    fetch('/api/plans')
      .then((res) => res.json())
      .then((data) => {
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
      .catch((err) => console.warn('Could not fetch dynamic plans, using fallback:', err));
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 font-sans py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Header Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-xs font-bold tracking-wider text-[#7C3AED] uppercase shadow-2xs">
              <CreditCard className="w-4 h-4 text-[#7C3AED]" />
              SIMPLE &amp; TRANSPARENT PRICING
            </span>
          </div>

          {/* Heading & Subtitle */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Simple Plans for Every Career Goal
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Start free, upgrade when you need advanced AI writing and unlimited exports. No hidden fees.
          </p>

          {/* Billing Cycle Selector */}
          <div className="flex items-center justify-center gap-3 mb-12 sm:mb-16">
            <div className="bg-slate-200/70 p-1 rounded-md inline-flex items-center gap-1 border border-slate-300/50">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === 'yearly'
                    ? 'bg-[#7C3AED] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Yearly Billing</span>
                <span className="bg-emerald-400 text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
            {plans.map((plan) => {
              const displayPrice =
                billingCycle === 'yearly' && plan.price > 0
                  ? Math.round(plan.price * 0.8)
                  : plan.price;

              return (
                <div
                  key={plan.name}
                  className={`bg-white rounded-md border transition-all duration-300 hover:shadow-xl text-left flex flex-col justify-between relative overflow-hidden ${
                    plan.highlight
                      ? 'border-[#7C3AED] shadow-lg shadow-purple-500/10 ring-2 ring-[#7C3AED]/20'
                      : 'border-slate-200/80 shadow-xs'
                  }`}
                >
                  {/* Top Popular Ribbon */}
                  {plan.highlight && (
                    <div className="bg-[#7C3AED] text-white text-[11px] font-bold text-center uppercase tracking-wider py-1.5 px-4 flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>MOST POPULAR CHOICE</span>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 space-y-6 flex-1">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        {plan.name}
                      </h2>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed min-h-[40px]">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price Tag */}
                    <div className="flex items-baseline gap-1 py-2 border-y border-slate-100">
                      <span className="text-3xl sm:text-4xl font-bold text-slate-900">
                        ${displayPrice}
                      </span>
                      <span className="text-slate-500 text-xs sm:text-sm font-medium">
                        /{plan.period}
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 pt-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        WHAT'S INCLUDED:
                      </p>
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Action */}
                  <div className="p-6 sm:p-8 pt-0">
                    <Link
                      href={plan.href}
                      className={`w-full py-3.5 px-4 rounded-md font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                        plan.highlight
                          ? 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-purple-500/20 '
                          : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200'
                      }`}
                    >
                      <span>{plan.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guarantees Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
            <div className="p-6 bg-white border border-slate-200/80 rounded-md flex items-center gap-4 text-left shadow-2xs">
              <div className="w-12 h-12 rounded-md bg-purple-100/70 text-[#7C3AED] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Secure Checkout</h4>
                <p className="text-slate-500 text-xs">256-Bit SSL Encrypted Payment</p>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-200/80 rounded-md flex items-center gap-4 text-left shadow-2xs">
              <div className="w-12 h-12 rounded-md bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Instant Access</h4>
                <p className="text-slate-500 text-xs">Unlock All Features Immediately</p>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-200/80 rounded-md flex items-center gap-4 text-left shadow-2xs">
              <div className="w-12 h-12 rounded-md bg-amber-100/70 text-amber-600 flex items-center justify-center shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Cancel Anytime</h4>
                <p className="text-slate-500 text-xs">No Contract or Hidden Fees</p>
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="max-w-4xl mx-auto bg-white rounded-md border border-slate-200/80 p-8 sm:p-12 text-left shadow-2xs mb-16">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Have questions about plans or billing? Find quick answers below.
              </p>
            </div>

            <div className="space-y-6">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center pt-6 border-t border-slate-100">
              <p className="text-xs sm:text-sm text-slate-500">
                Have more questions?{' '}
                <Link href="/contact" className="text-[#7C3AED] font-semibold hover:underline">
                  Contact our support team
                </Link>{' '}
                or visit our{' '}
                <Link href="/faq" className="text-[#7C3AED] font-semibold hover:underline">
                  Full FAQ Page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Shared CTA & Footer */}
      <ReadyToBuild />
      <Footer />
    </>
  );
}
