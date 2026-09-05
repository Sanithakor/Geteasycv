import { PrismaClient } from '@prisma/client';

/**
 * Prisma Database Client with AI Studio resilient mock fallback
 */
const globalForPrisma = global as unknown as { prisma: any };

const createNoOpHandler = () => {
  return {
    findMany: async () => [],
    findFirst: async () => null,
    findUnique: async () => null,
    findRaw: async () => [],
    create: async (d: any) => d?.data ?? {},
    createMany: async (d: any) => ({ count: Array.isArray(d?.data) ? d.data.length : 0 }),
    update: async (d: any) => d?.data ?? {},
    updateMany: async (d: any) => ({ count: 0 }),
    upsert: async (d: any) => d?.create ?? d?.update ?? {},
    delete: async () => ({}),
    deleteMany: async () => ({ count: 0 }),
    count: async () => 0,
    aggregate: async () => ({ _count: 0, _sum: {}, _avg: {}, _min: {}, _max: {} }),
    groupBy: async () => [],
  };
};

const createMockPrisma = () => {
  const noOp = createNoOpHandler();
  return new Proxy({}, {
    get: (_, prop) => {
      if (prop === '$transaction') {
        return async (arg: any) => {
          if (Array.isArray(arg)) {
            return Promise.all(arg);
          }
          if (typeof arg === 'function') {
            return arg(createMockPrisma());
          }
          return [];
        };
      }
      if (prop === '$connect' || prop === '$disconnect') {
        return async () => {};
      }
      if (prop === '$queryRaw' || prop === '$executeRaw') {
        return async () => [];
      }
      return new Proxy(noOp, {
        get: (target: any, methodProp: string) => {
          if (methodProp in target) {
            return target[methodProp];
          }
          return async () => null;
        }
      });
    },
  });
};

let rawPrisma: any;

function getResolvedDatabaseUrl(): string | undefined {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('host:5432')) {
    return process.env.DATABASE_URL;
  }
  if (typeof window === 'undefined') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require('fs');
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const path = require('path');
      const envPath = path.resolve(process.cwd(), '.env');
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(/^DATABASE_URL=["']?([^"'\r\n]+)["']?/m);
        if (match && match[1]) {
          process.env.DATABASE_URL = match[1];
          return match[1];
        }
      }
    } catch {
      // Fallback
    }
  }
  return process.env.DATABASE_URL;
}

const resolvedDbUrl = getResolvedDatabaseUrl();

try {
  rawPrisma =
    globalForPrisma.prisma ||
    new PrismaClient({
      datasources: resolvedDbUrl ? { db: { url: resolvedDbUrl } } : undefined,
      log:
        process.env.NODE_ENV === 'development'
          ? ['query', 'error', 'warn']
          : ['error'],
    });
} catch {
  console.warn('[AI Studio] Database not connected — using mock');
  rawPrisma = createMockPrisma();
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = rawPrisma;
}

// Resilient wrapper that intercepts failed DB connection calls at runtime
export const prisma: PrismaClient = new Proxy(rawPrisma, {
  get: (target: any, prop: string | symbol) => {
    const orig = target[prop];
    if (typeof prop === 'symbol' || prop === 'then') {
      return orig;
    }
    if (prop === '$transaction') {
      return async (arg: any) => {
        try {
          return await target.$transaction(arg);
        } catch (err: any) {
          console.warn('[AI Studio] Database transaction fallback triggered:', err?.message || err);
          if (Array.isArray(arg)) {
            return Promise.all(arg.map(() => ({})));
          }
          return [];
        }
      };
    }
    if (typeof orig === 'function') {
      return async (...args: any[]) => {
        try {
          return await orig.apply(target, args);
        } catch (err: any) {
          console.warn(`[AI Studio] Database call ${String(prop)} fallback triggered:`, err?.message || err);
          return null;
        }
      };
    }
    if (orig && typeof orig === 'object') {
      const mockModel = createNoOpHandler();
      return new Proxy(orig, {
        get: (modelTarget: any, method: string) => {
          const modelFn = modelTarget[method];
          if (typeof modelFn !== 'function') {
            return modelFn;
          }
          return async (...args: any[]) => {
            if (!process.env.DATABASE_URL) {
              const fallbackFn = (mockModel as any)[method];
              return fallbackFn ? fallbackFn(...args) : null;
            }
            try {
              return await modelFn.apply(modelTarget, args);
            } catch (err: any) {
              console.warn(`[AI Studio] DB query error on ${String(prop)}.${method} — falling back gracefully:`, err?.message || err);
              const fallbackFn = (mockModel as any)[method];
              return fallbackFn ? fallbackFn(...args) : null;
            }
          };
        }
      });
    }
    return orig;
  }
}) as PrismaClient;

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
 */
export async function safeDbQuery<T>(queryFn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    const result = await queryFn();
    return result ?? fallback;
  } catch {
    return fallback;
  }
}

export default prisma;
