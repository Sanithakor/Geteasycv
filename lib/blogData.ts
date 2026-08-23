export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: 'published' | 'draft';
  views: number;
  author: string;
  date: string;
  readTime: string;
  coverImage?: string;
  isFeatured?: boolean;
}

export const INITIAL_BLOG_POSTS: BlogPostItem[] = [
  {
    id: 'post-1',
    slug: 'ats-friendly-resume-guide-2024',
    title: 'How to Write an ATS-Friendly Resume in 2024 (Step-by-Step Guide)',
    excerpt: 'Applicant Tracking Systems scan your resume before a recruiter reads it. Learn the exact formatting, keywords, and structural rules to pass ATS filters every time.',
    content: `
# How to Write an ATS-Friendly Resume in 2024

Over 98% of Fortune 500 companies use an **Applicant Tracking System (ATS)** to filter candidates before human eyes ever see a resume. If your formatting or structure confuses the parser, your application may be automatically filtered out—no matter how qualified you are.

---

## 1. What is an ATS and How Does It Work?

An ATS is software that parses resume documents, extracts structured data (work experience, job titles, education, skills), and scores candidates based on keyword matching and relevance to the job description.

---

## 2. Key Rules for ATS-Friendly Formatting

- **Use Standard Fonts**: Stick to clean, universal typography such as **Poppins**, **Inter**, Arial, or Helvetica.
- **Avoid Complex Tables & Graphics**: Floating text boxes, multi-level tables, and raster graphics can confuse ATS parsers.
- **Use Clear Standard Section Headings**: Stick to standard titles like *Work Experience*, *Education*, *Skills*, and *Summary*.
- **Use Standard File Formats**: Export clean PDF files or Word DOCX documents that preserve selectable text.

---

## 3. Optimizing Resume Keywords

1. **Analyze the Job Description**: Identify core skills, qualifications, and industry terms mentioned repeatedly.
2. **Match Job Titles**: Use industry-standard job titles (e.g., *Senior Frontend Developer* instead of *Coding Ninja*).
3. **Incorporate Measurable Results**: Use metrics such as *"Increased conversion rate by 34%"* or *"Managed $2M annual budget"*.

---

## Conclusion

Creating an ATS-friendly resume doesn't mean sacrificing design. With GetEasyCV's ATS-optimized templates, your resume stays beautifully formatted for humans while remaining 100% readable by automated parsers.
    `,
    category: 'Resume Tips',
    tags: ['ATS', 'Resume Writing', 'Career'],
    status: 'published',
    views: 4230,
    author: 'Sarah Jenkins',
    date: '2026-08-19',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80',
    isFeatured: true,
  },
  {
    id: 'post-2',
    slug: '10-resume-mistakes-costing-job-offers',
    title: '10 Resume Mistakes That Are Costing You Job Offers',
    excerpt: 'From generic objective statements to missing metrics and inconsistent formatting—avoid these 10 common pitfalls to make your application stand out.',
    content: `
# 10 Resume Mistakes That Are Costing You Job Offers

Getting interviews requires more than just listing past job duties. Avoid these critical mistakes to dramatically boost your response rates.

---

## 1. Including a Generic Objective Statement
Instead of stating *"Seeking a challenging role in software engineering"*, write a targeted **Executive Summary** highlighting your top achievements and core value proposition.

## 2. Listing Responsibilities Instead of Achievements
Don't just write *"Responsible for managing customer support"*. Write *"Led a team of 8 support reps, maintaining a 98% CSAT score across 15,000+ tickets"*.

## 3. Poor Visual Hierarchy and Inconsistent Spacing
Varying margins, random font sizes, and inconsistent bullet points look unprofessional. Use standardized templates with consistent line heights and font families.

## 4. Oversaturating with Buzzwords
Words like *"hardworking"*, *"detail-oriented"*, and *"team player"* carry little weight without empirical proof. Show, don't tell!

---

## Summary

Review your resume against these 10 pitfalls before submitting your next application. Clean layouts and quantified results will set you apart instantly.
    `,
    category: 'Career Advice',
    tags: ['Career', 'Mistakes', 'Job Search'],
    status: 'published',
    views: 3100,
    author: 'Alex Rivera',
    date: '2026-08-18',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    isFeatured: false,
  },
  {
    id: 'post-3',
    slug: 'mastering-modern-resume-layouts',
    title: 'Mastering the Modern Resume: Layouts, Typography & Color Palette',
    excerpt: 'Visual presentation matters. Discover how subtle color accents, balanced whitespace, and hierarchy turn a basic CV into an executive personal brand statement.',
    content: `
# Mastering the Modern Resume: Layouts, Typography & Color Palette

Your resume is your personal marketing document. Visual design choices directly impact how recruiters perceive your seniority and attention to detail.

---

## 1. Grid Alignment and Margins
Maintain standard **0.5-inch to 0.75-inch margins** to maximize content area without crowding the text.

## 2. Typography Rules
Limit font choices to 1 or 2 high-legibility font families. Set body text to **10pt–11pt** and section headings to **12pt–14pt bold**.

## 3. Professional Color Palettes
Use subtle accent colors for section headers or sidebar dividers:
- **Executive Navy**: Professional and authoritative.
- **Teal / Emerald**: Modern, energetic, and clean.
- **Slate Gray**: Minimalist and sleek.

---

## Summary

Clean layout hierarchy ensures human recruiters can scan your top qualifications in 6 seconds or less.
    `,
    category: 'Design & Layout',
    tags: ['Design', 'Typography', 'CV Layout'],
    status: 'published',
    views: 5890,
    author: 'Elena Rostova',
    date: '2026-08-15',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
    isFeatured: false,
  },
  {
    id: 'post-4',
    slug: 'write-powerful-executive-resume',
    title: 'How to Write a Powerful Executive Resume for Senior Roles',
    excerpt: 'As an executive, your resume needs to demonstrate strategic vision, operational leadership, and revenue growth metrics.',
    content: `
# How to Write a Powerful Executive Resume for Senior Roles

As an executive, your resume needs to demonstrate strategic vision, operational leadership, and revenue growth metrics.

---

## Key Executive Resume Elements
- **Executive Summary**: 3–4 punchy lines defining your leadership scope and industry impact.
- **Core Competencies Grid**: Strategic planning, M&A, P&L management, cross-functional leadership.
- **Key Milestones**: Highlight major turnaround projects, team expansion, or technological digital transformations.

---

Use executive templates tailored to senior leadership to make an immediate impact on executive recruiters.
    `,
    category: 'Executive',
    tags: ['Executive', 'Leadership', 'Management'],
    status: 'published',
    views: 2410,
    author: 'Marcus Vance',
    date: '2026-08-10',
    readTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
    isFeatured: false,
  },
];

const STORAGE_KEY = 'geteasycv_blog_posts_v1';

export function getStoredBlogPosts(): BlogPostItem[] {
  if (typeof window === 'undefined') return INITIAL_BLOG_POSTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BLOG_POSTS));
    return INITIAL_BLOG_POSTS;
  } catch {
    return INITIAL_BLOG_POSTS;
  }
}

export function saveStoredBlogPosts(posts: BlogPostItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (err) {
    console.error('Error saving blog posts to localStorage:', err);
  }
}

export function incrementBlogPostView(idOrSlug: string) {
  if (typeof window === 'undefined') return;
  const posts = getStoredBlogPosts();
  const updated = posts.map(p => {
    if (p.id === idOrSlug || p.slug === idOrSlug) {
      return { ...p, views: (p.views || 0) + 1 };
    }
    return p;
  });
  saveStoredBlogPosts(updated);
}
