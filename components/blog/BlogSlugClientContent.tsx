'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import InnerBanner from '@/components/InnerBanner';
import ReadyToBuild from '@/components/sections/ReadyToBuild';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Share2, 
  Sparkles, 
  FileText
} from 'lucide-react';
import { BlogPostItem, getStoredBlogPosts, incrementBlogPostView } from '@/lib/blogData';
import { ArticleSchema } from '@/components/seo/SchemaOrg';

export default function BlogSlugClientContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPostItem | null>(null);
  const [related, setRelated] = useState<BlogPostItem[]>([]);

  useEffect(() => {
    const all = getStoredBlogPosts();
    const found = all.find(p => p.slug === slug) || all.find(p => p.id === slug) || all[0];
    if (found) {
      setPost(found);
      incrementBlogPostView(found.id);
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
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
        imageUrl={post.coverImage}
        datePublished={post.date}
        authorName={post.author}
      />
      <Navigation />
      <main className="min-h-screen bg-slate-50/40 pb-20">
        <InnerBanner
          badge={post.category || "CAREER INSIGHTS"}
          badgeIcon={FileText}
          breadcrumbs={[
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
          variant="center"
          title={post.title}
          description={post.excerpt}
        >
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0F0F0F] text-white font-bold text-sm flex items-center justify-center shadow-md">
                {post.author ? post.author.charAt(0) : "A"}
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-900 text-sm leading-none mb-1">
                  {post.author}
                </h4>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#F3645C]" /> {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#F3645C]" /> {post.readTime}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-[#F3645C]" />
              <span>Share Article</span>
            </button>
          </div>
        </InnerBanner>

        <section className="max-w-4xl mx-auto px-4 py-10">
          {post.coverImage && (
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-md mb-10 border border-slate-200/80">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {post.excerpt && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 text-slate-800 font-medium text-base sm:text-lg leading-relaxed mb-10 shadow-2xs">
              <p>{post.excerpt}</p>
            </div>
          )}

          <article className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed text-base space-y-6">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return <h1 key={index} className="text-3xl font-extrabold text-slate-900 mt-8 mb-4">{paragraph.replace('# ', '')}</h1>;
              }
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold text-slate-900 mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('---')) {
                return <hr key={index} className="my-8 border-slate-200" />;
              }
              return <p key={index} className="text-slate-700 text-base leading-relaxed font-normal">{paragraph}</p>;
            })}
          </article>

          <div className="mt-14 bg-[#0F0F0F] rounded-2xl p-8 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden border border-white/10">
            <div className="space-y-2 text-center sm:text-left relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F5D17B] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Build Your ATS Resume</span>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight">Ready to put these tips into practice?</h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-md font-normal">
                Build an ATS-optimized, professionally designed resume in less than 10 minutes with GetEasyCV.
              </p>
            </div>

            <Link
              href="/templates"
              className="bg-[#F5D17B] hover:opacity-90 text-[#0F0F0F] font-bold px-6 py-3.5 rounded-xl shadow-md transition-all shrink-0 text-xs sm:text-sm flex items-center gap-2 cursor-pointer relative z-10"
            >
              <FileText className="w-4 h-4 text-[#0F0F0F]" />
              <span>Create My Resume Now</span>
            </Link>
          </div>

          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-slate-200">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-8">Related Articles</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map(rel => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col cursor-pointer"
                  >
                    <div className="aspect-[16/9] bg-slate-100 overflow-hidden">
                      <img
                        src={rel.coverImage || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80'}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#F3645C] uppercase tracking-wider block mb-1.5">{rel.category}</span>
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#F3645C] transition-colors line-clamp-2 mb-2">{rel.title}</h4>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium mt-auto">{rel.readTime}</span>
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
