import { prisma, safeDbQuery } from '@/lib/db';

export interface PlanItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingPeriod: string;
  description: string;
  features: string[];
  popular: boolean;
  badge: string | null;
  isActive: boolean;
  maxResumes: number; // 1 for starter/free, -1 for unlimited
  canUseAI: boolean;
  canUsePremiumTemplates: boolean;
  canExportPDF: boolean;
  sortOrder: number;
}

export const DEFAULT_PLANS: PlanItem[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    currency: '₹',
    billingPeriod: 'one-time payment',
    description: 'Perfect for quick single resume creation.',
    features: [
      '1 CV Creation',
      'High-resolution PDF download',
      'Access to core templates',
      'No recurring payment',
    ],
    popular: false,
    badge: null,
    isActive: true,
    maxResumes: 1,
    canUseAI: true,
    canUsePremiumTemplates: false,
    canExportPDF: true,
    sortOrder: 1,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 199,
    currency: '₹',
    billingPeriod: 'month',
    description: 'For active job seekers looking to maximize interviews.',
    features: [
      'Unlimited CVs & Downloads',
      'All premium templates',
      'PDF, PNG, JPG Exports',
      'AI Resume Bullet Rewriter',
      'Cancel anytime',
    ],
    popular: true,
    badge: 'MOST POPULAR',
    isActive: true,
    maxResumes: -1,
    canUseAI: true,
    canUsePremiumTemplates: true,
    canExportPDF: true,
    sortOrder: 2,
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: 999,
    currency: '₹',
    billingPeriod: 'one-time payment',
    description: 'Permanent access for serious career growth.',
    features: [
      'Everything in Pro',
      'Lifetime Unlimited Access',
      'Future Premium Templates',
      'Priority Customer Support',
    ],
    popular: false,
    badge: 'BEST VALUE',
    isActive: true,
    maxResumes: -1,
    canUseAI: true,
    canUsePremiumTemplates: true,
    canExportPDF: true,
    sortOrder: 3,
  },
];

let inMemoryPlans: PlanItem[] = [...DEFAULT_PLANS];

export function getMemoryPlans(): PlanItem[] {
  return inMemoryPlans;
}

export async function fetchAllPlans(): Promise<PlanItem[]> {
  return safeDbQuery(async () => {
    const config = await (prisma as any).systemConfig.findUnique({
      where: { id: 'system_plans' },
    });

    if (config && config.value) {
      try {
        const parsed = JSON.parse(config.value);
        if (Array.isArray(parsed) && parsed.length > 0) {
          inMemoryPlans = parsed;
          return parsed;
        }
      } catch (err) {
        console.warn('[PLANS_PARSE_WARN]', err);
      }
    }

    return inMemoryPlans;
  }, inMemoryPlans);
}

export async function saveAllPlans(plans: PlanItem[]): Promise<boolean> {
  inMemoryPlans = [...plans];
  return safeDbQuery(async () => {
    await (prisma as any).systemConfig.upsert({
      where: { id: 'system_plans' },
      update: {
        value: JSON.stringify(plans),
      },
      create: {
        id: 'system_plans',
        appName: 'GetEasyCV Plans',
        value: JSON.stringify(plans),
      },
    });
    return true;
  }, true);
}
