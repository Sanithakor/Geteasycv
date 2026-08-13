'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Eye, Edit2 } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';

export default function EmailTemplatesPage() {
  const { token } = useAuthStore();
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetchEmailTemplates();
  }, [token]);

  const fetchEmailTemplates = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/email-templates', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setTemplates(data.data || []);
        if (data.data?.length) {
          setSelectedId(data.data[0].id);
        }
      }
    } catch (err) {
      console.error('[ADMIN_EMAIL_TEMPLATES_FETCH_ERROR]', err);
    } finally {
      setLoading(false);
    }
  };

  const selectedTemplate = templates.find((t) => t.id === selectedId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Mail className="w-6 h-6 text-violet-600" />
          <span>Email Templates</span>
        </h1>
        <p className="text-slate-500 text-xs mt-1">Manage transactional email subjects and dynamic placeholders</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-md border border-slate-200 bg-white divide-y divide-slate-100 shadow-2xs overflow-hidden">
          {loading ? (
            <div className="p-6 text-center text-xs text-slate-400 animate-pulse">Loading templates...</div>
          ) : (
            templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedId(t.id)}
                className={`w-full text-left p-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                  selectedId === t.id ? 'bg-violet-50/70 font-bold' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">{t.name}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">slug: {t.slug}</p>
              </button>
            ))
          )}
        </div>

        <div className="lg:col-span-2 rounded-md border border-slate-200 bg-white p-6 shadow-2xs">
          {selectedTemplate ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-slate-900 text-base">{selectedTemplate.name}</h2>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Template Slug</label>
                <code className="text-xs font-mono text-violet-700 bg-violet-50 px-2 py-1 rounded-md border border-violet-100">
                  {selectedTemplate.slug}
                </code>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Subject Line</label>
                <p className="text-sm font-bold text-slate-900">{selectedTemplate.subject}</p>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">HTML Body Preview</label>
                <div
                  className="p-4 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono overflow-x-auto max-h-48"
                  dangerouslySetInnerHTML={{ __html: selectedTemplate.body }}
                />
              </div>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-xs text-slate-400">Select a template to view details</div>
          )}
        </div>
      </div>
    </div>
  );
}
