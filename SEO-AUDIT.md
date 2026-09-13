# GetEasyCV — Comprehensive Phase 0 SEO Audit Report

**Target Site**: https://geteasycv.com/  
**Framework**: Next.js 16.3.1 (App Router, Turbopack)  
**Date**: September 13, 2026  
**Auditor**: Senior Technical SEO & Full-Stack Engineering Team  

---

## 1. Executive Summary

GetEasyCV is a modern web application built on Next.js 16 (App Router) designed to help job seekers create recruiter-approved, ATS-friendly resumes and CVs. 

### Key Strengths
- **Next.js 16 App Router Infrastructure**: Fast server-side rendering (SSR) and static generation (SSG) with `generateStaticParams` for blog posts (`/blog/[slug]`) and resume examples (`/resume-examples/[slug]`).
- **Structured Data Foundations**: Global `OrganizationSchema` and `SoftwareAppSchema` present in root layout, with `FAQSchema` and `BreadcrumbSchema` on landing pages.
- **Search Engine Crawling Controls**: Dynamic `app/robots.ts` and `app/sitemap.ts` configured for automatic site map generation.
- **Modern Typography & Font Loading**: Utilizing `next/font/google` (`Roboto`) with `display: 'swap'` to avoid layout shifts.

### Key Weaknesses & Technical Risks
1. **Redirection Mechanics**: `/cv-builder` uses runtime server redirect (`redirect('/resume-builder')`) instead of a permanent `301` redirect configured at the edge/router level in `next.config.ts`.
2. **Copy & Stat Discrepancies**: Inconsistent claims regarding template counts across pages (`100+` in `HeroNew.tsx`, `150+` in `templates/page.tsx` and `ResumeBuilderClientContent.tsx`, `150+` in `SocialProofNew.tsx`). Marketing copy needs alignment to ensure 100% accuracy and trust.
3. **Structured Data Gaps**: `PricingSimplified.tsx` lacks `Product` / `AggregateOffer` schema; tool pages (`/ats-checker`, `/tools/*`) lack dedicated `WebApplication` schemas.
4. **Internal Linking Network**: Contextual cross-links between related blog posts, resume example guides, and builder entry points are incomplete.
5. **Metadata Uniformity**: OpenGraph image dimensions and absolute URLs are missing or inconsistent across minor landing pages.

---

## 2. Site Architecture & Page Rendering Models

| Route / Pattern | Rendering Strategy | Indexable? | Notes / Status |
| :--- | :--- | :--- | :--- |
| `/` | SSG / ISR | Yes | Main landing page, high priority (1.0) |
| `/resume-builder` | SSG | Yes | Primary resume builder landing page |
| `/free-resume-builder` | SSG | Yes | Target landing page for "free resume builder" |
| `/ats-resume-builder` | SSG | Yes | Target landing page for "ATS resume builder" |
| `/cv-builder` | Server Redirect | Redirect (307) | **Action Required**: Convert to permanent 301 in `next.config.ts` |
| `/templates` | SSG / CSR | Yes | Template catalog page |
| `/ats-checker` | SSG / CSR | Yes | Interactive ATS resume checker |
| `/tools/job-description-matcher` | SSG / CSR | Yes | Job description keyword matching tool |
| `/tools/resume-summary-generator` | SSG / CSR | Yes | AI summary generation tool |
| `/cover-letter` | SSG / CSR | Yes | Cover letter generator landing page |
| `/pricing` | SSG | Yes | Pricing tier page |
| `/blog` | SSG | Yes | Main blog directory |
| `/blog/[slug]` | SSG (`generateStaticParams`) | Yes | Pre-rendered static blog articles |
| `/resume-examples` | SSG | Yes | Directory of resume examples |
| `/resume-examples/[slug]` | SSG (`generateStaticParams`) | Yes | 12 high-intent career role guides |
| `/editor` | CSR | No (`disallow`) | Core editing application; correctly disallowed in `robots.ts` |
| `/dashboard` | CSR | No (`disallow`) | User workspace; correctly disallowed in `robots.ts` |
| `/admin/*` | CSR | No (`disallow`) | Administration dashboard; correctly disallowed in `robots.ts` |
| `/api/*` | API Routes | No (`disallow`) | Backend endpoints; correctly disallowed in `robots.ts` |

---

## 3. Crawling & Indexability Audit

### `robots.ts` Review
- **Current Setup**: Disallows `/admin/`, `/api/`, `/dashboard/`, `/editor/`, `/my-resumes/`, `/coming-soon`.
- **Verdict**: Compliant with crawl budget guidelines. User private areas are properly shielded.

### `sitemap.ts` Review
- **Current Setup**: Includes 26 static routes, dynamic `resume-examples` (12 routes), and published `blog` articles.
- **Issues Identified**: 
  - Host URL defaults to `https://geteasycv.com`.
  - Priorities and `changeFrequency` settings are properly structured.

