/**
 * Centralized Entitlement & Feature Access Control Layer
 * Evaluates plan status server-side and client-side without relying on untrusted localStorage.
 */

export type PlanType = 'free' | 'starter' | 'pro' | 'lifetime' | 'premium';

export interface UserEntitlement {
  plan: PlanType;
  status: 'active' | 'canceled' | 'expired' | 'paused';
  isAdmin: boolean;
  isPaid: boolean;
  isStarter: boolean;
  isPro: boolean;
  isLifetime: boolean;
  maxResumes: number; // 1 for free/starter, -1 for unlimited
  canUseAI: boolean; // Pro, Lifetime, and Admin
  canUsePremiumTemplates: boolean; // Pro, Lifetime, and Admin
  canExportPDF: boolean; // All plans (free limited to 1 download)
  canExportImages: boolean; // Pro, Lifetime, and Admin (PNG, JPG)
  canDownloadEverything: boolean; // Full unrestricted download capability
}

export function getUserEntitlements(userPayload: any): UserEntitlement {
  const role = (userPayload?.role || '').toLowerCase();
  const isAdmin = role === 'admin' || userPayload?.isAdmin === true;

  const plan: PlanType = isAdmin
    ? 'lifetime'
    : ((userPayload?.subscriptionTier || userPayload?.tier || userPayload?.plan || 'free').toLowerCase() as PlanType);
  const status = userPayload?.subscriptionStatus || userPayload?.status || 'active';

  const isStarter = !isAdmin && plan === 'starter' && status === 'active';
  const isPro = isAdmin || ((plan === 'pro' || plan === 'premium') && (status === 'active' || status === 'on_trial' || status === 'canceled'));
  const isLifetime = isAdmin || (plan === 'lifetime' && status === 'active');

  const isPaid = isAdmin || isStarter || isPro || isLifetime;

  return {
    plan,
    status: 'active',
    isAdmin,
    isPaid,
    isStarter,
    isPro,
    isLifetime,
    maxResumes: isAdmin || isPro || isLifetime ? -1 : 1,
    canUseAI: isAdmin || isPro || isLifetime,
    canUsePremiumTemplates: isAdmin || isPro || isLifetime,
    canExportPDF: true,
    canExportImages: isAdmin || isPro || isLifetime,
    canDownloadEverything: isAdmin || isPaid,
  };
}

export function canCreateCV(userPayload: any, currentCount: number): { allowed: boolean; reason?: string } {
  const role = (userPayload?.role || '').toLowerCase();
  if (role === 'admin' || userPayload?.isAdmin === true) {
    return { allowed: true };
  }

  const entitlements = getUserEntitlements(userPayload);
  if (entitlements.isAdmin || entitlements.maxResumes === -1) {
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
  const role = (userPayload?.role || '').toLowerCase();
  // Administrators have full unrestricted access: can download everything, anytime, with zero limits
  if (role === 'admin' || userPayload?.isAdmin === true) {
    return { allowed: true };
  }

  const entitlements = getUserEntitlements(userPayload);

  // Admin or Paid users (Starter, Pro, Lifetime) have unlimited PDF downloads under their active entitlement
  if (entitlements.isAdmin || entitlements.isPaid) {
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

export function canExportFormat(userPayload: any, format: 'pdf' | 'png' | 'jpg' | 'docx' | 'txt'): { allowed: boolean; reason?: string; redirectUrl?: string } {
  const role = (userPayload?.role || '').toLowerCase();
  // Administrators can export any format at any time without restriction
  if (role === 'admin' || userPayload?.isAdmin === true) {
    return { allowed: true };
  }

  const entitlements = getUserEntitlements(userPayload);
  if (entitlements.isAdmin) {
    return { allowed: true };
  }

  if (format === 'png' || format === 'jpg') {
    if (entitlements.canExportImages) {
      return { allowed: true };
    }
    return {
      allowed: false,
      reason: entitlements.isStarter
        ? 'Starter plan includes high-resolution PDF download. Upgrade to Pro or Lifetime to export in PNG and JPG formats.'
        : 'PNG and JPG exports are available on Pro and Lifetime plans.',
      redirectUrl: '/pricing?plan=pro',
    };
  }

  return { allowed: true };
}

export function canUsePremiumTemplate(userPayload: any): boolean {
  const role = (userPayload?.role || '').toLowerCase();
  if (role === 'admin' || userPayload?.isAdmin === true) {
    return true;
  }
  return getUserEntitlements(userPayload).canUsePremiumTemplates;
}

export function canUseAI(userPayload: any): { allowed: boolean; reason?: string; redirectUrl?: string } {
  const role = (userPayload?.role || '').toLowerCase();
  if (role === 'admin' || userPayload?.isAdmin === true) {
    return { allowed: true };
  }
  const entitlements = getUserEntitlements(userPayload);
  if (entitlements.isAdmin || entitlements.canUseAI) {
    return { allowed: true };
  }
  return {
    allowed: false,
    reason: entitlements.isStarter
      ? 'AI Resume Bullet Rewriter is an exclusive feature of Pro and Lifetime plans. Upgrade to Pro to unlock unlimited AI suggestions.'
      : 'Upgrade to Pro or Lifetime to unlock the AI Resume Bullet Rewriter.',
    redirectUrl: '/pricing?plan=pro',
  };
}

export function canDownloadPDF(): boolean {
  return true;
}
