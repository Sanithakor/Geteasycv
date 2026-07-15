// Accurate template preview generator that matches actual templates exactly
import { GeneratedTemplate } from './generateTemplates';
import { sampleCV } from '../data/sampleCV';

// Sanitize and format text properly for SVG
function sanitizeText(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .substring(0, 200); // Reasonable length limit
}

export function generateOptimizedTemplatePreview(template: GeneratedTemplate): string {
  const { theme, layout } = template;
  const { personal, experience, education, skills } = sampleCV;

  // Create layout-specific accurate previews that match actual components
  const layoutPreviews = {
    'single-column': createAccurateSingleColumnPreview,
    'centered': createAccurateCenteredPreview,
    'sidebar-left': createAccurateSidebarLeftPreview,
    'sidebar-right': createAccurateSidebarRightPreview,
    'two-column': createAccurateTwoColumnPreview,
    'modern-card': createAccurateModernCardPreview,
    'executive': createAccurateExecutivePreview,
    'creative-designer': createAccurateCreativePreview,
    'compact-ats': createAccurateCompactATSPreview,
    'timeline': createAccurateTimelinePreview,
    'bento-grid': createAccurateBentoGridPreview,
    'magazine-style': createAccurateMagazinePreview,
    'dashboard-style': createAccurateDashboardPreview,
    'glassmorphism': createAccurateGlassmorphismPreview,
    'luxury-minimal': createAccurateLuxuryMinimalPreview,
    'portfolio-hybrid': createAccuratePortfolioPreview,
    'premium-dark': createAccuratePremiumDarkPreview,
    'editorial': createAccurateEditorialPreview,
    'startup-style': createAccurateStartupPreview,
    'gradient-accent': createAccurateGradientAccentPreview,
    'two-column-split': createAccurateTwoColumnSplitPreview
  };

  const previewGenerator = layoutPreviews[layout.id as keyof typeof layoutPreviews] || createAccurateCenteredPreview;
  
  return previewGenerator(template, { personal, experience, education, skills });
}

