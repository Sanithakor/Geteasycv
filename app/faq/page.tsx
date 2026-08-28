'use client';

import React from "react";
import Navigation from "@/components/Navigation";
import InnerBanner from "@/components/InnerBanner";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronDown, ChevronUp, Search, HelpCircle, Sparkles } from "lucide-react";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaOrg";

const FALLBACK_FAQS = [
  {
    category: 'Getting Started',
    question: 'Is GetEasyCV free to use?',
    answer: 'Yes — our free plan gives you access to standard templates, PDF export, and AI assistance credits per month. Premium plans unlock all templates, unlimited AI features, and high-resolution export options.',
  },
  {
    category: 'Templates',
    question: 'Are the resumes ATS-friendly?',
    answer: 'Absolutely. Every template is designed and tested against leading Applicant Tracking Systems (ATS). We ensure clean font parsing, proper section headings, and structured metadata.',
  },
  {
    category: 'Export',
    question: 'What formats can I download my resume in?',
    answer: 'You can export as high-quality PDF or high-resolution PNG/JPG image files ready for printing or uploading directly to job portals.',
  },
  {
    category: 'AI Features',
    question: 'How does the AI assist feature work?',
    answer: 'Inside the builder, click the AI button next to any field. Our AI analyzes your role and experience to generate polished, recruiter-proven summaries and bullet points.',
  },
  {
    category: 'Billing',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel anytime from your account settings. You maintain access to all premium features through the end of your billing cycle.',
  },
  {
    category: 'Security',
    question: 'Is my resume data secure and private?',
    answer: 'Your data is encrypted using industry-standard protocols. Your resumes are private by default and never shared with third parties.',
  },
];

const CATEGORIES = ['All', 'Getting Started', 'Templates', 'Export', 'AI Features', 'Billing', 'Security'];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white ${open ? 'shadow-sm border-[#FF570F]' : ''}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-sm font-bold text-slate-900">{question}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[#FF570F] shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-5 pt-0 bg-white border-t border-slate-100">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-3">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq' }]} />
      <Navigation />

      <main className="min-h-screen bg-[#F8F8F6] text-[#0F0F0F] font-sans">
        <InnerBanner
          badge="Help & Answers"
          badgeIcon={HelpCircle}
          breadcrumbs={[{ label: "FAQ", href: "/faq" }]}
          title="Frequently Asked"
          highlightText="Questions"
          description="Find quick, clear answers to common questions about our resume builder, ATS compatibility, AI writer, and account features."
          primaryAction={{
            label: "Create Resume Free",
            href: "/templates",
          }}
          secondaryAction={{
            label: "Contact Support",
            href: "/contact",
          }}
          features={[
            "Instant Guidance",
            "ATS Tips & Insights",
            "Account & Billing Help",
          ]}
        />

        <div className="py-12 sm:py-16">
          <FAQ
            items={ALL_FAQS}
            badge="Search Knowledge Base"
            title="Browse All"
            highlightText="Questions & Topics"
            subtitle="Filter by category or search for specific keywords to get instant answers."
            showSearch={true}
            showCategories={true}
            categories={FAQ_CATEGORIES}
            showContactCta={true}
            variant="embedded"
          />
        </div>
      </main>

      <ReadyToBuild />
      <Footer />
    </>
  );
}
