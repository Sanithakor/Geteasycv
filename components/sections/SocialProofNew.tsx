"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const FEEDBACK_CARDS = [
  {
    role: "Engineering & Technical",
    title: "Clean ATS-Friendly Structure",
    desc: "Single-column and dual-column layouts structured to parse cleanly without unreadable layers or table displacement.",
    badge: "Tech & Dev",
    bg: "#BAC7FE",
  },
  {
    role: "Product & Management",
    title: "Side-by-Side Live Editor",
    desc: "Real-time editor makes organizing career achievements, executive summaries, and milestones fast and straightforward.",
    badge: "Leadership",
    bg: "#D0B9EF",
  },
  {
    role: "Design & Creative Fields",
    title: "Vector PDF Precision",
    desc: "Modern typography pairings, balanced margins, and crisp print-ready vector PDF downloads suited for modern portfolios.",
    badge: "Design",
    bg: "#FEE1CF",
  },
  {
    role: "Career Changers & Freshers",
    title: "AI Writing Assistance",
    desc: "Context-aware bullet suggestions to help articulate day-to-day responsibilities and relevant academic projects clearly.",
    badge: "Early Career",
    bg: "#F5D17B",
  },
  {
    role: "Finance & Operations",
    title: "Structured Document Flow",
    desc: "Standardized sections that keep verified achievements, metrics, and certifications cleanly organized for hiring managers.",
    badge: "Operations",
    bg: "#DDF4EA",
  },
];

export default function SocialProofNew() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

  const maxIndex = Math.max(0, FEEDBACK_CARDS.length - visibleCount);

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4">
          <div className="space-y-3 max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white rounded-full shadow-2xs border text-xs font-bold uppercase tracking-wider"
              style={{ borderColor: "rgba(15,15,15,0.08)", color: "#0F0F0F" }}
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>BUILT FOR CANDIDATES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F0F0F]">
              Built for Modern Job Seekers
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed">
              Create a professional, ATS-friendly resume with simple tools designed to help you present your experience clearly.
            </p>
          </div>

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
            {FEEDBACK_CARDS.map((t, idx) => (
              <div
                key={`${t.role}-${idx}`}
                className="shrink-0 px-3"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <div
                  className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group"
                  style={{ borderColor: "rgba(15,15,15,0.08)" }}
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-[#0F0F0F] font-bold text-xs shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
                        style={{ background: t.bg }}
                      >
                        ✓
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-base text-slate-900 truncate">
                          {t.title}
                        </p>
                        <p className="text-xs text-slate-500 font-medium truncate">
                          {t.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6 line-clamp-3">
                      {t.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-lg"
                      style={{ background: t.bg, color: "#0F0F0F" }}
                    >
                      {t.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Standardized Format
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
      </div>
    </section>
  );
}
