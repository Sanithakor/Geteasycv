import { prisma, safeDbQuery } from '@/lib/db';

export type SystemSettings = {
  appName: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  maintenanceMode: boolean;
  comingSoonMode: boolean;
  registrationOpen: boolean;
  maxUploadSize: number;
  enableAI: boolean;
  enableTemplateStore: boolean;
  enableSocialShare: boolean;
  contactEmail: string;
  companyName: string;
  socialLinks: {
    twitter: string;
    github: string;
    linkedin: string;
  };
};

export const DEFAULT_SYSTEM_SETTINGS: SystemSettings = {
  appName: 'GetEasyCV',
  logo: '/logo.svg',
  favicon: '/favicon.ico',
  primaryColor: '#FF570F',
  maintenanceMode: false,
  comingSoonMode: true,
  registrationOpen: true,
  maxUploadSize: 10485760,
  enableAI: true,
  enableTemplateStore: true,
  enableSocialShare: true,
  contactEmail: 'support@geteasycv.com',
  companyName: 'GetEasyCV Inc.',
  socialLinks: {
    twitter: 'https://twitter.com/geteasycv',
    github: 'https://github.com/geteasycv',
    linkedin: 'https://linkedin.com/company/geteasycv',
  },
};

/**
 * Safely fetches system configuration with fallback for static page generation and offline database states.
 */
export async function getSystemSettings(): Promise<SystemSettings> {
  return safeDbQuery(async () => {
    const config = await prisma.systemConfig.findUnique({
      where: { id: 'system' },
    });

    if (!config) return DEFAULT_SYSTEM_SETTINGS;

    return {
      ...DEFAULT_SYSTEM_SETTINGS,
      ...config,
      // Prisma schema fields are nullable — fall back to defaults
      logo: config.logo ?? DEFAULT_SYSTEM_SETTINGS.logo,
      favicon: config.favicon ?? DEFAULT_SYSTEM_SETTINGS.favicon,
    } as SystemSettings;
  }, DEFAULT_SYSTEM_SETTINGS);
}
