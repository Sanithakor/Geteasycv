"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight, User, AlignLeft, Briefcase, GraduationCap, Paperclip,
  Folder, Award, Globe, GripVertical, Plus, Mail, Phone, MapPin,
  Link as LinkIcon, ChevronDown, Eye, Download, FileText, Pencil,
  Sparkles, BarChart3, Smartphone, Shield, Headphones,
} from "lucide-react";

const FEATURE_CARDS = [
  { icon: FileText,   bg: '#FEE1CF', title: 'ATS Friendly Templates',    desc: 'Professionally designed templates that pass ATS scans.' },
  { icon: Pencil,     bg: '#BAC7FE', title: 'Easy Customization',        desc: 'Drag, drop, and customize sections to match your style.' },
  { icon: Sparkles,   bg: '#D0B9EF', title: 'AI-Powered Suggestions',    desc: 'Intelligent suggestions for content, skills, and achievements.' },
  { icon: Eye,        bg: '#F5D17B', title: 'Real-time Preview',         desc: 'See changes instantly with our live preview as you build.' },
  { icon: Download,   bg: '#FEE1CF', title: 'Multiple Export Options',   desc: 'Download as PDF, Word, or plain text with perfect formatting.' },
  { icon: BarChart3,  bg: '#BAC7FE', title: 'Resume Score Analysis',     desc: 'Get a detailed score and tips to improve interview chances.' },
  { icon: Globe,      bg: '#F5D17B', title: 'Multi-language Support',    desc: 'Create resumes in multiple languages for global opportunities.' },
  { icon: Smartphone, bg: '#D0B9EF', title: 'Mobile Responsive',         desc: 'Build and edit your resume on any device, anywhere.' },
  { icon: Shield,     bg: '#FEE1CF', title: 'Data Privacy & Security',   desc: 'Encrypted and secure — we never share your information.' },
  { icon: Headphones, bg: '#58C09D33', title: 'Expert Support',           desc: 'Dedicated support team available 24/7 to help you.' },
];

const SECTIONS = [
  { label: 'Personal Info',   icon: User,          selected: true  },
  { label: 'Summary',         icon: AlignLeft,     selected: false },
  { label: 'Experience',      icon: Briefcase,     selected: false },
  { label: 'Education',       icon: GraduationCap, selected: false },
  { label: 'Skills',          icon: Paperclip,     selected: false },
  { label: 'Projects',        icon: Folder,        selected: false },
  { label: 'Certifications',  icon: Award,         selected: false },
  { label: 'Languages',       icon: Globe,         selected: false },
];

