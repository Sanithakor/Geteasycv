'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import ReadyToBuild from '@/components/sections/ReadyToBuild';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Mail, MessageSquare, Clock, MapPin, CheckCircle2, Loader2, Sparkles, Send } from 'lucide-react';

const TOPICS = ['General Question', 'Technical Issue', 'Billing & Payments', 'Feature Request', 'Account Help', 'Other'];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: 'General Question', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1000));
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

      <main className="min-h-screen bg-slate-50/50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFF8F5] border border-[#FF570F] rounded-full text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>We're Here To Help</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Get in Touch with Us
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Have a question, feedback, or need technical assistance? Fill out the form below or email us directly.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Contact Info Cards */}
            <div className="md:col-span-4 space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#FFF8F5] text-[#FF570F] flex items-center justify-center font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Email Support</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Reach our team anytime</p>
                  <a href="mailto:support@geteasycv.com" className="text-xs font-bold text-[#FF570F] hover:underline mt-2 inline-block">
                    support@geteasycv.com
                  </a>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#FFF8F5] text-[#FF570F] flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Response Time</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    We typically reply within 24 hours on business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
              {sent ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-2xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Message Sent Successfully!</h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. A support team member will review your inquiry and get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSent(false); setForm({ name: '', email: '', topic: 'General Question', message: '' }); }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#FF570F] text-white font-bold text-xs shadow-md shadow-[#FF570F]/25 hover:bg-[#E04800] transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-600">
                      {error}
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#FF570F] focus:ring-2 focus:ring-[#FF570F]/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#FF570F] focus:ring-2 focus:ring-[#FF570F]/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="topic" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Topic
                    </label>
                    <select
                      id="topic"
                      value={form.topic}
                      onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 focus:bg-white focus:border-[#FF570F] focus:ring-2 focus:ring-[#FF570F]/20 outline-none transition-all"
                    >
                      {TOPICS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#FF570F] focus:ring-2 focus:ring-[#FF570F]/20 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#FF570F] hover:bg-[#E04800] text-white font-bold text-xs shadow-md shadow-[#FF570F]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <ReadyToBuild />
      <Footer />
    </>
  );
}
