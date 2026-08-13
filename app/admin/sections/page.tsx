'use client';

import React from 'react';
import { Plus, Search, Edit2, Trash2, Eye, LayoutGrid, CheckSquare, Sparkles } from 'lucide-react';

const SECTIONS = [
  {
    id: 'personal',
    name: 'Personal Information',
    description: 'Contact details, profile picture, social links, and website.',
    fields: ['First Name', 'Last Name', 'Email', 'Phone', 'Job Title', 'Location', 'Avatar'],
    required: true,
    aiEnabled: false,
    multiple: false,
    status: 'active',
  },
  {
    id: 'summary',
    name: 'Professional Summary',
    description: 'A brief overview of professional profile and goals.',
    fields: ['Summary Description'],
    required: false,
    aiEnabled: true,
    multiple: false,
    status: 'active',
  },
  {
    id: 'experience',
    name: 'Work History',
    description: 'Detailed list of previous employment roles and achievements.',
    fields: ['Job Title', 'Employer', 'City', 'State', 'Start Date', 'End Date', 'Description', 'Achievements'],
    required: true,
    aiEnabled: true,
    multiple: true,
    status: 'active',
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Academic background, degrees, schools, and graduations.',
    fields: ['Degree', 'Field of Study', 'School Name', 'Graduation Date', 'GPA', 'Description'],
    required: false,
    aiEnabled: false,
    multiple: true,
    status: 'active',
  },
  {
    id: 'skills',
    name: 'Skills',
    description: 'Technical, professional, or soft skills tags with rating.',
    fields: ['Skill Name', 'Proficiency Level', 'Category'],
    required: false,
    aiEnabled: true,
    multiple: true,
    status: 'active',
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Personal projects, descriptions, and demo links.',
    fields: ['Project Title', 'Subheading', 'Description', 'Project URL', 'Technologies Used'],
    required: false,
    aiEnabled: true,
    multiple: true,
    status: 'active',
  },
  {
    id: 'certifications',
    name: 'Certifications',
    description: 'Professional certificates, licensing, and credentials.',
    fields: ['Certificate Name', 'Issuer', 'Date Issued', 'Expiration Date', 'Credential ID', 'Verification Link'],
    required: false,
    aiEnabled: false,
    multiple: true,
    status: 'active',
  },
  {
    id: 'languages',
    name: 'Languages',
    description: 'Languages spoken and corresponding level of fluency.',
    fields: ['Language Name', 'Proficiency Level'],
    required: false,
    aiEnabled: false,
    multiple: true,
    status: 'active',
  },
];

export default function Page() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredSections = SECTIONS.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Resume Sections</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Configure default and custom layout sections, field constraints, and AI configurations ({SECTIONS.length} total)
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Add Custom Section
        </button>
      </div>

      {/* Filter and Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search layout sections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSections.map((section) => (
          <div
            key={section.id}
            className="group rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-300 space-y-4"
          >
            <div className="space-y-3">
              {/* Heading */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{section.name}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">id: {section.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {section.required && (
                    <span className="text-[10px] bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 font-semibold px-2 py-0.5 rounded-full">
                      Required
                    </span>
                  )}
                  {section.multiple && (
                    <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-semibold px-2 py-0.5 rounded-full">
                      List Section
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {section.description}
              </p>

              {/* Fields list */}
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2">Fields</p>
                <div className="flex flex-wrap gap-1.5">
                  {section.fields.map((field) => (
                    <span
                      key={field}
                      className="text-xs bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 px-2 py-1 rounded"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Panel */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-green-700 dark:text-green-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500" /> Active
                </span>
                {section.aiEnabled && (
                  <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-medium" title="AI content writer enabled for this section">
                    <Sparkles className="w-3.5 h-3.5" /> AI Writer
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-600 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
