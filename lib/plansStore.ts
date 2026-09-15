import { prisma, safeDbQuery } from '@/lib/db';
import { PRICING_PLANS, PricingPlan, getLocalizedPlans } from '@/lib/config/pricing';

export interface PlanItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  symbol?: string;
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
  canExportImages?: boolean;
  sortOrder: number;
}

function mapPricingPlanToPlanItem(p: PricingPlan): PlanItem {
  return {
    id: p.id,
    name: p.name,
    price: p.rawPrice,
    currency: p.currency,
    symbol: p.symbol,
    billingPeriod: p.billingPeriod,
    description: p.description,
    features: p.features,
    popular: Boolean(p.popular),
    badge: p.badge || null,
    isActive: p.isActive,
    maxResumes: p.maxResumes,
    canUseAI: p.canUseAI,
    canUsePremiumTemplates: p.canUsePremiumTemplates,
    canExportPDF: p.canExportPDF,
    canExportImages: p.canExportImages,
    sortOrder: p.sortOrder,
  };
}

export const DEFAULT_PLANS: PlanItem[] = [
  mapPricingPlanToPlanItem(PRICING_PLANS.free),
  mapPricingPlanToPlanItem(PRICING_PLANS.starter),
  mapPricingPlanToPlanItem(PRICING_PLANS.pro),
  mapPricingPlanToPlanItem(PRICING_PLANS.premium),
];

let inMemoryPlans: PlanItem[] = [...DEFAULT_PLANS];

export function getMemoryPlans(): PlanItem[] {
  return inMemoryPlans;
}

export async function fetchAllPlans(countryCode: string = 'IN'): Promise<PlanItem[]> {
  const localized = getLocalizedPlans(countryCode).map(mapPricingPlanToPlanItem);

  return safeDbQuery(async () => {
    const config = await (prisma as any).systemConfig.findUnique({
      where: { id: `system_plans_${countryCode.toUpperCase()}` },
    });

    if (config && config.value) {
      try {
        const parsed = JSON.parse(config.value);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (err) {
        console.warn('[PLANS_PARSE_WARN]', err);
      }
    }

    return localized;
  }, localized);
}

export async function saveAllPlans(plans: PlanItem[], countryCode: string = 'IN'): Promise<boolean> {
  inMemoryPlans = [...plans];
  return safeDbQuery(async () => {
    await (prisma as any).systemConfig.upsert({
      where: { id: `system_plans_${countryCode.toUpperCase()}` },
      update: {
        value: JSON.stringify(plans),
      },
      create: {
        id: `system_plans_${countryCode.toUpperCase()}`,
        appName: `GetEasyCV Plans ${countryCode.toUpperCase()}`,
        value: JSON.stringify(plans),
      },
    });
    return true;
  }, true);
}
