'use client';

import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import InnerBanner from "@/components/InnerBanner";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { ALL_FAQS, FAQ_CATEGORIES } from "@/data/faqs";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaOrg";

export default function FAQPage() {
  const schemaFaqs = ALL_FAQS.map(f => ({ question: f.question, answer: f.answer }));

  return (
    <>
      <FAQSchema faqs={schemaFaqs} />
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
