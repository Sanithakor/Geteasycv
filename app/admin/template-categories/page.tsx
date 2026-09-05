'use client';

import React, { useState, useEffect } from 'react';
import { 
  templateCategories,
  experienceLevels,
  styleCategories,
  getActiveCategoriesForTemplates,
  getAllIndustries
} from '@/data/templateCategories';
import { generateTemplates, getTemplateStats } from '@/lib/generateTemplates';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  Users,
  Briefcase,
  Award,
  Palette,
  Search,
  Filter,
  BarChart3
} from 'lucide-react';

type TemplateCategory = typeof templateCategories[0];

export default function TemplateCategoriesAdmin() {
  const [categories, setCategories] = useState(templateCategories);
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const templateStats = getTemplateStats();
    const allTemplates = generateTemplates();
    setStats({
      ...templateStats,
      totalMappings: categories.reduce((sum, cat) => sum + cat.templateIds.length, 0),
      avgTemplatesPerCategory: Math.round(categories.reduce((sum, cat) => sum + cat.templateIds.length, 0) / categories.length)
    });
  }, [categories]);

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && category.isActive) ||
                         (filterStatus === 'inactive' && !category.isActive);
    return matchesSearch && matchesStatus;
  });

  const toggleCategoryStatus = (categoryId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, isActive: !cat.isActive } : cat
    ));
  };

  const handleEdit = (category: TemplateCategory) => {
    setSelectedCategory({ ...category });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!selectedCategory) return;
    
    setCategories(prev => prev.map(cat => 
      cat.id === selectedCategory.id ? selectedCategory : cat
    ));
    setIsEditing(false);
    setSelectedCategory(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Template Categories</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5 font-medium">
            Manage category taxonomy, experience levels, and design archetype mappings
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedCategory({
              id: `cat-${Date.now()}`,
              name: '',
              description: '',
              icon: '📄',
              color: '#0F0F0F',
              popularFor: [],
              experienceLevel: ['mid-level'],
              styles: ['modern'],
              templateIds: [],
              isActive: true
            } as any);
            setIsEditing(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F0F0F] hover:bg-[#262626] text-white rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5] text-[#F5D17B]" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Categories</span>
              <div className="w-8 h-8 rounded-lg bg-[#FEE1CF] text-[#0F0F0F] flex items-center justify-center">
                <Award className="w-4 h-4 text-[#F3645C]" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 tracking-tight">{categories.length}</p>
            <p className="text-xs font-semibold text-emerald-600">{getActiveCategoriesForTemplates().length} active categories</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Templates</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Palette className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 tracking-tight">{stats.totalTemplates}</p>
            <p className="text-xs font-semibold text-slate-500">{stats.layouts} layouts × {stats.themes} themes</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Experience Levels</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Users className="w-4 h-4 text-indigo-600" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 tracking-tight">{experienceLevels.length}</p>
            <p className="text-xs font-semibold text-slate-500">Fresher through Executive</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Templates</span>
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-slate-700" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 tracking-tight">{stats.avgTemplatesPerCategory}</p>
            <p className="text-xs font-semibold text-slate-500">Average per category</p>
          </div>
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search categories by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F0F0F]/15 focus:border-[#0F0F0F] text-sm font-medium transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F0F0F]/15 cursor-pointer shadow-2xs"
          >
            <option value="all">All Categories</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Categories Cards Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/75 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Categories Directory ({filteredCategories.length})
          </h3>
        </div>
        
        <div className="divide-y divide-slate-100">
          {filteredCategories.map((category) => (
            <div key={category.id} className="p-5 sm:p-6 hover:bg-slate-50/60 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-2xl flex-shrink-0 shadow-2xs">
                    {category.icon}
                  </div>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h4 className="text-base font-bold text-slate-900">{category.name}</h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide border ${
                        category.isActive 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-2xl font-medium leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-bold text-slate-700 text-xs">Roles:</span>
                      {category.popularFor.slice(0, 3).map((role, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[11px] font-semibold">
                          {role}
                        </span>
                      ))}
                      {category.popularFor.length > 3 && (
                        <span className="text-slate-400 text-[11px]">+{category.popularFor.length - 3} more</span>
                      )}

                      <span className="mx-1.5 text-slate-300">|</span>

                      <span className="font-bold text-slate-700 text-xs">Styles:</span>
                      {category.styles.map((style, idx) => (
                        <span key={idx} className="bg-[#FFF0EB] text-slate-800 px-2 py-0.5 rounded-md text-[11px] font-semibold capitalize">
                          {style.replace('-', ' ')}
                        </span>
                      ))}

                      <span className="mx-1.5 text-slate-300">|</span>

                      <span className="font-bold text-slate-900 text-xs">
                        {category.templateIds.length} templates mapped
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => toggleCategoryStatus(category.id)}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      category.isActive 
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                        : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                    title={category.isActive ? 'Deactivate Category' : 'Activate Category'}
                  >
                    {category.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Edit Category"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCategories(prev => prev.filter(c => c.id !== category.id))}
                    className="p-2 rounded-xl border border-rose-100 bg-rose-50/50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {categories.some(c => c.id === selectedCategory.id) ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button
                onClick={handleCancel}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4 py-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Category Name</label>
                <input
                  type="text"
                  value={selectedCategory.name}
                  onChange={(e) => setSelectedCategory(prev => prev ? {...prev, name: e.target.value} : null)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F0F0F]/15 focus:border-[#0F0F0F] text-sm"
                  placeholder="e.g., Software Engineering"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Description</label>
                <textarea
                  value={selectedCategory.description}
                  onChange={(e) => setSelectedCategory(prev => prev ? {...prev, description: e.target.value} : null)}
                  rows={3}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#0F0F0F]/15 focus:border-[#0F0F0F] text-sm resize-none"
                  placeholder="Describe who this category is best suited for..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Icon (Emoji / Glyph)</label>
                  <input
                    type="text"
                    value={selectedCategory.icon}
                    onChange={(e) => setSelectedCategory(prev => prev ? {...prev, icon: e.target.value} : null)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F0F0F]/15 focus:border-[#0F0F0F] text-sm text-center"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Accent Color</label>
                  <input
                    type="text"
                    value={selectedCategory.color}
                    onChange={(e) => setSelectedCategory(prev => prev ? {...prev, color: e.target.value} : null)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F0F0F]/15 focus:border-[#0F0F0F] text-sm"
                    placeholder="#0F0F0F"
                  />
                </div>
              </div>
              
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Active Template Mappings: {selectedCategory.templateIds?.length || 0}
                </label>
                <p className="text-xs text-slate-500">
                  Mappings are linked to templates matching the style and experience criteria automatically.
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={handleCancel}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!selectedCategory) return;
                  if (categories.some(c => c.id === selectedCategory.id)) {
                    handleSave();
                  } else {
                    setCategories(prev => [selectedCategory, ...prev]);
                    setIsEditing(false);
                    setSelectedCategory(null);
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F0F0F] hover:bg-[#262626] text-white rounded-xl font-bold text-sm transition-colors shadow-sm cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#F5D17B]" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}