'use client';

import React from 'react';
import { SUPPORTED_COUNTRIES, CountryOption, getCountryOption } from '@/lib/utils/geo';
import { Globe, ChevronDown } from 'lucide-react';

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (countryCode: string) => void;
  className?: string;
}

export default function CountrySelector({
  selectedCountry,
  onCountryChange,
  className = '',
}: CountrySelectorProps) {
  const currentOption = getCountryOption(selectedCountry);

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center">
        <div className="pointer-events-none absolute left-3.5 flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <span className="text-base leading-none" role="img" aria-label={currentOption.name}>
            {currentOption.flag}
          </span>
          <span className="hidden sm:inline font-extrabold text-slate-900">{currentOption.name}</span>
          <span className="text-slate-500 font-semibold">({currentOption.currency} {currentOption.symbol})</span>
        </div>

        <select
          value={currentOption.code}
          onChange={(e) => onCountryChange(e.target.value)}
          className="h-10 cursor-pointer appearance-none rounded-xl border border-slate-200/90 bg-white pl-10 pr-9 text-xs font-bold text-transparent shadow-2xs transition-all hover:border-slate-300 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 sm:pl-36"
          title="Select Country & Currency"
          aria-label="Select Country & Currency"
        >
          {SUPPORTED_COUNTRIES.map((country: CountryOption) => (
            <option key={country.code} value={country.code} className="text-slate-900 font-bold bg-white">
              {country.flag} {country.name} ({country.currency} {country.symbol})
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-3 text-slate-400">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
