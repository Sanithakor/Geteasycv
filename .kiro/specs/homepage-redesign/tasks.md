# Implementation Plan: Homepage Redesign

## Overview

This implementation plan converts the homepage redesign feature into actionable coding tasks. The implementation will create a modern, conversion-focused landing page using Next.js 14+ App Router with TypeScript and Tailwind CSS. The approach follows a modular section-based architecture where each homepage section is an independent React component.

The implementation strategy is:
1. Set up visual design system configuration (Tailwind customization)
2. Create reusable UI components (Button, Card, Badge, Container)
3. Build homepage section components from top to bottom
4. Integrate sections into the main homepage
5. Add responsive behavior and accessibility features
6. Optimize performance with image optimization and lazy loading

## Tasks

- [ ] 1. Set up design system and base UI components
  - [ ] 1.1 Extend Tailwind configuration with custom design tokens
    - Add custom color palette (primary indigo, secondary purple, accent pink, neutral scale)
    - Add custom spacing scale (xs through 3xl)
    - Add custom shadow utilities (soft, card shadows)
    - Add custom animation keyframes (fadeIn, slideUp)
    - Create typography utilities for consistent font sizing
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
  
  - [ ] 1.2 Create base UI components
    - Create `components/ui/Button.tsx` with primary, secondary, and outline variants
    - Create `components/ui/Card.tsx` with consistent shadow and padding
    - Create `components/ui/Badge.tsx` for trust signals
    - Create `components/ui/Container.tsx` for consistent max-width and padding
    - Include TypeScript interfaces for component props
    - _Requirements: 9.2, 9.3, 9.6, 9.7_
  
  - [ ]* 1.3 Write unit tests for base UI components
    - Test Button variants render correctly
    - Test Card component accepts children and applies correct styles
    - Test Badge component displays text and icons
    - Test Container component constrains width at breakpoints
    - _Requirements: 9.1-9.7_

- [ ] 2. Create constants and configuration files
  - [ ] 2.1 Create visual system constants
    - Create `lib/constants/visual-system.ts` with color palette, spacing, typography, shadows, and transitions
    - Export TypeScript interfaces for VisualSystem types
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_
  
  - [ ] 2.2 Create pricing plans configuration
    - Create `lib/constants/pricing-plans.ts` with 3 pricing tiers
    - Include plan name, price, period, features (max 7), CTA text, and isRecommended flag
    - Export PricingPlan interface and plans array
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
  
  - [ ] 2.3 Create testimonials configuration
    - Create `lib/constants/testimonials.ts` with 3-6 testimonials
    - Include name, role, company, quote, avatar, and rating for each
    - Export Testimonial interface and testimonials array
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 3. Implement Hero Section component
  - [ ] 3.1 Create HeroSection component structure
    - Create `components/homepage/HeroSection.tsx` as Server Component
    - Implement TypeScript interface HeroSectionProps with headline, supportingCopy, primaryCTA, secondaryCTA, trustSignals, previewImage
    - Create two-column layout (text left, preview right) for desktop (≥1024px)
    - Implement single-column stack for mobile (<1024px)
    - _Requirements: 1.1, 1.2, 1.3, 1.6, 10.1_
  
  - [ ] 3.2 Add trust signals and CTAs to HeroSection
    - Display headline (H1 semantic tag) with max 12 words
    - Display supporting copy (max 30 words) below headline
    - Add exactly 2 CTA buttons with distinct visual hierarchy
    - Display at least 3 trust signal badges near CTAs
    - Add Live_Preview mockup or image adjacent to text on desktop
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 10.6_
  
  - [ ]* 3.3 Write unit tests for HeroSection
    - Test headline and supporting copy render correctly
    - Test correct number of trust signals display
    - Test primary CTA navigates to correct URL
    - Test responsive layout switches at 1024px breakpoint
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [ ] 4. Checkpoint - Verify hero section renders correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement Template Discovery Section
  - [ ] 5.1 Create TemplateDiscoverySection component
    - Create `components/homepage/TemplateDiscoverySection.tsx` as Client Component ('use client')
    - Implement TypeScript interface TemplateDiscoverySectionProps with categories, templates, defaultCategory
    - Create category filter controls above template grid
    - Implement grid layout: 6 columns desktop, 3 tablet, 1 mobile
    - Add "View All Templates" CTA at bottom
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 2.6_
  
  - [ ] 5.2 Add template filtering logic
    - Implement category filter state management with useState
    - Filter templates by selected category
    - Display templates in order of popularity by default
    - Update template grid when category changes
    - Add hover effects to template cards
    - _Requirements: 2.2, 2.4_
  
  - [ ] 5.3 Create TemplateCard sub-component
    - Create template card component displaying thumbnail, name, category
    - Use next/image for optimized image loading
    - Add lazy loading for below-the-fold images
    - Include popularity indicator and ATS-friendly badge
    - _Requirements: 2.1, 12.1_
  
  - [ ]* 5.4 Write unit tests for TemplateDiscoverySection
    - Test category filter updates template display
    - Test templates display in popularity order
    - Test grid layout adjusts at breakpoints
    - Test "View All" CTA navigates correctly
    - _Requirements: 2.1, 2.2, 2.4, 2.5, 2.6_

