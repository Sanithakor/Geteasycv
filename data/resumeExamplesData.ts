export interface FullResumeData {
  contact: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  summary: string;
  skillsGrouped: {
    category: string;
    skills: string[];
  }[];
  workExperience: {
    role: string;
    company: string;
    location: string;
    period: string;
    bullets: string[];
  }[];
  education: {
    degree: string;
    school: string;
    location: string;
    year: string;
    details?: string[];
  }[];
  certifications?: {
    name: string;
    issuer: string;
    year: string;
    credentialId?: string;
  }[];
  projects?: {
    title: string;
    subtitle: string;
    description: string;
    technologies?: string[];
    impact: string;
  }[];
  awards?: {
    title: string;
    issuer: string;
    year: string;
    description: string;
  }[];
  languages?: {
    language: string;
    proficiency: string;
  }[];
}

export interface ResumeExample {
  slug: string;
  roleTitle: string;
  category: string;
  experienceLevel: string;
  avgSalaryRange: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  fullResumeData: FullResumeData;
  summaryExamples: {
    level: string;
    text: string;
  }[];
  keySkillsCategorized: {
    categoryName: string;
    skills: string[];
  }[];
  keySkills: string[];
  experienceBullets: string[];
  educationAdvice: string;
  actionVerbs: string[];
  atsKeywords: string[];
  atsTips: string[];
  commonMistakes: {
    mistake: string;
    fix: string;
  }[];
  roleSpecificFaqs: {
    question: string;
    answer: string;
  }[];
  recommendedTemplateId: string;
}

