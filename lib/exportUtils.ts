// Enhanced export  utilities for GetEasyCV
import safeHtml2Canvas from './safeHtml2Canvas';
import { jsPDF } from 'jspdf';

export interface ExportOptions {
  quality: number;
  format: 'a4' | 'letter' | 'legal';
  orientation: 'portrait' | 'landscape';
  margin: number;
  scale: number;
}

export const defaultExportOptions: ExportOptions = {
  quality: 1.0,
  format: 'a4',
  orientation: 'portrait',
  margin: 10,
  scale: 2,
};

export async function captureElement(element: HTMLElement, options: Partial<ExportOptions> = {}) {
  const opts = { ...defaultExportOptions, ...options };
  
  // Wait for fonts and images to load
  await document.fonts?.ready;
  await waitForImages(element);
  
  // Give a moment for any pending renders
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return safeHtml2Canvas(element, {
    useCORS: true,
    allowTaint: true,
    logging: false,
  });
}

export async function exportToPDF(
  canvas: HTMLCanvasElement, 
  filename: string, 
  options: Partial<ExportOptions> = {}
) {
  const opts = { ...defaultExportOptions, ...options };
  
  const pdf = new jsPDF({
    orientation: opts.orientation,
    unit: 'mm',
    format: opts.format,
    compress: true,
    hotfixes: ["px_scaling"]
  });
  
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = opts.margin;
  const contentWidth = pageWidth - (margin * 2);
  const contentHeight = pageHeight - (margin * 2);
  
  const imageWidth = contentWidth;
  const imageHeight = (canvas.height * contentWidth) / canvas.width;
  
  const imageData = canvas.toDataURL('image/png', opts.quality);
  
  let yPosition = margin;
  let remainingHeight = imageHeight;
  
  // First page
  const heightToAdd = Math.min(remainingHeight, contentHeight);
  pdf.addImage(
    imageData, 
    'PNG', 
    margin, 
    yPosition, 
    imageWidth, 
    heightToAdd,
    undefined,
    'FAST'
  );
  
  remainingHeight -= heightToAdd;
  
  // Additional pages if needed
  while (remainingHeight > 0) {
    pdf.addPage();
    yPosition = margin - (imageHeight - remainingHeight);
    
    const heightToAdd = Math.min(remainingHeight, contentHeight);
    pdf.addImage(
      imageData,
      'PNG',
      margin,
      yPosition,
      imageWidth,
      imageHeight,
      undefined,
      'FAST'
    );
    
    remainingHeight -= contentHeight;
  }
  
  pdf.save(filename);
}

export async function exportToImage(
  canvas: HTMLCanvasElement,
  filename: string,
  format: 'png' | 'jpg' = 'png',
  quality = 1.0
) {
  const link = document.createElement('a');
  link.download = filename;
  
  if (format === 'png') {
    link.href = canvas.toDataURL('image/png');
  } else {
    link.href = canvas.toDataURL('image/jpeg', quality);
  }
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function waitForImages(element: HTMLElement): Promise<void> {
  const images = Array.from(element.querySelectorAll('img'));
  const imagePromises = images.map((img) => {
    if (img.complete) return Promise.resolve();
    
    return new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Resolve even on error to avoid hanging
    });
  });
  
  await Promise.all(imagePromises);
}

export function generateFileName(firstName: string, lastName: string, extension: string): string {
  const name = `${firstName || 'resume'}-${lastName || 'cv'}`
    .replace(/[^a-z0-9-]+/gi, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
  return `${name}.${extension}`;
}

export function validateExportData(data: any): boolean {
  // Basic validation to ensure data is ready for export
  return (
    data &&
    data.personal &&
    (data.personal.firstName || data.personal.lastName) &&
    data.personal.email
  );
}

// Export quality presets
export const exportPresets = {
  draft: {
    quality: 0.8,
    scale: 1.5,
  },
  standard: {
    quality: 0.95,
    scale: 2,
  },
  high: {
    quality: 1.0,
    scale: 3,
  },
  print: {
    quality: 1.0,
    scale: 3,
    format: 'a4' as const,
    margin: 5,
  }
};