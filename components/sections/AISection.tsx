'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, TrendingUp, Target, Wand2, ArrowRight, Check, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AISection() {
  const [customInput, setCustomInput] = useState('Responsible for client communication and project updates');
  const [selectedAction, setSelectedAction] = useState<'improve_bullet' | 'optimize_ats' | 'add_impact'>('improve_bullet');
  const [isLoading, setIsLoading] = useState(false);
  const [demoResult, setDemoResult] = useState<{ original: string; suggestion: string } | null>(null);

  const aiFeatures = [
    {
      icon: TrendingUp,
      title: 'Improve Bullet Points',
      description: 'Transform basic descriptions into powerful achievement statements',
      before: '• Managed a team',
      after: '• Led cross-functional team of 8 to deliver 15% revenue growth',
    },
    {
      icon: Target,
      title: 'Optimize for Keywords',
      description: 'Automatically enhance content with industry-specific ATS keywords',
      before: '• Worked with customers',
      after: '• Drove customer satisfaction through strategic relationship management',
    },
  ];

  const handleTestAI = async () => {
    if (!customInput.trim()) {
      toast.error('Please enter a bullet point to improve.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/resume-improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: customInput,
          action: selectedAction,
        }),
      });

      const data = await res.json();
      if (res.ok && data.data) {
        setDemoResult({
          original: data.data.original,
          suggestion: data.data.suggestion,
        });
        toast.success('AI Improvement generated!');
      } else {
        toast.error(data.error || 'Failed to generate suggestion.');
      }
    } catch (err) {
      toast.error('AI service temporarily unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-[#FFF8F5]/50 via-white to-slate-50 font-sans border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Content & Feature List) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF8F5] text-[#FF570F] border border-purple-200/80 rounded-full font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-POWERED</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Improve Your Resume with{' '}
              <span className="text-[#FF570F]">One Click</span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Our AI assistant analyzes your content and suggests powerful improvements that highlight your achievements and pass ATS filters.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-5 pt-2">
              {aiFeatures.map((feat, idx) => {
                const IconComponent = feat.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-3 rounded-md hover:bg-white transition-all">
                    <div className="w-10 h-10 rounded-md bg-[#FFF0EB]/80 text-[#FF570F] flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base mb-1">
                        {feat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Try AI Demo Drawer Toggle / Action CTA */}
            <div className="pt-4 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/editor"
                  className="px-6 py-3.5 bg-[#FF570F] hover:bg-[#E04800] text-white font-bold text-sm rounded-md shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Try AI Assistant</span>
                </Link>

                <button
                  type="button"
                  onClick={() => handleTestAI()}
                  className="px-5 py-3.5 bg-white border border-purple-200 text-[#E04800] hover:bg-[#FFF8F5] font-bold text-sm rounded-md shadow-2xs transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Test AI Generator Live</span>
                </button>
              </div>

              {/* Interactive Input Console */}
              <div className="bg-white border border-[#FFD4C2] rounded-md p-4 shadow-xs space-y-3">
                <label className="block text-xs font-bold text-slate-700">Test Your Own Bullet Point:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="e.g. Managed sales team and improved revenue"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF570F]"
                  />
                  <select
                    value={selectedAction}
                    onChange={(e: any) => setSelectedAction(e.target.value)}
                    className="px-2 py-2 text-xs border border-slate-200 rounded-md bg-slate-50 text-slate-700 font-semibold focus:outline-none"
                  >
                    <option value="improve_bullet">Improve Bullet</option>
                    <option value="optimize_ats">ATS Keywords</option>
                    <option value="add_impact">Add Metrics</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Before / After Comparison Cards Showcase) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Live Interactive Result (if generated by user) */}
            {demoResult ? (
              <div className="bg-white rounded-md border border-purple-300 shadow-xl overflow-hidden animate-in fade-in duration-200">
                <div className="p-5 bg-slate-50 border-b border-slate-200/80">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded">
                      BEFORE
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium">
                    {demoResult.original}
                  </p>
                </div>

                <div className="flex justify-center -my-3.5 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-[#FF570F] text-white flex items-center justify-center shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 bg-[#FFF8F5]/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#FF570F] text-white text-[10px] font-bold rounded">
                        AFTER AI
                      </span>
                      <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <TrendingUp className="w-3 h-3" />
                        Improved
                      </span>
                    </div>
                    <Link
                      href="/editor"
                      className="text-[11px] font-bold text-[#E04800] hover:underline flex items-center gap-1"
                    >
                      Use in Resume <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <p className="text-slate-900 text-xs sm:text-sm font-bold leading-relaxed">
                    {demoResult.suggestion}
                  </p>
                </div>
              </div>
            ) : null}

            {/* Card 1 */}
            <div className="bg-white rounded-md border border-slate-200/80 shadow-md overflow-hidden text-left">
              {/* Before */}
              <div className="p-5 bg-slate-50/80 border-b border-slate-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded">
                    BEFORE
                  </span>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium">
                  • Managed a team
                </p>
              </div>

              {/* Floating Divider Circle */}
              <div className="flex justify-center -my-3.5 relative z-10">
                <div className="w-8 h-8 rounded-full bg-[#FF570F] text-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              {/* After */}
              <div className="p-5 bg-[#FFF8F5]/40">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-[#FF570F] text-white text-[10px] font-bold rounded">
                    AFTER AI
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <TrendingUp className="w-3 h-3" />
                    Improved
                  </span>
                </div>
                <p className="text-slate-900 text-xs sm:text-sm font-bold leading-relaxed">
                  • Led cross-functional team of 8 to deliver 15% revenue growth
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-md border border-slate-200/80 shadow-md overflow-hidden text-left">
              {/* Before */}
              <div className="p-5 bg-slate-50/80 border-b border-slate-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded">
                    BEFORE
                  </span>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium">
                  • Worked with customers
                </p>
              </div>

              {/* Floating Divider Circle */}
              <div className="flex justify-center -my-3.5 relative z-10">
                <div className="w-8 h-8 rounded-full bg-[#FF570F] text-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              {/* After */}
              <div className="p-5 bg-[#FFF8F5]/40">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-[#FF570F] text-white text-[10px] font-bold rounded">
                    AFTER AI
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <TrendingUp className="w-3 h-3" />
                    Improved
                  </span>
                </div>
                <p className="text-slate-900 text-xs sm:text-sm font-bold leading-relaxed">
                  • Drove customer satisfaction through strategic relationship management
                </p>
              </div>
            </div>

            {/* Smart Suggestions Box */}
            <div className="bg-[#FFF8F5]/90 border border-purple-200/80 rounded-md p-4 flex items-start gap-3 text-left">
              <Sparkles className="w-5 h-5 text-[#FF570F] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-purple-900 mb-0.5">
                  Smart Suggestions
                </h4>
                <p className="text-xs text-[#E04800] leading-relaxed">
                  AI analyzes your industry and role to provide contextually relevant improvements
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
