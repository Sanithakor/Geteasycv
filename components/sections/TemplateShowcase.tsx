"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Star, ArrowRight, Download, CheckCircle2, Sparkles } from "lucide-react";
import { generateTemplates, GeneratedTemplate } from "@/lib/generateTemplates";
import { sampleCV } from "@/data/sampleCV";
import TemplateRenderer from "@/components/cv/TemplateRenderer";

/**
 * Dynamic Template Preview Component
 * Renders actual CV layout & theme combinations scaled to A4 aspect ratio.
 */
function DynamicTemplatePreview({ template }: { template: GeneratedTemplate }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.35);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        setScale(containerWidth / 794);
      }
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [mounted]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[1/1.414] w-full overflow-hidden rounded-xl bg-white border border-slate-200/80 shadow-xs"
    >
      {mounted ? (
        <div
          className="absolute left-0 top-0 origin-top-left pointer-events-none select-none"
          style={{ width: "794px", transform: `scale(${scale})` }}
        >
          <TemplateRenderer template={template} data={sampleCV} scale={1} />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-50">
          <div className="w-6 h-6 rounded-full border-2 border-indigo-300 border-t-indigo-600 animate-spin" />
        </div>
      )}
    </div>
  );
}

export default function TemplateShowcase() {
  const [displayedTemplates, setDisplayedTemplates] = useState<GeneratedTemplate[]>([]);

  useEffect(() => {
    const allTemplates = generateTemplates();
    
    // Pick 3 distinct layout categories for maximum visual variety
    const layoutCategories = ['single-column-ats', 'sidebar-left', 'two-column-split'];
    const selected: GeneratedTemplate[] = [];

    layoutCategories.forEach((layoutId) => {
      const match = allTemplates.find((t) => t.layoutId === layoutId);
      if (match) selected.push(match);
    });

    // Fallback to first 3 if category match isn't found
    if (selected.length < 3) {
      setDisplayedTemplates(allTemplates.slice(0, 3));
    } else {
      setDisplayedTemplates(selected.slice(0, 3));
    }
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row: Content on Left, "View All Templates" Button on Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-200/80">
          {/* Left Side Content */}
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 border border-indigo-100/80 rounded-full">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
                Featured CV Templates
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Choose Your Perfect Template
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Start with our top-rated, ATS-friendly CV templates designed by recruitment experts to help you stand out and land job interviews.
            </p>
          </div>

          {/* Right Side Action Button */}
          <div className="shrink-0">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-indigo-500/25 group"
            >
              View All Templates
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 3 Dynamic CV Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {displayedTemplates.map((template, index) => (
            <article
              key={template.id}
              className="group bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative hover:-translate-y-1"
            >
              {/* Template Preview Container */}
              <div className="relative mb-4">
                <DynamicTemplatePreview template={template} />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500 text-white text-xs font-bold rounded-md shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ATS Ready
                  </span>
                  {index % 2 === 1 && (
                    <span className="px-2.5 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded-md shadow-xs">
                      PRO
                    </span>
                  )}
                </div>

                {/* Hover Overlay Button */}
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center p-4">
                  <Link
                    href={`/editor?template=${template.id}`}
                    className="w-full text-center py-3 bg-white text-slate-900 font-extrabold text-sm rounded-lg shadow-lg hover:bg-slate-100 transition-colors"
                  >
                    Use This Template
                  </Link>
                </div>
              </div>

              {/* Template Info Card Body */}
              <div className="pt-2">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                    {template.layout.name}
                  </h3>
                  <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full shrink-0">
                    {template.category}
                  </span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                  {template.description}
                </p>

                {/* Stats Footer */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>4.9 / 5.0</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Download className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="font-semibold text-slate-700">1.5k+ Uses</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Helper Bar */}
        <div className="text-center bg-slate-100/70 border border-slate-200/60 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Looking for more specialized designs or career categories?</span>
          </div>
          <Link
            href="/templates"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors group"
          >
            Explore all 150+ Templates
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
