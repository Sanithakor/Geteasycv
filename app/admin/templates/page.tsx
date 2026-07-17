/**
 * Resume Templates Management Page
 */

'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Search, Eye, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { generateTemplates, GeneratedTemplate } from '@/lib/generateTemplates';
import { generateOptimizedTemplatePreview } from '@/lib/optimizedTemplatePreview';
import toast, { Toaster } from 'react-hot-toast';

const TEMPLATE_METADATA = [
  {
    id: 'single-column-ats-modern-blue',
    downloads: 2543,
    rating: 4.8,
    status: 'published',
    updatedAt: '2024-06-15',
  },
  {
    id: 'sidebar-left-luxury-purple',
    downloads: 1823,
    rating: 4.6,
    status: 'published',
    updatedAt: '2024-06-10',
  },
  {
    id: 'two-column-split-creative-orange',
    downloads: 1540,
    rating: 4.7,
    status: 'published',
    updatedAt: '2024-06-08',
  },
  {
    id: 'compact-ats-minimal-neutral',
    downloads: 3120,
    rating: 4.9,
    status: 'published',
    updatedAt: '2024-05-28',
  },
  {
    id: 'bento-grid-glass-gradient',
    downloads: 980,
    rating: 4.5,
    status: 'published',
    updatedAt: '2024-06-01',
  },
  {
    id: 'centered-rose-red',
    downloads: 1420,
    rating: 4.4,
    status: 'published',
    updatedAt: '2024-06-02',
  }
];

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayTemplates, setDisplayTemplates] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const allTemplates = generateTemplates();
    
    // Check if there is templates state in localStorage
    const saved = localStorage.getItem('geteasycv-admin-templates');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Re-attach templateObj matching by ID or fallback
        const reattached = parsed.map((item: any) => {
          const match = allTemplates.find(t => t.id === item.id);
          return {
            ...item,
            templateObj: match || allTemplates[0]
          };
        });
        setDisplayTemplates(reattached);
      } catch (err) {
        console.error('Failed to parse saved templates:', err);
      }
    } else {
      // Merge generated templates with metadata
      const templatesWithMeta = TEMPLATE_METADATA.map(meta => {
        const match = allTemplates.find(t => t.id === meta.id);
        if (match) {
          return {
            ...meta,
            name: match.layout.name,
            category: match.category,
            themeName: match.theme.name,
            templateObj: match
          };
        }
        return null;
      }).filter(Boolean);

      let finalTemplates = [];
      if (templatesWithMeta.length === 0) {
        finalTemplates = allTemplates.slice(0, 6).map((t, idx) => ({
          id: t.id,
          name: t.layout.name,
          category: t.category,
          themeName: t.theme.name,
          status: idx % 3 === 0 ? 'draft' : 'published',
          downloads: idx * 450 + 200,
          rating: 4.5 + (idx % 5) * 0.1,
          templateObj: t
        }));
      } else {
        finalTemplates = templatesWithMeta;
      }
      
      setDisplayTemplates(finalTemplates);
      // Persist metadata (exclude templateObj to keep JSON small)
      const toSave = (finalTemplates as any[]).map(({ templateObj, ...rest }) => rest);
      localStorage.setItem('geteasycv-admin-templates', JSON.stringify(toSave));
    }
  }, []);

  const toggleStatus = (id: string) => {
    const updated = displayTemplates.map((t) => {
      if (t.id === id) {
        const newStatus = t.status === 'published' ? 'draft' : 'published';
        toast.success(`Template status updated to ${newStatus}`);
        return { ...t, status: newStatus };
      }
      return t;
    });
    setDisplayTemplates(updated);
    // Persist
    const toSave = updated.map(({ templateObj, ...rest }) => rest);
    localStorage.setItem('geteasycv-admin-templates', JSON.stringify(toSave));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this template?')) {
      const filtered = displayTemplates.filter((t) => t.id !== id);
      setDisplayTemplates(filtered);
      // Persist
      const toSave = filtered.map(({ templateObj, ...rest }) => rest);
      localStorage.setItem('geteasycv-admin-templates', JSON.stringify(toSave));
      toast.success('Template removed successfully!');
    }
  };

  const filteredTemplates = displayTemplates.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.themeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Toaster position="bottom-right" />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Resume Templates
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Create and manage resume templates ({displayTemplates.length} total configurations)
          </p>
        </div>
        <Link
          href="/admin/templates/new"
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
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
          placeholder="Search templates by layout, category, or theme..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          let svgContent = '';
          if (mounted && template.templateObj) {
            try {
              svgContent = generateOptimizedTemplatePreview(template.templateObj);
            } catch (e) {
              console.error('Error generating preview in admin:', e);
            }
          }

          return (
            <div
              key={template.id}
              className="group rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Preview Wrapper */}
              <div className="h-64 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden flex items-center justify-center p-4">
                {svgContent ? (
                  <div 
                    className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain shadow-md rounded border border-slate-200 dark:border-slate-700/50 bg-white"
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                ) : (
                  <span className="text-4xl text-slate-400">📄</span>
                )}
                
                {/* Actions overlay on hover */}
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] group-hover:opacity-100 opacity-0 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button className="p-2.5 bg-white hover:bg-slate-50 rounded-lg shadow-lg transition-transform hover:scale-105" title="Preview Layout">
                    <Eye className="w-5 h-5 text-slate-900" />
                  </button>
                  <button className="p-2.5 bg-white hover:bg-slate-50 rounded-lg shadow-lg transition-transform hover:scale-105" title="Edit Template Config">
                    <Edit2 className="w-5 h-5 text-slate-900" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-700/50 space-y-3">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white truncate">
                    {template.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mt-1">
                    <span>{template.category}</span>
                    <span className="font-semibold text-violet-600 dark:text-violet-400">{template.themeName} Theme</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                  <div>
                    <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-600 dark:text-slate-400">
                      Downloads
                    </p>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                      {template.downloads.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-600 dark:text-slate-400">
                      Rating
                    </p>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                      {template.rating > 0 ? `${template.rating} ⭐` : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Status bar */}
                <div className="flex items-center justify-between pt-2">
                  <span
                    onClick={() => toggleStatus(template.id)}
                    className={`px-3 py-0.5 rounded-full text-xs font-semibold cursor-pointer hover:opacity-85 select-none ${
                      template.status === 'published'
                        ? 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400'
                        : 'bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-400'
                    }`}
                  >
                    {template.status === 'published' ? '✓ Published' : '🔄 Draft'}
                  </span>
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                    title="Delete Template"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
