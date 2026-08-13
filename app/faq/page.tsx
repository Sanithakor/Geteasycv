'use client';

import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import Footer from "@/components/Footer";
import Link from "next/link";

const initialFaqs = [
  {
    question: "Is GetEasyCV free to use?",
    answer: "Yes, we offer a free plan that includes access to basic templates and standard export options. For advanced templates, AI features, and high-resolution exports, we offer premium plans."
  },
  {
    question: "Are the resumes ATS-friendly?",
    answer: "Absolutely. Our templates are specifically designed to be read by Applicant Tracking Systems (ATS) to ensure your resume gets past the bots and into the hands of recruiters."
  },
  {
    question: "Can I download my resume as a PDF?",
    answer: "Yes, you can export your resume as a high-quality PDF, as well as PNG or JPG image formats."
  },
  {
    question: "Is my data secure?",
    answer: "We take your privacy seriously. Your data is encrypted and securely stored. We never sell your personal information to third parties."
  },
  {
    question: "Can I cancel my premium subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time from your account settings. You will retain access to premium features until the end of your billing cycle."
  }
];

export default function FAQPage() {
  const [faqs, setFaqs] = useState(initialFaqs);

  useEffect(() => {
    fetch('/api/faqs')
      .then(res => res.json())
      .then(data => {
        if (data?.success && Array.isArray(data.data) && data.data.length > 0) {
          setFaqs(data.data);
        }
      })
      .catch(err => console.warn('Could not fetch dynamic FAQs, using fallback:', err));
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 flex justify-center px-4 py-20">
        <div className="max-w-3xl w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 text-center">Frequently Asked Questions</h1>
          <p className="text-center text-slate-500 mb-10">Everything you need to know about the product and billing.</p>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-md shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-indigo-50 rounded-md p-8 border border-indigo-100">
            <h3 className="text-xl font-semibold text-indigo-900 mb-2">Still have questions?</h3>
            <p className="text-indigo-700 mb-6">Our support team is here to help.</p>
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </main>
      <ReadyToBuild />
      <Footer />
    </>
  );
}
