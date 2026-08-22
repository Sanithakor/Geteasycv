"use client";

import React from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

const PLANS = [
  {
    name: "Free", price: 0, period: "forever",
    description: "Perfect for trying out our platform",
    features: ["3 resume exports","Basic templates","PDF export","Standard sections","Community support"],
    cta: "Get Started", href: "/signup", highlight: false,
  },
  {
    name: "Pro", price: 9, period: "month",
    description: "Most popular for active job seekers",
    features: ["Unlimited resumes","All premium templates","PDF & DOCX export","AI content suggestions","Custom colors & fonts","Priority support","ATS optimization"],
    cta: "Start Free Trial", href: "/signup?plan=pro", highlight: true, popular: true,
  },
  {
    name: "Premium", price: 19, period: "month",
    description: "Advanced features for professionals",
    features: ["Everything in Pro","Cover letter builder","Portfolio builder","Custom branding","API access","Team collaboration","Dedicated support"],
    cta: "Start Free Trial", href: "/signup?plan=premium", highlight: false,
  },
];

export default function PricingSimplified() {
  return (
    <section className="py-16 sm:py-20" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
            style={{ background: '#F8F8F6', borderColor: 'rgba(15,15,15,0.12)' }}>
            <Sparkles className="w-4 h-4" style={{ color: '#333333' }} />
            <span className="text-sm font-bold uppercase tracking-wider" style={{ color: '#333333' }}>Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: '#0F0F0F' }}>
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#333333' }}>
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan) => (
            <div key={plan.name}
              className={`relative rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-2xl ${plan.highlight ? 'transform scale-105' : 'hover:-translate-y-1'}`}
              style={{ borderColor: plan.highlight ? '#0F0F0F' : 'rgba(15,15,15,0.10)', background: '#FFFFFF' }}>

              {/* Popular header */}
              {plan.popular && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: '#F5D17B' }} />
                  <div className="text-center py-2 text-sm font-bold uppercase tracking-wider" style={{ background: '#0F0F0F', color: '#FFFFFF' }}>
                    ⭐ Recommended
                  </div>
                </>
              )}

              <div className="p-8" style={{ background: plan.highlight ? '#F8F8F6' : '#FFFFFF' }}>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#0F0F0F' }}>{plan.name}</h3>
                <p className="text-sm mb-6" style={{ color: '#333333' }}>{plan.description}</p>

                <div className="mb-8">
                  {plan.price === 0
                    ? <span className="text-5xl font-extrabold" style={{ color: '#0F0F0F' }}>Free</span>
                    : <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-extrabold" style={{ color: '#0F0F0F' }}>${plan.price}</span>
                        <span style={{ color: '#333333' }}>/{plan.period}</span>
                      </div>
                  }
                </div>

                <Link href={plan.href}
                  className="block w-full text-center py-4 rounded-xl font-bold transition-all mb-8 hover:opacity-90"
                  style={plan.highlight
                    ? { background: '#0F0F0F', color: '#FFFFFF' }
                    : { background: 'transparent', border: '2px solid rgba(15,15,15,0.15)', color: '#0F0F0F' }}>
                  {plan.cta}
                </Link>

                <div className="space-y-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: plan.highlight ? '#F5D17B' : '#58C09D33' }}>
                        <Check className="w-3.5 h-3.5" style={{ color: '#0F0F0F' }} />
                      </div>
                      <span className="text-sm" style={{ color: '#333333' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm" style={{ color: '#9ca3af' }}>
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
