'use client';

import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, FileText, Download } from 'lucide-react';
import toast from 'react-hot-toast';

interface AICoverLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultJobTitle?: string;
  candidateName?: string;
  skills?: string[];
}

export default function AICoverLetterModal({
  isOpen,
  onClose,
  defaultJobTitle = '',
  candidateName = 'John Doe',
  skills = [],
}: AICoverLetterModalProps) {
  const [jobTitle, setJobTitle] = useState(defaultJobTitle);
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!jobTitle || !companyName) {
      toast.error('Please enter both Job Title and Company Name.');
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle,
          companyName,
          jobDescription,
          candidateName,
          skills,
        }),
      });

      const data = await res.json();
      if (res.ok && data.coverLetter) {
        setGeneratedLetter(data.coverLetter);
        toast.success('AI Cover Letter generated successfully!');
      } else {
        toast.error(data.error || 'Failed to generate cover letter.');
      }
    } catch (err) {
      toast.error('AI Cover Letter service error. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedLetter) return;
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    toast.success('Cover letter copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!generatedLetter) return;
    const blob = new Blob([generatedLetter], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Cover_Letter_${companyName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Cover letter downloaded as text file!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 space-y-5 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">AI Cover Letter Generator</h3>
              <p className="text-xs text-slate-500">Generate a tailored cover letter matched to your target role</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Target Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Senior Full Stack Engineer"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Acme Innovations"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Job Description / Key Requirements (Optional)</label>
          <textarea
            rows={2}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste target job requirements here for maximum AI keyword precision..."
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
          />
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-md shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isGenerating ? 'Drafting Cover Letter with AI...' : 'Generate AI Cover Letter'}</span>
        </button>

        {/* Output */}
        {generatedLetter && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-purple-600" />
                Generated Cover Letter Draft
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-md flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadTxt}
                  className="px-2.5 py-1 text-[11px] font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-md flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .txt</span>
                </button>
              </div>
            </div>

            <textarea
              readOnly
              rows={8}
              value={generatedLetter}
              className="w-full p-4 text-xs font-serif leading-relaxed text-slate-800 bg-slate-50 border border-slate-200 rounded-md resize-none focus:outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