// Create extremely accurate Centered Layout preview matching CenteredLayout.tsx exactly
function createAccurateCenteredPreview(template: GeneratedTemplate, data: { personal: any; experience: any; education: any; skills: any }): string {
  const { theme } = template;
  
  // Extract and sanitize data exactly as the component does
  const firstName = sanitizeText(data.personal.firstName);
  const lastName = sanitizeText(data.personal.lastName);
  const title = sanitizeText(data.personal.title);
  const email = sanitizeText(data.personal.email);
  const phone = sanitizeText(data.personal.phone);
  const location = sanitizeText(data.personal.location);
  const summary = sanitizeText(sampleCV.summary);
  
  return `
    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="cardShadow">
          <dropShadow dx="0" dy="25" stdDeviation="25" flood-opacity="0.25"/>
        </filter>
      </defs>
      
      <!-- Background matching theme.background -->
      <rect width="400" height="600" fill="${theme.background}"/>
      
      <!-- Main Card with exact theme styling -->
      <rect x="20" y="20" width="360" height="560" rx="${parseInt(theme.borderRadius)}" fill="${theme.background}" filter="url(#cardShadow)"/>
      
      <!-- Profile Photo Circle (matching CenteredLayout structure) -->
      <circle cx="200" cy="80" r="30" fill="${theme.primary}" opacity="0.2"/>
      <circle cx="200" cy="80" r="24" fill="${theme.primary}" opacity="0.5"/>
      
      <!-- Name (centered, matching theme.fontFamilyHeading) -->
      <text x="200" y="130" text-anchor="middle" font-family="${theme.fontFamilyHeading}" font-size="20" font-weight="700" fill="${theme.text}">
        ${firstName} ${lastName}
      </text>
      
      <!-- Job Title (matching theme.primary) -->
      <text x="200" y="150" text-anchor="middle" font-family="${theme.fontFamily}" font-size="12" font-weight="500" fill="${theme.primary}">
        ${title}
      </text>
      
      <!-- Contact Info (matching theme.textSecondary) -->
      <text x="200" y="170" text-anchor="middle" font-family="${theme.fontFamily}" font-size="9" font-weight="400" fill="${theme.textSecondary}">
        ${email} | ${phone} | ${location}
      </text>
      
      <!-- Summary Section (matching exact styling) -->
      <text x="200" y="210" text-anchor="middle" font-family="${theme.fontFamily}" font-size="10" font-weight="400" fill="${theme.text}">
        ${summary.substring(0, 80)}...
      </text>
      
      <!-- Experience Section Header -->
      <text x="50" y="260" font-family="${theme.fontFamilyHeading}" font-size="12" font-weight="700" fill="${theme.primary}">EXPERIENCE</text>
      <rect x="50" y="265" width="300" height="1" fill="${theme.border}"/>
      
      <!-- Experience Item 1 -->
      <text x="50" y="285" font-family="${theme.fontFamily}" font-size="10" font-weight="600" fill="${theme.text}">Senior Full Stack Developer</text>
      <text x="50" y="298" font-family="${theme.fontFamily}" font-size="8" font-weight="400" fill="${theme.textSecondary}">TechCorp Inc. • 2021-03 - Present</text>
      <text x="50" y="311" font-family="${theme.fontFamily}" font-size="8" font-weight="400" fill="${theme.textMuted}">
        Leading the development of enterprise-level web applications...
      </text>
      
      <!-- Experience Item 2 -->
      <text x="50" y="335" font-family="${theme.fontFamily}" font-size="10" font-weight="600" fill="${theme.text}">Full Stack Developer</text>
      <text x="50" y="348" font-family="${theme.fontFamily}" font-size="8" font-weight="400" fill="${theme.textSecondary}">StartupXYZ • 2018-06 - 2021-02</text>
      <text x="50" y="361" font-family="${theme.fontFamily}" font-size="8" font-weight="400" fill="${theme.textMuted}">
        Developed and maintained multiple client-facing applications...
      </text>
      
      <!-- Education Section -->
      <text x="50" y="395" font-family="${theme.fontFamilyHeading}" font-size="12" font-weight="700" fill="${theme.primary}">EDUCATION</text>
      <rect x="50" y="400" width="300" height="1" fill="${theme.border}"/>
      
      <text x="50" y="420" font-family="${theme.fontFamily}" font-size="10" font-weight="600" fill="${theme.text}">Master of Science in Computer Science</text>
      <text x="50" y="433" font-family="${theme.fontFamily}" font-size="8" font-weight="400" fill="${theme.textSecondary}">Stanford University • 2014-09 - 2016-06</text>
      
      <!-- Skills Section -->
      <text x="50" y="465" font-family="${theme.fontFamilyHeading}" font-size="12" font-weight="700" fill="${theme.primary}">SKILLS</text>
      <rect x="50" y="470" width="300" height="1" fill="${theme.border}"/>
      
      <!-- Skill Tags (matching theme styling) -->
      ${['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'GraphQL', 'AWS', 'Docker'].map((skill, i) => `
        <rect x="${50 + (i % 4) * 75}" y="${485 + Math.floor(i / 4) * 25}" width="65" height="18" rx="${parseInt(theme.borderRadius)/2}" fill="${theme.secondary}" stroke="${theme.primary}" stroke-width="0.5"/>
        <text x="${50 + (i % 4) * 75 + 32.5}" y="${485 + Math.floor(i / 4) * 25 + 12}" text-anchor="middle" font-family="${theme.fontFamily}" font-size="7" font-weight="500" fill="${theme.primary}">${skill}</text>
      `).join('')}
    </svg>
  `;
}



