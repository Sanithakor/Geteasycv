'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#0F0F0F', color: '#9ca3af', borderTop: '1px solid rgba(255,255,255,0.08)' }} className="font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 group" title="Go to Homepage">
              <img src="/logo.svg" alt="GetEasyCV" className="h-8 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>
              A professional resume builder with ATS-friendly templates, custom layouts, and modern themes to help you land your next job faster.
            </p>
            {/* Accent bar */}
            <div className="flex gap-2 pt-1">
              {['#F3645C','#BAC7FE','#F5D17B','#D0B9EF','#58C09D'].map(c => (
                <div key={c} className="w-5 h-1.5 rounded-full" style={{ background: c }} />
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider" style={{ color: '#F8F8F6' }}>Product</h4>
            <ul className="space-y-1.5 text-xs">
              {[
                ['/templates', 'Resume Templates'],
                ['/editor', 'Live Resume Editor'],
                ['/pricing', 'Pricing & Plans'],
                ['/blog', 'Career Blog'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors" style={{ color: '#9ca3af' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F3645C')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider" style={{ color: '#F8F8F6' }}>Resources</h4>
            <ul className="space-y-1.5 text-xs">
              {[
                ['/templates?category=ATS%20Friendly', 'ATS-Friendly Templates'],
                ['/ats-checker', 'ATS Resume Checker'],
                ['/cover-letter', 'Cover Letter Builder'],
                ['/faq', 'Frequently Asked Questions'],
                ['/help-center', 'Help & Support'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors" style={{ color: '#9ca3af' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F3645C')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider" style={{ color: '#F8F8F6' }}>Company & Legal</h4>
            <ul className="space-y-1.5 text-xs">
              {[
                ['/about', 'About Us'],
                ['/contact', 'Contact Support'],
                ['/privacy', 'Privacy Policy'],
                ['/terms', 'Terms of Service'],
                ['/refund', 'Refund Policy'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors" style={{ color: '#9ca3af' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F3645C')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-5 text-xs flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: '#6b7280' }}>
          <p>© {new Date().getFullYear()} GetEasyCV. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {[
              ['/privacy', 'Privacy'],
              ['/terms', 'Terms'],
              ['/cookie-policy', 'Cookies'],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="transition-colors" style={{ color: '#6b7280' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F3645C')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
