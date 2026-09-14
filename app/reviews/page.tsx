import React from "react";
import Navigation from "@/components/Navigation";
import InnerBanner from "@/components/InnerBanner";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import {
  Star,
  Quote,
  CheckCircle2,
  Users,
  Building2,
  Sparkles,
  Award,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export const metadata = {
  title: "Candidate Feedback & Design Standards - GetEasyCV",
  description:
    "Discover how GetEasyCV helps job seekers create professional, ATS-friendly resumes with modern layouts.",
};

const STATS = [
  { label: "Resume Templates", value: "100+", icon: Users, accent: "#BAC7FE" },
  { label: "Template Variations", value: "200+", icon: Sparkles, accent: "#F5D17B" },
  { label: "ATS Readiness", value: "Standard", icon: TrendingUp, accent: "#58C09D" },
  { label: "Layout Styles", value: "16", icon: Award, accent: "#D0B9EF" },
];

const FEEDBACK_ITEMS = [
  {
    role: "Software Engineering",
    topic: "ATS-Friendly Structure",
    comment:
      "The single-column layout kept my technical skills, projects, and work experience structured in a clean, parseable format without layout bugs.",
    initials: "SWE",
    accent: "#BAC7FE",
    badge: "Engineering",
  },
  {
    role: "Product Management",
    topic: "Interactive Live Editor",
    comment:
      "The live side-by-side preview made drafting and reorganizing my career timeline very straightforward and fast.",
    initials: "PM",
    accent: "#F5D17B",
    badge: "Product",
  },
  {
    role: "UX & UI Design",
    topic: "Typography & PDF Export",
    comment:
      "Crisp vector typography and balanced page margins resulted in a clean print-ready PDF download without formatting displacement.",
    initials: "UX",
    accent: "#D0B9EF",
    badge: "Design",
  },
  {
    role: "Financial Analysis",
    topic: "Section Organization",
    comment:
      "Clear sections for certifications, financial modeling skills, and quantified achievements made structuring my resume simple.",
    initials: "FA",
    accent: "#58C09D",
    badge: "Finance",
  },
  {
    role: "Marketing & Growth",
    topic: "Matching Cover Letters",
    comment:
      "Coordinated cover letter templates sharing the same font pairings and color schemes helped create a unified application package.",
    initials: "MKT",
    accent: "#FEE1CF",
    badge: "Marketing",
  },
  {
    role: "DevOps & Cloud",
    topic: "Direct Downloads",
    comment:
      "Clean export workflow with zero formatting glitches or hidden subscription traps. Straightforward tool for technical careers.",
    initials: "OPS",
    accent: "#BAC7FE",
    badge: "Cloud & Ops",
  },
];

const REVIEW_FAQS = [
  {
    question: "How are GetEasyCV templates designed for ATS compatibility?",
    answer:
      "GetEasyCV uses clear single and dual-column layouts, standard section headings, and clean text layers designed around common applicant tracking system requirements.",
  },
  {
    question: "How does GetEasyCV help candidates build stronger resumes?",
    answer:
      "GetEasyCV provides modern typography pairings, structured section hierarchies, and optional AI writing assistance to help you present your work history clearly and professionally.",
  },
  {
    question: "Can I share my feedback on GetEasyCV?",
    answer:
      "Yes! We continually improve our editor and templates based on candidate feedback. You can submit suggestions directly to our support team at any time.",
  },
];

export default function ReviewsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F8F8F6] text-[#0F0F0F] font-sans">
        <InnerBanner
          badge="Candidate Feedback"
          badgeIcon={Star}
          breadcrumbs={[{ label: "Feedback", href: "/reviews" }]}
          title="Built for"
          highlightText="Modern Job Seekers"
          titleSuffix="Worldwide"
          description="Create a professional, ATS-friendly resume with simple tools designed to help you present your experience clearly."
          primaryAction={{
            label: "Create My Resume — Free",
            href: "/templates",
          }}
          secondaryAction={{
            label: "Explore Templates",
            href: "/templates",
          }}
          features={[
            "ATS-Friendly Formatting",
            "Vector PDF Precision",
            "Context-Aware AI Writing",
          ]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs text-left flex items-center gap-4"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
                    style={{ backgroundColor: stat.accent }}
                  >
                    <Icon className="w-5 h-5 text-[#0F0F0F]" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#0F0F0F]">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feedback Grid */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200/80 bg-white text-[#0F0F0F] text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#F3645C]" />
                <span>Early Candidate Feedback</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F0F0F]">
                Built for Candidates Across <span style={{ color: "#F3645C" }}>All Career Paths</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {FEEDBACK_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {item.topic}
                      </span>
                      <span
                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-slate-900"
                        style={{ backgroundColor: item.accent }}
                      >
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      &ldquo;{item.comment}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div
                      className="w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs text-[#0F0F0F]"
                      style={{ backgroundColor: item.accent }}
                    >
                      {item.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F0F0F] text-sm">
                        {item.role}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Standardized Layout Feedback
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ
          items={REVIEW_FAQS}
          badge="Product Principles"
          title="Frequently Asked"
          highlightText="Questions"
          subtitle="Learn more about how GetEasyCV is built for modern job seekers."
          showContactCta={true}
          bgStyle="#FFFFFF"
        />
      </main>
      <ReadyToBuild />
      <Footer />
    </>
  );
}
