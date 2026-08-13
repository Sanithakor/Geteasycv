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
      <div className="flex gap-4 mb-6 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md">
        <div className="w-16 h-16 bg-white/20 rounded-full flex-shrink-0" />
        <div>
          <h1 className="text-xl font-bold">{cv.personal.firstName} {cv.personal.lastName}</h1>
          <p className="text-white/90">{cv.personal.title}</p>
        </div>
      </div>

      {cv.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-indigo-600 mb-2">About Me</h2>
          <p className="text-gray-700">{cv.summary}</p>
        </div>
      )}

      {cv.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-indigo-600 mb-2">Work Experience</h2>
          {cv.experience.map((exp, index) => (
            <div key={index} className="mb-4 p-3 bg-gray-50 rounded-md">
              <div className="font-semibold text-gray-900">{exp.position}</div>
              <div className="text-indigo-600 text-sm">{exp.company}</div>
              <div className="text-gray-500 text-xs">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
              <p className="text-gray-600 text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {cv.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-indigo-600 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {cv.skills.map((skill) => (
              <span key={skill.id} className="px-3 py-1.5 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}