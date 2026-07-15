/**
 * Resume Templates Management Page
 */

'use client';

import React from 'react';
import { Plus, Search, MoreVertical, Eye, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

const TEMPLATES = [
  {
    id: 1,
    name: 'Modern Resume',
    category: 'Modern',
    status: 'published',
    downloads: 2543,
    rating: 4.8,
    updatedAt: '2024-06-15',
  },
  {
    id: 2,
    name: 'Executive Resume',
    category: 'Executive',
    status: 'published',
    downloads: 1823,
    rating: 4.6,
    updatedAt: '2024-06-10',
  },
  {
    id: 3,
    name: 'Creative Resume',
    category: 'Creative',
    status: 'draft',
    downloads: 0,
    rating: 0,
    updatedAt: '2024-06-01',
  },
  {
    id: 4,
    name: 'Minimal Resume',
    category: 'Minimal',
    status: 'published',
    downloads: 3120,
    rating: 4.9,
    updatedAt: '2024-05-28',
  },
];

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredTemplates = TEMPLATES.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Resume Templates
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Create and manage resume templates ({TEMPLATES.length} total)
          </p>
        </div>
        <Link
          href="/admin/templates/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Template
        </Link>
      </div>

      {/* Filters */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Preview */}
            <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl">📄</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-slate-50">
                  <Eye className="w-5 h-5 text-slate-900" />
                </button>
                <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-slate-50">
                  <Edit2 className="w-5 h-5 text-slate-900" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {template.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {template.category}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Downloads
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {template.downloads}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Rating
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {template.rating > 0 ? `${template.rating}⭐` : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    template.status === 'published'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}
                >
                  {template.status === 'published' ? '✓ Published' : '🔄 Draft'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
