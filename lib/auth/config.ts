/**
 * Authentication Configuration
 */

export const authConfig = {
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-key-change-in-production',
    accessTokenExpiry: '15m',
    refreshTokenExpiry: '7d',
  },

  // OAuth - Google
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/oauth/google/callback`,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/oauth/github/callback`,
    },
  },

  // Password requirements
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  },

  // Session
  session: {
    cookieName: 'session',
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  },

  // Rate limiting
  rateLimit: {
    login: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxAttempts: 5,
    },
    register: {
      windowMs: 60 * 60 * 1000, // 1 hour
      maxAttempts: 3,
    },
  },
};

export const allowedRoles = {
  admin: ['SUPER_ADMIN', 'ADMIN'],
  manager: ['SUPER_ADMIN', 'ADMIN', 'MANAGER'],
  support: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'SUPPORT'],
  user: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'SUPPORT', 'USER'],
};

export const publicRoutes = [
  '/',
  '/pricing',
  '/blog',
  '/docs',
  '/privacy',
  '/terms',
  '/contact',
];

export const authRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
];

export const apiAuthRoutes = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/logout',
  '/api/auth/refresh',
  '/api/auth/oauth',
];
