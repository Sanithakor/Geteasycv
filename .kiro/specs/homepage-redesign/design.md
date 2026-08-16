# Design Document: Homepage Redesign

## Overview

This design document specifies the technical approach for redesigning the GetEasyCV homepage to create a cleaner, more conversion-focused landing page. The redesign will transform the current content-heavy homepage into a streamlined, visually hierarchical experience that guides visitors toward two primary conversion actions: browsing templates and starting resume creation.

### Design Goals

1. **Improved Conversion Rate**: Create clear visual hierarchy with prominent, strategically placed CTAs
2. **Enhanced Scannability**: Use whitespace, visual rhythm, and typography to make content easily digestible
3. **Premium Feel**: Implement modern design patterns with subtle shadows, smooth transitions, and refined color palette
4. **Mobile-First Approach**: Ensure excellent experience across all device sizes with responsive layouts
5. **Performance**: Maintain fast load times through optimized assets and efficient rendering

### Key Design Principles

- **Visual Hierarchy**: Use size, color, and spacing to guide user attention through the page
- **Consistency**: Maintain uniform spacing, shadows, and transitions throughout all sections
- **Clarity**: Every section has a clear purpose and single primary message
- **Accessibility**: Meet WCAG 2.1 AA standards for color contrast, keyboard navigation, and semantic HTML

## Architecture

### Component Structure

The homepage will be built using a modular section-based architecture in Next.js 14+ with the App Router:

```
app/
└── page.tsx (Homepage)
    ├── Navigation (existing, unchanged)
    ├── HeroSection (new)
    ├── TemplateDiscoverySection (enhanced)
    ├── AIAssistanceSection (new)
    ├── LiveEditingSection (new)
    ├── ExportOptionsSection (new)
    ├── SocialProofSection (enhanced)
    ├── PricingSection (simplified)
    ├── FinalCTASection (new)
    └── Footer (existing, unchanged)
```

### Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS with custom design tokens
- **Icons**: Lucide React
- **Images**: Next.js Image component with WebP/AVIF optimization
- **Animations**: CSS transitions and Tailwind animation utilities
- **Type Safety**: TypeScript for all components

### Data Layer

The homepage will consume data from existing sources:

- **Templates**: `data/templates.json` for template counts and showcase
- **Layouts**: `data/layouts` for layout count statistics
- **Themes**: `data/themes` for theme count statistics
- **Pricing**: Static pricing configuration (may be moved to separate config file)
- **Testimonials**: Static testimonial configuration

## Components and Interfaces

### 1. HeroSection Component

**Purpose**: Capture attention and communicate value proposition within 3 seconds

**Layout**:
- Desktop (≥1024px): Two-column layout with text left, live preview mockup right
- Tablet (768px-1023px): Two-column layout with stacked elements at smaller breakpoint
- Mobile (<768px): Single-column stack (text, CTAs, preview)

**Key Elements**:
- Headline (max 12 words, H1 semantic tag)
- Supporting copy (max 30 words)
- Primary CTA: "Browse Templates" (gradient button)
- Secondary CTA: "Start Building" (outlined button)
- Trust signals: Template count badge, ATS-friendly badge, AI assistance badge
- Live preview mockup or animated illustration

**Interface**:
```typescript
interface HeroSectionProps {
  templateCount: number;
  headline: string;
  supportingCopy: string;
  primaryCTA: CTAButton;
  secondaryCTA: CTAButton;
  trustSignals: TrustSignal[];
  previewImage?: string;
}

interface CTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
}

interface TrustSignal {
  icon: React.ComponentType;
  text: string;
  variant: 'badge' | 'stat';
}
```

### 2. TemplateDiscoverySection Component

**Purpose**: Enable quick template browsing with category filtering

**Layout**:
- Section header with title and description
- Category filter controls (horizontal scroll on mobile)
- Template grid: 6 columns on desktop, 3 on tablet, 1 on mobile
- "View All Templates" CTA at bottom

**Key Elements**:
- Category filters (buttons or tabs)
- Template cards with hover effects
- Template metadata: name, category, popularity indicator
- Lazy loading for performance

**Interface**:
```typescript
interface TemplateDiscoverySectionProps {
  categories: string[];
  templates: TemplatePreview[];
  defaultCategory?: string;
}

interface TemplatePreview {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  popularity: number;
  isATSFriendly: boolean;
}
```

### 3. AIAssistanceSection Component

**Purpose**: Demonstrate AI value proposition with visual before/after examples

