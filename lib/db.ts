import { PrismaClient } from '@prisma/client';

/**
 * Prisma Database Client
 * Singleton pattern to prevent multiple instances in development
 */

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Helper to check if execution is during static build phase (e.g. `next build`)
 */
export const isBuildPhase = (): boolean => {
  return (
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.IS_STATIC_BUILD === 'true' ||
    !process.env.DATABASE_URL
  );
};

/**
 * Executes a database query safely with fallback.
 * Prevents build-time failures and noisy console stacktraces when database is offline/unreachable.
 * 
 * @param queryFn Async database query function
 * @param fallback Default fallback value if query fails or DB is offline
 */
export async function safeDbQuery<T>(queryFn: () => Promise<T>, fallback: T): Promise<T> {
  if (isBuildPhase()) {
    try {
      const result = await queryFn();
      return result ?? fallback;
    } catch {
      return fallback;
    }
  }

  try {
    const result = await queryFn();
    return result ?? fallback;
  } catch {
    // Gracefully handle offline database states without printing console errors
    return fallback;
  }
}

export default prisma;
