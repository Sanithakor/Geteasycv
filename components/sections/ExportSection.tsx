'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  FileDown,
  FileType,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Download,
} from 'lucide-react';

function useSequentialFill(totalSteps: number, stepDelay = 260) {
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
        setTimeout(runAnimation, 3600);
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
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { filledCount, badgeVisible, ref };
}

const EXPORT_OPTIONS = [
  {
    icon: FileDown,
    format: 'PDF',
    title: 'Vector PDF Export',
    tag: 'Industry Standard • 300 DPI',
    desc: 'Guarantees 100% pixel-perfect typography, embedded fonts, and exact page margins on any device or printer.',
    accentColor: '#E11D48',
    iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
    badge: 'bg-rose-50 text-rose-700',
    bullets: ['ATS readable text layer', 'Crystal-clear 300 DPI vector rendering', 'Zero formatting displacement'],
  },
  {
    icon: FileType,
    format: 'DOCX',
    title: 'Editable Word (DOCX)',
    tag: 'Recruiter Preferred • Full Edit',
    desc: 'Structured Microsoft Word format designed for recruiters who require editable resume submissions.',
    accentColor: '#2563EB',
    iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
    badge: 'bg-blue-50 text-blue-700',
    bullets: ['Native Microsoft Word compatibility', 'Clean tableless semantic layout', 'Retains typography styles'],
  },
  {
    icon: Share2,
    format: 'LINK',
    title: 'Live Web Portfolio Link',
    tag: 'One-Click • Real-Time Stats',
    desc: 'Generate a fast, mobile-optimized public link to share directly in LinkedIn DMs, emails, or job applications.',
    accentColor: '#7C3AED',
    iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
    badge: 'bg-purple-50 text-purple-700',
    bullets: ['Instant mobile & desktop rendering', 'Real-time viewer analytics', 'Direct PDF download button for recruiters'],
  },
];

const FEATURES = [
  {
    title: 'Strict ATS Compatibility Preserved',
    desc: 'Clean text layers with zero invisible tables, multi-column reading order errors, or graphics clipping.',
  },
  {
    title: 'Precision Print-Ready Margins',
    desc: 'Standardized 0.75" to 1" margins mathematically calculated for US Letter and international A4 papers.',
  },
  {
    title: 'Automatic Page-Break Balancing',
    desc: 'Intelligent layout engine prevents orphan headers and single hanging bullet lines across page breaks.',
  },
  {
    title: 'True Embedded Vector Fonts',
    desc: 'Professional typography render identically whether opened on macOS Preview, Adobe Acrobat, or Windows Edge.',
  },
];

export default function ExportSection() {
  const TOTAL = 6;
  const { filledCount, badgeVisible, ref } = useSequentialFill(TOTAL, 260);

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden font-sans bg-[#F8F8F6]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-violet-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-rose-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs mb-5">
            <FileDown className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Universal Export Options
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
            Export in Any Format,{' '}
            <span className="bg-gradient-to-r from-rose-500 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Without Distortion
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Download production-ready vector PDFs, fully editable Word DOCX files, or generate a sleek personal web link with zero formatting breakdown.
          </p>
        </div>

        {/* 3 Executive Format Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {EXPORT_OPTIONS.map(({ icon: Icon, format, title, tag, desc, iconBg, badge, bullets }) => (
            <div
              key={title}
              className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header of Card */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-2xs group-hover:scale-110 transition-transform ${iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${badge}`}>
                    {tag}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-950 transition-colors">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {desc}
                </p>

                {/* Feature Checklist */}
                <div className="space-y-2 pt-2 border-t border-slate-100 mb-6">
                  {bullets.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="/editor"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Select {format} Export</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

        {/* Executive Document Inspector & Formatting Guarantee Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg mb-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Quality & ATS Guarantees */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Fidelity Guarantee</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Perfect Formatting Guaranteed Across All Screen & Print Sizes
              </h3>

              <div className="space-y-4 pt-1">
                {FEATURES.map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-0.5">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Realistic Resume Document Inspector Animation */}
            <div className="lg:col-span-6 relative" ref={ref}>
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-6 relative overflow-hidden transition-all duration-300">
                {/* Header Bar */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-bold text-slate-500 ml-2">
                      alex-morgan-executive-cv.pdf
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ATS Ready
                  </span>
                </div>

                {/* Simulated Executive Resume Content */}
                <div className="space-y-3 font-sans">
                  {/* Name & Title */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base font-extrabold text-slate-900 leading-none mb-1">
                        Alex Morgan, MBA
                      </div>
                      <div className="text-xs font-semibold text-violet-700">
                        Senior Product Management Lead
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      San Francisco, CA
                    </div>
                  </div>

                  {/* Divider line */}
                  <div className="h-px bg-slate-100 my-2" />

                  {/* Animated Experience Bars */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-700 font-bold">
                      <span>Work Experience</span>
                      <span className="text-[10px] text-slate-400">2019 — Present</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="h-2 rounded bg-slate-100 overflow-hidden w-full">
                        <div
                          className="h-full bg-slate-900 rounded transition-all duration-500"
                          style={{ width: filledCount >= 1 ? '100%' : '0%' }}
                        />
                      </div>
                      <div className="h-2 rounded bg-slate-100 overflow-hidden w-5/6">
                        <div
                          className="h-full bg-slate-700 rounded transition-all duration-500"
                          style={{ width: filledCount >= 2 ? '100%' : '0%' }}
                        />
                      </div>
                      <div className="h-2 rounded bg-slate-100 overflow-hidden w-2/3">
                        <div
                          className="h-full bg-slate-400 rounded transition-all duration-500"
                          style={{ width: filledCount >= 3 ? '100%' : '0%' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Metrics highlight */}
                  <div className="p-2.5 rounded-xl bg-violet-50/60 border border-violet-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-violet-900">
                      • Spearheaded team of 12, driving +34% YoY growth
                    </span>
                    <span className="text-[10px] font-extrabold text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full shrink-0 ml-2">
                      Parsed
                    </span>
                  </div>

                  {/* Skills tags */}
                  <div className="flex items-center gap-1.5 pt-1">
                    {['Strategic Roadmapping', 'User Research', 'SQL & Analytics', 'Cross-Functional'].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Export Buttons Simulation */}
                  <div
                    className="flex gap-2 pt-3"
                    style={{
                      opacity: filledCount >= TOTAL ? 1 : 0.4,
                      transition: 'opacity 0.4s ease',
                    }}
                  >
                    <div className="flex-1 py-2 rounded-xl flex items-center justify-center text-white text-xs font-bold bg-slate-900 shadow-xs gap-1.5 cursor-pointer">
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </div>
                    <div className="flex-1 py-2 rounded-xl flex items-center justify-center text-slate-800 text-xs font-bold bg-slate-100 border border-slate-200/80 gap-1.5 cursor-pointer">
                      <FileType className="w-3.5 h-3.5 text-blue-600" />
                      <span>Export DOCX</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div
                className="absolute -bottom-3 -right-2 px-4 py-2 rounded-full shadow-lg text-xs font-bold text-white flex items-center gap-1.5 bg-emerald-600 border-2 border-white"
                style={{
                  opacity: badgeVisible ? 1 : 0,
                  transform: badgeVisible ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(8px)',
                  transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                }}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>100% Format Preserved</span>
              </div>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/editor"
            className="inline-flex items-center gap-2.5 px-8 py-4 text-white rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 transition-all shadow-md hover:shadow-lg hover:scale-102 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Create & Export Your Resume Now</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>
      </div>
    </section>
  );
}
