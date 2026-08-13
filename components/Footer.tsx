'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 group" title="Go to Homepage">
              <img src="/logo.svg" alt="GetEasyCV" className="h-8 w-auto object-contain" />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Professional resume builder with ATS-friendly templates, custom layouts, and modern themes to help you land your next job faster.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Product</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/templates" className="hover:text-white transition-colors">Resume Templates</Link></li>
              <li><Link href="/editor" className="hover:text-white transition-colors">Live Resume Editor</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing & Plans</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Career Blog</Link></li>
              <li><Link href="/resume-examples" className="hover:text-white transition-colors">Resume Examples</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/templates?category=ATS%20Friendly" className="hover:text-white transition-colors">ATS-Friendly Templates</Link></li>
              <li><Link href="/ats-checker" className="hover:text-white transition-colors">ATS Resume Checker</Link></li>
              <li><Link href="/cover-letter" className="hover:text-white transition-colors">Cover Letter Builder</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/help-center" className="hover:text-white transition-colors">Help & Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Company & Legal</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-900 pt-5 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} GetEasyCV. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms</Link>
            <Link href="/cookie-policy" className="hover:text-slate-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
