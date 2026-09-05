"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export interface PricingPlan {
  id: string;
  name: string;
  price: string | number;
  currency?: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href?: string;
  highlight?: boolean;
  badge?: string | null;
  onClick?: () => void;
}

export const DEFAULT_PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for creating and downloading your first resume.",
    features: [
      "3 Resume exports",
      "Access to basic ATS templates",
      "Real-time live visual editor",
      "Standard section customization",
      "Community support",
    ],
    cta: "Get Started",
    href: "/editor",
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9",
    period: "month",
    description: "Most popular for active job seekers looking to land interviews.",
    features: [
      "Unlimited resumes & cover letters",
      "All 150+ ATS-friendly templates",
      "PDF & DOCX high-res export",
      "AI content suggestions",
      "Custom colors & fonts",
      "Priority support",
      "ATS optimization",
    ],
    cta: "Start Free Trial",
    href: "/signup?plan=pro",
    highlight: true,
    badge: "RECOMMENDED",
  },
  {
    id: "premium",
    name: "Premium",
    price: "$19",
    period: "month",
    description: "Advanced features and lifetime power for professionals.",
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
  },
];

export interface PricingSectionProps {
  badge?: string;
  title?: string;
  highlightText?: string;
  subtitle?: string;
  plans?: PricingPlan[];
  bgStyle?: string;
  className?: string;
  onPlanClick?: (planId: string) => void;
  showTrustBadges?: boolean;
  footnote?: string;
}

export default function PricingSimplified({
  badge = "PRICING",
  title = "Simple, Transparent",
  highlightText = "Pricing",
  subtitle = "Start free, upgrade when you need more. No hidden fees, cancel anytime.",
  plans = DEFAULT_PRICING_PLANS,
  bgStyle = "#FFFFFF",
  className = "",
  onPlanClick,
  showTrustBadges = true,
  footnote = "All plans include a 14-day free trial. No credit card required.",
}: PricingSectionProps) {
  return (
    <section
      className={`py-16 sm:py-24 font-sans ${className}`}
      style={{ background: bgStyle }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-5">
          <div
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider shadow-2xs"
            style={{
              background: "#FFFFFF",
              borderColor: "rgba(15,15,15,0.12)",
              color: "#0F0F0F",
            }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: "#F3645C" }} />
            <span>{badge}</span>
          </div>
        </div>

        {/* Headline */}
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto mb-4"
          style={{ color: "#0F0F0F" }}
        >
          {title} <span style={{ color: "#F3645C" }}>{highlightText}</span>
        </h2>

        {/* Subtitle */}
        <p
          className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed mb-12 sm:mb-16 font-normal"
          style={{ color: "#333333" }}
        >
          {subtitle}
        </p>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch text-left mb-12">
          {plans.map((plan) => {
            const isHighlight = plan.highlight;

            return (
              <div
                key={plan.id || plan.name}
                className={`relative flex flex-col justify-between rounded-2xl bg-white transition-all duration-300 ${
                  isHighlight
                    ? "border-2 border-[#0F0F0F] p-7 sm:p-8 shadow-2xl ring-4 ring-[#F5D17B]/25 transform lg:-translate-y-2 z-10"
                    : "border border-slate-200/90 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                {/* Recommended Top Badge */}
                {isHighlight && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0F0F0F] shadow-md flex items-center gap-1.5 whitespace-nowrap"
                    style={{ background: "#F5D17B" }}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#0F0F0F]" />
                    <span>{plan.badge || "RECOMMENDED"}</span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Desc */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[#0F0F0F] mb-1.5">
                      {plan.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-normal min-h-[36px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="mb-6 pb-6 border-b border-slate-100 flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#0F0F0F] tracking-tight">
                      {typeof plan.price === "number" ? `$${plan.price}` : plan.price}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#666666]">
                      /{plan.period}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <div className="mb-8">
                    {onPlanClick ? (
                      <button
                        type="button"
                        onClick={() => onPlanClick(plan.id)}
                        className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isHighlight
                            ? "bg-[#0F0F0F] hover:bg-[#262626] text-white shadow-lg hover:scale-[1.02]"
                            : "bg-white hover:bg-slate-50 text-[#0F0F0F] border border-slate-200/90 shadow-2xs"
                        }`}
                      >
                        <span>{plan.cta}</span>
                        {isHighlight && <ArrowRight className="w-4 h-4" />}
                      </button>
                    ) : (
                      <Link
                        href={plan.href || "/signup"}
                        className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 text-center ${
                          isHighlight
                            ? "bg-[#0F0F0F] hover:bg-[#262626] text-white shadow-lg hover:scale-[1.02]"
                            : "bg-white hover:bg-slate-50 text-[#0F0F0F] border border-slate-200/90 shadow-2xs"
                        }`}
                      >
                        <span>{plan.cta}</span>
                        {isHighlight && <ArrowRight className="w-4 h-4" />}
                      </Link>
                    )}
                  </div>

                  {/* Features Header */}
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#999999] mb-3">
                    WHAT&apos;S INCLUDED:
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 text-xs sm:text-sm font-medium text-[#333333]">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-2xs"
                          style={{
                            background: isHighlight
                              ? "#F5D17B"
                              : "rgba(88,192,157,0.18)",
                          }}
                        >
                          <Check
                            className="w-3.5 h-3.5"
                            style={{
                              color: isHighlight ? "#0F0F0F" : "#059669",
                            }}
                          />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        {footnote && (
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto mb-6">
            {footnote}
          </p>
        )}

        {/* Trust Badges */}
        {showTrustBadges && (
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#333333] font-semibold pt-2">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#58C09D]" />
              <span>14-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#58C09D]" />
              <span>256-bit secure checkout</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#58C09D]" />
              <span>Instant download access</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export { PricingSimplified as PricingSection };

