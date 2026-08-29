export interface ResumeExample {
  slug: string;
  roleTitle: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  summaryExamples: string[];
  keySkills: string[];
  experienceBullets: string[];
  educationAdvice: string;
  atsTips: string[];
  commonMistakes: string[];
  recommendedTemplateId: string;
}

export const RESUME_EXAMPLES: ResumeExample[] = [
  {
    slug: 'software-engineer',
    roleTitle: 'Software Engineer',
    category: 'Technology',
    metaTitle: 'Software Engineer Resume Example & Formatting Guide | GetEasyCV',
    metaDescription: 'Recruiter-approved Software Engineer resume example. Learn how to list programming languages, system architecture achievements, and ATS formatting.',
    heroSubtitle: 'Proven resume structure and bullet points tailored for Full Stack, Backend, and Frontend Software Engineers.',
    summaryExamples: [
      'Full Stack Software Engineer with 5+ years of experience building high-concurrency microservices, REST APIs, and responsive web applications using React, Node.js, and TypeScript. Proven track record of improving system uptime to 99.99%.',
      'Detail-oriented Software Developer specializing in cloud-native applications and database optimization. Skilled in automated testing, CI/CD pipelines, and reducing API response latency by 35%.',
    ],
    keySkills: [
      'JavaScript (ES6+), TypeScript, React, Next.js',
      'Node.js, Express, Python, Go',
      'PostgreSQL, MongoDB, Redis, GraphQL',
      'AWS (EC2, S3, Lambda), Docker, Kubernetes',
      'CI/CD, Git, Jest, System Architecture',
    ],
    experienceBullets: [
      'Architected and deployed microservices backend in Node.js/PostgreSQL handling 2M+ daily active requests with <50ms latency.',
      'Refactored legacy React codebase to Next.js App Router, achieving a 45% increase in page load speed and 20% higher SEO organic traffic.',
      'Implemented automated CI/CD pipeline using GitHub Actions, reducing deployment cycle times from 3 hours to 12 minutes.',
      'Mentored 4 junior developers in TypeScript best practices and code review standards.',
    ],
    educationAdvice: 'Highlight your B.S. in Computer Science or Software Engineering. Include relevant coursework (Data Structures, Algorithms, Distributed Systems) and notable open-source contributions.',
    atsTips: [
      'Use standard headings (Professional Summary, Work Experience, Technical Skills, Education).',
      'Spell out acronyms at least once (e.g., Application Programming Interface (API)).',
      'Avoid placing text in header/footer regions where older ATS parsers skip text.',
    ],
    commonMistakes: [
      'Listing laundry lists of technologies without showing how you applied them in real projects.',
      'Omitting quantifiable metrics (e.g., latency reduction, uptime, user growth).',
    ],
    recommendedTemplateId: 'sidebar-left-modern-blue',
  },
  {
    slug: 'web-developer',
    roleTitle: 'Web Developer',
    category: 'Technology',
    metaTitle: 'Web Developer Resume Example & Writing Guide | GetEasyCV',
    metaDescription: 'Clean Web Developer resume sample with ATS-optimized formatting guidance, skill lists, and portfolio presentation advice.',
    heroSubtitle: 'Stand out to engineering hiring managers with actionable web developer bullet points and modern layout templates.',
    summaryExamples: [
      'Creative Frontend & Web Developer with 4+ years of experience designing pixel-perfect, accessible, and performant web applications using HTML5, CSS3, Tailwind CSS, and JavaScript.',
      'Passionate Web Developer adept at converting Figma mocks into scalable Web Vitals-optimized web interfaces.',
    ],
    keySkills: [
      'HTML5, CSS3, Tailwind CSS, Responsive Web Design',
      'JavaScript, React.js, Vue.js, Webpack, Vite',
      'Web Performance & Core Web Vitals Optimization',
      'UI/UX Accessibility (WCAG 2.1 Compliance)',
    ],
    experienceBullets: [
      'Developed 15+ responsive web applications for enterprise clients using React and Tailwind CSS.',
      'Improved Google Lighthouse Performance scores from 62 to 98 across core marketing pages.',
      'Integrated Google Analytics and Segment tracking events to measure funnel conversion.',
    ],
    educationAdvice: 'Mention your degree or web development bootcamps. Include links to your live GitHub repositories and online portfolio.',
    atsTips: [
      'Ensure web URLs (GitHub, portfolio) use standard http:// or https:// formats.',
      'Use plain text section dividers rather than graphical background bars.',
    ],
    commonMistakes: [
      'Not linking to live deployed projects or portfolio website.',
      'Using custom non-standard font icons instead of readable text bullet points.',
    ],
    recommendedTemplateId: 'header-minimal-black',
  },
  {
    slug: 'accountant',
    roleTitle: 'Accountant & Financial Analyst',
    category: 'Finance',
    metaTitle: 'Accountant Resume Example & Career Writing Guide | GetEasyCV',
    metaDescription: 'Professional Accountant resume guide. Learn how to highlight ledger management, tax compliance, financial reporting, and ERP software.',
    heroSubtitle: 'Recruiter-approved resume format for Staff Accountants, Senior Analysts, and Financial Specialists.',
    summaryExamples: [
      'Certified Public Accountant (CPA) with 6+ years of progressive accounting experience in financial reporting, general ledger reconciliation, and corporate tax preparation.',
      'Detail-oriented Financial Analyst skilled in budget forecasting, variance analysis, and QuickBooks/SAP systems.',
    ],
    keySkills: [
      'General Ledger, Accounts Payable (AP), Accounts Receivable (AR)',
      'Financial Auditing, GAAP Compliance, Tax Strategy',
      'SAP ERP, QuickBooks, Microsoft Excel (VLOOKUP, Pivot Tables)',
      'Budgeting, Forecasting, Cost Variance Analysis',
    ],
    experienceBullets: [
      'Managed full-cycle monthly financial close for 12 corporate entities with zero reporting discrepancies.',
      'Identified $45,000 in recurring operational cost savings through internal auditing procedures.',
      'Prepared quarterly GAAP-compliant financial statements and tax filings for leadership reviews.',
    ],
    educationAdvice: 'Display your B.S. in Accounting or Finance prominently. Emphasize CPA or CMA certifications in your resume header.',
    atsTips: [
      'Include specific accounting software names (SAP, NetSuite, QuickBooks) in your Skills section.',
      'Use bullet points to format achievements cleanly.',
    ],
    commonMistakes: [
      'Failing to quantify financial savings or volume of accounts managed.',
      'Mixing personal opinion with objective professional experience.',
    ],
    recommendedTemplateId: 'sidebar-left-classic-navy',
  },
  {
    slug: 'nursing',
    roleTitle: 'Registered Nurse (RN)',
    category: 'Healthcare',
    metaTitle: 'Registered Nurse (RN) Resume Example & Writing Guide | GetEasyCV',
    metaDescription: 'Healthcare recruiter-backed Registered Nurse (RN) resume sample. Learn how to list clinical rotations, certifications, and patient care achievements.',
    heroSubtitle: 'Clinical resume format tailored for BSN, RN, and Healthcare professionals.',
    summaryExamples: [
      'Compassionate Registered Nurse (RN) with 5+ years of clinical experience in high-volume emergency and acute care settings. Dedicated to providing patient-centered care and maintaining strict safety protocols.',
    ],
    keySkills: [
      'Acute Patient Care, Triage, Emergency Response',
      'Electronic Health Records (Epic, Cerner)',
      'Medication Administration, IV Therapy, Phlebotomy',
      'Patient & Family Advocacy, Interdisciplinary Teamwork',
    ],
    experienceBullets: [
      'Delivered high-quality direct patient care in a 28-bed ICU unit with a 1:2 nurse-to-patient ratio.',
      'Collaborated with multidisciplinary teams of physicians, specialists, and therapists to coordinate treatment plans.',
      'Achieved a 98% patient satisfaction score over 4 consecutive quarters.',
    ],
    educationAdvice: 'List BSN/ADN degree along with state nursing license number (e.g. RN License #123456) and certifications (BLS, ACLS, PALS).',
    atsTips: [
      'Spell out credentials clearly (e.g. Registered Nurse (RN), Basic Life Support (BLS)).',
      'Place license numbers near your contact information.',
    ],
    commonMistakes: [
      'Omitting clinical certifications or license expiration details.',
      'Using informal slang instead of medical terminology.',
    ],
    recommendedTemplateId: 'sidebar-left-modern-teal',
  },
  {
    slug: 'project-manager',
    roleTitle: 'Project Manager (PMP)',
    category: 'Management',
    metaTitle: 'Project Manager Resume Example & Writing Guide | GetEasyCV',
    metaDescription: 'PMP Project Manager resume sample with advice on displaying Agile/Scrum methodologies, cross-functional leadership, and budget metrics.',
    heroSubtitle: 'Strategic resume layout designed to showcase project lifecycle execution and leadership metrics.',
    summaryExamples: [
      'PMP-certified Senior Project Manager with 7+ years leading cross-functional engineering, product, and operations teams. Managed portfolio budgets up to $5M.',
    ],
    keySkills: [
      'Agile / Scrum Methodology, Waterfall, Kanban',
      'Jira, Confluence, Asana, MS Project',
      'Risk Assessment, Budgeting & Resource Allocation',
      'Stakeholder Management, Change Management',
    ],
    experienceBullets: [
      'Directed cross-functional project team of 18 engineers to deliver $2M enterprise software platform on schedule.',
      'Reduced project scope creep by 30% through strict milestone tracking and risk mitigation frameworks.',
      'Facilitated daily standups, sprint planning, and retrospectives for 3 Scrum teams.',
    ],
    educationAdvice: 'Highlight PMP, CSM, or Agile certifications clearly alongside your bachelor’s degree.',
    atsTips: [
      'Include keywords like Risk Assessment, Scope Management, Stakeholder Engagement.',
      'Keep visual layout clean with bulleted lists.',
    ],
    commonMistakes: [
      'Listing tasks instead of measurable project outcomes and ROI.',
      'Leaving out budget figures and team sizes.',
    ],
    recommendedTemplateId: 'header-modern-emerald',
  },
  {
    slug: 'student-fresher',
    roleTitle: 'Student & Entry-Level (Fresher)',
    category: 'Entry Level',
    metaTitle: 'Student & Entry-Level Resume Example & Writing Guide | GetEasyCV',
    metaDescription: 'Entry-level resume guide for recent graduates and students. Learn how to write a compelling summary, highlight academic projects, and overcome lack of work experience.',
    heroSubtitle: 'Entry-level resume template designed to turn academic projects and coursework into valuable qualifications.',
    summaryExamples: [
      'Motivated Computer Science graduate with strong foundational skills in Java, Python, and SQL. Eager to contribute to a collaborative software development team as a Junior Engineer.',
    ],
    keySkills: [
      'Problem Solving, Data Structures, Basic Programming',
      'Team Collaboration, Time Management, Adaptability',
      'Git, GitHub, HTML/CSS, Microsoft Office',
    ],
    experienceBullets: [
      'Completed Senior Capstone Project: Designed full-stack e-commerce web app using React and Node.js.',
      'Organized annual university tech symposium for 500+ attendees.',
    ],
    educationAdvice: 'Place Education section near the top of the resume. List GPA (if 3.5+), relevant coursework, academic honors, and club leadership.',
    atsTips: [
      'Use standard resume section titles.',
      'Highlight technical skills learned during lab work or personal projects.',
    ],
    commonMistakes: [
      'Leaving out personal or capstone projects.',
      'Using unprofessional email addresses.',
    ],
    recommendedTemplateId: 'sidebar-left-minimal-gray',
  },
];
