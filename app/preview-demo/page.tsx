'use client';

import React, { useState, useMemo } from 'react';
import { generateTemplates } from '../../lib/generateTemplates';
import { HighResolutionPreview } from '../../components/HighResolutionPreview';
import Navigation from '../../components/Navigation';

export default function PreviewDemoPage() {
  const templates = useMemo(() => generateTemplates(), []);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [selectedLayout, setSelectedLayout] = useState('sidebar-left');
  const [selectedTheme, setSelectedTheme] = useState('modern-blue');

  // Filter templates by layout and theme
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => 
      template.layout.id === selectedLayout && 
      template.theme.id === selectedTheme
    );
  }, [templates, selectedLayout, selectedTheme]);

  const currentTemplate = filteredTemplates[0] || templates[0];

  // Get unique layouts and themes
  const layouts = useMemo(() => {
    const uniqueLayouts = templates.reduce((acc, template) => {
      if (!acc.find(l => l.id === template.layout.id)) {
        acc.push(template.layout);
      }
      return acc;
    }, [] as any[]);
    return uniqueLayouts;
  }, [templates]);

  const themes = useMemo(() => {
    const uniqueThemes = templates.reduce((acc, template) => {
      if (!acc.find(t => t.id === template.theme.id)) {
        acc.push(template.theme);
      }
      return acc;
    }, [] as any[]);
    return uniqueThemes;
  }, [templates]);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              High-Resolution Template Preview
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Generate pixel-perfect A4 previews at 300 DPI that are exact 1:1 visual copies of resume templates
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Controls Panel */}
            <div className="space-y-6">
              <div className="bg-white rounded-md shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Template Configuration</h2>
                
                {/* Layout Selector */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Layout Style
                  </label>
                  <select
                    value={selectedLayout}
                    onChange={(e) => setSelectedLayout(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {layouts.map((layout) => (
                      <option key={layout.id} value={layout.id}>
                        {layout.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Theme Selector */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color Theme
                  </label>
                  <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {themes.map((theme) => (
                      <option key={theme.id} value={theme.id}>
                        {theme.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Template Info */}
                <div className="bg-gray-50 rounded-md p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Current Template</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Name:</span> {currentTemplate?.name}</p>
                    <p><span className="font-medium">Layout:</span> {currentTemplate?.layout.name}</p>
                    <p><span className="font-medium">Theme:</span> {currentTemplate?.theme.name}</p>
                    <p><span className="font-medium">Category:</span> {currentTemplate?.category}</p>
                  </div>
                </div>
              </div>

              {/* Preview Features */}
              <div className="bg-white rounded-md shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">A4 Format (210mm × 297mm)</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">300 DPI Ultra HD Quality</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Exact Typography & Colors</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Perfect Spacing & Layout</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">1:1 Visual Copy</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">PNG/JPEG Export Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* High-Resolution Preview */}
            <div className="bg-white rounded-md shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ultra HD Preview</h3>
              {currentTemplate && (
                <HighResolutionPreview
                  template={currentTemplate}
                  showDownloadButton={true}
                  className="w-full"
                />
              )}
            </div>
          </div>

          {/* Technical Details */}
          <div className="mt-12 bg-gray-900 rounded-md p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Technical Specifications</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="font-semibold text-blue-400 mb-2">Dimensions</h4>
                <p className="text-sm text-gray-300">2480 × 3508 pixels</p>
                <p className="text-xs text-gray-400">A4 format at 300 DPI</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-400 mb-2">Quality</h4>
                <p className="text-sm text-gray-300">Ultra HD (8K)</p>
                <p className="text-xs text-gray-400">Print-ready quality</p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">Format</h4>
                <p className="text-sm text-gray-300">PNG, JPEG, SVG</p>
                <p className="text-xs text-gray-400">Multiple export options</p>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Accuracy</h4>
                <p className="text-sm text-gray-300">1:1 Visual Copy</p>
                <p className="text-xs text-gray-400">Pixel-perfect rendering</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}