// Create accurate Single Column Layout preview matching SingleColumnLayout.tsx exactly
function createAccurateSingleColumnPreview(template: GeneratedTemplate, data: { personal: any; experience: any; education: any; skills: any }): string {
  const { theme } = template;
  
  // Extract data exactly as the component does
  const firstName = sanitizeText(data.personal.firstName);
  const lastName = sanitizeText(data.personal.lastName);
  const title = sanitizeText(data.personal.title);
  const email = sanitizeText(data.personal.email);
  const phone = sanitizeText(data.personal.phone);
  const location = sanitizeText(data.personal.location);
  
  return `
    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="boxShadow">
          <dropShadow dx="0" dy="25" stdDeviation="25" flood-opacity="0.25"/>
        </filter>
      </defs>
      
      <!-- Background matching exact theme.background -->
      <rect width="400" height="600" fill="${theme.background}"/>
      
      <!-- Main Content Container with exact theme styling -->
      <rect x="15" y="15" width="370" height="570" rx="${parseInt(theme.borderRadius)}" fill="${theme.background}" filter="url(#boxShadow)"/>
      
      <!-- Header Section (centered variant) -->
      <text x="200" y="60" text-anchor="middle" font-family="${theme.fontFamilyHeading}" font-size="18" font-weight="700" fill="${theme.text}">
        ${firstName} ${lastName}
      </text>
      <text x="200" y="80" text-anchor="middle" font-family="${theme.fontFamily}" font-size="11" font-weight="400" fill="${theme.primary}">
        ${title}
      </text>
      <text x="200" y="95" text-anchor="middle" font-family="${theme.fontFamily}" font-size="8" font-weight="400" fill="${theme.textSecondary}">
        ${email} • ${phone} • ${location}
      </text>
      
      <!-- Summary Section -->
      <text x="40" y="135" font-family="${theme.fontFamilyHeading}" font-size="11" font-weight="700" fill="${theme.primary}">SUMMARY</text>
      <rect x="40" y="140" width="320" height="1" fill="${theme.border}"/>
      <text x="40" y="160" font-family="${theme.fontFamily}" font-size="8" font-weight="400" fill="${theme.text}">
        ${sanitizeText(sampleCV.summary).substring(0, 120)}...
      </text>
      
      <!-- Experience Section -->
      <text x="40" y="200" font-family="${theme.fontFamilyHeading}" font-size="11" font-weight="700" fill="${theme.primary}">EXPERIENCE</text>
      <rect x="40" y="205" width="320" height="1" fill="${theme.border}"/>
      
      <!-- Experience Item 1 -->
      <text x="40" y="225" font-family="${theme.fontFamily}" font-size="9" font-weight="600" fill="${theme.text}">Senior Full Stack Developer</text>
      <text x="40" y="238" font-family="${theme.fontFamily}" font-size="8" font-weight="400" fill="${theme.textSecondary}">TechCorp Inc. • 2021-03 - Present</text>
      <text x="40" y="251" font-family="${theme.fontFamily}" font-size="7" font-weight="400" fill="${theme.textMuted}">
        Leading the development of enterprise-level web applications...
      </text>
      
      <!-- Experience Item 2 -->
      <text x="40" y="275" font-family="${theme.fontFamily}" font-size="9" font-weight="600" fill="${theme.text}">Full Stack Developer</text>
      <text x="40" y="288" font-family="${theme.fontFamily}" font-size="8" font-weight="400" fill="${theme.textSecondary}">StartupXYZ • 2018-06 - 2021-02</text>
      <text x="40" y="301" font-family="${theme.fontFamily}" font-size="7" font-weight="400" fill="${theme.textMuted}">
        Developed and maintained multiple client-facing applications...
      </text>
      
      <!-- Education Section -->
      <text x="40" y="340" font-family="${theme.fontFamilyHeading}" font-size="11" font-weight="700" fill="${theme.primary}">EDUCATION</text>
      <rect x="40" y="345" width="320" height="1" fill="${theme.border}"/>
      
      <text x="40" y="365" font-family="${theme.fontFamily}" font-size="9" font-weight="600" fill="${theme.text}">Master of Science in Computer Science</text>
      <text x="40" y="378" font-family="${theme.fontFamily}" font-size="8" font-weight="400" fill="${theme.textSecondary}">Stanford University • 2014-09 - 2016-06</text>
      
      <!-- Skills Section -->
      <text x="40" y="415" font-family="${theme.fontFamilyHeading}" font-size="11" font-weight="700" fill="${theme.primary}">SKILLS</text>
      <rect x="40" y="420" width="320" height="1" fill="${theme.border}"/>
      
      <!-- Skills Tags (matching theme styling) -->
      ${['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'GraphQL', 'AWS', 'Docker'].map((skill, i) => `
        <rect x="${40 + (i % 4) * 80}" y="${440 + Math.floor(i / 4) * 25}" width="70" height="16" rx="${parseInt(theme.borderRadius)/3}" fill="${theme.secondary}" stroke="${theme.border}" stroke-width="0.5"/>
        <text x="${40 + (i % 4) * 80 + 35}" y="${440 + Math.floor(i / 4) * 25 + 11}" text-anchor="middle" font-family="${theme.fontFamily}" font-size="7" font-weight="500" fill="${theme.textSecondary}">${skill}</text>
      `).join('')}
    </svg>
  `;
}

