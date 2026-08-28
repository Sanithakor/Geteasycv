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
    color: "#F3645C",
    title: "AI Writing Assistant",
    description: "Generate tailored, high-impact paragraphs in seconds based on your experience and target role.",
  },
  {
    icon: FileText,
    bg: "#BAC7FE",
    color: "#2563EB",
    title: "Role-Specific Content",
    description: "Personalized cover letter copy mapped to specific industry requirements and company goals.",
  },
  {
    icon: Zap,
    bg: "#F5D17B",
    color: "#D97706",
    title: "Smart Suggestions",
    description: "Get real-time AI recommendations to strengthen opening hooks, quantifiable wins, and sign-offs.",
  },
  {
    icon: Edit3,
    bg: "#D0B9EF",
    color: "#7C3AED",
    title: "Tone Customization",
    description: "Effortlessly adjust tone between Professional, Confident, Friendly, and Creative voices.",
  },
  {
    icon: ShieldCheck,
    bg: "#58C09D33",
    color: "#059669",
    title: "ATS-Friendly Formatting",
    description: "Structured headings and clean formatting designed to pass applicant tracking system filters.",
  },
  {
    icon: Award,
    bg: "#FEE1CF",
    color: "#F3645C",
    title: "Instant Export Options",
    description: "Download in high-resolution PDF, editable text, or copy directly to your clipboard.",
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    num: 1,
    icon: FileText,
    title: "Choose Template",
    description: "Select from our curated collection of professional, ATS-friendly cover letter layouts.",
    accent: "#BAC7FE",
  },
  {
    num: 2,
    icon: Edit3,
    title: "Add Job Details",
    description: "Enter your target job title, company name, and key qualifications or paste your resume details.",
    accent: "#F5D17B",
    featured: true,
  },
  {
    num: 3,
    icon: Sparkles,
    title: "AI Crafts Your Story",
    description: "Our AI generates a persuasive, role-tailored letter showcasing your achievements.",
    accent: "#D0B9EF",
  },
  {
    num: 4,
    icon: Download,
    title: "Review & Export",
    description: "Fine-tune any sentence, change color themes, and export your polished cover letter instantly.",
    accent: "#58C09D",
  },
];

