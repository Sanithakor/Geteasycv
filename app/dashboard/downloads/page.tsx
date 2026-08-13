'use client';

import React from 'react';
import Link from 'next/link';
import UserLayout from '@/components/layout/UserLayout';
import { Download, FileText, ArrowRight } from 'lucide-react';

export default function UserDownloadsPage() {
  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Download className="w-6 h-6 text-teal-600" />
            <span>Downloads & Export Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access all your exported resumes, downloaded PDFs, and backup files.
          </p>
        </div>

        {/* Export Formats Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200 rounded-md p-5 space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-md bg-red-50 text-red-600 flex items-center justify-center font-bold border border-red-100">
              PDF
            </div>
            <h3 className="text-base font-bold text-slate-900">PDF Vector Format</h3>
            <p className="text-xs text-slate-500">ATS-compliant vector PDF suitable for standard job portals.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-5 space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-md bg-teal-50 text-teal-600 flex items-center justify-center font-bold border border-teal-100">
              PNG
            </div>
            <h3 className="text-base font-bold text-slate-900">High-Res PNG Image</h3>
            <p className="text-xs text-slate-500">Crisp, high-resolution graphics for online portfolios & email attachments.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-5 space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100">
              JSON
            </div>
            <h3 className="text-base font-bold text-slate-900">Raw Resume Data</h3>
            <p className="text-xs text-slate-500">Structured JSON backup to easily import into other tools or backups.</p>
          </div>
        </div>

        {/* Recent Exports Log */}
        <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900">Export History</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Senior Software Engineer Resume.pdf</h4>
                  <p className="text-xs text-slate-500">Downloaded today • High Quality PDF</p>
                </div>
              </div>
              <Link
                href="/my-resumes"
                className="px-4 py-2 rounded-md bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all flex items-center gap-1 shadow-xs"
              >
                <span>Re-Export</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
