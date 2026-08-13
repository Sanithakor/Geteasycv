// Template Preview Image Generator
import safeHtml2Canvas from './safeHtml2Canvas';
import { GeneratedTemplate } from './generateTemplates';
import { sampleCV } from '../data/sampleCV';

// Cache for generated preview images
const previewCache = new Map<string, string>();

export async function generateTemplatePreview(template: GeneratedTemplate): Promise<string> {
  // Check if preview is already cached
  if (previewCache.has(template.id)) {
    return previewCache.get(template.id)!;
  }

  try {
    // Create a temporary container element
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '800px';
    tempContainer.style.height = '1200px';
    tempContainer.style.background = '#ffffff';
    tempContainer.style.fontFamily = template.theme.fontFamily;
    
    document.body.appendChild(tempContainer);

    // Create React element and render it
    const { createRoot } = await import('react-dom/client');
    const { TemplateRenderer } = await import('../components/cv');
    const React = await import('react');
    
    const root = createRoot(tempContainer);
    
    // Render the template
    await new Promise<void>((resolve) => {
      root.render(
        React.createElement(TemplateRenderer, {
          template: template,
          data: sampleCV,
          scale: 0.8
        })
      );
      
      // Wait for rendering to complete
      setTimeout(resolve, 1000);
    });

    // Generate canvas from the rendered template
    const canvas = await safeHtml2Canvas(tempContainer, {
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: 800,
      height: 1200,
    });

    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL('image/png', 0.8);
    
    // Cache the result
    previewCache.set(template.id, dataUrl);
    
    // Clean up
    root.unmount();
    document.body.removeChild(tempContainer);
    
    return dataUrl;
  } catch (error) {
    console.error('Failed to generate template preview:', error);
    
    // Return fallback placeholder
    return generateFallbackPreview(template);
  }
}

function generateFallbackPreview(template: GeneratedTemplate): string {
  // Create a simple SVG placeholder based on template info
  const svg = `
    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="600" fill="${template.theme.background}"/>
      <rect x="20" y="20" width="360" height="80" fill="${template.theme.primary}" opacity="0.1" rx="8"/>
      <rect x="30" y="30" width="80" height="60" fill="${template.theme.primary}" opacity="0.3" rx="4"/>
      <rect x="120" y="40" width="200" height="8" fill="${template.theme.text}" opacity="0.8" rx="4"/>
      <rect x="120" y="55" width="150" height="6" fill="${template.theme.text}" opacity="0.6" rx="3"/>
      
      <rect x="20" y="120" width="360" height="40" fill="${template.theme.text}" opacity="0.1" rx="4"/>
      <rect x="30" y="130" width="200" height="6" fill="${template.theme.text}" opacity="0.8" rx="3"/>
      <rect x="30" y="145" width="340" height="4" fill="${template.theme.text}" opacity="0.5" rx="2"/>
      
      <rect x="20" y="180" width="360" height="120" fill="${template.theme.text}" opacity="0.05" rx="4"/>
      <rect x="30" y="190" width="100" height="8" fill="${template.theme.primary}" opacity="0.8" rx="4"/>
      <rect x="30" y="210" width="340" height="4" fill="${template.theme.text}" opacity="0.6" rx="2"/>
      <rect x="30" y="225" width="300" height="4" fill="${template.theme.text}" opacity="0.6" rx="2"/>
      <rect x="30" y="240" width="280" height="4" fill="${template.theme.text}" opacity="0.6" rx="2"/>
      <rect x="30" y="270" width="340" height="4" fill="${template.theme.text}" opacity="0.6" rx="2"/>
      <rect x="30" y="285" width="250" height="4" fill="${template.theme.text}" opacity="0.6" rx="2"/>
      
      <text x="200" y="350" text-anchor="middle" fill="${template.theme.text}" opacity="0.7" font-family="system-ui" font-size="14">${template.layout.name}</text>
      <text x="200" y="370" text-anchor="middle" fill="${template.theme.primary}" opacity="0.8" font-family="system-ui" font-size="12">${template.theme.name} Theme</text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Preload template previews
export async function preloadTemplatePreview(template: GeneratedTemplate): Promise<void> {
  if (!previewCache.has(template.id)) {
    // Generate preview in background
    generateTemplatePreview(template).catch(() => {
      // Ignore errors for background preloading
    });
  }
}

// Clear preview cache
export function clearPreviewCache(): void {
  previewCache.clear();
}

// Get cached preview if available
export function getCachedPreview(templateId: string): string | null {
  return previewCache.get(templateId) || null;
}