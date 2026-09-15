/**
 * GetEasyCV — Central Country-Wise Pricing & Subscription Configuration
 * Single Source of Truth for plans, prices, currencies, feature limits, and display metadata.
 */

import { getCountryOption, CountryOption } from '@/lib/utils/geo';

export interface PlanPrice {
  price: string;          // Formatted price string (e.g. "₹199", "$5.99", "€5.99")
  rawPrice: number;       // Numeric price (e.g. 199, 5.99)
  amountSubunits: number; // Amount in smallest sub-unit (e.g. 19900 paise, 599 cents)
  currency: string;       // Currency ISO code (INR, USD, EUR, etc.)
  symbol: string;         // Currency symbol (₹, $, €, £, C$, A$, AED, S$)
  period: string;         // Billing period text (e.g. "month", "one-time payment", "lifetime access")
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  rawPrice: number;
  amountPaise: number; // Subunit amount (backward compatibility alias)
  amountSubunits: number;
  currency: string;
  symbol: string;
  billingPeriod: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  highlight?: boolean;
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

export interface CountryPlanMatrix {
  currency: string;
  symbol: string;
  starter: { price: string; rawPrice: number; amountSubunits: number };
  pro: { price: string; rawPrice: number; amountSubunits: number };
  premium: { price: string; rawPrice: number; amountSubunits: number };
}

export const COUNTRY_PRICING_MATRIX: Record<string, CountryPlanMatrix> = {
  IN: {
    currency: 'INR',
    symbol: '₹',
    starter: { price: '₹49', rawPrice: 49, amountSubunits: 4900 },
    pro: { price: '₹199', rawPrice: 199, amountSubunits: 19900 },
    premium: { price: '₹999', rawPrice: 999, amountSubunits: 99900 },
  },
  US: {
    currency: 'USD',
    symbol: '$',
    starter: { price: '$1.99', rawPrice: 1.99, amountSubunits: 199 },
    pro: { price: '$5.99', rawPrice: 5.99, amountSubunits: 599 },
    premium: { price: '$24.99', rawPrice: 24.99, amountSubunits: 2499 },
  },
  GB: {
    currency: 'GBP',
    symbol: '£',
    starter: { price: '£1.49', rawPrice: 1.49, amountSubunits: 149 },
    pro: { price: '£4.99', rawPrice: 4.99, amountSubunits: 499 },
    premium: { price: '£19.99', rawPrice: 19.99, amountSubunits: 1999 },
  },
  EU: {
    currency: 'EUR',
    symbol: '€',
    starter: { price: '€1.99', rawPrice: 1.99, amountSubunits: 199 },
    pro: { price: '€5.99', rawPrice: 5.99, amountSubunits: 599 },
    premium: { price: '€24.99', rawPrice: 24.99, amountSubunits: 2499 },
  },
  CA: {
    currency: 'CAD',
    symbol: 'C$',
    starter: { price: 'C$2.99', rawPrice: 2.99, amountSubunits: 299 },
    pro: { price: 'C$7.99', rawPrice: 7.99, amountSubunits: 799 },
    premium: { price: 'C$29.99', rawPrice: 29.99, amountSubunits: 2999 },
  },
  AU: {
    currency: 'AUD',
    symbol: 'A$',
    starter: { price: 'A$3.49', rawPrice: 3.49, amountSubunits: 349 },
    pro: { price: 'A$8.99', rawPrice: 8.99, amountSubunits: 899 },
    premium: { price: 'A$34.99', rawPrice: 34.99, amountSubunits: 3499 },
  },
  AE: {
    currency: 'AED',
    symbol: 'AED',
    starter: { price: 'AED 7', rawPrice: 7, amountSubunits: 700 },
    pro: { price: 'AED 22', rawPrice: 22, amountSubunits: 2200 },
    premium: { price: 'AED 89', rawPrice: 89, amountSubunits: 8900 },
  },
  SG: {
    currency: 'SGD',
    symbol: 'S$',
    starter: { price: 'S$2.99', rawPrice: 2.99, amountSubunits: 299 },
    pro: { price: 'S$7.99', rawPrice: 7.99, amountSubunits: 799 },
    premium: { price: 'S$29.99', rawPrice: 29.99, amountSubunits: 2999 },
  },
};

export function getCountryPricingMatrix(countryCode: string): CountryPlanMatrix {
  const code = (countryCode || 'US').toUpperCase().trim();
  if (COUNTRY_PRICING_MATRIX[code]) {
    return COUNTRY_PRICING_MATRIX[code];
  }
  const option = getCountryOption(code);
  if (COUNTRY_PRICING_MATRIX[option.code]) {
    return COUNTRY_PRICING_MATRIX[option.code];
  }
  return COUNTRY_PRICING_MATRIX.US;
}

export function getLocalizedPlans(countryCode: string = 'IN'): PricingPlan[] {
  const matrix = getCountryPricingMatrix(countryCode);

  const starterPlan: PricingPlan = {
    id: 'starter',
    name: 'Starter',
    price: matrix.starter.price,
    rawPrice: matrix.starter.rawPrice,
    amountPaise: matrix.starter.amountSubunits,
    amountSubunits: matrix.starter.amountSubunits,
    currency: matrix.currency,
    symbol: matrix.symbol,
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
  };

  const proPlan: PricingPlan = {
    id: 'pro',
    name: 'Pro',
    price: matrix.pro.price,
    rawPrice: matrix.pro.rawPrice,
    amountPaise: matrix.pro.amountSubunits,
    amountSubunits: matrix.pro.amountSubunits,
    currency: matrix.currency,
    symbol: matrix.symbol,
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
  };

  const premiumPlan: PricingPlan = {
    id: 'premium',
    name: 'Premium',
    price: matrix.premium.price,
    rawPrice: matrix.premium.rawPrice,
    amountPaise: matrix.premium.amountSubunits,
    amountSubunits: matrix.premium.amountSubunits,
    currency: matrix.currency,
    symbol: matrix.symbol,
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
  };

  return [starterPlan, proPlan, premiumPlan];
}

export const PRICING_PLANS: Record<string, PricingPlan> = {
  free: {
    id: 'free',
    name: 'Free',
    price: '$0',
    rawPrice: 0,
    amountPaise: 0,
    amountSubunits: 0,
    currency: 'USD',
    symbol: '$',
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
  ...getLocalizedPlans('IN').reduce((acc, p) => ({ ...acc, [p.id]: p }), {}),
  lifetime: {
    ...getLocalizedPlans('IN').find((p) => p.id === 'premium')!,
    id: 'lifetime',
    name: 'Lifetime',
    cta: 'Get Lifetime',
    sortOrder: 4,
  },
};

export const DISPLAY_PLANS: PricingPlan[] = getLocalizedPlans('IN');

export function getPlanById(planId: string, countryCode: string = 'IN'): PricingPlan {
  const normalized = (planId || 'pro').toLowerCase().trim();
  const localizedList = getLocalizedPlans(countryCode);

  let targetId = normalized;
  if (normalized === 'lifetime') targetId = 'premium';

  const found = localizedList.find((p) => p.id === targetId);
  if (found) {
    if (normalized === 'lifetime') {
      return { ...found, id: 'lifetime', name: 'Lifetime', cta: 'Get Lifetime' };
    }
    return found;
  }

  return localizedList.find((p) => p.id === 'pro')!;
}

export function isUserPlanActive(userTier: string | null | undefined, targetPlanId: string): boolean {
  if (!userTier) return targetPlanId === 'free';
  const tier = userTier.toLowerCase().trim();
  const target = targetPlanId.toLowerCase().trim();
  if (tier === target) return true;
  if ((tier === 'premium' || tier === 'lifetime') && (target === 'premium' || target === 'lifetime')) return true;
  return false;
}
