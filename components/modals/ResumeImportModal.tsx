'use client';

import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';

interface ResumeImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (parsedData: any) => void;
}

export default function ResumeImportModal({
  isOpen,
  onClose,
  onImportSuccess,
}: ResumeImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a resume file (.pdf, .docx, .txt) to upload.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/resume/parse', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success && data.data) {
        setSuccess(true);
        setTimeout(() => {
          onImportSuccess(data.data);
          onClose();
          setSuccess(false);
          setFile(null);
        }, 1000);
      } else {
        setError(data.error || 'Failed to parse resume file. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during file parsing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ background: '#FEE1CF', color: '#0F0F0F' }}>
            <Upload className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Upload Existing Resume</h3>
          <p className="text-xs text-slate-500">
            Upload your existing PDF or Word resume to auto-fill the editor forms in one click.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="p-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-sm font-bold text-slate-900">Resume Extracted Successfully!</h4>
            <p className="text-xs text-slate-500">Populating editor fields...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <label className="border-2 border-dashed border-slate-200 hover:border-[#0F0F0F] rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-slate-50/50 hover:bg-slate-100/50 transition-all text-center">
              <input
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
              <FileText className="w-8 h-8 text-slate-400" />
              <span className="text-xs font-semibold text-slate-700">
                {file ? file.name : 'Click to upload PDF, DOCX, or TXT'}
              </span>
              <span className="text-[11px] text-slate-400 font-normal">Max size: 10MB</span>
            </label>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleUpload}
                disabled={isLoading || !file}
                className="flex-1 rounded-xl bg-[#0F0F0F] hover:bg-[#262626] text-white py-3 text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Parsing Resume...</span>
                  </>
                ) : (
                  <span>Import Resume Data</span>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
