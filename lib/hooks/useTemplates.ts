import { useState, useCallback } from 'react';
import axios from 'axios';

interface Template {
  id: string;
  name: string;
  slug: string;
  category: string;
  thumbnail: string;
  isPremium: boolean;
  isATS: boolean;
  downloads: number;
  rating: number;
  reviewCount: number;
}

interface GetTemplatesParams {
  category?: string;
  premium?: boolean;
  ats?: boolean;
  page?: number;
  limit?: number;
}

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch templates
  const fetchTemplates = useCallback(async (params?: GetTemplatesParams) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.append('category', params.category);
      if (params?.premium) queryParams.append('premium', 'true');
      if (params?.ats) queryParams.append('ats', 'true');
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await axios.get(
        `/api/templates?${queryParams.toString()}`
      );
      
      setTemplates(response.data.data || []);
      setPagination(response.data.pagination);
      return response.data.data;
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to fetch templates';
      setError(message);
      console.error('[FETCH_TEMPLATES_ERROR]', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single template
  const getTemplate = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/templates/${id}`);
      return response.data.data;
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to fetch template';
      setError(message);
      console.error('[GET_TEMPLATE_ERROR]', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Use template (create resume from template)
  const useTemplate = useCallback(async (id: string, title?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`/api/templates/${id}/use`, {
        title: title || `New Resume`,
      });
      return response.data.data;
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to create resume from template';
      setError(message);
      console.error('[USE_TEMPLATE_ERROR]', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    templates,
    pagination,
    loading,
    error,
    fetchTemplates,
    getTemplate,
    useTemplate,
  };
}
