'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ChevronDown, ChevronUp, MessageCircle, Sparkles, Search } from 'lucide-react';

const FALLBACK_FAQS = [
  {
    category: 'Getting Started',
    question: 'Is GetEasyCV free to use?',
    answer: 'Yes — our free plan gives you access to basic templates, PDF export, and 10 AI credits per month. Premium plans unlock all templates, unlimited AI, and advanced export options.',
  },
  {
    category: 'Templates',
    question: 'Are the resumes ATS-friendly?',
    answer: 'Absolutely. Every template is designed to pass Applicant Tracking Systems (ATS). We avoid tables, multi-column layouts on ATS-strict templates, and unusual fonts that confuse parsers.',
  },
  {
    category: 'Export',
    question: 'What formats can I download my resume in?',
    answer: 'You can export as high-quality PDF, PNG, or JPG. PDF is recommended for job applications. PNG/JPG are great for portfolios and LinkedIn banners.',
  },
  {
    category: 'AI Features',
    question: 'How does the AI assist feature work?',
    answer: 'Each editable field shows a small AI button. Click it and our AI analyzes your current content plus the template style, then suggests an improved version. You can accept, edit, or reject the suggestion — it only updates the field you clicked.',
  },
  {
    category: 'AI Features',
    question: 'How many AI credits do I get?',
    answer: 'Free plan: 10 credits/month. Pro plan: 100 credits/month. Premium plan: unlimited. Credits reset on your billing renewal date.',
  },
  {
    category: 'Billing',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, cancel anytime from your account settings. You keep premium access until the end of your current billing period — no surprise charges.',
  },
  {
    category: 'Security',
    question: 'Is my resume data secure and private?',
    answer: 'Your data is encrypted at rest and in transit. We never sell personal information. Resumes are private by default — only you can access them unless you explicitly share a link.',
  },
  {
    category: 'Getting Started',
    question: 'Can I use GetEasyCV on mobile?',
    answer: 'Yes, the site is fully responsive. For the best editing experience on complex resumes, we recommend a desktop or tablet with a larger screen.',
  },
];

const CATEGORIES = ['All', ...Array.from(new Set(FALLBACK_FAQS.map((f) => f.category)))];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border border-slate-200 rounded-2xl overflow-hidden transition-all ${open ? 'shadow-sm' : ''}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-slate-900">{question}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-violet-500 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-0 bg-white border-t border-slate-100">
          <p className="text-sm text-slate-600 leading-relaxed">{answer}</p>
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
      <Navigation />
      <main>
        {/* Hero */}
        <section className="bg-white border-b border-slate-100 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200">
              <Sparkles className="w-3.5 h-3.5" /> Support Center
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h1>
            <p className="text-base text-slate-500 max-w-xl mx-auto">
              Everything you need to know about GetEasyCV. Can't find the answer? Contact our support team.
            </p>
            {/* Search */}
            <div className="relative max-w-md mx-auto mt-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="search"
                placeholder="Search questions…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search FAQ"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-3xl mx-auto px-4 py-14">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p className="font-semibold">No results found</p>
                <p className="text-sm mt-1">Try a different search term or category</p>
              </div>
            ) : (
              filtered.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))
            )}
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-2xl bg-violet-50 border border-violet-200 p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center mx-auto">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Still have questions?</h3>
              <p className="text-sm text-slate-500 mt-1">Our support team typically replies within 24 hours on business days.</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm transition-all shadow-sm"
            >
              Contact Support
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
