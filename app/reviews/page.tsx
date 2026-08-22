import React from "react";
import Navigation from "@/components/Navigation";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Star,
  Quote,
  CheckCircle2,
  Users,
  Building2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Customer Reviews & Success Stories - GetEasyCV",
  description:
    "See how thousands of job seekers landed interviews at top tech and enterprise companies using GetEasyCV.",
};

export default function ReviewsPage() {
  const reviews = [
    {
      name: "Sarah K.",
      role: "Software Engineer",
      company: "Hired at Stripe",
      rating: 5,
      comment:
        "I landed 3 interviews in my first week using GetEasyCV. The ATS-friendly templates and bullet point optimizer made all the difference.",
      avatar: "SK",
      color: "from-[#FF570F] to-[#FF570F]",
    },
    {
      name: "James R.",
      role: "Product Manager",
      company: "Hired at Notion",
      rating: 5,
      comment:
        "The live editor is incredibly smooth. I had a polished resume ready in under 20 minutes and downloaded the PDF without any hassle.",
      avatar: "JR",
      color: "from-[#FF570F] to-green-500",
    },
    {
      name: "Priya M.",
      role: "UX Designer",
      company: "Hired at Figma",
      rating: 5,
      comment:
        "Finally a resume builder that actually looks good. The themes are beautiful and the PDF export is pixel-perfect.",
      avatar: "PM",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "David L.",
      role: "Financial Analyst",
      company: "Hired at Morgan Stanley",
      rating: 5,
      comment:
        "The ATS Checker score feature gave me exact advice on keywords I was missing. Upgraded my score from 72 to 96 before applying.",
      avatar: "DL",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Elena R.",
      role: "Marketing Director",
      company: "Hired at HubSpot",
      rating: 5,
      comment:
        "Matching cover letter and resume templates made my application look ultra-professional. Worth every penny!",
      avatar: "ER",
      color: "from-amber-500 to-orange-500",
    },
    {
      name: "Marcus T.",
      role: "DevOps Engineer",
      company: "Hired at AWS",
      rating: 5,
      comment:
        "Clean, straightforward, and no hidden subscription traps. Best resume builder I have used in 10 years of tech career.",
      avatar: "MT",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 font-sans py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF8F5] border border-[#FFD4C2] text-[#E04800] text-xs font-bold uppercase tracking-wider mb-4">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>TRUSTSCORE 4.9 / 5.0 (5,000+ REVIEWS)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              Loved by 50,000+ Job Seekers Worldwide
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Read real success stories from candidates who used GetEasyCV to land interviews and job offers at top global companies.
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white rounded-md border border-slate-200/80 p-6 shadow-xs hover:shadow-lg transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${rev.color} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                  >
                    {rev.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {rev.role} •{" "}
                      <span className="text-[#FF570F] font-semibold">
                        {rev.company}
                      </span>
                    </p>
                  </div>
                </div>
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
