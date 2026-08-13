"use client";

import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Briefcase,
  Search,
} from "lucide-react";

export default function ResumeExamplesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Examples" },
    { id: "engineering", name: "Software & Tech" },
    { id: "design", name: "Design & Creative" },
    { id: "product", name: "Product & Management" },
    { id: "marketing", name: "Marketing & Growth" },
    { id: "finance", name: "Finance & Banking" },
    { id: "executive", name: "Executive Leadership" },
  ];

  const examples = [
    {
      id: "ex-1",
      category: "engineering",
      title: "Senior Full Stack Engineer Resume",
      experience: "6+ Years Experience",
      atsScore: "98% ATS Score",
      description:
        "High-impact resume tailored for React, Node.js, and Cloud Infrastructure roles with quantitative achievements.",
      templateName: "Single Column ATS",
      templateId: "single-column-ats-modern-blue",
      highlights: ["React / TypeScript", "AWS Architecture", "CI/CD & Microservices"],
    },
    {
      id: "ex-2",
      category: "product",
      title: "Lead Product Manager Resume",
      experience: "8+ Years Experience",
      atsScore: "96% ATS Score",
      description:
        "Results-focused PM resume emphasizing product roadmap delivery, user retention metrics, and cross-functional leadership.",
      templateName: "Two Column Split",
      templateId: "two-column-split-creative-orange",
      highlights: ["Product Strategy", "User Research", "Agile & Scrum"],
    },
    {
      id: "ex-3",
      category: "design",
      title: "Senior UX/UI Designer Portfolio CV",
      experience: "5+ Years Experience",
      atsScore: "95% ATS Score",
      description:
        "Clean, visual resume template highlighting design systems, interactive prototypes, and usability testing metrics.",
      templateName: "Modern Creative",
      templateId: "single-column-ats-modern-blue",
      highlights: ["Figma Design Systems", "User Journeys", "Wireframing"],
    },
    {
      id: "ex-4",
      category: "marketing",
      title: "Growth Marketing Director Resume",
      experience: "7+ Years Experience",
      atsScore: "97% ATS Score",
      description:
        "Data-driven marketing resume focused on CAC optimization, paid acquisition performance, and multi-channel campaigns.",
      templateName: "Executive Leadership",
      templateId: "single-column-ats-modern-blue",
      highlights: ["Performance Marketing", "SEO & Content", "Funnel Analytics"],
    },
    {
      id: "ex-5",
      category: "finance",
      title: "Financial Analyst Resume",
      experience: "4+ Years Experience",
      atsScore: "99% ATS Score",
      description:
        "Classic conservative resume template optimized for corporate finance, modeling, and investment strategy roles.",
      templateName: "Professional Classic",
      templateId: "single-column-ats-modern-blue",
      highlights: ["Financial Modeling", "Valuation & Forecasting", "Excel & SQL"],
    },
    {
      id: "ex-6",
      category: "executive",
      title: "Chief Technology Officer (CTO) Resume",
      experience: "12+ Years Experience",
      atsScore: "97% ATS Score",
      description:
        "Executive resume structure demonstrating engineering team scaling, P&L management, and strategic tech vision.",
      templateName: "Executive Slate",
      templateId: "single-column-ats-modern-blue",
      highlights: ["Engineering Management", "Budget P&L", "Cloud Strategy"],
    },
  ];

  const filteredExamples = examples.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F8FAFC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider shadow-2xs">
              <FileText className="w-4 h-4 text-purple-600" />
              <span>TESTED RESUME EXAMPLES</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Professional Resume Examples
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
              Explore ATS-friendly resume samples crafted for top tech and business roles. Pick any example and customize it in minutes.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="bg-white rounded-md border border-slate-200/80 p-3 shadow-2xs mb-10 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search job..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-md text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-purple-600 text-white shadow-xs"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Examples Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredExamples.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-md border border-slate-200/80 p-6 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      {item.atsScore}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      {item.experience}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-4 font-medium">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold bg-slate-50 text-slate-700 border border-slate-100 px-2.5 py-1 rounded-md"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/editor?template=${item.templateId}`}
                  className="w-full py-3 px-4 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-md border border-purple-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Use This Example Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </main>
      <ReadyToBuild />
      <Footer />
    </>
  );
}