**Layout**:
- Split layout: Text content left, visual demonstration right
- Before/after comparison with toggle or animation
- Feature list with icons
- CTA to try feature

**Key Elements**:
- Section headline emphasizing one-click improvement
- List of 2-3 specific AI capabilities
- Visual mockup showing content improvement
- "Try AI Assistant" CTA

**Interface**:
```typescript
interface AIAssistanceSectionProps {
  headline: string;
  features: AIFeature[];
  beforeExample: string;
  afterExample: string;
  ctaText: string;
  ctaHref: string;
}

interface AIFeature {
  icon: React.ComponentType;
  title: string;
  description: string;
}
```

### 4. LiveEditingSection Component

**Purpose**: Showcase real-time editing capability with visual demonstration

**Layout**:
- Split layout: Visual demonstration left, text content right
- Animated mockup showing typing and instant preview update
- Feature highlights with icons
- CTA to editor

**Key Elements**:
- Section headline emphasizing instant updates
- Split-screen mockup (editor left, preview right)
- Subtle animations showing real-time sync
- "Start Editing" CTA

**Interface**:
```typescript
interface LiveEditingSectionProps {
  headline: string;
  description: string;
  features: string[];
  mockupImage: string;
  ctaText: string;
  ctaHref: string;
}
```

### 5. ExportOptionsSection Component

**Purpose**: Communicate export flexibility and format preservation

**Layout**:
- Centered content with icon grid
- Three columns: PDF, DOCX, Share Link
- Each format has icon, title, and description
- Visual mockups of exported files

**Key Elements**:
- Section headline
- Export format cards with icons
- Feature list: format preservation, ATS-compatibility
- Visual file format mockups

**Interface**:
```typescript
interface ExportOptionsSectionProps {
  headline: string;
  exportFormats: ExportFormat[];
  features: string[];
}

interface ExportFormat {
  name: string;
  icon: React.ComponentType;
  description: string;
  mockupImage?: string;
}
```

### 6. SocialProofSection Component

**Purpose**: Build trust through testimonials and quantitative metrics

**Layout**:
- Grid layout: 3 columns on desktop, 2 on tablet, 1 on mobile
- Testimonial cards with equal height
- Statistics bar above or below testimonials
- Consistent card styling with hover effects

**Key Elements**:
- 3-6 testimonials with avatar, name, role, company, quote, rating
- Quantitative stats: user count, satisfaction rate, average completion time
- Visual hierarchy: name bold, company highlighted, quote readable

**Interface**:
```typescript
interface SocialProofSectionProps {
  headline: string;
  testimonials: Testimonial[];
  statistics: Statistic[];
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

interface Statistic {
  value: string;
  label: string;
  icon?: React.ComponentType;
}
```

### 7. PricingSection Component

**Purpose**: Present pricing options clearly with recommended plan highlighted

**Layout**:
- Grid layout: 3 columns on desktop, stack on mobile
- Center card visually elevated as "Recommended"
- Equal height cards with consistent structure
- Feature lists aligned across cards

**Key Elements**:
- 3 pricing cards: Free, Pro (recommended), Premium
- Each card: plan name, price, billing period, 7 features max, CTA
- Visual highlight on recommended plan
- Feature bullets with checkmark icons

**Interface**:
```typescript
interface PricingSectionProps {
  headline: string;
  description: string;
  plans: PricingPlan[];
}

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  isRecommended: boolean;
}
```

### 8. FinalCTASection Component

**Purpose**: Provide final conversion opportunity before footer

**Layout**:
- Full-width section with contrasting background
- Centered content with headline and CTA
- Optional supporting copy
- High visual contrast from surrounding sections

**Key Elements**:
- Headline restating value proposition (max 15 words)
- Primary CTA button (Browse Templates or Start Building)
- Contrasting background color (gradient or solid)
- Sufficient padding for visual separation

**Interface**:
```typescript
interface FinalCTASectionProps {
  headline: string;
  supportingCopy?: string;
  ctaText: string;
  ctaHref: string;
  backgroundColor: string;
}
```

## Data Models

### Visual System Configuration

