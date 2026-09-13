'use client';

import React, { useRef, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Sparkles,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { GeneratedTemplate } from '@/lib/generateTemplates';
import { CVData } from '@/data/sampleCV';
import { TemplateRenderer } from '@/components/cv';
import A4MultiPageContainer from '@/components/cv/A4MultiPageContainer';

interface CenterPreviewAreaProps {
  customTemplate: GeneratedTemplate;
  visibleData: CVData;
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  density: 'compact' | 'standard' | 'large';
  setDensity: (d: 'compact' | 'standard' | 'large') => void;
  showLeftSidebar: boolean;
  setShowLeftSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  showRightSidebar: boolean;
  setShowRightSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  cvContentRef: React.RefObject<HTMLDivElement | null>;
}

export default function CenterPreviewArea({
  customTemplate,
  visibleData,
  scale,
  setScale,
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
  density,
  setDensity,
  showLeftSidebar,
  setShowLeftSidebar,
  showRightSidebar,
  setShowRightSidebar,
  cvContentRef,
}: CenterPreviewAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-fit function based on container width
  const handleAutoFit = () => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth - 48; // padding
    const a4Width = 794;
    const newScale = Math.min(1.2, Math.max(0.4, Number((containerWidth / a4Width).toFixed(2))));
    setScale(newScale);
  };

  // Zoom handlers
  const handleZoomIn = () => {
    setScale((prev) => Math.min(1.8, Number((prev + 0.1).toFixed(2))));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(0.4, Number((prev - 0.1).toFixed(2))));
  };

  const handleResetZoom = () => {
    setScale(0.85);
  };

  return (
    <div className="flex flex-col h-full bg-slate-100/90 relative overflow-hidden select-none">
      {/* Top Clean Preview Control Toolbar */}
      <div className="h-11 border-b border-slate-200 bg-white/95 backdrop-blur px-4 flex items-center justify-between shrink-0 z-20 shadow-2xs">
        {/* Left: Live Indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-extrabold text-slate-800 tracking-tight">Live CV Preview</span>
        </div>

        {/* Center: Page Navigation */}
        <div className="flex items-center gap-1 bg-slate-100/90 rounded-lg p-0.5 border border-slate-200">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            title="Previous Page"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 text-[11px] font-bold text-slate-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            title="Next Page"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-100/90 rounded-lg p-0.5 border border-slate-200">
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            className="px-1.5 py-0.5 text-[11px] font-mono font-bold text-slate-700 hover:text-violet-600 transition-colors cursor-pointer"
            title="Reset to 85%"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleAutoFit}
            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer ml-0.5"
            title="Auto-Fit to Screen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Multi-page Canvas Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 flex justify-center [scrollbar-gutter:stable]"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
          backgroundSize: '20px 20px',
        }}
      >
        <div className="flex flex-col items-center justify-start min-h-full pb-16">
          <A4MultiPageContainer
            scale={scale}
            density={density}
            onPageCountChange={setTotalPages}
          >
            <div ref={cvContentRef} id="cv-preview-container" className="w-full">
              <TemplateRenderer template={customTemplate} data={visibleData} scale={1} />
            </div>
          </A4MultiPageContainer>
        </div>
      </div>
    </div>
  );
}
