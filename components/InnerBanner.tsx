import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  LucideIcon,
  ChevronRight,
  Home,
  Sparkles,
  ShieldCheck,
  Zap,
  Bot,
  FileText,
  Clock,
  MessageSquare,
  Award,
  Users,
  CheckCircle2,
} from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BannerAction {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: LucideIcon;
  variant?: "primary" | "secondary";
}

export type InnerBannerPageType =
  | "cover-letter"
  | "ats-checker"
  | "ai-features"
  | "how-it-works"
  | "about"
  | "contact"
  | "templates"
  | "resume-examples"
  | "help-center"
  | "help"
  | "faq"
  | "default";

export interface InnerBannerProps {
  /** Tag / pill badge text displayed at top (e.g. "AI COVER LETTER BUILDER") */
  badge?: string;
  /** Optional icon displayed inside the badge */
  badgeIcon?: LucideIcon;
  /** Breadcrumb navigation items */
  breadcrumbs?: BreadcrumbItem[];
  /** Main heading text */
  title: string | React.ReactNode;
  /** Highlighted accent word(s) inside heading colored with brand coral #F3645C */
  highlightText?: string;
  /** Text that follows the highlight text */
  titleSuffix?: string;
  /** Subtitle or description paragraph */
  description?: string | React.ReactNode;
  /** Primary action button */
  primaryAction?: BannerAction;
  /** Secondary action button */
  secondaryAction?: BannerAction;
  /** Bullet feature items with coral checkmarks */
  features?: string[];
  /** Banner layout variant: 'split' (2-column hero with visual) | 'center' (centered layout) | 'compact' */
  variant?: "split" | "center" | "compact";
  /** Explicit page type for automatic tailored visual selection */
  pageType?: InnerBannerPageType;
  /** Custom right-hand visual element (overrides automatic page visual) */
  visual?: React.ReactNode;
  /** Optional custom action elements (e.g. search bars, filters, tabs) */
  children?: React.ReactNode;
  /** Additional wrapper CSS classes */
  className?: string;
}

/* ========================================================================= */
/* 1. COVER LETTER DEDICATED RIGHT-SIDE VISUAL                                */
/* ========================================================================= */
export function CoverLetterVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[480px] rounded-2xl border border-slate-200/90 bg-white p-5 text-slate-600 shadow-[0_20px_50px_rgba(0,0,0,0.06)] sm:p-7 transition-all">
      {/* Floating AI Badge */}
      <div className="absolute -right-2 -top-3 grid h-12 w-12 place-items-center rounded-full bg-[#F3645C] text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-[#F3645C]/30 sm:-right-4 sm:-top-4 sm:h-14 sm:w-14 pointer-events-none">
        <div className="flex flex-col items-center leading-none">
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] sm:text-xs">AI</span>
        </div>
      </div>

      {/* Mac Window Dots */}
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#FF605C]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#FFBD44]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#00CA4E]" />
        </div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          AI Cover Letter Generator
        </span>
      </div>

      {/* Split Interactive Document Preview */}
      <div className="grid grid-cols-[115px_1fr] gap-3.5 sm:grid-cols-[135px_1fr] sm:gap-5">
        {/* Left Inputs Column */}
        <div className="space-y-2.5 border-r border-slate-100 pr-3">
          <div>
            <b className="block text-[11.5px] font-bold text-slate-900 leading-tight">
              Sarah Jenkins
            </b>
            <span className="text-[9.5px] text-[#F3645C] font-semibold">
              Product Designer
            </span>
          </div>

          <div className="rounded-lg bg-slate-50 border border-slate-100 p-2 space-y-1 text-[8.5px]">
            <span className="text-slate-400 font-bold block uppercase tracking-wider text-[7.5px]">
              TARGET ROLE
            </span>
            <span className="font-bold text-slate-800 block truncate">
              Senior UX Designer
            </span>
            <span className="text-slate-500 block truncate">
              @ Stripe
            </span>
          </div>

          <div className="space-y-1 text-[8.5px] text-slate-600 font-medium">
            <div className="flex items-center gap-1 text-[#58C09D] font-bold">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>Tailored Tone</span>
            </div>
            <div className="flex items-center gap-1 text-[#58C09D] font-bold">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>Quantified Wins</span>
            </div>
          </div>

          <div className="pt-1">
            <div className="w-full rounded-lg bg-[#0F0F0F] py-1.5 text-center text-[8.5px] font-bold text-white shadow-xs">
              Generate Draft
            </div>
          </div>
        </div>

        {/* Right Letterhead Content */}
        <div className="space-y-2 text-left font-sans leading-relaxed text-[9px] sm:text-[9.5px] text-slate-700">
          <div className="border-b border-slate-100 pb-1.5">
            <p className="font-bold text-slate-900 text-[10px]">
              Dear Stripe Hiring Team,
            </p>
          </div>
          <p className="line-clamp-4 leading-normal text-slate-600">
            I am excited to apply for the Senior UX Designer role at Stripe. Over the past 6 years, I have architected user flows that increased checkout conversions by 34% and led cross-functional design sprints.
          </p>
          <p className="text-slate-500 text-[8.5px] line-clamp-2">
            I admire Stripe&apos;s commitment to developer precision and elegant simplicity...
          </p>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[8.5px]">
            <span className="font-bold text-slate-900">Sincerely, Sarah Jenkins</span>
            <span className="text-[#58C09D] font-bold">✓ ATS-Friendly</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 2. ATS CHECKER DEDICATED RIGHT-SIDE VISUAL                                 */
