"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    description: "Perfect for trying out our platform",
    features: [
      "3 resume exports",
      "Basic templates",
      "PDF export",
      "Standard sections",
      "Community support",
    ],
    cta: "Get Started",
    href: "/signup",
    highlight: false,
    popular: false,
  },
  {
    name: "Pro",
    price: 9,
    period: "month",
    description: "Most popular for active job seekers",
    features: [
      "Unlimited resumes",
      "All premium templates",
      "PDF & DOCX export",
      "AI content suggestions",
      "Custom colors & fonts",
      "Priority support",
      "ATS optimization",
    ],
    cta: "Start Free Trial",
    href: "/signup?plan=pro",
    highlight: true,
    popular: true,
  },
  {
    name: "Premium",
    price: 19,
    period: "month",
    description: "Advanced features for professionals",
    features: [
      "Everything in Pro",
      "Cover letter builder",
      "Portfolio builder",
      "Custom branding",
      "API access",
      "Team collaboration",
      "Dedicated support",
    ],
    cta: "Start Free Trial",
    href: "/signup?plan=premium",
    highlight: false,
    popular: false,
  },
];

export default function PricingSimplified() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">
              Pricing
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                plan.highlight
                  ? "border-purple-500 shadow-xl shadow-purple-500/20 transform scale-105"
                  : "border-slate-200 bg-white hover:-translate-y-1"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600"></div>
              )}

              {plan.popular && (
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-2 text-sm font-bold uppercase tracking-wider">
                  ⭐ Recommended
                </div>
              )}

              {/* Card Content */}
              <div
                className={`p-8 ${
                  plan.highlight
                    ? "bg-gradient-to-br from-purple-50 via-white to-indigo-50"
                    : "bg-white"
                }`}
              >
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-600 mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    {plan.price === 0 ? (
                      <span className="text-5xl font-extrabold text-slate-900">
                        Free
                      </span>
                    ) : (
                      <>
                        <span className="text-5xl font-extrabold text-slate-900">
                          ${plan.price}
                        </span>
                        <span className="text-slate-500">/{plan.period}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={plan.href}
                  className={`block w-full text-center py-4 rounded-xl font-bold transition-all mb-8 ${
                    plan.highlight
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
                      : "border-2 border-slate-200 hover:border-purple-400 text-slate-900 hover:bg-purple-50"
                  }`}
                >
                  {plan.cta}
                </Link>

                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          plan.highlight
                            ? "bg-purple-100"
                            : "bg-green-100"
                        }`}
                      >
                        <Check
                          className={`w-3.5 h-3.5 ${
                            plan.highlight
                              ? "text-purple-600"
                              : "text-green-600"
                          }`}
                        />
                      </div>
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
