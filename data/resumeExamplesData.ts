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
    slug: 'frontend-developer',
    roleTitle: 'Frontend Developer',
    category: 'Technology',
    metaTitle: 'Frontend Developer Resume Example & Guide | GetEasyCV',
    metaDescription: 'Recruiter-approved Frontend Developer resume guide. Learn how to highlight React, Next.js, Web Vitals, and responsive UI components.',
    heroSubtitle: 'Tailored resume format and bullet points for React, Vue, and modern JavaScript UI Engineers.',
    summaryExamples: [
      'Senior Frontend Developer with 6+ years of experience engineering accessible, high-performance web applications using React, TypeScript, and Next.js. Passionate about Core Web Vitals optimization.',
    ],
    keySkills: [
      'React, Next.js, TypeScript, JavaScript (ES6+)',
      'Tailwind CSS, HTML5, CSS3, Responsive Design',
      'Redux Toolkit, Zustand, React Query',
      'Jest, React Testing Library, Cypress',
      'Web Performance & Accessibility (WCAG 2.1)',
    ],
    experienceBullets: [
      'Built and launched component design system used across 12 product squads, cutting UI development time by 30%.',
      'Optimized Largest Contentful Paint (LCP) from 3.8s to 1.2s across core landing pages.',
    ],
    educationAdvice: 'Include B.S. in Computer Science or relevant technical bootcamps. Link your GitHub and portfolio site clearly.',
    atsTips: ['Format skill lists using standard comma separation.', 'Avoid custom graphical skill progress bars.'],
    commonMistakes: ['Failing to include live links to deployed web applications.'],
    recommendedTemplateId: 'header-minimal-black',
  },
  {
    slug: 'backend-developer',
    roleTitle: 'Backend Developer',
    category: 'Technology',
    metaTitle: 'Backend Developer Resume Example & Writing Guide | GetEasyCV',
    metaDescription: 'Backend Developer resume guide. Highlight API design, microservices, database tuning, and cloud infrastructure achievements.',
    heroSubtitle: 'Recruiter-backed resume bullet points for Node.js, Python, Java, and Go Backend Engineers.',
    summaryExamples: [
      'Backend Engineer with 5+ years specializing in distributed systems, REST/GraphQL API architecture, and database scaling.',
    ],
    keySkills: [
      'Node.js, Python, Java, Go',
      'PostgreSQL, MySQL, Redis, MongoDB',
      'Docker, Kubernetes, AWS, Terraform',
      'Microservices, gRPC, Kafka, RabbitMQ',
    ],
    experienceBullets: [
      'Engineered high-throughput payment processing engine handling $10M+ monthly transactions.',
      'Optimized database queries, reducing average database CPU load by 40%.',
    ],
    educationAdvice: 'Highlight Computer Science degree and certifications in AWS, Azure, or Kubernetes.',
    atsTips: ['Spell out API, SQL, and AWS terms clearly.', 'Use clean, single-column sections.'],
    commonMistakes: ['Omitting database names or scaling metrics.'],
    recommendedTemplateId: 'sidebar-left-classic-navy',
  },
  {
    slug: 'data-analyst',
    roleTitle: 'Data Analyst',
    category: 'Data & Analytics',
    metaTitle: 'Data Analyst Resume Example & Writing Guide | GetEasyCV',
    metaDescription: 'Professional Data Analyst resume sample. Learn how to highlight SQL, Python, Tableau, PowerBI, and business intelligence impact.',
    heroSubtitle: 'Impactful resume layout for Data Analysts, BI Specialists, and Analytics Engineers.',
    summaryExamples: [
      'Data Analyst with 4+ years translating complex dataset queries into actionable business insights using SQL, Python, and Tableau.',
    ],
    keySkills: [
      'SQL, Python (Pandas, NumPy), R',
      'Tableau, Power BI, Looker',
      'Data Modeling, ETL Pipelines, Data Warehousing (Snowflake)',
      'A/B Testing, Statistical Analysis, Excel',
    ],
    experienceBullets: [
      'Designed executive Tableau dashboards tracking real-time MRR, customer churn, and LTV metrics for C-suite leadership.',
      'Automated weekly ETL data pipeline in Python, saving 15 analyst hours per week.',
    ],
    educationAdvice: 'Include B.S. in Statistics, Mathematics, Economics, or Data Science.',
    atsTips: ['Ensure SQL dialect names (PostgreSQL, MySQL) are explicitly listed.'],
    commonMistakes: ['Failing to connect analytics insights to real business outcomes.'],
    recommendedTemplateId: 'header-modern-emerald',
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
    ],
    keySkills: [
      'HTML5, CSS3, Tailwind CSS, Responsive Web Design',
      'JavaScript, React.js, Vue.js, Webpack, Vite',
      'Web Performance & Core Web Vitals Optimization',
    ],
    experienceBullets: [
      'Developed 15+ responsive web applications for enterprise clients using React and Tailwind CSS.',
      'Improved Google Lighthouse Performance scores from 62 to 98 across core marketing pages.',
    ],
    educationAdvice: 'Mention your degree or web development bootcamps. Include links to live GitHub repositories.',
    atsTips: ['Ensure web URLs use standard http:// or https:// formats.'],
    commonMistakes: ['Not linking to live deployed projects.'],
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
    ],
    keySkills: [
      'General Ledger, Accounts Payable (AP), Accounts Receivable (AR)',
      'Financial Auditing, GAAP Compliance, Tax Strategy',
      'SAP ERP, QuickBooks, Microsoft Excel',
    ],
    experienceBullets: [
      'Managed full-cycle monthly financial close for 12 corporate entities with zero reporting discrepancies.',
      'Identified $45,000 in recurring operational cost savings through internal auditing procedures.',
    ],
    educationAdvice: 'Display your B.S. in Accounting or Finance prominently along with CPA credential.',
    atsTips: ['Include specific accounting software names (SAP, NetSuite, QuickBooks) in Skills.'],
    commonMistakes: ['Failing to quantify financial savings.'],
    recommendedTemplateId: 'sidebar-left-classic-navy',
  },
  {
    slug: 'marketing-manager',
    roleTitle: 'Marketing Manager',
    category: 'Marketing',
    metaTitle: 'Marketing Manager Resume Example & Guide | GetEasyCV',
    metaDescription: 'Marketing Manager resume guide with guidance on listing SEO, PPC, email marketing, conversion funnels, and ROI metrics.',
    heroSubtitle: 'Growth-focused resume template tailored for Marketing Leads and Campaign Managers.',
    summaryExamples: [
      'Results-driven Marketing Manager with 6+ years leading digital acquisition strategies, content marketing, and brand positioning.',
    ],
    keySkills: [
      'Digital Marketing, SEO, SEM / Google Ads, Paid Social',
      'HubSpot, Marketo, Google Analytics 4, Mailchimp',
      'Conversion Rate Optimization (CRO), Content Strategy',
    ],
    experienceBullets: [
      'Grew organic traffic by 140% YOY through targeted keyword strategies and technical SEO optimizations.',
      'Managed $500K annual performance marketing budget with a 4.2x ROAS.',
    ],
    educationAdvice: 'B.S. in Marketing, Communications, or Business Administration.',
    atsTips: ['Spell out acronyms like Return on Ad Spend (ROAS) and Conversion Rate Optimization (CRO).'],
    commonMistakes: ['Listing campaign activities without showing ROAS or customer acquisition numbers.'],
    recommendedTemplateId: 'sidebar-left-modern-teal',
  },
  {
    slug: 'nursing',
    roleTitle: 'Registered Nurse (RN)',
    category: 'Healthcare',
    metaTitle: 'Registered Nurse (RN) Resume Example & Writing Guide | GetEasyCV',
    metaDescription: 'Healthcare recruiter-backed Registered Nurse (RN) resume sample. Learn how to list clinical rotations, certifications, and patient care achievements.',
    heroSubtitle: 'Clinical resume format tailored for BSN, RN, and Healthcare professionals.',
    summaryExamples: [
      'Compassionate Registered Nurse (RN) with 5+ years of clinical experience in high-volume emergency and acute care settings.',
    ],
    keySkills: [
      'Acute Patient Care, Triage, Emergency Response',
      'Electronic Health Records (Epic, Cerner)',
      'Medication Administration, IV Therapy',
    ],
    experienceBullets: [
      'Delivered high-quality direct patient care in a 28-bed ICU unit with a 1:2 nurse-to-patient ratio.',
      'Achieved a 98% patient satisfaction score over 4 consecutive quarters.',
    ],
    educationAdvice: 'List BSN/ADN degree along with state nursing license number (e.g. RN License #123456) and BLS/ACLS.',
    atsTips: ['Spell out credentials clearly (e.g. Registered Nurse (RN)).'],
    commonMistakes: ['Omitting clinical certifications or license details.'],
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
      'PMP-certified Senior Project Manager with 7+ years leading cross-functional engineering, product, and operations teams.',
    ],
    keySkills: [
      'Agile / Scrum Methodology, Waterfall, Kanban',
      'Jira, Confluence, Asana, MS Project',
      'Risk Assessment, Budgeting & Resource Allocation',
    ],
    experienceBullets: [
      'Directed cross-functional project team of 18 engineers to deliver $2M enterprise software platform on schedule.',
      'Reduced project scope creep by 30% through strict milestone tracking.',
    ],
    educationAdvice: 'Highlight PMP, CSM, or Agile certifications clearly alongside your degree.',
    atsTips: ['Include keywords like Risk Assessment, Scope Management, Stakeholder Engagement.'],
    commonMistakes: ['Listing tasks instead of measurable project outcomes.'],
    recommendedTemplateId: 'header-modern-emerald',
  },
  {
    slug: 'teacher',
    roleTitle: 'Teacher & Educator',
    category: 'Education',
    metaTitle: 'Teacher & Educator Resume Example & Writing Guide | GetEasyCV',
    metaDescription: 'Teacher resume example. Learn how to highlight curriculum development, classroom management, student assessment, and teaching credentials.',
    heroSubtitle: 'Clear resume template for Elementary, High School, and Special Education Teachers.',
    summaryExamples: [
      'Dedicated Licensed High School Teacher with 5+ years of experience delivering STEM curriculum and fostering inclusive learning environments.',
    ],
    keySkills: [
      'Curriculum Development, Lesson Planning, Differentiated Instruction',
      'Classroom Management, Student Assessment, Educational Tech (Google Classroom)',
    ],
    experienceBullets: [
      'Developed interactive STEM curriculum for 120+ students, improving annual state test pass rates by 18%.',
    ],
    educationAdvice: 'Display State Teaching License / Certification prominently along with B.A. or M.Ed.',
    atsTips: ['Include teaching license number and state board certification details.'],
    commonMistakes: ['Failing to state target grade levels or subject certifications.'],
    recommendedTemplateId: 'sidebar-left-minimal-gray',
  },
  {
    slug: 'graphic-designer',
    roleTitle: 'Graphic Designer',
    category: 'Creative & Design',
    metaTitle: 'Graphic Designer Resume Example & Writing Guide | GetEasyCV',
    metaDescription: 'Graphic Designer resume sample. Learn how to list Adobe Creative Cloud skills, brand identity projects, and portfolio links.',
    heroSubtitle: 'Visually balanced resume format for Graphic Designers, Visual Artists, and Brand Designers.',
    summaryExamples: [
      'Creative Graphic Designer with 5+ years specializing in brand identity, print media, digital illustration, and UI assets.',
    ],
    keySkills: [
      'Adobe Photoshop, Illustrator, InDesign, Figma',
      'Typography, Brand Identity, Layout Design, Motion Graphics',
    ],
    experienceBullets: [
      'Created rebranded visual identity guidelines adopted across 50+ corporate product marketing channels.',
    ],
    educationAdvice: 'B.F.A. in Graphic Design, Visual Communication, or Digital Arts.',
    atsTips: ['Ensure text is parseable plain text rather than embedded image text.'],
    commonMistakes: ['Forgetting to put your online portfolio link at the top of your resume.'],
    recommendedTemplateId: 'sidebar-left-minimal-gray',
  },
  {
    slug: 'student-fresher',
    roleTitle: 'Student & Entry-Level (Fresher)',
    category: 'Entry Level',
    metaTitle: 'Student & Entry-Level Resume Example & Writing Guide | GetEasyCV',
    metaDescription: 'Entry-level resume guide for recent graduates and students. Learn how to write a summary, highlight academic projects, and overcome lack of experience.',
    heroSubtitle: 'Entry-level resume template designed to turn academic projects and coursework into valuable qualifications.',
    summaryExamples: [
      'Motivated Computer Science graduate with strong foundational skills in Java, Python, and SQL. Eager to contribute as a Junior Engineer.',
    ],
    keySkills: [
      'Problem Solving, Data Structures, Basic Programming',
      'Team Collaboration, Time Management, Adaptability',
    ],
    experienceBullets: [
      'Completed Senior Capstone Project: Designed full-stack e-commerce web app using React and Node.js.',
    ],
    educationAdvice: 'Place Education section near top of resume. List GPA (if 3.5+), coursework, and honors.',
    atsTips: ['Highlight technical skills learned during lab work or capstone projects.'],
    commonMistakes: ['Leaving out personal or capstone projects.'],
    recommendedTemplateId: 'sidebar-left-minimal-gray',
  },
];
