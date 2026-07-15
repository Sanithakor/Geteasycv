import { useState, useCallback } from 'react';
import axios from 'axios';

interface Resume {
  id: string;
  title: string;
  slug: string;
  status: string;
  downloads: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  personal?: {
    firstName: string;
    lastName: string;
  };
  template?: {
    id: string;
    name: string;
    thumbnail: string;
  };
}

export function useResumes() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all resumes
  const fetchResumes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/resumes');
      setResumes(response.data.data || []);
      return response.data.data;
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to fetch resumes';
      setError(message);
      console.error('[FETCH_RESUMES_ERROR]', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new resume
  const createResume = useCallback(
    async (title: string, templateId: string) => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.post('/api/resumes', {
          title,
          templateId,
        });
        const newResume = response.data.data;
        setResumes((prev) => [newResume, ...prev]);
        return newResume;
      } catch (err: any) {
        const message = err.response?.data?.error || 'Failed to create resume';
        setError(message);
        console.error('[CREATE_RESUME_ERROR]', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Get single resume
  const getResume = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/resumes/${id}`);
      return response.data.data;
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to fetch resume';
      setError(message);
      console.error('[GET_RESUME_ERROR]', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update resume
  const updateResume = useCallback(async (id: string, data: any) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(`/api/resumes/${id}`, data);
      const updated = response.data.data;
      setResumes((prev) =>
        prev.map((r) => (r.id === id ? updated : r))
      );
      return updated;
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to update resume';
      setError(message);
      console.error('[UPDATE_RESUME_ERROR]', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete resume
  const deleteResume = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`/api/resumes/${id}`);
      setResumes((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      const message = err.response?.data?.error || 'Failed to delete resume';
      setError(message);
      console.error('[DELETE_RESUME_ERROR]', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    resumes,
    loading,
    error,
    fetchResumes,
    createResume,
    getResume,
    updateResume,
    deleteResume,
  };
}
