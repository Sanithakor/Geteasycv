/**
 * User Resumes Management Page
 * Monitor and manage all user resumes across the platform
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Eye, Download, Trash2, FileText, Plus } from 'lucide-react';

const REALISTIC_RESUMES = [
  {
    id: 'res-1',
    userName: 'John Doe',
    userEmail: 'john.doe@geteasycv.com',
    title: 'Senior Software Engineer Resume',
    template: 'Single Column ATS',
    downloads: 14,
    updatedAt: 'May 26, 2025',
    status: 'Completed'
  },
  {
    id: 'res-2',
    userName: 'Emily Clark',
    userEmail: 'emily.clark@geteasycv.com',
    title: 'Product Designer Portfolio CV',
    template: 'Bento Grid Design',
    downloads: 8,
    updatedAt: 'May 26, 2025',
    status: 'Completed'
  },
  {
    id: 'res-3',
    userName: 'Michael Brown',
    userEmail: 'michael.brown@geteasycv.com',
    title: 'Engineering Manager Resume',
    template: 'Two Column Split',
    downloads: 12,
    updatedAt: 'May 25, 2025',
    status: 'Completed'
  },
  {
    id: 'res-4',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.johnson@geteasycv.com',
    title: 'Digital Marketing Strategist CV',
    template: 'Modern Professional',
    downloads: 5,
    updatedAt: 'May 25, 2025',
    status: 'In Progress'
  },
  {
    id: 'res-5',
    userName: 'Alex Johnson',
    userEmail: 'alex.johnson@geteasycv.com',
    title: 'Full Stack Engineer CV',
    template: 'Compact ATS',
    downloads: 22,
    updatedAt: 'May 24, 2025',
    status: 'Completed'
  },
  {
    id: 'res-6',
    userName: 'Maria Garcia',
    userEmail: 'maria.garcia@geteasycv.com',
    title: 'Lead Architect Resume',
    template: 'Luxury Gold',
    downloads: 16,
    updatedAt: 'May 23, 2025',
    status: 'Completed'
  }
];

export default function ResumesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [resumes, setResumes] = useState(REALISTIC_RESUMES);

  const filteredResumes = resumes.filter((res) =>
    res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Resumes</h1>
          <p className="text-slate-500 text-sm mt-0.5 font-medium">
            Monitor and view all resumes created by platform users ({resumes.length} total)
          </p>
        </div>
        <Link
          href="/editor"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0F0F0F] hover:bg-[#262626] text-white rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5] text-[#F5D17B]" />
          <span>Create Resume</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by title, owner name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F0F0F]/15 focus:border-[#0F0F0F] text-sm font-medium transition-all"
        />
      </div>

      {/* Card Table Container matching Image 2 */}
      <div className="rounded-[20px] border border-slate-200/80 bg-white overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-5">RESUME TITLE</th>
                <th className="py-3.5 px-5">OWNER</th>
                <th className="py-3.5 px-5">TEMPLATE LAYOUT</th>
                <th className="py-3.5 px-5">DOWNLOADS</th>
                <th className="py-3.5 px-5">LAST UPDATED</th>
                <th className="py-3.5 px-5">STATUS</th>
                <th className="py-3.5 px-5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResumes.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Title */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FEE1CF] text-[#0F0F0F] flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-[#F3645C]" />
                      </div>
                      <span className="text-sm font-bold text-slate-900 truncate max-w-xs" title={res.title}>
                        {res.title}
                      </span>
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="py-4 px-5">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{res.userName}</p>
                      <p className="text-xs text-slate-400 font-medium">{res.userEmail}</p>
                    </div>
                  </td>

                  {/* Template Layout */}
                  <td className="py-4 px-5">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                      {res.template}
                    </span>
                  </td>

                  {/* Downloads */}
                  <td className="py-4 px-5">
                    <span className="text-sm font-bold text-slate-900">{res.downloads} times</span>
                  </td>

                  {/* Last Updated */}
                  <td className="py-4 px-5">
                    <span className="text-xs font-semibold text-slate-500">{res.updatedAt}</span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                      res.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${res.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {res.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/editor?id=${res.id}`} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors" title="View/Edit">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button type="button" className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => handleDelete(res.id)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-600 transition-colors cursor-pointer" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
