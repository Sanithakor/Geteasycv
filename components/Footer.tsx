'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#0F0F0F', color: '#9ca3af', borderTop: '1px solid rgba(255,255,255,0.08)' }} className="font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group" title="Go to Homepage">
              <img src="/logo.svg" alt="GetEasyCV" className="h-9 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-sm sm:text-base leading-relaxed font-medium" style={{ color: '#9ca3af' }}>
              A professional resume builder with ATS-friendly templates, custom layouts, and modern themes to help you land your next job faster.
            </p>
            {/* Accent bar */}
            <div className="flex gap-2 pt-1">
              {['#F5D17B','#BAC7FE','#D0B9EF','#FEE1CF','#58C09D'].map(c => (
                <div key={c} className="w-6 h-2 rounded-full" style={{ background: c }} />
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm sm:text-base uppercase tracking-wider" style={{ color: '#F8F8F6' }}>Product</h4>
            <ul className="space-y-2.5 text-sm sm:text-base font-medium">
              {[
                ['/templates', 'Resume Templates'],
                ['/editor', 'Live Resume Editor'],
                ['/pricing', 'Pricing & Plans'],
                ['/blog', 'Career Blog'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:underline" style={{ color: '#9ca3af' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F8F8F6')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Categories */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm sm:text-base uppercase tracking-wider" style={{ color: '#F8F8F6' }}>Popular Categories</h4>
            <ul className="space-y-2.5 text-sm sm:text-base font-medium">
              {[
                ['/templates?category=tech', 'Software Engineer Resumes'],
                ['/templates?category=executive', 'Executive CV Templates'],
                ['/templates?category=healthcare', 'Healthcare & Nursing CVs'],
                ['/templates?category=student', 'Student & Entry-Level Resumes'],
                ['/ats-checker', 'Free ATS Resume Checker'],
                ['/cover-letter', 'AI Cover Letter Builder'],
                ['/faq', 'Resume Builder FAQ'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:underline" style={{ color: '#9ca3af' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F8F8F6')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm sm:text-base uppercase tracking-wider" style={{ color: '#F8F8F6' }}>Company & Legal</h4>
            <ul className="space-y-2.5 text-sm sm:text-base font-medium">
              {[
                ['/about', 'About Us'],
                ['/contact', 'Contact Support'],
                ['/privacy', 'Privacy Policy'],
                ['/terms', 'Terms of Service'],
                ['/refund', 'Refund Policy'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:underline" style={{ color: '#9ca3af' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F8F8F6')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 text-sm sm:text-base font-medium flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af' }}>
          <p>© {new Date().getFullYear()} GetEasyCV. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {[
              ['/privacy', 'Privacy'],
              ['/terms', 'Terms'],
              ['/cookie-policy', 'Cookies'],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="transition-colors hover:underline" style={{ color: '#9ca3af' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F8F8F6')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
