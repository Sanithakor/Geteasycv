/**
 * Country & Geolocation Utilities for GetEasyCV
 * Handles automatic country detection, browser locale/timezone mapping, HTTP header inspection, and storage persistence.
 */

export interface CountryOption {
  code: string; // ISO 2-letter country code (e.g. IN, US, GB, EU, CA, AU, AE, SG)
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

export const DEFAULT_COUNTRY_CODE = 'IN'; // Safe default when no signal available

export function getCountryOption(code: string): CountryOption {
  const normalized = (code || '').toUpperCase().trim();
  const found = SUPPORTED_COUNTRIES.find((c) => c.code === normalized);
  if (found) return found;
  
  // European country codes mapping to EU zone
  const eurozoneCodes = ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'IE', 'FI', 'PT', 'GR', 'SE', 'DK', 'PL'];
  if (eurozoneCodes.includes(normalized)) {
    return SUPPORTED_COUNTRIES.find((c) => c.code === 'EU')!;
  }

  // Default fallback option
  return SUPPORTED_COUNTRIES.find((c) => c.code === DEFAULT_COUNTRY_CODE) || SUPPORTED_COUNTRIES[0];
}

/**
 * Detect user country code dynamically from browser locale and timezone
 */
export function detectBrowserCountry(): string {
  if (typeof window === 'undefined') {
    return DEFAULT_COUNTRY_CODE;
  }

  try {
    // 1. Check time zone first (most reliable indicator on client)
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (timeZone.includes('Asia/Kolkata') || timeZone.includes('Asia/Calcutta') || timeZone.includes('India')) return 'IN';
    if (timeZone.includes('Europe/London')) return 'GB';
    if (timeZone.includes('Europe/')) return 'EU';
    if (timeZone.includes('Australia/')) return 'AU';
    if (timeZone.includes('America/Toronto') || timeZone.includes('Canada/')) return 'CA';
    if (timeZone.includes('Asia/Dubai')) return 'AE';
    if (timeZone.includes('Asia/Singapore')) return 'SG';
    if (timeZone.includes('America/')) return 'US';

    // 2. Check navigator language tags (e.g., en-IN, en-US, en-GB)
    const nav = typeof navigator !== 'undefined' ? navigator : null;
    if (nav) {
      const lang = nav.language || (nav as any).userLanguage || '';
      if (lang) {
        const parts = lang.split('-');
        if (parts.length > 1) {
          const countryPart = parts[1].toUpperCase();
          const match = SUPPORTED_COUNTRIES.find((c) => c.code === countryPart);
          if (match) return match.code;
        }
        
        const l = parts[0].toLowerCase();
        if (['hi', 'ta', 'te', 'mr', 'bn', 'gu', 'kn', 'ml', 'pa'].includes(l)) return 'IN';
        if (['de', 'fr', 'it', 'es', 'nl', 'pt', 'el', 'fi', 'sv'].includes(l)) return 'EU';
      }
    }
  } catch {}

  return DEFAULT_COUNTRY_CODE;
}

/**
 * Detect user country code from HTTP request headers on server side (Cloudflare / Vercel / Accept-Language)
 */
export function detectRequestCountry(req: Request): string {
  try {
    const cfCountry =
      req.headers.get('cf-ipcountry') ||
      req.headers.get('x-country') ||
      req.headers.get('x-vercel-ip-country') ||
      req.headers.get('x-real-ip-country');

    if (cfCountry && cfCountry !== 'XX' && cfCountry !== 'T1') {
      return getCountryOption(cfCountry).code;
    }

    const acceptLang = req.headers.get('accept-language') || '';
    if (acceptLang) {
      const primary = acceptLang.split(',')[0]?.split(';')[0]?.trim() || '';
      const parts = primary.split('-');
      if (parts.length > 1) {
        const countryPart = parts[1].toUpperCase();
        return getCountryOption(countryPart).code;
      }
      const l = parts[0].toLowerCase();
      if (['hi', 'ta', 'te', 'mr', 'bn', 'gu', 'kn', 'ml', 'pa'].includes(l)) return 'IN';
      if (['de', 'fr', 'it', 'es', 'nl', 'pt', 'el', 'fi', 'sv'].includes(l)) return 'EU';
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
