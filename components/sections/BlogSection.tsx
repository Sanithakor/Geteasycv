'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { BlogPostItem, getStoredBlogPosts } from '@/lib/blogData';

const CATEGORY_COLORS: Record<string, string> = {
  default: '#BAC7FE',
  career:  '#D0B9EF',
  resume:  '#FEE1CF',
  tips:    '#F5D17B',
  ai:      '#58C09D33',
};

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);

  useEffect(() => {
    const all = getStoredBlogPosts();
    setPosts(all.filter(p => p.status === 'published').slice(0, 3));
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="w-6 h-[1.5px] rounded-full" style={{ background: '#D0B9EF' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#333333' }}>Insights & Advice</span>
            <span className="w-6 h-[1.5px] rounded-full" style={{ background: '#D0B9EF' }} />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4" style={{ color: '#0F0F0F' }}>
            Latest Articles & Career Tips
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#333333' }}>
            Expert guidance to help you craft winning resumes and accelerate your career growth.
          </p>
          <div className="w-12 h-1 rounded-full mx-auto mt-5" style={{ background: '#D0B9EF' }} />
        </div>

        {/* Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {posts.map((post) => {
            const catColor = CATEGORY_COLORS[post.category?.toLowerCase()] || CATEGORY_COLORS.default;
            return (
              <Link key={post.id} href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
                style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
                <div className="aspect-[16/9] relative overflow-hidden" style={{ background: '#F8F8F6' }}>
                  <img
                    src={post.coverImage || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm"
                    style={{ background: catColor, color: '#0F0F0F' }}>
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs font-semibold mb-3" style={{ color: '#9ca3af' }}>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" style={{ color: '#BAC7FE' }} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" style={{ color: '#BAC7FE' }} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg sm:text-xl leading-snug mb-3 line-clamp-2 transition-colors" style={{ color: '#0F0F0F' }}>
                    {post.title}
                  </h3>

                  <p className="text-sm leading-relaxed mb-6 line-clamp-3 flex-1" style={{ color: '#333333' }}>
                    {post.excerpt}
                  </p>

                  <div className="pt-4 border-t flex items-center justify-between mt-auto" style={{ borderColor: 'rgba(15,15,15,0.06)' }}>
                    <div className="flex items-center gap-2 text-xs font-bold" style={{ color: '#333333' }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px]"
                        style={{ background: '#D0B9EF', color: '#0F0F0F' }}>
                        {post.author ? post.author.charAt(0) : 'A'}
                      </div>
                      <span>{post.author}</span>
                    </div>
                    <span className="text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      style={{ color: '#F3645C' }}>
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link href="/blog"
            className="text-white font-bold px-8 py-3.5 rounded-xl shadow-lg flex items-center gap-2.5 transition-all text-sm sm:text-base hover:opacity-90"
            style={{ background: '#0F0F0F' }}>
            <BookOpen className="w-4 h-4" style={{ color: '#BAC7FE' }} />
            <span>Explore All Blog Articles</span>
            <ArrowRight className="w-4 h-4" style={{ color: '#9ca3af' }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
