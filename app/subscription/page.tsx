'use client';

import React from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { useAuthStore } from '@/lib/store/authStore';
import { CreditCard, Check } from 'lucide-react';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Essential tools to create your first professional resume.',
    features: ['3 Resumes', '10 AI Credits / month', 'PDF Export', 'Standard Templates'],
    current: true,
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    description: 'Supercharge your job search with AI optimizations and unlimited downloads.',
    features: ['Unlimited Resumes', '500 AI Credits / month', 'PDF, PNG, JPG Exports', 'All Premium Templates', 'ATS Resume Match Score'],
    popular: true,
  },
  {
    name: 'Premium',
    price: '$29',
    period: 'per month',
    description: 'Complete career toolkit with 1-on-1 AI cover letter & LinkedIn generator.',
    features: ['Everything in Pro', 'Unlimited AI Credits', 'Custom Branding & Domains', 'Priority Support', 'Cover Letter Builder'],
  },
];

export default function UserSubscriptionPage() {
  const { user } = useAuthStore();
  const currentTier = user?.tier || (user as any)?.subscriptionTier || 'free';

  return (
    <UserLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <CreditCard className="w-7 h-7 text-teal-600" />
            <span>Subscription & Billing</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your subscription plan, AI credit balance, and billing details.
          </p>
        </div>

        {/* Current Plan Overview Card */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Current Plan: {currentTier}
            </span>
            <h2 className="text-2xl font-bold capitalize">{currentTier} Plan Account</h2>
            <p className="text-sm text-slate-300">
              Your plan includes active resumes, PDF exports, and AI credits.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all">
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Available Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => {
              const isCurrent = currentTier.toLowerCase() === plan.name.toLowerCase();
              return (
                <div
                  key={plan.name}
                  className={`bg-white border rounded-3xl p-6 flex flex-col justify-between space-y-6 relative shadow-xs ${
                    plan.popular
                      ? 'border-teal-500 ring-2 ring-teal-500/20'
                      : 'border-slate-200'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-teal-600 text-white font-black text-[10px] uppercase tracking-wider shadow-sm">
                      Most Popular
                    </span>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.description}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900">{plan.price}</span>
                      <span className="text-xs text-slate-500">/ {plan.period}</span>
                    </div>

                    <ul className="space-y-2.5 pt-4 border-t border-slate-100">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    disabled={isCurrent}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                      isCurrent
                        ? 'bg-slate-100 text-slate-500 cursor-default'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md'
                    }`}
                  >
                    {isCurrent ? 'Current Plan' : `Upgrade to ${plan.name}`}
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
