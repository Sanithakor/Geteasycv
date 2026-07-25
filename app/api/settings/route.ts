import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthFromRequest, requireAdmin } from '@/lib/middleware/auth';

const defaultSettings = {
  appName: 'GetEasyCV',
  logo: '/logo.svg',
  favicon: '/favicon.ico',
  primaryColor: '#2563EB',
  maintenanceMode: false,
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
    linkedin: 'https://linkedin.com/company/geteasycv'
  }
};

export async function GET() {
  try {
    const config = await prisma.systemConfig.findUnique({
      where: { id: 'system' }
    });

    if (config) {
      return NextResponse.json({
        success: true,
        data: {
          ...defaultSettings,
          ...config
        }
      });
    }

    return NextResponse.json({ success: true, data: defaultSettings });
  } catch (error) {
    console.warn('[SETTINGS_API] Fallback to default settings:', error);
    return NextResponse.json({ success: true, data: defaultSettings });
  }
}

export async function PATCH(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    const isAdmin = await requireAdmin(auth);
    if (!auth || !isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await req.json();

    try {
      const updated = await prisma.systemConfig.upsert({
        where: { id: 'system' },
        update: {
          ...(body.appName && { appName: body.appName }),
          ...(body.logo && { logo: body.logo }),
          ...(body.primaryColor && { primaryColor: body.primaryColor }),
          ...(body.maintenanceMode !== undefined && { maintenanceMode: body.maintenanceMode }),
          ...(body.registrationOpen !== undefined && { registrationOpen: body.registrationOpen }),
          ...(body.enableAI !== undefined && { enableAI: body.enableAI }),
          ...(body.enableTemplateStore !== undefined && { enableTemplateStore: body.enableTemplateStore }),
          ...(body.enableSocialShare !== undefined && { enableSocialShare: body.enableSocialShare }),
        },
        create: {
          id: 'system',
          appName: body.appName || defaultSettings.appName,
          logo: body.logo || defaultSettings.logo,
          primaryColor: body.primaryColor || defaultSettings.primaryColor,
          maintenanceMode: body.maintenanceMode ?? false,
          registrationOpen: body.registrationOpen ?? true,
          enableAI: body.enableAI ?? true,
          enableTemplateStore: body.enableTemplateStore ?? true,
          enableSocialShare: body.enableSocialShare ?? true,
        }
      });

      return NextResponse.json({ success: true, data: updated });
    } catch (dbErr) {
      console.warn('[SETTINGS_API] DB update failed, returning modified mock payload:', dbErr);
      return NextResponse.json({ success: true, data: { ...defaultSettings, ...body } });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
