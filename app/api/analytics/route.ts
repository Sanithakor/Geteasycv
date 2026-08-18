/**
 * GET /api/analytics - Get analytics data
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { protectRoute } from '@/lib/middleware/auth';

export async function GET(req: Request) {
  try {
    console.log('[ANALYTICS] GET - Fetching analytics...');

    // 1. Protect route
    const auth = await protectRoute(req);
    if (!auth) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse query parameters
    const url = new URL(req.url);
    const type = url.searchParams.get('type') || 'user'; // user or admin
    const period = url.searchParams.get('period') || '30d'; // 30d, 90d, 1y

    // 3. Check if user is admin for admin analytics
    if (type === 'admin') {
      const user = await prisma.user.findUnique({
        where: { id: auth.userId },
        select: { role: true },
      });

      if (user?.role !== 'admin') {
        console.log('[ANALYTICS] Non-admin analytics request:', auth.userId);
        return Response.json(
          { error: 'Admin access required' },
          { status: 403 }
        );
      }

      // Get admin analytics
      const analytics = await getAdminAnalytics(period);
      return Response.json({
        success: true,
        type: 'admin',
        period,
        data: analytics,
      });
    }

    // 4. Get user analytics
    const analytics = await getUserAnalytics(auth.userId, period);

    console.log('[ANALYTICS] Analytics fetched for user:', auth.userId);

    return Response.json({
      success: true,
      type: 'user',
      period,
      data: analytics,
    });
  } catch (error) {
    console.error('[ANALYTICS_GET_ERROR]', error);
    return Response.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

// Get user-specific analytics
async function getUserAnalytics(userId: string, period: string) {
  const daysBack = getPeriodDays(period);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - daysBack);

  // Get resume stats
  const resumes = await prisma.resume.findMany({
    where: { userId },
    select: {
      id: true,
      downloads: true,
      views: true,
      createdAt: true,
    },
  });

  // Get activity logs
  const activities = await prisma.activityLog.findMany({
    where: {
      userId,
      createdAt: { gte: startDate },
    },
    select: {
      action: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  // Calculate stats
  const totalResumes = resumes.length;
  const totalDownloads = resumes.reduce((sum: number, r: typeof resumes[number]) => sum + r.downloads, 0);
  const totalViews = resumes.reduce((sum: number, r: typeof resumes[number]) => sum + r.views, 0);

  // Group activities by action
  const activityCounts: Record<string, number> = {};
  activities.forEach((activity: typeof activities[number]) => {
    activityCounts[activity.action] = (activityCounts[activity.action] || 0) + 1;
  });

  return {
    resumes: {
      total: totalResumes,
      downloads: totalDownloads,
      views: totalViews,
      averageDownloads: totalResumes > 0 ? totalDownloads / totalResumes : 0,
      averageViews: totalResumes > 0 ? totalViews / totalResumes : 0,
    },
    activities: {
      total: activities.length,
      byType: activityCounts,
    },
    topResumes: resumes
      .sort((a: { downloads: number }, b: { downloads: number }) => b.downloads - a.downloads)
      .slice(0, 5)
      .map((r: { id: string; downloads: number; views: number }) => ({
        id: r.id,
        downloads: r.downloads,
        views: r.views,
      })),
  };
}

// Get admin analytics
async function getAdminAnalytics(period: string) {
  const daysBack = getPeriodDays(period);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - daysBack);

  // Get user stats
  const users = await prisma.user.count();
  const newUsers = await prisma.user.count({
    where: { createdAt: { gte: startDate } },
  });

  // Get subscription stats
  const activeSubscriptions = await prisma.subscription.count({
    where: { status: 'active' },
  });

  const subscriptionBreakdown = await prisma.subscription.groupBy({
    by: ['plan'],
    _count: true,
  });

  // Get resume stats
  const totalResumes = await prisma.resume.count();
  const newResumes = await prisma.resume.count({
    where: { createdAt: { gte: startDate } },
  });

  const totalDownloads = await prisma.resume.aggregate({
    _sum: { downloads: true },
  });

  const totalViews = await prisma.resume.aggregate({
    _sum: { views: true },
  });

  // Get template stats
  const totalTemplates = await prisma.template.count();
  const topTemplates = await prisma.template.findMany({
    select: {
      id: true,
      name: true,
      downloads: true,
      uses: true,
    },
    orderBy: { downloads: 'desc' },
    take: 5,
  });

  // Get payment stats
  const payments = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { status: 'completed', createdAt: { gte: startDate } },
  });

  return {
    users: {
      total: users,
      new: newUsers,
      active: activeSubscriptions,
      breakdown: subscriptionBreakdown,
    },
    resumes: {
      total: totalResumes,
      new: newResumes,
      downloads: totalDownloads._sum.downloads || 0,
      views: totalViews._sum.views || 0,
    },
    templates: {
      total: totalTemplates,
      topTemplates,
    },
    revenue: {
      total: payments._sum.amount || 0, // Amounts stored directly in INR Rupees
    },
  };
}

// Helper function to get period in days
function getPeriodDays(period: string): number {
  switch (period) {
    case '7d':
      return 7;
    case '30d':
      return 30;
    case '90d':
      return 90;
    case '1y':
      return 365;
    default:
      return 30;
  }
}

