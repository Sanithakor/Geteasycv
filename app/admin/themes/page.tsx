'use client';

import React from 'react';
import { Plus, Search, Edit2, Trash2, Paintbrush } from 'lucide-react';
import { themes } from '@/data/themes';

export default function Page() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredThemes = themes.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Themes</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and customize color schemes, typography, and spacing for resumes ({themes.length} total)
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Create Theme
        </button>
      </div>

      {/* Filter and Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search themes by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredThemes.map((theme) => (
          <div
            key={theme.id}
            className="group rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            {/* Color preview banner */}
            <div 
              className="h-20 relative overflow-hidden flex items-center justify-center"
              style={{ 
                background: theme.background.includes('gradient') 
                  ? theme.background 
                  : `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})` 
              }}
            >
              <div className="absolute inset-0 bg-black/5 opacity-40 group-hover:opacity-0 transition-opacity" />
              <Paintbrush className="w-8 h-8 text-white relative z-10 drop-shadow-md group- transition-transform" />
            </div>

            {/* Theme Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center justify-between">
                  {theme.name}
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                    {theme.shadowStyle} Shadow
                  </span>
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                  {theme.description}
                </p>
              </div>

              {/* Color Swatches */}
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-md p-3 space-y-2">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">Color Palette</p>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center" style={{ backgroundColor: theme.primary }} />
                    <span className="text-[9px] text-slate-500 mt-1 font-mono">Primary</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center" style={{ backgroundColor: theme.secondary }} />
                    <span className="text-[9px] text-slate-500 mt-1 font-mono">Secondary</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center" style={{ backgroundColor: theme.background.includes('gradient') ? '#fff' : theme.background }} />
                    <span className="text-[9px] text-slate-500 mt-1 font-mono">Bg</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center" style={{ backgroundColor: theme.text }} />
                    <span className="text-[9px] text-slate-500 mt-1 font-mono">Text</span>
                  </div>
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                <div>
                  <span className="block font-medium text-slate-400">Heading Font:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{theme.fontFamilyHeading}</span>
                </div>
                <div>
                  <span className="block font-medium text-slate-400">Border Radius:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{theme.borderRadius}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-green-700 dark:text-green-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500" /> Active
                </span>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-600 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
