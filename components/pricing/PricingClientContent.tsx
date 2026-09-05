'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import InnerBanner from '@/components/InnerBanner';
import ReadyToBuild from '@/components/sections/ReadyToBuild';
import FAQ from '@/components/FAQ';
import { PRICING_FAQS } from '@/data/faqs';
import Footer from '@/components/Footer';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  CreditCard,
  Loader2,
  Award,
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₹49',
    rawPrice: 49,
    period: 'one-time payment',
    description: 'Perfect for quick single resume creation.',
    features: [
      '1 CV Creation',
      'High-resolution PDF download',
      'Access to core templates',
      'No recurring payment',
    ],
    cta: 'Buy Starter',
    highlight: false,
    badge: null,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹199',
    rawPrice: 199,
    period: 'month',
    description: 'For active job seekers looking to maximize interviews.',
    features: [
      'Unlimited CVs & Downloads',
      'All premium templates',
      'PDF, PNG, JPG Exports',
      'AI Resume Bullet Rewriter',
      'Cancel anytime',
    ],
    cta: 'Start Pro',
    highlight: true,
    badge: 'MOST POPULAR',
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '₹999',
    rawPrice: 999,
    period: 'one-time payment',
    description: 'Permanent access for serious career growth.',
    features: [
      'Everything in Pro',
      'Lifetime Unlimited Access',
      'Future Premium Templates',
      'Priority Customer Support',
    ],
    cta: 'Get Lifetime',
    highlight: false,
    badge: 'BEST VALUE',
  },
];

function PricingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');
  const autoPlan = searchParams.get('plan');
  const [loadingPlan] = useState<string | null>(null);
  const [autoCheckoutTriggered, setAutoCheckoutTriggered] = useState(false);
  const [plans, setPlans] = useState(PRICING_PLANS);

  useEffect(() => {
    fetch('/api/plans')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const formatted = json.data
            .filter((p: any) => p.isActive !== false)
            .map((p: any) => ({
              id: p.id,
              name: p.name,
              price: `${p.currency || '₹'}${p.price}`,
              rawPrice: p.price,
              period: p.billingPeriod,
              description: p.description,
              features: p.features || [],
              cta: p.id === 'pro' ? 'Start Pro' : p.id === 'lifetime' ? 'Get Lifetime' : `Buy ${p.name}`,
              highlight: Boolean(p.popular),
              badge: p.badge || (p.popular ? 'MOST POPULAR' : null),
            }));
          setPlans(formatted);
        }
      })
      .catch(() => {});
  }, []);

  const handleSelectPlan = (planId: string) => {
    router.push(`/payment/checkout?plan=${planId}&from=/templates`);
  };

  useEffect(() => {
    if (autoPlan && !autoCheckoutTriggered) {
      setAutoCheckoutTriggered(true);
      router.push(`/payment/checkout?plan=${autoPlan}&from=/templates`);
    }
  }, [autoPlan, autoCheckoutTriggered, router]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F8F8F6] font-sans">
        <InnerBanner
          badge="Simple & Transparent Pricing"
          badgeIcon={CreditCard}
          breadcrumbs={[{ label: "Pricing", href: "/pricing" }]}
          variant="center"
          title="Invest in Your Career with"
          highlightText="GetEasyCV"
          description="Choose the plan that fits your job search. One-time options and flexible monthly plans with no hidden fees."
          features={[
            "No Hidden Fees",
            "Instant PDF Export",
            "Money Back Guarantee",
          ]}
        >
          {reason === 'download_limit' && (
            <div className="mx-auto mb-4 flex max-w-2xl items-center justify-center gap-2.5 rounded-xl border border-[#F5D17B] bg-[#FFF6D9] p-4 text-xs font-bold text-[#5E4810] animate-in fade-in duration-200 sm:text-sm">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
              <span>You've reached the free account limit (1 download used). Select a plan below to continue downloading your CV!</span>
            </div>
          )}
          {reason === 'resume_limit' && (
            <div className="mx-auto mb-4 flex max-w-2xl items-center justify-center gap-2.5 rounded-xl border border-[#F5D17B] bg-[#FFF6D9] p-4 text-xs font-bold text-[#5E4810] animate-in fade-in duration-200 sm:text-sm">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
              <span>You have reached your CV creation limit. Upgrade to Pro or Lifetime for unlimited CV creation and downloads!</span>
            </div>
          )}
        </InnerBanner>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-20 grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 lg:gap-6">
            {plans.map((plan) => {
              const isLoading = loadingPlan === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col justify-between rounded-2xl bg-white text-left transition-all duration-300 ${
                    plan.highlight
                      ? 'border-2 border-[#0F0F0F] shadow-2xl ring-4 ring-[#F5D17B]/25 transform lg:-translate-y-2 z-10'
                      : 'border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  {plan.badge && (
                    <div
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0F0F0F] shadow-md flex items-center gap-1.5 whitespace-nowrap"
                      style={{ background: '#F5D17B' }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#0F0F0F]" />
                      <span>{plan.badge}</span>
                    </div>
                  )}

                  <div className="flex-1 space-y-6 p-6 sm:p-8">
                    <div>
                      <h2 className="mb-1 flex items-center justify-between text-2xl font-bold text-[#0F0F0F]">
                        <span>{plan.name}</span>
                        {plan.id === 'lifetime' && (
                          <Award className="w-5 h-5 text-amber-500" />
                        )}
                      </h2>
                      <p className="min-h-[36px] text-xs leading-relaxed text-[#666666] sm:text-sm font-normal">
                        {plan.description}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-1.5 border-y border-slate-100 py-3">
                      <span className="text-3xl font-extrabold text-[#0F0F0F] sm:text-4xl">
                        {plan.price}
                      </span>
                      <span className="text-xs font-medium text-[#666666] sm:text-sm">
                        / {plan.period}
                      </span>
                    </div>

                    <div className="space-y-3 pt-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#999999]">
                        WHAT&apos;S INCLUDED:
                      </p>
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-2xs" style={{ background: plan.highlight ? '#F5D17B' : 'rgba(88,192,157,0.18)' }}>
                            <Check className="h-3.5 w-3.5" style={{ color: plan.highlight ? '#0F0F0F' : '#059669' }} />
                          </div>
                          <span className="text-[#333333]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 pt-0 sm:p-8 sm:pt-0">
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleSelectPlan(plan.id)}
                      className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-60 ${
                        plan.highlight
                          ? 'bg-[#0F0F0F] hover:bg-[#262626] text-white shadow-lg hover:scale-[1.02]'
                          : 'bg-white hover:bg-slate-50 text-[#0F0F0F] border border-slate-200/90 shadow-2xs'
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Preparing Checkout...</span>
                        </>
                      ) : (
                        <>
                          <span>{plan.cta}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
            <div className="flex items-center gap-4 rounded-2xl border border-[#0F0F0F]/10 bg-white p-6 text-left shadow-2xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FFE0CF] text-[#F3645C]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Razorpay Secure Payments</h4>
                <p className="text-slate-500 text-xs">256-Bit SSL Encrypted PCI-DSS Gateway</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-[#0F0F0F]/10 bg-white p-6 text-left shadow-2xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#DDF4EA] text-[#319675]">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Instant Access</h4>
                <p className="text-slate-500 text-xs">Unlock All Templates Instantly</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-[#0F0F0F]/10 bg-white p-6 text-left shadow-2xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#E4D9FF] text-[#7353B6]">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Transparent Pricing</h4>
                <p className="text-slate-500 text-xs">No Contracts or Hidden Fees</p>
              </div>
            </div>
          </div>

          <div className="mx-auto mb-16 max-w-4xl">
            <FAQ
              items={PRICING_FAQS}
              badge="Pricing Questions"
              title="Frequently Asked"
              highlightText="Questions"
              subtitle="Everything you need to know about GetEasyCV plans, billing, and lifetime access."
              variant="embedded"
            />
          </div>
        </div>
      </main>

      <ReadyToBuild />
      <Footer />
      <Toaster position="bottom-right" />
    </>
  );
}

export default function PricingClientContent() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-semibold text-sm">
        Loading pricing options...
      </div>
    }>
      <PricingContent />
    </Suspense>
  );
}
