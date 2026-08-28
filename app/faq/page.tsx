'use client';

import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
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
  const [faqs, setFaqs] = useState(FALLBACK_FAQS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/faqs')
      .then((r) => r.json())
      .then((d) => { if (d?.success && d.data?.length > 0) setFaqs(d.data); })
      .catch(() => {});
  }, []);

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === 'All' || f.category === activeCategory;
    const matchSearch = !search || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq' }]} />
      <Navigation />

      <main className="min-h-screen bg-slate-50/50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFF8F5] border border-[#FF570F] rounded-full text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Help & Answers</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Find instant answers to common questions about our resume builder, ATS compatibility, and account features.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 mb-8">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#FF570F] focus:ring-2 focus:ring-[#FF570F]/20 outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-[#FF570F] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200/80">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-900">No questions found</h3>
                <p className="text-xs text-slate-500 mt-1">Try searching for a different keyword or topic.</p>
              </div>
            ) : (
              filtered.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))
            )}
          </div>

          {/* Contact Support Banner */}
          <div className="mt-12 text-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-[#FF570F]/80 shadow-2xs">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Still have questions?</h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-5 max-w-md mx-auto">
              Our friendly customer support team is ready to help you land your dream role.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#FF570F] hover:bg-[#E04800] text-white font-bold text-xs shadow-md shadow-[#FF570F]/25 transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      <ReadyToBuild />
      <Footer />
    </>
  );
}