```typescript
interface VisualSystem {
  colors: ColorPalette;
  spacing: SpacingScale;
  typography: TypographyScale;
  shadows: ShadowScale;
  transitions: TransitionConfig;
  breakpoints: Breakpoints;
}

interface ColorPalette {
  primary: string;      // Indigo-600 (#4F46E5)
  secondary: string;    // Purple-600 (#9333EA)
  accent: string;       // Pink-600 (#DB2777)
  neutral: {
    50: string;         // Off-white background
    100: string;
    200: string;
    // ... up to 900
  };
}

interface SpacingScale {
  xs: string;    // 4px
  sm: string;    // 8px
  md: string;    // 16px
  lg: string;    // 24px
  xl: string;    // 32px
  '2xl': string; // 48px
  '3xl': string; // 64px
}

interface TypographyScale {
  h1: {
    fontSize: string;       // 3.75rem (60px)
    lineHeight: string;     // 1.1
    fontWeight: number;     // 700
    letterSpacing: string;  // -0.02em
  };
  h2: {
    fontSize: string;       // 3rem (48px)
    lineHeight: string;     // 1.2
    fontWeight: number;     // 700
    letterSpacing: string;  // -0.01em
  };
  h3: {
    fontSize: string;       // 2rem (32px)
    lineHeight: string;     // 1.3
    fontWeight: number;     // 600
    letterSpacing: string;  // normal
  };
  body: {
    fontSize: string;       // 1rem (16px)
    lineHeight: string;     // 1.6
    fontWeight: number;     // 400
  };
  small: {
    fontSize: string;       // 0.875rem (14px)
    lineHeight: string;     // 1.5
    fontWeight: number;     // 400
  };
}

interface ShadowScale {
  sm: string;   // 0 1px 2px 0 rgb(0 0 0 / 0.05)
  md: string;   // 0 4px 6px -1px rgb(0 0 0 / 0.1)
  lg: string;   // 0 10px 15px -3px rgb(0 0 0 / 0.1)
  xl: string;   // 0 20px 25px -5px rgb(0 0 0 / 0.1)
}

interface TransitionConfig {
  duration: {
    fast: string;     // 150ms
    normal: string;   // 200ms
    slow: string;     // 300ms
  };
  timing: {
    ease: string;     // ease-in-out
    spring: string;   // cubic-bezier(0.68, -0.55, 0.265, 1.55)
  };
}

interface Breakpoints {
  sm: number;   // 640px
  md: number;   // 768px
  lg: number;   // 1024px
  xl: number;   // 1280px
  '2xl': number; // 1536px
}
```

### Template Data Model

```typescript
interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  previewUrl: string;
  isATSFriendly: boolean;
  popularity: number;
  isPremium: boolean;
  layoutId: string;
  themeId: string;
}
```

## Correctness Properties

**Property-based testing is not applicable to this feature.**

This homepage redesign is a UI rendering and layout feature that does not involve pure functions with universal properties suitable for property-based testing. The feature consists of:

- **UI Component Rendering**: React components that render static or configuration-driven JSX
- **Visual Design Implementation**: CSS styling, shadows, spacing, and visual hierarchy
- **Responsive Layout Behavior**: Media query-based layout adaptations for different screen sizes
- **Static Content Display**: Hardcoded headlines, supporting copy, testimonials, and CTAs

**Why PBT Does Not Apply:**

1. **No Input Variation**: UI components receive fixed props (headlines, images, CTAs) rather than varying input spaces that would benefit from generative testing
2. **Visual Validation Required**: Correctness is determined by visual appearance, layout consistency, and design system adherence—properties that cannot be captured in executable assertions
3. **Deterministic Rendering**: Given the same props, components produce identical output with no edge cases to discover through randomization
4. **Configuration-Driven**: Behavior is controlled by static configuration (number of testimonials, pricing tiers) rather than algorithmic logic

**Alternative Testing Strategy:**

Instead of property-based testing, this feature uses testing approaches appropriate for UI:

- **Visual Regression Tests**: Playwright + Percy to verify layouts at multiple breakpoints
- **Snapshot Tests**: Jest snapshot testing for component rendering consistency
- **Example-Based Unit Tests**: React Testing Library for specific interactions (CTA clicks, filters)
- **Integration Tests**: Playwright E2E tests for user conversion flows
- **Accessibility Tests**: axe-core automated checks + manual screen reader validation

See the Testing Strategy section below for detailed test specifications.

## Error Handling

### Image Loading Errors

**Strategy**: Graceful degradation with fallback images and loading states

```typescript
// Implementation approach
<Image
  src={templateThumbnail}
  alt={templateName}
  onError={(e) => {
    e.currentTarget.src = '/images/fallback-template.png';
  }}
  loading="lazy"
  placeholder="blur"
/>
```

### Data Fetching Errors

**Strategy**: Static data with fallback values

Since the homepage uses static data (templates.json, pricing config), errors are unlikely. However, if template data fails to load:

