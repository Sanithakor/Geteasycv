'use client';
import React, { useState } from 'react';
import { Upload, Search, Trash2, Copy } from 'lucide-react';

const MEDIA = [
  { id: 1, name: 'hero-background.jpg', type: 'image/jpeg', size: '245 KB', url: '/media/hero-background.jpg', uploaded: '2024-06-10' },
  { id: 2, name: 'logo.svg', type: 'image/svg+xml', size: '12 KB', url: '/media/logo.svg', uploaded: '2024-05-15' },
  { id: 3, name: 'template-modern.png', type: 'image/png', size: '89 KB', url: '/media/template-modern.png', uploaded: '2024-05-10' },
  { id: 4, name: 'template-executive.png', type: 'image/png', size: '102 KB', url: '/media/template-executive.png', uploaded: '2024-04-28' },
  { id: 5, name: 'favicon.ico', type: 'image/x-icon', size: '4 KB', url: '/media/favicon.ico', uploaded: '2024-03-01' },
  { id: 6, name: 'og-image.jpg', type: 'image/jpeg', size: '178 KB', url: '/media/og-image.jpg', uploaded: '2024-03-01' },
];

export default function MediaPage() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const filtered = MEDIA.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Media Library</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{MEDIA.length} files</p>
        </div>
        <label className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium text-sm transition-colors cursor-pointer">
          <Upload className="w-4 h-4" /> Upload Files
          <input type="file" className="hidden" multiple accept="image/*" />
        </label>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
        </div>
        <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <button onClick={() => setView('grid')} className={`px-3 py-2 text-sm ${view === 'grid' ? 'bg-violet-600 text-white' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>Grid</button>
          <button onClick={() => setView('list')} className={`px-3 py-2 text-sm ${view === 'list' ? 'bg-violet-600 text-white' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>List</button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map(f => (
            <div key={f.id} className="group rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
              <div className="h-24 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-2xl">
                {f.type.includes('svg') ? '🎨' : f.type.includes('icon') ? '🔵' : '🖼️'}
              </div>
              <div className="p-2">
                <p className="text-xs font-medium text-slate-900 dark:text-white truncate">{f.name}</p>
                <p className="text-xs text-slate-500">{f.size}</p>
                <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"><Copy className="w-3 h-3 text-slate-500" /></button>
                  <button className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"><Trash2 className="w-3 h-3 text-red-500" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
          {filtered.map(f => (
            <div key={f.id} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <span className="text-xl">{f.type.includes('svg') ? '🎨' : f.type.includes('icon') ? '🔵' : '🖼️'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{f.name}</p>
                <p className="text-xs text-slate-500">{f.type} · {f.size}</p>
              </div>
              <span className="text-xs text-slate-500">{f.uploaded}</span>
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><Copy className="w-4 h-4 text-slate-500" /></button>
                <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><Trash2 className="w-4 h-4 text-red-500" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