export const RESUME_EXAMPLES: ResumeExample[] = [
  {
    slug: 'software-engineer',
    roleTitle: 'Software Engineer',
    category: 'Technology',
    experienceLevel: 'Mid to Senior (3–8 Years)',
    avgSalaryRange: '$115,000 – $175,000 / year',
    metaTitle: 'Software Engineer Resume Example & 2026 ATS Writing Guide | GetEasyCV',
    metaDescription: 'Recruiter-approved Software Engineer resume example. Master system design bullets, tech stack matrices, cloud architecture phrasing, and ATS optimization.',
    heroSubtitle: 'Complete resume example for Full-Stack, Backend, and Distributed Systems Engineers.',
    fullResumeData: {
      contact: {
        fullName: 'Alexander Vance',
        title: 'Senior Full-Stack Software Engineer',
        email: 'alex.vance.dev@example.com',
        phone: '+1 (415) 555-0194',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/alexandervance-dev',
        github: 'github.com/alexvance-code',
        portfolio: 'alexvance.io',
      },
      summary: 'Results-driven Senior Software Engineer with 6+ years of experience designing and scaling fault-tolerant microservices, high-throughput REST/GraphQL APIs, and modern React/TypeScript frontends. Architected distributed cloud infrastructure on AWS handling 25M+ daily requests with 99.99% uptime. Track record of mentoring junior engineers, accelerating CI/CD deployment frequency by 40%, and driving technical excellence across cross-functional product squads.',
      skillsGrouped: [
        { category: 'Languages & Core', skills: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'Go', 'Java', 'SQL (PostgreSQL)', 'GraphQL'] },
        { category: 'Frontend Ecosystem', skills: ['React', 'Next.js (App Router)', 'Redux Toolkit', 'Tailwind CSS', 'WebSockets', 'HTML5/CSS3'] },
        { category: 'Backend & Architecture', skills: ['Node.js', 'Express', 'FastAPI', 'Microservices', 'Distributed Systems', 'Redis Caching', 'Kafka'] },
        { category: 'Cloud, DevOps & Tooling', skills: ['AWS (ECS, Lambda, S3, RDS)', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Datadog'] },
      ],
      workExperience: [
        {
          role: 'Senior Software Engineer',
          company: 'Nexus Cloud Technologies',
          location: 'San Francisco, CA',
          period: '2022 – Present',
          bullets: [
            'Architected and deployed a multi-tenant payment processing microservice handling $42M+ in annual transactional volume, reducing checkout latency by 38% through Redis caching.',
            'Led migration of monolithic Rails application into event-driven Go and Node.js microservices with Apache Kafka, increasing system throughput from 4,000 to 18,000 RPS.',
            'Built real-time analytics dashboard in Next.js 14, React Server Components, and Tailwind CSS, supporting 120,000 daily active users with sub-second page transitions.',
            'Mentored 5 junior and mid-level engineers, instituted automated unit/e2e testing via Jest & Playwright, raising code coverage from 64% to 91%.',
          ],
        },
        {
          role: 'Software Engineer',
          company: 'Aura Data Systems',
          location: 'San Jose, CA',
          period: '2019 – 2022',
          bullets: [
            'Engineered RESTful APIs in Python (FastAPI) and PostgreSQL, serving data synchronization across iOS, Android, and Web platforms.',
            'Optimized complex SQL queries and database indexes on a 1.4TB PostgreSQL cluster, decreasing p95 query execution time from 1.2s to 180ms.',
            'Integrated AWS Cognito authentication and role-based access control (RBAC) across 8 enterprise client portals with zero reported security vulnerabilities.',
            'Implemented GitHub Actions CI/CD pipelines that reduced average release deployment time from 45 minutes to 7 minutes.',
          ],
        },
      ],
      education: [
        {
          degree: 'Bachelor of Science in Computer Science',
          school: 'University of California, Berkeley',
          location: 'Berkeley, CA',
          year: '2015 – 2019',
          details: ['Dean’s Honor List (Top 5%)', 'Relevant Coursework: Distributed Systems, Operating Systems, Database Internals, Algorithms'],
        },
      ],
      certifications: [
        { name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', year: '2023', credentialId: 'AWS-SAA-84920' },
        { name: 'Certified Kubernetes Application Developer (CKAD)', issuer: 'Cloud Native Computing Foundation', year: '2022' },
      ],
      projects: [
        {
          title: 'Distributed Task Queue (Open Source)',
          subtitle: 'Go / Redis / Docker',
          description: 'Built a lightweight, fault-tolerant background worker queue with exponential backoff retries and concurrency control.',
          technologies: ['Go', 'Redis', 'Docker', 'Prometheus'],
          impact: 'Gained 1,800+ GitHub stars; adopted by 3 production startups for asynchronous email and image pipelines.',
        },
      ],
      awards: [
        { title: 'Nexus Hackathon Grand Prize Winner', issuer: 'Nexus Technologies', year: '2023', description: 'Built an AI-assisted automated code review bot using LLMs and AST parsing.' },
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'Spanish', proficiency: 'Professional Working' },
      ],
    },
    summaryExamples: [
      {
        level: 'Senior Software Engineer (6+ Years)',
        text: 'Senior Full-Stack Engineer with 6+ years of expertise architecting high-throughput distributed microservices, scalable React/TypeScript web apps, and resilient cloud architectures on AWS. Proven leader in driving 99.99% SLA uptime, reducing p95 latency by 38%, and mentoring high-performing engineering squads.',
      },
      {
        level: 'Mid-Level Software Engineer (3–5 Years)',
        text: 'Software Engineer with 4 years of experience building scalable backend APIs in Node.js and Go, paired with responsive Next.js frontends. Adept at database tuning, CI/CD pipeline automation, and collaborating across Agile cross-functional teams to deliver secure, customer-facing web solutions.',
      },
      {
        level: 'Junior / Entry-Level Software Engineer',
        text: 'Computer Science graduate with rigorous foundation in algorithms, data structures, and full-stack development using TypeScript, Python, and React. Built full-stack applications with PostgreSQL and Docker. Seeking to contribute strong problem-solving skills to a fast-paced software engineering team.',
      },
    ],
    keySkillsCategorized: [
      { categoryName: 'Core Languages', skills: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'Go', 'SQL', 'GraphQL', 'Java'] },
      { categoryName: 'Frontend Frameworks', skills: ['React', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'HTML5 / Modern CSS', 'WebSockets'] },
      { categoryName: 'Backend & Databases', skills: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'Kafka'] },
      { categoryName: 'Cloud & Infrastructure', skills: ['AWS (ECS, Lambda, RDS, S3)', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD Pipelines', 'Linux'] },
    ],
    keySkills: [
      'TypeScript, JavaScript (ES6+), Python, Go, SQL',
      'React.js, Next.js (App Router), Tailwind CSS, Redux',
      'Node.js, Express, FastAPI, Microservices Architecture',
      'PostgreSQL, Redis Caching, Kafka, MongoDB',
      'AWS (ECS, RDS, S3, Lambda), Docker, Kubernetes, Terraform',
      'REST & GraphQL APIs, CI/CD (GitHub Actions), Unit & E2E Testing',
    ],
    experienceBullets: [
      'Architected payment microservices processing $42M+ annually with 99.99% uptime, reducing transaction latency by 38%.',
      'Migrated legacy monolithic application to event-driven Go/Kafka microservices, increasing throughput from 4,000 to 18,000 RPS.',
      'Refactored frontend bundle size in Next.js by 45%, improving Core Web Vitals and Lighthouse Performance scores from 68 to 96.',
      'Tuned high-traffic PostgreSQL queries and connection pooling, reducing p95 database response time from 1.2s to 180ms.',
      'Automated deployment pipelines with GitHub Actions and Terraform, shrinking weekly release cycles from 4 hours to 8 minutes.',
      'Authored 250+ unit and integration tests with Jest and Supertest, expanding overall codebase test coverage to 91%.',
    ],
    educationAdvice: 'Position your Degree and University clearly. For mid/senior roles, place Education below Work Experience. Highlight CS degrees, GPA if 3.5+, and relevant academic honors.',
    actionVerbs: ['Architected', 'Engineered', 'Scaled', 'Refactored', 'Deployed', 'Optimized', 'Automated', 'Migrated', 'Mentored', 'Configured'],
    atsKeywords: [
      'TypeScript', 'Microservices', 'Distributed Systems', 'React', 'Node.js', 'AWS', 'Docker',
      'Kubernetes', 'PostgreSQL', 'RESTful API', 'GraphQL', 'CI/CD', 'System Design', 'Redis', 'Kafka',
    ],
    atsTips: [
      'Match technical acronyms with their expanded forms at least once (e.g., "Continuous Integration / Continuous Deployment (CI/CD)").',
      'Always group languages, frameworks, databases, and DevOps tools into clean categorized skill blocks.',
      'Quantify results using metrics: throughput (RPS), response times (ms), uptime (%), cost savings ($), and user counts.',
    ],
    commonMistakes: [
      {
        mistake: 'Listing languages or tools without mentioning where or how you used them in your experience bullets.',
        fix: 'Explicitly mention your tech stack in every bullet (e.g., "Built microservices in Go and Docker to process 5,000 events/sec").',
      },
      {
        mistake: 'Focusing solely on routine tasks instead of engineering impact and business outcomes.',
        fix: 'Use Google’s XYZ framework: Accomplished [X], as measured by [Y], by doing [Z].',
      },
    ],
    roleSpecificFaqs: [
      {
        question: 'Should I include personal coding projects on a Software Engineer resume?',
        answer: 'Yes, especially if you have under 5 years of experience or if the open-source project has active stars, real users, or demonstrates a tech stack not used at your primary job.',
      },
      {
        question: 'How should I list technical skills to pass ATS screeners?',
        answer: 'Group skills by category (Languages, Frontend, Backend, Databases, Cloud & DevOps). Avoid graphical rating bars or percentage meters which ATS parsers cannot read.',
      },
    ],
    recommendedTemplateId: 'sidebar-left-minimal-gray',
  },
  {
    slug: 'frontend-developer',
    roleTitle: 'Frontend Developer',
    category: 'Technology',
    experienceLevel: 'Mid Level (2–6 Years)',
    avgSalaryRange: '$95,000 – $150,000 / year',
    metaTitle: 'Frontend Developer Resume Example & UI/UX Engineering Guide | GetEasyCV',
    metaDescription: 'Complete Frontend Developer resume example. Learn how to highlight React, Next.js, Core Web Vitals, state management, and modern responsive UI engineering.',
    heroSubtitle: 'Proven resume example for React, Next.js, Vue, and UI/UX Engineers.',
    fullResumeData: {
      contact: {
        fullName: 'Maya Lin',
        title: 'Senior Frontend Engineer',
        email: 'maya.lin.frontend@example.com',
        phone: '+1 (206) 555-0143',
        location: 'Seattle, WA',
        linkedin: 'linkedin.com/in/mayalin-ui',
        github: 'github.com/mayalin-dev',
        portfolio: 'mayalin.design',
      },
      summary: 'Frontend Engineer with 5+ years of experience building accessible, high-performance web applications using React, Next.js, TypeScript, and Tailwind CSS. Specialized in design systems, performance optimization, and Core Web Vitals. Successfully reduced First Contentful Paint (FCP) by 54% across an enterprise SaaS platform serving 400,000 active monthly users.',
      skillsGrouped: [
        { category: 'Frontend Core', skills: ['React (Hooks, Suspense)', 'Next.js (SSR/SSG/RSC)', 'TypeScript', 'JavaScript (ES2024)', 'HTML5 & Semantic Markup'] },
        { category: 'Styling & UI Systems', skills: ['Tailwind CSS', 'CSS Modules', 'Styled Components', 'Figma to Code', 'Storybook', 'WCAG 2.1 AA Accessibility'] },
        { category: 'State & Data Fetching', skills: ['TanStack Query (React Query)', 'Zustand', 'Redux Toolkit', 'GraphQL / Apollo', 'REST APIs', 'WebSockets'] },
        { category: 'Testing & Build Tools', skills: ['Jest', 'React Testing Library', 'Playwright', 'Vite', 'Webpack', 'npm/pnpm workspaces'] },
      ],
      workExperience: [
        {
          role: 'Senior Frontend Developer',
          company: 'Loomis Interactive',
          location: 'Seattle, WA',
          period: '2022 – Present',
          bullets: [
            'Led frontend architecture of high-traffic consumer web platform in Next.js 14 and TypeScript, boosting conversion rate by 24%.',
            'Created company-wide atomic design system with Storybook and Tailwind CSS, standardizing 45+ reusable components and cutting feature delivery time by 35%.',
            'Achieved perfect 100/100 Lighthouse Performance and Accessibility scores by eliminating layout shifts and implementing responsive image pre-fetching.',
            'Collaborated closely with Product and UX teams to build interactive data visualization widgets using D3.js and Chart.js.',
          ],
        },
        {
          role: 'Frontend Web Developer',
          company: 'PixelCraft Digital',
          location: 'Portland, OR',
          period: '2019 – 2022',
          bullets: [
            'Developed 20+ responsive web applications for Fortune 500 clients utilizing React, Redux, and modern CSS/SASS.',
            'Integrated client-side state caching using React Query, decreasing redundant API network requests by 48%.',
            'Implemented comprehensive end-to-end testing suite with Playwright, catching 95%+ of UI regressions prior to production releases.',
          ],
        },
      ],
      education: [
        {
          degree: 'Bachelor of Science in Human-Computer Interaction & Software Engineering',
          school: 'University of Washington',
          location: 'Seattle, WA',
          year: '2015 – 2019',
        },
      ],
      certifications: [
        { name: 'Meta Front-End Developer Professional Certificate', issuer: 'Meta', year: '2022' },
      ],
      projects: [
        {
          title: 'DesignTokens.dev (Open Source)',
          subtitle: 'Figma Token Exporter & CSS Generator',
          description: 'Created a developer tool that automatically converts Figma variable tokens into Tailwind config and CSS variables.',
          technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Figma API'],
          impact: 'Used by 2,500+ design engineers globally.',
        },
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'Mandarin', proficiency: 'Bilingual' },
      ],
    },
    summaryExamples: [
      {
        level: 'Senior Frontend Engineer',
        text: 'Frontend Engineer with 5+ years building accessible, high-performance web applications with React, Next.js, and TypeScript. Expert in design systems, state architecture, and Core Web Vitals optimization with a track record of driving 24% conversion gains.',
      },
      {
        level: 'Mid-Level Frontend Developer',
        text: 'Detail-oriented Frontend Developer with 3 years of hands-on experience crafting responsive, cross-browser web interfaces with React, Tailwind CSS, and REST/GraphQL APIs. Passionate about pixel-perfect Figma translations and web accessibility (WCAG AA).',
      },
    ],
    keySkillsCategorized: [
      { categoryName: 'Core Frameworks', skills: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5/Semantic Web'] },
      { categoryName: 'Styling & Design', skills: ['Tailwind CSS', 'Storybook', 'Figma-to-Code', 'Responsive UI', 'WCAG 2.1 AA'] },
      { categoryName: 'State & Network', skills: ['TanStack Query', 'Zustand', 'Redux Toolkit', 'GraphQL', 'REST APIs'] },
      { categoryName: 'Testing & Tools', skills: ['Jest', 'React Testing Library', 'Playwright', 'Vite', 'Git', 'Webpack'] },
    ],
    keySkills: [
      'React.js, Next.js (App Router), TypeScript, JavaScript (ES6+)',
      'Tailwind CSS, Storybook, Design Systems, Responsive Design',
      'TanStack Query, Zustand, Redux Toolkit, REST APIs, GraphQL',
      'Web Performance (Core Web Vitals, LCP, CLS, FID), WCAG Accessibility',
      'Jest, React Testing Library, Playwright, Vite, Git',
    ],
    experienceBullets: [
      'Engineered enterprise SaaS web app in Next.js 14 and TypeScript, reducing First Contentful Paint from 2.8s to 0.9s.',
      'Built and maintained unified design system in Storybook with 45+ components, accelerating cross-team development velocity by 35%.',
      'Implemented optimistic UI updates and state management using TanStack Query, cutting perceived user latency by 60%.',
      'Refactored responsive viewport layouts for mobile and desktop, achieving 100% WCAG 2.1 AA accessibility compliance.',
    ],
    educationAdvice: 'Detail your computer science or human-computer interaction degree. Emphasize portfolio links and live web demos in your contact header.',
    actionVerbs: ['Engineered', 'Spearheaded', 'Optimized', 'Implemented', 'Standardized', 'Designed', 'Refactored', 'Enhanced'],
    atsKeywords: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Storybook', 'JavaScript', 'HTML5', 'CSS3', 'Core Web Vitals', 'Accessibility', 'Redux', 'Jest'],
    atsTips: [
      'Showcase concrete speed and Core Web Vitals metrics (LCP, FID, CLS, bundle reduction percentage).',
      'Highlight testing frameworks like Jest, React Testing Library, and Cypress/Playwright.',
    ],
    commonMistakes: [
      {
        mistake: 'Listing basic HTML/CSS without emphasizing modern frontend toolchains (TypeScript, component libraries, bundlers).',
        fix: 'Highlight modern architectural patterns like Server Components, custom React hooks, and design token integration.',
      },
    ],
    roleSpecificFaqs: [
      {
        question: 'Should I link my portfolio and GitHub on a Frontend resume?',
        answer: 'Absolutely. Hiring managers review live demos and code cleanliness as primary signals of frontend craftsmanship.',
      },
    ],
    recommendedTemplateId: 'sidebar-left-minimal-gray',
  },
  {
    slug: 'backend-developer',
    roleTitle: 'Backend Developer',
    category: 'Technology',
    experienceLevel: 'Mid to Senior (3–7 Years)',
    avgSalaryRange: '$110,000 – $165,000 / year',
    metaTitle: 'Backend Developer Resume Example & Architecture Guide | GetEasyCV',
    metaDescription: 'Backend Developer resume example. Showcase API design, database optimization, message queues, cloud deployments, and scalable server architecture.',
    heroSubtitle: 'Complete resume example for Node.js, Python, Go, and Java Backend Engineers.',
    fullResumeData: {
      contact: {
        fullName: 'Marcus Thorne',
        title: 'Senior Backend Engineer',
        email: 'marcus.thorne.dev@example.com',
        phone: '+1 (512) 555-0188',
        location: 'Austin, TX',
        linkedin: 'linkedin.com/in/marcusthorne-backend',
        github: 'github.com/mthorne-dev',
      },
      summary: 'Backend Engineer with 6+ years of specialization in high-concurrency server architectures, distributed data pipelines, and relational/NoSQL database management. Engineered cloud-native microservices processing 45M+ daily API events with sub-50ms latency. Proficient in Go, Python, Node.js, PostgreSQL, Kafka, and Kubernetes.',
      skillsGrouped: [
        { category: 'Languages', skills: ['Go (Golang)', 'Python', 'Node.js / TypeScript', 'Java', 'SQL', 'Bash Scripting'] },
        { category: 'Databases & Caching', skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'DynamoDB', 'Elasticsearch'] },
        { category: 'Architecture & Streaming', skills: ['Microservices', 'RESTful APIs', 'gRPC & Protocol Buffers', 'Apache Kafka', 'RabbitMQ'] },
        { category: 'Infrastructure & DevOps', skills: ['Docker', 'Kubernetes (K8s)', 'AWS (ECS, EKS, RDS, SQS)', 'Terraform', 'Prometheus', 'Grafana'] },
      ],
      workExperience: [
        {
          role: 'Lead Backend Developer',
          company: 'FinVantage Solutions',
          location: 'Austin, TX',
          period: '2021 – Present',
          bullets: [
            'Architected distributed ledger and financial auditing engine in Go and PostgreSQL handling $180M+ in quarterly reconciliation.',
            'Transitioned legacy monolithic backend into 12 containerized gRPC microservices deployed on AWS EKS, reducing cloud computing overhead by $34,000/month.',
            'Engineered real-time notification service utilizing Apache Kafka and Redis cluster, delivering 10M+ daily events with 99.995% reliability.',
            'Instituted database partitioning and index tuning strategies on multi-terabyte PostgreSQL tables, decreasing slow queries by 72%.',
          ],
        },
        {
          role: 'Backend Software Engineer',
          company: 'Stratos Data Labs',
          location: 'Dallas, TX',
          period: '2018 – 2021',
          bullets: [
            'Constructed RESTful and GraphQL APIs using Python (FastAPI, Django) and Celery workers for asynchronous data transformations.',
            'Integrated OAuth2, JWT authentication, and rate-limiting middleware, safeguarding endpoints against DDoS and credential stuffing.',
            'Authored automated deployment manifests in Terraform and Docker Compose, reducing environment setup time from 2 days to 15 minutes.',
          ],
        },
      ],
      education: [
        {
          degree: 'Bachelor of Science in Computer Engineering',
          school: 'University of Texas at Austin',
          location: 'Austin, TX',
          year: '2014 – 2018',
        },
      ],
      certifications: [
        { name: 'AWS Certified Solutions Architect – Professional', issuer: 'Amazon Web Services', year: '2023' },
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
      ],
    },
    summaryExamples: [
      {
        level: 'Senior Backend Engineer',
        text: 'Senior Backend Engineer with 6+ years designing high-throughput microservices, event-driven pipelines, and relational database systems in Go, Python, and PostgreSQL. Proven track record of cutting API latency by 50% and orchestrating Kubernetes clusters at scale.',
      },
      {
        level: 'Mid-Level Backend Developer',
        text: 'Backend Developer with 4 years of experience building scalable REST/gRPC APIs using Node.js and Python. Skilled in SQL query optimization, Redis caching layers, Docker containerization, and AWS cloud deployments.',
      },
    ],
    keySkillsCategorized: [
      { categoryName: 'Languages', skills: ['Go (Golang)', 'Python', 'Node.js', 'Java', 'SQL', 'TypeScript'] },
      { categoryName: 'Databases & Storage', skills: ['PostgreSQL', 'Redis', 'MongoDB', 'Elasticsearch', 'DynamoDB'] },
      { categoryName: 'Architecture & Queues', skills: ['gRPC', 'REST APIs', 'Apache Kafka', 'RabbitMQ', 'Microservices'] },
      { categoryName: 'Cloud & DevOps', skills: ['Docker', 'Kubernetes', 'AWS (EKS, RDS, SQS)', 'Terraform', 'CI/CD'] },
    ],
    keySkills: [
      'Go, Python (FastAPI, Django), Node.js, SQL, TypeScript',
      'PostgreSQL, Redis, MongoDB, Elasticsearch, Database Indexing & Sharding',
      'Microservices Architecture, RESTful APIs, gRPC, Apache Kafka, RabbitMQ',
      'Docker, Kubernetes, AWS (EKS, RDS, Lambda, SQS), Terraform',
      'Unit/Integration Testing, Performance Profiling, System Monitoring (Grafana)',
    ],
    experienceBullets: [
      'Architected event-driven streaming pipeline in Kafka and Go processing 45M+ messages daily with sub-50ms latency.',
      'Refactored legacy monolith into 12 microservices on AWS EKS, slashing server infrastructure costs by $34,000 per month.',
      'Optimized PostgreSQL query plans and connection pooling, resolving bottlenecks and decreasing p99 response time by 68%.',
      'Implemented gRPC communication between internal services, increasing payload serialization speed by 4.2x compared to REST.',
    ],
    educationAdvice: 'Highlight Computer Science or Software Engineering degrees, database coursework, and systems programming specializations.',
    actionVerbs: ['Architected', 'Engineered', 'Refactored', 'Optimized', 'Scaled', 'Containerized', 'Streamlined', 'Provisioned'],
    atsKeywords: ['Go', 'Python', 'Microservices', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'AWS', 'gRPC', 'API Design', 'Database Tuning'],
    atsTips: [
      'Include quantifiable metrics regarding concurrency, data volume (GB/TB), transactions per second, and latency reduction.',
      'List specific database engines and message queue technologies prominently.',
    ],
    commonMistakes: [
      {
        mistake: 'Failing to mention scalability numbers or infrastructure details.',
        fix: 'Include specific numbers: requests per second, database table sizes, cache hit ratios, and cost savings.',
      },
    ],
    roleSpecificFaqs: [
      {
        question: 'Should a backend developer list frontend skills on their resume?',
        answer: 'You can include basic frontend skills (React, TypeScript) in a secondary skill line, but keep 85%+ of your resume focused on backend architecture, databases, and infrastructure.',
      },
    ],
    recommendedTemplateId: 'sidebar-left-minimal-gray',
  },
  {
    slug: 'data-analyst',
    roleTitle: 'Data Analyst',
    category: 'Data & Analytics',
    experienceLevel: 'Mid Level (2–6 Years)',
    avgSalaryRange: '$80,000 – $125,000 / year',
    metaTitle: 'Data Analyst Resume Example & Analytics Writing Guide | GetEasyCV',
    metaDescription: 'Data Analyst resume example. Learn how to highlight SQL, Python, Tableau, Power BI, business intelligence dashboards, and revenue-driving data insights.',
    heroSubtitle: 'Recruiter-approved resume model for Business Intelligence, Product, and Financial Data Analysts.',
    fullResumeData: {
      contact: {
        fullName: 'Elena Rostova',
        title: 'Senior Data & BI Analyst',
        email: 'elena.rostova.data@example.com',
        phone: '+1 (312) 555-0174',
        location: 'Chicago, IL',
        linkedin: 'linkedin.com/in/elenarostova-data',
        github: 'github.com/elena-analytics',
      },
      summary: 'Data Analyst with 5+ years of experience transforming complex multi-source datasets into actionable business intelligence, executive dashboards, and predictive models. Expert in advanced SQL (window functions, CTEs), Python (pandas, scikit-learn), Tableau, and Power BI. Identified $3.2M in annual cost-saving opportunities through churn modeling and supply chain analytics.',
      skillsGrouped: [
        { category: 'Data Querying & Languages', skills: ['SQL (PostgreSQL, Snowflake, BigQuery)', 'Python (Pandas, NumPy)', 'R', 'DAX', 'Bash'] },
        { category: 'BI & Visualization', skills: ['Tableau Server/Desktop', 'Power BI', 'Looker', 'Metabase', 'Excel (VBA, PowerQuery)'] },
        { category: 'Data Modeling & Warehouses', skills: ['Snowflake', 'Amazon Redshift', 'dbt (data build tool)', 'ETL/ELT Pipelines', 'Star Schema'] },
        { category: 'Statistical & ML Analysis', skills: ['A/B Testing & Hypothesis Testing', 'Regression Analysis', 'Customer Segmentation (RFM)', 'Cohort Analysis'] },
      ],
      workExperience: [
        {
          role: 'Senior Business Intelligence Analyst',
          company: 'Vertex Retail Group',
          location: 'Chicago, IL',
          period: '2022 – Present',
          bullets: [
            'Built 15+ automated Tableau and Power BI executive dashboards connecting Snowflake and Salesforce, saving 22 hours of weekly manual reporting.',
            'Constructed predictive customer churn model using Python and logistic regression, empowering retention teams to lower annual churn by 3.8% (saving $1.4M ARR).',
            'Designed dbt data transformations and dimensional data models for 80M+ historical transaction records, ensuring 100% data integrity.',
            'Collaborated with VP of Growth to evaluate 35+ product A/B tests, generating statistically validated insights that improved checkout conversion by 12%.',
          ],
        },
        {
          role: 'Data Analyst',
          company: 'ClearStream Financial',
          location: 'Milwaukee, WI',
          period: '2019 – 2022',
          bullets: [
            'Extracted and cleansed financial records across 6 disparate SQL databases, preparing regular monthly variance and P&L reports.',
            'Automated daily data ingestion pipelines with Python scripts and cron jobs, reducing report preparation lag from 8 hours to 10 minutes.',
            'Trained 45 non-technical business users on self-service Tableau reporting, decreasing ad-hoc SQL ticket requests by 50%.',
          ],
        },
      ],
      education: [
        {
          degree: 'Bachelor of Science in Statistics & Data Science',
          school: 'University of Illinois Urbana-Champaign',
          location: 'Champaign, IL',
          year: '2015 – 2019',
          details: ['Minor in Economics', 'GPA: 3.82/4.0'],
        },
      ],
      certifications: [
        { name: 'Tableau Certified Data Analyst', issuer: 'Tableau', year: '2023' },
        { name: 'Snowflake SnowPro Core Certification', issuer: 'Snowflake', year: '2022' },
      ],
      languages: [
        { language: 'English', proficiency: 'Fluent' },
        { language: 'Russian', proficiency: 'Native' },
      ],
    },
    summaryExamples: [
      {
        level: 'Senior Data Analyst (5+ Years)',
        text: 'Senior Data & BI Analyst with 5+ years of experience delivering predictive models, automated ETL transformations, and executive dashboards in Tableau and Power BI. Proven expertise in SQL, Snowflake, and Python, uncovering $3.2M in revenue expansion and cost reduction opportunities.',
      },
      {
        level: 'Junior / Mid-Level Data Analyst',
        text: 'Analytical Data Specialist with 3 years of hands-on experience querying complex relational databases, writing automated data pipelines in Python, and crafting intuitive visualization dashboards. Proficient in A/B testing statistical analysis and stakeholder reporting.',
      },
    ],
    keySkillsCategorized: [
      { categoryName: 'Database & Querying', skills: ['SQL (PostgreSQL, Snowflake, BigQuery)', 'Python (Pandas, NumPy)', 'dbt', 'Data Cleaning'] },
      { categoryName: 'Visualization & BI', skills: ['Tableau', 'Power BI', 'Looker', 'Advanced Excel (VBA, PowerQuery)'] },
      { categoryName: 'Statistical Analysis', skills: ['A/B Testing', 'Hypothesis Testing', 'Regression Modeling', 'Cohort Analysis'] },
      { categoryName: 'Warehouses & ETL', skills: ['Snowflake', 'Amazon Redshift', 'ETL Pipelines', 'Data Warehousing'] },
    ],
    keySkills: [
      'Advanced SQL (Window Functions, CTEs, Joins, Performance Tuning)',
      'Python (Pandas, NumPy, Matplotlib, Scikit-learn), R',
      'Tableau Desktop/Server, Power BI, Looker, Advanced Excel',
      'Snowflake, BigQuery, Redshift, dbt, ETL Pipelines',
      'A/B Testing, Hypothesis Testing, Cohort Analysis, Customer Segmentation',
    ],
    experienceBullets: [
      'Authored optimized SQL queries and dbt models processing 80M+ customer events in Snowflake, reducing query costs by 28%.',
      'Engineered automated Power BI dashboard suite utilized by C-suite executives to monitor $120M in regional revenue streams in real time.',
      'Developed predictive customer lifetime value (LTV) regression model in Python, identifying key upsell triggers and lifting average basket size by 14%.',
      'Designed and analyzed 40+ statistical A/B test experiments, driving a 9.2% increase in user onboarding funnel completion.',
    ],
    educationAdvice: 'Highlight degrees in Statistics, Mathematics, Computer Science, Economics, or Data Analytics. Feature coursework in Statistical Modeling, Econometrics, and Database Systems.',
    actionVerbs: ['Analyzed', 'Constructed', 'Modeled', 'Discovered', 'Automated', 'Visualized', 'Optimized', 'Evaluated', 'Streamlined'],
    atsKeywords: ['SQL', 'Python', 'Tableau', 'Power BI', 'Snowflake', 'dbt', 'BigQuery', 'A/B Testing', 'Data Modeling', 'Business Intelligence', 'ETL', 'Excel'],
    atsTips: [
      'Frame every accomplishment in terms of business impact: hours saved, revenue gained, cost prevented, or decisions influenced.',
      'Highlight both technical skills (SQL, Python) and business intelligence tools (Tableau, Looker, Power BI).',
    ],
    commonMistakes: [
      {
        mistake: 'Listing data tools without explaining the analytical insights or business decisions they enabled.',
        fix: 'State what action the business took because of your analysis (e.g., "Led churn analysis that retained $1.4M in recurring revenue").',
      },
    ],
    roleSpecificFaqs: [
      {
        question: 'Should a Data Analyst include a portfolio link?',
        answer: 'Yes! Link your Tableau Public profile, GitHub data repository, or personal website demonstrating interactive notebooks and visualizations.',
      },
    ],
    recommendedTemplateId: 'sidebar-left-minimal-gray',
  },
  {
    slug: 'web-developer',
    roleTitle: 'Web Developer',
    category: 'Technology',
    experienceLevel: 'Mid Level (2–6 Years)',
    avgSalaryRange: '$85,000 – $135,000 / year',
    metaTitle: 'Web Developer Resume Example & Modern Full-Stack Guide | GetEasyCV',
    metaDescription: 'Professional Web Developer resume example. Learn how to highlight full-stack web engineering, CMS platforms, SEO performance, and responsive web design.',
    heroSubtitle: 'Complete resume example for Full-Stack, WordPress, and Custom Web Application Developers.',
    fullResumeData: {
      contact: {
        fullName: 'Devon Reed',
        title: 'Full-Stack Web Developer',
        email: 'devon.reed.web@example.com',
        phone: '+1 (415) 555-0162',
        location: 'Denver, CO',
        linkedin: 'linkedin.com/in/devonreed-web',
        portfolio: 'devonreed.dev',
      },
      summary: 'Versatile Web Developer with 5+ years of experience engineering high-converting responsive websites, full-stack web applications, and custom e-commerce solutions. Proficient across modern JavaScript frameworks (React, Next.js, Node.js), WordPress/Headless CMS, and REST APIs. Proven track record of lifting SEO traffic by 65% and boosting conversion rates through mobile-first performance engineering.',
      skillsGrouped: [
        { category: 'Languages & Core', skills: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3 / SASS', 'PHP', 'SQL'] },
        { category: 'Frameworks & CMS', skills: ['React', 'Next.js', 'WordPress (Custom Themes/Plugins)', 'Shopify Liquid', 'Node.js', 'Express'] },
        { category: 'Design & Tooling', skills: ['Tailwind CSS', 'Bootstrap', 'Figma', 'Webpack/Vite', 'Git / GitHub', 'npm'] },
        { category: 'Web Operations & SEO', skills: ['Core Web Vitals Optimization', 'Technical SEO', 'Google Analytics / GTM', 'Vercel / Netlify', 'REST APIs'] },
      ],
      workExperience: [
        {
          role: 'Lead Web Developer',
          company: 'Altitude Digital Agency',
          location: 'Denver, CO',
          period: '2021 – Present',
          bullets: [
            'Built 30+ responsive, custom web applications and e-commerce platforms using Next.js, React, and headless Shopify/WordPress.',
            'Optimized Core Web Vitals across client websites, improving mobile page load speeds by 52% and boosting client organic Google search traffic by 65%.',
            'Developed custom PHP and JavaScript integrations connecting CRM systems (HubSpot, Salesforce) with client web applications.',
            'Managed web hosting, SSL certifications, and automated deployment pipelines across Vercel, AWS, and Cloudflare.',
          ],
        },
        {
          role: 'Junior Web Developer',
          company: 'FrontRange Studios',
          location: 'Boulder, CO',
          period: '2019 – 2021',
          bullets: [
            'Converted 40+ client Figma and Adobe XD wireframes into pixel-perfect, responsive HTML5/CSS3/JavaScript landing pages.',
            'Integrated Stripe, PayPal, and SendGrid APIs for automated checkout workflows and transactional email notifications.',
            'Maintained 99.9% uptime across 50+ client WordPress sites, executing security audits and plugin updates.',
          ],
        },
      ],
      education: [
        {
          degree: 'Bachelor of Science in Web Design & Interactive Media',
          school: 'Colorado State University',
          location: 'Fort Collins, CO',
          year: '2015 – 2019',
        },
      ],
      certifications: [
        { name: 'Certified JavaScript Developer', issuer: 'W3C', year: '2022' },
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
      ],
    },
    summaryExamples: [
      {
        level: 'Mid-Senior Web Developer',
        text: 'Full-Stack Web Developer with 5+ years of experience crafting modern, accessible web applications and custom e-commerce experiences using React, Next.js, Node.js, and WordPress. Adept at technical SEO and responsive design, driving a 65% organic traffic surge.',
      },
      {
        level: 'Junior Web Developer',
        text: 'Passionate Web Developer with strong foundation in JavaScript, HTML5, CSS3/Tailwind, and modern web frameworks. Proven ability to turn complex design mocks into blazing-fast, mobile-first websites with clean semantic code.',
      },
    ],
    keySkillsCategorized: [
      { categoryName: 'Core Languages', skills: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3/SASS', 'PHP', 'SQL'] },
      { categoryName: 'Frameworks & Platforms', skills: ['React', 'Next.js', 'WordPress', 'Shopify', 'Node.js'] },
      { categoryName: 'Styling & Design', skills: ['Tailwind CSS', 'Bootstrap', 'Responsive Web Design', 'Figma'] },
      { categoryName: 'Performance & Tools', skills: ['Technical SEO', 'Core Web Vitals', 'Git', 'Vercel', 'REST APIs'] },
    ],
    keySkills: [
      'JavaScript (ES6+), TypeScript, HTML5, CSS3, SASS, PHP',
      'React, Next.js, Node.js, Express, RESTful APIs',
      'WordPress (Custom Themes & Plugins), Shopify Liquid, Headless CMS',
      'Tailwind CSS, Bootstrap, Figma, Mobile-First Responsive Design',
      'Technical SEO, Core Web Vitals, Google Analytics, Git, Vercel',
    ],
    experienceBullets: [
      'Developed and deployed 30+ client web applications with Next.js and Tailwind CSS, increasing client lead generation by 42%.',
      'Refactored legacy WordPress sites into headless Next.js architectures, slashing page load times from 4.5s to 1.1s.',
      'Constructed custom e-commerce payment checkouts with Stripe and Webhooks, processing over $2.5M in secure transactions.',
      'Implemented automated accessibility and cross-browser testing across Chrome, Safari, Firefox, and Edge.',
    ],
    educationAdvice: 'Highlight web engineering, computer science, or digital media degrees. Include certifications and active portfolio URLs.',
    actionVerbs: ['Developed', 'Constructed', 'Refactored', 'Optimized', 'Integrated', 'Launched', 'Designed', 'Maintained'],
    atsKeywords: ['JavaScript', 'HTML5', 'CSS3', 'React', 'Next.js', 'WordPress', 'Shopify', 'PHP', 'SEO', 'Tailwind CSS', 'Git', 'Responsive Design'],
    atsTips: [
      'Mention conversion rate improvements and SEO rankings alongside technical language names.',
      'Always include active links to your web portfolio and GitHub.',
    ],
    commonMistakes: [
      {
        mistake: 'Failing to mention mobile responsiveness or Core Web Vitals metrics.',
        fix: 'Include metrics showing how your responsive styling improved mobile conversion and user retention.',
      },
    ],
    roleSpecificFaqs: [
      {
        question: 'What is the difference between a Web Developer and a Software Engineer resume?',
        answer: 'Web Developer resumes place heavier emphasis on web platforms, CMSs (WordPress, Shopify), responsive UI styling, and SEO, while Software Engineer resumes prioritize distributed systems and core algorithms.',
      },
    ],
    recommendedTemplateId: 'sidebar-left-minimal-gray',
  },
  {
    slug: 'accountant',
    roleTitle: 'Accountant & Financial Analyst',
    category: 'Finance',
    experienceLevel: 'Mid Level (3–7 Years)',
    avgSalaryRange: '$70,000 – $110,000 / year',
    metaTitle: 'Accountant Resume Example & CPA Career Guide | GetEasyCV',
    metaDescription: 'Accountant resume example. Learn how to highlight GAAP compliance, general ledger reconciliation, tax preparation, audit readiness, and ERP systems.',
    heroSubtitle: 'Recruiter-approved resume model for Staff Accountants, CPAs, and Financial Auditors.',
    fullResumeData: {
      contact: {
        fullName: 'David Sterling, CPA',
        title: 'Senior Corporate Accountant',
        email: 'david.sterling.cpa@example.com',
        phone: '+1 (617) 555-0145',
        location: 'Boston, MA',
        linkedin: 'linkedin.com/in/davidsterling-cpa',
      },
      summary: 'Certified Public Accountant (CPA) with 6+ years of experience overseeing financial statement preparation, GAAP compliance, general ledger reconciliation, and corporate tax strategy for multi-entity corporations. Managed month-end close cycles for $65M business units, reducing close time from 10 days to 4 days through ERP automation in NetSuite and advanced Excel modeling.',
      skillsGrouped: [
        { category: 'Accounting Standards & Compliance', skills: ['US GAAP', 'IFRS Standards', 'SOX Compliance', 'Internal Controls', 'Tax Compliance (Federal & State)'] },
        { category: 'Core Accounting Operations', skills: ['General Ledger (GL)', 'Month-End / Year-End Close', 'Accounts Payable / Receivable (AP/AR)', 'Fixed Assets', 'Bank Reconciliation'] },
        { category: 'ERP & Financial Software', skills: ['Oracle NetSuite', 'SAP ERP', 'QuickBooks Enterprise', 'Sage Intacct', 'BlackLine'] },
        { category: 'Analysis & Reporting', skills: ['Financial Statement Analysis', 'Variance & Budget Modeling', 'Advanced Excel (VLOOKUP, XLOOKUP, Pivot, Macros)', 'Cash Flow Forecasting'] },
      ],
      workExperience: [
        {
          role: 'Senior Corporate Accountant',
          company: 'Beacon Harbor Financial',
          location: 'Boston, MA',
          period: '2021 – Present',
          bullets: [
            'Led month-end and year-end close processes for 4 corporate subsidiaries generating $65M annual revenue, cutting close cycle from 10 to 4 business days.',
            'Conducted monthly balance sheet reconciliations, variance analysis, and cash flow forecasting, identifying $420,000 in operational tax credits.',
            'Supervised external Big 4 audit readiness and SOX 404 compliance testing with 0 material weaknesses identified across 3 consecutive audit cycles.',
            'Trained and mentored 3 junior staff accountants on NetSuite automation, AP/AR workflows, and journal entry auditing.',
          ],
        },
        {
          role: 'Staff Accountant',
          company: 'Kensington & Associates LLC',
          location: 'Cambridge, MA',
          period: '2018 – 2021',
          bullets: [
            'Prepared multi-state corporate tax returns, payroll tax reconciliations, and quarterly financial statements under US GAAP.',
            'Processed over 600 monthly accounts payable and receivable invoices with a 99.8% on-time reconciliation rate.',
            'Implemented automated bank feeds in QuickBooks Enterprise, reducing manual data entry hours by 15 hours weekly.',
          ],
        },
      ],
      education: [
        {
          degree: 'Master of Science in Accounting (MSA)',
          school: 'Boston College',
          location: 'Chestnut Hill, MA',
          year: '2017 – 2018',
        },
        {
          degree: 'Bachelor of Science in Finance & Accounting',
          school: 'Northeastern University',
          location: 'Boston, MA',
          year: '2013 – 2017',
          details: ['Magna Cum Laude (GPA: 3.88/4.0)'],
        },
      ],
      certifications: [
        { name: 'Certified Public Accountant (CPA)', issuer: 'Massachusetts Board of Public Accountancy', year: '2019', credentialId: 'CPA-789234' },
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
      ],
    },
    summaryExamples: [
      {
        level: 'Senior Accountant (CPA)',
        text: 'CPA-licensed Senior Corporate Accountant with 6+ years managing full-cycle general ledger operations, GAAP compliance, and financial reporting across multi-million dollar corporations. Accelerated month-end close by 60% and delivered zero-deficiency annual audits.',
      },
      {
        level: 'Staff Accountant (2–4 Years)',
        text: 'Detail-oriented Staff Accountant with 3 years of experience in balance sheet reconciliation, accounts payable/receivable, and variance analysis in NetSuite and QuickBooks. Skilled in US GAAP standards and corporate tax preparation.',
      },
    ],
    keySkillsCategorized: [
      { categoryName: 'Accounting & Compliance', skills: ['US GAAP', 'SOX 404', 'Tax Preparation', 'Internal Controls', 'Audit Readiness'] },
      { categoryName: 'Core Operations', skills: ['Month-End Close', 'General Ledger', 'Reconciliations', 'AP / AR', 'Payroll Accounting'] },
      { categoryName: 'ERP & Software', skills: ['Oracle NetSuite', 'SAP', 'QuickBooks Enterprise', 'BlackLine', 'Sage Intacct'] },
      { categoryName: 'Financial Analysis', skills: ['Variance Analysis', 'Advanced Excel (VLOOKUP, Pivots)', 'Budgeting', 'Cash Flow Modeling'] },
    ],
    keySkills: [
      'US GAAP, SOX 404 Compliance, Financial Statement Preparation',
      'Month-End Close, General Ledger (GL) Reconciliation, AP/AR',
      'NetSuite, SAP ERP, QuickBooks Enterprise, BlackLine',
      'Variance Analysis, Budget Forecasting, Cash Flow Management',
      'Advanced Excel (Macros, XLOOKUP, Pivot Tables, Data Modeling)',
    ],
    experienceBullets: [
      'Accelerated corporate month-end close from 10 days to 4 days by automating journal entries and NetSuite ledger reconciliations.',
      'Managed general ledger for $65M multi-entity business, ensuring 100% compliance with US GAAP standards.',
      'Identified and recovered $420,000 in unapplied vendor credits and tax deductions through exhaustive historical ledger auditing.',
      'Coordinated external audit procedures with Big 4 auditors, resulting in three consecutive clean audit opinions with zero deficiencies.',
    ],
    educationAdvice: 'Place your CPA license and Master of Accounting degree prominently at the top of your resume and next to your name in your header.',
    actionVerbs: ['Reconciled', 'Audited', 'Accelerated', 'Prepared', 'Streamlined', 'Forecasted', 'Ensured', 'Managed'],
    atsKeywords: ['CPA', 'GAAP', 'General Ledger', 'Month-End Close', 'Reconciliation', 'NetSuite', 'SAP', 'QuickBooks', 'Audit', 'Tax', 'Excel', 'SOX'],
    atsTips: [
      'Specify ERP systems (NetSuite, SAP, Workday, QuickBooks) in both your skills list and work bullet points.',
      'Clearly indicate CPA status (Active, In-Progress, or Passed 4/4 sections).',
    ],
    commonMistakes: [
      {
        mistake: 'Listing accounting responsibilities without mentioning portfolio values, close times, or audit outcomes.',
        fix: 'Include the dollar volume of budgets managed ($M), time saved during month-end close (days), and audit success rates.',
      },
    ],
    roleSpecificFaqs: [
      {
        question: 'Should I put CPA in my resume header?',
        answer: 'Yes! Include CPA directly next to your full name (e.g., "David Sterling, CPA") so ATS screeners and recruiters immediately register your credential.',
      },
    ],
    recommendedTemplateId: 'sidebar-left-minimal-gray',
  },
  {
    slug: 'marketing-manager',
    roleTitle: 'Marketing Manager',
    category: 'Marketing',
    experienceLevel: 'Mid to Senior (4–8 Years)',
    avgSalaryRange: '$90,000 – $145,000 / year',
    metaTitle: 'Marketing Manager Resume Example & Growth Marketing Guide | GetEasyCV',
    metaDescription: 'Marketing Manager resume example. Showcase demand generation, multi-channel campaign ROI, CAC/LTV metrics, content strategy, and team leadership.',
    heroSubtitle: 'Proven resume example for Digital Marketing, Growth, and Brand Strategy Managers.',
    fullResumeData: {
      contact: {
        fullName: 'Sarah Jenkins',
        title: 'Senior Growth Marketing Manager',
        email: 'sarah.jenkins.mkt@example.com',
        phone: '+1 (212) 555-0177',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/sarahjenkins-marketing',
      },
      summary: 'Data-driven Senior Marketing Manager with 7+ years of experience scaling multi-channel growth campaigns across paid media (Google/Meta Ads), inbound SEO content, lifecycle email marketing, and product launches. Managed an annual marketing budget of $2.8M, generating $14.5M in attributable pipeline revenue while reducing Customer Acquisition Cost (CAC) by 26%.',
      skillsGrouped: [
        { category: 'Growth & Paid Acquisition', skills: ['Paid Search (Google Ads)', 'Paid Social (Meta, LinkedIn Ads)', 'PPC Campaign Management', 'Retargeting Strategy', 'CAC/LTV Optimization'] },
        { category: 'Content & Inbound SEO', skills: ['SEO Content Strategy', 'Organic Search Ranking', 'Ahrefs / SEMrush', 'Copywriting & Editorial', 'Brand Storytelling'] },
        { category: 'Lifecycle & CRM', skills: ['HubSpot CRM', 'Marketo', 'Klaviyo', 'Automated Email Nurture', 'Lead Scoring & Segmentation'] },
        { category: 'Analytics & Optimization', skills: ['Google Analytics 4 (GA4)', 'A/B Funnel Testing', 'Mixpanel', 'Looker Studio', 'Conversion Rate Optimization (CRO)'] },
      ],
      workExperience: [
        {
          role: 'Senior Marketing Manager',
          company: 'Novus SaaS Enterprise',
          location: 'New York, NY',
          period: '2021 – Present',
          bullets: [
            'Managed $2.8M annual performance marketing budget across Google Ads, LinkedIn, and Meta, generating $14.5M in qualified sales pipeline.',
            'Lowered blended Customer Acquisition Cost (CAC) by 26% while increasing quarterly Marketing Qualified Leads (MQLs) by 44%.',
            'Orchestrated multi-touch automated email nurture workflows in HubSpot, improving lead-to-opportunity conversion rate from 11% to 19%.',
            'Led cross-functional team of 6 content creators, designers, and SEO specialists, launching a digital resource center that drove 180,000 monthly organic visits.',
          ],
        },
        {
          role: 'Digital Marketing Specialist',
          company: 'BrightWave Commerce',
          location: 'Brooklyn, NY',
          period: '2017 – 2021',
          bullets: [
            'Executed paid social campaigns and influencer partnerships, scaling direct-to-consumer e-commerce revenue by 130% year-over-year.',
            'Conducted 50+ conversion rate optimization (CRO) split tests on landing pages, improving checkout conversion by 3.4 percentage points.',
            'Authored weekly performance dashboards in GA4 and Looker Studio for executive leadership.',
          ],
        },
      ],
      education: [
        {
          degree: 'Bachelor of Science in Marketing & Communications',
          school: 'New York University (NYU)',
          location: 'New York, NY',
          year: '2013 – 2017',
        },
      ],
      certifications: [
        { name: 'Google Ads Search & Measurement Certified', issuer: 'Google', year: '2023' },
        { name: 'HubSpot Inbound Marketing & RevOps Certified', issuer: 'HubSpot Academy', year: '2022' },
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'French', proficiency: 'Conversational' },
      ],
    },
    summaryExamples: [
      {
        level: 'Senior Marketing Manager (6+ Years)',
        text: 'Data-driven Senior Marketing Manager with 7+ years of experience scaling multi-channel digital acquisition, inbound SEO, and lifecycle marketing. Managed $2.8M ad budget generating $14.5M in pipeline revenue while reducing CAC by 26%.',
      },
      {
        level: 'Digital Marketing Manager (3–5 Years)',
        text: 'Growth-focused Marketing Manager with 4 years of expertise executing high-ROI paid ad campaigns, email automation workflows, and content marketing initiatives. Proficient in GA4, HubSpot, Meta Ads, and Conversion Rate Optimization (CRO).',
      },
    ],
    keySkillsCategorized: [
      { categoryName: 'Paid Acquisition & Growth', skills: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'PPC Strategy', 'CAC/LTV Analysis'] },
      { categoryName: 'Inbound & SEO', skills: ['SEO Content Strategy', 'Ahrefs/SEMrush', 'Brand Messaging', 'Organic Traffic'] },
      { categoryName: 'Marketing Automation & CRM', skills: ['HubSpot', 'Marketo', 'Email Marketing', 'Lead Scoring', 'Lifecycle Nurture'] },
      { categoryName: 'Analytics & CRO', skills: ['GA4', 'A/B Testing', 'Conversion Rate Optimization', 'Looker Studio'] },
    ],
    keySkills: [
      'Performance Marketing (Google Ads, Meta Ads, LinkedIn Ads, Retargeting)',
      'Inbound SEO Strategy, Content Marketing, SEMrush, Ahrefs',
      'Marketing Automation (HubSpot, Marketo, Klaviyo, Lifecycle Nurturing)',
      'Analytics & Attribution (GA4, Looker Studio, Mixpanel, SQL basics)',
      'A/B Testing, Conversion Rate Optimization (CRO), Budget Management',
    ],
    experienceBullets: [
      'Scaled annual pipeline revenue to $14.5M across paid and organic channels while decreasing CAC by 26%.',
      'Grew organic search traffic from 35,000 to 180,000 monthly visits through an editorial pillar-cluster SEO strategy.',
      'Restructured lifecycle email onboarding campaigns in HubSpot, lifting trial-to-paid conversion by 38%.',
      'Managed $2.8M digital advertising budget with a 4.8x blended return on ad spend (ROAS).',
    ],
    educationAdvice: 'Highlight Marketing, Communications, or Business Administration degrees alongside high-value certifications (Google Ads, HubSpot, Meta Blueprint).',
    actionVerbs: ['Generated', 'Scaled', 'Orchestrated', 'Optimized', 'Managed', 'Supervised', 'Launched', 'Increased'],
    atsKeywords: ['Marketing Strategy', 'Google Ads', 'HubSpot', 'SEO', 'PPC', 'CAC', 'LTV', 'GA4', 'Lead Generation', 'Content Strategy', 'ROAS', 'Conversion Rate'],
    atsTips: [
      'Always quantify marketing results: pipeline revenue ($), ROAS (x), CAC reduction (%), and MQL growth (%).',
      'Name specific marketing automation tools (HubSpot, Marketo, Salesforce, Mailchimp).',
    ],
    commonMistakes: [
      {
        mistake: 'Focusing on vanity metrics (likes, impressions) rather than revenue, leads, and conversion metrics.',
        fix: 'Emphasize pipeline contribution, qualified leads, customer acquisition costs, and revenue growth.',
      },
    ],
    roleSpecificFaqs: [
      {
        question: 'What metrics should a marketing manager highlight on a resume?',
        answer: 'Prioritize revenue impact, ROAS, CAC, LTV, conversion rates, organic search traffic growth, and marketing budget size.',
      },
    ],
    recommendedTemplateId: 'sidebar-left-minimal-gray',
  },
  {
    slug: 'nursing',
    roleTitle: 'Registered Nurse (RN)',
    category: 'Healthcare',
    experienceLevel: 'Mid to Senior (3–8 Years)',
    avgSalaryRange: '$78,000 – $115,000 / year',
    metaTitle: 'Registered Nurse (RN) Resume Example & Clinical Guide | GetEasyCV',
    metaDescription: 'Registered Nurse resume example. Highlight patient care, triage assessment, medication administration, ICU/ER experience, and clinical licenses (BLS, ACLS).',
    heroSubtitle: 'Recruiter-vetted resume template for Registered Nurses, ICU/ER Staff, and Clinical Specialists.',
    fullResumeData: {
      contact: {
        fullName: 'Rachel Campbell, BSN, RN',
        title: 'Registered Nurse – Critical Care / ICU',
        email: 'rachel.campbell.rn@example.com',
        phone: '+1 (215) 555-0139',
        location: 'Philadelphia, PA',
        linkedin: 'linkedin.com/in/rachelcampbell-rn',
      },
      summary: 'Compassionate and dedicated Registered Nurse (BSN, RN) with 6+ years of critical care experience in Level I Trauma Center Intensive Care Units (ICU) and emergency settings. Skilled in hemodynamic monitoring, mechanical ventilation management, emergency medication administration, and interdisciplinary patient advocacy. Maintained a 98% patient satisfaction rating while serving as Charge Nurse for a 24-bed ICU.',
      skillsGrouped: [
        { category: 'Clinical Competencies', skills: ['Critical Care Nursing (ICU/CCU)', 'Hemodynamic & Cardiac Monitoring', 'Mechanical Ventilation (Vents)', 'Trauma Triage', 'IV Therapy & Central Lines'] },
        { category: 'Patient Safety & Protocols', skills: ['Medication Administration (5 Rights)', 'Infection Control / Sterile Technique', 'Code Blue & Rapid Response', 'BLS / ACLS Certified', 'Care Plan Development'] },
        { category: 'Healthcare Technology', skills: ['Epic Systems EMR', 'Cerner Health', 'Pyxis Medication Dispensing', 'Alaris IV Pumps', 'Philips Patient Monitors'] },
        { category: 'Leadership & Collaboration', skills: ['Charge Nurse Leadership', 'Preceptorship / Nurse Mentoring', 'Interdisciplinary Rounds', 'Family Education & Advocacy'] },
      ],
      workExperience: [
        {
          role: 'Charge Nurse / Critical Care RN (ICU)',
          company: 'Penn Medicine Health System',
          location: 'Philadelphia, PA',
          period: '2021 – Present',
          bullets: [
            'Delivered high-acuity nursing care to 2–3 critically ill patients per shift in a 24-bed medical/surgical ICU.',
            'Acted as Charge Nurse, delegating clinical assignments for 14 RNs, coordinating emergency admissions, and leading code blue responses.',
            'Managed arterial lines, central venous catheters, continuous renal replacement therapy (CRRT), and mechanical ventilators.',
            'Mentored and trained 12 new graduate nurses through a 6-month intensive critical care residency program.',
          ],
        },
        {
          role: 'Staff Registered Nurse (Telemetry / Med-Surg)',
          company: 'Jefferson Health',
          location: 'Philadelphia, PA',
          period: '2018 – 2021',
          bullets: [
            'Monitored 4–5 post-operative and cardiac telemetry patients per shift, administering medications and IV therapy with 100% protocol adherence.',
            'Charted patient vitals, clinical assessments, and physician orders in Epic EMR with zero documentation compliance errors.',
            'Educated 300+ patients and families on post-discharge medication schedules and rehabilitation protocols, reducing 30-day readmissions by 14%.',
          ],
        },
      ],
      education: [
        {
          degree: 'Bachelor of Science in Nursing (BSN)',
          school: 'University of Pennsylvania School of Nursing',
          location: 'Philadelphia, PA',
          year: '2014 – 2018',
          details: ['Dean’s List', 'Sigma Theta Tau Nursing Honor Society'],
        },
      ],
      certifications: [
        { name: 'Registered Nurse (RN) License #RN-894210', issuer: 'Pennsylvania State Board of Nursing', year: 'Current' },
        { name: 'Advanced Cardiac Life Support (ACLS)', issuer: 'American Heart Association', year: '2024' },
        { name: 'Basic Life Support (BLS)', issuer: 'American Heart Association', year: '2024' },
        { name: 'Critical Care Registered Nurse (CCRN)', issuer: 'AACN', year: '2022' },
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'Spanish', proficiency: 'Medical Conversational' },
      ],
    },
    summaryExamples: [
      {
        level: 'Senior ICU Registered Nurse (BSN, RN)',
        text: 'BSN-prepared Critical Care Registered Nurse with 6+ years of experience in Level I Trauma ICUs. Expert in advanced hemodynamic monitoring, mechanical ventilators, and rapid response resuscitation. Proven Charge Nurse leader with 98% patient satisfaction scores.',
      },
      {
        level: 'Staff Nurse (Med-Surg / Telemetry)',
        text: 'Compassionate Registered Nurse with 3 years of clinical experience in Med-Surg and Telemetry units. Skilled in Epic EMR charting, acute patient assessments, IV therapy, and interdisciplinary care planning. Certified in BLS and ACLS.',
      },
    ],
    keySkillsCategorized: [
      { categoryName: 'Clinical Specialties', skills: ['ICU / Critical Care', 'Trauma Assessment', 'Ventilator Management', 'Hemodynamic Monitoring'] },
      { categoryName: 'Medication & Procedures', skills: ['IV Infusion Therapy', 'Central Line Care', 'Medication Administration', 'Sterile Technique'] },
      { categoryName: 'EMR & Systems', skills: ['Epic Systems', 'Cerner', 'Pyxis MedStation', 'Alaris IV Pumps'] },
      { categoryName: 'Certifications & Safety', skills: ['BLS', 'ACLS', 'CCRN', 'Patient Safety Protocols', 'Infection Control'] },
    ],
    keySkills: [
      'Critical Care Nursing (ICU/CCU), Trauma Triage, Hemodynamic Monitoring',
      'Medication Administration (Pyxis), IV Therapy, Central Line Management',
      'Electronic Medical Records (Epic EMR, Cerner), Clinical Charting',
      'Basic Life Support (BLS), Advanced Cardiac Life Support (ACLS), CCRN',
      'Patient Education, Discharge Planning, Code Blue Team, Nurse Preceptor',
    ],
    experienceBullets: [
      'Delivered critical care nursing to high-acuity ICU patients requiring continuous ventilation and vasoactive drip titrations.',
      'Supervised clinical shift operations as Charge Nurse for a 24-bed ICU, directing rapid response teams during critical resuscitations.',
      'Administered medications, blood products, and parenteral nutrition with 100% adherence to five rights of medication administration.',
      'Trained and onboarded 12 graduate nurses in hemodynamic monitoring, EMR charting, and emergency protocols.',
    ],
    educationAdvice: 'Place your BSN/ADN degree and Active State Nursing License at the top of your resume. Clearly list license numbers and expiration dates.',
    actionVerbs: ['Administered', 'Assessed', 'Monitored', 'Triaged', 'Coordinated', 'Educated', 'Collaborated', 'Precepted'],
    atsKeywords: ['Registered Nurse', 'RN', 'BSN', 'ICU', 'BLS', 'ACLS', 'Epic EMR', 'Patient Care', 'Medication Administration', 'Triage', 'CCRN', 'Cerner'],
    atsTips: [
      'Always include your state license number, BSN/ADN credentials, and active AHA certifications (BLS/ACLS/PALS).',
      'Mention specific Electronic Medical Record (EMR) systems like Epic, Cerner, or Meditech.',
    ],
    commonMistakes: [
      {
        mistake: 'Leaving off hospital trauma level, nurse-to-patient ratios, or unit bed capacity.',
        fix: 'Specify context (e.g., "Level I Trauma Center, 24-bed ICU, 1:2 nurse-to-patient ratio").',
      },
    ],
    roleSpecificFaqs: [
      {
        question: 'Should I include my nursing license number on my resume?',
        answer: 'Yes, include your full credential line in your header (e.g., "BSN, RN, State License #1234567") so hospital HR can quickly verify your status.',
      },
    ],
    recommendedTemplateId: 'sidebar-left-minimal-gray',
  },
  {
    slug: 'project-manager',
    roleTitle: 'Project Manager (PMP)',
    category: 'Management',
    experienceLevel: 'Mid to Senior (4–9 Years)',
    avgSalaryRange: '$95,000 – $155,000 / year',
    metaTitle: 'Project Manager Resume Example & PMP Agile Guide | GetEasyCV',
    metaDescription: 'Project Manager resume example. Showcase Agile/Scrum leadership, $10M+ project delivery, risk mitigation, stakeholder management, and PMP certification.',
    heroSubtitle: 'Proven resume model for Technical, Construction, and Enterprise Project Managers.',
    fullResumeData: {
      contact: {
        fullName: 'Nathaniel Drake, PMP',
        title: 'Senior Technical Project Manager',
        email: 'nathaniel.drake.pmp@example.com',
        phone: '+1 (404) 555-0158',
        location: 'Atlanta, GA',
        linkedin: 'linkedin.com/in/nathanieldrake-pmp',
      },
      summary: 'PMP-certified Senior Project Manager with 8+ years of experience leading complex enterprise software transformations, cloud migrations, and cross-functional product delivery. Managed project portfolios totaling $18M+ across engineering, design, and operations teams, achieving a 96% on-time, within-budget milestone completion rate. Expert in Agile, Scrum, Kanban, and Waterfall methodologies.',
      skillsGrouped: [
        { category: 'Methodologies & Frameworks', skills: ['Agile / Scrum', 'Kanban', 'Waterfall (SDLC)', 'Sprint Planning', 'Risk Mitigation & RAID Logs'] },
        { category: 'Governance & Budgeting', skills: ['Budget Management ($15M+)', 'Scope & Change Management', 'Vendor & Procurement', 'Resource Allocation', 'Executive Reporting'] },
        { category: 'Project Software & Tools', skills: ['Jira Software', 'Confluence', 'Asana', 'Smartsheet', 'Microsoft Project', 'Trello'] },
        { category: 'Leadership & Stakeholder', skills: ['Cross-Functional Alignment', 'C-Suite Stakeholder Management', 'Team Mentorship', 'Conflict Resolution'] },
      ],
      workExperience: [
        {
          role: 'Senior Project Manager',
          company: 'Apex Global Enterprises',
          location: 'Atlanta, GA',
          period: '2021 – Present',
          bullets: [
            'Directed $12M cloud infrastructure modernization initiative across 6 cross-functional engineering squads, delivering 3 weeks ahead of schedule.',
            'Facilitated daily standups, sprint planning, backlog grooming, and retrospectives for 35+ developers and designers across 3 time zones.',
            'Instituted standardized risk management framework (RAID logs), decreasing project scope creep by 34% across 8 enterprise business units.',
            'Delivered bi-weekly status dashboards and budget forecasts directly to C-suite stakeholders, maintaining 100% executive satisfaction.',
          ],
        },
        {
          role: 'Agile Project Manager',
          company: 'Cascade Technology Solutions',
          location: 'Charlotte, NC',
          period: '2017 – 2021',
          bullets: [
            'Managed simultaneous delivery of 5 customer-facing web and mobile applications with combined budgets exceeding $6M.',
            'Transformed waterfall development processes to Agile Scrum, increasing team velocity by 40% and shortening release cycles from 6 months to 3 weeks.',
            'Negotiated third-party vendor contracts and software licensing agreements, saving $180,000 annually in operating expenses.',
          ],
        },
      ],
      education: [
        {
          degree: 'Bachelor of Science in Industrial & Systems Engineering',
          school: 'Georgia Institute of Technology',
          location: 'Atlanta, GA',
          year: '2013 – 2017',
        },
      ],
      certifications: [
        { name: 'Project Management Professional (PMP)', issuer: 'Project Management Institute (PMI)', year: '2020', credentialId: 'PMP-2948102' },
        { name: 'Certified ScrumMaster (CSM)', issuer: 'Scrum Alliance', year: '2019' },
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
      ],
    },
    summaryExamples: [
      {
        level: 'Senior Project Manager (PMP)',
        text: 'PMP and CSM-certified Senior Project Manager with 8+ years orchestrating multi-million-dollar technology deployments and cross-functional teams. Track record of delivering $18M+ in project portfolios with 96% on-time milestone execution and zero budget overruns.',
      },
      {
        level: 'Technical Project Manager (3–5 Years)',
        text: 'Agile Project Manager with 4 years of experience leading sprint ceremonies, backlog prioritization, and cross-team communication for software engineering projects in Jira and Confluence. Proven ability to reduce delivery cycles by 40%.',
      },
    ],
    keySkillsCategorized: [
      { categoryName: 'Frameworks & Delivery', skills: ['Agile / Scrum', 'Waterfall SDLC', 'Sprint Planning', 'Risk Mitigation'] },
      { categoryName: 'Financials & Governance', skills: ['Budget Management', 'Scope Control', 'Vendor Management', 'Resource Planning'] },
      { categoryName: 'Tools & Tracking', skills: ['Jira', 'Confluence', 'Asana', 'Microsoft Project', 'Smartsheet'] },
      { categoryName: 'Leadership & Strategy', skills: ['Stakeholder Management', 'Executive Reporting', 'Cross-Functional Leadership'] },
    ],
    keySkills: [
      'Project Management Professional (PMP), Certified ScrumMaster (CSM)',
      'Agile, Scrum, Kanban, Waterfall, SDLC Methodologies',
      'Budget Management ($10M+), Resource Allocation, Scope Control',
      'Jira Software, Confluence, Asana, MS Project, Smartsheet',
      'Risk Management (RAID Logs), Stakeholder Communication, Vendor Negotiation',
    ],
    experienceBullets: [
      'Delivered $12M multi-year enterprise digital transformation project 3 weeks ahead of scheduled release date.',
      'Facilitated Agile ceremonies across 35+ software engineers and QA testers, accelerating sprint velocity by 40%.',
      'Standardized risk and change management processes across 8 departments, mitigating 95% of critical path schedule delays.',
      'Negotiated vendor procurement contracts, reducing software licensing costs by $180,000 annually.',
    ],
    educationAdvice: 'Highlight PMP, CSM, or Prince2 certifications alongside your degree in Business, Engineering, or Management Information Systems.',
    actionVerbs: ['Directed', 'Facilitated', 'Orchestrated', 'Delivered', 'Mitigated', 'Negotiated', 'Standardized', 'Managed'],
    atsKeywords: ['PMP', 'Project Management', 'Agile', 'Scrum', 'Jira', 'Budget Management', 'Stakeholder Management', 'Risk Mitigation', 'SDLC', 'Confluence', 'Sprint Planning'],
    atsTips: [
      'Always state total budgets managed, team sizes led, and on-time delivery percentages.',
      'Highlight industry certifications (PMP, CSM, PMI-ACP) in your header and education section.',
    ],
    commonMistakes: [
      {
        mistake: 'Failing to mention project budget sizes or methodology frameworks.',
        fix: 'Clearly state project scope ($M budget, team count, methodology used) in every job role.',
      },
    ],
    roleSpecificFaqs: [
      {
        question: 'Is PMP certification necessary on a Project Manager resume?',
        answer: 'While not mandatory for entry-level roles, having PMP or CSM certifications significantly boosts ATS match scores and recruiter callbacks for mid/senior positions.',
      },
    ],
    recommendedTemplateId: 'sidebar-left-minimal-gray',
  },
  {
    slug: 'teacher',
    roleTitle: 'Teacher & Educator',
    category: 'Education',
    experienceLevel: 'Mid Level (3–7 Years)',
    avgSalaryRange: '$55,000 – $85,000 / year',
    metaTitle: 'Teacher & Educator Resume Example & Writing Guide | GetEasyCV',
    metaDescription: 'Teacher resume example. Learn how to highlight curriculum development, classroom management, student assessment, and teaching credentials.',
    heroSubtitle: 'Clear resume template for Elementary, High School, and Special Education Teachers.',
    fullResumeData: {
      contact: {
        fullName: 'Emily Richardson, M.Ed.',
        title: 'High School STEM Educator',
        email: 'emily.richardson.edu@example.com',
        phone: '+1 (773) 555-0182',
        location: 'Chicago, IL',
        linkedin: 'linkedin.com/in/emily-richardson-educator',
      },
      summary: 'Passionate and State-Certified High School STEM Educator with 6+ years of classroom teaching and curriculum design experience. Proven track record of improving standardized state science assessment pass rates by 22% through inquiry-based learning, differentiated instruction, and educational technology integration. Skilled in IEP/504 accommodations, restorative discipline, and parent communication.',
      skillsGrouped: [
        { category: 'Instruction & Pedagogy', skills: ['STEM Curriculum Design', 'Differentiated Instruction', 'Inquiry-Based Learning', 'AP Biology Prep', 'Lesson Planning'] },
        { category: 'Classroom Leadership', skills: ['Classroom Management', 'Restorative Justice', 'Parent-Teacher Engagement', 'IEP & 504 Accommodations'] },
        { category: 'Educational Technology', skills: ['Google Classroom', 'Canvas LMS', 'Edpuzzle', 'Kahoot', 'Labster Virtual Labs', 'SmartBoard'] },
        { category: 'Assessment & Standards', skills: ['Formative & Summative Assessment', 'Next Generation Science Standards (NGSS)', 'Data-Driven Remediation'] },
      ],
      workExperience: [
        {
          role: 'High School Biology & Chemistry Teacher',
          company: 'Lincoln Park Academic High School',
          location: 'Chicago, IL',
          period: '2020 – Present',
          bullets: [
            'Delivered rigorous STEM curriculum and AP Biology instruction to 135+ students annually across 5 daily class periods.',
            'Elevated student passing rates on annual state science proficiency exams by 22% through data-driven lab modules and targeted tutoring.',
            'Implemented individualized education plans (IEPs) and 504 accommodations for 24 diverse learners with 100% compliance.',
            'Integrated Google Classroom, Canvas LMS, and virtual laboratory simulations, increasing homework completion rates to 94%.',
          ],
        },
        {
          role: 'Middle School General Science Teacher',
          company: 'Oakridge Middle School',
          location: 'Chicago, IL',
          period: '2018 – 2020',
          bullets: [
            'Created hands-on experiential learning modules for 110 7th and 8th-grade science students aligned with NGSS standards.',
            'Organized annual district science fair with 65+ participating student projects, mentoring 3 regional award winners.',
          ],
        },
      ],
      education: [
        {
          degree: 'Master of Education (M.Ed.) in Curriculum & Instruction',
          school: 'University of Illinois Chicago',
          location: 'Chicago, IL',
          year: '2018 – 2020',
        },
        {
          degree: 'Bachelor of Science in Biological Sciences',
          school: 'Northwestern University',
          location: 'Evanston, IL',
          year: '2014 – 2018',
        },
      ],
      certifications: [
        { name: 'Illinois State Professional Educator License (PEL)', issuer: 'Illinois State Board of Education', year: 'Current', credentialId: 'PEL-948201' },
      ],
      awards: [
        { title: 'District Educator of the Year Finalist', issuer: 'Chicago Public Schools', year: '2024', description: 'Recognized for top 5% student proficiency gains across district STEM programs.' },
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'Spanish', proficiency: 'Conversational' },
      ],
    },
    summaryExamples: [
      {
        level: 'High School STEM Teacher',
        text: 'Passionate and State-Certified High School STEM Educator with 6+ years of classroom teaching and curriculum design experience. Proven track record of improving standardized state science assessment pass rates by 22% through inquiry-based learning, differentiated instruction, and educational technology integration.',
      },
      {
        level: 'Elementary / Middle School Educator',
        text: 'Dedicated Elementary Educator with 4 years of experience fostering student-centered classroom environments, individualized reading intervention, and interactive math learning. Skilled in IEP accommodations and positive behavior intervention systems (PBIS).',
      },
    ],
    keySkillsCategorized: [
      { categoryName: 'Teaching & Pedagogy', skills: ['Curriculum Design', 'Differentiated Instruction', 'Inquiry Learning', 'Lesson Planning'] },
      { categoryName: 'Classroom & Accommodations', skills: ['Classroom Management', 'IEP/504 Compliance', 'Restorative Practices'] },
      { categoryName: 'EdTech Tools', skills: ['Google Classroom', 'Canvas LMS', 'Labster', 'SmartBoard'] },
      { categoryName: 'Standards & Testing', skills: ['NGSS Standards', 'Formative Assessment', 'State Test Prep', 'Data-Driven Remediation'] },
    ],
    keySkills: [
      'Curriculum Development, Lesson Planning, Differentiated Instruction',
      'Classroom Management, Student Assessment, IEP & 504 Plans',
      'Google Classroom, Canvas LMS, EdTech Tools, SmartBoard',
      'Parent-Teacher Communication, Restorative Justice, PBIS',
      'Next Generation Science Standards (NGSS), Standardized Test Prep',
    ],
    experienceBullets: [
      'Improved standardized science test scores by 22% across 135 high school students through targeted remediation.',
      'Developed 40+ interactive digital lesson modules in Canvas LMS and Google Classroom, achieving 94% on-time submission rate.',
      'Maintained 100% compliance for 24 IEP and 504 accommodation plans in partnership with special education counselors.',
      'Fostered positive classroom climate through restorative justice practices, reducing disciplinary referrals by 45%.',
    ],
    educationAdvice: 'Highlight teaching certifications (State License, PEL, Praxis scores) and advanced degrees in Education (M.Ed., MAT).',
    actionVerbs: ['Instructed', 'Developed', 'Differentiated', 'Facilitated', 'Assessed', 'Implemented', 'Mentored', 'Collaborated'],
    atsKeywords: ['Curriculum Design', 'Lesson Planning', 'Differentiated Instruction', 'Classroom Management', 'IEP', '504 Plans', 'Google Classroom', 'Canvas LMS', 'Student Assessment', 'State Certified'],
    atsTips: [
      'Specify grade levels and subject areas clearly (e.g., "9th–12th Grade AP Biology & Chemistry").',
      'List state certifications and endorsements prominently in your resume header.',
    ],
    commonMistakes: [
      {
        mistake: 'Focusing solely on routine daily duties instead of student growth metrics and learning outcomes.',
        fix: 'Include specific testing improvement percentages, attendance gains, and program participation numbers.',
      },
    ],
    roleSpecificFaqs: [
      {
        question: 'Should a teacher include student teaching on their resume?',
        answer: 'If you have under 2 years of full-time teaching experience, absolutely include your student teaching practicum with full detail.',
      },
    ],
    recommendedTemplateId: 'sidebar-left-minimal-gray',
  },
  {
    slug: 'graphic-designer',
    roleTitle: 'Graphic & UI Designer',
    category: 'Creative & Design',
    experienceLevel: 'Mid Level (3–7 Years)',
    avgSalaryRange: '$68,000 – $110,000 / year',
    metaTitle: 'Graphic & UI Designer Resume Example & Portfolio Guide | GetEasyCV',
    metaDescription: 'Graphic & UI Designer resume example. Learn how to highlight brand identity, Figma UI design, Adobe Creative Cloud, typography, and visual campaigns.',
    heroSubtitle: 'Recruiter-approved resume model for Brand, Digital, and UI/UX Graphic Designers.',
    fullResumeData: {
      contact: {
        fullName: 'Chloe Dupont',
        title: 'Senior Brand & UI Graphic Designer',
        email: 'chloe.dupont.design@example.com',
        phone: '+1 (323) 555-0166',
        location: 'Los Angeles, CA',
        linkedin: 'linkedin.com/in/chloedupont-design',
        portfolio: 'chloedupont.design',
      },
      summary: 'Award-winning Graphic and UI Designer with 6+ years of experience crafting comprehensive brand identities, digital product interfaces, visual design systems, and high-impact marketing collateral. Expert in Figma, Adobe Creative Cloud (Photoshop, Illustrator, InDesign, After Effects), and typography. Led brand redesigns for 20+ commercial clients resulting in a 40% lift in customer brand recall.',
      skillsGrouped: [
        { category: 'Design Software', skills: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Adobe After Effects', 'Cinema 4D'] },
        { category: 'Brand & Visual Strategy', skills: ['Brand Identity & Guidelines', 'Typography & Color Theory', 'Design Systems', 'Packaging Design', 'Logo Creation'] },
        { category: 'Digital & UI/UX', skills: ['Responsive UI Design', 'Wireframing & Prototyping', 'User Research & Personas', 'Design Handoff (Zeplin/Figma)', 'Motion Graphics'] },
        { category: 'Marketing & Print', skills: ['Social Media Visuals', 'Digital Ad Creative (Meta/Google)', 'Print Production & Prepress', 'Event Signage', 'Infographics'] },
      ],
      workExperience: [
        {
          role: 'Senior Graphic & Brand Designer',
          company: 'Lumina Creative Agency',
          location: 'Los Angeles, CA',
          period: '2021 – Present',
          bullets: [
            'Spearheaded visual identity rebranding and design systems for 15+ tech and retail clients, increasing client digital engagement by 38%.',
            'Designed 200+ high-converting digital advertising assets and social media campaigns, boosting client ad click-through rates (CTR) by 2.6x.',
            'Created comprehensive Figma design component libraries for web and mobile apps, reducing developer handoff turnaround by 30%.',
            'Supervised prepress and print quality assurance for packaging, magazines, and event marketing collateral with 100% error-free print runs.',
          ],
        },
        {
          role: 'Visual & UI Designer',
          company: 'Verve Studio',
          location: 'San Diego, CA',
          period: '2018 – 2021',
          bullets: [
            'Created custom vector illustrations, brand iconography, and promotional marketing materials for e-commerce brands.',
            'Collaborated with web developers to translate responsive Figma UI mockups into live web pages.',
            'Edited short-form animated video ads in After Effects, driving 1.2M+ organic impressions on Instagram and TikTok.',
          ],
        },
      ],
      education: [
        {
          degree: 'Bachelor of Fine Arts (BFA) in Graphic Design',
          school: 'Rhode Island School of Design (RISD)',
          location: 'Providence, RI',
          year: '2014 – 2018',
        },
      ],
      certifications: [
        { name: 'Adobe Certified Professional in Visual Design', issuer: 'Adobe', year: '2022' },
      ],
      awards: [
        { title: 'AIGA Design Showcase Winner', issuer: 'AIGA', year: '2023', description: 'Awarded for excellence in sustainable brand packaging and identity design.' },
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'French', proficiency: 'Fluent' },
      ],
    },
    summaryExamples: [
      {
        level: 'Senior Brand & UI Designer (6+ Years)',
        text: 'Senior Graphic & UI Designer with 6+ years of experience leading brand transformations, digital ad creative, and Figma UI component systems. Expert in Adobe Creative Cloud, typography, and motion graphics with a proven record of lifting marketing engagement by 38%.',
      },
      {
        level: 'Graphic Designer (2–4 Years)',
        text: 'Creative Graphic Designer with 3 years of experience developing brand guidelines, social media assets, marketing collateral, and vector illustration in Figma and Adobe Illustrator. Strong foundation in color theory and prepress production.',
      },
    ],
    keySkillsCategorized: [
      { categoryName: 'Design Tools', skills: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'After Effects'] },
      { categoryName: 'Brand Strategy', skills: ['Brand Guidelines', 'Logo Design', 'Typography', 'Visual Identity', 'Packaging'] },
      { categoryName: 'UI & Digital', skills: ['UI/UX Design', 'Wireframing', 'Prototyping', 'Design Systems', 'Motion Graphics'] },
      { categoryName: 'Print & Production', skills: ['Prepress', 'Print Production', 'Social Media Ads', 'Infographics'] },
    ],
    keySkills: [
      'Figma, Adobe Creative Cloud (Photoshop, Illustrator, InDesign, After Effects)',
      'Brand Identity Systems, Typography, Color Theory, Iconography',
      'UI/UX Design, Wireframing, Interactive Prototyping, Design Handoff',
      'Digital Ad Creative, Social Media Content, Motion Graphics, Video Editing',
      'Print Production, Prepress, Packaging Design, Vector Illustration',
    ],
    experienceBullets: [
      'Engineered brand identity guidelines and digital asset packages for 15+ corporate clients, increasing audience engagement by 38%.',
      'Designed high-performing social ad creative in Figma and Photoshop that generated a 2.6x increase in click-through rates.',
      'Constructed scalable design systems in Figma containing 80+ components, accelerating dev sprint handoff by 30%.',
      'Produced animated promo videos in After Effects that garnered over 1.2M organic views across social channels.',
    ],
    educationAdvice: 'Highlight a BFA in Graphic Design, Digital Media, or Visual Communications. Prominently feature your online portfolio URL in your header.',
    actionVerbs: ['Designed', 'Spearheaded', 'Conceptualized', 'Engineered', 'Produced', 'Illustrated', 'Revitalized', 'Standardized'],
    atsKeywords: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'InDesign', 'Graphic Design', 'Brand Identity', 'UI Design', 'Typography', 'After Effects', 'Design Systems', 'Social Media', 'Packaging'],
    atsTips: [
      'Always include your portfolio URL at the very top of your resume.',
      'List specific Adobe and Figma tools rather than generic "design software" terms.',
    ],
    commonMistakes: [
      {
        mistake: 'Using intricate, multi-column visual graphics in the resume file itself, causing ATS parsers to fail.',
        fix: 'Use a clean, single-column ATS-friendly resume format and link your visual portfolio website.',
      },
    ],
    roleSpecificFaqs: [
      {
        question: 'Should a graphic designer have a highly artistic resume layout?',
        answer: 'Your resume must be ATS-parseable. Keep the resume document clean, typographic, and structured, and showcase your creative visual flair through your linked online portfolio.',
      },
    ],
    recommendedTemplateId: 'sidebar-left-minimal-gray',
  },
  {
    slug: 'student-fresher',
    roleTitle: 'College Student & Fresher',
    category: 'Entry Level',
    experienceLevel: 'Entry Level (0–2 Years)',
    avgSalaryRange: '$50,000 – $75,000 / year',
    metaTitle: 'College Student & Fresher Resume Example & First Job Guide | GetEasyCV',
    metaDescription: 'College Student and Fresher resume example. Learn how to highlight university projects, internships, leadership roles, GPA, and coursework for entry-level jobs.',
    heroSubtitle: 'Recruiter-approved resume model for Recent Graduates, College Students, and Career Starters.',
    fullResumeData: {
      contact: {
        fullName: 'Jordan Taylor',
        title: 'Computer Science Graduate / Junior Developer',
        email: 'jordan.taylor.grad@example.com',
        phone: '+1 (919) 555-0144',
        location: 'Raleigh, NC',
        linkedin: 'linkedin.com/in/jordan-taylor-grad',
        github: 'github.com/jordantaylor-dev',
      },
      summary: 'High-achieving Computer Science graduate (3.85 GPA) with a strong technical foundation in full-stack software development, object-oriented programming, and relational database systems using Python, Java, React, and SQL. Completed two software engineering internships and led an award-winning senior capstone project serving 1,200+ university users.',
      skillsGrouped: [
        { category: 'Programming Languages', skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'SQL'] },
        { category: 'Web & Frameworks', skills: ['React.js', 'Node.js', 'Express', 'HTML5/CSS3', 'Tailwind CSS'] },
        { category: 'Developer Tools', skills: ['Git/GitHub', 'Docker', 'Postman', 'VS Code', 'Linux/Bash'] },
        { category: 'Core Concepts', skills: ['Data Structures & Algorithms', 'Object-Oriented Design (OOP)', 'RESTful APIs', 'Database Normalization'] },
      ],
      workExperience: [
        {
          role: 'Software Engineering Intern',
          company: 'CloudPeak Software',
          location: 'Durham, NC',
          period: 'May 2024 – Aug 2024',
          bullets: [
            'Collaborated with a 6-person engineering team to build REST API endpoints in Python/FastAPI and PostgreSQL, reducing endpoint response times by 20%.',
            'Developed automated test suites using pytest, achieving 88% code coverage across new customer billing modules.',
            'Participated in daily Agile standups, code reviews, and sprint planning sessions.',
          ],
        },
        {
          role: 'Undergraduate Computer Science Teaching Assistant',
          company: 'North Carolina State University',
          location: 'Raleigh, NC',
          period: 'Aug 2023 – May 2024',
          bullets: [
            'Conducted weekly lab sessions for 45 undergraduate students in Data Structures and Algorithms in Java.',
            'Held 6 office hours per week, helping students debug algorithms and understand time complexity (Big-O notation).',
          ],
        },
      ],
      education: [
        {
          degree: 'Bachelor of Science in Computer Science',
          school: 'North Carolina State University',
          location: 'Raleigh, NC',
          year: '2021 – 2025',
          details: ['GPA: 3.85 / 4.0 (Dean’s List 7 of 8 semesters)', 'Relevant Coursework: Data Structures, Algorithms, Operating Systems, Database Systems, Software Engineering'],
        },
      ],
      projects: [
        {
          title: 'CampusHub Student Marketplace',
          subtitle: 'Full-Stack E-Commerce & Housing Platform',
          description: 'Designed and deployed a full-stack student web application utilizing React, Node.js, and PostgreSQL for peer-to-peer textbook and sublease listings.',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Express', 'JWT'],
          impact: 'Used by 1,200+ university students; handled 4,500+ verified listings with zero security vulnerabilities.',
        },
        {
          title: 'Autonomous Pathfinding Visualizer',
          subtitle: 'Interactive Algorithm Demonstration Tool',
          description: 'Created an interactive visual simulation demonstrating Dijkstra, A*, and BFS shortest-path algorithms.',
          technologies: ['Python', 'Pygame', 'Data Structures'],
          impact: 'Shared with CS department faculty and utilized as educational demo for 150+ freshman students.',
        },
      ],
      certifications: [
        { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024' },
      ],
      awards: [
        { title: '1st Place Winner – NC State Annual Hackathon', issuer: 'NC State Hackathon', year: '2024', description: 'Led 4-person team building an AI-powered study assistance application in 24 hours.' },
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
      ],
    },
    summaryExamples: [
      {
        level: 'Entry-Level / Recent Graduate',
        text: 'High-achieving Computer Science graduate (3.85 GPA) with strong technical foundation in full-stack software development, object-oriented programming, and relational database systems using Python, Java, React, and SQL. Completed two software engineering internships and led an award-winning senior capstone project.',
      },
      {
        level: 'College Student (Internship Seeker)',
        text: 'Motivated 3rd-year Computer Science student with hands-on project experience in web development (React, Node.js) and database management. Eager to leverage strong algorithm problem-solving skills and academic excellence in a software engineering summer internship.',
      },
    ],
    keySkillsCategorized: [
      { categoryName: 'Core Languages', skills: ['Python', 'Java', 'JavaScript', 'C++', 'SQL'] },
      { categoryName: 'Web & Tools', skills: ['React', 'Node.js', 'Git/GitHub', 'Docker', 'Linux'] },
      { categoryName: 'CS Fundamentals', skills: ['Data Structures', 'Algorithms', 'OOP Design', 'REST APIs'] },
    ],
    keySkills: [
      'Python, Java, JavaScript, TypeScript, C++, SQL',
      'React.js, Node.js, Express, HTML5/CSS3, Tailwind CSS',
      'Git/GitHub, Docker, Linux/Bash, RESTful APIs, OOP',
      'Data Structures, Algorithms, Problem Solving, Team Collaboration',
    ],
    experienceBullets: [
      'Built REST API endpoints in Python and PostgreSQL, improving endpoint execution speed by 20%.',
      'Developed automated unit test suite with pytest, maintaining 88% test coverage.',
      'Led 4-person team to 1st place in university hackathon among 60+ participating engineering teams.',
      'Mentored 45 undergraduate students in Java data structures and algorithm analysis.',
    ],
    educationAdvice: 'Place your Education section near the top of your resume above Work Experience. Include your GPA (if 3.5+), academic honors, and relevant coursework.',
    actionVerbs: ['Developed', 'Collaborated', 'Engineered', 'Assisted', 'Built', 'Resolved', 'Mentored', 'Presented'],
    atsKeywords: ['Computer Science', 'Python', 'Java', 'React', 'SQL', 'Git', 'Data Structures', 'Algorithms', 'Internship', 'Bachelor of Science', 'REST API'],
    atsTips: [
      'Place high emphasis on coursework, academic projects, hackathons, and technical skills.',
      'List GPA if 3.5 or above, along with Dean’s List or academic scholarship honors.',
    ],
    commonMistakes: [
      {
        mistake: 'Leaving off projects due to a lack of formal full-time employment history.',
        fix: 'Treat major academic capstones and open-source projects with the same detail and bullet metrics as job entries.',
      },
    ],
    roleSpecificFaqs: [
      {
        question: 'What should fresh graduates put on their resume without work experience?',
        answer: 'Highlight senior capstone projects, internships, open-source repositories, university leadership roles, and technical coursework.',
      },
    ],
    recommendedTemplateId: 'sidebar-left-minimal-gray',
  },
];
