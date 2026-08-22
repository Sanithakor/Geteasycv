"use client";

import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  HelpCircle,
  Search,
  BookOpen,
  FileText,
  Download,
  CreditCard,
  ShieldCheck,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      articlesCount: "8 Articles",
      description: "Learn how to choose a template, create your first resume, and use AI features.",
    },
    {
      icon: FileText,
      title: "Editing & Formatting",
      articlesCount: "12 Articles",
      description: "Add custom sections, reorder resume items, change fonts, and customize margins.",
    },
    {
      icon: Download,
      title: "PDF Export & Downloads",
      articlesCount: "6 Articles",
      description: "Troubleshoot PDF downloads, print settings, and multi-page preview formatting.",
    },
    {
      icon: CreditCard,
      title: "Billing & Subscription",
      articlesCount: "10 Articles",
      description: "Manage subscription plans, update payment methods, download invoices, or cancel anytime.",
    },
    {
      icon: ShieldCheck,
      title: "ATS Scanning & Tips",
      articlesCount: "7 Articles",
      description: "Understand Applicant Tracking Systems, keyword optimization, and resume scoring.",
    },
    {
      icon: MessageSquare,
      title: "Account & Support",
      articlesCount: "5 Articles",
      description: "Reset password, update account email, manage data privacy, and contact support.",
    },
  ];

  const popularArticles = [
    { title: "How do I download my resume as a PDF?", cat: "PDF Export & Downloads" },
    { title: "How can I customize colors and fonts in my resume?", cat: "Editing & Formatting" },
    { title: "What is an ATS score and how is it calculated?", cat: "ATS Scanning & Tips" },
    { title: "How do I cancel or modify my subscription plan?", cat: "Billing & Subscription" },
    { title: "Can I create multiple resumes with a single account?", cat: "Getting Started" },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 font-sans py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF8F5] border border-[#FFD4C2] text-[#E04800] text-xs font-bold uppercase tracking-wider mb-4">
              <HelpCircle className="w-4 h-4 text-[#FF570F]" />
              <span>GETEASYCV HELP CENTER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              How Can We Help You?
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              Search our knowledge base for instant answers on templates, downloads, ATS scanning, and billing.
            </p>

            {/* Search Input */}
            <div className="relative max-w-xl mx-auto">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles, guides, or troubleshooting..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200/90 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#FF570F]/25 shadow-xs text-slate-900"
              />
            </div>
          </div>

          {/* Help Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categories.map((cat, idx) => {
              const CatIcon = cat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-md border border-slate-200/80 p-6 shadow-xs hover:shadow-lg transition-all text-left flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-10 h-10 rounded-md bg-[#FFF0EB]/70 text-[#FF570F] flex items-center justify-center shrink-0">
                        <CatIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {cat.articlesCount}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {cat.description}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-[#FF570F] flex items-center gap-1 hover:underline cursor-pointer">
                    <span>Browse category articles</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              );
            })}
          </div>

          {/* Popular Articles */}
          <div className="bg-white rounded-md border border-slate-200/80 p-8 sm:p-10 shadow-xs mb-16 max-w-4xl mx-auto text-left">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Frequently Read Help Guides
            </h2>
            <div className="divide-y divide-slate-100">
              {popularArticles.map((art, aIdx) => (
                <div
                  key={aIdx}
                  className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50 px-3 rounded-md transition-colors cursor-pointer"
                >
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">
                      {art.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-medium">
                      In {art.cat}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Still Need Help Box */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-md p-8 sm:p-10 text-white text-center shadow-xl max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              Still Have Questions?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-md mx-auto">
              Our dedicated support team is available 24/7 to assist with your resume formatting, template issues, or billing.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF570F] hover:bg-[#E04800] text-white font-bold rounded-md shadow-md transition-all text-xs sm:text-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Support Team</span>
            </Link>
          </div>
        </div>
      </main>
      <ReadyToBuild />
      <Footer />
    </>
  );
}
