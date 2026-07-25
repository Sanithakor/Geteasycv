// High-Resolution Template Preview Component
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GeneratedTemplate } from '../lib/generateTemplates';
import { generateHighResPreviewImage } from '../lib/highResolutionPreviewGenerator';
import { sampleCV } from '../data/sampleCV';
import TemplateRenderer from './cv/TemplateRenderer';

interface HighResolutionPreviewProps {
  template: GeneratedTemplate;
  showDownloadButton?: boolean;
  className?: string;
}

export function HighResolutionPreview({ 
  template, 
  showDownloadButton = false, 
  className = '' 
}: HighResolutionPreviewProps) {
  const [previewSrc, setPreviewSrc] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);

  const generatePreview = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      // Wait for template to render
      await new Promise(resolve => setTimeout(resolve, 800));

      if (!templateRef.current) {
        throw new Error('Template element not found');
      }

      // Generate high-resolution preview using html2canvas
      const imageUrl = await generateHighResPreviewImage(templateRef.current, {
        scale: 2, // 2x for high quality (approx 300 DPI at 1440px width)
        format: 'png',
        quality: 0.95
      });

      setPreviewSrc(imageUrl);
      setLoading(false);
    } catch (err) {
      console.error('High-res preview generation failed:', err);
      setError(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    generatePreview();
  }, [template, generatePreview]);

  const handleDownload = async () => {
    try {
      if (!previewSrc) return;
      
      const link = document.createElement('a');
      link.download = `${template.name.replace(/\s+/g, '-').toLowerCase()}-preview.png`;
      link.href = previewSrc;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Template Rendering Container - Hidden, used for capture */}
      <div 
        ref={templateRef}
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '-9999px',
          width: '1240px', // A4 width at 150% scale
          height: '1754px', // A4 height at 150% scale
          backgroundColor: '#ffffff',
          zIndex: -1,
        }}
      >
        <TemplateRenderer template={template} data={sampleCV} scale={1} />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-sm text-gray-600 font-medium">Generating High-Res Preview...</p>
          <p className="text-xs text-gray-500 mt-1">Creating exact 1:1 visual copy</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 rounded-lg p-6 text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-sm font-medium text-red-700 mb-2">Preview Generation Failed</p>
          <p className="text-xs text-red-600">Unable to create high-resolution preview</p>
          <button 
            onClick={generatePreview}
            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* High-Resolution Preview */}
      {previewSrc && !loading && !error && (
        <div className="relative">
          <img
            src={previewSrc}
            alt={`High-resolution preview of ${template.name}`}
            className="w-full h-auto rounded-lg shadow-lg border border-gray-200"
            style={{ aspectRatio: '210/297' }} // A4 aspect ratio
          />
          
          {/* Template Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
            <h3 className="text-white font-semibold text-sm">{template.name}</h3>
            <p className="text-white/80 text-xs">{template.theme.name} • {template.layout.name}</p>
            <p className="text-white/60 text-xs mt-1">Exact 1:1 Visual Copy • Print-Ready Quality</p>
          </div>

          {/* Download Button */}
          {showDownloadButton && (
            <button
              onClick={handleDownload}
              className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Preview
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default HighResolutionPreview;