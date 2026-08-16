'use client';

import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Loader2, AlertCircle, Download, Share2, Eye, Award } from 'lucide-react';

export default function PublicResumePage({ params }: { params: Promise<{ shareToken: string }> }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<any>(null);

  useEffect(() => {
    params.then(({ shareToken }) => {
      fetch(`/api/resumes/public/${shareToken}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.resume) {
            setResumeData(data.resume);
          } else {
            setError(data.error || 'Public resume not found');
          }
        })
        .catch(() => setError('Failed to load public resume.'))
        .finally(() => setLoading(false));
    });
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-600 animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600">Loading public resume...</p>
      </div>
    );
  }

  if (error || !resumeData) {
    return (
      <>
        <Navigation />
        <div className="min-h-[70vh] bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Resume Not Found</h2>
          <p className="text-slate-600 text-sm max-w-md mb-6">{error || 'This public resume link has been disabled or does not exist.'}</p>
          <Link href="/" className="px-6 py-2.5 bg-slate-900 text-white rounded-md text-sm font-bold shadow-sm hover:bg-slate-800">
            Go to GetEasyCV Home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const personal = resumeData.personal || {};

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-100/80 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Public Header Bar */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-slate-900">{personal.firstName} {personal.lastName}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  Verified Resume
                </span>
              </div>
              <p className="text-xs text-slate-500">{personal.title || 'Professional Resume'} • Hosted on GetEasyCV</p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/templates"
                className="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-md shadow-xs transition-all flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                <span>Build Yours Free</span>
              </Link>
            </div>
          </div>

          {/* Rendered CV Document Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 shadow-lg space-y-8 text-left text-slate-800 font-sans">
            {/* Contact Header */}
            <div className="border-b border-slate-200 pb-6 space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-900">{personal.firstName} {personal.lastName}</h2>
              <p className="text-base font-bold text-violet-600">{personal.title}</p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-2">
                {personal.email && <span>📧 {personal.email}</span>}
                {personal.phone && <span>📞 {personal.phone}</span>}
                {personal.location && <span>📍 {personal.location}</span>}
                {personal.website && <span>🌐 {personal.website}</span>}
              </div>
            </div>

            {/* Professional Summary */}
            {resumeData.summary && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Professional Summary</h3>
                <p className="text-sm leading-relaxed text-slate-700">{resumeData.summary}</p>
              </div>
            )}

            {/* Experience */}
            {resumeData.experience && resumeData.experience.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Work Experience</h3>
                <div className="space-y-4">
                  {resumeData.experience.map((exp: any) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm font-bold text-slate-900">{exp.position} — <span className="text-violet-700">{exp.company}</span></span>
                        <span className="text-xs text-slate-400">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                      </div>
                      {exp.description && <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill: any) => (
                    <span key={skill.id} className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-md">
                      {skill.name}
                    </span>
                  ))}
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
