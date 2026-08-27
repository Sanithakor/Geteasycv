export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

export const FAQ_CATEGORIES = [
  'All',
  'Getting Started',
  'ATS & Optimization',
  'Templates & Editor',
  'AI Writer',
  'Export & Formats',
  'Pricing & Billing',
  'Privacy & Security',
] as const;

export const ALL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Getting Started',
    question: 'How does GetEasyCV work?',
    answer:
      'GetEasyCV lets you build a professional resume in 4 simple steps: choose from 150+ recruiter-tested templates, input your work history and skills (or use AI suggestions to generate them), customize colors and layout with real-time preview, and export a clean, ATS-compliant PDF in seconds.',
  },
  {
    id: 'faq-2',
    category: 'Getting Started',
    question: 'Is GetEasyCV free to use?',
    answer:
      'Yes! We offer a generous free tier that includes access to core templates, standard resume sections, real-time live preview, and PDF export. You can also try our AI writer and ATS score checker for free.',
  },
  {
    id: 'faq-3',
    category: 'ATS & Optimization',
    question: 'What makes a resume "ATS-friendly"?',
    answer:
      'Applicant Tracking Systems (ATS) scan resumes for keywords, parseable single- or dual-column structures, standard headings (Experience, Education, Skills), and clean typography without complex graphic tables or unreadable text layers. Every template in GetEasyCV is engineered and verified against systems like Workday, Greenhouse, Taleo, and Lever.',
  },
  {
    id: 'faq-4',
    category: 'ATS & Optimization',
    question: 'How does the ATS Score Checker work?',
    answer:
      'Our ATS Score Checker parses your resume text and layout, comparing your content against target industry roles. It scores your document across parseability, keyword density, quantified metric frequency, and section completeness, offering instant 1-click recommendations to boost your callback rate.',
  },
  {
    id: 'faq-5',
    category: 'AI Writer',
    question: 'How does the AI Resume Assistant help me write?',
    answer:
      'Our built-in AI assistant helps you craft quantified bullet points, role-specific professional summaries, and high-impact achievement statements. Simply type a basic description or click the AI button next to any field, and the AI will generate polished, recruiter-proven alternatives.',
  },
  {
    id: 'faq-6',
    category: 'AI Writer',
    question: 'Can I generate a matching cover letter with AI?',
    answer:
      'Yes! Our AI Cover Letter Builder analyzes your target job title, company name, and qualifications to generate tailored, persuasive letters that match the typography and color scheme of your resume.',
  },
  {
    id: 'faq-7',
    category: 'Templates & Editor',
    question: 'Can I switch templates without losing my data?',
    answer:
      'Yes! Your resume content is saved independently of the template styling. You can switch between single-column, modern split, sidebar, and executive layouts at any time — your content will automatically re-render into the new layout without losing any text.',
  },
  {
    id: 'faq-8',
    category: 'Templates & Editor',
    question: 'Can I reorder sections and customize colors?',
    answer:
      'Absolutely. You can drag and drop sections to reorder them, toggle optional sections (like Certifications, Languages, Awards, Projects), adjust font families, and pick from custom curated color themes with live real-time preview.',
  },
  {
    id: 'faq-9',
    category: 'Export & Formats',
    question: 'What file formats can I download?',
    answer:
      'You can export your resume as a print-ready, high-resolution vector PDF at exact A4 dimensions, as an editable DOCX file for Microsoft Word, or as high-res PNG/JPG images. You can also generate a secure, shareable web link to send directly to hiring managers.',
  },
  {
    id: 'faq-10',
    category: 'Export & Formats',
    question: 'Are PDF downloads formatted for true A4 print size?',
    answer:
      'Yes. Our PDF rendering engine formats every template at precise A4 print standards (794px × 1123px at 96 DPI / 300 DPI print scaling) with zero clipping, overflow, or broken page breaks.',
  },
  {
    id: 'faq-11',
    category: 'Pricing & Billing',
    question: 'How do the Starter, Pro, and Lifetime plans differ?',
    answer:
      'The Starter plan (₹49 one-time) lets you create and export 1 complete resume without subscription. The Pro plan (₹199/mo) offers unlimited resumes, all premium templates, AI assists, and continuous updates. The Lifetime plan (₹999 one-time) grants permanent unlimited access to all current and future features with zero recurring charges.',
  },
  {
    id: 'faq-12',
    category: 'Pricing & Billing',
    question: 'Can I cancel my subscription anytime?',
    answer:
      'Yes. You can cancel your subscription at any time with a single click from your account settings. You will retain full premium access until the end of your paid billing period.',
  },
  {
    id: 'faq-13',
    category: 'Pricing & Billing',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit/debit cards (Visa, Mastercard, RuPay, Amex), UPI (Google Pay, PhonePe, Paytm), Net Banking, and international cards via secure 256-bit encrypted Razorpay and Stripe gateways.',
  },
  {
    id: 'faq-14',
    category: 'Privacy & Security',
    question: 'Is my personal data secure and private?',
    answer:
      'Yes, 100%. We take privacy seriously. Your data is encrypted in transit and at rest using industry-standard SSL encryption. We never sell, rent, or monetize your resume data with third-party advertisers or recruiters without your explicit permission.',
  },
];

