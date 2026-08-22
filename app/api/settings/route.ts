import { NextResponse } from 'next/server';
import { prisma, safeDbQuery } from '@/lib/db';
import { getAuthFromRequest, requireAdmin } from '@/lib/middleware/auth';
import { getSystemSettings, DEFAULT_SYSTEM_SETTINGS } from '@/lib/settings';

export async function GET() {
  try {
    const settings = await getSystemSettings();
    return NextResponse.json({ success: true, data: settings });
  } catch {
    return NextResponse.json({ success: true, data: DEFAULT_SYSTEM_SETTINGS });
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

    const updated = await safeDbQuery(async () => {
      const result = await prisma.systemConfig.upsert({
        where: { id: 'system' },
        update: {
          ...(body.appName && { appName: body.appName }),
          ...(body.logo && { logo: body.logo }),
          ...(body.primaryColor && { primaryColor: body.primaryColor }),
          ...(body.maintenanceMode !== undefined && { maintenanceMode: body.maintenanceMode }),
          ...(body.comingSoonMode !== undefined && { comingSoonMode: body.comingSoonMode }),
          ...(body.registrationOpen !== undefined && { registrationOpen: body.registrationOpen }),
          ...(body.enableAI !== undefined && { enableAI: body.enableAI }),
          ...(body.enableTemplateStore !== undefined && { enableTemplateStore: body.enableTemplateStore }),
          ...(body.enableSocialShare !== undefined && { enableSocialShare: body.enableSocialShare }),
        },
        create: {
          id: 'system',
          appName: body.appName || DEFAULT_SYSTEM_SETTINGS.appName,
          logo: body.logo || DEFAULT_SYSTEM_SETTINGS.logo,
          primaryColor: body.primaryColor || DEFAULT_SYSTEM_SETTINGS.primaryColor,
          maintenanceMode: body.maintenanceMode ?? false,
          comingSoonMode: body.comingSoonMode ?? true,
          registrationOpen: body.registrationOpen ?? true,
          enableAI: body.enableAI ?? true,
          enableTemplateStore: body.enableTemplateStore ?? true,
          enableSocialShare: body.enableSocialShare ?? true,
        },
      });
      return result;
    }, { ...DEFAULT_SYSTEM_SETTINGS, ...body });

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
