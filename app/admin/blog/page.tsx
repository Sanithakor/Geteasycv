'use client';
import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Eye } from 'lucide-react';

const POSTS = [
  { id: 1, title: '10 Resume Tips That Get You Hired in 2024', category: 'Tips', status: 'published', views: 4230, author: 'Admin', date: '2024-06-10' },
  { id: 2, title: 'How to Write a Cover Letter That Stands Out', category: 'Career', status: 'published', views: 3100, author: 'Admin', date: '2024-06-05' },
  { id: 3, title: 'ATS-Friendly Resume: The Complete Guide', category: 'Guide', status: 'draft', views: 0, author: 'Admin', date: '2024-06-01' },
  { id: 4, title: 'Best Resume Templates for Software Engineers', category: 'Templates', status: 'published', views: 5890, author: 'Admin', date: '2024-05-28' },
  { id: 5, title: 'How to Use AI to Write Your Resume', category: 'AI', status: 'draft', views: 0, author: 'Admin', date: '2024-05-20' },
];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const filtered = POSTS.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Blog</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{POSTS.filter(p => p.status === 'published').length} published, {POSTS.filter(p => p.status === 'draft').length} drafts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium text-sm transition-colors">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
      </div>

      <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                {['Title', 'Category', 'Status', 'Views', 'Date', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filtered.map(post => (
                <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white max-w-xs">
                    <p className="truncate">{post.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">By {post.author}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full font-medium">{post.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${post.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> {post.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{post.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-400"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-500"><Trash2 className="w-4 h-4" /></button>
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
