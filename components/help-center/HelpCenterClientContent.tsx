"use client";

import React from "react";
import Navigation from "@/components/Navigation";
import InnerBanner from "@/components/InnerBanner";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import FAQ from "@/components/FAQ";
import { ALL_FAQS } from "@/data/faqs";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  HelpCircle,
  FileText,
  Download,
  CreditCard,
  ShieldCheck,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

export default function HelpCenterClientContent() {
  return (
    <>
      <Navigation />

      <main className="font-sans min-h-screen bg-[#F8F8F6]">
        <InnerBanner
          badge="Customer Support & Help Hub"
          badgeIcon={HelpCircle}
          breadcrumbs={[{ label: "Help Center", href: "/help-center" }]}
          title="How Can We Help"
          highlightText="You Today?"
          description="Browse user guides, troubleshooting steps, and customer support resources for your GetEasyCV account."
          primaryAction={{
            label: "Contact Support",
            href: "/contact",
          }}
          secondaryAction={{
            label: "Browse FAQ",
            href: "/faq",
          }}
          features={[
            "Fast Support Response",
            "Account & Billing Guides",
            "Export Help",
          ]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF5722] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Resume Building</h3>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                Learn how to edit sections, choose templates, and format bullet points.
              </p>
              <Link href="/faq" className="text-xs font-bold text-[#FF5722] hover:underline flex items-center gap-1">
                <span>View Articles</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Downloads & PDF</h3>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                Troubleshoot PDF downloads, layout margins, and print resolution.
              </p>
              <Link href="/faq" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                <span>View Articles</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Billing & Refunds</h3>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                Questions about receipt invoices, subscriptions, and refund policy.
              </p>
              <Link href="/refund" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
                <span>View Policy</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Account & Privacy</h3>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                Manage login methods, password resets, and personal profile security.
              </p>
              <Link href="/privacy" className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1">
                <span>Privacy Info</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <FAQ
            items={ALL_FAQS.slice(0, 6)}
            badge="Popular Help Articles"
            title="Common Help Topics"
            highlightText="Answered"
            subtitle="Quick guides for common questions."
            variant="embedded"
          />
        </div>

        <ReadyToBuild />
      </main>

      <Footer />
    </>
  );
}