export default function ResumeBuilderFeatures() {
  return (
    <section className="py-12 sm:py-16 overflow-hidden font-sans" style={{ background: '#F8F8F6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border shadow-sm text-xs font-bold tracking-wider uppercase"
            style={{ background: '#FFFFFF', borderColor: 'rgba(15,15,15,0.12)', color: '#0F0F0F' }}>
            POWERFUL &amp; EASY TO USE
          </span>
        </div>

        {/* Header + Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center mb-12 sm:mb-14">
          {/* Left */}
          <div className="lg:col-span-5 text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight" style={{ color: '#0F0F0F' }}>
              Resume Builder <br />
              <span style={{ color: '#F3645C' }}>Features</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed max-w-lg" style={{ color: '#333333' }}>
              Everything you need to create a professional resume that gets you hired.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/editor"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-xl shadow-md transition-all hover:opacity-90 text-xs sm:text-sm"
                style={{ background: '#0F0F0F' }}
              >
                Create My Resume <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold rounded-xl border transition-all hover:opacity-90 text-xs sm:text-sm"
                style={{ background: '#FFFFFF', borderColor: 'rgba(15,15,15,0.12)', color: '#333333' }}
              >
                Explore Templates
              </Link>
            </div>
          </div>

          {/* Right: Editor mockup */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border shadow-2xl p-4 sm:p-5" style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-start">
                {/* Sections panel */}
                <div className="md:col-span-3 rounded-xl border p-2.5" style={{ background: '#F8F8F6', borderColor: 'rgba(15,15,15,0.08)' }}>
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-2 px-1" style={{ color: '#9ca3af' }}>Sections</div>
                  <div className="space-y-1">
                    {SECTIONS.map((sec) => {
                      const IC = sec.icon;
                      return (
                        <div key={sec.label}
                          className="flex items-center justify-between px-2 py-1.5 rounded-lg text-[11px] font-medium transition-colors"
                          style={sec.selected
                            ? { background: '#BAC7FE', color: '#0F0F0F', border: '1px solid rgba(186,199,254,0.5)' }
                            : { background: '#FFFFFF', color: '#333333', border: '1px solid rgba(15,15,15,0.06)' }}>
                          <div className="flex items-center gap-1.5 truncate">
                            <IC className="w-3.5 h-3.5 shrink-0" style={{ color: sec.selected ? '#0F0F0F' : '#9ca3af' }} />
                            <span className="truncate">{sec.label}</span>
                          </div>
                          <GripVertical className="w-3 h-3 shrink-0" style={{ color: '#9ca3af' }} />
                        </div>
                      );
                    })}
                  </div>
                  <button className="w-full mt-3 py-1.5 px-2 text-[11px] font-semibold rounded-lg border flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    style={{ background: '#F5D17B', borderColor: 'rgba(15,15,15,0.12)', color: '#0F0F0F' }}>
                    <Plus className="w-3 h-3" /> Add Section
                  </button>
                </div>

                {/* Canvas preview */}
                <div className="md:col-span-6 bg-white border rounded-xl p-4 shadow-sm text-left font-sans space-y-3" style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
                  <div className="flex items-center gap-3 pb-2 border-b" style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm overflow-hidden" style={{ background: '#0F0F0F' }}>
                      <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
                        <rect width="100" height="100" fill="#0F0F0F" />
                        <circle cx="50" cy="38" r="22" fill="#D0B9EF" />
                        <path d="M15 90 C 15 65, 85 65, 85 90 Z" fill="#D0B9EF" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm leading-snug" style={{ color: '#0F0F0F' }}>Alex Johnson</h4>
                      <p className="text-[10px] font-medium" style={{ color: '#333333' }}>Senior Full Stack Developer</p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[8.5px] mt-1" style={{ color: '#9ca3af' }}>
                        <span className="inline-flex items-center gap-0.5"><Mail className="w-2.5 h-2.5" /> alex@email.com</span>
                        <span className="inline-flex items-center gap-0.5"><Phone className="w-2.5 h-2.5" /> +1 (555) 123-4567</span>
                        <span className="inline-flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" /> San Francisco, CA</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-[9px] font-bold uppercase tracking-wider border-b pb-0.5 mb-1" style={{ color: '#0F0F0F', borderColor: 'rgba(15,15,15,0.08)' }}>SUMMARY</h5>
                    <p className="text-[9.5px] leading-snug" style={{ color: '#333333' }}>
                      Passionate Full Stack Developer with 6+ years of experience building scalable web applications.
                    </p>
                  </div>
                  <div>
                    <h5 className="text-[9px] font-bold uppercase tracking-wider border-b pb-0.5 mb-1" style={{ color: '#0F0F0F', borderColor: 'rgba(15,15,15,0.08)' }}>EXPERIENCE</h5>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-[10px]" style={{ color: '#0F0F0F' }}>Senior Full Stack Developer</span>
                      <span className="text-[8.5px] font-medium" style={{ color: '#9ca3af' }}>2021 – Present</span>
                    </div>
                    <p className="text-[9px] italic mb-1" style={{ color: '#58C09D' }}>Tech Solutions Inc.</p>
                    <ul className="list-disc list-inside text-[9px] space-y-0.5" style={{ color: '#333333' }}>
                      <li>Developed and maintained multiple React applications serving thousands of users</li>
                      <li>Improved application performance by 40% through optimization</li>
                    </ul>
                  </div>
                </div>

                {/* Controls panel */}
                <div className="md:col-span-3 rounded-xl border p-3 text-left space-y-3" style={{ background: '#F8F8F6', borderColor: 'rgba(15,15,15,0.08)' }}>
                  {['Template','Font','Spacing'].map((label) => (
                    <div key={label}>
                      <label className="block text-[10px] font-medium mb-1" style={{ color: '#9ca3af' }}>{label}</label>
                      <div className="bg-white border rounded-lg px-2.5 py-1.5 text-xs font-medium flex items-center justify-between shadow-sm"
                        style={{ borderColor: 'rgba(15,15,15,0.08)', color: '#0F0F0F' }}>
                        <span>{label === 'Template' ? 'Modern' : label === 'Font' ? 'Roboto' : 'Normal'}</span>
                        <ChevronDown className="w-3.5 h-3.5" style={{ color: '#9ca3af' }} />
                      </div>
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10px] font-medium mb-1" style={{ color: '#9ca3af' }}>Theme Color</label>
                    <div className="flex items-center gap-1.5">
                      {['#BAC7FE','#58C09D','#F3645C','#F5D17B','#D0B9EF','#0F0F0F'].map((c) => (
                        <span key={c} className="w-4 h-4 rounded-full cursor-pointer transition-transform hover:scale-125" style={{ background: c }} />
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 space-y-2">
                    <button className="w-full py-1.5 px-3 border text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                      style={{ background: '#FFFFFF', borderColor: 'rgba(15,15,15,0.12)', color: '#333333' }}>
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                    <button className="w-full py-1.5 px-3 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      style={{ background: '#0F0F0F' }}>
                      <Download className="w-3.5 h-3.5" /> Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {FEATURE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 text-left flex flex-col items-start"
                style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0" style={{ background: card.bg }}>
                  <Icon className="w-5 h-5" style={{ color: '#0F0F0F' }} />
                </div>
                <h3 className="font-bold text-sm mb-2 leading-snug" style={{ color: '#0F0F0F' }}>{card.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#333333' }}>{card.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Trust */}
        <div className="flex items-center justify-center max-w-xl mx-auto">
          <div className="flex-1 h-px" style={{ background: 'rgba(15,15,15,0.10)' }} />
          <div className="px-4 flex items-center gap-2 text-xs sm:text-sm font-medium" style={{ color: '#333333' }}>
            <User className="w-4 h-4" style={{ color: '#9ca3af' }} />
            <span>Trusted by 50,000+ job seekers worldwide</span>
          </div>
          <div className="flex-1 h-px" style={{ background: 'rgba(15,15,15,0.10)' }} />
        </div>
      </div>
    </section>
  );
}
