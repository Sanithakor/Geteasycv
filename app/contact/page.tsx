'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Mail, MessageSquare, Clock, MapPin, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

const TOPICS = ['General Question', 'Technical Issue', 'Billing & Payments', 'Feature Request', 'Account Help', 'Other'];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      // Simulate submission — wire to real API when ready
      await new Promise((r) => setTimeout(r, 1200));
      setSent(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="bg-white border-b border-slate-100 py-16 px-4">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200">
              <Sparkles className="w-3.5 h-3.5" /> We're here to help
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">Contact Us</h1>
            <p className="text-base text-slate-500 max-w-xl mx-auto">
              Have a question, found a bug, or want to share feedback? Send us a message — we respond within 24 hours on business days.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="max-w-5xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info sidebar */}
          <div className="space-y-5">
            {[
              { icon: Mail, label: 'Email', value: 'support@geteasycv.com', href: 'mailto:support@geteasycv.com' },
              { icon: Clock, label: 'Response Time', value: 'Within 24h on business days' },
              { icon: MessageSquare, label: 'Live Chat', value: 'Coming soon' },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-4 p-4 bg-white border border-slate-200 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-semibold text-violet-600 hover:underline mt-0.5 block">{value}</a>
                  ) : (
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <p className="text-xs text-slate-500 leading-relaxed">
                For billing or account issues, include your registered email address so we can look up your account faster.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-14 text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Message sent!</h3>
                  <p className="text-sm text-slate-500 mt-1 max-w-xs">We'll get back to you at <strong>{form.email}</strong> within 24 hours.</p>
                </div>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', topic: '', message: '' }); }}
                  className="text-sm font-bold text-violet-600 hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-lg font-bold text-slate-900">Send a message</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-700" htmlFor="name">Full Name</label>
                    <input id="name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Sarah Johnson"
                      className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-700" htmlFor="email">Email Address</label>
                    <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="sarah@example.com"
                      className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-700" htmlFor="topic">Topic</label>
                  <select id="topic" required value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all">
                    <option value="">Select a topic…</option>
                    {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-slate-700" htmlFor="message">Message</label>
                  <textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your question or issue…"
                    className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 transition-all resize-y" />
                </div>

                {error && <p className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">{error}</p>}

                <button type="submit" disabled={submitting}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-bold text-sm shadow-sm transition-all cursor-pointer">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
