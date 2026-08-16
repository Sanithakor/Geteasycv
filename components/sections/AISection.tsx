"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, TrendingUp, Target, Wand2 } from "lucide-react";

export default function AISection() {
  const aiFeatures = [
    {
      icon: TrendingUp,
      title: "Improve Bullet Points",
      description: "Transform basic descriptions into powerful achievement statements",
      before: "Managed a team",
      after: "Led cross-functional team of 8 to deliver 15% revenue growth",
    },
    {
      icon: Target,
      title: "Optimize for Keywords",
      description: "Automatically enhance content with industry-specific ATS keywords",
      before: "Worked with customers",
      after: "Drove customer satisfaction through strategic relationship management",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: AI Explanation */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-purple-200 mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-bold text-purple-600 uppercase tracking-wider">
                AI-Powered
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Improve Your Resume with{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                One Click
              </span>
            </h2>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Our AI assistant analyzes your content and suggests powerful improvements
              that highlight your achievements and pass ATS filters.
            </p>

            {/* AI Features List */}
            <div className="space-y-6 mb-8">
              {aiFeatures.map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <Wand2 className="w-5 h-5" />
              Try AI Assistant
            </Link>
          </div>

          {/* Right: Before/After Demo */}
          <div className="space-y-6">
            {aiFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden"
              >
                {/* Before */}
                <div className="p-6 bg-slate-50 border-b border-slate-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-2 py-1 bg-slate-200 text-slate-600 text-xs font-bold rounded">
                      BEFORE
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    • {feature.before}
                  </p>
                </div>

                {/* Arrow Indicator */}
                <div className="flex justify-center -my-3 relative z-10">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* After */}
                <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-2 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded">
                      AFTER AI
                    </div>
                    <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                      <TrendingUp className="w-3 h-3" />
                      <span>Improved</span>
                    </div>
                  </div>
                  <p className="text-slate-900 text-sm leading-relaxed font-medium">
                    • {feature.after}
                  </p>
                </div>
              </div>
            ))}

            {/* Bottom Note */}
            <div className="bg-purple-100 border border-purple-200 rounded-xl p-4 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-purple-900 mb-1">
                  Smart Suggestions
                </p>
                <p className="text-xs text-purple-700">
                  AI analyzes your industry and role to provide contextually relevant improvements
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
