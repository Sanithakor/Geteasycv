'use client';

import React from 'react';
import { CVData } from '@/data/sampleCV';

interface ModernTemplateProps {
  cv: CVData;
}

export default function ModernTemplate({ cv }: ModernTemplateProps) {
  return (
    <div className="p-6 max-w-xl mx-auto bg-white">
      {/* Header */}
      <div className="flex gap-4 mb-6 p-5 bg-[#0F0F0F] text-white rounded-xl">
        <div className="w-16 h-16 bg-white/10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xl text-[#F5D17B]">
          {cv.personal.firstName?.[0]}{cv.personal.lastName?.[0]}
        </div>
        <div>
          <h1 className="text-xl font-bold">{cv.personal.firstName} {cv.personal.lastName}</h1>
          <p className="text-[#BAC7FE] text-sm">{cv.personal.title}</p>
        </div>
      </div>

      {cv.summary && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-[#0F0F0F] uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">About Me</h2>
          <p className="text-slate-700 text-sm leading-relaxed">{cv.summary}</p>
        </div>
      )}

      {cv.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-[#0F0F0F] uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">Work Experience</h2>
          {cv.experience.map((exp, index) => (
            <div key={index} className="mb-4 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="font-bold text-slate-900 text-sm">{exp.position}</div>
              <div className="text-[#F3645C] text-xs font-semibold">{exp.company}</div>
              <div className="text-slate-500 text-xs">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {cv.skills.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-[#0F0F0F] uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {cv.skills.map((skill) => (
              <span key={skill.id} className="px-3 py-1 bg-[#FEE1CF] text-[#0F0F0F] text-xs rounded-full font-bold">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}