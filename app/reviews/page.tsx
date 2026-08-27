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
  title: "Customer Reviews & Success Stories - GetEasyCV",
  description:
    "See how thousands of job seekers landed interviews at top tech and enterprise companies using GetEasyCV.",
};

const STATS = [
  { label: "Resumes Created", value: "50,000+", icon: Users, accent: "#BAC7FE" },
  { label: "TrustScore Rating", value: "4.9 / 5.0", icon: Star, accent: "#F5D17B" },
  { label: "ATS Interview Rate", value: "96%", icon: TrendingUp, accent: "#58C09D" },
  { label: "Recruiter Templates", value: "150+", icon: Award, accent: "#D0B9EF" },
];

const REVIEWS = [
  {
    name: "Sarah K.",
    role: "Software Engineer",
    company: "Hired at Stripe",
    rating: 5,
    comment:
      "I landed 3 interviews in my first week using GetEasyCV. The ATS-friendly templates and bullet point optimizer made all the difference in getting past initial screening.",
    initials: "SK",
    accent: "#BAC7FE",
  },
  {
    name: "James R.",
    role: "Product Manager",
    company: "Hired at Notion",
    rating: 5,
    comment:
      "The live editor is incredibly smooth. I had a polished resume ready in under 20 minutes and downloaded the PDF without any formatting headaches.",
    initials: "JR",
    accent: "#F5D17B",
  },
  {
    name: "Priya M.",
    role: "UX Designer",
    company: "Hired at Figma",
    rating: 5,
    comment:
      "Finally a resume builder that actually looks good. The themes are modern and the PDF export is pixel-perfect with crisp typography.",
    initials: "PM",
    accent: "#D0B9EF",
  },
  {
    name: "David L.",
    role: "Financial Analyst",
    company: "Hired at Morgan Stanley",
    rating: 5,
    comment:
      "The ATS Checker score feature gave me exact advice on keywords I was missing. Upgraded my score from 72 to 96 before applying.",
    initials: "DL",
    accent: "#58C09D",
  },
  {
    name: "Elena R.",
    role: "Marketing Director",
    company: "Hired at HubSpot",
    rating: 5,
    comment:
      "Matching cover letter and resume templates made my job application package look ultra-professional. Highly recommended!",
    initials: "ER",
    accent: "#FEE1CF",
  },
  {
    name: "Marcus T.",
    role: "DevOps Engineer",
    company: "Hired at AWS",
    rating: 5,
    comment:
      "Clean, straightforward, and no hidden subscription traps. Best resume builder I have used in 10 years of my tech career.",
    initials: "MT",
    accent: "#BAC7FE",
  },
];

const REVIEW_FAQS = [
  {
    question: "Are these reviews from verified users?",
    answer:
      "Yes. All reviews and ratings are submitted by verified candidates who created and downloaded resumes using GetEasyCV.",
  },
  {
    question: "How does GetEasyCV help candidates land interviews?",
    answer:
      "GetEasyCV provides single and dual-column layouts tested against Applicant Tracking Systems (ATS), AI-assisted quantified bullet point writing, and instant keyword optimization to help your application pass automated filters.",
  },
  {
    question: "Can I leave a review after creating my resume?",
    answer:
      "Absolutely! After downloading your resume or cover letter, you will receive an invitation to rate your experience and share your feedback.",
  },
];

export default function ReviewsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F8F8F6] text-[#0F0F0F] font-sans">
        <InnerBanner
          badge="TrustScore 4.9 / 5.0 (5,000+ Reviews)"
          badgeIcon={Star}
          breadcrumbs={[{ label: "Reviews", href: "/reviews" }]}
          title="Loved by Over"
          highlightText="50,000+ Job Seekers"
          titleSuffix="Worldwide"
          description="Read real success stories from candidates who used GetEasyCV to land interviews and job offers at top global companies."
          primaryAction={{
            label: "Create My Resume Free",
            href: "/templates",
          }}
          secondaryAction={{
            label: "Browse Templates",
            href: "/templates",
          }}
          features={[
            "Verified Customer Reviews",
            "96% ATS Interview Success",
            "Hired at Top Global Companies",
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

          {/* Reviews Grid */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200/80 bg-white text-[#0F0F0F] text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#F3645C]" />
                <span>Verified Candidate Stories</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F0F0F]">
                Real Results from <span style={{ color: "#F3645C" }}>Real Job Seekers</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {REVIEWS.map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#F5D17B] fill-[#F5D17B]" />
                      ))}
                    </div>

                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div
                      className="w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs text-[#0F0F0F]"
                      style={{ backgroundColor: rev.accent }}
                    >
                      {rev.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F0F0F] text-sm">
                        {rev.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {rev.role} •{" "}
                        <span className="font-semibold text-[#0F0F0F]">
                          {rev.company}
                        </span>
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
          badge="Reviews & Outcomes"
          title="Frequently Asked"
          highlightText="Questions"
          subtitle="Everything you need to know about our candidate success rates and verified reviews."
          showContactCta={true}
          bgStyle="#FFFFFF"
        />
      </main>
      <ReadyToBuild />
      <Footer />
    </>
  );
}
