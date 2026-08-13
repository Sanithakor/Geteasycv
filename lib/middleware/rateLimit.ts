import { NextResponse } from 'next/server';

interface RateLimitStore {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
const store = new Map<string, RateLimitStore>();

// Periodically clean up expired entries every 5 minutes
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      if (now > record.resetTime) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitOptions {
  windowMs?: number; // Time window in milliseconds
  max?: number; // Max requests per window
  keyPrefix?: string; // Prefix to distinguish endpoints
}

export function getClientIP(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }
  return '127.0.0.1';
}

export function checkRateLimit(req: Request, options: RateLimitOptions = {}) {
  const {
    windowMs = 15 * 60 * 1000, // Default 15 minutes
    max = 5, // Default 5 attempts
    keyPrefix = 'global',
  } = options;

  const ip = getClientIP(req);
  const key = `${keyPrefix}:${ip}`;
  const now = Date.now();

  let record = store.get(key);

  if (!record || now > record.resetTime) {
    record = {
      count: 1,
      resetTime: now + windowMs,
    };
    store.set(key, record);
    return {
      success: true,
      limit: max,
      remaining: max - 1,
      resetTime: record.resetTime,
      retryAfter: 0,
    };
  }

  record.count += 1;

  if (record.count > max) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);

    // Log security alert for rate limit violation (omitting sensitive payload)
    console.warn(
      `[SECURITY_ALERT] Rate limit exceeded for IP: ${ip} on route: ${keyPrefix}. Exceeded limit of ${max} requests.`
    );

    return {
      success: false,
      limit: max,
      remaining: 0,
      resetTime: record.resetTime,
      retryAfter,
    };
  }

  return {
    success: true,
    limit: max,
    remaining: max - record.count,
    resetTime: record.resetTime,
    retryAfter: 0,
  };
}

export function createRateLimitResponse(
  retryAfter: number,
  message: string = 'Too many requests. Please try again later.'
) {
  return NextResponse.json(
    { error: message },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'Content-Type': 'application/json',
      },
    }
  );
}
