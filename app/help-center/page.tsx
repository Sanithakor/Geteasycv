"use client";

import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import InnerBanner from "@/components/InnerBanner";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import FAQ from "@/components/FAQ";
import { ALL_FAQS, FAQ_CATEGORIES } from "@/data/faqs";
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
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function HelpCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      articlesCount: "8 Articles",
      description: "Learn how to choose a template, create your first resume, and use AI features.",
      accent: "#BAC7FE",
    },
    {
      icon: FileText,
      title: "Editing & Formatting",
      articlesCount: "12 Articles",
      description: "Add custom sections, reorder resume items, change fonts, and customize margins.",
      accent: "#F5D17B",
    },
    {
      icon: Download,
      title: "PDF Export & Downloads",
      articlesCount: "6 Articles",
      description: "Troubleshoot PDF downloads, print settings, and multi-page preview formatting.",
      accent: "#58C09D",
    },
    {
      icon: CreditCard,
      title: "Billing & Subscription",
      articlesCount: "10 Articles",
      description: "Manage subscription plans, update payment methods, download invoices, or cancel anytime.",
      accent: "#D0B9EF",
    },
    {
      icon: ShieldCheck,
      title: "ATS Scanning & Tips",
      articlesCount: "7 Articles",
      description: "Understand Applicant Tracking Systems, keyword optimization, and resume scoring.",
      accent: "#FEE1CF",
    },
    {
      icon: MessageSquare,
      title: "Account & Support",
      articlesCount: "5 Articles",
      description: "Reset password, update account email, manage data privacy, and contact support.",
      accent: "#BAC7FE",
    },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F8F8F6] text-[#0F0F0F] font-sans">
        <InnerBanner
          badge="Knowledge Base & Guidance"
          badgeIcon={HelpCircle}
          breadcrumbs={[{ label: "Help Center", href: "/help-center" }]}
          title="How Can We"
          highlightText="Help You Today?"
          description="Search our knowledge base for instant answers on templates, downloads, ATS scanning, and billing."
          primaryAction={{
            label: "Create Resume Free",
            href: "/templates",
          }}
          secondaryAction={{
            label: "Contact Support",
            href: "/contact",
          }}
          features={[
            "Instant Search Results",
            "Comprehensive Tutorials",
            "Step-by-Step Troubleshooting",
          ]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
          {/* Help Categories Grid */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200/80 bg-white text-[#0F0F0F] text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#F3645C]" />
                <span>Explore Topics</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F0F0F]">
                Browse by <span style={{ color: "#F3645C" }}>Knowledge Category</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {categories.map((cat, idx) => {
                const CatIcon = cat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: cat.accent }}
                        >
                          <CatIcon className="w-6 h-6 text-[#0F0F0F]" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {cat.articlesCount}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#F3645C] transition-colors">
                          {cat.title}
                        </h3>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Global Searchable FAQ Accordion */}
        <FAQ
          items={ALL_FAQS}
          badge="Frequently Asked Questions"
          title="Instant Help &"
          highlightText="Troubleshooting"
          subtitle="Search any topic or browse categorized answers directly below."
          showSearch={true}
          showCategories={true}
          categories={FAQ_CATEGORIES}
          showContactCta={true}
          bgStyle="#FFFFFF"
        />
      </main>
      <ReadyToBuild />
      <Footer />
    </>
  );
}
