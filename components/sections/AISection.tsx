'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  TrendingUp,
  Target,
  Wand2,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  Zap,
  Play,
  Pause,
  RotateCcw,
  ArrowDown,
  Cpu,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface AIExample {
  id: string;
  category: string;
  before: string;
  after: string;
  metrics: string;
  impactTag: string;
  atsScore: number;
}

const AI_EXAMPLES: AIExample[] = [
  {
    id: 'team-lead',
    category: 'Leadership',
    before: '• Managed a team of employees on sales projects',
    after: '• Spearheaded cross-functional team of 8 to accelerate delivery, driving 15% YoY revenue growth',
    metrics: '+15% Revenue',
    impactTag: 'High-Impact Leadership',
    atsScore: 98,
  },
  {
    id: 'customer-service',
    category: 'Customer Success',
    before: '• Worked with customers and answered inquiries',
    after: '• Elevated Customer Satisfaction (CSAT) by 24% through proactive relationship workflows and SLA adherence',
    metrics: '+24% CSAT',
    impactTag: 'Retention & Growth',
    atsScore: 96,
  },
  {
    id: 'project-mgmt',
    category: 'Project Management',
    before: '• Responsible for weekly project updates',
    after: '• Orchestrated bi-weekly executive briefings and agile roadmaps, cutting delivery cycle time by 2 weeks',
    metrics: '2 Weeks Faster',
    impactTag: 'Agile Efficiency',
    atsScore: 99,
  },
  {
    id: 'software-eng',
    category: 'Software Engineering',
    before: '• Fixed bugs in mobile app code',
    after: '• Diagnosed and patched 45+ critical production defects, lowering mobile crash rate by 32%',
    metrics: '-32% Crashes',
    impactTag: 'System Stability',
    atsScore: 97,
  },
];

