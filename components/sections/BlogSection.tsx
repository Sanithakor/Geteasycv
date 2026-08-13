'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen, User } from 'lucide-react';
import { BlogPostItem, getStoredBlogPosts } from '@/lib/blogData';

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);

  useEffect(() => {
    const all = getStoredBlogPosts();
    const published = all.filter(p => p.status === 'published').slice(0, 3);
    setPosts(published);
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="w-6 h-[1.5px] bg-violet-400/60 rounded-full"></span>
            <span className="text-xs sm:text-5 font-bold uppercase tracking-widest text-violet-600">
              Insights & Advice
            </span>
            <span className="w-6 h-[1.5px] bg-violet-400/60 rounded-full"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
            Latest Articles & Career Tips
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Expert guidance to help you craft winning resumes, pass ATS scans,<br className="hidden sm:block" />
            and accelerate your career growth.
          </p>

          <div className="w-12 h-1 bg-violet-600 rounded-full mx-auto mt-5"></div>
        </div>

        {/* Blog Posts 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-md border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
            >
              {/* Cover Image Wrapper */}
              <div className="aspect-[16/9] relative overflow-hidden bg-slate-100">
                <img
                  src={post.coverImage || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80'}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-violet-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {post.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Meta Bar */}
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-violet-500" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-violet-500" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 text-lg sm:text-xl leading-snug group-hover:text-violet-600 transition-colors mb-3 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                {/* Card Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-[10px]">
                      {post.author ? post.author.charAt(0) : 'A'}
                    </div>
                    <span>{post.author}</span>
                  </div>

                  <span className="text-xs font-bold text-violet-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="flex justify-center">
          <Link
            href="/blog"
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-md shadow-lg flex items-center gap-2.5 transition-all text-sm sm:text-base cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-violet-400" />
            <span>Explore All Blog Articles</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

      </div>
    </section>
  );
}
