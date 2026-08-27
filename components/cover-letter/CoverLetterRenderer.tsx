"use client";

import React from "react";
import { Mail, Phone, MapPin, Globe, Calendar, Building, User } from "lucide-react";
import { CoverLetterData, CoverLetterTemplate } from "@/data/coverLetterTemplates";

interface CoverLetterRendererProps {
  template: CoverLetterTemplate;
  data?: CoverLetterData;
  accentColor?: string;
  isCompact?: boolean;
  scale?: number;
  className?: string;
}

export default function CoverLetterRenderer({
  template,
  data: customData,
  accentColor,
  isCompact = false,
  scale = 1,
  className = "",
}: CoverLetterRendererProps) {
  const data = customData || template.sampleData;
  const activeColor = accentColor || template.accentColor;

  // Render different layouts based on template.layoutStyle
  const renderContent = () => {
    switch (template.layoutStyle) {
      case "classic-executive":
        return (
          <div className={`w-full font-serif text-slate-800 ${isCompact ? "p-4 text-[10.5px] leading-relaxed" : "p-8 sm:p-12 text-sm leading-relaxed"}`}>
            {/* Formal Executive Letterhead */}
            <div className="text-center pb-3 border-b-2" style={{ borderColor: activeColor }}>
              <h1 className={`${isCompact ? "text-lg" : "text-3xl sm:text-4xl"} font-bold tracking-tight text-slate-950 uppercase font-serif`}>
                {data.fullName}
              </h1>
              <p className={`mt-0.5 font-sans font-semibold tracking-wide uppercase ${isCompact ? "text-[9px]" : "text-xs"} text-slate-600`}>
                {data.jobTitle}
              </p>
              <div className={`mt-1.5 flex flex-wrap items-center justify-center gap-2 font-sans text-slate-500 ${isCompact ? "text-[8.5px]" : "text-xs"}`}>
                <span>{data.email}</span>
                <span>•</span>
                <span>{data.phone}</span>
                <span>•</span>
                <span>{data.location}</span>
                {data.linkedin && (
                  <>
                    <span>•</span>
                    <span>{data.linkedin}</span>
                  </>
                )}
              </div>
            </div>

            {/* Date & Recipient */}
            <div className={`mt-4 space-y-1.5 font-sans ${isCompact ? "text-[9.5px]" : "text-xs"}`}>
              <div className="font-semibold text-slate-700">{data.date}</div>
              <div className="space-y-0.5 text-slate-800">
                <div className="font-bold text-slate-950">{data.recipientName}</div>
                <div className="text-slate-600">{data.recipientTitle}</div>
                <div className="font-semibold text-slate-900">{data.companyName}</div>
                <div className="text-slate-500">{data.companyAddress}</div>
              </div>
            </div>

            {/* Salutation & Body */}
            <div className={`mt-4 space-y-3 ${isCompact ? "text-[10px] leading-[1.6]" : "text-sm leading-relaxed"}`}>
              <p className="font-bold font-sans text-slate-900">{data.salutation}</p>
              <p className="text-justify">{data.openingParagraph}</p>
              {data.bodyParagraphs.map((para, idx) => (
                <p key={idx} className="text-justify">{para}</p>
              ))}
              <p className="text-justify">{data.closingParagraph}</p>
            </div>

            {/* Signoff */}
            <div className={`mt-4 space-y-1.5 ${isCompact ? "text-[9.5px]" : "text-sm"}`}>
              <p className="font-sans font-medium text-slate-700">{data.signoff}</p>
              <div className={`font-serif italic font-bold text-slate-900 ${isCompact ? "text-sm pt-0.5" : "text-lg pt-2"}`}>
                {data.fullName}
              </div>
            </div>
          </div>
        );

      case "creative-edge":
        return (
          <div className={`w-full font-sans text-slate-800 ${isCompact ? "text-[10px]" : "text-sm"}`}>
            {/* Vibrant Header Band */}
            <div
              className={`p-3.5 sm:p-6 text-white flex items-center justify-between gap-3`}
              style={{ background: `linear-gradient(135deg, ${activeColor}, #0F0F0F)` }}
            >
              <div className="space-y-0.5">
                <h1 className={`${isCompact ? "text-base font-bold" : "text-2xl sm:text-3xl font-extrabold"} tracking-tight`}>
                  {data.fullName}
                </h1>
                <p className={`font-medium opacity-90 ${isCompact ? "text-[9px]" : "text-xs sm:text-sm"}`}>
                  {data.jobTitle}
                </p>
              </div>
              <div
                className={`flex shrink-0 items-center justify-center rounded-xl font-bold bg-white/20 backdrop-blur-xs text-white border border-white/30 ${
                  isCompact ? "w-8 h-8 text-xs" : "w-14 h-14 text-xl"
                }`}
              >
                {data.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
            </div>

            {/* Contact Pills Bar */}
            <div className={`bg-slate-100/90 px-3.5 py-1.5 flex flex-wrap items-center gap-2.5 border-b border-slate-200 text-slate-600 ${isCompact ? "text-[8.5px]" : "text-xs"}`}>
              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {data.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {data.phone}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {data.location}</span>
            </div>

            {/* Letter Content */}
            <div className={`${isCompact ? "p-4 space-y-3 text-[10px] leading-[1.6]" : "p-8 sm:p-10 space-y-4 text-sm leading-relaxed"}`}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 border-b border-slate-100 pb-2.5 text-slate-500">
                <div>
                  <span className="font-bold text-slate-900 block">{data.recipientName}</span>
                  <span>{data.recipientTitle} • {data.companyName}</span>
                </div>
                <div className="font-medium text-slate-600">{data.date}</div>
              </div>

              <p className="font-bold text-slate-900">{data.salutation}</p>
              <p>{data.openingParagraph}</p>
              {data.bodyParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
              <p>{data.closingParagraph}</p>

              <div className="pt-2 space-y-1">
                <p className="text-slate-600">{data.signoff}</p>
                <p className="font-bold text-slate-900">{data.fullName}</p>
              </div>
            </div>
          </div>
        );

      case "tech-innovator":
        return (
          <div className={`w-full font-sans text-slate-800 ${isCompact ? "p-4 text-[10px]" : "p-8 sm:p-10 text-sm"}`}>
            {/* Tech Header with Accent Left Line */}
            <div className="border-l-4 pl-3.5 space-y-0.5" style={{ borderColor: activeColor }}>
              <h1 className={`${isCompact ? "text-base font-extrabold" : "text-2xl sm:text-3xl font-extrabold"} text-slate-900 tracking-tight`}>
                {data.fullName}
              </h1>
              <p className={`font-mono font-semibold ${isCompact ? "text-[9px]" : "text-xs"} text-slate-700`} style={{ color: activeColor }}>
                &gt; {data.jobTitle}
              </p>
              <div className={`pt-1 flex flex-wrap gap-1.5 text-slate-600 ${isCompact ? "text-[8.5px]" : "text-xs"}`}>
                <span className="rounded bg-slate-100 px-1.5 py-0.5">{data.email}</span>
                <span className="rounded bg-slate-100 px-1.5 py-0.5">{data.phone}</span>
                <span className="rounded bg-slate-100 px-1.5 py-0.5">{data.location}</span>
                {data.website && <span className="rounded bg-slate-100 px-1.5 py-0.5">{data.website}</span>}
              </div>
            </div>

            <div className={`mt-4 border-t border-slate-200/80 pt-3 space-y-2.5 ${isCompact ? "text-[10px] leading-[1.6]" : "text-sm leading-relaxed"}`}>
              <div className="flex justify-between items-baseline text-slate-500 font-mono text-[8.5px] sm:text-xs">
                <span>RE: Application for {data.jobTitle}</span>
                <span>{data.date}</span>
              </div>

              <div className="bg-slate-50 rounded-lg p-2 sm:p-3 border border-slate-200/60 text-slate-700">
                <span className="font-bold text-slate-900 block">{data.recipientName} ({data.recipientTitle})</span>
                <span>{data.companyName} — {data.companyAddress}</span>
              </div>

              <p className="font-bold text-slate-900">{data.salutation}</p>
              <p>{data.openingParagraph}</p>
              {data.bodyParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
              <p>{data.closingParagraph}</p>

              <div className="pt-2">
                <p className="text-slate-600">{data.signoff}</p>
                <p className="font-bold text-slate-900">{data.fullName}</p>
              </div>
            </div>
          </div>
        );

      case "corporate-chic":
        return (
          <div className={`w-full font-sans text-slate-800 ${isCompact ? "p-4 text-[10px]" : "p-8 sm:p-10 text-sm"}`}>
            {/* Top Color Highlight Bar */}
            <div className="h-1.5 w-full rounded-t-sm" style={{ background: activeColor }} />

            {/* Split Modern Header */}
            <div className="mt-2.5 flex items-start justify-between border-b border-slate-200/80 pb-3">
              <div>
                <h1 className={`${isCompact ? "text-base" : "text-2xl sm:text-3xl"} font-extrabold tracking-tight text-slate-950`}>
                  {data.fullName}
                </h1>
                <p className={`font-semibold ${isCompact ? "text-[9px]" : "text-xs sm:text-sm"}`} style={{ color: activeColor }}>
                  {data.jobTitle}
                </p>
              </div>
              <div className={`text-right space-y-0.5 text-slate-500 ${isCompact ? "text-[8.5px]" : "text-xs"}`}>
                <p>{data.email}</p>
                <p>{data.phone}</p>
                <p>{data.location}</p>
              </div>
            </div>

            {/* Letter Body */}
            <div className={`mt-4 space-y-3 ${isCompact ? "text-[10px] leading-[1.6]" : "text-sm leading-relaxed"}`}>
              <div className="flex justify-between text-slate-500">
                <div>
                  <p className="font-bold text-slate-900">{data.recipientName}</p>
                  <p className="text-slate-600">{data.recipientTitle}</p>
                  <p className="font-semibold text-slate-800">{data.companyName}</p>
                </div>
                <p className="font-medium text-slate-600">{data.date}</p>
              </div>

              <p className="font-bold text-slate-900">{data.salutation}</p>
              <p>{data.openingParagraph}</p>
              {data.bodyParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
              <p>{data.closingParagraph}</p>

              <div className="pt-2">
                <p className="text-slate-600">{data.signoff}</p>
                <p className="font-bold text-slate-900">{data.fullName}</p>
              </div>
            </div>
          </div>
        );

      case "nordic-clean":
      case "modern-minimal":
      default:
        return (
          <div className={`w-full font-sans text-slate-800 ${isCompact ? "p-4 text-[10px]" : "p-8 sm:p-10 text-sm"}`}>
            {/* Modern Clean Header */}
            <div className="border-b border-slate-200/80 pb-3">
              <div className="flex items-baseline justify-between gap-2">
                <h1 className={`${isCompact ? "text-base" : "text-2xl sm:text-3xl"} font-extrabold tracking-tight text-slate-950`}>
                  {data.fullName}
                </h1>
                <span className={`font-semibold ${isCompact ? "text-[9px]" : "text-xs sm:text-sm"}`} style={{ color: activeColor }}>
                  {data.jobTitle}
                </span>
              </div>
              <div className={`mt-1.5 flex flex-wrap items-center gap-2 text-slate-500 ${isCompact ? "text-[8.5px]" : "text-xs"}`}>
                <span>{data.email}</span>
                <span>•</span>
                <span>{data.phone}</span>
                <span>•</span>
                <span>{data.location}</span>
              </div>
            </div>

            {/* Recipient & Date */}
            <div className={`mt-4 flex justify-between items-start ${isCompact ? "text-[9px]" : "text-xs"} text-slate-600`}>
              <div className="space-y-0.5">
                <p className="font-bold text-slate-900">{data.recipientName}</p>
                <p>{data.recipientTitle}</p>
                <p className="font-semibold text-slate-800">{data.companyName}</p>
                <p className="text-slate-500">{data.companyAddress}</p>
              </div>
              <p className="font-semibold text-slate-800">{data.date}</p>
            </div>

            {/* Content Body */}
            <div className={`mt-4 space-y-3 ${isCompact ? "text-[10px] leading-[1.6]" : "text-sm leading-relaxed"}`}>
              <p className="font-bold text-slate-900">{data.salutation}</p>
              <p>{data.openingParagraph}</p>
              {data.bodyParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
              <p>{data.closingParagraph}</p>
            </div>

            {/* Signoff */}
            <div className={`mt-4 ${isCompact ? "text-[9.5px]" : "text-sm"}`}>
              <p className="text-slate-600">{data.signoff}</p>
              <p className="font-bold text-slate-900">{data.fullName}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative w-full bg-white rounded-lg shadow-xs overflow-hidden ${className}`}
      style={scale !== 1 ? { transform: `scale(${scale})`, transformOrigin: "top left" } : undefined}
    >
      {renderContent()}
    </div>
  );
}
