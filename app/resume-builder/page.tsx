import React from 'react';
import type { Metadata } from 'next';
import { SoftwareAppSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import ResumeBuilderClientContent from '@/components/resume-builder/ResumeBuilderClientContent';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Free Online Resume Builder | Create ATS-Friendly Resumes | GetEasyCV',
  description:
    'Build a professional ATS-friendly resume in 10 minutes. Pick from recruiter-approved templates, customize section layouts, and export high-res PDFs.',
  alternates: {
    canonical: `${baseUrl}/resume-builder`,
  },
  openGraph: {
    title: 'Free Online Resume Builder | Create ATS-Friendly Resumes | GetEasyCV',
    description: 'Build a recruiter-approved resume in 10 minutes with ATS templates.',
    url: `${baseUrl}/resume-builder`,
  },
};

const RESUME_BUILDER_FAQS = [
  {
    question: 'Is the GetEasyCV Resume Builder free to use?',
    answer: 'Yes, our resume builder allows you to create your resume, pick from professional templates, customize sections, and download a free PDF copy.',
  },
  {
    question: 'How does the ATS formatting check work?',
    answer: 'GetEasyCV uses clean OpenXML/PDF layouts with standard font encoding and plain-text fallbacks so Applicant Tracking Systems (ATS) can parse your text without formatting errors.',
  },
  {
    question: 'Can I export my resume as Microsoft Word or PDF?',
    answer: 'Yes, you can export your completed resume as a selectable Vector PDF or a native Microsoft Word (.docx) document.',
  },
];

export default function ResumeBuilderLandingPage() {
  return (
    <>
      <SoftwareAppSchema />
      <FAQSchema faqs={RESUME_BUILDER_FAQS} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Resume Builder', url: '/resume-builder' },
        ]}
      />
      <ResumeBuilderClientContent />
    </>
  );
}
