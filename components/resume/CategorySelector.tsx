'use client';

import { useState, useEffect } from 'react';
import { Search, Users, Briefcase, Zap, ChevronRight } from 'lucide-react';

type ResumeCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  popularRoles: string[];
  requiredSkills: string[];
  isActive: boolean;
  sortOrder: number;
};

type CategorySelectorProps = {
  selectedCategoryId?: string;
  onCategorySelect: (categoryId: string) => void;
  onSkip?: () => void;
  className?: string;
};

export default function CategorySelector({ 
  selectedCategoryId, 
  onCategorySelect, 
  onSkip,
  className = '' 
}: CategorySelectorProps) {
  const [categories, setCategories] = useState<ResumeCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResumeCategory | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId && categories.length > 0) {
      const category = categories.find(c => c.id === selectedCategoryId);
      setSelectedCategory(category || null);
    }
  }, [selectedCategoryId, categories]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/resume-categories');
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.popularRoles.some(role => 
      role.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleCategoryClick = (category: ResumeCategory) => {
    setSelectedCategory(category);
    onCategorySelect(category.id);
  };

  const popularCategories = categories.slice(0, 6);
  const otherCategories = categories.slice(6);

  if (loading) {
    return (
      <div className={`bg-white rounded-md border p-8 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-md"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-md border ${className}`}>
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Choose Your Industry</h2>
            <p className="text-gray-600 mt-1">
              Select a category to get industry-specific resume content and suggestions
            </p>
          </div>
          {onSkip && (
            <button
              onClick={onSkip}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Skip for now
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by industry, role, or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="p-6">
        {/* Selected Category Preview */}
        {selectedCategory && (
          <div className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-10 h-10 rounded-md flex items-center justify-center text-white text-lg"
                style={{ backgroundColor: selectedCategory.color }}
              >
                {selectedCategory.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{selectedCategory.name}</h3>
                <p className="text-sm text-gray-600">Selected Category</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3">{selectedCategory.description}</p>
            <div className="flex flex-wrap gap-2">
              {selectedCategory.popularRoles.slice(0, 4).map((role, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Popular Categories */}
        {!searchTerm && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Popular Categories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  isSelected={selectedCategory?.id === category.id}
                  onClick={() => handleCategoryClick(category)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Categories / Search Results */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-600" />
            {searchTerm ? 'Search Results' : 'All Categories'}
          </h3>
          
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-600">No categories found matching your search.</p>
              <p className="text-sm text-gray-500 mt-1">Try different keywords or browse all categories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  isSelected={selectedCategory?.id === category.id}
                  onClick={() => handleCategoryClick(category)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type CategoryCardProps = {
  category: ResumeCategory;
  isSelected: boolean;
  onClick: () => void;
};

function CategoryCard({ category, isSelected, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-md border-2 text-left transition-all hover:shadow-md ${
        isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div 
          className="w-12 h-12 rounded-md flex items-center justify-center text-white text-xl"
          style={{ backgroundColor: category.color }}
        >
          {category.icon}
        </div>
        <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
      </div>
      
      <h4 className="font-semibold text-gray-900 mb-2">{category.name}</h4>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{category.description}</p>
      
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
        <Users className="w-3 h-3" />
        <span>{category.popularRoles.length} roles</span>
      </div>
      
      <div className="flex flex-wrap gap-1">
        {category.popularRoles.slice(0, 2).map((role, index) => (
          <span
            key={index}
            className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
          >
            {role}
          </span>
        ))}
        {category.popularRoles.length > 2 && (
          <span className="text-xs text-gray-500">
            +{category.popularRoles.length - 2} more
          </span>
        )}
      </div>
    </button>
  );
}