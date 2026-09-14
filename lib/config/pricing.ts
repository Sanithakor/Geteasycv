/**
 * GetEasyCV — Central Pricing & Subscription Configuration
 * Single Source of Truth for plans, prices, feature limits, and display metadata.
 */

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  rawPrice: number; // Price in currency unit (e.g. 199 for ₹199 or 9 for $9)
  amountPaise: number; // Amount in smallest currency sub-unit (for Razorpay: ₹1 = 100 paise)
  currency: string;
  billingPeriod: string;
  period: string; // Alias for billingPeriod for compatibility
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  highlight?: boolean; // Alias for popular
  badge?: string | null;
  isActive: boolean;
  
  // Feature limits & permissions
  maxResumes: number; // -1 for unlimited
  canUseAI: boolean;
  canUsePremiumTemplates: boolean;
  canExportPDF: boolean;
  canExportImages: boolean;
  sortOrder: number;
}

export const PRICING_PLANS: Record<string, PricingPlan> = {
  free: {
    id: 'free',
    name: 'Free',
    price: '$0',
    rawPrice: 0,
    amountPaise: 0,
    currency: '$',
    billingPeriod: 'Free forever',
    period: 'Free forever',
    description: 'Essential CV creation with standard templates.',
    features: [
      '1 CV Creation',
      'Standard ATS Template',
      'Basic PDF Export',
      'Free Account Forever',
    ],
    cta: 'Current Plan',
    popular: false,
    highlight: false,
    badge: null,
    isActive: true,
    maxResumes: 1,
    canUseAI: false,
    canUsePremiumTemplates: false,
    canExportPDF: true,
    canExportImages: false,
    sortOrder: 0,
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    price: '₹49',
    rawPrice: 49,
    amountPaise: 4900,
    currency: '₹',
    billingPeriod: 'one-time payment',
    period: 'one-time payment',
    description: 'Perfect for quick single resume creation.',
    features: [
      '1 CV Creation',
      'High-resolution PDF download',
      'Access to core templates',
      'No recurring payment',
    ],
    cta: 'Buy Starter',
    popular: false,
    highlight: false,
    badge: null,
    isActive: true,
    maxResumes: 1,
    canUseAI: false,
    canUsePremiumTemplates: false,
    canExportPDF: true,
    canExportImages: false,
    sortOrder: 1,
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: '₹199',
    rawPrice: 199,
    amountPaise: 19900,
    currency: '₹',
    billingPeriod: 'month',
    period: 'month',
    description: 'For active job seekers looking to maximize interviews.',
    features: [
      'Unlimited CVs & Downloads',
      'All 100+ premium ATS templates',
      'PDF, PNG, JPG High-Res Exports',
      'AI Resume Bullet Rewriter & Optimizer',
      'Cancel anytime with 1-click',
    ],
    cta: 'Start Pro',
    popular: true,
    highlight: true,
    badge: 'MOST POPULAR',
    isActive: true,
    maxResumes: -1,
    canUseAI: true,
    canUsePremiumTemplates: true,
    canExportPDF: true,
    canExportImages: true,
    sortOrder: 2,
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: '₹999',
    rawPrice: 999,
    amountPaise: 99900,
    currency: '₹',
    billingPeriod: 'lifetime access',
    period: 'lifetime access',
    description: 'Permanent access for serious career growth.',
    features: [
      'Everything included in Pro',
      'Lifetime Unlimited Access & Exports',
      'All Future Premium Templates & Tools',
      'Priority Customer & Career Support',
    ],
    cta: 'Get Premium',
    popular: false,
    highlight: false,
    badge: 'BEST VALUE',
    isActive: true,
    maxResumes: -1,
    canUseAI: true,
    canUsePremiumTemplates: true,
    canExportPDF: true,
    canExportImages: true,
    sortOrder: 3,
  },
  lifetime: {
    id: 'lifetime',
    name: 'Lifetime',
    price: '₹999',
    rawPrice: 999,
    amountPaise: 99900,
    currency: '₹',
    billingPeriod: 'one-time payment',
    period: 'one-time payment',
    description: 'Permanent access for serious career growth.',
    features: [
      'Everything in Pro',
      'Lifetime Unlimited Access',
      'Future Premium Templates',
      'Priority Customer Support',
    ],
    cta: 'Get Lifetime',
    popular: false,
    highlight: false,
    badge: 'BEST VALUE',
    isActive: true,
    maxResumes: -1,
    canUseAI: true,
    canUsePremiumTemplates: true,
    canExportPDF: true,
    canExportImages: true,
    sortOrder: 4,
  },
};

export const DISPLAY_PLANS: PricingPlan[] = [
  PRICING_PLANS.free,
  PRICING_PLANS.pro,
  PRICING_PLANS.premium,
];

export function getPlanById(planId: string): PricingPlan {
  const normalized = (planId || 'pro').toLowerCase().trim();
  if (PRICING_PLANS[normalized]) {
    return PRICING_PLANS[normalized];
  }
  // Alias mapping
  if (normalized === 'starter') return PRICING_PLANS.starter;
  if (normalized === 'lifetime') return PRICING_PLANS.lifetime;
  return PRICING_PLANS.pro;
}

export function isUserPlanActive(userTier: string | null | undefined, targetPlanId: string): boolean {
  if (!userTier) return targetPlanId === 'free';
  const tier = userTier.toLowerCase().trim();
  const target = targetPlanId.toLowerCase().trim();
  if (tier === target) return true;
  if ((tier === 'premium' || tier === 'lifetime') && (target === 'premium' || target === 'lifetime')) return true;
  return false;
}