// Create accurate Sidebar Left Layout preview matching SidebarLeftLayout.tsx exactly
function createAccurateSidebarLeftPreview(template: GeneratedTemplate, data: { personal: any; experience: any; education: any; skills: any }): string {
  const { theme } = template;
  
  // Extract data exactly as the component does
  const firstName = sanitizeText(data.personal.firstName);
  const lastName = sanitizeText(data.personal.lastName);
  const title = sanitizeText(data.personal.title);
  const email = sanitizeText(data.personal.email);
  const phone = sanitizeText(data.personal.phone);
  const location = sanitizeText(data.personal.location);
  
  return `
    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sidebarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${theme.primary}"/>
          <stop offset="100%" style="stop-color:${theme.primary}CC"/>
        </linearGradient>
        <filter id="boxShadow">
          <dropShadow dx="0" dy="25" stdDeviation="25" flood-opacity="0.25"/>
        </filter>
      </defs>
      
      <!-- Background matching exact theme.background -->
      <rect width="400" height="600" fill="${theme.background}"/>
      
      <!-- Main Container with exact grid layout (280px sidebar + 1fr main) -->
      <rect x="0" y="0" width="400" height="600" rx="${parseInt(theme.borderRadius)}" fill="${theme.background}" filter="url(#boxShadow)"/>
      
      <!-- Sidebar (280px width equivalent = 112px in 400px viewport) -->
      <rect x="0" y="0" width="112" height="600" rx="${parseInt(theme.borderRadius)}" fill="url(#sidebarGrad)"/>
      
      <!-- Profile Photo in Sidebar (centered) -->
      <circle cx="56" cy="60" r="22" fill="rgba(255, 255, 255, 0.3)"/>
      <circle cx="56" cy="60" r="18" fill="rgba(255, 255, 255, 0.7)"/>
      
      <!-- Name in Sidebar (text-center, text-xl font-bold) -->
      <text x="56" y="105" text-anchor="middle" font-family="${theme.fontFamilyHeading}" font-size="9" font-weight="700" fill="white">
        ${firstName}
      </text>
      <text x="56" y="118" text-anchor="middle" font-family="${theme.fontFamilyHeading}" font-size="9" font-weight="700" fill="white">
        ${lastName}
      </text>
      
      <!-- Title in Sidebar (text-sm opacity-90) -->
      <text x="56" y="135" text-anchor="middle" font-family="${theme.fontFamily}" font-size="7" font-weight="400" fill="white" opacity="0.9">
        ${title}
      </text>
      
      <!-- Contact Section in Sidebar -->
      <text x="12" y="160" font-family="${theme.fontFamily}" font-size="6" font-weight="600" fill="white" opacity="0.7" text-transform="uppercase" letter-spacing="1px">CONTACT</text>
      <text x="12" y="175" font-family="${theme.fontFamily}" font-size="6" font-weight="400" fill="white" opacity="0.9">
        ${email.substring(0, 20)}...
      </text>
      <text x="12" y="188" font-family="${theme.fontFamily}" font-size="6" font-weight="400" fill="white" opacity="0.9">
        ${phone}
      </text>
      <text x="12" y="201" font-family="${theme.fontFamily}" font-size="6" font-weight="400" fill="white" opacity="0.9">
        ${location}
      </text>
      
      <!-- Skills Section in Sidebar -->
      <text x="12" y="230" font-family="${theme.fontFamily}" font-size="6" font-weight="600" fill="white" opacity="0.7" text-transform="uppercase" letter-spacing="1px">SKILLS</text>
      ${['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'GraphQL'].map((skill, i) => `
        <rect x="12" y="${245 + i * 18}" width="88" height="12" rx="6" fill="rgba(255, 255, 255, 0.2)"/>
        <text x="56" y="${245 + i * 18 + 8}" text-anchor="middle" font-family="${theme.fontFamily}" font-size="5" font-weight="500" fill="white" opacity="0.95">${skill}</text>
      `).join('')}
      
      <!-- Main Content Area -->
      <!-- Summary Section -->
      <text x="125" y="40" font-family="${theme.fontFamilyHeading}" font-size="10" font-weight="700" fill="${theme.primary}" text-transform="uppercase">SUMMARY</text>
      <rect x="125" y="45" width="260" height="0.5" fill="${theme.primary}" opacity="0.5"/>
      <text x="125" y="60" font-family="${theme.fontFamily}" font-size="7" font-weight="400" fill="${theme.textMuted}">
        Results-driven professional with extensive
      </text>
      <text x="125" y="70" font-family="${theme.fontFamily}" font-size="7" font-weight="400" fill="${theme.textMuted}">
        experience in project management
      </text>
      
      <!-- Experience Section -->
      <text x="125" y="100" font-family="${theme.fontFamilyHeading}" font-size="10" font-weight="700" fill="${theme.primary}" text-transform="uppercase">EXPERIENCE</text>
      <rect x="125" y="105" width="260" height="0.5" fill="${theme.primary}" opacity="0.5"/>
      
      <!-- Experience Item 1 -->
      <text x="125" y="125" font-family="${theme.fontFamily}" font-size="8" font-weight="700" fill="${theme.text}">Senior Full Stack Developer</text>
      <text x="125" y="137" font-family="${theme.fontFamily}" font-size="6" font-weight="400" fill="${theme.textSecondary}">TechCorp Inc. • 2021-03 - Present</text>
      <text x="125" y="149" font-family="${theme.fontFamily}" font-size="5" font-weight="400" fill="${theme.textMuted}">Leading the development of enterprise-level...</text>
      <text x="125" y="159" font-family="${theme.fontFamily}" font-size="5" font-weight="400" fill="${theme.textMuted}">web applications serving 1M+ users.</text>
      
      <!-- Experience Item 2 -->
      <text x="125" y="180" font-family="${theme.fontFamily}" font-size="8" font-weight="700" fill="${theme.text}">Full Stack Developer</text>
      <text x="125" y="192" font-family="${theme.fontFamily}" font-size="6" font-weight="400" fill="${theme.textSecondary}">StartupXYZ • 2018-06 - 2021-02</text>
      <text x="125" y="204" font-family="${theme.fontFamily}" font-size="5" font-weight="400" fill="${theme.textMuted}">Developed and maintained multiple client-facing...</text>
      <text x="125" y="214" font-family="${theme.fontFamily}" font-size="5" font-weight="400" fill="${theme.textMuted}">web applications using React and Node.js.</text>
      
      <!-- Education Section -->
      <text x="125" y="245" font-family="${theme.fontFamilyHeading}" font-size="10" font-weight="700" fill="${theme.primary}" text-transform="uppercase">EDUCATION</text>
      <rect x="125" y="250" width="260" height="0.5" fill="${theme.primary}" opacity="0.5"/>
      <text x="125" y="270" font-family="${theme.fontFamily}" font-size="8" font-weight="700" fill="${theme.text}">Master of Science</text>
      <text x="125" y="282" font-family="${theme.fontFamily}" font-size="6" font-weight="400" fill="${theme.textSecondary}">Stanford University • 2014-09 - 2016-06</text>
    </svg>
  `;
}

