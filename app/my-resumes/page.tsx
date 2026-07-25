'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserLayout from '@/components/layout/UserLayout';
import { useAuthStore } from '@/lib/store/authStore';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Copy,
  Clock,
  LayoutGrid,
  List,
  Check,
  X,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function MyResumesPage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const [resumes, setResumes] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  // Inline Title Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [savingTitle, setSavingTitle] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, [token]);

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/resumes', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setResumes(data.data || []);
      }
    } catch (err) {
      console.error('Failed to load resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartRename = (resume: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(resume.id);
    setEditingTitle(resume.title || 'Untitled Resume');
  };

  const handleSaveRename = async (id: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingTitle.trim()) return;
    setSavingTitle(true);
    try {
      const res = await fetch(`/api/resumes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ title: editingTitle }),
      });
      if (res.ok) {
        setResumes((prev) =>
          prev.map((r) => (r.id === id ? { ...r, title: editingTitle } : r))
        );
      }
    } catch (err) {
      console.error('Update title error:', err);
    } finally {
      setSavingTitle(false);
      setEditingId(null);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this resume?')) return;
    try {
      const res = await fetch(`/api/resumes/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        setResumes((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleDuplicate = async (resume: any, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: `${resume.title || 'Resume'} (Copy)`,
          templateId: resume.templateId || resume.template?.id,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setResumes((prev) => [data.data, ...prev]);
        }
      }
    } catch (err) {
      console.error('Duplicate error:', err);
    }
  };

  const filteredResumes = resumes.filter((r) => {
    const matchesSearch = (r.title || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <UserLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <FileText className="w-7 h-7 text-teal-600" />
              <span>My Resumes</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Directly edit, rename, duplicate, and manage all your saved resumes.
            </p>
          </div>

          <button
            onClick={() => router.push('/templates')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-teal-400" />
            <span>Add CV from Templates</span>
          </button>
        </div>

        {/* Filter and Controls */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search resumes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-teal-500"
              >
                <option value="all">All Statuses</option>
                <option value="draft">Drafts</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-xs text-teal-600 font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-xs text-teal-600 font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Resumes Content */}
        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center text-slate-400 animate-pulse shadow-xs">
            Loading your resumes...
          </div>
        ) : filteredResumes.length === 0 ? (
          <div className="bg-white border border-slate-200 border-dashed rounded-3xl p-16 text-center space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-100">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">No matching resumes found</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
                {search ? 'Try clearing your search query or status filter.' : 'Choose from ATS-optimized designs and add your first resume.'}
              </p>
            </div>
            <button
              onClick={() => router.push('/templates')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-teal-400" />
              <span>Browse Templates & Create</span>
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((resume) => (
              <div
                key={resume.id}
                className="group bg-white border border-slate-200 hover:border-teal-500 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold border border-teal-100">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        resume.status === 'published'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {resume.status || 'draft'}
                    </span>
                  </div>

                  <div>
                    {editingId === resume.id ? (
                      <form onSubmit={(e) => handleSaveRename(resume.id, e)} className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          className="w-full px-2 py-1 rounded-lg border border-teal-500 bg-teal-50/50 text-sm font-bold text-slate-900 focus:outline-none"
                          autoFocus
                        />
                        <button type="submit" disabled={savingTitle} className="p-1 text-teal-600 hover:bg-teal-50 rounded-md">
                          <Check className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => setEditingId(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded-md">
                          <X className="w-4 h-4" />
                        </button>
                      </form>
                    ) : (
                      <div className="flex items-center justify-between group/title">
                        <h3
                          onClick={() => router.push(`/editor?id=${resume.id}`)}
                          className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-1 cursor-pointer"
                        >
                          {resume.title || 'Untitled Resume'}
                        </h3>
                        <button
                          onClick={(e) => handleStartRename(resume, e)}
                          className="opacity-0 group-hover/title:opacity-100 p-1 text-slate-400 hover:text-slate-700 transition-opacity"
                          title="Rename Resume Title"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      Template: {resume.template?.name || 'Single Column ATS'}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(resume.updatedAt || Date.now()).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleDuplicate(resume, e)}
                        className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-lg transition-colors"
                        title="Duplicate Resume"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(resume.id, e)}
                        className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                        title="Delete Resume"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Primary Direct Edit Action Button */}
                  <button
                    onClick={() => router.push(`/editor?id=${resume.id}`)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5 text-teal-400" />
                    <span>Edit Resume</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="divide-y divide-slate-100">
              {filteredResumes.map((resume) => (
                <div
                  key={resume.id}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold flex-shrink-0 border border-teal-100">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      {editingId === resume.id ? (
                        <form onSubmit={(e) => handleSaveRename(resume.id, e)} className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            className="px-2 py-0.5 rounded border border-teal-500 text-xs font-bold text-slate-900"
                            autoFocus
                          />
                          <button type="submit" className="p-1 text-teal-600"><Check className="w-3.5 h-3.5" /></button>
                          <button type="button" onClick={() => setEditingId(null)} className="p-1 text-slate-400"><X className="w-3.5 h-3.5" /></button>
                        </form>
                      ) : (
                        <div className="flex items-center gap-2">
                          <h4
                            onClick={() => router.push(`/editor?id=${resume.id}`)}
                            className="text-sm font-bold text-slate-900 hover:text-teal-600 cursor-pointer"
                          >
                            {resume.title || 'Untitled Resume'}
                          </h4>
                          <button onClick={(e) => handleStartRename(resume, e)} className="text-slate-400 hover:text-slate-700">
                            <Edit className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      <p className="text-xs text-slate-500">Template: {resume.template?.name || 'Single Column ATS'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        resume.status === 'published'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {resume.status || 'draft'}
                    </span>

                    <button
                      onClick={() => router.push(`/editor?id=${resume.id}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
                    >
                      <Edit className="w-3.5 h-3.5 text-teal-400" />
                      <span>Edit</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleDuplicate(resume, e)}
                        className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-blue-600 rounded-lg"
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(resume.id, e)}
                        className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
