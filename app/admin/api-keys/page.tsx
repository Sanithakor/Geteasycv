'use client';
import React, { useState } from 'react';
import { Plus, Copy, Eye, EyeOff, Trash2 } from 'lucide-react';

const KEYS = [
  { id: 1, name: 'Production API Key', key: 'sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxx', prefix: 'sk_live', created: '2024-01-15', lastUsed: '2 hours ago', status: 'active' },
  { id: 2, name: 'Development Key', key: 'sk_test_yyyyyyyyyyyyyyyyyyyyyyyyyy', prefix: 'sk_test', created: '2024-03-20', lastUsed: '1 day ago', status: 'active' },
  { id: 3, name: 'Old Staging Key', key: 'sk_test_zzzzzzzzzzzzzzzzzzzzzzzzzz', prefix: 'sk_test', created: '2023-11-10', lastUsed: '30 days ago', status: 'inactive' },
];

export default function APIKeysPage() {
  const [visible, setVisible] = useState<Record<number, boolean>>({});
  const toggle = (id: number) => setVisible(p => ({ ...p, [id]: !p[id] }));
  const mask = (key: string) => key.slice(0, 12) + '•'.repeat(20);

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">API Keys</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage API access credentials</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium text-sm transition-colors">
          <Plus className="w-4 h-4" /> Generate Key
        </button>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-sm">
        ⚠️ Keep your API keys secret. Never share them publicly or commit them to version control.
      </div>

      <div className="space-y-4">
        {KEYS.map(k => (
          <div key={k.id} className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{k.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${k.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'}`}>{k.status}</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 font-mono text-sm">
                  <span className="flex-1 truncate text-slate-700 dark:text-slate-300">
                    {visible[k.id] ? k.key : mask(k.key)}
                  </span>
                  <button onClick={() => toggle(k.id)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded">
                    {visible[k.id] ? <EyeOff className="w-4 h-4 text-slate-500" /> : <Eye className="w-4 h-4 text-slate-500" />}
                  </button>
                  <button onClick={() => navigator.clipboard?.writeText(k.key)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded">
                    <Copy className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
                  <span>Created {k.created}</span>
                  <span>Last used {k.lastUsed}</span>
                </div>
              </div>
              <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500 flex-shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