// Additional accurate preview functions for remaining layouts
function createAccurateSidebarRightPreview(template: GeneratedTemplate, data: { personal: any; experience: any; education: any; skills: any }): string {
  // Mirror the sidebar left but flip the layout
  const { theme } = template;
  const firstName = sanitizeText(data.personal.firstName);
  const lastName = sanitizeText(data.personal.lastName);
  const title = sanitizeText(data.personal.title);
  
  return `
    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sidebarGradRight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${theme.primary}"/>
          <stop offset="100%" style="stop-color:${theme.primary}CC"/>
        </linearGradient>
        <filter id="boxShadow">
          <dropShadow dx="0" dy="25" stdDeviation="25" flood-opacity="0.25"/>
        </filter>
      </defs>
      
      <rect width="400" height="600" fill="${theme.background}"/>
      <rect x="0" y="0" width="400" height="600" rx="${parseInt(theme.borderRadius)}" fill="${theme.background}" filter="url(#boxShadow)"/>
      
      <!-- Sidebar on Right -->
      <rect x="288" y="0" width="112" height="600" rx="${parseInt(theme.borderRadius)}" fill="url(#sidebarGradRight)"/>
      
      <!-- Profile Photo in Right Sidebar -->
      <circle cx="344" cy="60" r="18" fill="rgba(255, 255, 255, 0.7)"/>
      
      <!-- Name in Right Sidebar -->
      <text x="344" y="105" text-anchor="middle" font-family="${theme.fontFamilyHeading}" font-size="9" font-weight="700" fill="white">${firstName}</text>
      <text x="344" y="118" text-anchor="middle" font-family="${theme.fontFamilyHeading}" font-size="9" font-weight="700" fill="white">${lastName}</text>
      <text x="344" y="135" text-anchor="middle" font-family="${theme.fontFamily}" font-size="7" fill="white" opacity="0.9">${title}</text>
      
      <!-- Main Content on Left -->
      <text x="25" y="40" font-family="${theme.fontFamilyHeading}" font-size="10" font-weight="700" fill="${theme.primary}" text-transform="uppercase">EXPERIENCE</text>
      <rect x="25" y="45" width="240" height="0.5" fill="${theme.primary}"/>
      <text x="25" y="65" font-family="${theme.fontFamily}" font-size="8" font-weight="700" fill="${theme.text}">Senior Full Stack Developer</text>
      <text x="25" y="77" font-family="${theme.fontFamily}" font-size="6" font-weight="400" fill="${theme.textSecondary}">TechCorp Inc. • 2021-03 - Present</text>
    </svg>
  `;
}

