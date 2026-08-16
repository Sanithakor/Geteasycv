'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ChevronUp, ChevronDown, Layers } from 'lucide-react';

interface A4MultiPageContainerProps {
  children: React.ReactNode;
  scale?: number;
  onPageCountChange?: (pageCount: number) => void;
  density?: 'compact' | 'standard' | 'large';
}

export default function A4MultiPageContainer({
  children,
  scale = 1,
  onPageCountChange,
  density = 'standard',
}: A4MultiPageContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Density styling class
  const densityClass = 
    density === 'compact' ? 'text-[92%] leading-tight tracking-tight p-4' :
    density === 'large' ? 'text-[108%] leading-relaxed tracking-wide p-8' :
    'text-[100%] leading-normal p-6';

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;
    // A4 height in pixels at standard 96 DPI is 1123px (297mm)
    const a4HeightPx = 1123;
    const contentHeight = element.scrollHeight;
    const computedPages = Math.max(1, Math.ceil(contentHeight / a4HeightPx));

    if (computedPages !== totalPages) {
      setTotalPages(computedPages);
      if (onPageCountChange) {
        onPageCountChange(computedPages);
      }
    }
  }, [children, density, onPageCountChange, totalPages]);

  const scrollToPage = (pageNum: number) => {
    if (!containerRef.current) return;
    const pageHeight = 1123 * scale;
    const targetScroll = (pageNum - 1) * pageHeight;
    
    containerRef.current.parentElement?.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
    setCurrentPage(pageNum);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Page Navigation Indicator Floating Bar */}
      {totalPages > 1 && (
        <div className="sticky top-4 z-20 mb-3 flex items-center gap-3 px-4 py-1.5 bg-slate-900/90 text-white backdrop-blur-md rounded-full shadow-lg text-xs font-semibold border border-slate-700 animate-in fade-in duration-200">
          <Layers className="w-3.5 h-3.5 text-violet-400" />
          <span>Page {currentPage} of {totalPages}</span>
          <div className="flex items-center gap-1 border-l border-slate-700 pl-2">
            <button
              type="button"
              onClick={() => scrollToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              className="p-1 hover:bg-slate-800 rounded disabled:opacity-30 cursor-pointer"
              title="Previous Page"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => scrollToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              className="p-1 hover:bg-slate-800 rounded disabled:opacity-30 cursor-pointer"
              title="Next Page"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Primary A4 Document Canvas */}
      <div
        ref={containerRef}
        className={`bg-white shadow-2xl transition-all duration-150 ${densityClass} page-break-avoid`}
        style={{
          width: '210mm',
          minHeight: '297mm',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          boxSizing: 'border-box',
        }}
      >
        {children}
      </div>
    </div>
  );
}
