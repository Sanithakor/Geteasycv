/**
 * GetEasyCV — Privacy-Preserving Conversion Funnel Analytics
 * Tracks core user conversion milestones without logging sensitive resume PII.
 */

export type AnalyticsEvent =
  | 'page_view'
  | 'template_view'
  | 'template_selected'
  | 'builder_started'
  | 'account_created'
  | 'resume_created'
  | 'resume_completed'
  | 'resume_saved'
  | 'ai_used'
  | 'ats_check_started'
  | 'ats_check_completed'
  | 'pdf_export'
  | 'docx_export'
  | 'checkout_started'
  | 'purchase_completed'
  | 'subscription_cancelled';

export interface EventProperties {
  templateId?: string;
  planId?: string;
  format?: string;
  source?: string;
  score?: number;
  tokensUsed?: number;
  [key: string]: any;
}

/**
 * Dispatches an analytics event to available client providers (GA, custom endpoint)
 * Strips any personally identifiable resume content.
 */
export function trackEvent(eventName: AnalyticsEvent, properties: EventProperties = {}): void {
  if (typeof window === 'undefined') return;

  // Sanitize properties to prevent accidental PII leakage
  const safeProperties: Record<string, any> = {};
  const blockedKeys = ['email', 'phone', 'firstName', 'lastName', 'address', 'password', 'rawContent', 'cvData'];

  for (const [key, val] of Object.entries(properties)) {
    if (!blockedKeys.includes(key) && typeof val !== 'function') {
      safeProperties[key] = val;
    }
  }

  // 1. Log to console in development mode
  if (process.env.NODE_ENV === 'development') {
    console.log(`[ANALYTICS] Event: "${eventName}"`, safeProperties);
  }

  // 2. Window gtag / dataLayer integration if configured
  try {
    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, safeProperties);
    }
  } catch (err) {
    // Non-blocking
  }
}