### Canonical Tags
- **Current Setup**: `app/layout.tsx` uses `alternates: { canonical: './' }`. Individual subpages define explicit canonical URLs (e.g. `alternates: { canonical: 'https://geteasycv.com/resume-builder' }`).
- **Verdict**: Standardized canonical implementation.

---

## 4. Technical SEO Audit

1. **Title & Meta Descriptions**:
   - Primary landing pages (`/`, `/resume-builder`, `/templates`, `/ats-checker`, `/pricing`) have unique titles under 60 characters and meta descriptions under 160 characters.
   - Dynamic pages (`/blog/[slug]`, `/resume-examples/[slug]`) inject accurate titles and excerpts.

2. **Open Graph & Twitter Cards**:
   - Root layout defines `og:title`, `og:description`, `og:image`, `twitter:card` (`summary_large_image`).
   - Image fallback relies on `/images/templates/modern_professional.png`.

3. **Viewport & Responsive Layout**:
   - Next.js default viewport tags ensure mobile adaptability without zoom restrictions.

---

## 5. Structured Data Audit (JSON-LD)

| Schema Type | Location | Implementation Status | Improvements Needed |
| :--- | :--- | :--- | :--- |
| `Organization` | `app/layout.tsx` | Active via `OrganizationSchema` | Ensure official social URLs are updated |
| `WebSite` | `components/seo/SchemaOrg.tsx` | Active via `WebSiteSchema` | Add Sitelinks SearchBox configuration |
| `SoftwareApplication` | `app/layout.tsx` | Active via `SoftwareAppSchema` | Add pricing details (`Offers`) |
| `BlogPosting` | `components/seo/SchemaOrg.tsx` | Active via `ArticleSchema` | Verify publisher logo and author details |
| `FAQPage` | Key Landing Pages | Active via `FAQSchema` | Add FAQ schema to `/pricing` and `/tools` |
| `BreadcrumbList` | Landing & Subpages | Active via `BreadcrumbSchema` | Ensure 100% coverage on all subpages |
| `WebPage` | `/resume-examples/[slug]` | Active via `WebPageSchema` | Standardize across category hubs |

---

## 6. Content & Quality Audit

1. **Authenticity & Claim Alignment**:
   - **Issue**: Template count variations (`100+`, `150+`, etc.) need uniform framing to reflect exact customizable template combinations available.
   - **Resolution**: Standardize messaging around recruiter-approved layouts and customizable styling options without exaggeration.
2. **AI Boilerplate & Thin Copy**:
   - **Issue**: Standardize repetitive intro paragraphs across landing sub-pages (`/free-resume-builder`, `/ats-resume-builder`, `/resume-maker`).
   - **Resolution**: Enhance distinct value propositions for each keyword intent.

---

## 7. On-Page & Heading Hierarchy Audit

1. **H1 Tag Uniqueness**:
   - Every public route must maintain exactly **one** `<h1>` tag matching the target user search intent.
2. **H2 & H3 Logical Progression**:
   - Verify headings flow sequentially without skipping levels (`H1 -> H2 -> H3`).
3. **Image Alt Text**:
   - Preview cards, icons, and hero illustrations must specify descriptive `alt` tags avoiding generic terms like "image" or "picture".

---

## 8. UX, Performance & Core Web Vitals Audit

1. **Font Delivery**: `next/font/google` (`Roboto`) loaded with `display: 'swap'` prevents Flash of Unstyled Text (FOUT).
2. **Cumulative Layout Shift (CLS)**: Dynamic editor components isolated to CSR (`/editor`), maintaining 0 CLS on static public marketing routes.
3. **Largest Contentful Paint (LCP)**: Hero sections use optimized layout structures.

---

## 9. Prioritized Action Plan (Phases 1 – 22)

### High Priority
- **Permanent 301 Redirects**: Implement 301 redirects in `next.config.ts` for `/cv-builder` and legacy aliases.
- **Copy Consistency**: Uniformly adjust template counts and social proof statistics.
- **Structured Data Completeness**: Add `Product`/`Offer` schemas to `/pricing` and `WebApplication` schemas to AI tool pages.
- **Contextual Internal Linking**: Cross-link blog posts, role-specific resume examples, and templates.

### Medium Priority
- **Content Expansion**: Enhance unique copy for niche landing pages (`/resume-builder-for-students`, `/resume-builder-for-freshers`).
- **Breadcrumb Audit**: Ensure all subpages implement valid `BreadcrumbSchema`.
- **Image Optimization**: Ensure all static images specify explicit width/height and descriptive `alt` text.

### Low Priority
- **Minor Metadata Enhancements**: Optimize character counts on secondary legal/help pages.
- **OG Image Customization**: Generate dynamic OG preview cards for individual blog posts and resume guides.

---
*Report stored in project root `SEO-AUDIT.md`.*
