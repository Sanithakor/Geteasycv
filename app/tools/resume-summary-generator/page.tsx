'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Sparkles, ArrowRight, Copy, Check, Wand2 } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/seo/SchemaOrg';

export default function ResumeSummaryGeneratorPage() {
  const [jobTitle, setJobTitle] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Mid-Level (3-5 yrs)');
  const [keySkills, setKeySkills] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [summaries, setSummaries] = useState<string[]>([]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim()) return;

    setGenerating(true);
    setTimeout(() => {
      const title = jobTitle.trim();
      const skills = keySkills.trim() || 'team leadership, strategic planning, cross-functional collaboration';

      setSummaries([
        `Results-oriented ${title} with ${experienceLevel.toLowerCase()} of hands-on experience specializing in ${skills}. Proven track record of improving operational efficiency, driving project delivery, and optimizing key performance metrics.`,
        `Driven ${title} skilled in ${skills}. Adept at leading cross-functional teams, solving complex technical challenges, and delivering high-quality business outcomes on schedule.`,
        `Detail-focused ${title} with deep expertise in ${skills}. Passionate about continuous learning, process optimization, and elevating organizational productivity.`,
      ]);
      setGenerating(false);
    }, 1000);
  };

  const handleCopy = (text: string, idx: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    }
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Tools', url: '/tools/resume-summary-generator' },
          { name: 'Resume Summary Generator', url: '/tools/resume-summary-generator' },
        ]}
      />
      <Navigation />

      <main className="min-h-screen bg-slate-50/50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Free AI Resume Summary Writer</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Free Resume Summary Generator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Generate 3 professional recruiter-tested summary statements tailored to your target job title in seconds.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-6">
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">Target Job Title *</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Software Engineer, Marketing Manager, Registered Nurse"
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15 outline-none bg-slate-50/40"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">Experience Level</label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15 outline-none bg-white cursor-pointer"
                  >
                    <option>Entry Level (0-2 yrs)</option>
                    <option>Mid-Level (3-5 yrs)</option>
                    <option>Senior Level (6+ yrs)</option>
                    <option>Executive / Management</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">Top 3 Skills (Optional)</label>
                  <input
                    type="text"
                    value={keySkills}
                    onChange={(e) => setKeySkills(e.target.value)}
                    placeholder="e.g. React, Node.js, System Design"
                    className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15 outline-none bg-slate-50/40"
                  />
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={generating}
                  className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  {generating ? (
                    <>
                      <Wand2 className="w-4 h-4 animate-spin text-white" />
                      <span>Writing Professional Summaries...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>Generate Professional Summaries</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Generated Results */}
            {summaries.length > 0 && (
              <div className="pt-8 border-t border-slate-100 space-y-4 animate-in fade-in">
                <h3 className="font-bold text-slate-900 text-base">Generated Professional Summaries:</h3>

                {summaries.map((sum, i) => (
                  <div key={i} className="p-5 bg-purple-50/40 rounded-2xl border border-purple-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">Option {i + 1}</span>
                      <button
                        onClick={() => handleCopy(sum, i)}
                        className="px-3 py-1 bg-white hover:bg-purple-50 border border-purple-200 rounded-lg text-xs font-bold text-purple-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        {copiedIdx === i ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedIdx === i ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed font-normal">"{sum}"</p>
                  </div>
                ))}

                <div className="pt-4 text-center">
                  <Link
                    href="/editor"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0F0F0F] hover:bg-black text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <span>Use Summary in Live Builder</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
