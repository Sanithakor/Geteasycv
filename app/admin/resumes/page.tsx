'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Eye, Download, Trash2, FileText, ChevronRight, Plus } from 'lucide-react';

const RESUMES = [
  {
    id: 'res-1',
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    title: 'Senior Software Engineer Resume',
    template: 'Single Column ATS',
    downloads: 14,
    updatedAt: 'May 26, 2025',
    status: 'Completed'
  },
  {
    id: 'res-2',
    userName: 'Emily Clark',
    userEmail: 'emily.clark@example.com',
    title: 'Product Designer Portfolio CV',
    template: 'Bento Grid Design',
    downloads: 8,
    updatedAt: 'May 26, 2025',
    status: 'Completed'
  },
  {
    id: 'res-3',
    userName: 'Michael Brown',
    userEmail: 'michael.brown@example.com',
    title: 'Engineering Manager Resume',
    template: 'Two Column Split',
    downloads: 12,
    updatedAt: 'May 25, 2025',
    status: 'Completed'
  },
  {
    id: 'res-4',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.johnson@example.com',
    title: 'Digital Marketing Strategist CV',
    template: 'Modern Professional',
    downloads: 5,
    updatedAt: 'May 25, 2025',
    status: 'In Progress'
  },
  {
    id: 'res-5',
    userName: 'Alex Johnson',
    userEmail: 'alex.johnson@example.com',
    title: 'Full Stack Engineer CV',
    template: 'Compact ATS',
    downloads: 22,
    updatedAt: 'May 24, 2025',
    status: 'Completed'
  },
  {
    id: 'res-6',
    userName: 'Maria Garcia',
    userEmail: 'maria.garcia@example.com',
    title: 'Lead Architect Resume',
    template: 'Luxury Gold',
    downloads: 16,
    updatedAt: 'May 23, 2025',
    status: 'Completed'
  }
];

export default function ResumesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResumes = RESUMES.filter((res) =>
    res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">User Resumes</h1>
          <p className="text-slate-500 mt-1">
            Monitor and view all resumes created by platform users ({RESUMES.length} total)
          </p>
        </div>
        <Link href="/editor" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FF570F] to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white rounded-md font-semibold transition-all shadow-lg hover:shadow-xl text-sm">
          <Plus className="w-4 h-4" />
          Create Resume
        </Link>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by title, owner name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF570F]/25 focus:border-[#FF570F] text-sm"
        />
      </div>

      {/* List Card */}
      <div className="bg-white rounded-[20px] border border-slate-200/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-5">Resume Title</th>
                <th className="py-3 px-5">Owner</th>
                <th className="py-3 px-5">Template Layout</th>
                <th className="py-3 px-5">Downloads</th>
                <th className="py-3 px-5">Last Updated</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResumes.map((res) => (
                <tr key={res.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-[#FFF8F5] text-[#FF570F] flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-slate-950 truncate max-w-xs" title={res.title}>
                        {res.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{res.userName}</p>
                      <p className="text-[11px] text-slate-400 font-semibold">{res.userEmail}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      {res.template}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="text-sm font-bold text-slate-900">{res.downloads} times</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="text-xs font-semibold text-slate-500">{res.updatedAt}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      res.status === 'Completed'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${res.status === 'Completed' ? 'bg-green-500' : 'bg-amber-500'}`} />
                      {res.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="p-2 hover:bg-slate-100 rounded-md text-slate-600 hover:text-[#FF570F] transition-colors" title="View PDF">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-md text-slate-600 hover:text-[#FF570F] transition-colors" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-md text-slate-600 hover:text-red-600 transition-colors" title="Delete">
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
