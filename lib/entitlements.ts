/**
 * Centralized Entitlement & Feature Access Control Layer
 * Evaluates plan status server-side and client-side without relying on untrusted localStorage.
 */

export type PlanType = 'free' | 'starter' | 'pro' | 'lifetime';

export interface UserEntitlement {
  plan: PlanType;
  status: 'active' | 'canceled' | 'expired' | 'paused';
  isPaid: boolean;
  isStarter: boolean;
  isPro: boolean;
  isLifetime: boolean;
  maxResumes: number; // 1 for free/starter, -1 for unlimited
  canUseAI: boolean;
  canUsePremiumTemplates: boolean;
  canExportPDF: boolean;
}

export function getUserEntitlements(userPayload: any): UserEntitlement {
  const plan: PlanType = (userPayload?.subscriptionTier || userPayload?.plan || 'free').toLowerCase() as PlanType;
  const status = userPayload?.subscriptionStatus || userPayload?.status || 'active';

  const isStarter = plan === 'starter' && status === 'active';
  const isPro = plan === 'pro' && (status === 'active' || status === 'on_trial' || status === 'canceled');
  const isLifetime = plan === 'lifetime' && status === 'active';

  const isPaid = isStarter || isPro || isLifetime;

  return {
    plan,
    status,
    isPaid,
    isStarter,
    isPro,
    isLifetime,
    maxResumes: isPro || isLifetime ? -1 : 1,
    canUseAI: isPaid,
    canUsePremiumTemplates: isPaid,
    canExportPDF: true,
  };
}

export function canCreateCV(userPayload: any, currentCount: number): { allowed: boolean; reason?: string } {
  const entitlements = getUserEntitlements(userPayload);
  if (entitlements.maxResumes === -1) {
    return { allowed: true };
  }

  if (currentCount >= entitlements.maxResumes) {
    return {
      allowed: false,
      reason: entitlements.isStarter
        ? 'Starter plan includes 1 CV. Upgrade to Pro or Lifetime for unlimited CVs.'
        : 'Free plan includes 1 CV. Select Starter, Pro, or Lifetime to create more CVs.',
    };
  }

  return { allowed: true };
}

export function canDownloadCV(userPayload: any, downloadsCompleted: number = 0): { allowed: boolean; redirectUrl?: string; reason?: string } {
  const entitlements = getUserEntitlements(userPayload);

  // Paid users (Starter, Pro, Lifetime) have unlimited downloads under their active entitlement
  if (entitlements.isPaid) {
    return { allowed: true };
  }

  // Free users are allowed exactly 1 download
  if (downloadsCompleted >= 1) {
    return {
      allowed: false,
      redirectUrl: '/pricing?reason=download_limit',
      reason: 'Free tier includes 1 download. Please select a plan to download your CV again.',
    };
  }

  return { allowed: true };
}

export function canUsePremiumTemplate(userPayload: any): boolean {
  return getUserEntitlements(userPayload).canUsePremiumTemplates;
}

export function canDownloadPDF(): boolean {
  return true;
}
