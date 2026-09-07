'use client';

import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: InstagramIcon,
    ariaLabel: 'Follow us on Instagram',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: FacebookIcon,
    ariaLabel: 'Follow us on Facebook',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: LinkedinIcon,
    ariaLabel: 'Connect with us on LinkedIn',
  },
  {
    name: 'Mail',
    href: 'mailto:support@geteasycv.com',
    icon: Mail,
    ariaLabel: 'Email our support team',
  },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0F0F0F', color: '#9ca3af', borderTop: '1px solid rgba(255,255,255,0.08)' }} className="font-sans">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group" title="Go to Homepage">
              <img src="/logo.svg" alt="GetEasyCV" className="h-9 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-sm sm:text-base leading-relaxed font-medium" style={{ color: '#9ca3af' }}>
              A professional resume builder with ATS-friendly templates, custom layouts, and modern themes to help you land your next job faster.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {SOCIAL_LINKS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={item.ariaLabel}
                    className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/15 hover:border-white/25 hover:scale-105 transition-all shadow-2xs"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm sm:text-base uppercase tracking-wider" style={{ color: '#F8F8F6' }}>Tools & Builder</h4>
            <ul className="space-y-2.5 text-sm sm:text-base font-medium">
              {[
                ['/resume-builder', 'Resume Builder'],
                ['/templates', 'Resume Templates'],
                ['/ats-checker', 'ATS Resume Checker'],
                ['/cover-letter', 'Cover Letter Builder'],
                ['/pricing', 'Pricing & Plans'],
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

          {/* Resources & Examples */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm sm:text-base uppercase tracking-wider" style={{ color: '#F8F8F6' }}>Resume Examples</h4>
            <ul className="space-y-2.5 text-sm sm:text-base font-medium">
              {[
                ['/resume-examples', 'All Resume Examples'],
                ['/resume-examples/software-engineer', 'Software Engineer Resume'],
                ['/resume-examples/web-developer', 'Web Developer Resume'],
                ['/resume-examples/accountant', 'Accountant Resume'],
                ['/resume-examples/nursing', 'Nursing Resume'],
                ['/resume-examples/project-manager', 'Project Manager Resume'],
                ['/blog', 'Career & Resume Blog'],
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