export default function AISection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState<'before' | 'analyzing' | 'after'>('before');
  const [isPlaying, setIsPlaying] = useState(true);

  // Custom user testing state
  const [customInput, setCustomInput] = useState('Responsible for client communication and project updates');
  const [selectedAction, setSelectedAction] = useState<'improve_bullet' | 'optimize_ats' | 'add_impact'>('improve_bullet');
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [userTestedResult, setUserTestedResult] = useState<{ before: string; after: string; metrics: string } | null>(null);

  const activeExample = userTestedResult
    ? {
        id: 'custom',
        category: 'Custom Test',
        before: userTestedResult.before,
        after: userTestedResult.after,
        metrics: userTestedResult.metrics,
        impactTag: 'AI Optimized',
        atsScore: 98,
      }
    : AI_EXAMPLES[currentIndex];

  // Animation Timeline Controller
  useEffect(() => {
    if (!isPlaying) return;

    setStage('before');

    const analyzeTimer = setTimeout(() => {
      setStage('analyzing');
    }, 1800);

    const revealTimer = setTimeout(() => {
      setStage('after');
    }, 3600);

    const cycleTimer = setTimeout(() => {
      if (!userTestedResult) {
        setCurrentIndex((prev) => (prev + 1) % AI_EXAMPLES.length);
      }
    }, 7800);

    return () => {
      clearTimeout(analyzeTimer);
      clearTimeout(revealTimer);
      clearTimeout(cycleTimer);
    };
  }, [currentIndex, isPlaying, userTestedResult]);

  const handleSelectExample = (idx: number) => {
    setUserTestedResult(null);
    setCurrentIndex(idx);
    setStage('before');
  };

  const handleTestAI = async () => {
    if (!customInput.trim()) {
      toast.error('Please enter a bullet point to improve.');
      return;
    }
    setIsApiLoading(true);
    setStage('analyzing');

    try {
      const res = await fetch('/api/ai/resume-improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: customInput, action: selectedAction }),
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setUserTestedResult({
          before: `• ${data.data.original.replace(/^•\s*/, '')}`,
          after: `• ${data.data.suggestion.replace(/^•\s*/, '')}`,
          metrics: '+28% Measurable Impact',
        });
        setStage('after');
        toast.success('AI suggestion generated!');
      } else {
        toast.error(data.error || 'Failed to generate suggestion.');
        setStage('before');
      }
    } catch {
      toast.error('AI service temporarily unavailable.');
      setStage('before');
    } finally {
      setIsApiLoading(false);
    }
  };

  const resetCustomTest = () => {
    setUserTestedResult(null);
    setStage('before');
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden font-sans bg-white border-y border-slate-200/80">
      {/* Soft ambient blur accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-violet-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Copy & Interactive Controls */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-2xs text-xs font-bold uppercase tracking-wider"
              style={{ background: '#FFFFFF', borderColor: 'rgba(15,15,15,0.12)', color: '#0F0F0F' }}>
              <Sparkles className="w-3.5 h-3.5" style={{ color: '#F3645C' }} />
              <span>AI Resume Copilot</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-[#0F0F0F]">
              Transform Weak Bullets into{' '}
              <span style={{ color: '#F3645C' }}>High-Impact Statements</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#333333]">
              Turn passive task descriptions into quantified achievements. Our AI extracts measurable outcomes, injects industry action verbs, and optimizes keywords so your resume passes ATS parsers and catches recruiters&apos; attention.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-3 pt-2">
              {[
                {
                  icon: TrendingUp,
                  title: 'Action-Oriented Verbs & Metrics',
                  desc: 'Replaces vague duties with quantifiable numbers, percentages, and leadership impact.',
                  iconBg: '#F5D17B',
                },
                {
                  icon: Target,
                  title: 'ATS Keyword Optimization',
                  desc: 'Injects verified industry keywords matched to contemporary ATS job algorithms.',
                  iconBg: '#BAC7FE',
                },
              ].map(({ icon: Icon, title, desc, iconBg }) => (
                <div
                  key={title}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-black/5 shadow-2xs"
                    style={{ background: iconBg }}>
                    <Icon className="w-5 h-5 text-[#0F0F0F]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#0F0F0F] mb-0.5">{title}</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#555555]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Live Testing Widget */}
            <div className="pt-2">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <Wand2 className="w-4 h-4 text-violet-600" />
                    <span>Test Your Own Bullet Point Live:</span>
                  </label>
                  {userTestedResult && (
                    <button
                      type="button"
                      onClick={resetCustomTest}
                      className="text-[11px] font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset Sample Loop
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="e.g. Managed team and improved sales"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl outline-none transition-all bg-slate-50/50 focus:bg-white focus:border-violet-400 focus:ring-2 focus:ring-violet-100 text-slate-900"
                  />

                  {/* Preset quick chips */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-[11px] text-slate-400 font-medium">Try preset:</span>
                    {[
                      'Managed 5 employees on marketing projects',
                      'Assisted clients with inquiries and tickets',
                      'Wrote code and fixed application bugs',
                    ].map((sample) => (
                      <button
                        key={sample}
                        type="button"
                        onClick={() => setCustomInput(sample)}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
                      >
                        {sample.length > 28 ? `${sample.slice(0, 28)}...` : sample}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <select
                      value={selectedAction}
                      onChange={(e: any) => setSelectedAction(e.target.value)}
                      className="px-3.5 py-2 text-xs font-semibold border border-slate-200 rounded-xl outline-none bg-slate-50 text-slate-800 cursor-pointer focus:bg-white"
                    >
                      <option value="improve_bullet">⚡ Stronger Action Verbs</option>
                      <option value="optimize_ats">🎯 ATS Keyword Boost</option>
                      <option value="add_impact">📊 Add Measurable Metrics</option>
                    </select>

                    <button
                      type="button"
                      onClick={handleTestAI}
                      disabled={isApiLoading}
                      className="px-5 py-2.5 font-bold text-xs rounded-xl text-white bg-slate-900 hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isApiLoading ? 'animate-spin' : ''}`} />
                      <span>{isApiLoading ? 'Optimizing...' : 'Improve Bullet Live'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/editor"
                  className="px-6 py-3 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md bg-slate-900 hover:bg-slate-800 transition-all inline-flex items-center gap-2 cursor-pointer hover:scale-102"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Try AI Resume Builder Free</span>
                </Link>
                <Link
                  href="/ai-features"
                  className="px-5 py-3 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore All AI Features</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Animated Transformation Visualizer */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xl space-y-5 text-left relative overflow-hidden">
              
              {/* Window Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold text-slate-600 ml-2 tracking-wide uppercase">
                    AI Bullet Transformation Engine
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                    title={isPlaying ? 'Pause auto-play' : 'Play animation loop'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200">
                    {stage === 'before' && '1. Raw Draft'}
                    {stage === 'analyzing' && '2. AI Synthesizing...'}
                    {stage === 'after' && '3. ATS Ready'}
                  </span>
                </div>
              </div>

              {/* Preset Selector Tabs */}
              {!userTestedResult && (
                <div className="flex flex-wrap gap-1.5">
                  {AI_EXAMPLES.map((ex, idx) => (
                    <button
                      key={ex.id}
                      type="button"
                      onClick={() => handleSelectExample(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        currentIndex === idx
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                      }`}
                    >
                      {ex.category}
                    </button>
                  ))}
                </div>
              )}

              {/* Shimmering Progress Bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-500 transition-all duration-300"
                  style={{
                    width: stage === 'before' ? '33%' : stage === 'analyzing' ? '66%' : '100%',
                  }}
                />
              </div>

              {/* Transformation Stack */}
              <div className="space-y-3">
                {/* 1. BEFORE CARD */}
                <div
                  className={`rounded-2xl border p-4 sm:p-5 transition-all duration-500 relative overflow-hidden ${
                    stage === 'before'
                      ? 'border-slate-300 bg-slate-50/90 shadow-2xs'
                      : stage === 'analyzing'
                      ? 'border-violet-200 bg-violet-50/20'
                      : 'border-slate-200 bg-slate-50/40 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-slate-200 text-slate-700">
                      BEFORE • RAW DRAFT
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">Unoptimized Line</span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed font-mono">
                    {activeExample.before}
                  </p>
                </div>

                {/* 2. AI CONNECTOR */}
                <div className="flex items-center justify-center py-0.5">
                  <div
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all duration-300 shadow-xs ${
                      stage === 'analyzing'
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-transparent ring-4 ring-violet-100 animate-pulse'
                        : stage === 'after'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    <Sparkles
                      className={`w-3.5 h-3.5 ${
                        stage === 'analyzing'
                          ? 'animate-spin text-amber-300'
                          : stage === 'after'
                          ? 'text-emerald-600'
                          : 'text-violet-600'
                      }`}
                    />
                    <span>
                      {stage === 'before' && 'Ready to Enhance'}
                      {stage === 'analyzing' && 'Analyzing Verbs & Metrics...'}
                      {stage === 'after' && 'Enhanced with Metrics'}
                    </span>
                    <ArrowDown className="w-3 h-3 ml-0.5" />
                  </div>
                </div>

                {/* 3. AFTER CARD */}
                <div
                  className={`rounded-2xl border p-4 sm:p-5 transition-all duration-500 relative overflow-hidden ${
                    stage === 'after'
                      ? 'border-emerald-500/80 bg-emerald-50/30 shadow-md ring-1 ring-emerald-500/20'
                      : stage === 'analyzing'
                      ? 'border-violet-200 bg-violet-50/20 opacity-60'
                      : 'border-dashed border-slate-200 bg-white opacity-40'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white">
                        AFTER AI
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        <TrendingUp className="w-3 h-3 text-emerald-600" /> ATS Verified
                      </span>
                    </div>

                    {stage === 'after' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-violet-100 text-violet-800 border border-violet-200">
                        {activeExample.metrics}
                      </span>
                    )}
                  </div>

                  {stage === 'after' ? (
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                        {activeExample.after}
                      </p>
                      <div className="pt-2 flex items-center justify-between text-[11px] font-medium text-slate-500 border-t border-emerald-100/60">
                        <span className="flex items-center gap-1 text-emerald-700 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Action verb & metric added
                        </span>
                        <span className="font-bold text-slate-700">ATS Score: 98/100</span>
                      </div>
                    </div>
                  ) : stage === 'analyzing' ? (
                    <div className="py-3 text-center space-y-2">
                      <div className="flex justify-center items-center gap-1.5 text-xs font-bold text-violet-600">
                        <Zap className="w-3.5 h-3.5 animate-bounce text-violet-600" />
                        <span>Extracting achievements and power verbs...</span>
                      </div>
                      <div className="h-1.5 bg-violet-100 rounded-full w-2/3 mx-auto overflow-hidden">
                        <div className="h-full bg-violet-600 animate-pulse w-3/4" />
                      </div>
                    </div>
                  ) : (
                    <div className="py-3 text-center text-xs font-medium text-slate-400">
                      Waiting for AI synthesis loop...
                    </div>
                  )}
                </div>
              </div>

              {/* Sleek Intelligence Metrics Panel (replaces clunky solid purple box) */}
              <div className="rounded-2xl p-4 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-500/20 text-violet-300 flex items-center justify-center shrink-0 border border-violet-500/30">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-snug">
                      Context-Aware Role Intelligence
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      Trained on 50,000+ accepted resumes across Fortune 500 job specs.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Interview Boost</div>
                    <div className="text-xs font-extrabold text-emerald-400">+3.2x Higher</div>
                  </div>
                  <div className="w-px h-6 bg-slate-700" />
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-400">ATS Pass Rate</div>
                    <div className="text-xs font-extrabold text-violet-300">99.4%</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
