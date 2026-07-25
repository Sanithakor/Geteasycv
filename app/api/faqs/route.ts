import { NextResponse } from 'next/server';

const defaultFaqs = [
  {
    id: 'faq-1',
    question: 'How does GetEasyCV work?',
    answer: 'Select a professionally designed template, input your career details or import them, customize your layout & colors, and download a ATS-friendly PDF instantly.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'Are the resume templates ATS-friendly?',
    answer: 'Yes! All our template layouts are optimized for Applicant Tracking Systems (ATS) to ensure parser readability.',
    category: 'Templates'
  },
  {
    id: 'faq-3',
    question: 'Can I export my resume in multiple formats?',
    answer: 'Absolutely. You can export high-quality PDF files, PNG image previews, or JPG files at any time.',
    category: 'Export'
  },
  {
    id: 'faq-4',
    question: 'Is my data safe and secure?',
    answer: 'Your privacy is our top priority. All personal information and document contents are encrypted in transit and at rest.',
    category: 'Security'
  },
  {
    id: 'faq-5',
    question: 'Can I customize font styles and colors?',
    answer: 'Yes! Our dynamic editor lets you change primary accent colors, typography font families, section ordering, and spacing with live preview.',
    category: 'Customization'
  }
];

export async function GET() {
  return NextResponse.json({ success: true, data: defaultFaqs });
}