function TemplateListingCard({
  template,
  onPreview,
}: {
  template: CoverLetterTemplate;
  onPreview: (template: CoverLetterTemplate) => void;
}) {
  const [activeColor, setActiveColor] = useState(template.accentColor);

  return (
    <article className="group relative flex h-full flex-col justify-between rounded-2xl border border-[#0F0F0F]/10 bg-white p-3 sm:p-3.5 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div>
        {/* Document Thumbnail Preview Container */}
        <div className="relative aspect-[1/1.22] w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-2xs group-hover:border-[#0F0F0F]/20 transition-all">
          {/* Scaled Render of the Real Template */}
          <div className="pointer-events-none select-none w-[450px] origin-top-left scale-[0.47] sm:scale-[0.49] xl:scale-[0.45] p-1">
            <CoverLetterRenderer
              template={template}
              accentColor={activeColor}
              isCompact={true}
            />
          </div>

          {/* Hover Overlay with Action Buttons */}
          <div className="absolute inset-0 bg-[#0F0F0F]/55 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-2.5">
            <button
              onClick={() => onPreview(template)}
              className="w-full max-w-[150px] flex items-center justify-center gap-1.5 rounded-xl bg-white hover:bg-slate-100 px-2.5 py-1.5 text-[11px] font-bold text-slate-900 shadow-md transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-slate-700" />
              <span>Preview</span>
            </button>
            <Link
              href={`/cover-letter/editor?template=${template.id}&color=${encodeURIComponent(activeColor)}`}
              className="w-full max-w-[150px] flex items-center justify-center gap-1.5 rounded-xl bg-[#F3645C] hover:bg-[#D95350] px-2.5 py-1.5 text-[11px] font-bold text-white shadow-md transition-all cursor-pointer text-center"
            >
              <span>Use Template</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Template Meta Information */}
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between gap-1">
            <span className="rounded-full bg-[#FFF0EB] border border-[#FFD4C2]/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#F3645C]">
              {template.categoryLabel}
            </span>
            {template.isAtsFriendly && (
              <span className="inline-flex items-center gap-1 text-[9.5px] font-semibold text-emerald-600">
                <ShieldCheck className="w-3 h-3" />
                ATS
              </span>
            )}
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#F3645C] transition-colors truncate">
              {template.name}
            </h3>
            <p className="text-[10px] sm:text-[10.5px] text-slate-500 font-medium truncate">
              {template.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Footer: Color Swatches & Action Button */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
        {/* Color Option Swatches */}
        <div className="flex items-center gap-1">
          {template.colorOptions.map((color) => {
            const isSelected = activeColor === color.hex;
            return (
              <button
                key={color.hex}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveColor(color.hex);
                }}
                title={color.name}
                className={`h-3 w-3 rounded-full border transition-all cursor-pointer ${
                  isSelected
                    ? "scale-125 border-slate-900 ring-1 ring-slate-900/30"
                    : "border-slate-300 hover:scale-110"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            );
          })}
        </div>

        {/* Use Template Link */}
        <Link
          href={`/cover-letter/editor?template=${template.id}&color=${encodeURIComponent(activeColor)}`}
          className="inline-flex items-center gap-1 text-[10.5px] font-bold text-slate-900 hover:text-[#F3645C] transition-colors"
        >
          <span>Use</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
}

export default function CoverLetterPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [previewModalTemplate, setPreviewModalTemplate] = useState<CoverLetterTemplate | null>(null);
  const [activeShowcaseIndex, setActiveShowcaseIndex] = useState(0);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return coverLetterTemplates.filter((template) => {
      // Category match
      if (selectedCategory !== "all" && template.category !== selectedCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const searchable = [
          template.name,
          template.subtitle,
          template.description,
          template.categoryLabel,
          template.sampleData.fullName,
          template.sampleData.jobTitle,
          template.sampleData.companyName,
        ].join(" ").toLowerCase();

        if (!searchable.includes(query)) return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Sort templates
  const sortedTemplates = useMemo(() => {
    const list = [...filteredTemplates];
    if (sortBy === "name") {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list; // default popular
  }, [filteredTemplates, sortBy]);

  const activeShowcaseTemplate = coverLetterTemplates[activeShowcaseIndex] || coverLetterTemplates[0];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#FFFFFF] text-[#0F0F0F] font-sans">
        
        {/* ========================================================================= */}
        {/* 1. HERO BANNER SECTION (InnerBanner)                                      */}
        {/* ========================================================================= */}
        <InnerBanner
          badge="AI COVER LETTER BUILDER"
          badgeIcon={Sparkles}
          pageType="cover-letter"
          breadcrumbs={[{ label: "Cover Letter", href: "/cover-letter" }]}
          title="Create a Professional"
          highlightText="Cover Letter"
          titleSuffix="in Minutes"
          description="Stand out with tailored, ATS-friendly cover letter templates written and styled to help you land interviews faster."
          primaryAction={{
            label: "Create Cover Letter Now",
            href: "/cover-letter/editor",
          }}
          secondaryAction={{
            label: "Browse All Templates",
            onClick: () => {
              const el = document.getElementById("templates-showcase");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            },
          }}
          features={[
            "AI-Powered Content Generation",
            "Professionally Formatted Templates",
            "ATS Optimized & Tested",
          ]}
        />

        {/* ========================================================================= */}
        {/* 2. TEMPLATE LISTING & FILTER SECTION (IN STANDARD CONTAINER)              */}
        {/* ========================================================================= */}
        <section id="templates-showcase" className="py-16 sm:py-24 bg-[#FFFFFF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#FFD4C2]/60 bg-[#FFF0EB] text-[#F3645C] text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Professionally Designed</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F0F0F]">
                Choose from Beautiful Cover Letter Templates
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
                Pick a template tailored with realistic content and designed to match your industry style.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="mb-10 space-y-5 border-b border-slate-200/80 pb-7">
              {/* Top Row: Search & Sort Controls */}
              <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search cover letter templates by role or style..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#F3645C] focus:ring-2 focus:ring-[#F3645C]/15 outline-none transition-all shadow-2xs"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:border-[#F3645C] focus:ring-2 focus:ring-[#F3645C]/15 outline-none transition-all cursor-pointer shadow-2xs"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                </div>
              </div>

              {/* Bottom Row: Category Filter Tabs (Wrapped, No Horizontal Scrollbar) */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                {coverLetterCategories.map((category) => {
                  const isSelected = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        isSelected
                          ? "bg-[#0F0F0F] text-white shadow-sm ring-1 ring-black/10"
                          : "border border-slate-200/90 bg-white text-slate-700 shadow-2xs hover:border-[#F3645C] hover:bg-[#FFF8F5]"
                      }`}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Template Cards Grid (5 Columns on Desktop: xl:grid-cols-5 within max-w-7xl) */}
            {sortedTemplates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-4.5">
                {sortedTemplates.map((template) => (
                  <TemplateListingCard
                    key={template.id}
                    template={template}
                    onPreview={(t) => setPreviewModalTemplate(t)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#F8F8F6] rounded-2xl border border-slate-200/80 p-8 space-y-4">
                <FileText className="mx-auto h-12 w-12 text-slate-300" />
                <h3 className="text-lg font-bold text-slate-800">No templates found</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                  No cover letter templates match your current filter or search criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0F0F0F] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-black transition-all cursor-pointer"
                >
                  <span>Reset Filters</span>
                </button>
              </div>
            )}

            {/* Bottom Section Link */}
            <div className="mt-12 text-center">
              <Link
                href="/cover-letter/editor"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0F0F0F] hover:bg-black px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all cursor-pointer"
              >
                <span>Start Writing Your Cover Letter</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE LIVE PREVIEW SHOWCASE SECTION                              */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-[#F8F8F6] border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Feature Highlights & Template Selector */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#0F0F0F]/10 bg-white text-[#0F0F0F] text-xs font-bold uppercase tracking-wider shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#F3645C]" />
                  <span>Interactive Live Showcase</span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F0F0F] leading-tight">
                    Beautiful Design.
                    <br />
                    <span className="text-[#F3645C]">Powerful Career Impact.</span>
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    Every cover letter template is crafted with realistic paragraph structures, quantified achievement hooks, and clean typography that stands out in hiring pipelines.
                  </p>
                </div>

                {/* Role Switcher Tabs */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    Switch Sample Template:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {coverLetterTemplates.slice(0, 4).map((tpl, idx) => {
                      const isActive = activeShowcaseIndex === idx;
                      return (
                        <button
                          key={tpl.id}
                          onClick={() => setActiveShowcaseIndex(idx)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isActive
                              ? "border-[#0F0F0F] bg-white shadow-sm ring-2 ring-[#0F0F0F]/10"
                              : "border-slate-200 bg-white/70 hover:bg-white text-slate-600"
                          }`}
                        >
                          <span className="text-xs font-bold text-slate-900 block truncate">
                            {tpl.name}
                          </span>
                          <span className="text-[11px] text-slate-500 block truncate">
                            {tpl.sampleData.jobTitle}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Feature Checklist */}
                <ul className="space-y-2.5 pt-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F3645C] shrink-0" />
                    <span>Real-world paragraphs with quantified accomplishments</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F3645C] shrink-0" />
                    <span>Tested for optimal readability and recruiter scan rates</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F3645C] shrink-0" />
                    <span>Full synchronization with our live AI Cover Letter editor</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link
                    href={`/cover-letter/editor?template=${activeShowcaseTemplate.id}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#F3645C] hover:bg-[#D95350] px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all cursor-pointer"
                  >
                    <span>Customize This Template</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: High-Fidelity Live Rendered Document */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="w-full max-w-[560px] rounded-2xl bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300">
                  <CoverLetterRenderer
                    template={activeShowcaseTemplate}
                    isCompact={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. AI-POWERED COVER LETTER FEATURES SECTION                               */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-[#FFFFFF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#0F0F0F]/10 bg-white text-[#0F0F0F] text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Bot className="w-3.5 h-3.5 text-[#F3645C]" />
                <span>Powered by AI</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F0F0F]">
                AI-Powered Cover Letters That Get You Noticed
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
                Our AI analyzes your experience and target job description to generate compelling, personalized letters that highlight your strengths.
              </p>
            </div>

            {/* Feature Cards Grid (6 items) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {AI_FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-[#0F0F0F]/10 bg-[#FFFFFF] p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-2xs"
                        style={{ backgroundColor: feature.bg }}
                      >
                        <Icon className="w-6 h-6" style={{ color: feature.color }} />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {feature.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. HOW IT WORKS (4 SIMPLE STEPS)                                          */}
        {/* ========================================================================= */}
        <section
          className="py-16 sm:py-24 overflow-hidden font-sans"
          style={{ background: "#FEE1CF" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="flex justify-center mb-5">
              <div
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider shadow-sm"
                style={{
                  background: "#FFFFFF",
                  borderColor: "rgba(15,15,15,0.15)",
                  color: "#0F0F0F",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: "#F3645C" }} />
                <span>EASY PROCESS</span>
              </div>
            </div>

            {/* Headline */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto mb-4"
              style={{ color: "#0F0F0F" }}
            >
              Create Your Cover Letter in{" "}
              <span style={{ color: "#F3645C" }}>4 Simple Steps</span>
            </h2>

            <p
              className="text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed mb-16 sm:mb-20"
              style={{ color: "#333333" }}
            >
              Fast, easy, and effective — let AI assist you in creating a high-impact cover letter.
            </p>

            {/* Steps */}
            <div className="relative max-w-6xl mx-auto mb-16">
              {/* Connector line */}
              <div
                className="hidden lg:block absolute top-[22px] left-[11%] right-[11%] h-[2px] z-0"
                style={{ background: "rgba(15,15,15,0.12)" }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative z-10">
                {HOW_IT_WORKS_STEPS.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.num}
                      className="flex flex-col items-center text-center group"
                    >
                      {/* Number badge */}
                      <div
                        className="w-11 h-11 rounded-full font-extrabold text-sm flex items-center justify-center shadow-md mx-auto z-10 relative transform group-hover:scale-110 transition-transform"
                        style={{
                          background: item.featured ? "#0F0F0F" : "#FFFFFF",
                          color: item.featured ? "#FFFFFF" : "#0F0F0F",
                          border: item.featured
                            ? "none"
                            : "2px solid rgba(15,15,15,0.15)",
                        }}
                      >
                        {item.num}
                      </div>

                      {/* Dashed connector */}
                      <div
                        className="w-[2px] h-6 border-l-2 border-dashed mx-auto my-1.5"
                        style={{ borderColor: item.accent }}
                      />

                      {/* Icon box */}
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-105 transition-transform"
                        style={{ background: item.accent }}
                      >
                        <IconComponent
                          className="w-7 h-7"
                          style={{ color: "#0F0F0F" }}
                        />
                      </div>

                      <h3
                        className="text-base sm:text-lg font-bold mt-4 mb-2 transition-colors"
                        style={{ color: "#0F0F0F" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-xs sm:text-sm leading-relaxed font-normal max-w-[250px] mx-auto"
                        style={{ color: "#333333" }}
                      >
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/cover-letter/editor"
              className="px-8 py-4 text-white font-bold rounded-xl shadow-lg inline-flex items-center gap-2.5 transition-all transform hover:scale-105 hover:opacity-90 text-sm sm:text-base"
              style={{ background: "#0F0F0F" }}
            >
              <span>Start Building Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. COVER LETTER FAQ SECTION                                              */}
        {/* ========================================================================= */}
        <FAQ
          items={COVER_LETTER_FAQS}
          badge="Cover Letter FAQs"
          title="Frequently Asked"
          highlightText="Questions"
          subtitle="Everything you need to know about our AI cover letter builder, templates, and export options."
          showContactCta={true}
          bgStyle="#FFFFFF"
        />

        {/* ========================================================================= */}
        {/* 7. CALL TO ACTION (ReadyToBuild)                                          */}
        {/* ========================================================================= */}
        <ReadyToBuild
          title="Ready to Create Your Winning Cover Letter?"
          subtitle="Join thousands of job seekers who landed interviews faster with GetEasyCV AI."
          buttonText="Create Cover Letter Now"
          buttonHref="/cover-letter/editor"
        />

        {/* Quick Preview Modal */}
        <CoverLetterPreviewModal
          template={previewModalTemplate}
          onClose={() => setPreviewModalTemplate(null)}
        />
      </main>
      <Footer />
    </>
  );
}
