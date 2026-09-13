import { describe, it, expect } from 'vitest';
import {
  LoginSchema,
  RegisterSchema,
  PersonalInfoSchema,
  ExportSchema,
  SubscribeSchema,
  ApplyCouponSchema,
  CreateResumeSchema,
} from '@/lib/validation/schemas';

describe('Zod Input Validation Schemas (lib/validation/schemas.ts)', () => {
  describe('LoginSchema', () => {
    it('validates correct login credentials', () => {
      const result = LoginSchema.safeParse({
        email: 'user@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid email formats', () => {
      const result = LoginSchema.safeParse({
        email: 'invalid-email',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('rejects password shorter than 6 characters', () => {
      const result = LoginSchema.safeParse({
        email: 'user@example.com',
        password: '123',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('RegisterSchema', () => {
    it('validates valid user registration payload', () => {
      const result = RegisterSchema.safeParse({
        email: 'newuser@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        name: 'Jane Doe',
        terms: true,
      });
      expect(result.success).toBe(true);
    });

    it('fails validation when passwords do not match', () => {
      const result = RegisterSchema.safeParse({
        email: 'newuser@example.com',
        password: 'Password123!',
        confirmPassword: 'DifferentPassword!',
        name: 'Jane Doe',
        terms: true,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Passwords do not match');
      }
    });

    it('fails validation when terms are unaccepted', () => {
      const result = RegisterSchema.safeParse({
        email: 'newuser@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        name: 'Jane Doe',
        terms: false,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('PersonalInfoSchema', () => {
    it('validates complete personal info payload', () => {
      const result = PersonalInfoSchema.safeParse({
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        phone: '1234567890',
        location: 'New York, NY',
        website: 'https://johnsmith.dev',
        linkedin: 'https://linkedin.com/in/johnsmith',
        github: 'https://github.com/johnsmith',
      });
      expect(result.success).toBe(true);
    });

    it('rejects missing mandatory fields (e.g. empty first name)', () => {
      const result = PersonalInfoSchema.safeParse({
        firstName: '',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        phone: '1234567890',
        location: 'New York, NY',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('ExportSchema & ApplyCouponSchema', () => {
    it('validates valid export formats (pdf, docx, png, json)', () => {
      expect(ExportSchema.safeParse({ format: 'pdf' }).success).toBe(true);
      expect(ExportSchema.safeParse({ format: 'docx' }).success).toBe(true);
      expect(ExportSchema.safeParse({ format: 'invalid' }).success).toBe(false);
    });

    it('validates non-empty coupon codes', () => {
      expect(ApplyCouponSchema.safeParse({ code: 'PROMO2026' }).success).toBe(true);
      expect(ApplyCouponSchema.safeParse({ code: '' }).success).toBe(false);
    });
  });

  describe('CreateResumeSchema', () => {
    it('validates valid create resume payload', () => {
      const result = CreateResumeSchema.safeParse({
        title: 'Senior Software Engineer Resume',
        templateId: 'modern-blue',
      });
      expect(result.success).toBe(true);
    });

    it('rejects missing title or templateId', () => {
      expect(CreateResumeSchema.safeParse({ title: '' }).success).toBe(false);
    });
  });
});
