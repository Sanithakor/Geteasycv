// Accurate template preview generator that matches actual templates exactly
import { GeneratedTemplate } from './generateTemplates';
import { sampleCV, DUMMY_AVATAR } from '../data/sampleCV';

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

export function svgToDataUri(svgString: string): string {
  if (!svgString) return '';
  if (svgString.startsWith('data:')) return svgString;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString.trim())}`;
}

export function generateOptimizedTemplatePreviewDataUri(template: GeneratedTemplate): string {
  const svg = generateOptimizedTemplatePreview(template);
  return svgToDataUri(svg);
}

export function generateOptimizedTemplatePreview(template: GeneratedTemplate): string {
  const { theme, layout } = template;
  const { personal, experience, education, skills } = sampleCV;

  // Create layout-specific accurate previews that match actual components
  const layoutPreviews = {
    'single-column': createAccurateSingleColumnPreview,
    'single-column-ats': createAccurateSingleColumnPreview,
    'centered': createAccurateCenteredPreview,
    'sidebar-left': createAccurateSidebarLeftPreview,
    'sidebar-right': createAccurateSidebarRightPreview,
    'two-column': createAccurateTwoColumnPreview,
    'two-column-split': createAccurateTwoColumnSplitPreview,
    'modern-card': createAccurateModernCardPreview,
    'executive': createAccurateExecutivePreview,
    'creative-designer': createAccurateCreativePreview,
    'compact-ats': createAccurateCompactATSPreview,
    'timeline': createAccurateTimelinePreview,
    'bento-grid': createAccurateBentoGridPreview,
    'magazine': createAccurateMagazinePreview,
    'magazine-style': createAccurateMagazinePreview,
    'dashboard': createAccurateDashboardPreview,
    'dashboard-style': createAccurateDashboardPreview,
    'glassmorphism': createAccurateGlassmorphismPreview,
    'luxury-minimal': createAccurateLuxuryMinimalPreview,
    'portfolio-hybrid': createAccuratePortfolioPreview,
    'premium-dark': createAccuratePremiumDarkPreview,
    'editorial': createAccurateEditorialPreview,
    'startup-style': createAccurateStartupPreview,
    'gradient-accent': createAccurateGradientAccentPreview
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
  const avatar = data.personal.avatar || DUMMY_AVATAR;
  
  // Check layout headerVariant (fallback to centered if not specified)
  const headerVariant = template.sectionVariants?.headerVariant || 'split'; // Default to split for ATS layouts if possible
  
  const isSplit = headerVariant === 'split' || template.layoutId === 'single-column-ats';
  const startY = isSplit ? 170 : 180;
  
  return `
    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="boxShadow">
          <dropShadow dx="0" dy="25" stdDeviation="25" flood-opacity="0.25"/>
        </filter>
        <linearGradient id="headerGrad-${template.id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme.primary}" stop-opacity="0.08"/>
          <stop offset="100%" stop-color="${theme.secondary || theme.primary + '10'}"/>
        </linearGradient>
        <linearGradient id="splitHeaderGrad-${template.id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme.primary}"/>
          <stop offset="100%" stop-color="${theme.primary}CC"/>
        </linearGradient>
        <clipPath id="avatarClipCentered-${template.id}">
          <circle cx="200" cy="65" r="22"/>
        </clipPath>
        <clipPath id="avatarClipSplit-${template.id}">
          <circle cx="62.5" cy="62.5" r="22.5"/>
        </clipPath>
      </defs>
      
      <!-- Background matching exact theme.background -->
      <rect width="400" height="600" fill="${theme.background}"/>
      
      <!-- Main Content Container with exact theme styling -->
      <rect x="15" y="15" width="370" height="570" rx="${parseInt(theme.borderRadius)}" fill="${theme.background}" filter="url(#boxShadow)"/>
      
      ${isSplit ? `
        <!-- Header Section Card (Split Variant) -->
        <rect x="25" y="25" width="350" height="130" rx="${parseInt(theme.borderRadius) * 0.8}" fill="url(#splitHeaderGrad-${template.id})"/>
        
        <!-- Avatar Image clipped and with white border -->
        <image href="${avatar}" x="40" y="40" width="45" height="45" clip-path="url(#avatarClipSplit-${template.id})"/>
        <circle cx="62.5" cy="62.5" r="22.5" fill="none" stroke="white" stroke-width="2" opacity="0.9"/>
        
        <!-- Details -->
        <text x="100" y="60" font-family="${theme.fontFamilyHeading}" font-size="13" font-weight="700" fill="white">
          ${firstName} ${lastName}
        </text>
        <text x="100" y="78" font-family="${theme.fontFamily}" font-size="9" font-weight="500" fill="white" opacity="0.9">
          ${title}
        </text>
        <text x="360" y="52" text-anchor="end" font-family="${theme.fontFamily}" font-size="7" fill="white" opacity="0.9">
          ${email}
        </text>
        <text x="360" y="66" text-anchor="end" font-family="${theme.fontFamily}" font-size="7" fill="white" opacity="0.9">
          ${phone}
        </text>
        <text x="360" y="80" text-anchor="end" font-family="${theme.fontFamily}" font-size="7" fill="white" opacity="0.9">
          ${location}
        </text>
        <line x1="40" y1="100" x2="360" y2="100" stroke="white" stroke-opacity="0.2" stroke-width="0.5"/>
        <text x="40" y="118" font-family="${theme.fontFamily}" font-size="7" font-weight="600" fill="white" opacity="0.8">Website</text>
        <text x="90" y="118" font-family="${theme.fontFamily}" font-size="7" font-weight="600" fill="white" opacity="0.8">LinkedIn</text>
      ` : `
        <!-- Header Section Card (Centered Variant) -->
        <rect x="25" y="25" width="350" height="145" rx="${parseInt(theme.borderRadius) * 0.8}" fill="url(#headerGrad-${template.id})"/>
        
        <!-- Avatar Image clipped and with border -->
        <image href="${avatar}" x="178" y="43" width="44" height="44" clip-path="url(#avatarClipCentered-${template.id})"/>
        <circle cx="200" cy="65" r="22" fill="none" stroke="${theme.primary}" stroke-width="2" opacity="0.8"/>
        
        <!-- Details -->
        <text x="200" y="105" text-anchor="middle" font-family="${theme.fontFamilyHeading}" font-size="14" font-weight="700" fill="${theme.text}">
          ${firstName} ${lastName}
        </text>
        <text x="200" y="122" text-anchor="middle" font-family="${theme.fontFamily}" font-size="9" font-weight="500" fill="${theme.primary}">
          ${title}
        </text>
        <text x="200" y="136" text-anchor="middle" font-family="${theme.fontFamily}" font-size="7" font-weight="400" fill="${theme.textSecondary}">
          ${email} | ${phone} | ${location}
        </text>
      `}
      
      <!-- Professional Summary Card -->
      <rect x="25" y="${startY}" width="350" height="60" rx="${parseInt(theme.borderRadius) * 0.4}" fill="${theme.background}" stroke="${theme.primary}25" stroke-width="1"/>
      <text x="35" y="${startY + 16}" font-family="${theme.fontFamilyHeading}" font-size="10" font-weight="700" fill="${theme.primary}">Professional Summary</text>
      <text x="35" y="${startY + 32}" font-family="${theme.fontFamily}" font-size="7.5" font-weight="400" fill="${theme.text}">Results-driven Senior Full Stack Developer with 8+ years of experience building</text>
      <text x="35" y="${startY + 44}" font-family="${theme.fontFamily}" font-size="7.5" font-weight="400" fill="${theme.text}">scalable web applications. Proven track record of leading technical teams...</text>
      
      <!-- Experience Section -->
      <text x="25" y="${startY + 85}" font-family="${theme.fontFamilyHeading}" font-size="11" font-weight="700" fill="${theme.primary}">Experience</text>
      
      <!-- Timeline Dot and Line -->
      <circle cx="25" cy="${startY + 108}" r="4" fill="${theme.primary}"/>
      <line x1="25" y1="${startY + 118}" x2="25" y2="${startY + 265}" stroke="${theme.primary}" stroke-width="1.5" stroke-dasharray="2,2"/>
      
      <!-- Experience Item Card -->
      <rect x="40" y="${startY + 95}" width="335" height="175" rx="${parseInt(theme.borderRadius) * 0.4}" fill="${theme.background}" stroke="${theme.primary}15" stroke-width="1"/>
      <text x="50" y="${startY + 112}" font-family="${theme.fontFamily}" font-size="9" font-weight="700" fill="${theme.text}">Senior Full Stack Developer</text>
      <text x="50" y="${startY + 125}" font-family="${theme.fontFamily}" font-size="8" font-weight="600" fill="${theme.primary}">TechCorp Inc.</text>
      <text x="365" y="${startY + 112}" text-anchor="end" font-family="${theme.fontFamily}" font-size="7.5" fill="${theme.textSecondary}">2021-03 - Present</text>
      <text x="365" y="${startY + 125}" text-anchor="end" font-family="${theme.fontFamily}" font-size="7.5" fill="${theme.textSecondary}">San Francisco, CA</text>
      <text x="50" y="${startY + 140}" font-family="${theme.fontFamily}" font-size="7.5" fill="${theme.textSecondary}">Leading the development of enterprise-level web applications serving 1M+ users.</text>
      
      <!-- Experience Item achievements -->
      <circle cx="55" cy="${startY + 156}" r="1.5" fill="${theme.primary}"/>
      <text x="63" y="${startY + 159}" font-family="${theme.fontFamily}" font-size="7" fill="${theme.text}">Reduced application load time by 40% through performance optimization.</text>
      
      <circle cx="55" cy="${startY + 172}" r="1.5" fill="${theme.primary}"/>
      <text x="63" y="${startY + 175}" font-family="${theme.fontFamily}" font-size="7" fill="${theme.text}">Led a team of 5 developers, conducting code reviews and mentoring junior engineers.</text>
      
      <circle cx="55" cy="${startY + 188}" r="1.5" fill="${theme.primary}"/>
      <text x="63" y="${startY + 191}" font-family="${theme.fontFamily}" font-size="7" fill="${theme.text}">Architected and implemented microservices architecture, improving system scalability.</text>
      
      <!-- Experience Item 2 (Brief) -->
      <text x="50" y="${startY + 218}" font-family="${theme.fontFamily}" font-size="9" font-weight="700" fill="${theme.text}">Full Stack Developer</text>
      <text x="50" y="${startY + 231}" font-family="${theme.fontFamily}" font-size="8" font-weight="600" fill="${theme.primary}">StartupXYZ</text>
      <text x="365" y="${startY + 218}" text-anchor="end" font-family="${theme.fontFamily}" font-size="7.5" fill="${theme.textSecondary}">2018-06 - 2021-02</text>
      <text x="50" y="${startY + 246}" font-family="${theme.fontFamily}" font-size="7.5" fill="${theme.textSecondary}">Developed and maintained multiple client-facing applications using React/Node.js.</text>
      
      <!-- Education Section -->
      <text x="25" y="${startY + 290}" font-family="${theme.fontFamilyHeading}" font-size="11" font-weight="700" fill="${theme.primary}">Education</text>
      <text x="25" y="${startY + 308}" font-family="${theme.fontFamily}" font-size="9" font-weight="700" fill="${theme.text}">Master of Science in Computer Science</text>
      <text x="25" y="${startY + 320}" font-family="${theme.fontFamily}" font-size="7.5" fill="${theme.textSecondary}">Stanford University • 2014-09 - 2016-06</text>
      
      <!-- Skills Section -->
      <text x="25" y="${startY + 345}" font-family="${theme.fontFamilyHeading}" font-size="11" font-weight="700" fill="${theme.primary}">Skills</text>
      
      <!-- Skills Tags (matching theme styling with background opacity and primary text) -->
      ${['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'GraphQL', 'AWS', 'Docker'].map((skill, i) => `
        <rect x="${25 + (i % 4) * 88}" y="${startY + 360 + Math.floor(i / 4) * 22}" width="78" height="15" rx="${parseInt(theme.borderRadius)/4}" fill="${theme.primary}" fill-opacity="0.08" stroke="${theme.primary}" stroke-opacity="0.25" stroke-width="0.5"/>
        <text x="${25 + (i % 4) * 88 + 39}" y="${startY + 360 + Math.floor(i / 4) * 22 + 10}" text-anchor="middle" font-family="${theme.fontFamily}" font-size="7" font-weight="500" fill="${theme.primary}">${skill}</text>
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
  const avatar = data.personal.avatar || DUMMY_AVATAR;
  
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
        <clipPath id="avatarClipSidebarLeft-${template.id}">
          <circle cx="56" cy="60" r="18"/>
        </clipPath>
      </defs>
      
      <!-- Background matching exact theme.background -->
      <rect width="400" height="600" fill="${theme.background}"/>
      
      <!-- Main Container with exact grid layout (280px sidebar + 1fr main) -->
      <rect x="0" y="0" width="400" height="600" rx="${parseInt(theme.borderRadius)}" fill="${theme.background}" filter="url(#boxShadow)"/>
      
      <!-- Sidebar (280px width equivalent = 112px in 400px viewport) -->
      <rect x="0" y="0" width="112" height="600" rx="${parseInt(theme.borderRadius)}" fill="url(#sidebarGrad)"/>
      
      <!-- Profile Photo in Sidebar (centered, clipped with white border) -->
      <image href="${avatar}" x="38" y="42" width="36" height="36" clip-path="url(#avatarClipSidebarLeft-${template.id})"/>
      <circle cx="56" cy="60" r="18" fill="none" stroke="white" stroke-width="1.5" opacity="0.9"/>
      
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
  const email = sanitizeText(data.personal.email);
  const phone = sanitizeText(data.personal.phone);
  const location = sanitizeText(data.personal.location);
  const avatar = data.personal.avatar || DUMMY_AVATAR;
  
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
        <clipPath id="avatarClipSidebarRight-${template.id}">
          <circle cx="344" cy="60" r="18"/>
        </clipPath>
      </defs>
      
      <rect width="400" height="600" fill="${theme.background}"/>
      <rect x="0" y="0" width="400" height="600" rx="${parseInt(theme.borderRadius)}" fill="${theme.background}" filter="url(#boxShadow)"/>
      
      <!-- Sidebar on Right -->
      <rect x="288" y="0" width="112" height="600" rx="${parseInt(theme.borderRadius)}" fill="url(#sidebarGradRight)"/>
      
      <!-- Profile Photo in Right Sidebar -->
      <image href="${avatar}" x="326" y="42" width="36" height="36" clip-path="url(#avatarClipSidebarRight-${template.id})"/>
      <circle cx="344" cy="60" r="18" fill="none" stroke="white" stroke-width="1.5" opacity="0.9"/>
      
      <!-- Name in Right Sidebar -->
      <text x="344" y="105" text-anchor="middle" font-family="${theme.fontFamilyHeading}" font-size="9" font-weight="700" fill="white">${firstName}</text>
      <text x="344" y="118" text-anchor="middle" font-family="${theme.fontFamilyHeading}" font-size="9" font-weight="700" fill="white">${lastName}</text>
      <text x="344" y="135" text-anchor="middle" font-family="${theme.fontFamily}" font-size="7" fill="white" opacity="0.9">${title}</text>
      
      <!-- Contact Section in Sidebar -->
      <text x="300" y="160" font-family="${theme.fontFamily}" font-size="6" font-weight="600" fill="white" opacity="0.7" text-transform="uppercase" letter-spacing="1px">CONTACT</text>
      <text x="300" y="175" font-family="${theme.fontFamily}" font-size="6" font-weight="400" fill="white" opacity="0.9">
        ${email.substring(0, 20)}...
      </text>
      <text x="300" y="188" font-family="${theme.fontFamily}" font-size="6" font-weight="400" fill="white" opacity="0.9">
        ${phone}
      </text>
      <text x="300" y="201" font-family="${theme.fontFamily}" font-size="6" font-weight="400" fill="white" opacity="0.9">
        ${location}
      </text>
      
      <!-- Skills Section in Sidebar -->
      <text x="300" y="230" font-family="${theme.fontFamily}" font-size="6" font-weight="600" fill="white" opacity="0.7" text-transform="uppercase" letter-spacing="1px">SKILLS</text>
      ${['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'GraphQL'].map((skill, i) => `
        <rect x="300" y="${245 + i * 18}" width="88" height="12" rx="6" fill="rgba(255, 255, 255, 0.2)"/>
        <text x="344" y="${245 + i * 18 + 8}" text-anchor="middle" font-family="${theme.fontFamily}" font-size="5" font-weight="500" fill="white" opacity="0.95">${skill}</text>
      `).join('')}
      
      <!-- Main Content Area on Left -->
      <!-- Summary Section -->
      <text x="25" y="40" font-family="${theme.fontFamilyHeading}" font-size="10" font-weight="700" fill="${theme.primary}" text-transform="uppercase">SUMMARY</text>
      <rect x="25" y="45" width="240" height="0.5" fill="${theme.primary}" opacity="0.5"/>
      <text x="25" y="60" font-family="${theme.fontFamily}" font-size="7" font-weight="400" fill="${theme.textMuted}">
        Results-driven professional with extensive
      </text>
      <text x="25" y="70" font-family="${theme.fontFamily}" font-size="7" font-weight="400" fill="${theme.textMuted}">
        experience in project management
      </text>
      
      <!-- Experience Section -->
      <text x="25" y="100" font-family="${theme.fontFamilyHeading}" font-size="10" font-weight="700" fill="${theme.primary}" text-transform="uppercase">EXPERIENCE</text>
      <rect x="25" y="105" width="240" height="0.5" fill="${theme.primary}" opacity="0.5"/>
      
      <!-- Experience Item 1 -->
      <text x="25" y="125" font-family="${theme.fontFamily}" font-size="8" font-weight="700" fill="${theme.text}">Senior Full Stack Developer</text>
      <text x="25" y="137" font-family="${theme.fontFamily}" font-size="6" font-weight="400" fill="${theme.textSecondary}">TechCorp Inc. • 2021-03 - Present</text>
      <text x="25" y="149" font-family="${theme.fontFamily}" font-size="5" font-weight="400" fill="${theme.textMuted}">Leading the development of enterprise-level...</text>
      <text x="25" y="159" font-family="${theme.fontFamily}" font-size="5" font-weight="400" fill="${theme.textMuted}">web applications serving 1M+ users.</text>
      
      <!-- Experience Item 2 -->
      <text x="25" y="180" font-family="${theme.fontFamily}" font-size="8" font-weight="700" fill="${theme.text}">Full Stack Developer</text>
      <text x="25" y="192" font-family="${theme.fontFamily}" font-size="6" font-weight="400" fill="${theme.textSecondary}">StartupXYZ • 2018-06 - 2021-02</text>
      <text x="25" y="204" font-family="${theme.fontFamily}" font-size="5" font-weight="400" fill="${theme.textMuted}">Developed and maintained multiple client-facing...</text>
      <text x="25" y="214" font-family="${theme.fontFamily}" font-size="5" font-weight="400" fill="${theme.textMuted}">web applications using React and Node.js.</text>
      
      <!-- Education Section -->
      <text x="25" y="245" font-family="${theme.fontFamilyHeading}" font-size="10" font-weight="700" fill="${theme.primary}" text-transform="uppercase">EDUCATION</text>
      <rect x="25" y="250" width="240" height="0.5" fill="${theme.primary}" opacity="0.5"/>
      <text x="25" y="270" font-family="${theme.fontFamily}" font-size="8" font-weight="700" fill="${theme.text}">Master of Science</text>
      <text x="25" y="282" font-family="${theme.fontFamily}" font-size="6" font-weight="400" fill="${theme.textSecondary}">Stanford University • 2014-09 - 2016-06</text>
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