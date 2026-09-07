import { describe, it, expect } from 'vitest';
import {
  getUserEntitlements,
  canCreateCV,
  canDownloadCV,
  canExportFormat,
  canUseAI,
  canUsePremiumTemplate,
} from '@/lib/entitlements';

describe('Entitlements & Access Control Engine', () => {
  describe('getUserEntitlements', () => {
    it('correctly sets defaults for free tier', () => {
      const ent = getUserEntitlements({ tier: 'free' });
      expect(ent.plan).toBe('free');
      expect(ent.isPaid).toBe(false);
      expect(ent.maxResumes).toBe(1);
      expect(ent.canUseAI).toBe(false);
      expect(ent.canUsePremiumTemplates).toBe(false);
      expect(ent.canExportPDF).toBe(true);
      expect(ent.canExportImages).toBe(false);
    });

    it('identifies active Starter plan correctly', () => {
      const ent = getUserEntitlements({ tier: 'starter', status: 'active' });
      expect(ent.plan).toBe('starter');
      expect(ent.isStarter).toBe(true);
      expect(ent.isPaid).toBe(true);
      expect(ent.maxResumes).toBe(1);
      expect(ent.canUseAI).toBe(false);
      expect(ent.canExportPDF).toBe(true);
    });

    it('identifies active Pro plan correctly with unlimited access', () => {
      const ent = getUserEntitlements({ subscriptionTier: 'pro', subscriptionStatus: 'active' });
      expect(ent.plan).toBe('pro');
      expect(ent.isPro).toBe(true);
      expect(ent.isPaid).toBe(true);
      expect(ent.maxResumes).toBe(-1);
      expect(ent.canUseAI).toBe(true);
      expect(ent.canUsePremiumTemplates).toBe(true);
      expect(ent.canExportImages).toBe(true);
    });
  });

  describe('canCreateCV', () => {
    it('allows creation when free user has 0 resumes', () => {
      expect(canCreateCV({ tier: 'free' }, 0).allowed).toBe(true);
    });

    it('blocks creation when free user already has 1 resume', () => {
      const result = canCreateCV({ tier: 'free' }, 1);
      expect(result.allowed).toBe(false);
      expect(result.reason).contains('Free plan includes 1 CV');
    });

    it('allows unlimited creation for Pro users', () => {
      expect(canCreateCV({ tier: 'pro', status: 'active' }, 50).allowed).toBe(true);
    });
  });

  describe('canDownloadCV', () => {
    it('allows initial download for free user', () => {
      expect(canDownloadCV({ ytier: 'free' }, 0).allowed).toBe(true);
    });

    it('blocks free user who has already downloaded 1 time', () => {
      const result = canDownloadCV({ ytier: 'free' }, 1);
      expect(result.allowed).toBe(false);
      expect(result.redirectUrl).toBe('/pricing?reason=download_limit');
    });

    it('allows unlimited downloads for Pro users', () => {
      expect(canDownloadCV({ tier: 'pro', status: 'active' }, 50).allowed).toBe(true);
    });
  });

  describe('canExportFormat', () => {
    it('allows PDF export for all tiers', () => {
      expect(canExportFormat({ tier: 'free' }, 'pdf').allowed).toBe(true);
      expect(canExportFormat({ tier: 'pro', status: 'active' }, 'pdf').allowed).toBe(true);
    });

    it('gates PNG and JPG exports to Pro/Lifetime', () => {
      expect(canExportFormat({ tier: 'free' }, 'png').allowed).toBe(false);
      expect(canExportFormat({ tier: 'pro', status: 'active' }, 'png').allowed).toBe(true);
    });
  });

  describe('canUseAI and canUsePremiumTemplate', () => {
    it('restricts AI and premium templates to Pro', () => {
      expect(canUseAI({ tier: 'free' }).allowed).toBe(false);
      expect(canUseAI({ tier: 'pro', status: 'active' }).allowed).toBe(true);
      expect(canUsePremiumTemplate({ tier: 'free' })).toBe(false);
      expect(canUsePremiumTemplate({ tier: 'pro', status: 'active' })).toBe(true);
    });
  });
});