- [ ] 6. Implement AI Assistance Section
  - [ ] 6.1 Create AIAssistanceSection component
    - Create `components/homepage/AIAssistanceSection.tsx` as Server Component
    - Implement TypeScript interface AIAssistanceSectionProps with headline, features, beforeExample, afterExample, ctaText, ctaHref
    - Create split layout: text content left, visual demonstration right
    - Add before/after comparison visual mockup
    - _Requirements: 3.1, 3.2, 3.4_
  
  - [ ] 6.2 Add AI features list and CTA
    - Display headline emphasizing one-click improvement
    - Display at least 2 specific AI capabilities with icons
    - Show before/after content improvement example
    - Add "Try AI Assistant" CTA button
    - _Requirements: 3.2, 3.3, 3.5_
  
  - [ ]* 6.3 Write unit tests for AIAssistanceSection
    - Test headline renders correctly
    - Test correct number of AI features display
    - Test before/after examples show correctly
    - Test CTA navigates to correct destination
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 7. Implement Live Editing Section
  - [ ] 7.1 Create LiveEditingSection component
    - Create `components/homepage/LiveEditingSection.tsx` as Server Component
    - Implement TypeScript interface LiveEditingSectionProps with headline, description, features, mockupImage, ctaText, ctaHref
    - Create split layout: visual demonstration left, text content right
    - Display split-screen mockup showing editor and preview
    - _Requirements: 4.1, 4.3_
  
  - [ ] 7.2 Add live editing features and CTA
    - Display headline emphasizing instant visual updates
    - List features communicating live editing capabilities
    - Add subtle animation hints showing real-time sync
    - Add "Start Editing" CTA button
    - _Requirements: 4.2, 4.4, 4.5_
  
  - [ ]* 7.3 Write unit tests for LiveEditingSection
    - Test headline and description render
    - Test features list displays correctly
    - Test mockup image loads and displays
    - Test CTA navigates to editor
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 8. Implement Export Options Section
  - [ ] 8.1 Create ExportOptionsSection component
    - Create `components/homepage/ExportOptionsSection.tsx` as Server Component
    - Implement TypeScript interface ExportOptionsSectionProps with headline, exportFormats, features
    - Create centered content with icon grid
    - Display three columns for PDF, DOCX, Share Link
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [ ] 8.2 Add export format cards
    - Create export format card for each format with icon, title, description
    - Add visual file format mockups
    - Display format preservation messaging
    - Include ATS-compatibility messaging
    - _Requirements: 5.2, 5.4, 5.5_
  
  - [ ]* 8.3 Write unit tests for ExportOptionsSection
    - Test headline renders correctly
    - Test all export formats display with icons
    - Test format descriptions show correctly
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 9. Checkpoint - Verify feature sections render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Implement Social Proof Section
  - [ ] 10.1 Create SocialProofSection component
    - Create `components/homepage/SocialProofSection.tsx` as Server Component
    - Implement TypeScript interface SocialProofSectionProps with headline, testimonials, statistics
    - Create grid layout: 3 columns desktop, 2 tablet, 1 mobile
    - Display 3-6 testimonials with equal height cards
    - _Requirements: 6.1, 6.2, 6.6_
  
  - [ ] 10.2 Create TestimonialCard sub-component
    - Display avatar, name, role, company, quote, and rating
    - Use visual hierarchy: name bold, company highlighted
    - Add consistent card styling with hover effects
    - Ensure cards have equal heights in grid
    - _Requirements: 6.3, 6.5_
  
  - [ ] 10.3 Add statistics bar
    - Display quantitative trust signals (user count, satisfaction rate, completion time)
    - Position statistics above or below testimonials
    - Include icons for each statistic
    - _Requirements: 6.4_
  
  - [ ]* 10.4 Write unit tests for SocialProofSection
    - Test correct number of testimonials render
    - Test testimonial data displays correctly
    - Test statistics display with correct values
    - Test grid layout adjusts at breakpoints
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [ ] 11. Implement Pricing Section
  - [ ] 11.1 Create PricingSection component
    - Create `components/homepage/PricingSection.tsx` as Server Component
    - Implement TypeScript interface PricingSectionProps with headline, description, plans
    - Create grid layout: 3 columns desktop, stack on mobile
    - Display exactly 3 pricing cards
    - _Requirements: 7.1, 7.6_
  
  - [ ] 11.2 Create PricingCard sub-component
    - Display plan name, price, billing period, features (max 7), CTA
    - Add checkmark icons for feature bullets
    - Visually highlight recommended plan with badge
    - Ensure cards have equal heights
    - _Requirements: 7.2, 7.3, 7.4, 7.5_
  
  - [ ]* 11.3 Write unit tests for PricingSection
    - Test exactly 3 pricing cards render
    - Test recommended plan is visually highlighted
    - Test maximum 7 features display per plan
    - Test feature bullets use consistent formatting
    - Test layout stacks vertically on mobile
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