- Display placeholder cards with skeleton loaders
- Show error message: "Unable to load templates. Please refresh the page."
- Provide CTA to templates page as fallback navigation

### Responsive Layout Errors

**Strategy**: Mobile-first approach with progressive enhancement

- Base styles work on smallest screens
- Enhanced layouts added via media queries
- CSS Grid with fallback to Flexbox
- Feature detection for modern CSS features

### Accessibility Errors

**Strategy**: Semantic HTML with ARIA attributes as enhancement

- Use semantic HTML elements first (header, nav, main, section, footer)
- Add ARIA labels only when semantic HTML insufficient
- Ensure keyboard navigation works without JavaScript
- Provide text alternatives for all visual content

## Testing Strategy

### Testing Approach

This feature involves UI rendering, responsive layouts, and visual design - areas where property-based testing is NOT appropriate. The testing strategy will focus on:

1. **Unit Tests** (Example-based) - Component rendering and interaction
2. **Visual Regression Tests** - Layout and design consistency
3. **Integration Tests** - User flows and navigation
4. **Accessibility Tests** - WCAG compliance verification
5. **Manual Testing** - Cross-browser and device testing

### Unit Testing

**Framework**: Jest + React Testing Library

**Coverage Areas**:

1. **Component Rendering**:
   - Each section component renders without errors
   - Props are correctly passed and displayed
   - Conditional rendering works correctly (e.g., recommended pricing badge)

2. **User Interactions**:
   - CTA buttons navigate to correct URLs
   - Category filters update template display
   - Hover states trigger correctly
   - Mobile menu toggles work

3. **Responsive Behavior**:
   - Components render different layouts at different breakpoints
   - Mobile-specific elements appear/hide correctly
   - Touch targets meet minimum size requirements (44px × 44px)

**Example Test Cases**:

```typescript
describe('HeroSection', () => {
  it('renders headline and supporting copy', () => {
    render(<HeroSection {...mockProps} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('displays correct number of trust signals', () => {
    render(<HeroSection trustSignals={[...]} />);
    expect(screen.getAllByTestId('trust-signal')).toHaveLength(3);
  });

  it('navigates to templates page on primary CTA click', () => {
    render(<HeroSection {...mockProps} />);
    const primaryCTA = screen.getByText('Browse Templates');
    expect(primaryCTA).toHaveAttribute('href', '/templates');
  });
});

describe('PricingSection', () => {
  it('highlights recommended plan', () => {
    render(<PricingSection plans={mockPlans} />);
    const recommendedCard = screen.getByText('Most Popular');
    expect(recommendedCard).toBeInTheDocument();
  });

  it('displays maximum 7 features per plan', () => {
    const planWith10Features = { ...mockPlan, features: Array(10).fill('Feature') };
    render(<PricingCard plan={planWith10Features} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(7);
  });
});

describe('TemplateDiscoverySection', () => {
  it('filters templates by category', () => {
    render(<TemplateDiscoverySection {...mockProps} />);
    const businessFilter = screen.getByText('Business');
    fireEvent.click(businessFilter);
    
    const displayedTemplates = screen.getAllByTestId('template-card');
    displayedTemplates.forEach(template => {
      expect(template).toHaveAttribute('data-category', 'business');
    });
  });
});
```

### Visual Regression Testing

**Framework**: Playwright + Percy or Chromatic

**Coverage Areas**:

1. **Layout Consistency**:
   - Sections align correctly at all breakpoints
   - Spacing and padding are consistent
   - Cards have equal heights in grids

2. **Visual Design**:
   - Colors match design system
   - Shadows and borders render correctly
   - Typography hierarchy is clear
   - Hover states apply correct styles

3. **Responsive Layouts**:
   - Mobile layouts stack correctly
   - Tablet layouts show appropriate column counts
   - Desktop layouts use full width effectively
   - No horizontal overflow on any screen size

**Test Scenarios**:
- Homepage at 320px (mobile), 768px (tablet), 1280px (desktop), 1920px (large desktop)
- Each section in isolation at multiple breakpoints
- Dark mode rendering (if implemented)
- High contrast mode for accessibility

### Integration Testing

**Framework**: Playwright for E2E tests

**User Flows to Test**:

1. **Template Discovery Flow**:
   - User lands on homepage
   - Scrolls to template section
   - Filters by category
   - Clicks template to view details
   - Navigates to editor

