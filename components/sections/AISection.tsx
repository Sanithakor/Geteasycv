'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, TrendingUp, Target, Wand2, ArrowRight, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AISection() {
  const [customInput, setCustomInput] = useState('Responsible for client communication and project updates');
  const [selectedAction, setSelectedAction] = useState<'improve_bullet' | 'optimize_ats' | 'add_impact'>('improve_bullet');
  const [isLoading, setIsLoading] = useState(false);
  const [demoResult, setDemoResult] = useState<{ original: string; suggestion: string } | null>(null);

  const handleTestAI = async () => {
    if (!customInput.trim()) { toast.error('Please enter a bullet point to improve.'); return; }
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/resume-improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: customInput, action: selectedAction }),
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setDemoResult({ original: data.data.original, suggestion: data.data.suggestion });
        toast.success('AI Improvement generated!');
      } else {
        toast.error(data.error || 'Failed to generate suggestion.');
      }
    } catch { toast.error('AI service temporarily unavailable.'); }
    finally { setIsLoading(false); }
  };

  return (
    <section className="py-16 sm:py-24 font-sans" style={{ background: '#F8F8F6', borderTop: '1px solid rgba(15,15,15,0.06)', borderBottom: '1px solid rgba(15,15,15,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200/80 bg-white text-[#0F0F0F] text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#F3645C]" />
              <span>AI-Powered Assistant</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-[#0F0F0F]">
              Improve Your Resume with{' '}
              <span style={{ color: '#F3645C' }}>One Click</span>
            </h2>

            <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#333333' }}>
              Our AI assistant analyzes your content and suggests powerful improvements that highlight your achievements and pass ATS filters.
            </p>

            <div className="space-y-5 pt-2">
              {[
                { icon: TrendingUp, title: 'Improve Bullet Points',    desc: 'Transform basic descriptions into powerful achievement statements.', bg: '#F5D17B' },
                { icon: Target,     title: 'Optimize for Keywords',    desc: 'Automatically enhance content with industry-specific ATS keywords.', bg: '#BAC7FE' },
              ].map(({ icon: Icon, title, desc, bg }) => (
                <div key={title} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white transition-all">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
                    <Icon className="w-5 h-5" style={{ color: '#0F0F0F' }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1" style={{ color: '#0F0F0F' }}>{title}</h3>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#333333' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/editor"
                  className="px-6 py-3.5 text-white font-bold text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2 hover:opacity-90"
                  style={{ background: '#0F0F0F' }}>
                  <Wand2 className="w-4 h-4" /> Try AI Assistant
                </Link>
                <button type="button" onClick={handleTestAI}
                  className="px-5 py-3.5 font-bold text-sm rounded-xl border transition-all inline-flex items-center gap-2 hover:opacity-90"
                  style={{ background: '#FFFFFF', borderColor: 'rgba(15,15,15,0.12)', color: '#333333' }}>
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Test AI Live
                </button>
              </div>

              <div className="bg-white border rounded-xl p-4 shadow-sm space-y-3" style={{ borderColor: 'rgba(15,15,15,0.10)' }}>
                <label className="block text-xs font-bold" style={{ color: '#0F0F0F' }}>Test Your Own Bullet Point:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="e.g. Managed sales team and improved revenue"
                    className="w-full px-3 py-2 text-xs border rounded-lg outline-none transition-all"
                    style={{ borderColor: 'rgba(15,15,15,0.12)', color: '#0F0F0F' }}
                    onFocus={e => (e.target.style.borderColor = '#BAC7FE')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(15,15,15,0.12)')}
                  />
                  <select
                    value={selectedAction}
                    onChange={(e: any) => setSelectedAction(e.target.value)}
                    className="px-2 py-2 text-xs border rounded-lg outline-none"
                    style={{ background: '#F8F8F6', borderColor: 'rgba(15,15,15,0.12)', color: '#333333' }}>
                    <option value="improve_bullet">Improve Bullet</option>
                    <option value="optimize_ats">ATS Keywords</option>
                    <option value="add_impact">Add Metrics</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Before/After cards */}
          <div className="lg:col-span-6 space-y-6">
            {demoResult && (
              <div className="bg-white rounded-2xl border shadow-xl overflow-hidden" style={{ borderColor: '#BAC7FE' }}>
                <div className="p-5 border-b" style={{ background: '#F8F8F6', borderColor: 'rgba(15,15,15,0.08)' }}>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold inline-block mb-2" style={{ background: 'rgba(15,15,15,0.08)', color: '#333333' }}>BEFORE</span>
                  <p className="text-xs sm:text-sm font-medium" style={{ color: '#333333' }}>{demoResult.original}</p>
                </div>
                <div className="flex justify-center -my-3.5 relative z-10">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-md" style={{ background: '#D0B9EF' }}>
                    <Sparkles className="w-4 h-4" style={{ color: '#0F0F0F' }} />
                  </div>
                </div>
                <div className="p-5" style={{ background: '#FFFFFF' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white inline-block" style={{ background: '#58C09D' }}>AFTER AI</span>
                    <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded border" style={{ color: '#58C09D', background: 'rgba(88,192,157,0.08)', borderColor: 'rgba(88,192,157,0.3)' }}>
                      <TrendingUp className="w-3 h-3" /> Improved
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold leading-relaxed" style={{ color: '#0F0F0F' }}>{demoResult.suggestion}</p>
                </div>
              </div>
            )}

            {/* Static card 1 */}
            {[
              { before: '• Managed a team', after: '• Led cross-functional team of 8 to deliver 15% revenue growth' },
              { before: '• Worked with customers', after: '• Drove customer satisfaction through strategic relationship management' },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-2xl border shadow-md overflow-hidden text-left" style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
                <div className="p-5 border-b" style={{ background: '#F8F8F6', borderColor: 'rgba(15,15,15,0.08)' }}>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold inline-block mb-2" style={{ background: 'rgba(15,15,15,0.08)', color: '#333333' }}>BEFORE</span>
                  <p className="text-xs sm:text-sm font-medium" style={{ color: '#333333' }}>{card.before}</p>
                </div>
                <div className="flex justify-center -my-3.5 relative z-10">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-md" style={{ background: '#D0B9EF' }}>
                    <Sparkles className="w-4 h-4" style={{ color: '#0F0F0F' }} />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white inline-block" style={{ background: '#58C09D' }}>AFTER AI</span>
                    <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded border" style={{ color: '#58C09D', background: 'rgba(88,192,157,0.08)', borderColor: 'rgba(88,192,157,0.3)' }}>
                      <TrendingUp className="w-3 h-3" /> Improved
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold leading-relaxed" style={{ color: '#0F0F0F' }}>{card.after}</p>
                </div>
              </div>
            ))}

            {/* Smart suggestions box */}
            <div className="border rounded-xl p-4 flex items-start gap-3 text-left" style={{ background: '#D0B9EF', borderColor: 'rgba(15,15,15,0.10)' }}>
              <Sparkles className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#0F0F0F' }} />
              <div>
                <h4 className="text-xs sm:text-sm font-bold mb-0.5" style={{ color: '#0F0F0F' }}>Smart Suggestions</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#333333' }}>
                  AI analyzes your industry and role to provide contextually relevant improvements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
