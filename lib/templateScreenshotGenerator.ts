// Generate actual template screenshots for previews
import html2canvas from 'html2canvas';
import { GeneratedTemplate } from './generateTemplates';
import { sampleCV } from '../data/sampleCV';

// Cache for generated screenshots
const screenshotCache = new Map<string, string>();

export async function generateTemplateScreenshot(
  template: GeneratedTemplate,
  containerWidth: number = 400,
  containerHeight: number = 600
): Promise<string> {
  // Check cache first
  const cacheKey = `${template.id}-${containerWidth}x${containerHeight}`;
  if (screenshotCache.has(cacheKey)) {
    return screenshotCache.get(cacheKey)!;
  }

  try {
    // Create temporary container for rendering
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '800px';
    tempContainer.style.height = '1132px'; // A4 proportion
    tempContainer.style.backgroundColor = '#ffffff';
    tempContainer.style.overflow = 'hidden';
    tempContainer.style.zIndex = '-1000';
    
    document.body.appendChild(tempContainer);

    // Import React and components
    const React = await import('react');
    const ReactDOM = await import('react-dom/client');
    const { TemplateRenderer } = await import('../components/cv');
    
    // Create root and render template
    const root = ReactDOM.createRoot(tempContainer);
    
    // Render the actual template
    root.render(
      React.createElement(TemplateRenderer, {
        template: template,
        data: sampleCV,
        scale: 1
      })
    );

    // Wait for rendering to complete
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Ensure fonts are loaded
    await document.fonts?.ready;
    await new Promise(resolve => setTimeout(resolve, 500));

    // Capture screenshot using html2canvas
    const canvas = await html2canvas(tempContainer, {
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: 800,
      height: 1132,
    });

    // Convert to data URL
    const dataUrl = canvas.toDataURL('image/png', 0.8);
    
    // Cache the result
    screenshotCache.set(cacheKey, dataUrl);
    
    // Clean up
    root.unmount();
    document.body.removeChild(tempContainer);
    
    return dataUrl;
  } catch (error) {
    console.error('Failed to generate template screenshot:', error);
    
    // Return fallback if screenshot fails
    return generateFallbackImage(template);
  }
}

function generateFallbackImage(template: GeneratedTemplate): string {
  // Create a simple canvas-based fallback
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  // Background
  ctx.fillStyle = template.theme.background || '#ffffff';
  ctx.fillRect(0, 0, 400, 600);
  
  // Header area
  ctx.fillStyle = template.theme.primary + '20'; // 20% opacity
  ctx.fillRect(20, 20, 360, 80);
  
  // Template name
  ctx.fillStyle = template.theme.text || '#1f2937';
  ctx.font = 'bold 16px system-ui';
  ctx.textAlign = 'center';
  ctx.fillText(template.layout.name, 200, 300);
  
  ctx.font = '12px system-ui';
  ctx.fillStyle = template.theme.primary || '#0891b2';
  ctx.fillText(template.theme.name + ' Theme', 200, 320);
  
  return canvas.toDataURL('image/png', 0.8);
}

// Preload screenshot for better UX
export async function preloadTemplateScreenshot(template: GeneratedTemplate): Promise<void> {
  const cacheKey = `${template.id}-400x600`;
  if (!screenshotCache.has(cacheKey)) {
    // Generate in background without waiting
    generateTemplateScreenshot(template).catch(() => {
      // Ignore errors for background generation
    });
  }
}

// Clear screenshot cache
export function clearScreenshotCache(): void {
  screenshotCache.clear();
}

// Get cached screenshot if available
export function getCachedScreenshot(templateId: string): string | null {
  const cacheKey = `${templateId}-400x600`;
  return screenshotCache.get(cacheKey) || null;
}