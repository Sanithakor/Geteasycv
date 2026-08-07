import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles, Clock } from 'lucide-react';

export const metadata = {
  title: 'Blog — GetEasyCV',
  description: 'Resume tips, career advice, and product updates from the GetEasyCV team.',
};

const POSTS = [
  {
    slug: '#',
    tag: 'Resume Tips',
    tagColor: 'bg-violet-50 text-violet-700 border-violet-200',
    title: 'How to Write an ATS-Friendly Resume in 2025',
    excerpt: 'Applicant Tracking Systems scan your resume before a human ever reads it. Here\'s how to structure your content, choose the right keywords, and pass the bots every time.',
    date: 'Coming soon',
    readTime: '6 min read',
    featured: true,
  },
  {
    slug: '#',
    tag: 'Career Advice',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    title: '5 Resume Mistakes That Cost You Interviews',
    excerpt: 'From generic objective statements to inconsistent formatting — these common mistakes are easy to fix once you know what to look for.',
    date: 'Coming soon',
    readTime: '4 min read',
  },
  {
    slug: '#',
    tag: 'AI Writing',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
    title: 'Using AI to Improve Your Resume Content',
    excerpt: 'Our AI field assistant rewrites each section to match your target role and template style. Learn how to get the most out of every suggestion.',
    date: 'Coming soon',
    readTime: '5 min read',
  },
  {
    slug: '#',
    tag: 'Templates',
    tagColor: 'bg-sky-50 text-sky-700 border-sky-200',
    title: 'Which Resume Template Should You Choose?',
    excerpt: 'Single-column for ATS, two-column for design roles, executive for senior positions. A practical guide to picking the right layout for your industry.',
    date: 'Coming soon',
    readTime: '3 min read',
  },
  {
    slug: '#',
    tag: 'Product Update',
    tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
    title: 'Introducing GetEasyCV v2 — Now with AI Assist',
    excerpt: 'We\'ve redesigned the entire template library, added field-level AI optimization, and rebuilt the live preview engine from scratch.',
    date: 'Coming soon',
    readTime: '2 min read',
  },
  {
    slug: '#',
    tag: 'Career Advice',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    title: 'The Recruiter\'s Perspective: What They Look for in 6 Seconds',
    excerpt: 'We spoke to 10 recruiters about their first pass on a resume. Here\'s exactly what they notice, and what makes them stop to read more.',
    date: 'Coming soon',
    readTime: '7 min read',
  },
];

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <>
      <Navigation />
      <main>
        {/* Header */}
        <section className="bg-white border-b border-slate-100 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200">
              <BookOpen className="w-3.5 h-3.5" /> The GetEasyCV Blog
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">Resume tips & career insights</h1>
            <p className="text-base text-slate-500 max-w-xl mx-auto">
              Practical guides, template breakdowns, and AI writing tips to help you land your next role.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-14 space-y-12">
          {/* Coming soon notice */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-violet-50 border border-violet-200 text-sm text-violet-700 font-medium">
            <Sparkles className="w-4 h-4 shrink-0" />
            Full articles coming soon — check back shortly for new content.
          </div>

          {/* Featured post */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-all">
            <div className="h-48 bg-gradient-to-br from-violet-100 via-indigo-50 to-slate-100 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-violet-300" />
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${featured.tagColor}`}>{featured.tag}</span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {featured.readTime}
                </span>
                <span className="ml-auto text-[10px] font-bold text-violet-500 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full">Featured</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{featured.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{featured.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-violet-600">
                Coming soon <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rest.map((post) => (
              <article key={post.title} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-violet-200 transition-all flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${post.tagColor}`}>{post.tag}</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{post.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed flex-1">{post.excerpt}</p>
                <span className="text-xs font-bold text-slate-400 mt-1">{post.date}</span>
              </article>
            ))}
          </div>

          {/* Subscribe CTA */}
          <div className="rounded-2xl bg-slate-900 text-white p-8 text-center space-y-4">
            <h3 className="text-lg font-bold">Get notified when we publish</h3>
            <p className="text-sm text-slate-400">No spam — just actionable resume and career content, once or twice a month.</p>
            <div className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address for blog notifications"
                className="flex-1 h-10 px-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500 transition-all"
              />
              <button className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm transition-all cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
