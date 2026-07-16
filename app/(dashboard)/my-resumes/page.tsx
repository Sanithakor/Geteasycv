'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import Link from 'next/link';
import { Plus, Edit2, Share2, MoreVertical, Trash2, Copy, Eye, Download, FileText } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Resume {
  id: string;
  title: string;
  status: string;
  downloads: number;
  views: number;
  updatedAt: string;
  createdAt: string;
  personal?: { firstName: string; lastName: string } | null;
  template?: { id: string; name: string; thumbnail: string | null } | null;
}

export default function MyResumesPage() {
  const router = useRouter();
  const { isAuthenticated, _hydrated, token } = useAuthStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!_hydrated) return;
    if (!isAuthenticated) { router.push('/login'); return; }
    fetchResumes();
  }, [_hydrated, isAuthenticated]);

  const fetchResumes = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/resumes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to load resumes');
      const data = await res.json();
      setResumes(data.data || []);
    } catch (e: any) {
      setError(e.message || 'Failed to load resumes');
      toast.error(e.message || 'Failed to load resumes');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this resume? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/resumes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      setResumes((prev) => prev.filter((r) => r.id !== id));
      toast.success('Resume deleted');
    } catch (e: any) {
      toast.error(e.message || 'Delete failed');
    } finally {
      setDeletingId(null);
      setOpenMenu(null);
    }
  };

  const handleDuplicate = async (resume: Resume) => {
    const tid = toast.loading('Duplicating…');
    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: `${resume.title} (Copy)`, templateId: resume.template?.id || '' }),
      });
      if (!res.ok) throw new Error('Duplicate failed');
      const data = await res.json();
      setResumes((prev) => [data.data, ...prev]);
      setOpenMenu(null);
      toast.success('Resume duplicated', { id: tid });
    } catch (e: any) {
      toast.error(e.message || 'Duplicate failed', { id: tid });
    }
  };

  const filtered = resumes.filter((r) => filter === 'all' || r.status === filter);
  const counts = { all: resumes.length, draft: resumes.filter((r) => r.status === 'draft').length, published: resumes.filter((r) => r.status === 'published').length };

  if (!_hydrated || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 animate-pulse">
          <FileText className="w-6 h-6 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="bottom-right" />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Resumes</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">{resumes.length} resume{resumes.length !== 1 ? 's' : ''} in your library</p>
        </div>
        <Link href="/editor" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl">
          <Plus className="w-5 h-5" />
          Create New Resume
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 pb-0">
        {(['all', 'draft', 'published'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-all border-b-2 -mb-px ${filter === f ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
          {error} — <button onClick={fetchResumes} className="underline font-medium">Retry</button>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden animate-pulse">
              <div className="h-44 bg-slate-200 dark:bg-slate-700" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            {filter === 'all' ? 'No resumes yet' : `No ${filter} resumes`}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
            {filter === 'all' ? 'Create your first resume to get started.' : `You have no ${filter} resumes.`}
          </p>
          <Link href="/editor" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
            Create Resume
          </Link>
        </div>
      )}

      {/* Resume Cards Grid */}
      {!isLoading && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((resume) => {
            const name = resume.personal ? `${resume.personal.firstName} ${resume.personal.lastName}`.trim() : resume.title;
            const updated = new Date(resume.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            return (
              <div key={resume.id} className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
                {/* Preview area */}
                <div className="relative h-44 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-2">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{resume.template?.name || 'Custom'} Template</p>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <Link href={`/editor?id=${resume.id}`} className="px-4 py-1.5 bg-white text-slate-900 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center gap-1">
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <button
                      disabled
                      title="Preview — coming soon"
                      className="px-4 py-1.5 bg-white text-slate-400 rounded-lg text-sm font-medium flex items-center gap-1 cursor-not-allowed opacity-60"
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 dark:text-white truncate">{resume.title}</h3>
                      {name !== resume.title && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{name}</p>
                      )}
                    </div>
                    <div className="relative flex-shrink-0">
                      <button
                        onClick={() => setOpenMenu(openMenu === resume.id ? null : resume.id)}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-slate-500" />
                      </button>
                      {openMenu === resume.id && (
                        <div className="absolute right-0 top-8 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-10 py-1">
                          <Link href={`/editor?id=${resume.id}`} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">
                            <Edit2 className="w-4 h-4" /> Edit
                          </Link>
                          <button onClick={() => handleDuplicate(resume)} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">
                            <Copy className="w-4 h-4" /> Duplicate
                          </button>
                          <button
                            disabled
                            title="Share link — coming soon"
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-60"
                          >
                            <Share2 className="w-4 h-4" /> Share
                          </button>
                          <button
                            disabled
                            title="PDF download — coming soon"
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-60"
                          >
                            <Download className="w-4 h-4" /> Download PDF
                          </button>
                          <hr className="my-1 border-slate-200 dark:border-slate-700" />
                          <button
                            onClick={() => handleDelete(resume.id)}
                            disabled={deletingId === resume.id}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                            {deletingId === resume.id ? 'Deleting…' : 'Delete'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <span className={`px-2 py-0.5 rounded-full font-medium ${resume.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${resume.status === 'published' ? 'bg-green-600' : 'bg-amber-500'}`} />
                      {resume.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                    <span>Updated {updated}</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <Eye className="w-3.5 h-3.5" /> {resume.views} views
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <Download className="w-3.5 h-3.5" /> {resume.downloads} downloads
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <Link href={`/editor?id=${resume.id}`} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors">
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <button
                      disabled
                      title="Share — coming soon"
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 rounded-lg font-medium text-sm cursor-not-allowed opacity-60"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Share
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Click outside to close menus — z-[5] sits above page content but below the dropdown (z-10) */}
      {openMenu && <div className="fixed inset-0 z-[5]" onClick={() => setOpenMenu(null)} />}
    </div>
  );
}
