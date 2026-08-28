'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Sparkles,
  Search,
  HelpCircle,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { FAQItem, ALL_FAQS, FAQ_CATEGORIES } from '@/data/faqs';

export interface FAQProps {
  /** List of FAQ items. Defaults to ALL_FAQS if not provided. */
  items?: FAQItem[];
  /** Badge pill text */
  badge?: string;
  /** Section title */
  title?: string;
  /** Colored highlight text in title */
  highlightText?: string;
  /** Suffix text after highlight */
  titleSuffix?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Display live search bar filter */
  showSearch?: boolean;
  /** Display category filter pills */
  showCategories?: boolean;
  /** Custom category list to display (optional) */
  categories?: readonly string[];
  /** Initial category selected */
  defaultCategory?: string;
  /** Show bottom Contact Support CTA banner */
  showContactCta?: boolean;
  /** Layout variant: 'section' wraps in standard section container; 'embedded' is plain container */
  variant?: 'section' | 'embedded';
  /** Background color override (e.g. '#F8F8F6' or '#FFFFFF') */
  bgStyle?: string;
  /** Additional container classes */
  className?: string;
  /** Allow multiple items to be expanded simultaneously (default: false for single accordion) */
  allowMultiple?: boolean;
}

export function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const contentId = `faq-content-${index}`;
  const buttonId = `faq-btn-${index}`;

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden text-left bg-white ${
        isOpen
          ? 'border-slate-300/90 shadow-sm ring-1 ring-black/[0.04]'
          : 'border-slate-200/80 hover:border-slate-300 hover:shadow-2xs'
      }`}
    >
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors select-none focus:outline-none"
      >
        <span
          className={`text-sm sm:text-base font-bold transition-colors pr-2 leading-snug ${
            isOpen ? 'text-[#0F0F0F]' : 'text-slate-800 hover:text-slate-900'
          }`}
        >
          {item.question}
        </span>

        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen
              ? 'text-white rotate-180 shadow-2xs'
              : 'bg-slate-100 text-[#111111] hover:bg-slate-200/70'
          }`}
          style={isOpen ? { background: '#FF5F5F' } : undefined}
        >
          <ChevronDown className="w-4 h-4 transition-transform duration-300" />
        </div>
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#555555] leading-relaxed font-normal border-t border-slate-100/80">
            <p className="pt-2">{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({
  items = ALL_FAQS,
  badge = 'Got Questions?',
  title = 'Frequently Asked',
  highlightText = 'Questions',
  titleSuffix = '',
  subtitle = 'Find quick, clear answers to common questions about GetEasyCV, our templates, ATS screening, and AI writer.',
  showSearch = false,
  showCategories = false,
  categories = FAQ_CATEGORIES,
  defaultCategory = 'All',
  showContactCta = false,
  variant = 'section',
  bgStyle = '#F8F8F6',
  className = '',
  allowMultiple = false,
}: FAQProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  const toggleIndex = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCategory =
        !showCategories ||
        activeCategory === 'All' ||
        item.category?.toLowerCase() === activeCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [items, showCategories, activeCategory, searchQuery]);

  const content = (
    <div className={`max-w-4xl mx-auto space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#111111]/10 bg-white text-[#111111] text-xs font-bold uppercase tracking-wider shadow-2xs mb-1">
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#FF5F5F' }} />
            <span>{badge}</span>
          </div>
        )}

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight">
          {title} {highlightText && <span style={{ color: '#FF5F5F' }}>{highlightText}</span>} {titleSuffix}
        </h2>

        {subtitle && (
          <p className="text-sm sm:text-base lg:text-lg text-[#555555] leading-relaxed font-normal max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Optional Search Bar */}
      {showSearch && (
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium text-[#111111] placeholder:text-slate-400 focus:border-[#FF5F5F] focus:ring-2 focus:ring-[#FF5F5F]/15 outline-none transition-all shadow-2xs"
          />
        </div>
      )}

      {/* Optional Category Pills */}
      {showCategories && categories && categories.length > 0 && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#0F0F0F] text-white shadow-sm'
                    : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Accordion List */}
      <div className="space-y-3.5 pt-2">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200/80 shadow-2xs space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No matching questions found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              Try searching with different terms or select &ldquo;All&rdquo; categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F0F0F] text-white text-xs font-bold hover:bg-[#262626] transition-all cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          filteredItems.map((item, idx) => (
            <FAQAccordionItem
              key={item.id || `${item.question}-${idx}`}
              item={item}
              index={idx}
              isOpen={openIndices.includes(idx)}
              onToggle={() => toggleIndex(idx)}
            />
          ))
        )}
      </div>

        {/* Optional Contact CTA Banner */}
        {showContactCta && (
          <div className="mt-12 rounded-3xl border border-[#111111]/[0.08] bg-white p-8 sm:p-10 text-center shadow-2xs max-w-2xl mx-auto space-y-4">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto shadow-2xs"
              style={{ background: '#C9AFE8' }}
            >
              <MessageSquare className="w-5 h-5 text-[#111111]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">
                Still Have Questions?
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] max-w-md mx-auto leading-relaxed font-normal">
                Can&apos;t find the answer you&apos;re looking for? Our friendly support team is always here to assist you.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111111] hover:bg-[#262626] hover:scale-105 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>Contact Support</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
    </div>
  );

  if (variant === 'embedded') {
    return content;
  }

  return (
    <section
      className="py-16 sm:py-24 font-sans"
      style={{
        background: bgStyle,
        borderTop: '1px solid rgba(15,15,15,0.06)',
        borderBottom: '1px solid rgba(15,15,15,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {content}
      </div>
    </section>
  );
}
