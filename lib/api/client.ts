/**
 * API Client
 * Centralized API communication with automatic token injection
 */

import type { ApiResponse, PaginatedResponse } from '../../types';

const getApiBaseUrl = () => {
  let url = process.env.NEXT_PUBLIC_API_URL || 'https://geteasycv.com';
  url = url.replace(/['"]/g, '');
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  if (!url.endsWith('/api')) {
    url = `${url}/api`;
  }
  return url;
};

const API_BASE_URL = getApiBaseUrl();

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get authorization header
   */
  private getAuthHeader(): Record<string, string> {
    if (typeof window === 'undefined') return {};

    const token = localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(path: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(`${this.baseUrl}${path}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    return url.toString();
  }

  /**
   * Handle response
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  /**
   * GET request
   */
  async get<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path, options.params);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
        ...options.headers,
      },
      ...options,
    });

    return this.handleResponse<ApiResponse<T>>(response);
  }

  /**
   * POST request
   */
  async post<T>(path: string, data?: unknown, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path, options.params);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
        ...options.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });

    return this.handleResponse<ApiResponse<T>>(response);
  }

  /**
   * PUT request
   */
  async put<T>(path: string, data?: unknown, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path, options.params);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
        ...options.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });

    return this.handleResponse<ApiResponse<T>>(response);
  }

  /**
   * PATCH request
   */
  async patch<T>(path: string, data?: unknown, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path, options.params);

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
        ...options.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });

    return this.handleResponse<ApiResponse<T>>(response);
  }

  /**
   * DELETE request
   */
  async delete<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path, options.params);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
        ...options.headers,
      },
      ...options,
    });

    return this.handleResponse<ApiResponse<T>>(response);
  }

  /**
   * Upload file
   */
  async uploadFile<T>(
    path: string,
    file: File,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path, options.params);
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...this.getAuthHeader(),
        ...options.headers,
      },
      body: formData,
      ...options,
    });

    return this.handleResponse<ApiResponse<T>>(response);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export type for re-exports
export type { ApiResponse, PaginatedResponse };
