'use client';

import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import Link from 'next/link';

interface Resume {
  id: string;
  title: string;
  template: string;
  lastModified: string;
  status: 'draft' | 'published';
  downloads: number;
  views: number;
}

export default function MyResumesPage() {
  const { isAuthenticated, user } = useAuthStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      redirect('/login');
    }
  }, [isAuthenticated]);

  // Fetch resumes
  useEffect(() => {
    if (isAuthenticated) {
      // Mock data for now - will be replaced with API call
      setResumes([
        {
          id: '1',
          title: 'Software Engineer Resume',
          template: 'Modern',
          lastModified: '2 hours ago',
          status: 'draft',
          downloads: 0,
          views: 0,
        },
        {
          id: '2',
          title: 'Product Manager Resume',
          template: 'Executive',
          lastModified: '1 day ago',
          status: 'published',
          downloads: 5,
          views: 23,
        },
        {
          id: '3',
          title: 'UX Designer Resume',
          template: 'Creative',
          lastModified: '3 days ago',
          status: 'draft',
          downloads: 1,
          views: 5,
        },
        {
          id: '4',
          title: 'Data Scientist Resume',
          template: 'Minimal',
          lastModified: '1 week ago',
          status: 'published',
          downloads: 8,
          views: 42,
        },
      ]);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const filteredResumes = resumes.filter((resume) => {
    if (filter === 'all') return true;
    return resume.status === filter;
  });

  if (!isAuthenticated || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                My Resumes
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Manage and organize all your resumes
              </p>
            </div>
            <Link
              href="/editor"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Create New Resume
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            All Resumes ({resumes.length})
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'draft'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            Drafts ({resumes.filter((r) => r.status === 'draft').length})
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'published'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            Published ({resumes.filter((r) => r.status === 'published').length})
          </button>
        </div>

        {/* Resumes Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">Loading resumes...</p>
          </div>
        ) : filteredResumes.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              No resumes found in this category
            </p>
            <Link
              href="/editor"
              className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Create Your First Resume
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden group"
              >
                {/* Resume Preview Placeholder */}
                <div className="bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 h-48 flex items-center justify-center group-hover:bg-slate-400 transition-colors">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📄</div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Preview</p>
                  </div>
                </div>

                {/* Resume Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
                    {resume.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {resume.template} Template
                  </p>

                  {/* Status & Stats */}
                  <div className="flex items-center gap-2 mt-3 mb-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        resume.status === 'published'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                      }`}
                    >
                      {resume.status}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {resume.lastModified}
                    </span>
                  </div>

                  {/* Stats Row */}
                  <div className="flex gap-4 py-3 border-t border-slate-200 dark:border-slate-700 mb-4 text-xs text-slate-600 dark:text-slate-400">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {resume.downloads}
                      </p>
                      <p>Downloads</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {resume.views}
                      </p>
                      <p>Views</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/editor/${resume.id}`}
                      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-sm transition-colors text-center"
                    >
                      Edit
                    </Link>
                    <button className="flex-1 px-3 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded font-medium text-sm transition-colors">
                      Share
                    </button>
                    <button className="px-3 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded font-medium text-sm transition-colors">
                      ⋮
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