- [ ] 12. Implement Final CTA Section
  - [ ] 12.1 Create FinalCTASection component
    - Create `components/homepage/FinalCTASection.tsx` as Server Component
    - Implement TypeScript interface FinalCTASectionProps with headline, supportingCopy, ctaText, ctaHref, backgroundColor
    - Create full-width section with centered content
    - Add contrasting background color
    - _Requirements: 8.1, 8.4_
  
  - [ ] 12.2 Add headline and CTA
    - Display headline restating value proposition (max 15 words)
    - Add primary CTA button (Browse Templates or Start Building)
    - Include optional supporting copy
    - Ensure sufficient padding for visual separation
    - _Requirements: 8.2, 8.3, 8.5_
  
  - [ ]* 12.3 Write unit tests for FinalCTASection
    - Test headline renders with correct text
    - Test CTA button displays and navigates correctly
    - Test contrasting background color applies
    - Test section has adequate padding
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 13. Integrate all sections into homepage
  - [ ] 13.1 Update app/page.tsx with new sections
    - Import all homepage section components
    - Arrange sections in correct order: Hero, TemplateDiscovery, AIAssistance, LiveEditing, ExportOptions, SocialProof, Pricing, FinalCTA
    - Keep existing Navigation and Footer components unchanged
    - Use semantic HTML (main, section tags)
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 12.2_
  
  - [ ] 13.2 Update page metadata for SEO
    - Add page title: "GetEasyCV - Create Professional Resumes in Minutes"
    - Add meta description with key features
    - Add Open Graph metadata with title, description, image
    - _Requirements: 11.1_
  
  - [ ]* 13.3 Write integration tests for homepage flow
    - Test user can browse templates from homepage
    - Test category filter updates template display
    - Test all CTAs navigate to correct destinations
    - Test page renders all sections in correct order
    - _Requirements: 1.3, 2.5, 3.5, 4.5, 8.5, 11.1_

