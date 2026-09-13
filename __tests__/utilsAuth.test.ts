import { describe, it, expect } from 'vitest';
import {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
  validatePassword,
  validateEmail,
  sanitizeEmail,
} from '@/lib/utils/auth';

describe('Authentication & Token Utilities (lib/utils/auth.ts)', () => {
  describe('Password Hashing & Verification', () => {
    it('hashes passwords and verifies correct plain text against hash', async () => {
      const password = 'SecureP@ssword123';
      const hash = await hashPassword(password);
      expect(hash).not.toBe(password);
      expect(hash.startsWith('$2')).toBe(true);

      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);
    });

    it('rejects incorrect password against hash', async () => {
      const password = 'CorrectP@ssword1';
      const wrongPassword = 'WrongP@ssword1';
      const hash = await hashPassword(password);

      const isValid = await verifyPassword(wrongPassword, hash);
      expect(isValid).toBe(false);
    });
  });

  describe('JWT Token Generation & Verification', () => {
    it('generates a valid JWT token and decodes payload accurately', async () => {
      const userId = 'usr_test_12345';
      const role = 'admin';

      const token = await generateToken(userId, role);
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3);

      const payload = await verifyToken(token);
      expect(payload).not.toBeNull();
      expect(payload?.userId).toBe(userId);
    });

    it('returns null when verifying malformed or invalid tokens', async () => {
      const invalidToken = 'invalid.jwt.token.string';
      const result = await verifyToken(invalidToken);
      expect(result).toBeNull();
    });

    it('returns null for empty token string', async () => {
      const result = await verifyToken('');
      expect(result).toBeNull();
    });
  });

  describe('Password Strength Validation', () => {
    it('approves passwords meeting all criteria', () => {
      const result = validatePassword('ValidP@ssw0rd!');
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('flags password less than 8 characters', () => {
      const result = validatePassword('P@ss1');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must be at least 8 characters long');
    });

    it('flags password missing uppercase letter', () => {
      const result = validatePassword('password123!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
    });

    it('flags password missing lowercase letter', () => {
      const result = validatePassword('PASSWORD123!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one lowercase letter');
    });

    it('flags password missing digit', () => {
      const result = validatePassword('Password!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one number');
    });

    it('flags password missing special character', () => {
      const result = validatePassword('Password123');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one special character (@$!%*?&)');
    });
  });

  describe('Email Formatting & Sanitization', () => {
    it('correctly validates valid email addresses', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('john.doe+test@domain.co.uk')).toBe(true);
    });

    it('rejects invalid email formats', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('user@domain')).toBe(false);
    });

    it('sanitizes emails by converting to lowercase and stripping whitespace', () => {
      expect(sanitizeEmail('  John.Doe@EXAMPLE.Com  ')).toBe('john.doe@example.com');
    });
  });
});
