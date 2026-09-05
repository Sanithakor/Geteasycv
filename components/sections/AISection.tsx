'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  ArrowDown
} from 'lucide-react';
import toast from 'react-hot-toast';

interface AIExample {
  id: string;
  category: string;
  before: string;
  after: string;
  metrics: string;
  impactTag: string;
}

const AI_EXAMPLES: AIExample[] = [
  {
    id: 'team-lead',
    category: 'Leadership',
    before: '• Managed a team',
    after: '• Led cross-functional team of 8 to deliver 15% revenue growth',
    metrics: '+15% Revenue',
    impactTag: 'High Impact Leadership',
  },
  {
    id: 'customer-service',
    category: 'Customer Success',
    before: '• Worked with customers',
    after: '• Drove customer satisfaction (CSAT) by 24% through strategic relationship management',
    metrics: '+24% CSAT Score',
    impactTag: 'Customer Retention',
  },
  {
    id: 'project-mgmt',
    category: 'Project Management',
    before: '• Responsible for project updates',
    after: '• Orchestrated bi-weekly stakeholder updates, accelerating project delivery timelines by 2 weeks',
    metrics: '2 Weeks Faster',
    impactTag: 'Process Optimization',
  },
  {
    id: 'software-eng',
    category: 'Engineering',
    before: '• Fixed bugs in code',
    after: '• Resolved 45+ critical software vulnerabilities, reducing mobile app crash rate by 30%',
    metrics: '-30% App Crashes',
    impactTag: 'Quality Assurance',
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
        category: 'Custom Input',
        before: userTestedResult.before,
        after: userTestedResult.after,
        metrics: userTestedResult.metrics,
        impactTag: 'AI Optimized',
      }
    : AI_EXAMPLES[currentIndex];

  // Animation Timeline Controller
  useEffect(() => {
    if (!isPlaying) return;

    // Phase 1: Before State (0s -> 1.8s)
    setStage('before');

    const analyzeTimer = setTimeout(() => {
      // Phase 2: AI Analyzing State (1.8s -> 3.6s)
      setStage('analyzing');
    }, 1800);

    const revealTimer = setTimeout(() => {
      // Phase 3: Revealed Improved Result (3.6s -> 7.2s)
      setStage('after');
    }, 3600);

    const cycleTimer = setTimeout(() => {
      // Advance to next example after complete cycle (7.2s)
      if (!userTestedResult) {
        setCurrentIndex((prev) => (prev + 1) % AI_EXAMPLES.length);
      }
    }, 7500);

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
          metrics: '+25% Impact',
        });
        setStage('after');
        toast.success('AI Improvement generated!');
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
    setCurrentIndex(0);
    setStage('before');
  };

  return (
    <section
      className="py-16 sm:py-24 font-sans relative overflow-hidden"
      style={{
        background: '#F8F8F6',
        borderTop: '1px solid rgba(15,15,15,0.06)',
        borderBottom: '1px solid rgba(15,15,15,0.06)',
      }}
    >
      {/* Background Decorative Accents */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Copy & Interactive Controls */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200/80 bg-white text-[#0F0F0F] text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#F3645C]" />
              <span>AI-Powered Resume Transformation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-[#0F0F0F]">
              Transform Weak Bullets into{' '}
              <span style={{ color: '#F3645C' }}>High-Impact Statements</span>
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-[#333333]">
              Watch how GetEasyCV’s AI analyzes raw resume lines, extracts quantifiable achievements, and rewrites them to pass ATS filters and impress hiring managers.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-4 pt-2">
              {[
                {
                  icon: TrendingUp,
                  title: 'Action-Oriented Verbs & Metrics',
                  desc: 'Replaces generic phrases with strong power verbs and measurable results.',
                  bg: '#F5D17B',
                },
                {
                  icon: Target,
                  title: 'ATS Keyword Optimization',
                  desc: 'Injects industry-standard keywords aligned with target job descriptions.',
                  bg: '#BAC7FE',
                },
              ].map(({ icon: Icon, title, desc, bg }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 p-3.5 rounded-2xl bg-white border border-slate-200/60 shadow-2xs hover:shadow-md transition-all"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: bg }}
                  >
                    <Icon className="w-5 h-5 text-[#0F0F0F]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-0.5 text-[#0F0F0F]">{title}</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#555555]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Live Testing Widget */}
            <div className="pt-2">
              <div
                className="bg-white border rounded-2xl p-5 shadow-sm space-y-4"
                style={{ borderColor: 'rgba(15,15,15,0.12)' }}
              >
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F] flex items-center gap-1.5">
                    <Wand2 className="w-4 h-4 text-[#F3645C]" />
                    <span>Test Your Own Bullet Point Live:</span>
                  </label>
                  {userTestedResult && (
                    <button
                      type="button"
                      onClick={resetCustomTest}
                      className="text-[11px] font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset Preset Loop
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="e.g. Managed team and improved sales"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border rounded-xl outline-none transition-all bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-purple-300"
                    style={{ borderColor: 'rgba(15,15,15,0.15)', color: '#0F0F0F' }}
                  />

                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={selectedAction}
                      onChange={(e: any) => setSelectedAction(e.target.value)}
                      className="px-3 py-2 text-xs font-semibold border rounded-xl outline-none bg-[#F8F8F6] text-[#333333] cursor-pointer"
                      style={{ borderColor: 'rgba(15,15,15,0.15)' }}
                    >
                      <option value="improve_bullet">⚡ Stronger Action Verbs</option>
                      <option value="optimize_ats">🎯 ATS Keyword Boost</option>
                      <option value="add_impact">📊 Add Measurable Metrics</option>
                    </select>

                    <button
                      type="button"
                      onClick={handleTestAI}
                      disabled={isApiLoading}
                      className="px-4 py-2.5 font-bold text-xs rounded-xl text-white transition-all flex items-center gap-1.5 shadow-sm hover:opacity-90 cursor-pointer disabled:opacity-50"
                      style={{ background: '#0F0F0F' }}
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isApiLoading ? 'animate-spin' : ''}`} />
                      <span>{isApiLoading ? 'Transforming...' : 'Improve Bullet Live'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="pt-5 flex flex-wrap items-center gap-3">
                <Link
                  href="/editor"
                  className="px-6 py-3.5 text-white font-bold text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2 hover:opacity-90 cursor-pointer"
                  style={{ background: '#0F0F0F' }}
                >
                  <Sparkles className="w-4 h-4 text-[#F5D17B]" /> Try AI Resume Builder Free
                </Link>
                <Link
                  href="/ai-features"
                  className="px-5 py-3.5 font-bold text-sm rounded-xl border transition-all inline-flex items-center gap-2 hover:bg-slate-100/60 cursor-pointer"
                  style={{ background: '#FFFFFF', borderColor: 'rgba(15,15,15,0.12)', color: '#333333' }}
                >
                  <span>Explore AI Tools</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Animated Transformation Visualizer */}
          <div className="lg:col-span-6 space-y-6">
            {/* Visualizer Header Controls */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xl space-y-6 text-left">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold text-slate-500 ml-2 tracking-wide uppercase">
                    AI Transformation Engine
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
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                    {stage === 'before' && '1. Raw Input'}
                    {stage === 'analyzing' && '2. ✨ AI Processing'}
                    {stage === 'after' && '3. ✅ Enhanced Result'}
                  </span>
                </div>
              </div>

              {/* Preset Selector Tabs */}
              {!userTestedResult && (
                <div className="flex flex-wrap gap-1.5 pb-2">
                  {AI_EXAMPLES.map((ex, idx) => (
                    <button
                      key={ex.id}
                      type="button"
                      onClick={() => handleSelectExample(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentIndex === idx
                          ? 'bg-[#0F0F0F] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                      }`}
                    >
                      {ex.category}
                    </button>
                  ))}
                </div>
              )}

              {/* Progress Indicator Bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-emerald-400 to-[#F3645C] transition-all duration-300"
                  style={{
                    width: stage === 'before' ? '33%' : stage === 'analyzing' ? '66%' : '100%',
                  }}
                />
              </div>

              {/* MAIN ANIMATED CARD CONTAINER */}
              <div className="space-y-4 pt-1">
                {/* 1. BEFORE CARD */}
                <div
                  className={`rounded-2xl border p-5 transition-all duration-500 relative overflow-hidden ${
                    stage === 'before'
                      ? 'border-slate-300 bg-slate-50/90 shadow-sm'
                      : stage === 'analyzing'
                      ? 'border-purple-300 bg-purple-50/30 ring-2 ring-purple-400/20'
                      : 'border-slate-200 bg-slate-50/40 opacity-75'
                  }`}
                >
                  {/* Laser Scanning Beam when Analyzing */}
                  {stage === 'analyzing' && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse shadow-lg shadow-purple-500/50" />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-slate-200 text-slate-700">
                      BEFORE
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">Original Resume Line</span>
                  </div>

                  <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed font-mono">
                    {activeExample.before}
                  </p>
                </div>

                {/* 2. AI CONNECTING / PROCESSING INDICATOR */}
                <div className="flex flex-col items-center justify-center py-1 relative my-2">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500 shadow-md ${
                      stage === 'analyzing'
                        ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 text-white border-transparent scale-110 ring-4 ring-purple-300/40 animate-pulse'
                        : stage === 'after'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    <Sparkles
                      className={`w-4 h-4 ${
                        stage === 'analyzing'
                          ? 'animate-spin text-amber-300'
                          : stage === 'after'
                          ? 'text-emerald-600'
                          : 'text-[#F3645C]'
                      }`}
                    />

                    <span className="text-xs font-extrabold tracking-wide">
                      {stage === 'before' && 'AI Ready to Transform'}
                      {stage === 'analyzing' && '✨ AI Analyzing & Optimizing Content...'}
                      {stage === 'after' && '✅ AI Enhanced'}
                    </span>
                  </div>

                  <div className="h-4 w-0.5 bg-slate-200 my-1" />
                  <ArrowDown
                    className={`w-4 h-4 transition-all duration-300 ${
                      stage === 'analyzing'
                        ? 'text-purple-600 translate-y-1 scale-125'
                        : stage === 'after'
                        ? 'text-emerald-500'
                        : 'text-slate-300'
                    }`}
                  />
                </div>

                {/* 3. AFTER AI RESULT CARD */}
                <div
                  className={`rounded-2xl border p-5 transition-all duration-700 relative overflow-hidden ${
                    stage === 'after'
                      ? 'border-emerald-500 bg-emerald-50/30 shadow-xl ring-2 ring-emerald-500/20 translate-y-0 opacity-100'
                      : stage === 'analyzing'
                      ? 'border-purple-200 bg-purple-50/10 opacity-50 scale-98 translate-y-1'
                      : 'border-dashed border-slate-200 bg-white opacity-40 translate-y-2'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider text-white shadow-2xs"
                        style={{ background: '#58C09D' }}
                      >
                        AFTER AI
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                        <TrendingUp className="w-3 h-3 text-emerald-600" /> Improved
                      </span>
                    </div>

                    {stage === 'after' && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200 animate-bounce">
                        {activeExample.metrics}
                      </span>
                    )}
                  </div>

                  {stage === 'after' ? (
                    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed font-sans">
                        {activeExample.after}
                      </p>
                      <div className="pt-2 flex items-center gap-2 text-[11px] font-bold text-emerald-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>ATS-Friendly & Action-Oriented Rewrite</span>
                      </div>
                    </div>
                  ) : stage === 'analyzing' ? (
                    <div className="py-4 text-center space-y-2">
                      <div className="flex justify-center items-center gap-1.5 text-xs font-bold text-purple-600">
                        <Zap className="w-4 h-4 animate-bounce text-purple-600" />
                        <span>Generating impactful metrics & stronger action verbs...</span>
                      </div>
                      <div className="h-2 bg-purple-100 rounded-full w-3/4 mx-auto overflow-hidden">
                        <div className="h-full bg-purple-500 animate-pulse w-2/3" />
                      </div>
                    </div>
                  ) : (
                    <div className="py-4 text-center text-xs font-semibold text-slate-400">
                      Waiting for AI processing...
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Feature Card */}
              <div
                className="rounded-2xl p-4 flex items-start gap-3 border"
                style={{ background: '#D0B9EF', borderColor: 'rgba(15,15,15,0.10)' }}
              >
                <Sparkles className="w-5 h-5 shrink-0 text-[#0F0F0F] mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F0F0F] mb-0.5">
                    Context-Aware AI Intelligence
                  </h4>
                  <p className="text-xs leading-relaxed text-[#333333]">
                    GetEasyCV AI analyzes your exact target job role to customize vocabulary, metrics, and industry terminology for max ATS score.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
