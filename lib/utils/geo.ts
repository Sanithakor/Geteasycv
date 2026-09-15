/**
 * Country & Geolocation Utilities for GetEasyCV
 * Handles country detection, browser locale mapping, and storage persistence.
 */

export interface CountryOption {
  code: string; // ISO 2-letter country code (e.g. IN, US, GB)
  name: string;
  flag: string;
  currency: string;
  symbol: string;
}

export const SUPPORTED_COUNTRIES: CountryOption[] = [
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹' },
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', symbol: '£' },
  { code: 'EU', name: 'Eurozone / Europe', flag: '🇪🇺', currency: 'EUR', symbol: '€' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', symbol: 'C$' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', symbol: 'A$' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED', symbol: 'AED' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', symbol: 'S$' },
];

export const DEFAULT_COUNTRY_CODE = 'US';

export function getCountryOption(code: string): CountryOption {
  const normalized = (code || '').toUpperCase().trim();
  const found = SUPPORTED_COUNTRIES.find((c) => c.code === normalized);
  if (found) return found;
  
  // European country codes fallback to EU
  const eurozoneCodes = ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'IE', 'FI', 'PT', 'GR'];
  if (eurozoneCodes.includes(normalized)) {
    return SUPPORTED_COUNTRIES.find((c) => c.code === 'EU')!;
  }

  // Final fallback to US
  return SUPPORTED_COUNTRIES.find((c) => c.code === 'US')!;
}

/**
 * Detect user country code from browser locale
 */
export function detectBrowserCountry(): string {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return DEFAULT_COUNTRY_CODE;
  }

  try {
    const lang = navigator.language || (navigator as any).userLanguage || '';
    if (lang) {
      const parts = lang.split('-');
      if (parts.length > 1) {
        const countryPart = parts[1].toUpperCase();
        return getCountryOption(countryPart).code;
      }
      
      // Handle language-only codes
      const l = parts[0].toLowerCase();
      if (l === 'hi' || l === 'ta' || l === 'te' || l === 'mr' || l === 'bn') return 'IN';
      if (l === 'de' || l === 'fr' || l === 'it' || l === 'es' || l === 'nl') return 'EU';
      if (l === 'en') {
        // Test time zone if available
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        if (timeZone.includes('Asia/Kolkata') || timeZone.includes('India')) return 'IN';
        if (timeZone.includes('Europe/London')) return 'GB';
        if (timeZone.includes('Australia/')) return 'AU';
        if (timeZone.includes('America/Toronto') || timeZone.includes('Canada/')) return 'CA';
      }
    }
  } catch {}

  return DEFAULT_COUNTRY_CODE;
}

/**
 * Retrieve user's selected country code with storage persistence
 */
export function getSavedCountry(): string {
  if (typeof window === 'undefined') return DEFAULT_COUNTRY_CODE;
  try {
    const saved = localStorage.getItem('geteasycv_user_country');
    if (saved) {
      return getCountryOption(saved).code;
    }
  } catch {}
  return detectBrowserCountry();
}

/**
 * Save user's selected country code
 */
export function saveSelectedCountry(countryCode: string): void {
  if (typeof window === 'undefined') return;
  try {
    const valid = getCountryOption(countryCode).code;
    localStorage.setItem('geteasycv_user_country', valid);
  } catch {}
}
