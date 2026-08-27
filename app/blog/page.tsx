'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import InnerBanner from '@/components/InnerBanner';
import ReadyToBuild from '@/components/sections/ReadyToBuild';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen, Search, Sparkles } from 'lucide-react';
import { BlogPostItem, getStoredBlogPosts } from '@/lib/blogData';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setPosts(getStoredBlogPosts());
  }, []);

  const published = posts.filter(p => p.status === 'published');
  const featured = published.find(p => p.isFeatured) || published[0];

  const categories = ['All', 'Resume Tips', 'Career Advice', 'Design & Layout', 'Executive'];

  const filteredPosts = published.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F8F8F6] text-[#0F0F0F] font-sans pb-20">
        <InnerBanner
          badge="Career & Resume Insights"
          badgeIcon={Sparkles}
          breadcrumbs={[{ label: "Blog", href: "/blog" }]}
          title="GetEasyCV"
          highlightText="Career Blog"
          description="Expert guides, ATS optimization tips, and design strategies to help you land your dream job faster."
          primaryAction={{
            label: "Create Resume Free",
            href: "/templates",
          }}
          secondaryAction={{
            label: "Explore Features",
            href: "/ai-features",
          }}
          features={[
            "Recruiter Advice",
            "Resume Writing Guides",
            "Career Growth Tips",
          ]}
        />

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
          
          {/* Search & Category Nav Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#0F0F0F] text-white shadow-sm'
                      : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#F3645C] focus:ring-2 focus:ring-[#F3645C]/15 outline-none transition-all bg-slate-50/50"
              />
            </div>
          </div>

          {/* Featured Article Banner */}
          {featured && selectedCategory === 'All' && !searchQuery && (
            <div className="mb-12">
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-12 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div className="lg:col-span-7 aspect-[16/10] relative overflow-hidden bg-slate-100">
                  <img
                    src={featured.coverImage || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80'}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#0F0F0F] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Featured Article
                  </span>
                </div>

                <div className="lg:col-span-5 p-7 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-bold text-[#F3645C] mb-3">
                      <span>{featured.category}</span>
                      <span>•</span>
                      <span className="text-slate-400 font-normal">{featured.readTime}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] leading-tight mb-4 group-hover:text-[#F3645C] transition-colors">
                      {featured.title}
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      {featured.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                      <div className="w-8 h-8 rounded-xl bg-[#BAC7FE] text-[#0F0F0F] flex items-center justify-center font-bold text-xs shadow-2xs">
                        {featured.author ? featured.author.charAt(0) : 'A'}
                      </div>
                      <span>{featured.author}</span>
                    </div>

                    <span className="text-xs font-bold text-[#0F0F0F] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      Read Article
                      <ArrowRight className="w-4 h-4 text-[#F3645C]" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Grid of Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.length === 0 ? (
              <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200/80 p-8">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900 mb-1">No articles found</h3>
                <p className="text-xs sm:text-sm text-slate-500">Try adjusting your search query or category filter.</p>
              </div>
            ) : (
              filteredPosts.map(post => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
                >
                  <div className="aspect-[16/9] relative overflow-hidden bg-slate-100">
                    <img
                      src={post.coverImage || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#0F0F0F] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-medium text-slate-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#F3645C]" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#F3645C]" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#F3645C] transition-colors mb-2.5 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 font-normal">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <div className="w-7 h-7 rounded-lg bg-[#F5D17B] text-[#0F0F0F] flex items-center justify-center font-bold text-[11px] shadow-2xs">
                          {post.author ? post.author.charAt(0) : 'A'}
                        </div>
                        <span>{post.author}</span>
                      </div>

                      <span className="text-xs font-bold text-[#0F0F0F] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Article
                        <ArrowRight className="w-3.5 h-3.5 text-[#F3645C]" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </main>
      <ReadyToBuild />
      <Footer />
    </>
  );
}
