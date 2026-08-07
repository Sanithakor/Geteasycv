import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { RefreshCw } from 'lucide-react';

export const metadata = {
  title: 'Refund Policy — GetEasyCV',
  description: '7-day money-back guarantee on all GetEasyCV premium plans.',
};

const SECTIONS = [
  {
    title: '1. Money-Back Guarantee',
    content:
      'We offer a 7-day money-back guarantee on all premium subscription plans. If you are not satisfied with your purchase within the first 7 days of your subscription, contact us for a full refund — no questions asked.',
  },
  {
    title: '2. Eligibility',
    items: [
      'The refund request must be made within 7 calendar days of the initial purchase.',
      'The guarantee applies to first-time purchases only, not renewals.',
      'Accounts that have violated our Terms of Service are not eligible for refunds.',
      'Refunds are not available for partial billing periods after cancellation.',
    ],
  },
  {
    title: '3. How to Request a Refund',
    content:
      'Email us at support@geteasycv.com from your registered account email. Include your full name and the reason for the refund (optional but helpful). We will process your request within 2 business days.',
    links: [{ text: 'Contact our support team', href: '/contact' }],
  },
  {
    title: '4. Processing Time',
    content:
      'Approved refunds are credited back to your original payment method within 5–10 business days, depending on your bank or card issuer. You will receive a confirmation email once the refund is processed.',
  },
  {
    title: '5. Cancellation vs Refund',
    content:
      'Cancelling your subscription stops future billing but does not automatically trigger a refund. If you cancel within the 7-day window and want a refund for the current period, you must explicitly request one via email.',
  },
  {
    title: '6. Annual Plans',
    content:
      'Annual plan refunds are available within 7 days of the initial purchase date. After 7 days, annual subscriptions are non-refundable, but you may cancel to stop the next renewal.',
  },
  {
    title: '7. Contact',
    content:
      'For refund requests or billing questions, reach us at support@geteasycv.com. We aim to respond within 24 hours on business days.',
    links: [{ text: 'Go to contact page', href: '/contact' }],
  },
];

export default function RefundPolicyPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="bg-white border-b border-slate-100 py-14 px-4">
          <div className="max-w-3xl mx-auto flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <RefreshCw className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Refund Policy</h1>
              <p className="text-sm text-slate-500 mt-1">
                Last updated:{' '}
                {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </section>

        {/* Guarantee badge */}
        <section className="max-w-3xl mx-auto px-4 pt-10">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 text-lg font-black">
              7
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-800">7-Day Money-Back Guarantee</p>
              <p className="text-sm text-emerald-700 mt-0.5">
                Every premium plan comes with a full refund within 7 days of purchase. No hassle, no hoops.
              </p>
            </div>
          </div>
        </section>

        {/* Sections */}
        <section className="max-w-3xl mx-auto px-4 py-8 pb-14 space-y-5">
          {SECTIONS.map((section) => (
            <div key={section.title} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
              <h2 className="text-sm font-bold text-slate-900">{section.title}</h2>
              {section.content && (
                <p className="text-sm text-slate-600 leading-relaxed">{section.content}</p>
              )}
              {section.items && (
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.links?.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-semibold text-violet-600 hover:underline block mt-1"
                >
                  {l.text} →
                </Link>
              ))}
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