2. **CTA Conversion Flow**:
   - User lands on homepage
   - Clicks primary "Browse Templates" CTA
   - Lands on templates page
   - Returns to homepage
   - Clicks "Start Building" CTA
   - Lands on editor

3. **Mobile Navigation Flow**:
   - User lands on mobile homepage
   - Opens navigation menu
   - Navigates between sections
   - Clicks mobile CTA
   - Completes action

**Example E2E Test**:

```typescript
test('user can browse templates from homepage', async ({ page }) => {
  await page.goto('/');
  
  // Verify hero section loads
  await expect(page.locator('h1')).toContainText('Build Your Dream Resume');
  
  // Click primary CTA
  await page.getByRole('link', { name: 'Browse Templates' }).click();
  
  // Verify navigation to templates page
  await expect(page).toHaveURL('/templates');
  await expect(page.locator('h1')).toContainText('Templates');
});

test('category filter updates template display', async ({ page }) => {
  await page.goto('/');
  
  // Scroll to template section
  await page.locator('[data-section="templates"]').scrollIntoViewIfNeeded();
  
  // Click business category
  await page.getByRole('button', { name: 'Business' }).click();
  
  // Verify filtered templates
  const templates = page.locator('[data-testid="template-card"]');
  await expect(templates.first()).toHaveAttribute('data-category', 'business');
});
```

### Accessibility Testing

**Tools**: 
- axe-core (automated)
- WAVE browser extension (manual)
- Screen reader testing (NVDA, VoiceOver)
- Keyboard navigation testing

**Areas to Verify**:

1. **Semantic HTML**:
   - Proper heading hierarchy (h1 → h2 → h3, no skipping)
   - Landmark regions (header, nav, main, section, footer)
   - List structures for features and navigation

2. **Color Contrast**:
   - Body text: minimum 4.5:1 contrast ratio
   - Large text (18px+ or 14px+ bold): minimum 3:1 contrast ratio
   - Interactive elements meet contrast requirements
   - Focus indicators visible against all backgrounds

3. **Keyboard Navigation**:
   - All interactive elements reachable via Tab
   - Focus order follows logical reading order
   - Focus indicators visible on all interactive elements
   - Skip links available to bypass navigation

4. **Screen Reader Compatibility**:
   - All images have descriptive alt text
   - Buttons have accessible names
   - Links describe their destination
   - Form inputs have associated labels
   - Status messages announced appropriately

5. **ARIA Usage**:
   - ARIA labels added only when semantic HTML insufficient
   - ARIA roles used correctly
   - ARIA states updated dynamically (e.g., expanded/collapsed)

**Example Accessibility Tests**:

```typescript
describe('Accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Homepage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('maintains focus on CTA buttons', () => {
    render(<HeroSection {...mockProps} />);
    const primaryCTA = screen.getByText('Browse Templates');
    primaryCTA.focus();
    expect(primaryCTA).toHaveFocus();
  });

  it('provides descriptive alt text for images', () => {
    render(<TemplateCard template={mockTemplate} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', expect.stringContaining('resume template'));
  });

  it('uses proper heading hierarchy', () => {
    render(<Homepage />);
    const h1 = screen.getAllByRole('heading', { level: 1 });
    const h2 = screen.getAllByRole('heading', { level: 2 });
    
    expect(h1).toHaveLength(1); // Only one h1 per page
    expect(h2.length).toBeGreaterThan(0); // Multiple h2s for sections
  });
});
```

### Performance Testing

**Tools**:
- Lighthouse CI
- WebPageTest
- Chrome DevTools Performance panel

**Metrics to Track**:

1. **Core Web Vitals**:
   - LCP (Largest Contentful Paint): < 2.5s
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1

2. **Page Load Performance**:
   - Time to First Byte (TTFB): < 600ms
   - First Contentful Paint (FCP): < 1.8s
   - Total page weight: < 2MB
   - Number of requests: < 50

3. **Image Optimization**:
   - Use WebP/AVIF with JPEG fallback
   - Implement responsive images with srcset
   - Lazy load below-the-fold images
   - Use appropriate image dimensions (no oversized images)

**Performance Budget**:
```json
{
  "resourceSizes": {
    "script": 300,
    "image": 500,
    "stylesheet": 100,
    "document": 50,
    "font": 150,
    "total": 2000
  },
  "resourceCounts": {
    "script": 10,
    "image": 20,
    "stylesheet": 5,
    "font": 4,
    "total": 50
  }
}
```

### Cross-Browser Testing

**Target Browsers**:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

