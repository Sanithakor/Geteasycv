'use client';

import React from 'react';
import { CVData } from '@/data/sampleCV';

interface MinimalTemplateProps {
  cv: CVData;
}

export default function MinimalTemplate({ cv }: MinimalTemplateProps) {
  return (
    <div className="p-6 max-w-xl mx-auto bg-white">
      <div className="text-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold">{cv.personal.firstName} {cv.personal.lastName}</h1>
        <p className="text-gray-600">{cv.personal.title}</p>
        <div className="text-sm text-gray-500 mt-2">
          {cv.personal.email} | {cv.personal.phone} | {cv.personal.location}
        </div>
      </div>

      {cv.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Summary</h2>
          <p className="text-gray-700">{cv.summary}</p>
        </div>
      )}

      {cv.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Experience</h2>
          {cv.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="font-semibold">{exp.position}</div>
              <div className="text-gray-600 text-sm">{exp.company} | {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
            </div>
          ))}
        </div>
      )}

      {cv.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Education</h2>
          {cv.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="font-semibold">{edu.institution}</div>
              <div className="text-gray-600 text-sm">{edu.degree} in {edu.field}</div>
            </div>
          ))}
        </div>
      )}

      {cv.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {cv.skills.map((skill) => (
              <span key={skill.id} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}