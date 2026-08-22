"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  User,
  AlignLeft,
  Briefcase,
  GraduationCap,
  Paperclip,
  Folder,
  Award,
  Globe,
  GripVertical,
  Plus,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  ChevronDown,
  Eye,
  Download,
  FileText,
  Pencil,
  Sparkles,
  BarChart3,
  Smartphone,
  Shield,
  Headphones,
} from "lucide-react";

export default function ResumeBuilderFeatures() {
  const sectionsList = [
    { label: "Personal Info", icon: User, selected: true },
    { label: "Summary", icon: AlignLeft, selected: false },
    { label: "Experience", icon: Briefcase, selected: false },
    { label: "Education", icon: GraduationCap, selected: false },
    { label: "Skills", icon: Paperclip, selected: false },
    { label: "Projects", icon: Folder, selected: false },
    { label: "Certifications", icon: Award, selected: false },
    { label: "Languages", icon: Globe, selected: false },
  ];

  const featureCards = [
    {
      icon: FileText,
      iconBg: "bg-[#FFF0EB]/80 text-[#FF570F]",
      title: "ATS Friendly Templates",
      description:
        "Professionally designed templates that pass ATS scans and get you noticed by recruiters.",
    },
    {
      icon: Pencil,
      iconBg: "bg-blue-100/80 text-blue-600",
      title: "Easy Customization",
      description:
        "Drag, drop, and customize sections to create a resume that perfectly matches your style.",
    },
    {
      icon: Sparkles,
      iconBg: "bg-emerald-100/80 text-emerald-600",
      title: "AI-Powered Suggestions",
      description:
        "Get intelligent suggestions for your content, skills, and achievements powered by AI.",
    },
    {
      icon: Eye,
      iconBg: "bg-amber-100/80 text-amber-600",
      title: "Real-time Preview",
      description:
        "See changes instantly with our real-time preview as you build your resume.",
    },
    {
      icon: Download,
      iconBg: "bg-rose-100/80 text-rose-600",
      title: "Multiple Export Options",
      description:
        "Download your resume in PDF, Word, or plain text format with perfect formatting.",
    },
    {
      icon: BarChart3,
      iconBg: "bg-cyan-100/80 text-cyan-600",
      title: "Resume Score Analysis",
      description:
        "Get a detailed score and tips to improve your resume and increase your interview chances.",
    },
    {
      icon: Globe,
      iconBg: "bg-yellow-100/80 text-amber-600",
      title: "Multi-language Support",
      description:
        "Create resumes in multiple languages and reach global opportunities.",
    },
    {
      icon: Smartphone,
      iconBg: "bg-[#FFF0EB]/80 text-[#FF570F]",
      title: "Mobile Responsive",
      description:
        "Build and edit your resume seamlessly on any device, anywhere, anytime.",
    },
    {
      icon: Shield,
      iconBg: "bg-[#FFF0EB]/80 text-[#FF570F]",
      title: "Data Privacy & Security",
      description:
        "Your data is encrypted and secure. We never share your information with third parties.",
    },
    {
      icon: Headphones,
      iconBg: "bg-teal-100/80 text-teal-600",
      title: "Expert Support",
      description:
        "Get help when you need it with our dedicated support team available 24/7.",
    },
  ];

  return (
    <section className="bg-[#F8F9FE] py-12 sm:py-16 border-t border-gray-100/80 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badge */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-[#FFD4C2] shadow-xs text-xs font-bold tracking-wider text-[#FF570F] uppercase">
            POWERFUL &amp; EASY TO USE
          </span>
        </div>

        {/* Top Split Header & Interactive App Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center mb-12 sm:mb-14">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-5 text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              Resume Builder <br />
              <span className="text-[#FF570F]">Features</span>
            </h2>
            <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg">
              Everything you need to create a professional resume that gets you
              hired. Built for modern job seekers.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/editor"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF570F] hover:bg-[#E04800] text-white font-semibold rounded-md shadow-md shadow-[#FF570F]/25 transition-all text-xs sm:text-sm"
              >
                Create My Resume
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-md border border-gray-200/90 shadow-xs transition-all text-xs sm:text-sm"
              >
                Explore Templates
              </Link>
            </div>
          </div>

          {/* Right Column: Resume Builder Editor UI Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-md border border-gray-100 shadow-2xl p-4 sm:p-5">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-start">
                {/* 1. Left Panel: Sections Menu (md:col-span-3) */}
                <div className="md:col-span-3 bg-gray-50/70 border border-gray-100 rounded-md p-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 px-1 text-left">
                    Sections
                  </div>
                  <div className="space-y-1">
                    {sectionsList.map((sec, idx) => {
                      const IconComp = sec.icon;
                      return (
                        <div
                          key={idx}
                          className={`flex items-center justify-between px-2 py-1.5 rounded-md text-[11px] font-medium transition-colors ${
                            sec.selected
                              ? "bg-[#FFF8F5] text-[#FF570F] font-semibold border border-[#FFD4C2]"
                              : "bg-white text-gray-700 hover:bg-gray-100/80 border border-gray-100/60"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <IconComp
                              className={`w-3.5 h-3.5 shrink-0 ${
                                sec.selected ? "text-[#FF570F]" : "text-gray-400"
                              }`}
                            />
                            <span className="truncate">{sec.label}</span>
                          </div>
                          <GripVertical className="w-3 h-3 text-gray-300 shrink-0" />
                        </div>
                      );
                    })}
                  </div>

                  <button className="w-full mt-3 py-1.5 px-2 bg-[#FFF8F5] hover:bg-[#FFF0EB] text-[#FF570F] text-[11px] font-semibold rounded-md border border-[#FFD4C2]/80 flex items-center justify-center gap-1 transition-colors cursor-pointer">
                    <Plus className="w-3 h-3" />
                    <span>Add Section</span>
                  </button>
                </div>

                {/* 2. Middle Panel: Resume Canvas Preview (md:col-span-6) */}
                <div className="md:col-span-6 bg-white border border-gray-200/70 rounded-md p-4 shadow-xs text-left font-sans space-y-3">
                  {/* Profile Header */}
                  <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-[#FF570F] flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-xs overflow-hidden">
                      <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="currentColor">
                        <rect width="100" height="100" fill="#FF570F" />
                        <circle cx="50" cy="38" r="22" fill="#E0E7FF" />
                        <path d="M15 90 C 15 65, 85 65, 85 90 Z" fill="#E0E7FF" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs sm:text-sm leading-snug">
                        Alex Johnson
                      </h4>
                      <p className="text-[10px] text-gray-500 font-medium">
                        Senior Full Stack Developer
                      </p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[8.5px] text-gray-400 mt-1">
                        <span className="inline-flex items-center gap-0.5">
                          <Mail className="w-2.5 h-2.5" /> alex@email.com
                        </span>
                        <span className="inline-flex items-center gap-0.5">
                          <Phone className="w-2.5 h-2.5" /> +1 (555) 123-4567
                        </span>
                        <span className="inline-flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5" /> San Francisco, CA
                        </span>
                        <span className="inline-flex items-center gap-0.5">
                          <LinkIcon className="w-2.5 h-2.5" /> linkedin.com/in/alexjohnson
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div>
                    <h5 className="text-[9px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-0.5 mb-1">
                      SUMMARY
                    </h5>
                    <p className="text-[9.5px] text-gray-600 leading-snug">
                      Passionate Full Stack Developer with 6+ years of experience
                      building scalable web applications using modern technologies. Proven
                      track record of delivering high-quality solutions and leading
                      cross-functional teams.
                    </p>
                  </div>

                  {/* Experience Section */}
                  <div>
                    <h5 className="text-[9px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-0.5 mb-1">
                      EXPERIENCE
                    </h5>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-gray-900 text-[10px]">
                        Senior Full Stack Developer
                      </span>
                      <span className="text-[8.5px] text-gray-400 font-medium">
                        2021 - Present
                      </span>
                    </div>
                    <p className="text-[9px] text-gray-500 italic mb-1">
                      Tech Solutions Inc.
                    </p>
                    <ul className="list-disc list-inside text-[9px] text-gray-600 space-y-0.5">
                      <li>
                        Developed and maintained multiple React applications serving
                        thousands of users
                      </li>
                      <li>
                        Led a team of 4 developers and implemented best practices
                      </li>
                      <li>
                        Improved application performance by 40% through optimization
                      </li>
                    </ul>
                  </div>

                  {/* Education Section */}
                  <div>
                    <h5 className="text-[9px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-0.5 mb-1">
                      EDUCATION
                    </h5>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-gray-900 text-[10px]">
                        Master of Science in Computer Science
                      </span>
                      <span className="text-[8.5px] text-gray-400 font-medium">
                        2018 - 2020
                      </span>
                    </div>
                    <p className="text-[9px] text-gray-500 italic">
                      Stanford University
                    </p>
                  </div>
                </div>

                {/* 3. Right Panel: Formatting Controls (md:col-span-3) */}
                <div className="md:col-span-3 bg-gray-50/70 border border-gray-100 rounded-md p-3 text-left space-y-3">
                  {/* Template Select */}
                  <div>
                    <label className="block text-[10px] font-medium text-gray-500 mb-1">
                      Template
                    </label>
                    <div className="bg-white border border-gray-200 rounded-md px-2.5 py-1.5 text-xs text-gray-800 font-medium flex items-center justify-between shadow-2xs">
                      <span>Modern</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </div>

                  {/* Theme Color Selector */}
                  <div>
                    <label className="block text-[10px] font-medium text-gray-500 mb-1">
                      Theme Color
                    </label>
                    <div className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-blue-500 ring-2 ring-blue-500 ring-offset-1 cursor-pointer"></span>
                      <span className="w-4 h-4 rounded-full bg-teal-500 transition-transform cursor-pointer"></span>
                      <span className="w-4 h-4 rounded-full bg-orange-500 transition-transform cursor-pointer"></span>
                      <span className="w-4 h-4 rounded-full bg-red-500 transition-transform cursor-pointer"></span>
                      <span className="w-4 h-4 rounded-full bg-slate-800 transition-transform cursor-pointer"></span>
                      <span className="w-4 h-4 rounded-full bg-[#FF570F] transition-transform cursor-pointer"></span>
                    </div>
                  </div>

                  {/* Font Select */}
                  <div>
                    <label className="block text-[10px] font-medium text-gray-500 mb-1">
                      Font
                    </label>
                    <div className="bg-white border border-gray-200 rounded-md px-2.5 py-1.5 text-xs text-gray-800 font-medium flex items-center justify-between shadow-2xs">
                      <span>Inter</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </div>

                  {/* Spacing Select */}
                  <div>
                    <label className="block text-[10px] font-medium text-gray-500 mb-1">
                      Spacing
                    </label>
                    <div className="bg-white border border-gray-200 rounded-md px-2.5 py-1.5 text-xs text-gray-800 font-medium flex items-center justify-between shadow-2xs">
                      <span>Normal</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 space-y-2">
                    <button className="w-full py-1.5 px-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer">
                      <Eye className="w-3.5 h-3.5 text-gray-500" />
                      <span>Preview</span>
                    </button>

                    <button className="w-full py-1.5 px-3 bg-[#FF570F] hover:bg-[#E04800] text-white text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer">
                      <Download className="w-3.5 h-3.5 text-white" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 10 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {featureCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-md p-5 shadow-xs hover:shadow-md transition-all duration-300 text-left flex flex-col justify-start items-start"
              >
                <div
                  className={`w-10 h-10 rounded-md ${card.iconBg} flex items-center justify-center mb-4 shrink-0`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2 leading-snug">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Badge */}
        <div className="flex items-center justify-center max-w-xl mx-auto">
          <div className="flex-1 h-px bg-gray-200/80"></div>
          <div className="px-4 flex items-center gap-2 text-gray-500 font-medium text-xs sm:text-sm">
            <User className="w-4 h-4 text-gray-400" />
            <span>Trusted by 50,000+ job seekers worldwide</span>
          </div>
          <div className="flex-1 h-px bg-gray-200/80"></div>
        </div>
      </div>
    </section>
  );
}
