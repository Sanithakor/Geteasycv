"use client";

import React from "react";
import { Star, TrendingUp, Users, Clock } from "lucide-react";

const TESTIMONIALS = [
  { name: "Sarah K.",   role: "Software Engineer",  company: "Google",    quote: "Got 3 interview calls within a week. The ATS-friendly templates work!",          avatar: "SK", bg: '#BAC7FE' },
  { name: "James R.",   role: "Product Manager",    company: "Microsoft", quote: "Built my resume in 15 minutes. The live editor is incredibly smooth.",            avatar: "JR", bg: '#D0B9EF' },
  { name: "Priya M.",   role: "UX Designer",        company: "Figma",     quote: "Beautiful templates and perfect PDF export. Exactly what I needed.",             avatar: "PM", bg: '#FEE1CF' },
  { name: "Michael T.", role: "Data Scientist",     company: "Amazon",    quote: "AI suggestions helped me articulate my achievements much better.",                avatar: "MT", bg: '#F5D17B' },
  { name: "Lisa W.",    role: "Marketing Manager",  company: "HubSpot",   quote: "Professional results without the hassle. Highly recommend for job seekers.",     avatar: "LW", bg: '#58C09D33' },
  { name: "David L.",   role: "Full Stack Developer", company: "Shopify", quote: "Clean, modern templates. Finally landed my dream role!",                        avatar: "DL", bg: '#FEE1CF' },
];

const STATS = [
  { icon: Users,     value: "50,000+", label: "Resumes Created",      bg: '#BAC7FE',  iconColor: '#0F0F0F' },
  { icon: Star,      value: "4.9/5",   label: "Average Rating",       bg: '#F5D17B',  iconColor: '#0F0F0F' },
  { icon: TrendingUp,value: "85%",     label: "Interview Success",    bg: '#58C09D',  iconColor: '#FFFFFF' },
  { icon: Clock,     value: "15 min",  label: "Avg. Completion Time", bg: '#D0B9EF',  iconColor: '#0F0F0F' },
];

export default function SocialProofNew() {
  return (
    <section className="py-16 sm:py-20" style={{ background: '#F8F8F6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {STATS.map(({ icon: Icon, value, label, bg, iconColor }) => (
            <div key={label} className="bg-white rounded-2xl p-6 border text-center hover:shadow-lg transition-all"
              style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: bg }}>
                <Icon className="w-6 h-6" style={{ color: iconColor }} />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: '#0F0F0F' }}>{value}</div>
              <div className="text-sm" style={{ color: '#333333' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border mb-6"
            style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-bold uppercase tracking-wider" style={{ color: '#333333' }}>Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: '#0F0F0F' }}>
            Loved by Job Seekers
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#333333' }}>
            Real results from people who landed their dream jobs.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#0F0F0F] font-bold text-sm flex-shrink-0 shadow-sm"
                  style={{ background: t.bg }}>
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <p className="font-bold truncate" style={{ color: '#0F0F0F' }}>{t.name}</p>
                  <p className="text-sm truncate" style={{ color: '#333333' }}>{t.role}</p>
                </div>
              </div>
              <blockquote className="leading-relaxed mb-4 flex-1" style={{ color: '#333333' }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'rgba(15,15,15,0.06)' }}>
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: t.bg, color: '#0F0F0F' }}>
                  {t.company}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="mt-12 bg-white rounded-2xl border p-6 sm:p-8 shadow-sm" style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center sm:text-left">
            {[
              { icon: TrendingUp, value: '10,000+', label: 'Active Users',       bg: '#58C09D33', color: '#58C09D' },
              { icon: Star,       value: '4.9/5',   label: 'User Satisfaction',  bg: '#F5D17B',   color: '#0F0F0F' },
              { icon: Clock,      value: '15 min',  label: 'Avg. Build Time',    bg: '#BAC7FE',   color: '#0F0F0F' },
            ].map(({ icon: Icon, value, label, bg, color }, i) => (
              <React.Fragment key={label}>
                {i > 0 && <div className="hidden sm:block w-px h-12" style={{ background: 'rgba(15,15,15,0.10)' }} />}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold" style={{ color: '#0F0F0F' }}>{value}</div>
                    <div className="text-sm" style={{ color: '#333333' }}>{label}</div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