**Testing Areas**:
- Layout consistency across browsers
- CSS Grid and Flexbox rendering
- Transition and animation support
- Touch interactions on mobile devices
- Form input behavior
- Image format support (WebP fallback)

### Manual Testing Checklist

**Desktop Testing** (1280px+):
- [ ] All sections render correctly
- [ ] Two-column layouts display side-by-side
- [ ] Hover states work on all interactive elements
- [ ] CTAs navigate to correct pages
- [ ] Images load and display correctly
- [ ] Shadows and gradients render properly

**Tablet Testing** (768px-1023px):
- [ ] Layouts adapt to medium screens
- [ ] Grid columns adjust appropriately (3→2 columns)
- [ ] Touch targets are sufficiently large
- [ ] Text remains readable

**Mobile Testing** (<768px):
- [ ] Single-column layouts stack correctly
- [ ] No horizontal scrolling
- [ ] CTA buttons stack with adequate spacing (≥12px)
- [ ] Images scale proportionally
- [ ] Text size ≥16px for body content
- [ ] Navigation menu accessible and functional

**Accessibility Testing**:
- [ ] Keyboard navigation works throughout page
- [ ] Screen reader announces content logically
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators visible on all elements
- [ ] Alt text provided for all images

## Implementation Notes

### Next.js App Router Considerations

1. **Server Components**: Most sections can be Server Components for better performance
2. **Client Components**: Use 'use client' only for interactive elements (filters, tabs)
3. **Image Optimization**: Use next/image for automatic optimization
4. **Metadata**: Update page metadata for SEO

### Tailwind Configuration

Extend `tailwind.config.js` with custom design tokens:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEF2FF',
          // ... indigo scale
          600: '#4F46E5',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-in',
        'slideUp': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
};
```

### Code Organization

```
app/
└── page.tsx
    
components/
├── homepage/
│   ├── HeroSection.tsx
│   ├── TemplateDiscoverySection.tsx
│   ├── AIAssistanceSection.tsx
│   ├── LiveEditingSection.tsx
│   ├── ExportOptionsSection.tsx
│   ├── SocialProofSection.tsx
│   ├── PricingSection.tsx
│   └── FinalCTASection.tsx
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   └── Container.tsx
└── shared/
    ├── Navigation.tsx (existing)
    └── Footer.tsx (existing)

lib/
└── constants/
    ├── visual-system.ts
    ├── pricing-plans.ts
    └── testimonials.ts
```

### Migration Strategy

**Phase 1**: Create new section components
- Build all new components in isolation
- Test components individually
- Ensure responsive behavior works

**Phase 2**: Integrate new sections
- Replace or enhance existing sections one at a time
- Maintain backward compatibility
- Test after each section integration

**Phase 3**: Polish and optimize
- Fine-tune spacing and visual hierarchy
- Optimize images and assets
- Run performance audits
- Conduct accessibility review

**Phase 4**: Deploy and monitor
- Deploy to staging for final review
- Collect user feedback
- Monitor analytics for conversion rate changes
- Iterate based on data

### SEO Considerations

Update page metadata:

```typescript
// app/page.tsx
export const metadata = {
  title: 'GetEasyCV - Create Professional Resumes in Minutes',
  description: 'Build ATS-friendly resumes with our professional templates and AI-powered editor. Choose from 100+ templates and create your resume in minutes.',
  openGraph: {
    title: 'GetEasyCV - Professional Resume Builder',
    description: 'Create stunning resumes with our easy-to-use builder and land your dream job.',
    images: ['/og-image.png'],
  },
};
```

### Analytics Tracking

Track conversion events:

```typescript
// Track CTA clicks
const handleCTAClick = (ctaName: string, destination: string) => {
  analytics.track('CTA Clicked', {
    cta_name: ctaName,
    destination: destination,
    section: 'hero',
    page: 'homepage',
  });
};

// Track template category selections
const handleCategoryFilter = (category: string) => {
  analytics.track('Template Category Selected', {
    category: category,
    section: 'template_discovery',
  });
};

// Track scroll depth
const handleScrollDepth = (depth: number) => {
  analytics.track('Scroll Depth', {
    depth_percent: depth,
    page: 'homepage',
  });
};
```

## Conclusion

This design provides a comprehensive, conversion-focused homepage that balances aesthetics with functionality. The modular component architecture ensures maintainability, while the focus on responsive design and accessibility ensures an excellent experience for all users. The testing strategy emphasizes visual regression and integration testing appropriate for UI-heavy features, avoiding inappropriate use of property-based testing for rendering and layout concerns.