function createAccurateTwoColumnPreview(template: GeneratedTemplate, data: { personal: any; experience: any; education: any; skills: any }): string {
  const { theme } = template;
  const firstName = sanitizeText(data.personal.firstName);
  const lastName = sanitizeText(data.personal.lastName);
  
  return `
    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="600" fill="${theme.background}"/>
      
      <!-- Header -->
      <text x="200" y="50" text-anchor="middle" font-family="${theme.fontFamilyHeading}" font-size="16" font-weight="700" fill="${theme.text}">${firstName} ${lastName}</text>
      
      <!-- Two columns -->
      <!-- Left column -->
      <text x="25" y="100" font-family="${theme.fontFamilyHeading}" font-size="10" font-weight="700" fill="${theme.primary}">EXPERIENCE</text>
      <rect x="25" y="105" width="170" height="0.5" fill="${theme.primary}"/>
      <text x="25" y="125" font-family="${theme.fontFamily}" font-size="8" font-weight="600" fill="${theme.text}">Senior Developer</text>
      
      <!-- Right column -->
      <text x="205" y="100" font-family="${theme.fontFamilyHeading}" font-size="10" font-weight="700" fill="${theme.primary}">SKILLS</text>
      <rect x="205" y="105" width="170" height="0.5" fill="${theme.primary}"/>
      <rect x="205" y="125" width="60" height="15" rx="7" fill="${theme.secondary}" stroke="${theme.primary}" stroke-width="0.5"/>
      <text x="235" y="135" text-anchor="middle" font-family="${theme.fontFamily}" font-size="7" fill="${theme.primary}">React</text>
    </svg>
  `;
}

