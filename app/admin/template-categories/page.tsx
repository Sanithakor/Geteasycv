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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-md border border-gray-200 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Template Categories Management</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage template categories, experience levels, and industry mappings
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-blue-50 rounded-md p-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Categories</span>
                </div>
                <div className="text-2xl font-bold text-blue-900 mt-1">{categories.length}</div>
                <div className="text-xs text-blue-600">{getActiveCategoriesForTemplates().length} active</div>
              </div>
              <div className="bg-green-50 rounded-md p-4">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Templates</span>
                </div>
                <div className="text-2xl font-bold text-green-900 mt-1">{stats.totalTemplates}</div>
                <div className="text-xs text-green-600">{stats.layouts} layouts × {stats.themes} themes</div>
              </div>
              <div className="bg-purple-50 rounded-md p-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">Experience Levels</span>
                </div>
                <div className="text-2xl font-bold text-purple-900 mt-1">{experienceLevels.length}</div>
                <div className="text-xs text-purple-600">From fresher to executive</div>
              </div>
              <div className="bg-orange-50 rounded-md p-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-700">Avg Templates</span>
                </div>
                <div className="text-2xl font-bold text-orange-900 mt-1">{stats.avgTemplatesPerCategory}</div>
                <div className="text-xs text-orange-600">Per category</div>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-md border border-gray-200 shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-full sm:w-96 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="rounded-md border border-gray-200 px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">
              Template Categories ({filteredCategories.length})
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredCategories.map((category) => (
              <div key={category.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{category.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-semibold text-gray-900">{category.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          category.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {category.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="font-medium text-gray-700">Popular Roles:</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {category.popularFor.slice(0, 3).map((role, idx) => (
                              <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                {role}
                              </span>
                            ))}
                            {category.popularFor.length > 3 && (
                              <span className="text-gray-500">+{category.popularFor.length - 3} more</span>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-700">Experience Levels:</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {category.experienceLevel.map((level, idx) => (
                              <span key={idx} className="bg-purple-100 text-purple-700 px-2 py-1 rounded capitalize">
                                {level.replace('-', ' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-700">Design Styles:</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {category.styles.map((style, idx) => (
                              <span key={idx} className="bg-orange-100 text-orange-700 px-2 py-1 rounded capitalize">
                                {style.replace('-', ' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-700">Templates: {category.templateIds.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCategoryStatus(category.id)}
                      className={`p-2 rounded-md transition-colors ${
                        category.isActive 
                          ? 'text-green-600 hover:bg-green-100' 
                          : 'text-gray-400 hover:bg-gray-100'
                      }`}
                      title={category.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {category.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 rounded-md text-blue-600 hover:bg-blue-100 transition-colors"
                      title="Edit Category"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-md text-red-600 hover:bg-red-100 transition-colors"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-md max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Edit Category</h3>
                <button
                  onClick={handleCancel}
                  className="p-2 rounded-md text-gray-400 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={selectedCategory.name}
                    onChange={(e) => setSelectedCategory(prev => prev ? {...prev, name: e.target.value} : null)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={selectedCategory.description}
                    onChange={(e) => setSelectedCategory(prev => prev ? {...prev, description: e.target.value} : null)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                    <input
                      type="text"
                      value={selectedCategory.icon}
                      onChange={(e) => setSelectedCategory(prev => prev ? {...prev, icon: e.target.value} : null)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <input
                      type="text"
                      value={selectedCategory.color}
                      onChange={(e) => setSelectedCategory(prev => prev ? {...prev, color: e.target.value} : null)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Count: {selectedCategory.templateIds.length}
                  </label>
                  <p className="text-sm text-gray-500">
                    Template mappings are automatically generated based on category rules
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}