"use client";

import React from "react";
import { Star, TrendingUp, Users, Clock } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah K.",
    role: "Software Engineer",
    company: "Google",
    quote: "Got 3 interview calls within a week. The ATS-friendly templates work!",
    avatar: "SK",
    color: "from-[#FF570F] to-[#FF570F]",
  },
  {
    name: "James R.",
    role: "Product Manager",
    company: "Microsoft",
    quote: "Built my resume in 15 minutes. The live editor is incredibly smooth.",
    avatar: "JR",
    color: "from-[#FF570F] to-pink-500",
  },
  {
    name: "Priya M.",
    role: "UX Designer",
    company: "Figma",
    quote: "Beautiful templates and perfect PDF export. Exactly what I needed.",
    avatar: "PM",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Michael T.",
    role: "Data Scientist",
    company: "Amazon",
    quote: "AI suggestions helped me articulate my achievements much better.",
    avatar: "MT",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Lisa W.",
    role: "Marketing Manager",
    company: "HubSpot",
    quote: "Professional results without the hassle. Highly recommend for job seekers.",
    avatar: "LW",
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "David L.",
    role: "Full Stack Developer",
    company: "Shopify",
    quote: "Clean, modern templates. Finally landed my dream role!",
    avatar: "DL",
    color: "from-orange-500 to-amber-500",
  },
];

const STATS = [
  {
    icon: Users,
    value: "50,000+",
    label: "Resumes Created",
    color: "text-[#FF570F]",
    bgColor: "bg-[#FFF0EB]",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Average Rating",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    icon: TrendingUp,
    value: "85%",
    label: "Interview Success",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Clock,
    value: "15 min",
    label: "Avg. Completion Time",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
];

export default function SocialProofNew() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-[#FF570F]/30 to-[#FFF0EB]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {STATS.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 text-center hover:shadow-lg transition-all"
              >
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}
                >
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`text-2xl sm:text-3xl font-extrabold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200 mb-6">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">
              Success Stories
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Loved by Job Seekers
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real results from people who landed their dream jobs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Avatar & Info */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md`}
                >
                  {testimonial.avatar}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-500 truncate">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-slate-700 leading-relaxed mb-4 flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Company Badge */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-xs font-semibold text-[#FF570F] bg-[#FFF8F5] px-3 py-1 rounded-full">
                  {testimonial.company}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">10,000+</div>
                <div className="text-sm text-slate-600">Active Users</div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-12 bg-slate-200"></div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#FFF0EB] rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-[#FF570F] fill-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">4.9/5</div>
                <div className="text-sm text-slate-600">User Satisfaction</div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-12 bg-slate-200"></div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">15 min</div>
                <div className="text-sm text-slate-600">Avg. Build Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
