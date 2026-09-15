'use client';

import React, { useState, useEffect } from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { getSavedCountry, saveSelectedCountry, detectBrowserCountry } from '@/lib/utils/geo';
import CountrySelector from '@/components/pricing/CountrySelector';
import { DISPLAY_PLANS, getPlanById, getLocalizedPlans, isUserPlanActive, PricingPlan } from '@/lib/config/pricing';
import { CreditCard, Check, Sparkles, Globe } from 'lucide-react';

export default function UserSubscriptionPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loadingPlan] = useState<string | null>(null);
  const currentTier = (user?.tier || (user as any)?.subscriptionTier || 'free').toLowerCase();

  const [selectedCountry, setSelectedCountry] = useState<string>(() => {
    if (typeof window !== 'undefined') return getSavedCountry();
    return 'IN';
  });
  const [plans, setPlans] = useState<PricingPlan[]>(() => {
    const initCountry = typeof window !== 'undefined' ? getSavedCountry() : 'IN';
    return getLocalizedPlans(initCountry);
  });

  useEffect(() => {
    const saved = getSavedCountry();
    setSelectedCountry(saved);
    saveSelectedCountry(saved);
  }, []);

  const fetchPlans = async (countryCode: string) => {
    try {
      const res = await fetch(`/api/plans?country=${countryCode}`);
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.data) && data.data.length > 0) {
        const formatted: PricingPlan[] = data.data
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
              popular: Boolean(p.popular ?? staticConfig.popular),
              badge: p.badge || (p.popular ? 'MOST POPULAR' : staticConfig.badge),
            };
          });
        setPlans(formatted);
      } else {
        setPlans(getLocalizedPlans(countryCode));
      }
    } catch {
      setPlans(getLocalizedPlans(countryCode));
    }
  };

  useEffect(() => {
    fetchPlans(selectedCountry);
  }, [selectedCountry]);

  const handleCountryChange = (newCountry: string) => {
    setSelectedCountry(newCountry);
    saveSelectedCountry(newCountry);
  };

  const handleCheckout = (planId: string) => {
    if (planId === 'free') {
      router.push('/editor');
      return;
    }
    router.push(`/payment/checkout?plan=${planId}&country=${selectedCountry}&from=/subscription`);
  };

  return (
    <UserLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <CreditCard className="w-6 h-6 text-teal-600" />
            <span>Subscription &amp; Billing</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your subscription plan, billing details, and active feature access.
          </p>
        </div>

        {/* Current Plan Overview Card */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Active Tier: {currentTier.toUpperCase()}
            </span>
            <h2 className="text-2xl font-bold capitalize">{currentTier} Account Plan</h2>
            <p className="text-sm text-slate-300">
              You have active access to templates, live resume builder, and PDF exports.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {currentTier === 'free' && (
              <button
                onClick={() => handleCheckout('pro')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Upgrade to Pro</span>
              </button>
            )}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Available Plans</h2>
              <p className="text-xs text-slate-500">Choose a plan tailored for your region and billing frequency.</p>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-500 shrink-0" />
              <CountrySelector
                selectedCountry={selectedCountry}
                onCountryChange={handleCountryChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {plans.map((plan) => {
              const isCurrent = isUserPlanActive(currentTier, plan.id);
              const isLoadingThis = loadingPlan === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`bg-white border rounded-2xl p-6 flex flex-col justify-between space-y-6 relative shadow-xs ${
                    plan.popular
                      ? 'border-teal-500 ring-2 ring-teal-500/20'
                      : 'border-slate-200'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-teal-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-sm">
                      {plan.badge || 'Most Popular'}
                    </span>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.description}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-slate-900">{plan.price}</span>
                      <span className="text-xs text-slate-500">/ {plan.billingPeriod || plan.period}</span>
                    </div>

                    <ul className="space-y-2.5 pt-4 border-t border-slate-100">
                      {Array.isArray(plan.features) && plan.features.map((feat: string) => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleCheckout(plan.id)}
                    disabled={isCurrent || isLoadingThis}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md'
                    }`}
                  >
                    {isCurrent ? 'Current Plan' : isLoadingThis ? 'Processing...' : plan.id === 'free' ? 'Get Started' : `Upgrade to ${plan.name}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
