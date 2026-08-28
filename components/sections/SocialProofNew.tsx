"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  TrendingUp,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah K.",
    role: "Software Engineer",
    company: "Google",
    quote: "Got 3 interview calls within a week. The ATS-friendly templates work!",
    avatar: "SK",
    bg: "#BAC7FE",
  },
  {
    name: "James R.",
    role: "Product Manager",
    company: "Microsoft",
    quote: "Built my resume in 15 minutes. The live editor is incredibly smooth.",
    avatar: "JR",
    bg: "#D0B9EF",
  },
  {
    name: "Priya M.",
    role: "UX Designer",
    company: "Figma",
    quote: "Beautiful templates and perfect PDF export. Exactly what I needed.",
    avatar: "PM",
    bg: "#FEE1CF",
  },
  {
    name: "Michael T.",
    role: "Data Scientist",
    company: "Amazon",
    quote: "AI suggestions helped me articulate my achievements much better.",
    avatar: "MT",
    bg: "#F5D17B",
  },
  {
    name: "Lisa W.",
    role: "Marketing Manager",
    company: "HubSpot",
    quote: "Professional results without the hassle. Highly recommend for job seekers.",
    avatar: "LW",
    bg: "#DDF4EA",
  },
  {
    name: "David L.",
    role: "Full Stack Developer",
    company: "Shopify",
    quote: "Clean, modern templates. Finally landed my dream role!",
    avatar: "DL",
    bg: "#FEE1CF",
  },
  {
    name: "Elena R.",
    role: "Financial Analyst",
    company: "Goldman Sachs",
    quote: "The ATS diagnostic tool gave me the exact insights I needed to stand out.",
    avatar: "ER",
    bg: "#BAC7FE",
  },
  {
    name: "Alex M.",
    role: "DevOps Engineer",
    company: "Cloudflare",
    quote: "Super intuitive interface and top-notch modern layouts. 10/10 recommended.",
    avatar: "AM",
    bg: "#D0B9EF",
  },
  {
    name: "Rachel B.",
    role: "Talent Acquisition Lead",
    company: "Stripe",
    quote: "As a recruiter, I immediately notice resumes built with GetEasyCV. They parse flawlessly.",
    avatar: "RB",
    bg: "#F5D17B",
  },
];

const STATS = [
  { icon: Users, value: "50,000+", label: "Resumes Created", bg: "#BAC7FE", iconColor: "#0F0F0F" },
  { icon: Star, value: "4.9/5", label: "Average Rating", bg: "#F5D17B", iconColor: "#0F0F0F" },
  { icon: TrendingUp, value: "85%", label: "Interview Success", bg: "#58C09D", iconColor: "#FFFFFF" },
  { icon: Clock, value: "15 min", label: "Avg. Completion Time", bg: "#D0B9EF", iconColor: "#0F0F0F" },
];

export default function SocialProofNew() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - visibleCount);

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrev();
    }
  };

  return (
    <section className="py-16 sm:py-24 font-sans" style={{ background: "#F8F8F6" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {STATS.map(({ icon: Icon, value, label, bg, iconColor }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-5 sm:p-6 border text-center hover:shadow-lg transition-all shadow-2xs"
              style={{ borderColor: "rgba(15,15,15,0.08)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-xs"
                style={{ background: bg }}
              >
                <Icon className="w-6 h-6" style={{ color: iconColor }} />
              </div>
              <div
                className="text-2xl sm:text-3xl font-extrabold mb-1 tracking-tight text-[#0F0F0F]"
              >
                {value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-600">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4">
          <div className="space-y-3 max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white rounded-full shadow-2xs border text-xs font-bold uppercase tracking-wider"
              style={{ borderColor: "rgba(15,15,15,0.08)", color: "#0F0F0F" }}
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>SUCCESS STORIES</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
              style={{ color: "#0F0F0F" }}
            >
              Loved by Job Seekers
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed">
              Real results from people who landed their dream jobs.
            </p>
          </div>

          {/* Slider Arrow Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 flex items-center justify-center shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-xl bg-[#0F0F0F] hover:bg-black text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TESTIMONIALS SLIDER CAROUSEL TRACK                                        */}
        {/* ========================================================================= */}
        <div
          className="relative overflow-hidden -mx-2 px-2 py-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={`${t.name}-${idx}`}
                className="shrink-0 px-3"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <div
                  className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group"
                  style={{ borderColor: "rgba(15,15,15,0.08)" }}
                >
                  <div>
                    {/* Author Profile */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-[#0F0F0F] font-bold text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
                        style={{ background: t.bg }}
                      >
                        {t.avatar}
                      </div>
                      <div className="min-w-0">
                        <p
                          className="font-bold text-base text-slate-900 truncate"
                        >
                          {t.name}
                        </p>
                        <p className="text-xs text-slate-500 font-medium truncate">
                          {t.role}
                        </p>
                      </div>
                    </div>

                    {/* Quote Text */}
                    <blockquote className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mb-6 line-clamp-3">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Card Bottom: Company Badge + 5 Stars */}
                  <div
                    className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto"
                  >
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-lg"
                      style={{ background: t.bg, color: "#0F0F0F" }}
                    >
                      {t.company}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-amber-400 fill-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? "w-8 bg-[#0F0F0F]"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        {/* Bottom Banner */}
        <div
          className="mt-14 bg-white rounded-2xl sm:rounded-3xl border p-6 sm:p-8 shadow-sm"
          style={{ borderColor: "rgba(15,15,15,0.08)" }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center sm:text-left">
            {[
              {
                icon: TrendingUp,
                value: "10,000+",
                label: "Active Users This Month",
                bg: "#58C09D33",
                color: "#58C09D",
              },
              {
                icon: Star,
                value: "4.9/5",
                label: "User Satisfaction Score",
                bg: "#F5D17B",
                color: "#0F0F0F",
              },
              {
                icon: Clock,
                value: "15 min",
                label: "Average Resume Build Time",
                bg: "#BAC7FE",
                color: "#0F0F0F",
              },
            ].map(({ icon: Icon, value, label, bg, color }, i) => (
              <React.Fragment key={label}>
                {i > 0 && (
                  <div
                    className="hidden sm:block w-px h-12"
                    style={{ background: "rgba(15,15,15,0.10)" }}
                  />
                )}
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
                    style={{ background: bg }}
                  >
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <div>
                    <div
                      className="text-2xl font-extrabold tracking-tight text-[#0F0F0F]"
                    >
                      {value}
                    </div>
                    <div className="text-xs font-medium text-slate-500">
                      {label}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
