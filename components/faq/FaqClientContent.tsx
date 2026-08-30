'use client';

import React from "react";
import Navigation from "@/components/Navigation";
import InnerBanner from "@/components/InnerBanner";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { ALL_FAQS } from "@/data/faqs";
import { HelpCircle } from "lucide-react";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/SchemaOrg";

export default function FaqClientContent() {
  const schemaFaqs = ALL_FAQS.map(f => ({ question: f.question, answer: f.answer }));

  return (
    <>
      <FAQSchema faqs={schemaFaqs} />
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq' }]} />
      <Navigation />

      <main className="font-sans min-h-screen bg-[#F8F8F6]">
        <InnerBanner
          badge="Got Questions?"
          badgeIcon={undefined}
          breadcrumbs={[{ label: 'FAQ', href: '/faq' }]}
          title="Frequently Asked"
          highlightText="Questions"
          description="Find answers to common questions about our resume builder, ATS templates, account features, and pricing."
          primaryAction={{ label: 'Create My Resume', href: '/templates' }}
          secondaryAction={{ label: 'Contact Support', href: '/contact' }}
          features={['Instant Answers', '24/7 Support', 'ATS Guidance']}
        />

        <div className="max-w-4xl mx-auto px-4 py-12">
          <FAQ
            items={ALL_FAQS}
            badge="All Platform FAQs"
            title="Help & Support"
            highlightText="Answers"
            subtitle="Search through comprehensive answers regarding resume formatting, ATS compatibility, downloads, and payments."
            variant="embedded"
          />
        </div>

        <ReadyToBuild />
      </main>

      <Footer />
    </>
  );
}