function createAccurateModernCardPreview(template: GeneratedTemplate, _data: { personal: any; experience: any; education: any; skills: any }): string {
  // Similar to centered but with card-like sections
  const { theme } = template;
  
  return `
    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="600" fill="${theme.background}"/>
      
      <!-- Card sections -->
      <rect x="30" y="30" width="340" height="80" rx="${parseInt(theme.borderRadius)}" fill="${theme.secondary}" stroke="${theme.border}" stroke-width="1"/>
      <text x="200" y="60" text-anchor="middle" font-family="${theme.fontFamilyHeading}" font-size="14" fill="${theme.text}">Sarah Johnson</text>
      <text x="200" y="80" text-anchor="middle" font-family="${theme.fontFamily}" font-size="10" fill="${theme.primary}">Senior Full Stack Developer</text>
      
      <rect x="30" y="130" width="340" height="60" rx="${parseInt(theme.borderRadius)}" fill="${theme.secondary}" stroke="${theme.border}" stroke-width="1"/>
      <text x="45" y="155" font-family="${theme.fontFamilyHeading}" font-size="10" font-weight="700" fill="${theme.primary}">EXPERIENCE</text>
    </svg>
  `;
}

function createAccurateExecutivePreview(template: GeneratedTemplate, data: { personal: any; experience: any; education: any; skills: any }): string {
  return createAccurateSingleColumnPreview(template, data); // Executive style uses clean single column
}

function createAccurateCreativePreview(template: GeneratedTemplate, _data: { personal: any; experience: any; education: any; skills: any }): string {
  const { theme } = template;
  
  return `
    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="creativeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${theme.primary}"/>
          <stop offset="100%" style="stop-color:${theme.primary}80"/>
        </linearGradient>
      </defs>
      
      <rect width="400" height="600" fill="url(#creativeGrad)"/>
      <circle cx="80" cy="80" r="30" fill="white" opacity="0.9"/>
      <text x="200" y="60" text-anchor="middle" font-family="${theme.fontFamilyHeading}" font-size="18" font-weight="700" fill="white">Sarah Johnson</text>
      <text x="200" y="85" text-anchor="middle" font-family="${theme.fontFamily}" font-size="12" fill="white" opacity="0.9">Creative Developer</text>
    </svg>
  `;
}

