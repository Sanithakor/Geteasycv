'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import InnerBanner from '@/components/InnerBanner';
import ReadyToBuild from '@/components/sections/ReadyToBuild';
import FAQ from '@/components/FAQ';
import { HOW_IT_WORKS_FAQS } from '@/data/faqs';
import Footer from '@/components/Footer';
import { Mail, Clock, CheckCircle2, Loader2, Send, Headphones } from 'lucide-react';

const TOPICS = ['General Question', 'Technical Issue', 'Billing & Payments', 'Feature Request', 'Account Help', 'Other'];

export default function ContactClientContent() {
  const [form, setForm] = useState({ name: '', email: '', topic: 'General Question', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Failed to send message. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try emailing us directly at support@geteasycv.com');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F8F8F6] text-[#0F0F0F] font-sans pb-20">
        <InnerBanner
          badge="24/7 Customer Support"
          badgeIcon={Headphones}
          breadcrumbs={[{ label: "Contact Us", href: "/contact" }]}
          title="We're Here to Help"
          highlightText="Get in Touch"
          description="Have questions about our resume builder, templates, or account billing? Send us a message and our team will get back to you within 24 hours."
          primaryAction={{
            label: "Create Resume Free",
            href: "/templates",
          }}
          secondaryAction={{
            label: "Browse FAQ",
            href: "/faq",
          }}
          features={[
            "Fast Email Support",
            "24-Hour Response Time",
            "Friendly Customer Service",
          ]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Send Us a Message</h2>
                <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">Fill out the form below and our team will respond as quickly as possible.</p>
              </div>

              {sent ? (
                <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold text-emerald-900">Message Received!</h3>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto">
                    Thank you for reaching out. We have received your message and will respond to {form.email} within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1.5">Your Full Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#F3645C] focus:ring-2 focus:ring-[#F3645C]/15 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#F3645C] focus:ring-2 focus:ring-[#F3645C]/15 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1.5">Topic</label>
                    <select
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:border-[#F3645C] focus:ring-2 focus:ring-[#F3645C]/15 outline-none transition-all cursor-pointer bg-white"
                    >
                      {TOPICS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1.5">Message *</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-[#F3645C] focus:ring-2 focus:ring-[#F3645C]/15 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-[#0F0F0F] hover:bg-black text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
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

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
                <h3 className="font-bold text-slate-900 text-lg">Direct Contact Info</h3>
                
                <div className="space-y-4 text-xs font-medium">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF5722] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Support Email</span>
                      <a href="mailto:support@geteasycv.com" className="text-[#FF5722] hover:underline mt-0.5 block">
                        support@geteasycv.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Response Time</span>
                      <span className="text-slate-500">Within 24 business hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FAQ items={HOW_IT_WORKS_FAQS} />
      </main>
      <ReadyToBuild />
      <Footer />
    </>
  );
}
