import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — GetEasyCV',
  description: 'Learn how GetEasyCV collects, uses, and protects your personal information.',
};

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: [
      'Account information you provide when registering: name, email address, and password.',
      'Resume content you create: professional details, work history, education, and skills.',
      'Payment information processed securely by our payment provider (we never store raw card data).',
      'Usage data: pages visited, features used, and device/browser information for analytics.',
      'Communications: messages you send to our support team.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: [
      'To provide, maintain, and improve the GetEasyCV service.',
      'To generate and format your resume documents.',
      'To process payments and send billing confirmations.',
      'To respond to your support requests.',
      'To send product updates and feature announcements (you can opt out at any time).',
      'We do not sell your personal data or resume content to any third party.',
    ],
  },
  {
    title: '3. Data Storage and Security',
    content: [
      'Your data is stored on secure servers with encryption at rest and in transit (TLS).',
      'Resume data is private by default — only you can access it unless you share a link.',
      'We implement technical and organisational controls to prevent unauthorised access.',
      'We retain your data for as long as your account is active, or as required by law.',
    ],
  },
  {
    title: '4. Cookies and Tracking',
    content: [
      'We use essential cookies to maintain your login session.',
      'We use analytics cookies to understand how the product is used and improve it.',
      'You can disable non-essential cookies in your browser settings.',
      'We do not use advertising or third-party tracking cookies.',
    ],
  },
  {
    title: '5. Third-Party Services',
    content: [
      'Payment processing is handled by our payment provider (Stripe / Lemon Squeezy). Their privacy policies apply to payment data.',
      'AI content suggestions are processed via OpenAI API. Content sent for AI processing is not stored by OpenAI beyond the request.',
      'Analytics are processed in an aggregated, anonymised form.',
    ],
  },
  {
    title: '6. Your Rights',
    content: [
      'Access: request a copy of the personal data we hold about you.',
      'Correction: ask us to fix inaccurate data.',
      'Deletion: request deletion of your account and associated data.',
      'Export: download your resume data at any time from your dashboard.',
      'Opt-out: unsubscribe from marketing emails via the link in any email.',
    ],
  },
  {
    title: '7. Changes to This Policy',
    content: [
      'We may update this policy from time to time. Material changes will be communicated by email or an in-app notice.',
      'The date at the top of this page always reflects the most recent revision.',
    ],
  },
  {
    title: '8. Contact Us',
    content: [
      'Questions about this policy or how we handle your data? Reach us at support@geteasycv.com.',
    ],
    links: [{ text: 'Contact our support team', href: '/contact' }],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="bg-white border-b border-slate-100 py-14 px-4">
          <div className="max-w-3xl mx-auto flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center shrink-0">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
              <p className="text-sm text-slate-500 mt-1">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-3xl mx-auto px-4 py-12 space-y-8">
          <p className="text-slate-600 leading-relaxed text-sm">
            GetEasyCV is committed to protecting your privacy. This policy explains what information we collect,
            how we use it, and what choices you have. By using GetEasyCV, you agree to the practices described here.
          </p>

          {SECTIONS.map((section) => (
            <div key={section.title} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
              <h2 className="text-base font-bold text-slate-900">{section.title}</h2>
              <ul className="space-y-2">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              {section.links?.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm font-semibold text-violet-600 hover:underline block mt-1">
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
