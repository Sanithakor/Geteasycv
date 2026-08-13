'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import {
  HelpCircle,
  Plus,
  Search,
  Trash2,
  Edit3,
  X,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
  published: boolean;
};

const initialFAQs: FAQItem[] = [
  { id: 'faq-1', question: 'How does GetEasyCV make my resume ATS-friendly?', answer: 'GetEasyCV uses single and double-column structural semantic layouts formatted according to ATS scanning standards (Applicant Tracking Systems), ensuring parsers extract your experience, skills, and contact data perfectly without text collisions.', category: 'General', published: true },
  { id: 'faq-2', question: 'Can I download my resume as a high-resolution PDF?', answer: 'Yes! You can download your resume in crisp vector PDF format, high-resolution PNG, or JPG format instantly at any time.', category: 'Downloads', published: true },
  { id: 'faq-3', question: 'Is my data secure and private?', answer: 'We prioritize user data privacy. Your personal information is encrypted and stored safely. We never sell or share your resume data with third parties.', category: 'Privacy & Security', published: true },
  { id: 'faq-4', question: 'How do subscription plans and billing work?', answer: 'We offer Free, Pro, and Lifetime plans. You can upgrade or cancel your subscription at any time with no lock-in contracts or hidden fees.', category: 'Pricing & Billing', published: true },
  { id: 'faq-5', question: 'Can I customize font styles and template colors?', answer: 'Absolutely! Our Template Editor lets you change color accents, font families, line heights, section spacing, and section ordering with real-time live preview.', category: 'Editor & Customization', published: true },
];

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('General');

  useEffect(() => {
    const saved = localStorage.getItem('admin_faqs_data');
    if (saved) {
      try {
        setFaqs(JSON.parse(saved));
      } catch (e) {
        setFaqs(initialFAQs);
      }
    } else {
      setFaqs(initialFAQs);
    }
  }, []);

  const saveFAQs = (updated: FAQItem[]) => {
    setFaqs(updated);
    localStorage.setItem('admin_faqs_data', JSON.stringify(updated));
  };

  const openCreate = () => {
    setEditingId(null);
    setQuestion('');
    setAnswer('');
    setCategory('General');
    setShowModal(true);
  };

  const openEdit = (faq: FAQItem) => {
    setEditingId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategory(faq.category);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    if (editingId) {
      const updated = faqs.map(f => f.id === editingId ? { ...f, question, answer, category } : f);
      saveFAQs(updated);
      toast.success('FAQ updated successfully');
    } else {
      const newFAQ: FAQItem = {
        id: `faq-${Date.now()}`,
        question,
        answer,
        category,
        published: true
      };
      saveFAQs([newFAQ, ...faqs]);
      toast.success('New FAQ added');
    }
    setShowModal(false);
  };

  const togglePublished = (id: string) => {
    const updated = faqs.map(f => f.id === id ? { ...f, published: !f.published } : f);
    saveFAQs(updated);
    toast.success('FAQ status toggled');
  };

  const deleteFAQ = (id: string) => {
    if (confirm('Delete this FAQ entry?')) {
      const updated = faqs.filter(f => f.id !== id);
      saveFAQs(updated);
      toast.success('FAQ deleted');
    }
  };

  const filtered = faqs.filter(f => {
    const matchSearch = !search || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'All' || f.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="p-2 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-7 h-7 text-violet-600" />
              FAQ Management
            </h1>
          </div>
          <p className="text-xs text-slate-500 pl-11">
            Manage frequently asked questions, help categories, and published documentation.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs rounded-md transition-all shadow-md shadow-violet-500/20 flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-md border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900 outline-none focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['All', 'General', 'Downloads', 'Pricing & Billing', 'Editor & Customization', 'Privacy & Security'].map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filtered.map(faq => {
          const isExpanded = expandedId === faq.id;
          return (
            <div key={faq.id} className="bg-white rounded-md border border-slate-200 shadow-2xs overflow-hidden">
              <div
                onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold bg-violet-50 text-violet-700 px-2.5 py-1 rounded-md">
                    {faq.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{faq.question}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); togglePublished(faq.id); }}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                      faq.published ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {faq.published ? 'Published' : 'Hidden'}
                  </button>

                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); openEdit(faq); }}
                    className="p-1.5 rounded-md text-slate-500 hover:bg-slate-200 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); deleteFAQ(faq.id); }}
                    className="p-1.5 rounded-md text-rose-500 hover:bg-rose-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-md max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">{editingId ? 'Edit FAQ' : 'Add FAQ'}</h3>
              <button type="button" onClick={() => setShowModal(false)} className="p-1 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <label className="grid gap-1.5 text-xs font-bold text-slate-700">
              <span>Question</span>
              <input
                type="text"
                required
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="e.g. How do I switch resume templates?"
                className="h-11 px-3.5 rounded-md border border-slate-200 text-sm outline-none"
              />
            </label>

            <label className="grid gap-1.5 text-xs font-bold text-slate-700">
              <span>Category</span>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="h-11 px-3.5 rounded-md border border-slate-200 text-sm outline-none"
              >
                <option value="General">General</option>
                <option value="Downloads">Downloads</option>
                <option value="Pricing & Billing">Pricing & Billing</option>
                <option value="Editor & Customization">Editor & Customization</option>
                <option value="Privacy & Security">Privacy & Security</option>
              </select>
            </label>

            <label className="grid gap-1.5 text-xs font-bold text-slate-700">
              <span>Answer</span>
              <textarea
                rows={4}
                required
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                placeholder="Detailed answer text..."
                className="p-3 rounded-md border border-slate-200 text-sm outline-none"
              />
            </label>

            <div className="pt-2 flex justify-end gap-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-md border border-slate-200 text-xs font-bold text-slate-600">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2.5 rounded-md bg-violet-600 text-white text-xs font-bold shadow-md">
                Save FAQ Entry
              </button>
            </div>
          </form>
        </div>
      )}

      <Toaster position="bottom-right" />
    </div>
  );
}
