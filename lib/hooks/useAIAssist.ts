/**
 * useAIAssist — React hook for field-level AI content optimization (FR3)
 * Manages request state, credits, suggestion review flow.
 */

'use client';

import { useState, useCallback, useRef } from 'react';
import { useAuthStore } from '@/lib/store/authStore';

export type AIAssistStatus = 'idle' | 'loading' | 'success' | 'error' | 'credits_exhausted';

export interface AIAssistResult {
  original: string;
  suggestion: string;
  fieldName: string;
  creditsRemaining: number | null;
}

export interface AIAssistState {
  status: AIAssistStatus;
  result: AIAssistResult | null;
  error: string | null;
  creditsRemaining: number | null;
  creditsLimit: number | null;
  isUnlimited: boolean;
}

export interface UseAIAssistOptions {
  templateId?: string;
  templateCategory?: string;
  templateTone?: string;
  jobTitle?: string;
}

export function useAIAssist(options: UseAIAssistOptions = {}) {
  const { token } = useAuthStore();

  const [state, setState] = useState<AIAssistState>({
    status: 'idle',
    result: null,
    error: null,
    creditsRemaining: null,
    creditsLimit: null,
    isUnlimited: false,
  });

  // Abort controller for cancellation
  const abortRef = useRef<AbortController | null>(null);

  /**
   * Fetch remaining credits without triggering an assist call
   */
  const fetchCredits = useCallback(async () => {
    try {
      const res = await fetch('/api/ai/assist', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setState((prev) => ({
          ...prev,
          creditsRemaining: data.data?.creditsRemaining ?? null,
          creditsLimit: data.data?.creditsLimit ?? null,
          isUnlimited: data.data?.isUnlimited ?? false,
        }));
      }
    } catch (_) {
      // Non-critical
    }
  }, [token]);

  /**
   * Request AI improvement for a specific field (FR3.2, FR3.3)
   */
  const requestSuggestion = useCallback(
    async (
      fieldName: string,
      fieldValue: string,
      context?: string
    ): Promise<AIAssistResult | null> => {
      // Cancel any in-flight request
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      if (!fieldValue || fieldValue.trim().length < 3) {
        setState((prev) => ({
          ...prev,
          status: 'error',
          error: 'Please add some content to this field before using AI assist.',
        }));
        return null;
      }

      setState((prev) => ({
        ...prev,
        status: 'loading',
        error: null,
        result: null,
      }));

      try {
        const res = await fetch('/api/ai/assist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            fieldName,
            fieldValue,
            context: context ?? '',
            templateId: options.templateId,
            templateCategory: options.templateCategory ?? 'Professional',
            templateTone: options.templateTone ?? 'professional',
            jobTitle: options.jobTitle ?? 'professional',
          }),
          signal: abortRef.current.signal,
        });

        const data = await res.json();

        if (!res.ok) {
          if (res.status === 429 || data.code === 'AI_CREDITS_EXHAUSTED') {
            setState((prev) => ({
              ...prev,
              status: 'credits_exhausted',
              error: data.error ?? 'AI credit limit reached. Upgrade to continue.',
              creditsRemaining: 0,
            }));
            return null;
          }
          throw new Error(data.error ?? 'AI service error');
        }

        const result: AIAssistResult = data.data;

        setState((prev) => ({
          ...prev,
          status: 'success',
          result,
          creditsRemaining: result.creditsRemaining,
          error: null,
        }));

        return result;
      } catch (err: any) {
        if (err.name === 'AbortError') return null;

        const errorMsg =
          err instanceof Error
            ? err.message
            : 'AI service temporarily unavailable. Please try again.';

        setState((prev) => ({
          ...prev,
          status: 'error',
          error: errorMsg,
        }));

        return null;
      }
    },
    [token, options.templateId, options.templateCategory, options.templateTone, options.jobTitle]
  );

  /**
   * Accept the AI suggestion — returns the accepted text (FR3.6, FR3.7)
   */
  const acceptSuggestion = useCallback((): string | null => {
    const suggestion = state.result?.suggestion ?? null;
    setState((prev) => ({
      ...prev,
      status: 'idle',
      result: null,
      error: null,
    }));
    return suggestion;
  }, [state.result]);

  /**
   * Reject and dismiss the suggestion (FR3.6)
   */
  const rejectSuggestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      status: 'idle',
      result: null,
      error: null,
    }));
  }, []);

  /**
   * Reset to idle state
   */
  const reset = useCallback(() => {
    abortRef.current?.abort();
    setState({
      status: 'idle',
      result: null,
      error: null,
      creditsRemaining: null,
      creditsLimit: null,
      isUnlimited: false,
    });
  }, []);

  return {
    ...state,
    requestSuggestion,
    acceptSuggestion,
    rejectSuggestion,
    fetchCredits,
    reset,
    isLoading: state.status === 'loading',
    hasResult: state.status === 'success' && state.result !== null,
  };
}
