import Navigation from "@/components/Navigation";
import InnerBanner from "@/components/InnerBanner";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

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
      'Email us at info@geteasycv.com from your registered account email. Include your full name and the reason for the refund (optional but helpful). We will process your request within 2 business days.',
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
      'For refund requests or billing questions, reach us at info@geteasycv.com. We aim to respond within 24 hours on business days.',
    links: [{ text: 'Go to contact page', href: '/contact' }],
  },
];

export default function RefundPolicyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F8F8F6] text-[#0F0F0F] font-sans">
        <InnerBanner
          badge="Satisfaction Guaranteed"
          badgeIcon={ShieldCheck}
          breadcrumbs={[{ label: "Refund Policy", href: "/refund" }]}
          title="7-Day Money-Back"
          highlightText="Guarantee"
          description="We stand behind our product. If you're not completely satisfied with your premium plan within the first 7 days, get a full refund — no hassle."
          primaryAction={{
            label: "Create Resume Free",
            href: "/templates",
          }}
          secondaryAction={{
            label: "Contact Support",
            href: "/contact",
          }}
          features={[
            "100% Full Refund Within 7 Days",
            "Processed in 2 Business Days",
            "Zero Questions Asked",
          ]}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Sections */}
          <div className="space-y-5">
            {SECTIONS.map((section) => (
              <div key={section.title} className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-3 shadow-2xs">
                <h2 className="text-base font-bold text-slate-900">{section.title}</h2>
                {section.content && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{section.content}</p>
                )}
                {section.items && (
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#58C09D] mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.links?.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-xs font-bold text-[#F3645C] hover:underline inline-block mt-2"
                  >
                    {l.text} {'→'}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>

      <ReadyToBuild />
      <Footer />
    </>
  );
}
