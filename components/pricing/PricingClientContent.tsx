'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import InnerBanner from '@/components/InnerBanner';
import ReadyToBuild from '@/components/sections/ReadyToBuild';
import FAQ from '@/components/FAQ';
import { PRICING_FAQS } from '@/data/faqs';
import Footer from '@/components/Footer';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { getSavedCountry, saveSelectedCountry, detectBrowserCountry } from '@/lib/utils/geo';
import CountrySelector from '@/components/pricing/CountrySelector';
import { PRICING_PLANS, DISPLAY_PLANS, getPlanById, getLocalizedPlans, isUserPlanActive, PricingPlan } from '@/lib/config/pricing';
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
  AlertCircle,
  RefreshCw,
  Globe,
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';

function PricingSkeleton() {
  return (
    <div className="mb-20 grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 lg:gap-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 min-h-[480px]"
        >
          <div className="space-y-4">
            <div className="h-6 w-1/3 bg-slate-200 rounded-md"></div>
            <div className="h-4 w-3/4 bg-slate-100 rounded-md"></div>
            <div className="h-10 w-1/2 bg-slate-200 rounded-md border-y border-slate-100 py-3"></div>
            <div className="space-y-3 pt-4">
              <div className="h-3 w-1/4 bg-slate-200 rounded-md"></div>
              {[1, 2, 3, 4].map((f) => (
                <div key={f} className="h-4 w-5/6 bg-slate-100 rounded-md"></div>
              ))}
            </div>
          </div>
          <div className="h-12 w-full bg-slate-200 rounded-xl mt-6"></div>
        </div>
      ))}
    </div>
  );
}

function PricingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');
  const autoPlan = searchParams.get('plan');
  const queryCountry = searchParams.get('country');

  const { user, _hydrated } = useAuthStore();
  const userTier = (user?.tier || (user as any)?.subscriptionTier || 'free').toLowerCase();

  const [selectedCountry, setSelectedCountry] = useState<string>(() => {
    if (queryCountry) return queryCountry.toUpperCase();
    if (typeof window !== 'undefined') return getSavedCountry();
    return 'IN';
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<PricingPlan[]>(() => {
    const initCountry = queryCountry ? queryCountry.toUpperCase() : (typeof window !== 'undefined' ? getSavedCountry() : 'IN');
    return getLocalizedPlans(initCountry);
  });
  const [autoCheckoutTriggered, setAutoCheckoutTriggered] = useState(false);

  useEffect(() => {
    if (queryCountry) {
      setSelectedCountry(queryCountry.toUpperCase());
      saveSelectedCountry(queryCountry.toUpperCase());
    } else {
      const saved = getSavedCountry();
      setSelectedCountry(saved);
      saveSelectedCountry(saved);
    }
  }, [queryCountry]);

  const fetchPlansData = async (countryCode: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/plans?country=${countryCode}`);
      if (!res.ok) {
        throw new Error(`Failed to load plans (Status ${res.status})`);
      }
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const formatted: PricingPlan[] = json.data
          .filter((p: any) => p.isActive !== false && p.id.toLowerCase() !== 'free')
          .map((p: any) => {
            const staticConfig = getPlanById(p.id, countryCode);
            return {
              ...staticConfig,
              id: p.id,
              name: p.name || staticConfig.name,
              price: p.priceFormatted || `${p.currency || staticConfig.symbol}${p.price}`,
              rawPrice: p.price,
              period: p.billingPeriod || staticConfig.billingPeriod,
              billingPeriod: p.billingPeriod || staticConfig.billingPeriod,
              description: p.description || staticConfig.description,
              features: p.features && p.features.length > 0 ? p.features : staticConfig.features,
              cta: staticConfig.cta,
              popular: Boolean(p.popular ?? staticConfig.popular),
              highlight: Boolean(p.popular ?? staticConfig.popular),
              badge: p.badge || (p.popular ? 'MOST POPULAR' : staticConfig.badge),
            };
          });
        setPlans(formatted);
      } else {
        setPlans(getLocalizedPlans(countryCode));
      }
    } catch (err: any) {
      console.warn('[PRICING_PAGE_FETCH_WARN] Using central fallback plans:', err);
      setPlans(getLocalizedPlans(countryCode));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlansData(selectedCountry);
  }, [selectedCountry]);

  const handleCountryChange = (newCountry: string) => {
    setSelectedCountry(newCountry);
    saveSelectedCountry(newCountry);
  };

  useEffect(() => {
    if (autoPlan && !autoCheckoutTriggered) {
      setAutoCheckoutTriggered(true);
      router.push(`/payment/checkout?plan=${autoPlan}&country=${selectedCountry}&from=/templates`);
    }
  }, [autoPlan, autoCheckoutTriggered, router, selectedCountry]);

  const handleSelectPlan = (planId: string) => {
    if (planId === 'free') {
      router.push('/editor');
      return;
    }
    router.push(`/payment/checkout?plan=${planId}&country=${selectedCountry}&from=/templates`);
  };

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
          description="Choose the plan that fits your job search. One-time options and flexible plans with no hidden fees."
          features={[
            "No Hidden Fees",
            "Instant PDF Export",
            "Money Back Guarantee",
          ]}
        >
          {reason === 'download_limit' && (
            <div className="mx-auto mb-4 flex max-w-2xl items-center justify-center gap-2.5 rounded-xl border border-[#F5D17B] bg-[#FFF6D9] p-4 text-xs font-bold text-[#5E4810] animate-in fade-in duration-200 sm:text-sm">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
              <span>You&apos;ve reached the free account limit (1 download used). Select a plan below to continue downloading your CV!</span>
            </div>
          )}
          {reason === 'resume_limit' && (
            <div className="mx-auto mb-4 flex max-w-2xl items-center justify-center gap-2.5 rounded-xl border border-[#F5D17B] bg-[#FFF6D9] p-4 text-xs font-bold text-[#5E4810] animate-in fade-in duration-200 sm:text-sm">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
              <span>You have reached your CV creation limit. Upgrade to Pro or Premium for unlimited CV creation and downloads!</span>
            </div>
          )}
        </InnerBanner>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Country Selector Bar */}
          <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-2xs">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Select Your Location &amp; Currency</h3>
                <p className="text-xs text-slate-500">Prices and payment checkout automatically adjust to your region.</p>
              </div>
            </div>
            <CountrySelector
              selectedCountry={selectedCountry}
              onCountryChange={handleCountryChange}
            />
          </div>
          {error && (
            <div className="mx-auto mb-10 max-w-xl rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-900 shadow-sm space-y-3">
              <AlertCircle className="mx-auto h-8 w-8 text-rose-600" />
              <h3 className="font-bold text-base">Unable to load pricing options right now</h3>
              <p className="text-xs text-rose-700">
                {error}. Please check your network connection or click retry below.
              </p>
              <button
                onClick={() => fetchPlansData(selectedCountry)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-md hover:bg-rose-700 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          )}

          {loading ? (
            <PricingSkeleton />
          ) : (
            <div className="mb-20 grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 lg:gap-6">
              {plans.map((plan) => {
                const isCurrent = _hydrated && isUserPlanActive(userTier, plan.id);

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
                          {(plan.id === 'premium' || plan.id === 'lifetime') && (
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
                        {plan.features.map((feature: string, fIdx: number) => (
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
                      {isCurrent ? (
                        <div className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Current Plan</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSelectPlan(plan.id)}
                          className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                            plan.highlight
                              ? 'bg-[#0F0F0F] hover:bg-[#262626] text-white shadow-lg hover:scale-[1.02]'
                              : 'bg-white hover:bg-slate-50 text-[#0F0F0F] border border-slate-200/90 shadow-2xs'
                          }`}
                        >
                          <span>{plan.id === 'free' ? 'Get Started' : `Upgrade to ${plan.name}`}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

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
              subtitle="Everything you need to know about GetEasyCV plans, billing, and access."
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
    <Suspense fallback={<PricingSkeleton />}>
      <PricingContent />
    </Suspense>
  );
}
