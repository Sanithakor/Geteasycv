"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FileDown, FileType, Share2, CheckCircle2 } from "lucide-react";

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
        setTimeout(() => setBadgeVisible(true), 300);
        setTimeout(runAnimation, 3000);
      }
    };
    setTimeout(tick, stepDelay);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) { started.current = true; runAnimation(); }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { filledCount, badgeVisible, ref };
}

function AnimatedLine({ filled, widthClass, color, height = 'h-2', delay = 0 }: {
  filled: boolean; widthClass: string; color: string; height?: string; delay?: number;
}) {
  return (
    <div className={`${height} rounded overflow-hidden ${widthClass}`} style={{ background: 'rgba(15,15,15,0.06)' }}>
      <div className={`h-full rounded`} style={{
        background: color,
        width: filled ? '100%' : '0%',
        transition: filled ? `width 0.55s cubic-bezier(0.4,0,0.2,1) ${delay}ms` : 'none',
      }} />
    </div>
  );
}

const EXPORT_OPTIONS = [
  { icon: FileDown, title: 'PDF Export',  desc: 'Industry-standard format accepted everywhere',        bg: '#FEE1CF', iconBg: '#F3645C' },
  { icon: FileType, title: 'DOCX Export', desc: 'Editable Microsoft Word format for flexibility',       bg: '#BAC7FE', iconBg: '#0F0F0F' },
  { icon: Share2,   title: 'Share Link',  desc: 'Generate shareable link for online portfolios',        bg: '#D0B9EF', iconBg: '#0F0F0F' },
];

const FEATURES = [
  'Perfect formatting maintained across all formats',
  'High-quality output optimized for printing',
  'ATS-compatible structure preserved',
  'Custom fonts and colors included',
];

export default function ExportSection() {
  const TOTAL = 6;
  const { filledCount, badgeVisible, ref } = useSequentialFill(TOTAL, 260);

  return (
    <section className="py-16 sm:py-20" style={{ background: '#F8F8F6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
            style={{ background: '#FFFFFF', borderColor: 'rgba(15,15,15,0.12)' }}>
            <FileDown className="w-4 h-4" style={{ color: '#333333' }} />
            <span className="text-sm font-bold uppercase tracking-wider" style={{ color: '#333333' }}>Export Options</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6" style={{ color: '#0F0F0F' }}>
            Export in{" "}
            <span style={{ color: '#F3645C' }}>Any Format</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#333333' }}>
            Download your resume as PDF or DOCX, or share it online with a custom link.
          </p>
        </div>

        {/* Export cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {EXPORT_OPTIONS.map(({ icon: Icon, title, desc, bg, iconBg }) => (
            <div key={title} className="rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              style={{ background: bg, borderColor: 'rgba(15,15,15,0.08)' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform"
                style={{ background: iconBg }}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0F0F0F' }}>{title}</h3>
              <p className="leading-relaxed" style={{ color: '#333333' }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Features + animation */}
        <div className="rounded-2xl border p-8 lg:p-10" style={{ background: '#FFFFFF', borderColor: 'rgba(15,15,15,0.08)' }}>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#0F0F0F' }}>Perfect Formatting Guaranteed</h3>
              <div className="space-y-4">
                {FEATURES.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ background: '#58C09D33' }}>
                      <CheckCircle2 className="w-4 h-4" style={{ color: '#58C09D' }} />
                    </div>
                    <p className="leading-relaxed" style={{ color: '#333333' }}>{f}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative" ref={ref}>
              <div className="bg-white rounded-2xl shadow-xl border p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500"
                style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
                <div className="flex items-center justify-between mb-4 pb-3 border-b" style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="text-xs font-medium" style={{ color: '#9ca3af' }}>Ready to Export</div>
                </div>
                <div className="space-y-3">
                  <AnimatedLine filled={filledCount >= 1} widthClass="w-2/3" color="#0F0F0F" height="h-4" />
                  <AnimatedLine filled={filledCount >= 2} widthClass="w-full" color="rgba(15,15,15,0.25)" />
                  <AnimatedLine filled={filledCount >= 3} widthClass="w-5/6" color="rgba(15,15,15,0.15)" delay={40} />
                  <div className="pt-2">
                    <AnimatedLine filled={filledCount >= 4} widthClass="w-1/2" color="#F3645C" height="h-3" />
                  </div>
                  <AnimatedLine filled={filledCount >= 5} widthClass="w-full" color="rgba(15,15,15,0.08)" delay={40} />
                  <AnimatedLine filled={filledCount >= 6} widthClass="w-full" color="rgba(15,15,15,0.08)" delay={80} />
                  <div className="flex gap-2 pt-3" style={{
                    opacity: filledCount >= TOTAL ? 1 : 0,
                    transform: filledCount >= TOTAL ? 'translateY(0)' : 'translateY(6px)',
                    transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
                  }}>
                    <div className="flex-1 h-8 rounded flex items-center justify-center text-white text-xs font-bold" style={{ background: '#F3645C' }}>PDF</div>
                    <div className="flex-1 h-8 rounded flex items-center justify-center text-white text-xs font-bold" style={{ background: '#0F0F0F' }}>DOCX</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-full shadow-lg text-sm font-bold text-white"
                style={{
                  background: '#58C09D',
                  opacity: badgeVisible ? 1 : 0,
                  transform: badgeVisible ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(8px)',
                  transition: 'opacity 0.35s cubic-bezier(0.34,1.56,0.64,1), transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                }}>
                ✓ Format Preserved
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/editor"
            className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-xl font-semibold transition-all shadow-lg hover:opacity-90"
            style={{ background: '#0F0F0F' }}>
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
