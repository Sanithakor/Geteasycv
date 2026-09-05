'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { exportToPDF, exportToImage } from '@/lib/exportUtils';
import { exportToNativeDocx } from '@/lib/export/docxExporter';
import { exportToVectorPDF } from '@/lib/export/vectorPdfExporter';
import {
  FileText,
  Sparkles,
  Download,
  FileDown,
  Wand2,
  Check,
  User,
  Building,
  Mail,
  MapPin,
  Briefcase,
  Copy,
  Eye
} from 'lucide-react';

export default function CoverLetterEditorPage() {
  const [senderName, setSenderName] = useState('Alex Morgan');
  const [senderTitle, setSenderTitle] = useState('Senior Software Engineer');
  const [senderEmail, setSenderEmail] = useState('alex.morgan@geteasycv.com');
  const [senderPhone, setSenderPhone] = useState('+1 (555) 345-6789');
  const [senderLocation, setSenderLocation] = useState('San Francisco, CA');

  const [recipientName, setRecipientName] = useState('Sarah Jenkins');
  const [recipientTitle, setRecipientTitle] = useState('Head of Engineering');
  const [companyName, setCompanyName] = useState('Acme Corporation');
  const [companyAddress, setCompanyAddress] = useState('100 Innovation Way, San Francisco, CA');

  const [jobTitle, setJobTitle] = useState('Senior Frontend Developer');
  const [letterDate, setLetterDate] = useState(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));

  const [letterBody, setLetterBody] = useState(
    `Dear ${recipientName || 'Hiring Manager'},\n\nI am writing to express my strong enthusiasm for the ${jobTitle || 'Software Engineer'} position at ${companyName || 'your company'}. With over 6 years of experience building high-performance web applications and leading engineering teams, I am confident in my ability to contribute immediately to your team's goals.\n\nIn my previous role, I architected scalable frontend features using React and TypeScript, resulting in a 40% improvement in page load speed and a 25% increase in user retention. My technical expertise, combined with a passion for clean code and user-centered design, aligns seamlessly with the requirements for this role.\n\nI would welcome the opportunity to discuss how my background and skills can benefit ${companyName || 'your team'}. Thank you for your time and consideration.\n\nSincerely,\n${senderName}`
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const letterRef = React.useRef<HTMLDivElement>(null);

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle,
          companyName,
          senderName,
          senderTitle,
        }),
      });

      const data = await res.json();
      if (res.ok && data.coverLetter) {
        setLetterBody(data.coverLetter);
      } else {
        // Fallback polished AI template
        setLetterBody(
          `Dear ${recipientName || 'Hiring Manager'},\n\nI am thrilled to submit my application for the ${jobTitle} position at ${companyName}. As an accomplished ${senderTitle} with a proven track record of technical innovation and project delivery, I bring a unique combination of hands-on technical skills and strategic problem-solving.\n\nThroughout my career, I have consistently delivered high-impact solutions that drive business growth and elevate product quality. I am particularly drawn to ${companyName}'s commitment to innovation, and I am eager to contribute my skills to your ongoing initiatives.\n\nThank you for considering my application. I look forward to the opportunity to discuss how I can contribute to the continued success of ${companyName}.\n\nWarm regards,\n${senderName}`
        );
      }
    } catch {
      // Fallback AI generation
      setLetterBody(
        `Dear ${recipientName || 'Hiring Manager'},\n\nI am writing to express my strong interest in the ${jobTitle} position at ${companyName}. With extensive experience as a ${senderTitle}, I have developed a deep expertise in delivering impactful solutions and driving team performance.\n\nI am excited about the prospect of bringing my experience to ${companyName} and contributing to your ambitious product roadmap. Thank you for your time and consideration.\n\nSincerely,\n${senderName}`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(letterBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportDocx = () => {
    exportToNativeDocx(
      {
        personal: {
          firstName: senderName.split(' ')[0],
          lastName: senderName.split(' ')[1] || '',
          email: senderEmail,
          phone: senderPhone,
          location: senderLocation,
          jobTitle: senderTitle,
          summary: letterBody,
        },
      },
      `${senderName.replace(/\s+/g, '_')}_Cover_Letter.docx`
    );
  };

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-slate-50/70 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header Controls */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1"
                style={{ background: '#BAC7FE', color: '#0F0F0F' }}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Cover Letter Editor</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Dedicated Cover Letter Workspace
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="px-4 py-2.5 bg-[#0F0F0F] hover:bg-[#262626] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Wand2 className={`w-4 h-4 text-[#F5D17B] ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Generating AI Content...' : 'Generate with AI'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyText}
                className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                type="button"
                onClick={async () => {
                  if (letterRef.current) {
                    await exportToVectorPDF(letterRef.current, `${senderName.replace(/\s+/g, '_')}_Cover_Letter.pdf`);
                  }
                }}
                className="px-4 py-2.5 bg-[#F3645C] hover:opacity-90 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>

              <button
                type="button"
                onClick={handleExportDocx}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>Export DOCX</span>
              </button>
            </div>
          </div>

          {/* Two-Column Editor & Preview Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Controls */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Sender Info Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#F3645C]" /> Your Information (Sender)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 focus:border-[#0F0F0F] focus:ring-1 focus:ring-[#0F0F0F]/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Professional Title</label>
                    <input
                      type="text"
                      value={senderTitle}
                      onChange={(e) => setSenderTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 focus:border-[#0F0F0F] focus:ring-1 focus:ring-[#0F0F0F]/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Email</label>
                    <input
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 focus:border-[#0F0F0F] focus:ring-1 focus:ring-[#0F0F0F]/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Phone</label>
                    <input
                      type="text"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 focus:border-[#0F0F0F] focus:ring-1 focus:ring-[#0F0F0F]/10 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Recipient Info Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#F3645C]" /> Recipient & Job Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Hiring Manager Name</label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 focus:border-[#0F0F0F] focus:ring-1 focus:ring-[#0F0F0F]/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 focus:border-[#0F0F0F] focus:ring-1 focus:ring-[#0F0F0F]/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Target Job Title</label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 focus:border-[#0F0F0F] focus:ring-1 focus:ring-[#0F0F0F]/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Date</label>
                    <input
                      type="text"
                      value={letterDate}
                      onChange={(e) => setLetterDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 focus:border-[#0F0F0F] focus:ring-1 focus:ring-[#0F0F0F]/10 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Letter Body Textarea */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Cover Letter Body</h3>
                  <button
                    type="button"
                    onClick={handleGenerateAI}
                    className="text-[11px] font-bold text-[#F3645C] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" /> Refine with AI
                  </button>
                </div>
                <textarea
                  rows={14}
                  value={letterBody}
                  onChange={(e) => setLetterBody(e.target.value)}
                  className="w-full p-3.5 text-xs font-normal text-slate-800 rounded-xl border border-slate-200 focus:border-[#0F0F0F] focus:ring-1 focus:ring-[#0F0F0F]/10 outline-none leading-relaxed"
                />
              </div>

            </div>

            {/* Right Column: Live Document Preview */}
            <div className="lg:col-span-6 sticky top-20">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xl space-y-6 font-sans text-slate-900" ref={letterRef}>
                
                {/* Header */}
                <div className="border-b border-slate-200 pb-5 space-y-1">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">{senderName}</h2>
                  <p className="text-xs font-semibold text-[#F3645C] uppercase tracking-wider">{senderTitle}</p>
                  <div className="text-[11px] text-slate-500 flex flex-wrap gap-x-3 pt-1">
                    <span>{senderEmail}</span>
                    <span>•</span>
                    <span>{senderPhone}</span>
                    <span>•</span>
                    <span>{senderLocation}</span>
                  </div>
                </div>

                {/* Recipient Block */}
                <div className="text-xs space-y-1 text-slate-700">
                  <p className="text-slate-500">{letterDate}</p>
                  <p className="font-bold text-slate-900 pt-2">{recipientName}</p>
                  {recipientTitle && <p>{recipientTitle}</p>}
                  <p className="font-medium">{companyName}</p>
                  {companyAddress && <p className="text-slate-500">{companyAddress}</p>}
                </div>

                {/* Subject */}
                <div className="text-xs font-bold text-slate-900 border-l-2 border-[#F3645C] pl-3 py-0.5">
                  RE: Application for {jobTitle} Position
                </div>

                {/* Letter Body Preview */}
                <div className="text-xs leading-relaxed text-slate-800 whitespace-pre-wrap space-y-3 font-normal">
                  {letterBody}
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