/* ========================================================================= */
export function ATSCheckerVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[480px] rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 text-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.06)] text-left transition-all">
      {/* Floating Match Badge */}
      <div className="absolute -right-2 -top-3 rounded-full bg-[#58C09D] px-3.5 py-1 text-xs font-bold text-white shadow-lg shadow-[#58C09D]/30 sm:-right-4 sm:-top-4 pointer-events-none flex items-center gap-1">
        <Zap className="w-3.5 h-3.5" />
        <span>Sample Diagnostic</span>
      </div>

      {/* Mac Window Header */}
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#FF605C]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#FFBD44]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#00CA4E]" />
        </div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Real-Time ATS Diagnostic
        </span>
      </div>

      {/* Circular Gauge + Parser Breakdown */}
      <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[125px_1fr] gap-4 items-center">
        {/* Gauge */}
        <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">92</div>
          <div className="text-[9.5px] font-extrabold uppercase text-[#58C09D] tracking-wider mt-0.5">Strong Match</div>
          <div className="text-[8.5px] text-slate-400 mt-1">Diagnostic Score</div>
        </div>

        {/* Section Checks */}
        <div className="space-y-2 text-xs">
          {[
            { label: 'Parseable Contact Layer', ok: true },
            { label: 'Standard Section Hierarchy', ok: true },
            { label: 'Keyword Density & Match', ok: true },
            { label: 'Clean Single-Page Margins', ok: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between text-[11px]">
              <span className="text-slate-600 font-medium">{item.label}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#58C09D] shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 3. AI FEATURES DEDICATED RIGHT-SIDE VISUAL                                 */
/* ========================================================================= */
export function AIFeaturesVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[480px] rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 text-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.06)] text-left transition-all">
      {/* Floating Badge */}
      <div className="absolute -right-2 -top-3 rounded-full bg-[#F3645C] px-3.5 py-1 text-xs font-bold text-white shadow-lg shadow-[#F3645C]/30 sm:-right-4 sm:-top-4 pointer-events-none flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Live AI Polish</span>
      </div>

      {/* Mac Window Header */}
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#FF605C]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#FFBD44]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#00CA4E]" />
        </div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          AI Bullet Optimizer Demo
        </span>
      </div>

      {/* Before / After Container */}
      <div className="space-y-3">
        {/* Before AI Enhancement */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold">
            <span className="text-slate-400 uppercase tracking-wider">ORIGINAL DRAFT</span>
            <span className="text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded text-[9px]">Draft</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-500 line-through decoration-slate-300">
            &quot;Managed team and helped increase sales for marketing campaigns.&quot;
          </p>
        </div>

        {/* After AI Enhancement */}
        <div className="p-3 rounded-xl bg-[#FFF9F6] border border-[#F3645C]/25 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-[10px] font-bold">
            <span className="text-[#F3645C] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI ENHANCED SUGGESTION
            </span>
            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-[9px]">Polished</span>
          </div>
          <p className="text-[10.5px] sm:text-[11.5px] text-slate-900 font-semibold leading-relaxed">
            &quot;Managed sales initiatives and improved pipeline performance through targeted multi-channel campaign optimization.&quot;
          </p>
        </div>

        {/* Action pills */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[9px] font-bold">Professional</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[9px] font-bold">Action-Oriented</span>
          </div>
          <span className="text-[9.5px] font-bold text-[#58C09D]">✓ 1-Click Apply</span>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 4. HOW IT WORKS DEDICATED RIGHT-SIDE VISUAL                                */
/* ========================================================================= */
export function HowItWorksVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[480px] rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 text-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.06)] text-left transition-all">
      {/* Floating Badge */}
      <div className="absolute -right-2 -top-3 rounded-full bg-[#0F0F0F] px-3.5 py-1 text-xs font-bold text-white shadow-lg sm:-right-4 sm:-top-4 pointer-events-none flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-[#F5D17B]" />
        <span>4-Step Flow</span>
      </div>

      {/* Mac Window Header */}
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#FF605C]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#FFBD44]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#00CA4E]" />
        </div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Builder Workflow
        </span>
      </div>

      {/* Step Sequence */}
      <div className="space-y-2.5">
        {[
          { step: '01', title: 'Pick a Template', desc: 'Choose from 200+ clean template variations', color: 'text-[#F3645C] bg-[#FFF9F6]' },
          { step: '02', title: 'Enter Work Experience', desc: 'Fill in your roles or use AI writing assists', color: 'text-[#2563EB] bg-[#F6F8FF]' },
          { step: '03', title: 'Run ATS Diagnostic', desc: 'Check keyword balance and layout structure', color: 'text-[#58C09D] bg-[#F0FDF4]' },
          { step: '04', title: 'Export Vector PDF', desc: 'Download clean, print-ready documents', color: 'text-[#7C3AED] bg-[#F7F4FD]' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
            <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-[11px] shrink-0 ${item.color}`}>
              {item.step}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-900 leading-tight">{item.title}</div>
              <div className="text-[10px] text-slate-500 truncate">{item.desc}</div>
            </div>
            <Check className="w-3.5 h-3.5 text-slate-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 5. ABOUT US DEDICATED RIGHT-SIDE VISUAL                                    */
/* ========================================================================= */
export function AboutVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[480px] rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 text-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.06)] text-left transition-all">
      {/* Floating Badge */}
      <div className="absolute -right-2 -top-3 rounded-full bg-[#0F0F0F] px-3.5 py-1 text-xs font-bold text-white shadow-lg sm:-right-4 sm:-top-4 pointer-events-none flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-[#F5D17B]" />
        <span>Our Platform</span>
      </div>

      {/* Mac Window Header */}
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#FF605C]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#FFBD44]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#00CA4E]" />
        </div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Platform Architecture
        </span>
      </div>

      {/* Grid of 4 Key Platform Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-[#FFF9F6] border border-[#FEE1CF] space-y-1">
          <div className="text-xl sm:text-2xl font-extrabold text-[#0F0F0F]">200+</div>
          <div className="text-[10px] font-bold text-[#F3645C] uppercase tracking-wider">Template Variations</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#F6F8FF] border border-[#BAC7FE]/40 space-y-1">
          <div className="text-xl sm:text-2xl font-extrabold text-[#0F0F0F]">ATS</div>
          <div className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">Friendly Layouts</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#FFFDF5] border border-[#F5D17B]/40 space-y-1">
          <div className="text-xl sm:text-2xl font-extrabold text-[#0F0F0F]">16</div>
          <div className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider">Professional Layouts</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#F7F4FD] border border-[#D0B9EF]/40 space-y-1">
          <div className="text-xl sm:text-2xl font-extrabold text-[#0F0F0F]">Secure</div>
          <div className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-wider">Privacy-Focused</div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 6. CONTACT / SUPPORT DEDICATED RIGHT-SIDE VISUAL                           */
/* ========================================================================= */
export function ContactVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[480px] rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 text-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.06)] text-left transition-all">
      {/* Floating Badge */}
      <div className="absolute -right-2 -top-3 rounded-full bg-[#0F0F0F] px-3.5 py-1 text-xs font-bold text-white shadow-lg sm:-right-4 sm:-top-4 pointer-events-none flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#58C09D] animate-pulse" />
        <span>Support Live</span>
      </div>

      {/* Mac Window Header */}
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#FF605C]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#FFBD44]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#00CA4E]" />
        </div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Dedicated Assistance
        </span>
      </div>

      <div className="space-y-3">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#FEE1CF] flex items-center justify-center text-[#F3645C]">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Average Response Time</h4>
            <p className="text-[10px] text-slate-500">&lt; 15 minutes during business hours</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#BAC7FE] flex items-center justify-center text-[#0F0F0F]">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">24/7 Priority Support</h4>
            <p className="text-[10px] text-slate-500">Instant answers via help desk and chat</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#D0B9EF] flex items-center justify-center text-[#0F0F0F]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Human Expert Guidance</h4>
            <p className="text-[10px] text-slate-500">Real resume designers ready to help</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Fallback Default Document Preview Card
 */
export function DefaultDocumentPreview() {
  return <CoverLetterVisual />;
}

export default function InnerBanner({
  badge,
  badgeIcon: BadgeIcon,
  breadcrumbs,
  title,
  highlightText,
  titleSuffix,
  description,
  primaryAction,
  secondaryAction,
  features,
  variant = "split",
  pageType,
  visual,
  children,
  className = "",
}: InnerBannerProps) {
  const isCentered = variant === "center";
  const isCompact = variant === "compact";

  // Helper to determine the best visual if none provided explicitly
  const resolveVisual = () => {
    if (visual) return visual;

    // Check explicit pageType
    if (pageType === "cover-letter") return <CoverLetterVisual />;
    if (pageType === "ats-checker") return <ATSCheckerVisual />;
    if (pageType === "ai-features") return <AIFeaturesVisual />;
    if (pageType === "how-it-works") return <HowItWorksVisual />;
    if (pageType === "about") return <AboutVisual />;
    if (pageType === "contact") return <ContactVisual />;
    if (pageType === "resume-examples") return <CoverLetterVisual />;

    // Auto-detect based on breadcrumbs
    if (breadcrumbs && breadcrumbs.length > 0) {
      const firstHref = breadcrumbs[0]?.href || "";
      const firstLabel = breadcrumbs[0]?.label?.toLowerCase() || "";

      if (firstHref.includes("cover-letter") || firstLabel.includes("cover letter")) {
        return <CoverLetterVisual />;
      }
      if (firstHref.includes("ats-checker") || firstLabel.includes("ats")) {
        return <ATSCheckerVisual />;
      }
      if (firstHref.includes("ai-features") || firstLabel.includes("ai")) {
        return <AIFeaturesVisual />;
      }
      if (firstHref.includes("how-it-works") || firstLabel.includes("how it works")) {
        return <HowItWorksVisual />;
      }
      if (firstHref.includes("about") || firstLabel.includes("about")) {
        return <AboutVisual />;
      }
      if (firstHref.includes("contact") || firstLabel.includes("contact") || firstLabel.includes("help")) {
        return <ContactVisual />;
      }
    }

    return <DefaultDocumentPreview />;
  };

  const renderAction = (action: BannerAction, isPrimary: boolean) => {
    const IconComponent = action.icon || (isPrimary ? ArrowRight : undefined);
    const baseClasses = isPrimary
      ? "inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F0F0F] px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:bg-[#262626] hover:scale-105 active:scale-95 cursor-pointer"
      : "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200/90 bg-white px-5 py-3.5 text-xs sm:text-sm font-bold text-[#0F0F0F] shadow-2xs transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95 cursor-pointer";

    if (action.href) {
      return (
        <Link key={action.label} href={action.href} className={baseClasses}>
          <span>{action.label}</span>
          {IconComponent && <IconComponent className="h-3.5 w-3.5 shrink-0" />}
        </Link>
      );
    }

    return (
      <button
        key={action.label}
        type="button"
        onClick={action.onClick}
        className={baseClasses}
      >
        <span>{action.label}</span>
        {IconComponent && <IconComponent className="h-3.5 w-3.5 shrink-0" />}
      </button>
    );
  };

  return (
    <section
      className={`relative overflow-hidden bg-[linear-gradient(135deg,#FFF9F6_0%,#FFF2EB_45%,#F8F8F6_100%)] border-b border-[#0F0F0F]/10 ${
        isCompact
          ? "py-8 sm:py-10"
          : isCentered
          ? "py-12 sm:py-16 lg:py-20"
          : "py-12 sm:py-16 lg:py-20"
      } ${className}`}
    >
      {/* Background Decorative Dot Grid Matrix */}
      <div className="absolute right-8 top-8 hidden lg:block opacity-25 pointer-events-none">
        <div className="grid grid-cols-6 gap-2.5">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#F3645C]" />
          ))}
        </div>
      </div>

      {/* Ambient decorative blur blobs */}
      <div
        className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full opacity-20"
        style={{ background: "#BAC7FE", filter: "blur(70px)" }}
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full opacity-25"
        style={{ background: "#FFE0CF", filter: "blur(70px)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1340px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className={`mb-5 flex items-center text-xs text-slate-500 font-medium ${isCentered ? "justify-center" : ""}`}>
            <ol className="inline-flex items-center gap-1.5 flex-wrap">
              <li className="inline-flex items-center gap-1">
                <Link href="/" className="hover:text-[#F3645C] transition-colors inline-flex items-center gap-1 text-slate-500 font-medium">
                  <Home className="h-3.5 w-3.5" />
                  <span>Home</span>
                </Link>
              </li>
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li key={crumb.label} className="inline-flex items-center gap-1.5">
                    <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
                    {crumb.href && !isLast ? (
                      <Link href={crumb.href} className="hover:text-[#F3645C] transition-colors text-slate-500 font-medium">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-[#0F0F0F] font-bold">{crumb.label}</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {isCentered ? (
          /* ========================================================================= */
          /* CENTERED LAYOUT                                                           */
          /* ========================================================================= */
          <div className="mx-auto max-w-3xl text-center">
            {badge && (
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0F0F0F]/10 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0F0F0F] shadow-2xs backdrop-blur-xs">
                {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5 text-[#F3645C]" />}
                <span>{badge}</span>
              </div>
            )}

            <h1 className="text-3xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-4xl lg:text-5xl leading-[1.12]">
              {title}
              {highlightText && (
                <>
                  {" "}
                  <span className="relative inline-block text-[#F3645C]">
                    {highlightText}
                  </span>
                </>
              )}
              {titleSuffix && <> {titleSuffix}</>}
            </h1>

            {description && (
              <div className="mx-auto mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base lg:text-lg text-[#333333] leading-relaxed font-normal">
                {description}
              </div>
            )}

            {(primaryAction || secondaryAction) && (
              <div className="mt-7 flex flex-wrap justify-center gap-3.5">
                {primaryAction && renderAction(primaryAction, true)}
                {secondaryAction && renderAction(secondaryAction, false)}
              </div>
            )}

            {features && features.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs font-bold text-[#333333]">
                {features.map((feat) => (
                  <span key={feat} className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-[#F3645C] shrink-0 stroke-[2.5]" />
                    {feat}
                  </span>
                ))}
              </div>
            )}

            {children && <div className="mt-8">{children}</div>}
          </div>
        ) : (
          /* ========================================================================= */
          /* SPLIT / TWO-COLUMN HERO LAYOUT                                             */
          /* ========================================================================= */
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left Content Column */}
            <div>
              {badge && (
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0F0F0F]/10 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0F0F0F] shadow-2xs backdrop-blur-xs">
                  {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5 text-[#F3645C]" />}
                  <span>{badge}</span>
                </div>
              )}

              <h1 className="text-3xl font-extrabold tracking-tight text-[#0F0F0F] sm:text-4xl lg:text-5xl leading-[1.12]">
                {title}
                {highlightText && (
                  <>
                    {" "}
                    <span className="relative inline-block text-[#F3645C]">
                      {highlightText}
                    </span>
                  </>
                )}
                {titleSuffix && <> {titleSuffix}</>}
              </h1>

              {description && (
                <div className="mt-4 sm:mt-5 max-w-xl text-sm sm:text-base lg:text-lg text-[#333333] leading-relaxed font-normal">
                  {description}
                </div>
              )}

              {(primaryAction || secondaryAction) && (
                <div className="mt-7 flex flex-wrap gap-3.5">
                  {primaryAction && renderAction(primaryAction, true)}
                  {secondaryAction && renderAction(secondaryAction, false)}
                </div>
              )}

              {features && features.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-4 sm:gap-6 text-xs font-bold text-[#333333]">
                  {features.map((feat) => (
                    <span key={feat} className="inline-flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-[#F3645C] shrink-0 stroke-[2.5]" />
                      {feat}
                    </span>
                  ))}
                </div>
              )}

              {children && <div className="mt-7">{children}</div>}
            </div>

            {/* Right Visual Column */}
            <div className="flex justify-center lg:justify-end">
              {resolveVisual()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

