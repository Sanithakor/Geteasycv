'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ReadyToBuild from '@/components/sections/ReadyToBuild';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen, Search, User, Sparkles } from 'lucide-react';
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
      <main className="min-h-screen bg-slate-50/50 pb-20">
        
        {/* Header Hero */}
        <section className="bg-gradient-to-br from-indigo-900 via-slate-900 to-violet-950 text-white py-16 sm:py-20 px-4 relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF570F]/20 border border-[#FF570F]/30 text-violet-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Career & Resume Insights</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              GetEasyCV Blog
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Expert guides, ATS optimization tips, and design strategies to help you land your dream job faster.
            </p>
          </div>

          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF570F]/10 rounded-full blur-3xl"></div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          
          {/* Search & Category Nav Bar */}
          <div className="bg-white rounded-md p-4 border border-slate-200/80 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-md text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#FF570F] text-white shadow-md'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
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
                className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF570F] bg-slate-50/50"
              />
            </div>
          </div>

          {/* Featured Article Banner */}
          {featured && selectedCategory === 'All' && !searchQuery && (
            <div className="mb-12">
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-12 bg-white rounded-md border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div className="lg:col-span-7 aspect-[16/10] relative overflow-hidden bg-slate-100">
                  <img
                    src={featured.coverImage || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80'}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-[#FF570F] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Featured Article
                  </span>
                </div>

                <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs font-bold text-[#FF570F] mb-3">
                      <span>{featured.category}</span>
                      <span>•</span>
                      <span className="text-slate-400">{featured.readTime}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-4 group-hover:text-[#FF570F] transition-colors">
                      {featured.title}
                    </h2>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                      {featured.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                      <div className="w-8 h-8 rounded-full bg-[#FFF0EB] text-violet-700 flex items-center justify-center font-bold text-xs">
                        {featured.author ? featured.author.charAt(0) : 'A'}
                      </div>
                      <span>{featured.author}</span>
                    </div>

                    <span className="text-sm font-bold text-[#FF570F] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Grid of Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length === 0 ? (
              <div className="col-span-full py-16 text-center bg-white rounded-md border border-slate-200">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900 mb-1">No articles found</h3>
                <p className="text-sm text-slate-500">Try adjusting your search query or category filter.</p>
              </div>
            ) : (
              filteredPosts.map(post => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-md border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
                >
                  <div className="aspect-[16/9] relative overflow-hidden bg-slate-100">
                    <img
                      src={post.coverImage || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80'}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-[#FF570F] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#FF570F]" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#FF570F]" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-[#FF570F] transition-colors mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <div className="w-6 h-6 rounded-full bg-[#FFF0EB] text-violet-700 flex items-center justify-center font-bold text-[10px]">
                          {post.author ? post.author.charAt(0) : 'A'}
                        </div>
                        <span>{post.author}</span>
                      </div>

                      <span className="text-xs font-bold text-[#FF570F] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Article
                        <ArrowRight className="w-3.5 h-3.5" />
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
