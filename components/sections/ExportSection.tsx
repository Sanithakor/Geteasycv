"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FileDown, FileType, Share2, CheckCircle2 } from "lucide-react";

// ─── Sequential fill animation hook ─────────────────────────────────────────
// Triggers once when the element enters the viewport, then cycles on a slow loop
function useSequentialFill(totalSteps: number, stepDelay = 280) {
  const [filledCount, setFilledCount] = useState(0);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const runAnimation = () => {
    setFilledCount(0);
    setBadgeVisible(false);

    let step = 0;
    const tick = () => {
      step += 1;
      setFilledCount(step);
      if (step < totalSteps) {
        setTimeout(tick, stepDelay);
      } else {
        // Show the badge 300 ms after last line fills
        setTimeout(() => setBadgeVisible(true), 300);
        // Restart the whole cycle after a 3 s pause
        setTimeout(runAnimation, 3000);
      }
    };
    setTimeout(tick, stepDelay);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          runAnimation();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { filledCount, badgeVisible, ref };
}

// ─── Animated line component ─────────────────────────────────────────────────
function AnimatedLine({
  filled,
  widthClass,
  colorClass,
  height = "h-2",
  delay = 0,
}: {
  filled: boolean;
  widthClass: string;
  colorClass: string;
  height?: string;
  delay?: number;
}) {
  return (
    <div className={`${height} bg-slate-100 rounded overflow-hidden ${widthClass}`}>
      <div
        className={`h-full ${colorClass} rounded`}
        style={{
          width: filled ? "100%" : "0%",
          transition: filled
            ? `width 0.55s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
            : "none",
        }}
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ExportSection() {
  // 6 animated lines total
  const TOTAL_STEPS = 6;
  const { filledCount, badgeVisible, ref } = useSequentialFill(TOTAL_STEPS, 260);

  const exportOptions = [
    {
      icon: FileDown,
      title: "PDF Export",
      description: "Industry-standard format accepted everywhere",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50",
    },
    {
      icon: FileType,
      title: "DOCX Export",
      description: "Editable Microsoft Word format for flexibility",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Share2,
      title: "Share Link",
      description: "Generate shareable link for online portfolios",
      color: "from-[#FF570F] to-pink-500",
      bgColor: "bg-[#FFF8F5]",
    },
  ];

  const formatFeatures = [
    "Perfect formatting maintained across all formats",
    "High-quality output optimized for printing",
    "ATS-compatible structure preserved",
    "Custom fonts and colors included",
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-6">
            <FileDown className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">
              Export Options
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
            Export in{" "}
            <span className="bg-gradient-to-r from-[#FF570F] to-pink-600 bg-clip-text text-transparent">
              Any Format
            </span>
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Download your resume as PDF or DOCX, or share it online with a custom link
          </p>
        </div>

        {/* Export Options Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {exportOptions.map((option, idx) => {
            const IconComponent = option.icon;
            return (
              <div
                key={idx}
                className={`${option.bgColor} rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {option.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {option.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Format Features */}
        <div className="bg-gradient-to-br from-slate-50 to-[#FFF8F5] rounded-2xl border border-slate-200 p-8 lg:p-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Features List */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Perfect Formatting Guaranteed
              </h3>
              <div className="space-y-4">
                {formatFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-slate-700 leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Animated Visual Demo */}
            <div className="relative" ref={ref}>
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                {/* Window chrome */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="text-xs font-medium text-slate-500">
                    Ready to Export
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Line 1 — name bar (dark, wide) */}
                  <AnimatedLine
                    filled={filledCount >= 1}
                    widthClass="w-2/3"
                    colorClass="bg-slate-900"
                    height="h-4"
                  />

                  {/* Line 2 — subtitle */}
                  <AnimatedLine
                    filled={filledCount >= 2}
                    widthClass="w-full"
                    colorClass="bg-slate-300"
                  />

                  {/* Line 3 */}
                  <AnimatedLine
                    filled={filledCount >= 3}
                    widthClass="w-5/6"
                    colorClass="bg-slate-200"
                    delay={40}
                  />

                  {/* Section heading — brand accent */}
                  <div className="pt-2">
                    <AnimatedLine
                      filled={filledCount >= 4}
                      widthClass="w-1/2"
                      colorClass="bg-[#FF570F]/40"
                      height="h-3"
                    />
                  </div>

                  {/* Body lines */}
                  <AnimatedLine
                    filled={filledCount >= 5}
                    widthClass="w-full"
                    colorClass="bg-slate-100"
                    delay={40}
                  />
                  <AnimatedLine
                    filled={filledCount >= 6}
                    widthClass="w-full"
                    colorClass="bg-slate-100"
                    delay={80}
                  />

                  {/* Export buttons — appear after lines are done */}
                  <div
                    className="flex gap-2 pt-3"
                    style={{
                      opacity: filledCount >= TOTAL_STEPS ? 1 : 0,
                      transform: filledCount >= TOTAL_STEPS ? "translateY(0)" : "translateY(6px)",
                      transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
                    }}
                  >
                    <div className="flex-1 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      PDF
                    </div>
                    <div className="flex-1 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      DOCX
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge — pops in after animation completes */}
              <div
                className="absolute -bottom-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold"
                style={{
                  opacity: badgeVisible ? 1 : 0,
                  transform: badgeVisible ? "scale(1) translateY(0)" : "scale(0.7) translateY(8px)",
                  transition: "opacity 0.35s cubic-bezier(0.34,1.56,0.64,1), transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                }}
                aria-hidden={!badgeVisible}
              >
                ✓ Format Preserved
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Start Creating Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
