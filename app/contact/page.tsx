'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import InnerBanner from '@/components/InnerBanner';
import ReadyToBuild from '@/components/sections/ReadyToBuild';
import FAQ from '@/components/FAQ';
import { HOW_IT_WORKS_FAQS } from '@/data/faqs';
import Footer from '@/components/Footer';
import { Mail, Clock, CheckCircle2, Loader2, Sparkles, Send, Headphones } from 'lucide-react';

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

      <main className="min-h-screen bg-[#F8F8F6] text-[#0F0F0F] font-sans">
        <InnerBanner
          badge="We're Here To Help"
          badgeIcon={Headphones}
          pageType="contact"
          breadcrumbs={[{ label: "Contact", href: "/contact" }]}
          title="Get in Touch with"
          highlightText="Our Team"
          description="Have a question, feedback, or need technical assistance? Fill out the form below or email our support engineers directly."
          primaryAction={{
            label: "Create Resume Free",
            href: "/templates",
          }}
          secondaryAction={{
            label: "Browse FAQs",
            href: "/faq",
          }}
          features={[
            "24/7 Fast Support Response",
            "Dedicated Support Engineers",
            "Direct Email Assistance",
          ]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid md:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            {/* Contact Info Cards */}
            <div className="md:col-span-4 space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
                <div className="w-11 h-11 rounded-xl bg-[#BAC7FE] text-[#0F0F0F] flex items-center justify-center font-bold shadow-2xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Email Support</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Reach our team anytime</p>
                  <a href="mailto:support@geteasycv.com" className="text-xs font-bold text-[#F3645C] hover:underline mt-2 inline-block">
                    support@geteasycv.com
                  </a>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
                <div className="w-11 h-11 rounded-xl bg-[#F5D17B] text-[#0F0F0F] flex items-center justify-center font-bold shadow-2xs">
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
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-normal">
                    Thank you for reaching out. A support team member will review your inquiry and get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSent(false); setForm({ name: '', email: '', topic: 'General Question', message: '' }); }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#0F0F0F] text-white font-bold text-xs shadow-md hover:bg-[#262626] transition-all cursor-pointer"
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
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#F3645C] focus:ring-2 focus:ring-[#F3645C]/15 outline-none transition-all"
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
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#F3645C] focus:ring-2 focus:ring-[#F3645C]/15 outline-none transition-all"
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 focus:bg-white focus:border-[#F3645C] focus:ring-2 focus:ring-[#F3645C]/15 outline-none transition-all cursor-pointer"
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/40 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#F3645C] focus:ring-2 focus:ring-[#F3645C]/15 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#0F0F0F] hover:bg-[#262626] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
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

        {/* Quick FAQ Section */}
        <FAQ
          items={HOW_IT_WORKS_FAQS}
          badge="Instant Answers"
          title="Quick Answers Before"
          highlightText="Reaching Out"
          subtitle="Find immediate solutions to the most common questions about accounts, downloads, and billing."
          showContactCta={false}
          bgStyle="#FFFFFF"
        />
      </main>

      <ReadyToBuild />
      <Footer />
    </>
  );
}