// Specialized FAQ subsets for individual pages
export const PRICING_FAQS: FAQItem[] = [
  {
    question: 'How does the ₹49 Starter plan work?',
    answer:
      'The Starter plan is a one-time ₹49 payment that allows you to create and download 1 complete premium resume with zero recurring subscriptions or hidden fees.',
  },
  {
    question: 'Can I cancel my Pro subscription at any time?',
    answer:
      'Yes! You can cancel your ₹199/month Pro subscription at any time from your account settings with a single click. You will keep full access until the end of your billing period.',
  },
  {
    question: 'What is included in the ₹999 Lifetime plan?',
    answer:
      'Lifetime gives you permanent unlimited access to create as many resumes as you want, access all 150+ current and future premium templates, cover letters, and AI features forever with a single payment.',
  },
  {
    question: 'Are there any hidden fees or auto-renewals on one-time plans?',
    answer:
      'No. The Starter (₹49) and Lifetime (₹999) plans are strictly one-time payments. They will never auto-renew or charge your card again.',
  },
  {
    question: 'What payment methods are supported?',
    answer:
      'We support UPI (GPay, PhonePe, Paytm), All Credit & Debit Cards (Visa, Mastercard, RuPay), Net Banking, and International Cards processed through secure 256-bit SSL encrypted PCI-DSS gateways.',
  },
  {
    question: 'Do you offer a refund policy?',
    answer:
      'Yes. If you experience any technical defect with your download or export that our support team cannot resolve, we provide a full refund within 7 days of purchase.',
  },
];

export const HOW_IT_WORKS_FAQS: FAQItem[] = [
  {
    question: 'Do I need to create an account to start building?',
    answer:
      'No! You can start editing and previewing any template immediately without creating an account. You can create a free account when you want to save your progress or download your resume.',
  },
  {
    question: 'Can I switch templates without losing my entered information?',
    answer:
      'Yes. Your resume data is decoupled from template presentation. When you select a new template layout, all your personal details, work history, skills, and education automatically adapt to the new design instantly.',
  },
  {
    question: 'Will my downloaded PDF pass ATS screening filters?',
    answer:
      'Yes! All our templates use clean, parseable text hierarchies, standard section names, and compliant single/dual-column structures recommended by talent recruiters and automated screening software.',
  },
  {
    question: 'How does auto-saving work?',
    answer:
      'The GetEasyCV editor auto-saves your changes locally and to your cloud account every few seconds so you never lose your progress even if your browser closes unexpectedly.',
  },
];

export const ATS_FAQS: FAQItem[] = [
  {
    question: 'What is an ATS (Applicant Tracking System)?',
    answer:
      'An ATS is software used by over 90% of Fortune 500 companies and recruitment agencies to scan, parse, rank, and filter resumes before a human hiring manager reviews them.',
  },
  {
    question: 'Why do resumes get rejected by ATS filters?',
    answer:
      'Resumes often fail ATS scans due to complex tables, text boxes, graphics, non-standard fonts, missing job-description keywords, or unparseable headers/footers. GetEasyCV prevents all of these issues.',
  },
  {
    question: 'How does GetEasyCV ensure 100% ATS readability?',
    answer:
      'Every template uses standard semantic headings, vector font encoding, clean column flow, and keyword-rich structures verified across major platforms like Workday, Greenhouse, Taleo, and Lever.',
  },
  {
    question: 'Can I check my resume score before applying?',
    answer:
      'Yes! Our built-in ATS scanner analyzes your formatting, section structure, keyword density, and action verb impact, giving you actionable tips to increase your score.',
  },
];

export const COVER_LETTER_FAQS: FAQItem[] = [
  {
    question: 'Can I match my cover letter design to my resume template?',
    answer:
      'Yes! Our cover letter templates share the exact same typography, color schemes, and header layouts as our resume templates, giving you a coordinated, professional job application package.',
  },
  {
    question: 'How does the AI Cover Letter Assistant generate content?',
    answer:
      'You provide your target job title, company name, and key experience, and our AI crafts a persuasive, role-tailored letter with strong opening hooks, quantified accomplishments, and professional sign-offs.',
  },
  {
    question: 'Can I edit the AI-generated cover letter?',
    answer:
      'Yes. You have complete control to edit, rewrite, add personal touches, switch tones (Professional, Confident, Friendly), or regenerate specific paragraphs in the live editor.',
  },
  {
    question: 'What export formats are available for cover letters?',
    answer:
      'You can download your cover letter as a high-resolution print-ready PDF, copy the plain text to your clipboard, or export as an editable document.',
  },
];

export const ABOUT_FAQS: FAQItem[] = [
  {
    question: 'What is the mission of GetEasyCV?',
    answer:
      'Our mission is to eliminate resume anxiety and empower job seekers worldwide by providing intuitive, AI-assisted tools and recruiter-tested templates that help everyone land more job interviews.',
  },
  {
    question: 'How are GetEasyCV templates designed and tested?',
    answer:
      'Our templates are crafted in collaboration with recruitment specialists and HR hiring managers, then tested through automated parsing software to ensure high readability and maximum callback rates.',
  },
  {
    question: 'How is user privacy protected?',
    answer:
      'We use 256-bit SSL encryption for all data in transit and at rest. Your career information is private to your account and is never sold, shared, or shared with third parties.',
  },
];