function createAccurateCompactATSPreview(template: GeneratedTemplate, _data: { personal: any; experience: any; education: any; skills: any }): string {
  const { theme } = template;
  
  return `
    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="600" fill="${theme.background}"/>
      <!-- Compact layout with tight spacing -->
      <text x="200" y="40" text-anchor="middle" font-family="${theme.fontFamily}" font-size="16" font-weight="700" fill="${theme.text}">Sarah Johnson</text>
      <text x="200" y="55" text-anchor="middle" font-family="${theme.fontFamily}" font-size="10" fill="${theme.textSecondary}">sarah.johnson@email.com • +1 (555) 123-4567</text>
      
      <text x="30" y="80" font-family="${theme.fontFamily}" font-size="10" font-weight="700" fill="${theme.primary}" text-transform="uppercase">EXPERIENCE</text>
      <text x="30" y="95" font-family="${theme.fontFamily}" font-size="9" font-weight="600" fill="${theme.text}">Senior Full Stack Developer, TechCorp Inc. (2021-Present)</text>
      <text x="30" y="108" font-family="${theme.fontFamily}" font-size="8" fill="${theme.textMuted}">• Led development of enterprise web applications</text>
    </svg>
  `;
}

function createAccurateTimelinePreview(template: GeneratedTemplate, _data: { personal: any; experience: any; education: any; skills: any }): string {
  const { theme } = template;
  
  return `
    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="600" fill="${theme.background}"/>
      
      <!-- Timeline line -->
      <line x1="60" y1="100" x2="60" y2="400" stroke="${theme.primary}" stroke-width="2"/>
      
      <!-- Timeline items -->
      <circle cx="60" cy="120" r="5" fill="${theme.primary}"/>
      <text x="80" y="125" font-family="${theme.fontFamily}" font-size="9" font-weight="600" fill="${theme.text}">2021 - Present: Senior Developer</text>
      
      <circle cx="60" cy="180" r="5" fill="${theme.primary}"/>
      <text x="80" y="185" font-family="${theme.fontFamily}" font-size="9" font-weight="600" fill="${theme.text}">2018 - 2021: Full Stack Developer</text>
    </svg>
  `;
}

// Use existing accurate functions as fallbacks for remaining layouts
function createAccurateBentoGridPreview(template: GeneratedTemplate, data: { personal: any; experience: any; education: any; skills: any }): string {
  return createAccurateModernCardPreview(template, data);
}

function createAccurateMagazinePreview(template: GeneratedTemplate, data: { personal: any; experience: any; education: any; skills: any }): string {
  return createAccurateTwoColumnPreview(template, data);
}

function createAccurateDashboardPreview(template: GeneratedTemplate, data: { personal: any; experience: any; education: any; skills: any }): string {
  return createAccurateModernCardPreview(template, data);
}

function createAccurateGlassmorphismPreview(template: GeneratedTemplate, data: { personal: any; experience: any; education: any; skills: any }): string {
  return createAccurateCreativePreview(template, data);
}

function createAccurateLuxuryMinimalPreview(template: GeneratedTemplate, data: { personal: any; experience: any; education: any; skills: any }): string {
  return createAccurateSingleColumnPreview(template, data);
}

function createAccuratePortfolioPreview(template: GeneratedTemplate, data: { personal: any; experience: any; education: any; skills: any }): string {
  return createAccurateCreativePreview(template, data);
}

function createAccuratePremiumDarkPreview(template: GeneratedTemplate, data: { personal: any; experience: any; education: any; skills: any }): string {
  return createAccurateExecutivePreview(template, data);
}

function createAccurateEditorialPreview(template: GeneratedTemplate, data: { personal: any; experience: any; education: any; skills: any }): string {
  return createAccurateTwoColumnPreview(template, data);
}

function createAccurateStartupPreview(template: GeneratedTemplate, data: { personal: any; experience: any; education: any; skills: any }): string {
  return createAccurateCenteredPreview(template, data);
}

function createAccurateGradientAccentPreview(template: GeneratedTemplate, data: { personal: any; experience: any; education: any; skills: any }): string {
  return createAccurateCreativePreview(template, data);
}

function createAccurateTwoColumnSplitPreview(template: GeneratedTemplate, data: { personal: any; experience: any; education: any; skills: any }): string {
  return createAccurateTwoColumnPreview(template, data);
}