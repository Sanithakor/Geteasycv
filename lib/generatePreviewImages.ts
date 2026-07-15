// Generate realistic template preview images
import { GeneratedTemplate } from './generateTemplates';

interface SectionStructure {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface LayoutStructure {
  header: SectionStructure;
  sections: SectionStructure[];
  sidebar?: SectionStructure;
}

export function generateTemplatePreviewSVG(template: GeneratedTemplate): string {
  const { theme, layout } = template;
  
  // Define layout-specific structures
  const layoutStructures: Record<string, LayoutStructure> = {
    'single-column': {
      header: { x: 40, y: 40, width: 320, height: 80 },
      sections: [
        { x: 40, y: 140, width: 320, height: 60 },
        { x: 40, y: 220, width: 320, height: 120 },
        { x: 40, y: 360, width: 320, height: 100 },
        { x: 40, y: 480, width: 320, height: 80 }
      ]
    },
    'two-column': {
      header: { x: 40, y: 40, width: 320, height: 60 },
      sections: [
        { x: 40, y: 120, width: 150, height: 100 },
        { x: 210, y: 120, width: 150, height: 100 },
        { x: 40, y: 240, width: 150, height: 120 },
        { x: 210, y: 240, width: 150, height: 120 }
      ]
    },
    'sidebar-left': {
      sidebar: { x: 0, y: 0, width: 120, height: 600 },
      header: { x: 140, y: 40, width: 220, height: 60 },
      sections: [
        { x: 140, y: 120, width: 220, height: 80 },
        { x: 140, y: 220, width: 220, height: 100 },
        { x: 140, y: 340, width: 220, height: 80 }
      ]
    },
    'sidebar-right': {
      sidebar: { x: 280, y: 0, width: 120, height: 600 },
      header: { x: 40, y: 40, width: 220, height: 60 },
      sections: [
        { x: 40, y: 120, width: 220, height: 80 },
        { x: 40, y: 220, width: 220, height: 100 },
        { x: 40, y: 340, width: 220, height: 80 }
      ]
    }
  };

  const structure = layoutStructures[layout.id] || layoutStructures['single-column'];
  
  const svg = `
    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme.primary}" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="${theme.primary}" stop-opacity="0.6"/>
        </linearGradient>
        <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme.background || '#ffffff'}"/>
          <stop offset="100%" stop-color="${adjustColor(theme.background || '#ffffff', -5)}"/>
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="400" height="600" fill="url(#backgroundGradient)"/>
      
      <!-- Shadow effect -->
      <rect width="400" height="600" fill="black" opacity="0.02"/>
      
      ${structure.sidebar ? `
        <!-- Sidebar -->
        <rect x="${structure.sidebar.x}" y="${structure.sidebar.y}" 
              width="${structure.sidebar.width}" height="${structure.sidebar.height}" 
              fill="url(#primaryGradient)"/>
        
        <!-- Sidebar content -->
        <circle cx="${structure.sidebar.x + structure.sidebar.width/2}" cy="80" r="25" 
                fill="white" opacity="0.3"/>
        <rect x="${structure.sidebar.x + 15}" y="120" width="${structure.sidebar.width - 30}" height="8" 
              fill="white" opacity="0.9" rx="4"/>
        <rect x="${structure.sidebar.x + 15}" y="135" width="${structure.sidebar.width - 40}" height="4" 
              fill="white" opacity="0.7" rx="2"/>
        
        <rect x="${structure.sidebar.x + 15}" y="170" width="${structure.sidebar.width - 30}" height="6" 
              fill="white" opacity="0.6" rx="3"/>
        ${Array.from({length: 4}, (_, i) => `
          <rect x="${structure.sidebar!.x + 15}" y="${190 + i * 20}" width="${structure.sidebar!.width - 35}" height="4" 
                fill="white" opacity="0.5" rx="2"/>
        `).join('')}
      ` : ''}
      
      <!-- Header -->
      <rect x="${structure.header.x}" y="${structure.header.y}" 
            width="${structure.header.width}" height="${structure.header.height}" 
            fill="${theme.primary}" opacity="0.1" rx="8"/>
      
      ${!structure.sidebar ? `
        <circle cx="${structure.header.x + 40}" cy="${structure.header.y + 40}" r="20" 
                fill="${theme.primary}" opacity="0.4"/>
      ` : ''}
      
      <rect x="${structure.header.x + (structure.sidebar ? 20 : 80)}" y="${structure.header.y + 20}" 
            width="${structure.header.width - (structure.sidebar ? 40 : 100)}" height="12" 
            fill="${theme.text || '#1f2937'}" opacity="0.9" rx="6"/>
      <rect x="${structure.header.x + (structure.sidebar ? 20 : 80)}" y="${structure.header.y + 40}" 
            width="${Math.floor((structure.header.width - (structure.sidebar ? 40 : 100)) * 0.7)}" height="8" 
            fill="${theme.text || '#1f2937'}" opacity="0.6" rx="4"/>
      
      <!-- Sections -->
      ${structure.sections.map((section, index) => `
        <g>
          <rect x="${section.x}" y="${section.y}" width="${section.width}" height="${section.height}" 
                fill="${theme.text || '#1f2937'}" opacity="0.03" rx="6"/>
          
          <!-- Section header -->
          <rect x="${section.x + 15}" y="${section.y + 15}" width="80" height="8" 
                fill="${theme.primary}" opacity="0.8" rx="4"/>
          
          <!-- Section content -->
          ${Array.from({length: Math.floor(section.height / 25) - 1}, (_, i) => `
            <rect x="${section.x + 15}" y="${section.y + 35 + i * 15}" 
                  width="${Math.floor(section.width * (0.8 - i * 0.1))}" height="4" 
                  fill="${theme.text || '#1f2937'}" opacity="${0.6 - i * 0.1}" rx="2"/>
          `).join('')}
        </g>
      `).join('')}
      
      <!-- Decorative elements based on theme -->
      ${theme.name.toLowerCase().includes('modern') ? `
        <rect x="350" y="550" width="30" height="30" fill="${theme.primary}" opacity="0.2" rx="15"/>
      ` : ''}
      
      ${theme.name.toLowerCase().includes('creative') ? `
        <polygon points="370,30 390,50 370,70 350,50" fill="${theme.primary}" opacity="0.3"/>
      ` : ''}
      
      ${theme.name.toLowerCase().includes('executive') ? `
        <rect x="20" y="20" width="360" height="2" fill="${theme.primary}" opacity="0.5"/>
        <rect x="20" y="578" width="360" height="2" fill="${theme.primary}" opacity="0.5"/>
      ` : ''}
      
      <!-- Template info -->
      <text x="200" y="580" text-anchor="middle" fill="${theme.text || '#1f2937'}" 
            opacity="0.4" font-family="system-ui" font-size="8" font-weight="600">
        ${layout.name}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

function adjustColor(color: string, amount: number): string {
  // Simple color adjustment - you might want to use a more sophisticated color library
  if (!color || !color.startsWith('#')) return color;
  
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}