- [ ] 14. Checkpoint - Verify homepage integration
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Implement responsive behavior and mobile optimization
  - [ ] 15.1 Add mobile responsive styles
    - Implement single-column stack for all sections on mobile (<768px)
    - Add minimum 12px spacing between stacked CTAs
    - Set minimum 16px font size for body text
    - Ensure 44px × 44px minimum touch target size
    - Add 16px minimum padding on viewport edges
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [ ] 15.2 Optimize images for mobile
    - Ensure Live_Preview scales proportionally without horizontal scroll
    - Implement responsive image srcset for different screen sizes
    - Add loading="lazy" for below-the-fold images
    - Use next/image for automatic optimization
    - _Requirements: 10.6, 12.1_
  
  - [ ]* 15.3 Write responsive behavior tests
    - Test layouts adjust correctly at 768px breakpoint
    - Test touch targets meet minimum size requirements
    - Test no horizontal scrolling on mobile
    - Test images scale proportionally
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [ ] 16. Implement accessibility features
  - [ ] 16.1 Add semantic HTML and ARIA attributes
    - Use semantic HTML elements (header, nav, main, section, footer)
    - Add descriptive alt text for all meaningful images
    - Ensure proper heading hierarchy (h1, h2, h3) without skipping levels
    - Add ARIA labels where semantic HTML is insufficient
    - _Requirements: 12.2, 12.3, 12.6_
  
  - [ ] 16.2 Implement keyboard navigation and focus states
    - Add visible focus indicators for all interactive elements
    - Ensure tab order follows logical reading order
    - Test keyboard-only navigation works correctly
    - Add skip links if needed for navigation bypass
    - _Requirements: 12.5_
  
  - [ ] 16.3 Ensure color contrast compliance
    - Verify 4.5:1 contrast ratio for body text
    - Verify 3:1 contrast ratio for large text (18px+ or 14px+ bold)
    - Test contrast for all interactive element states (default, hover, focus)
    - _Requirements: 12.4_
  
  - [ ]* 16.4 Write accessibility tests
    - Run axe-core automated accessibility checks
    - Test all images have descriptive alt text
    - Test proper heading hierarchy
    - Test keyboard navigation and focus indicators
    - _Requirements: 12.2, 12.3, 12.4, 12.5, 12.6_

- [ ] 17. Add visual polish and animations
  - [ ] 17.1 Implement hover states and transitions
    - Add hover effects to all interactive elements (buttons, cards, links)
    - Use transition durations between 150ms and 300ms
    - Apply consistent shadow elevation on hover
    - Ensure transitions use ease-in-out timing function
    - _Requirements: 9.6_
  
  - [ ] 17.2 Add page load animations
    - Implement fadeIn animation for hero section
    - Add slideUp animation for sections as they enter viewport
    - Keep animations subtle and non-distracting
    - Ensure animations respect prefers-reduced-motion
    - _Requirements: 9.6_
  
  - [ ]* 17.3 Write visual regression tests
    - Capture screenshots at 320px, 768px, 1280px, 1920px widths
    - Test hover states apply correct styles
    - Test animations trigger correctly
    - Test shadows and borders render consistently
    - _Requirements: 9.6, 9.7_

- [ ] 18. Optimize performance and bundle size
  - [ ] 18.1 Optimize images and assets
    - Convert images to WebP/AVIF with JPEG fallback
    - Implement responsive images with srcset
    - Add blur placeholders for next/image components
    - Ensure images use appropriate dimensions
    - _Requirements: 12.1_
  
  - [ ] 18.2 Implement lazy loading
    - Add lazy loading for below-the-fold images
    - Defer loading of non-critical components
    - Use React.lazy for client components if beneficial
    - _Requirements: 12.1_
  
  - [ ]* 18.3 Run performance audits
    - Run Lighthouse audit and ensure LCP < 2.5s
    - Verify FID < 100ms and CLS < 0.1
    - Check total page weight < 2MB
    - Verify number of requests < 50
    - _Requirements: 12.1_

- [ ] 19. Final checkpoint - Complete testing and review
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability to acceptance criteria
- The implementation follows a modular, section-by-section approach for incremental validation
- Server Components are used by default for static sections; Client Components ('use client') only for interactive elements
- Tailwind CSS custom configuration should be completed early as all components depend on the design system
- Integration testing verifies the complete user conversion flows through the homepage
- Accessibility testing ensures WCAG 2.1 AA compliance for inclusive user experience
- Performance optimization tasks ensure fast load times and excellent Core Web Vitals scores
- Visual regression testing validates layout consistency across breakpoints and browsers

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "2.1", "2.2", "2.3"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["3.1", "5.1", "6.1", "7.1", "8.1", "10.1", "11.1", "12.1"] },
    { "id": 3, "tasks": ["3.2", "3.3", "5.2", "6.2", "7.2", "8.2", "10.2", "10.3", "11.2", "12.2"] },
    { "id": 4, "tasks": ["5.3", "5.4", "6.3", "7.3", "8.3", "10.4", "11.3", "12.3"] },
    { "id": 5, "tasks": ["13.1", "13.2"] },
    { "id": 6, "tasks": ["13.3", "15.1", "16.1"] },
    { "id": 7, "tasks": ["15.2", "15.3", "16.2", "16.3", "17.1"] },
    { "id": 8, "tasks": ["16.4", "17.2", "17.3", "18.1"] },
    { "id": 9, "tasks": ["18.2", "18.3"] }
  ]
}
```
