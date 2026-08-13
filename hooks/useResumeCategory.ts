'use client';

import { useState, useEffect } from 'react';
import { CVData } from '@/data/sampleCV';

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

type CategoryData = {
  category: {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
  };
  sampleData: CVData;
};

export function useResumeCategory() {
  const [categories, setCategories] = useState<ResumeCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ResumeCategory | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/resume-categories');
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data);
      } else {
        setError(data.error || 'Failed to fetch categories');
      }
    } catch (err) {
      setError('Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch sample data for specific category
  const fetchCategoryData = async (categoryId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/resume-categories/${categoryId}/sample-data`);
      const data = await response.json();
      
      if (data.success) {
        setCategoryData(data.data);
        
        // Also set the selected category
        const category = categories.find(c => c.id === categoryId);
        if (category) {
          setSelectedCategory(category);
        }
      } else {
        setError(data.error || 'Failed to fetch category data');
      }
    } catch (err) {
      setError('Failed to fetch category data');
      console.error('Error fetching category data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Select a category and load its data
  const selectCategory = async (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) {
      setError('Category not found');
      return;
    }

    setSelectedCategory(category);
    await fetchCategoryData(categoryId);
  };

  // Clear category selection
  const clearCategory = () => {
    setSelectedCategory(null);
    setCategoryData(null);
    setError(null);
  };

  // Get category by ID
  const getCategoryById = (categoryId: string) => {
    return categories.find(c => c.id === categoryId);
  };

  // Generate empty resume data based on category
  const generateEmptyResumeData = (categoryId?: string): CVData => {
    if (categoryId && categoryData && categoryData.category.id === categoryId) {
      // Return sample data as template
      return categoryData.sampleData;
    }

    // Return generic empty data
    return {
      personal: {
        firstName: '',
        lastName: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
      },
      summary: '',
      experience: [],
      skills: [],
      education: [],
    };
  };

  // Initialize - fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    // State
    categories,
    selectedCategory,
    categoryData,
    loading,
    error,
    
    // Actions
    fetchCategories,
    fetchCategoryData,
    selectCategory,
    clearCategory,
    getCategoryById,
    generateEmptyResumeData,
    
    // Computed
    hasCategories: categories.length > 0,
    hasCategoryData: categoryData !== null,
    sampleData: categoryData?.sampleData || null,
  };
}