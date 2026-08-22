"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Zap, Eye, Palette, Type } from "lucide-react";

// Job titles to cycle through with typing effect
const JOB_TITLES = [
  "Senior Product Designer",
  "Full Stack Engineer",
  "UX Researcher",
  "Marketing Manager",
  "Data Scientist",
  "Project Manager",
];

const TYPE_SPEED = 60;    // ms per character while typing
const DELETE_SPEED = 35;  // ms per character while deleting
const PAUSE_AFTER_TYPE = 1800;  // ms to hold the fully typed word
const PAUSE_AFTER_DELETE = 400; // ms before starting next word

function useTypingAnimation(words: string[]) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting" | "waiting">("typing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = words[wordIndex];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, TYPE_SPEED);
      } else {
        timeoutRef.current = setTimeout(() => setPhase("holding"), PAUSE_AFTER_TYPE);
      }
    } else if (phase === "holding") {
      timeoutRef.current = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, DELETE_SPEED);
      } else {
        timeoutRef.current = setTimeout(() => {
          setWordIndex((i) => (i + 1) % words.length);
          setPhase("waiting");
        }, PAUSE_AFTER_DELETE);
      }
    } else if (phase === "waiting") {
      timeoutRef.current = setTimeout(() => setPhase("typing"), 0);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, phase, wordIndex, words]);

  return { displayed, isTyping: phase === "typing" || phase === "waiting" };
}

export default function LiveEditingSection() {
  const { displayed, isTyping } = useTypingAnimation(JOB_TITLES);

  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Visual Demo - Editor + Preview */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Editor Panel */}
              <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 p-6 z-10">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    Resume Editor
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Animated Job Title Field */}
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">
                      Job Title
                    </label>
                    <div className="h-8 bg-slate-100 rounded border border-[#FF570F]/40 flex items-center px-3 transition-all">
                      <span
                        className="text-sm text-slate-700 font-medium"
                        aria-live="polite"
                        aria-label={`Job title: ${displayed}`}
                      >
                        {displayed}
                      </span>
                      {/* Blinking cursor */}
                      <span
                        className="ml-0.5 inline-block w-[2px] h-4 bg-[#FF570F] rounded-sm align-middle"
                        style={{
                          animation: "cursorBlink 1s step-start infinite",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">
                      Description
                    </label>
                    <div className="h-20 bg-slate-100 rounded border border-slate-200 p-3 space-y-1">
                      <div className="h-2 bg-slate-300 rounded w-full"></div>
                      <div className="h-2 bg-slate-300 rounded w-5/6"></div>
                      <div className="h-2 bg-slate-300 rounded w-4/6"></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-[#FFF0EB] text-[#FF570F] text-xs font-medium rounded-lg flex items-center gap-1">
                      <Palette className="w-3 h-3" />
                      Colors
                    </button>
                    <button className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg flex items-center gap-1">
                      <Type className="w-3 h-3" />
                      Fonts
                    </button>
                  </div>
                </div>

                {/* Live Indicator */}
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-green-600">
                    Live Preview Active
                  </span>
                </div>
              </div>

              {/* Preview Panel (Right - Overlapped) */}
              <div className="absolute top-8 -right-8 lg:-right-12 w-48 bg-white rounded-lg shadow-2xl border border-slate-200 p-4 transform rotate-3 hover:rotate-0 transition-transform">
                <div className="space-y-2">
                  <div className="h-3 bg-[#FF570F] rounded w-2/3"></div>
                  <div className="h-2 bg-slate-200 rounded w-full"></div>
                  <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-2 bg-slate-200 rounded w-4/6"></div>
                  <div className="pt-2 space-y-1">
                    <div className="h-2 bg-[#FFF0EB] rounded w-1/2"></div>
                    <div className="h-1.5 bg-slate-100 rounded w-full"></div>
                    <div className="h-1.5 bg-slate-100 rounded w-full"></div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                  ⚡ Updated
                </div>
              </div>

              {/* Connection Line Animation */}
              <div className="absolute top-1/2 left-full w-16 h-0.5 hidden lg:block">
                <div className="h-full bg-gradient-to-r from-[#FF570F] to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Right: Explanation */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-[#FFD4C2] mb-6">
              <Zap className="w-4 h-4 text-[#FF570F]" />
              <span className="text-sm font-bold text-[#FF570F] uppercase tracking-wider">
                Real-Time Preview
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              See Changes{" "}
              <span className="text-[#FF570F]">
                Instantly
              </span>
            </h2>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Every edit updates your resume in real-time. No waiting, no refreshing—just smooth,
              instant visual feedback as you build.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-[#FFF0EB] rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[#FF570F]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Instant Visual Updates
                  </h3>
                  <p className="text-sm text-slate-600">
                    Changes appear immediately as you type—no lag, no waiting
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-[#FFF0EB] rounded-lg flex items-center justify-center">
                  <Eye className="w-4 h-4 text-[#FF570F]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    All Templates Supported
                  </h3>
                  <p className="text-sm text-slate-600">
                    Live preview works with every single template in our collection
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Palette className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Customize Everything
                  </h3>
                  <p className="text-sm text-slate-600">
                    Colors, fonts, spacing—see every customization in real-time
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF570F] hover:bg-[#E04800] text-white rounded-xl font-semibold transition-all shadow-lg shadow-[#FF570F]/25 hover:shadow-xl"
            >
              Try Live Editor
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Cursor blink keyframe — scoped to this section */}
      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
