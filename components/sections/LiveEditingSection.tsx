"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Zap, Eye, Palette, Type } from "lucide-react";

interface SampleRolePair {
  title: string;
  description: string;
}

const SAMPLE_PAIRS: SampleRolePair[] = [
  {
    title: "Senior Product Designer",
    description: "Designing accessible product experiences and scalable design systems for growing teams.",
  },
  {
    title: "Full Stack Engineer",
    description: "Building reliable web applications and high-performance APIs used by thousands of customers.",
  },
  {
    title: "UX Researcher",
    description: "Turning user research, qualitative feedback, and analytics into clear, actionable product decisions.",
  },
  {
    title: "Project Manager",
    description: "Leading cross-functional agile teams to deliver key engineering initiatives on time and on budget.",
  },
  {
    title: "Data Scientist",
    description: "Analyzing complex datasets and training predictive ML models to drive strategic business growth.",
  },
  {
    title: "Marketing Manager",
    description: "Creating targeted multi-channel campaigns that grow brand awareness and customer acquisition.",
  },
];

function useSynchronizedPairTyping(pairs: SampleRolePair[]) {
  const [pairIndex, setPairIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedDescription, setDisplayedDescription] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting" | "waiting">("typing");

  useEffect(() => {
    const current = pairs[pairIndex];
    if (!current) return;

    const targetTitle = current.title;
    const targetDesc = current.description;

    let timer: NodeJS.Timeout;

    if (phase === "typing") {
      const titleDone = displayedTitle.length >= targetTitle.length;
      const descDone = displayedDescription.length >= targetDesc.length;

      if (!titleDone || !descDone) {
        timer = setTimeout(() => {
          if (!titleDone) {
            setDisplayedTitle(targetTitle.slice(0, displayedTitle.length + 1));
          }
          if (!descDone) {
            setDisplayedDescription(targetDesc.slice(0, displayedDescription.length + 1));
          }
        }, 35);
      } else {
        // Both finished typing -> hold together
        timer = setTimeout(() => {
          setPhase("holding");
        }, 2400);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => {
        setPhase("deleting");
      }, 0);
    } else if (phase === "deleting") {
      const titleEmpty = displayedTitle.length === 0;
      const descEmpty = displayedDescription.length === 0;

      if (!titleEmpty || !descEmpty) {
        timer = setTimeout(() => {
          if (!titleEmpty) {
            setDisplayedTitle(displayedTitle.slice(0, -1));
          }
          if (!descEmpty) {
            const dropChars = targetDesc.length > targetTitle.length * 2 ? 2 : 1;
            setDisplayedDescription(displayedDescription.slice(0, -Math.min(dropChars, displayedDescription.length)));
          }
        }, 20);
      } else {
        // Both fully cleared -> transition to next pair
        timer = setTimeout(() => {
          setPairIndex((prev) => (prev + 1) % pairs.length);
          setPhase("waiting");
        }, 250);
      }
    } else if (phase === "waiting") {
      timer = setTimeout(() => {
        setPhase("typing");
      }, 100);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [displayedTitle, displayedDescription, phase, pairIndex, pairs]);

  return { displayedTitle, displayedDescription, phase };
}

export default function LiveEditingSection() {
  const { displayedTitle, displayedDescription } = useSynchronizedPairTyping(SAMPLE_PAIRS);

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden font-sans" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Visual Demo */}
          <div className="order-2 lg:order-1 max-w-lg mx-auto lg:max-w-none w-full">
            <div className="relative pt-6 sm:pt-4 pr-3 sm:pr-6 lg:pr-8">
              {/* Editor Panel */}
              <div className="relative bg-white rounded-2xl shadow-xl border p-5 sm:p-6 z-10" style={{ borderColor: 'rgba(15,15,15,0.10)' }}>
                <div className="mb-4 flex items-center gap-2 pb-3 border-b" style={{ borderColor: 'rgba(15,15,15,0.06)' }}>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: '#9ca3af' }}>Resume Editor</span>
                </div>

                <div className="space-y-4">
                  {/* Animated job title field */}
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: '#9ca3af' }}>Job Title</label>
                    <div className="h-8 rounded-lg border flex items-center px-3 transition-all"
                      style={{ background: '#F8F8F6', borderColor: '#BAC7FE' }}>
                      <span className="text-xs sm:text-sm font-medium truncate" style={{ color: '#0F0F0F' }} aria-live="polite">
                        {displayedTitle}
                      </span>
                      <span className="ml-0.5 inline-block w-[2px] h-4 rounded-sm align-middle shrink-0"
                        style={{ background: '#F3645C', animation: 'cursorBlink 1s step-start infinite' }} />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: '#9ca3af' }}>Description</label>
                    <div className="min-h-20 rounded-lg p-3" style={{ background: '#F8F8F6' }}>
                      <p className="text-xs leading-relaxed" style={{ color: '#333333' }} aria-live="polite">
                        {displayedDescription}
                        <span className="ml-0.5 inline-block h-3 w-[2px] rounded-sm align-middle" style={{ background: '#F3645C', animation: 'cursorBlink 1s step-start infinite' }} />
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors"
                      style={{ background: '#D0B9EF', color: '#0F0F0F' }}>
                      <Palette className="w-3 h-3" /> Colors
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors"
                      style={{ background: '#F8F8F6', color: '#333333', border: '1px solid rgba(15,15,15,0.12)' }}>
                      <Type className="w-3 h-3" /> Fonts
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-100">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#58C09D' }} />
                  <span className="text-xs font-medium" style={{ color: '#58C09D' }}>Live Preview Active</span>
                </div>
              </div>

              {/* Floating preview card - positioned safely inside viewport */}
              <div className="absolute z-20 -top-2 right-0 sm:-top-3 sm:-right-2 lg:top-6 lg:-right-6 w-40 sm:w-48 rounded-xl bg-white p-3 sm:p-4 shadow-2xl border border-slate-100 transform rotate-2 sm:rotate-3 transition-transform hover:rotate-0">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider" style={{ color: '#0F0F0F' }}>Live score</span>
                    <span className="text-xs sm:text-sm font-extrabold" style={{ color: '#58C09D' }}>92%</span>
                  </div>
                  <div className="h-1.5 sm:h-2 overflow-hidden rounded-full" style={{ background: '#F8F8F6' }}>
                    <div className="h-full w-[92%] rounded-full" style={{ background: '#58C09D', animation: 'progressGrow 900ms ease-out both' }} />
                  </div>
                  <div className="space-y-1 text-[9px] sm:text-[10px]" style={{ color: '#333333' }}>
                    <p className="flex items-center justify-between"><span>Keywords matched</span><strong>18 / 20</strong></p>
                    <p className="flex items-center justify-between"><span>Readable layout</span><strong>Excellent</strong></p>
                  </div>
                </div>
                <div className="absolute -top-2 -right-1.5 sm:-right-2 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 rounded shadow-lg"
                  style={{ background: '#58C09D' }}>
                  ⚡ Updated
                </div>
              </div>
            </div>
          </div>

          {/* Right: Copy */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 shadow-sm"
              style={{ background: '#FFFFFF', borderColor: 'rgba(15,15,15,0.12)' }}>
              <Zap className="w-4 h-4" style={{ color: '#F3645C' }} />
              <span className="text-sm font-bold uppercase tracking-wider" style={{ color: '#F3645C' }}>Real-Time Preview</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight" style={{ color: '#0F0F0F' }}>
              See Changes{" "}
              <span style={{ color: '#F3645C' }}>Instantly</span>
            </h2>

            <p className="text-lg mb-8 leading-relaxed" style={{ color: '#333333' }}>
              Every edit updates your resume in real-time. No waiting, no refreshing — just smooth, instant visual feedback as you build.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Zap,     accent: '#F5D17B', title: 'Instant Visual Updates',   body: 'Changes appear immediately as you type — no lag, no waiting.' },
                { icon: Eye,     accent: '#BAC7FE', title: 'All Templates Supported',  body: 'Live preview works with every template in our collection.' },
                { icon: Palette, accent: '#D0B9EF', title: 'Customize Everything',     body: 'Colors, fonts, spacing — see every customization in real-time.' },
              ].map(({ icon: Icon, accent, title, body }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: accent }}>
                    <Icon className="w-4 h-4" style={{ color: '#0F0F0F' }} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: '#0F0F0F' }}>{title}</h3>
                    <p className="text-sm" style={{ color: '#333333' }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/editor"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:opacity-90"
              style={{ background: '#0F0F0F' }}
            >
              Try Live Editor
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes progressGrow {
          from { width: 0; }
          to { width: 92%; }
        }
      `}</style>
    </section>
  );
}
