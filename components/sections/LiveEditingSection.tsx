"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Zap, Eye, Palette, Type } from "lucide-react";

const JOB_TITLES = [
  "Senior Product Designer",
  "Full Stack Engineer",
  "UX Researcher",
  "Marketing Manager",
  "Data Scientist",
  "Project Manager",
];

const TYPE_SPEED = 60;
const DELETE_SPEED = 35;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 400;

function useTypingAnimation(words: string[]) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting" | "waiting">("typing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = words[wordIndex];
    if (phase === "typing") {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), TYPE_SPEED);
      } else {
        timeoutRef.current = setTimeout(() => setPhase("holding"), PAUSE_AFTER_TYPE);
      }
    } else if (phase === "holding") {
      timeoutRef.current = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), DELETE_SPEED);
      } else {
        timeoutRef.current = setTimeout(() => { setWordIndex((i) => (i + 1) % words.length); setPhase("waiting"); }, PAUSE_AFTER_DELETE);
      }
    } else if (phase === "waiting") {
      timeoutRef.current = setTimeout(() => setPhase("typing"), 0);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, phase, wordIndex, words]);

  return displayed;
}

export default function LiveEditingSection() {
  const displayed = useTypingAnimation(JOB_TITLES);

  return (
    <section className="py-16 sm:py-20" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Visual Demo */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Editor Panel */}
              <div className="relative bg-white rounded-2xl shadow-xl border p-6 z-10" style={{ borderColor: 'rgba(15,15,15,0.10)' }}>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
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
                      <span className="text-sm font-medium" style={{ color: '#0F0F0F' }} aria-live="polite">
                        {displayed}
                      </span>
                      <span className="ml-0.5 inline-block w-[2px] h-4 rounded-sm align-middle"
                        style={{ background: '#F3645C', animation: 'cursorBlink 1s step-start infinite' }} />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: '#9ca3af' }}>Description</label>
                    <div className="h-20 rounded-lg border p-3 space-y-1" style={{ background: '#F8F8F6', borderColor: 'rgba(15,15,15,0.08)' }}>
                      <div className="h-2 rounded w-full" style={{ background: 'rgba(15,15,15,0.12)' }} />
                      <div className="h-2 rounded w-5/6" style={{ background: 'rgba(15,15,15,0.10)' }} />
                      <div className="h-2 rounded w-4/6" style={{ background: 'rgba(15,15,15,0.08)' }} />
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

                <div className="mt-4 pt-3 border-t flex items-center gap-2" style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#58C09D' }} />
                  <span className="text-xs font-medium" style={{ color: '#58C09D' }}>Live Preview Active</span>
                </div>
              </div>

              {/* Floating preview card */}
              <div className="absolute z-10 top-8 -right-8 lg:-right-12 w-48 bg-white rounded-lg shadow-2xl border p-4 transform rotate-3 hover:rotate-0 transition-transform"
                style={{ borderColor: 'rgba(15,15,15,0.10)' }}>
                <div className="space-y-2">
                  <div className="h-3 rounded w-2/3" style={{ background: '#0F0F0F' }} />
                  <div className="h-2 rounded w-full" style={{ background: 'rgba(15,15,15,0.12)' }} />
                  <div className="h-2 rounded w-5/6" style={{ background: 'rgba(15,15,15,0.10)' }} />
                  <div className="h-2 rounded w-4/6" style={{ background: 'rgba(15,15,15,0.08)' }} />
                  <div className="pt-2 space-y-1">
                    <div className="h-2 rounded w-1/2" style={{ background: '#BAC7FE' }} />
                    <div className="h-1.5 rounded w-full" style={{ background: '#F8F8F6' }} />
                    <div className="h-1.5 rounded w-full" style={{ background: '#F8F8F6' }} />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 text-white text-xs font-bold px-2 py-1 rounded shadow-lg"
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
      `}</style>
    </section>
  );
}
