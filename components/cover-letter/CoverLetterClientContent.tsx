"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InnerBanner from "@/components/InnerBanner";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import FAQ from "@/components/FAQ";
import { COVER_LETTER_FAQS } from "@/data/faqs";
import CoverLetterRenderer from "@/components/cover-letter/CoverLetterRenderer";
import CoverLetterPreviewModal from "@/components/cover-letter/CoverLetterPreviewModal";
import {
  coverLetterTemplates,
  coverLetterCategories,
  CoverLetterTemplate,
} from "@/data/coverLetterTemplates";
import {
  Sparkles,
  ArrowRight,
  Eye,
  Check,
  Search,
  SlidersHorizontal,
  ShieldCheck,
  FileText,
  Zap,
  Edit3,
  Bot,
  Award,
  Layers,
  Flame,
  CheckCircle2,
  Download,
} from "lucide-react";

const AI_FEATURES = [
  {
    icon: Bot,
    bg: "#FEE1CF",
    title: "AI Tone Adjuster",
    description: "Switch seamlessly between Professional, Enthusiastic, Executive, and Creative tones.",
  },
  {
    icon: Zap,
    bg: "#BAC7FE",
    title: "Job-Description Matching",
    description: "Paste a job description and AI automatically injects required keywords and skills.",
  },
  {
    icon: Edit3,
    bg: "#F5D17B",
    title: "Live Rich-Text Editing",
    description: "Tweak paragraphs, add bullets, and customize formatting with live side-by-side preview.",
  },
  {
    icon: Layers,
    bg: "#D0B9EF",
    title: "Matching Resume Themes",
    description: "Pair your cover letter layout with your resume template for a unified job application.",
  },
];

export default function CoverLetterClientContent() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<CoverLetterTemplate | null>(null);

  const filteredTemplates = useMemo(() => {
    return coverLetterTemplates.filter((t) => {
      const matchesCategory =
        selectedCategory === "all" || t.category === selectedCategory;
      const matchesSearch =
        !search.trim() ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-[#F8F8F6] text-[#0F0F0F] font-sans">
        <InnerBanner
          badge="AI Cover Letter Builder"
          badgeIcon={Sparkles}
          breadcrumbs={[{ label: "Cover Letter", href: "/cover-letter" }]}
          title="Write Job-Targeted"
          highlightText="Cover Letters"
          titleSuffix="in Seconds"
          description="Pair your resume with a tailored cover letter. Use AI to align your skills with any job description, customize matching templates, and export high-res PDFs."
          primaryAction={{
            label: "Create Cover Letter Now",
            href: "/cover-letter/editor",
          }}
          secondaryAction={{
            label: "Browse Resume Templates",
            href: "/templates",
          }}
          features={[
            "Job Description Matching",
            "Matching Resume Designs",
            "Instant PDF Download",
          ]}
        >
          <div className="relative max-w-xl">
            <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-[#F3645C]/30 transition-all">
              <input
                type="text"
                placeholder="Search cover letter templates by name or field..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent px-4 py-2 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                className="flex shrink-0 items-center justify-center rounded-lg bg-[#0F0F0F] hover:bg-black p-2.5 text-sm font-semibold text-white shadow-xs transition-all"
                title="Search Cover Letter Templates"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </InnerBanner>

        <div className="marketing-container py-12 sm:py-16 space-y-12 sm:space-y-16">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Cover Letter Templates
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-normal mt-0.5">
                Designed to match GetEasyCV resume themes perfectly.
              </p>
            </div>

            <Link
              href="/cover-letter/editor"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F0F0F] hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
            >
              <span>Open Cover Letter Editor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-[#0F0F0F] text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              All Designs ({coverLetterTemplates.length})
            </button>
            {coverLetterCategories.map((cat) => {
              const count = coverLetterTemplates.filter((t) => t.category === cat.id).length;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#0F0F0F] text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50"
                  }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[1/1.3] w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-200/60 p-3 flex flex-col justify-between">
                  <div className="origin-top scale-[0.62] transform-gpu">
                    <CoverLetterRenderer template={template} data={(template as any).previewData || (template as any).sampleData} />
                  </div>

                  {template.isPopular && (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 text-[10px] font-extrabold uppercase shadow-2xs">
                      <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
                      Popular
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#F3645C] transition-colors">
                        {template.name}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {template.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed line-clamp-2">
                      {template.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <Link
                      href={`/cover-letter/editor?template=${template.id}`}
                      className="flex-1 text-center py-2.5 bg-[#0F0F0F] hover:bg-black text-white font-bold text-xs rounded-xl shadow-2xs transition-all cursor-pointer"
                    >
                      Use Template
                    </Link>
                    <button
                      onClick={() => setPreviewTemplate(template)}
                      className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer"
                      title="Preview Template"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-200/80 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                AI Cover Letter Features
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                Everything you need to write compelling cover letters that land job interviews.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {AI_FEATURES.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-2xs"
                      style={{ background: feat.bg }}
                    >
                      <Icon className="w-5 h-5 text-[#0F0F0F]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <FAQ
          items={COVER_LETTER_FAQS}
          badge="Cover Letter Help"
          title="Frequently Asked"
          highlightText="Questions"
          subtitle="Learn how to structure, customize, and export professional cover letters for job applications."
          showContactCta={true}
          bgStyle="#FFFFFF"
        />

        <ReadyToBuild />
      </main>

      {previewTemplate && (
        <CoverLetterPreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
        />
      )}

      <Footer />
    </>
  );
}
