'use client';

import React, { use, useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ReadyToBuild from '@/components/sections/ReadyToBuild';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Sparkles, 
  ArrowRight,
  User,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { BlogPostItem, getStoredBlogPosts } from '@/lib/blogData';

export default function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [post, setPost] = useState<BlogPostItem | null>(null);
  const [related, setRelated] = useState<BlogPostItem[]>([]);

  useEffect(() => {
    const all = getStoredBlogPosts();
    const found = all.find(p => p.slug === slug) || all.find(p => p.id === slug) || all[0];
    if (found) {
      setPost(found);
      // Related posts
      const other = all.filter(p => p.id !== found.id && p.status === 'published').slice(0, 3);
      setRelated(other);
    }
  }, [slug]);

  if (!post) {
    return (
      <>
        <Navigation />
        <div className="min-h-[70vh] flex items-center justify-center">
          <p className="text-slate-500 font-medium">Loading article...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50/40 pb-20">
        
        {/* Header Breadcrumb & Info */}
        <section className="bg-white border-b border-slate-200/80 py-10 px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6">
              <Link href="/" className="hover:text-violet-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-violet-600 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-slate-600 truncate max-w-[200px] sm:max-w-none">{post.title}</span>
            </div>

            {/* Category & Title */}
            <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              {post.category}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
              {post.title}
            </h1>

            {/* Author Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-600 text-white font-bold text-sm flex items-center justify-center shadow-md">
                  {post.author ? post.author.charAt(0) : 'A'}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm leading-none mb-1">{post.author}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-violet-500" /> {post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-violet-500" /> {post.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Main Article Section */}
        <section className="max-w-4xl mx-auto px-4 py-10">
          
          {/* Cover Image */}
          {post.coverImage && (
            <div className="aspect-[16/9] rounded-md overflow-hidden shadow-xl mb-10 border border-slate-200/80">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Excerpt Box */}
          {post.excerpt && (
            <div className="p-6 rounded-md bg-violet-50/70 border border-violet-100 text-slate-700 font-medium text-lg leading-relaxed mb-10">
              {post.excerpt}
            </div>
          )}

          {/* Article Body Content */}
          <article className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed text-base space-y-6">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return <h1 key={index} className="text-3xl font-bold text-slate-900 mt-8 mb-4">{paragraph.replace('# ', '')}</h1>;
              }
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold text-slate-900 mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('---')) {
                return <hr key={index} className="my-8 border-slate-200" />;
              }
              return <p key={index} className="text-slate-700 text-base leading-relaxed">{paragraph}</p>;
            })}
          </article>

          {/* Builder Banner Callout */}
          <div className="mt-14 bg-gradient-to-r from-violet-600 to-indigo-700 rounded-md p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-violet-200 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Build Your ATS Resume</span>
              </div>
              <h3 className="text-2xl font-bold">Ready to put these tips into practice?</h3>
              <p className="text-violet-100 text-sm max-w-md">
                Build an ATS-optimized, professionally designed resume in less than 10 minutes with GetEasyCV.
              </p>
            </div>

            <Link
              href="/editor"
              className="bg-white hover:bg-slate-100 text-violet-700 font-bold px-6 py-3.5 rounded-md shadow-lg transition-all shrink-0 text-sm flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-violet-600" />
              <span>Build My Resume Now</span>
            </Link>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map(rel => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="group bg-white rounded-md border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col cursor-pointer"
                  >
                    <div className="aspect-[16/9] bg-slate-100 overflow-hidden">
                      <img
                        src={rel.coverImage || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80'}
                        alt={rel.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <span className="text-[10px] font-bold text-violet-600 uppercase tracking-wider mb-1">{rel.category}</span>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-violet-600 transition-colors line-clamp-2 mb-2">{rel.title}</h4>
                      <span className="text-[11px] text-slate-400 mt-auto">{rel.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </section>
      </main>
      <ReadyToBuild />
      <Footer />
    </>
  );
}
