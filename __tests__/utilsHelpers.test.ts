import { describe, it, expect } from 'vitest';
import {
  generateSlug,
  truncateText,
  capitalizeFirst,
  toTitleCase,
  formatCurrency,
  formatFileSize,
  formatDate,
  formatPhoneNumber,
  isValidEmail,
  isValidUrl,
  isValidPassword,
  chunkArray,
  removeDuplicates,
  groupBy,
  pick,
  omit,
  deepMerge,
  getErrorMessage,
  cn,
} from '@/lib/utils/helpers';

describe('Utility Helper Functions (lib/utils/helpers.ts)', () => {
  describe('String & Slug Utilities', () => {
    it('generates clean URL slugs from arbitrary strings', () => {
      expect(generateSlug('Senior Full-Stack Engineer & Team Lead!')).toBe('senior-full-stack-engineer-team-lead');
      expect(generateSlug('  React JS  19  ')).toBe('react-js-19');
      expect(generateSlug('Special @#$% Characters')).toBe('special-characters');
    });

    it('truncates text with ellipsis when exceeding target length', () => {
      const text = 'This is a long summary statement for testing text truncation.';
      expect(truncateText(text, 20)).toBe('This is a long summa...');
      expect(truncateText('Short', 20)).toBe('Short');
    });

    it('capitalizes first letter of string', () => {
      expect(capitalizeFirst('developer')).toBe('Developer');
      expect(capitalizeFirst('')).toBe('');
    });

    it('converts string to title case', () => {
      expect(toTitleCase('senior software engineer')).toBe('Senior Software Engineer');
    });
  });

  describe('Formatting Utilities', () => {
    it('formats currency correctly for INR and foreign currencies', () => {
      expect(formatCurrency(499, 'INR')).toBe('₹499');
      expect(formatCurrency(19, 'USD')).toContain('19.00');
    });

    it('formats file sizes in human-readable strings', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1048576)).toBe('1 MB');
      expect(formatFileSize(5242880)).toBe('5 MB');
    });

    it('formats phone numbers properly', () => {
      expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890');
      expect(formatPhoneNumber('invalid')).toBe('invalid');
    });
  });

  describe('Validation Utilities', () => {
    it('validates email addresses', () => {
      expect(isValidEmail('test@geteasycv.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
    });

    it('validates URLs accurately', () => {
      expect(isValidUrl('https://geteasycv.com')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
      expect(isValidUrl('not-a-url')).toBe(false);
    });

    it('validates password strength rules', () => {
      expect(isValidPassword('Str0ngP@ssword').valid).toBe(true);
      expect(isValidPassword('weak').valid).toBe(false);
    });
  });

  describe('Array & Object Manipulation Utilities', () => {
    it('chunks array into smaller arrays of specified size', () => {
      const input = [1, 2, 3, 4, 5, 6, 7];
      const chunks = chunkArray(input, 3);
      expect(chunks.length).toBe(3);
      expect(chunks[0]).toEqual([1, 2, 3]);
      expect(chunks[1]).toEqual([4, 5, 6]);
      expect(chunks[2]).toEqual([7]);
    });

    it('removes duplicate elements from array', () => {
      expect(removeDuplicates(['a', 'b', 'a', 'c', 'b'])).toEqual(['a', 'b', 'c']);
    });

    it('groups array of objects by key', () => {
      const items = [
        { category: 'tech', name: 'React' },
        { category: 'tech', name: 'Node' },
        { category: 'design', name: 'Figma' },
      ];
      const grouped = groupBy(items, 'category');
      expect(grouped.tech.length).toBe(2);
      expect(grouped.design.length).toBe(1);
    });

    it('picks specified keys from an object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    it('omits specified keys from an object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 });
    });

    it('performs deep merge of nested objects', () => {
      const target = { a: 1, nested: { x: 10, y: 20 } };
      const source = { nested: { y: 99, z: 30 } };
      const merged = deepMerge(target, source as any);
      expect(merged).toEqual({ a: 1, nested: { x: 10, y: 99, z: 30 } });
    });
  });

  describe('Class Name & Error Utilities', () => {
    it('combines truthy class names cleanly', () => {
      expect(cn('btn', true && 'btn-primary', false && 'hidden', 'px-4')).toBe('btn btn-primary px-4');
    });

    it('extracts error messages safely from various error structures', () => {
      expect(getErrorMessage(new Error('Network failure'))).toBe('Network failure');
      expect(getErrorMessage('Raw error string')).toBe('Raw error string');
      expect(getErrorMessage({ message: 'Custom object error' })).toBe('Custom object error');
      expect(getErrorMessage(null)).toBe('An unknown error occurred');
    });
  });
});
