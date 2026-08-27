"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Star, ArrowRight, Download, CheckCircle2, Sparkles } from "lucide-react";
import { generateTemplates, GeneratedTemplate } from "@/lib/generateTemplates";
import { sampleCV } from "@/data/sampleCV";
import { formatDownloadCount } from "@/lib/templateStatsStore";
import TemplateRenderer from "@/components/cv/TemplateRenderer";

function DynamicTemplatePreview({ template }: { template: GeneratedTemplate }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.35);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateScale = () => {
      if (containerRef.current) setScale(containerRef.current.clientWidth / 794);
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [mounted]);

  return (
    <div ref={containerRef}
      className="relative aspect-[1/1.414] w-full overflow-hidden rounded-xl bg-white"
      style={{ border: '1px solid rgba(15,15,15,0.08)' }}>
      {mounted ? (
        <div className="absolute left-0 top-0 origin-top-left pointer-events-none select-none"
          style={{ width: "794px", transform: `scale(${scale})` }}>
          <TemplateRenderer template={template} data={sampleCV} scale={1} />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center" style={{ background: '#F8F8F6' }}>
          <div className="w-6 h-6 rounded-full border-2 animate-spin"
            style={{ borderColor: '#BAC7FE', borderTopColor: '#0F0F0F' }} />
        </div>
      )}
    </div>
  );
}

export default function TemplateShowcase() {
  const [displayedTemplates, setDisplayedTemplates] = useState<GeneratedTemplate[]>([]);
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch('/api/templates/download')
      .then(r => r.json())
      .then(d => { if (d.success && d.counts) setDownloadCounts(d.counts); })
      .catch(() => {});

    const all = generateTemplates();
    const cats = ['single-column-ats', 'sidebar-left', 'two-column-split', 'sidebar-right'];
    const selected = cats.map(id => all.find(t => t.layoutId === id)).filter(Boolean) as GeneratedTemplate[];
    setDisplayedTemplates(selected.length >= 4 ? selected.slice(0, 4) : all.slice(0, 4));
  }, []);

  return (
    <section className="py-16 sm:py-24" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6"
          style={{ borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full"
              style={{ background: '#F5D17B', border: '1px solid rgba(15,15,15,0.10)' }}>
              <Sparkles className="w-4 h-4" style={{ color: '#0F0F0F' }} />
              <span className="text-xs font-extrabold uppercase tracking-wider" style={{ color: '#0F0F0F' }}>
                Featured CV Templates
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight" style={{ color: '#0F0F0F' }}>
              Choose Your Perfect Template
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#333333' }}>
              Start with our top-rated, ATS-friendly CV templates designed by recruitment experts to help you stand out and land job interviews.
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/templates"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-white font-bold text-sm rounded-xl transition-all shadow-md group hover:opacity-90"
              style={{ background: '#0F0F0F' }}>
              View All Templates
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Template cards (4 items grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {displayedTemplates.map((template, index) => (
            <article key={template.id}
              className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative hover:-translate-y-1"
              style={{ border: '1px solid rgba(15,15,15,0.08)' }}>

              <div className="relative mb-4">
                <DynamicTemplatePreview template={template} />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-white text-xs font-bold rounded-lg shadow-sm"
                    style={{ background: '#58C09D' }}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> ATS Ready
                  </span>
                  {index % 2 === 1 && (
                    <span className="px-2.5 py-1 text-white text-xs font-bold rounded-lg shadow-sm"
                      style={{ background: '#0F0F0F' }}>
                      PRO
                    </span>
                  )}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center p-4"
                  style={{ background: 'rgba(15,15,15,0.65)', backdropFilter: 'blur(2px)' }}>
                  <Link href={`/editor?template=${template.id}`}
                    className="w-full text-center py-3 font-extrabold text-sm rounded-xl shadow-lg transition-colors"
                    style={{ background: '#FFFFFF', color: '#0F0F0F' }}>
                    Use This Template
                  </Link>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="font-bold text-base transition-colors" style={{ color: '#0F0F0F' }}>
                    {template.layout.name}
                  </h3>
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full shrink-0"
                    style={{ background: '#BAC7FE', color: '#0F0F0F' }}>
                    {template.category}
                  </span>
                </div>

                <p className="text-xs line-clamp-2 mb-4 leading-relaxed" style={{ color: '#333333' }}>
                  {template.description}
                </p>

                <div className="flex items-center justify-between text-xs pt-3"
                  style={{ borderTop: '1px solid rgba(15,15,15,0.06)' }}>
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: '#F5D17B' }}>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span style={{ color: '#333333' }}>4.9 / 5.0</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" style={{ color: '#F3645C' }} />
                    <span className="font-semibold" style={{ color: '#333333' }}>
                      {formatDownloadCount(downloadCounts[template.id] || 0)} Downloads
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom helper */}
        <div className="text-center rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-4xl mx-auto"
          style={{ background: '#F8F8F6', border: '1px solid rgba(15,15,15,0.08)' }}>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold" style={{ color: '#333333' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#58C09D' }} />
            <span>Looking for more specialized designs or career categories?</span>
          </div>
          <Link href="/templates"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-colors group"
            style={{ color: '#F3645C' }}>
            Explore all 150+ Templates
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
