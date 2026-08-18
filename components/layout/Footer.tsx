import React from 'react';
import Link from 'next/link';

const FOOTER_LINKS = {
  Product: [
    { label: 'Templates', href: '/templates' },
    { label: 'Resume Editor', href: '/editor' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Features', href: '/#features' },
    { label: 'How It Works', href: '/how-it-works' },
  ],
  Resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
    { label: 'Resume Examples', href: '/templates?category=ATS+Friendly' },
    { label: 'About Us', href: '/about' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <img src="/logo.svg" alt="GetEasyCV" className="h-9 w-auto object-contain transition-transform group-hover:scale-105" />
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
              Build professional, ATS-optimized resumes with AI-powered assistance and 200+ templates.
            </p>
            <div className="flex gap-3 mt-5">
              {/* Social icons — placeholder shapes */}
              {['Twitter', 'LinkedIn', 'GitHub'].map((s) => (
                <a key={s} href="#" aria-label={s}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors text-[10px] font-bold">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white font-semibold mb-4 text-sm">{group}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-slate-500 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <p>© {new Date().getFullYear()} GetEasyCV. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
