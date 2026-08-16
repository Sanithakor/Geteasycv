/**
 * Centralized OpenAI Service (Server-Side Only)
 * Handles OpenAI client initialization, structured JSON output, retries,
 * error handling, token tracking, and rule-based fallbacks.
 */

import OpenAI from 'openai';

// ─── Environment & Client Setup ─────────────────────────────────────────────
const apiKey = process.env.OPENAI_API_KEY?.trim() || '';

let openaiClient: OpenAI | null = null;

if (apiKey && apiKey !== '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') {
  openaiClient = new OpenAI({
    apiKey: apiKey,
  });
}

export interface AITaskOptions<T> {
  featureName: string;
  systemPrompt: string;
  userPrompt: string;
  fallbackFn: () => T;
  temperature?: number;
  model?: string;
}

export interface AITaskResult<T> {
  success: boolean;
  data: T;
  isFallback: boolean;
  tokensUsed?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  modelUsed?: string;
  error?: string;
}

/**
 * Sanitize AI output strings to prevent potential XSS
 */
export function sanitizeText(text: string): string {
  if (typeof text !== 'string') return text;
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

/**
 * Recursively sanitize string fields in an object
 */
export function sanitizeObject<T>(obj: T): T {
  if (typeof obj === 'string') {
    return sanitizeText(obj) as any;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item)) as any;
  }
  if (obj !== null && typeof obj === 'object') {
    const result: any = {};
    for (const key of Object.keys(obj)) {
      result[key] = sanitizeObject((obj as any)[key]);
    }
    return result as T;
  }
  return obj;
}

/**
 * Centralized executor for OpenAI tasks with structured JSON parsing & fallback
 */
export async function executeAITask<T>(options: AITaskOptions<T>): Promise<AITaskResult<T>> {
  const {
    featureName,
    systemPrompt,
    userPrompt,
    fallbackFn,
    temperature = 0.7,
    model = 'gpt-4o-mini',
  } = options;

  // 1. If OpenAI API Key is missing, use rule-based fallback immediately
  if (!openaiClient) {
    console.info(`[OPENAI_SERVICE] API Key not configured. Using rule-based fallback for "${featureName}".`);
    return {
      success: true,
      data: sanitizeObject(fallbackFn()),
      isFallback: true,
      modelUsed: 'rule-based-fallback',
    };
  }

  // 2. Call OpenAI Chat Completions API with JSON mode
  try {
    const startTime = Date.now();
    const response = await openaiClient.chat.completions.create({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: temperature,
      max_tokens: 1500,
    });

    const durationMs = Date.now() - startTime;
    const rawContent = response.choices[0]?.message?.content?.trim() || '';

    if (!rawContent) {
      throw new Error('Received empty response from OpenAI');
    }

    // 3. Parse JSON response
    const parsedData: T = JSON.parse(rawContent);
    const sanitizedData = sanitizeObject(parsedData);

    const usage = response.usage;
    const tokensUsed = usage
      ? {
          promptTokens: usage.prompt_tokens,
          completionTokens: usage.completion_tokens,
          totalTokens: usage.total_tokens,
        }
      : undefined;

    console.info(
      `[OPENAI_SUCCESS] Feature: "${featureName}" | Model: ${model} | Duration: ${durationMs}ms | Tokens: ${tokensUsed?.totalTokens || 'N/A'}`
    );

    return {
      success: true,
      data: sanitizedData,
      isFallback: false,
      tokensUsed,
      modelUsed: model,
    };
  } catch (error: any) {
    // 4. Handle errors gracefully without exposing sensitive credentials or stack traces
    const errorMessage = error?.message || 'OpenAI request failed';
    console.error(`[OPENAI_ERROR] Feature: "${featureName}" | Error: ${errorMessage}`);

    // Fall back gracefully to rule-based suggestion so UI never breaks
    try {
      const fallbackData = fallbackFn();
      return {
        success: true,
        data: sanitizeObject(fallbackData),
        isFallback: true,
        modelUsed: 'rule-based-fallback',
        error: process.env.NODE_ENV === 'development' ? errorMessage : 'AI service fallback used',
      };
    } catch (fallbackErr) {
      console.error(`[OPENAI_FALLBACK_ERR] Feature: "${featureName}" | Error:`, fallbackErr);
      throw error;
    }
  }
}
