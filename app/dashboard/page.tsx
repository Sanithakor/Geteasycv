'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UserLayout from '@/components/layout/UserLayout';
import { useAuthStore } from '@/lib/store/authStore';
import {
  FileText,
  Plus,
  Download,
  Eye,
  Sparkles,
  ArrowRight,
  Trash2,
  Edit,
  Clock,
  Star
} from 'lucide-react';

export default function UserDashboard() {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserResumes();
  }, [token]);

  const fetchUserResumes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/resumes', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (response.ok) {
        const result = await response.json();
        setResumes(result.data || []);
      }
    } catch (err: any) {
      console.error('[USER_DASHBOARD] Fetch resumes error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    router.push('/templates');
  };

  const handleDeleteResume = async (id: string, e: React.MouseEvent) => {
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

  const totalDownloads = resumes.reduce((acc, curr) => acc + (curr.downloads || 0), 0);
  const totalViews = resumes.reduce((acc, curr) => acc + (curr.views || 0), 0);

  return (
    <UserLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 p-8 text-white shadow-md">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI-Powered Resume Builder</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Welcome back, {user?.name || 'CV Creator'}! 👋
              </h1>
              <p className="mt-2 text-slate-300 text-sm max-w-xl">
                Ready to build your next ATS-optimized resume? Choose from polished designs and export ready-to-apply PDFs.
              </p>
            </div>

            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-teal-500/25 transition-all transform hover:-translate-y-0.5 flex-shrink-0"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Resume</span>
            </button>
          </div>
        </div>

        {/* Stats Grid - Light Theme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 border border-teal-100">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Resumes</p>
              <p className="text-2xl font-black text-slate-900 mt-0.5">{resumes.length}</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Downloads</p>
              <p className="text-2xl font-black text-slate-900 mt-0.5">{totalDownloads}</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 border border-indigo-100">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Resume Views</p>
              <p className="text-2xl font-black text-slate-900 mt-0.5">{totalViews}</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 border border-amber-100">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Subscription</p>
              <p className="text-base font-bold text-amber-600 capitalize mt-0.5">
                {user?.tier || (user as any)?.subscriptionTier || 'Free Plan'}
              </p>
            </div>
          </div>
        </div>

        {/* My Resumes List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" />
              <span>Recent Resumes</span>
            </h2>
            <Link
              href="/my-resumes"
              className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 animate-pulse shadow-xs">
              Loading your resumes...
            </div>
          ) : resumes.length === 0 ? (
            <div className="bg-white border border-slate-200 border-dashed rounded-3xl p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-100">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">No resumes created yet</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
                  Select a template to build your first resume.
                </p>
              </div>
              <button
                onClick={handleCreateNew}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Build First Resume</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {resumes.slice(0, 6).map((resume) => (
                <div
                  key={resume.id}
                  onClick={() => router.push(`/editor?id=${resume.id}`)}
                  className="group bg-white border border-slate-200 hover:border-teal-500 rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold border border-teal-100">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          resume.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {resume.status || 'draft'}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-1">
                        {resume.title || 'Untitled Resume'}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        Template: {resume.template?.name || 'Single Column ATS'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(resume.updatedAt || Date.now()).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/editor?id=${resume.id}`);
                        }}
                        className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-teal-600 rounded-lg transition-colors"
                        title="Edit Resume"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteResume(resume.id, e)}
                        className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                        title="Delete Resume"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recommended Templates Grid */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recommended Templates</h3>
              <p className="text-xs text-slate-500">Tested against top Applicant Tracking Systems</p>
            </div>
            <Link href="/templates" className="text-xs font-bold text-teal-600 hover:text-teal-700">
              Browse All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => router.push('/templates')}
              className="bg-slate-50 border border-slate-200 hover:border-teal-500 p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <div className="h-28 rounded-xl bg-white flex items-center justify-center font-extrabold text-teal-600 mb-3 border border-slate-200 shadow-xs">
                Single Column ATS
              </div>
              <p className="text-sm font-bold text-slate-900">Modern Single Column</p>
              <p className="text-xs text-slate-500">Clean, top-rated for tech and corporate roles.</p>
            </div>

            <div
              onClick={() => router.push('/templates')}
              className="bg-slate-50 border border-slate-200 hover:border-teal-500 p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <div className="h-28 rounded-xl bg-white flex items-center justify-center font-extrabold text-blue-600 mb-3 border border-slate-200 shadow-xs">
                Two Column Split
              </div>
              <p className="text-sm font-bold text-slate-900">Creative Two Column</p>
              <p className="text-xs text-slate-500">Great for design, marketing & management.</p>
            </div>

            <div
              onClick={() => router.push('/templates')}
              className="bg-slate-50 border border-slate-200 hover:border-teal-500 p-4 rounded-2xl cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <div className="h-28 rounded-xl bg-white flex items-center justify-center font-extrabold text-indigo-600 mb-3 border border-slate-200 shadow-xs">
                Executive Minimal
              </div>
              <p className="text-sm font-bold text-slate-900">Executive Minimalist</p>
              <p className="text-xs text-slate-500">Sleek layout for senior & executive positions.</p>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
