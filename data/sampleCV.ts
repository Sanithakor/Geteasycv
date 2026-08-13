// Sample CV data for testing and preview

export type CVData = {
  personal: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    avatar?: string;
  };
  summary: string;
  experience: ExperienceItem[];
  skills: SkillItem[];
  education: EducationItem[];
  projects?: ProjectItem[];
  certifications?: CertificationItem[];
  languages?: LanguageItem[];
  interests?: string[];
  awards?: AwardItem[];
  contact?: ContactItem[];
};

export type ExperienceItem = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  location?: string;
  logo?: string;
};

export type SkillItem = {
  id: string;
  name: string;
  level: number; // 1-100
  category: 'technical' | 'soft' | 'language' | 'tool';
};

export type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
  logo?: string;
};

export type ProjectItem = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
  achievements?: string[];
  category?: string;
};

export type CertificationItem = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  link?: string;
  credentialId?: string;
  logo?: string;
};

export type LanguageItem = {
  id: string;
  name: string;
  proficiency: 'native' | 'fluent' | 'professional' | 'basic';
  flag?: string;
};

export type AwardItem = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
};

export type ContactItem = {
  id: string;
  type: 'email' | 'phone' | 'linkedin' | 'github' | 'website' | 'twitter' | 'instagram';
  value: string;
  label?: string;
};

// Default user image for all CV layouts
export const DUMMY_AVATAR = '/default-avatar.jpg';

export const sampleCV: CVData = {
  personal: {
    firstName: 'Sarah',
    lastName: 'Johnson',
    title: 'Senior Full Stack Engineer',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://sarahjohnson.dev',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    avatar: DUMMY_AVATAR,
  },

  summary:
    'Results-driven Senior Full Stack Engineer with 8+ years of experience designing, building, and scaling enterprise web applications used by millions of users worldwide. Deep expertise in React, TypeScript, Node.js, and cloud infrastructure. Proven track record of leading cross-functional teams, driving architectural decisions, and delivering measurable business impact. Passionate about clean code, developer experience, and building products that make a real difference.',

  experience: [
    {
      id: 'exp1',
      company: 'TechCorp Inc.',
      position: 'Senior Full Stack Engineer',
      startDate: 'Mar 2021',
      endDate: 'Present',
      current: true,
      location: 'San Francisco, CA',
      description:
        'Lead engineer on a platform serving 2M+ active users, owning the full product lifecycle from architecture to deployment across web and API layers.',
      achievements: [
        'Reduced average page load time by 42% via code-splitting, lazy loading, and CDN optimization — directly improving user retention by 18%',
        'Architected a microservices migration from a monolith, enabling independent deployments and cutting release cycles from 2 weeks to daily',
        'Led a team of 6 engineers through agile sprints, code reviews, and quarterly OKR planning',
        'Introduced infrastructure-as-code using Terraform and GitHub Actions, reducing manual DevOps effort by 70%',
        'Designed and shipped a real-time notifications system processing 500K+ events/day with zero downtime',
      ],
    },
    {
      id: 'exp2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: 'Jun 2018',
      endDate: 'Feb 2021',
      current: false,
      location: 'New York, NY',
      description:
        'Core engineer on a fast-growing B2B SaaS product, collaborating closely with product and design teams to ship new features every two weeks.',
      achievements: [
        'Built a real-time collaborative editing feature using WebSockets and CRDT algorithms, adopted by 50,000+ daily active users',
        'Grew test coverage from 28% to 87%, enabling confident refactors and reducing production bugs by 55%',
        'Integrated Stripe billing and subscription management, supporting 12 pricing tiers and $3M+ in ARR',
        'Mentored 3 junior engineers, running weekly 1:1s and pair programming sessions that accelerated their growth',
      ],
    },
    {
      id: 'exp3',
      company: 'Pixel & Craft Agency',
      position: 'Frontend Developer',
      startDate: 'Jan 2016',
      endDate: 'May 2018',
      current: false,
      location: 'Los Angeles, CA',
      description:
        'Developed responsive, high-performance web interfaces for 30+ clients across e-commerce, media, and finance sectors.',
      achievements: [
        'Delivered 25+ client projects on schedule and within budget, achieving a 98% client satisfaction rate',
        'Built a reusable component library that cut UI development time by 35% across all client projects',
        'Improved Lighthouse performance scores from an average of 54 to 91 across 10 client sites',
        'Achieved WCAG 2.1 AA accessibility compliance on all new projects, expanding client user bases',
      ],
    },
    {
      id: 'exp4',
      company: 'DataViz Labs',
      position: 'Junior Web Developer',
      startDate: 'Jul 2014',
      endDate: 'Dec 2015',
      current: false,
      location: 'Austin, TX',
      description:
        'Contributed to data visualization tools and internal dashboards used by analysts and data scientists.',
      achievements: [
        'Developed interactive chart components using D3.js and SVG, used across 5 internal analytics tools',
        'Reduced dashboard data-load time by 30% by implementing API response caching and pagination',
        'Collaborated with data scientists to translate complex datasets into intuitive visual interfaces',
      ],
    },
  ],

  skills: [
    { id: 's1',  name: 'React',             level: 95, category: 'technical' },
    { id: 's2',  name: 'TypeScript',         level: 92, category: 'technical' },
    { id: 's3',  name: 'Node.js',            level: 88, category: 'technical' },
    { id: 's4',  name: 'Next.js',            level: 93, category: 'technical' },
    { id: 's5',  name: 'PostgreSQL',         level: 84, category: 'technical' },
    { id: 's6',  name: 'GraphQL',            level: 80, category: 'technical' },
    { id: 's7',  name: 'AWS',                level: 78, category: 'technical' },
    { id: 's8',  name: 'Docker',             level: 76, category: 'technical' },
    { id: 's9',  name: 'Redis',              level: 74, category: 'technical' },
    { id: 's10', name: 'Tailwind CSS',       level: 96, category: 'technical' },
    { id: 's11', name: 'Python',             level: 70, category: 'technical' },
    { id: 's12', name: 'CI/CD',              level: 82, category: 'tool' },
    { id: 's13', name: 'Git & GitHub',       level: 94, category: 'tool' },
    { id: 's14', name: 'Figma',              level: 72, category: 'tool' },
    { id: 's15', name: 'Team Leadership',    level: 90, category: 'soft' },
    { id: 's16', name: 'System Design',      level: 86, category: 'soft' },
    { id: 's17', name: 'Problem Solving',    level: 95, category: 'soft' },
    { id: 's18', name: 'Communication',      level: 90, category: 'soft' },
  ],

  education: [
    {
      id: 'edu1',
      institution: 'Stanford University',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: 'Sep 2012',
      endDate: 'Jun 2014',
      gpa: '3.9 / 4.0',
      honors: ["Dean's List", 'Graduate Research Fellowship', 'Best Thesis Award'],
    },
    {
      id: 'edu2',
      institution: 'UC Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science & Mathematics',
      startDate: 'Sep 2008',
      endDate: 'May 2012',
      gpa: '3.8 / 4.0',
      honors: ['Summa Cum Laude', "President's Honor Roll", 'Phi Beta Kappa'],
    },
  ],

  projects: [
    {
      id: 'proj1',
      name: 'ShopFlow — E-Commerce Platform',
      description:
        'Full-featured multi-vendor e-commerce platform with real-time inventory, AI-powered recommendations, and seamless checkout. Handles 10K+ concurrent users with sub-200ms response times.',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Stripe', 'AWS S3'],
      link: 'https://github.com/sarahjohnson/shopflow',
      achievements: [
        'Processed over $2M in transactions in the first 12 months after launch',
        'Achieved 99.95% uptime with automated health checks and zero-downtime deployments',
        'AI recommendation engine increased average order value by 22%',
      ],
    },
    {
      id: 'proj2',
      name: 'Collab — Real-Time Task Manager',
      description:
        'Collaborative task and project management app with live cursor sharing, real-time comments, and Kanban boards. Built for remote-first teams of up to 500 members.',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Docker'],
      link: 'https://github.com/sarahjohnson/collab',
      achievements: [
        'Adopted by 200+ teams and 8,000+ users within 3 months of public launch',
        'Real-time sync latency under 50ms even at peak load',
      ],
    },
    {
      id: 'proj3',
      name: 'PulseBoard — Analytics Dashboard',
      description:
        'Real-time business analytics dashboard with customizable widgets, drill-down charts, and automated reporting. Integrates with 15+ data sources including Salesforce, HubSpot, and Google Analytics.',
      technologies: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'ClickHouse'],
      link: 'https://github.com/sarahjohnson/pulseboard',
      achievements: [
        'Reduced weekly reporting time from 4 hours to 10 minutes for 50+ business users',
        'Handles 1M+ data points per dashboard with smooth 60fps chart animations',
      ],
    },
    {
      id: 'proj4',
      name: 'AuthKit — Open Source Auth Library',
      description:
        'Lightweight, framework-agnostic authentication library supporting OAuth 2.0, SAML, and passwordless flows. Published on npm with full TypeScript support.',
      technologies: ['TypeScript', 'OAuth 2.0', 'JWT', 'PKCE', 'WebAuthn'],
      link: 'https://github.com/sarahjohnson/authkit',
      achievements: [
        'Reached 1,200+ GitHub stars and 15,000+ weekly npm downloads within 6 months',
        'Zero critical security vulnerabilities since initial release, audited quarterly',
      ],
    },
  ],

  certifications: [
    {
      id: 'cert1',
      name: 'AWS Solutions Architect — Professional',
      issuer: 'Amazon Web Services',
      date: 'Jan 2023',
      credentialId: 'AWS-SAP-2023-001',
      link: 'https://aws.amazon.com/certification',
    },
    {
      id: 'cert2',
      name: 'Google Cloud Professional Cloud Architect',
      issuer: 'Google Cloud',
      date: 'Aug 2022',
      credentialId: 'GCP-PCA-2022-447',
    },
    {
      id: 'cert3',
      name: 'Meta React Developer Certificate',
      issuer: 'Meta',
      date: 'Mar 2022',
      credentialId: 'META-REACT-2022-883',
    },
    {
      id: 'cert4',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation',
      date: 'Nov 2021',
      credentialId: 'CKA-2021-5512',
    },
  ],

  languages: [
    { id: 'lang1', name: 'English',  proficiency: 'native',       flag: '🇺🇸' },
    { id: 'lang2', name: 'Spanish',  proficiency: 'fluent',        flag: '🇪🇸' },
    { id: 'lang3', name: 'French',   proficiency: 'professional',  flag: '🇫🇷' },
    { id: 'lang4', name: 'Mandarin', proficiency: 'basic',         flag: '🇨🇳' },
  ],

  interests: [
    'Open Source Contributing',
    'Technical Blogging',
    'UI/UX Design',
    'Rock Climbing',
    'Photography',
    'Travel & Culture',
    'Mentoring',
    'Coffee Enthusiast',
  ],

  awards: [
    {
      id: 'award1',
      title: 'Engineer of the Year',
      issuer: 'TechCorp Inc.',
      date: '2023',
      description:
        'Awarded to one engineer company-wide for exceptional technical leadership, innovation, and measurable impact on product quality and team growth.',
    },
    {
      id: 'award2',
      title: 'Best Innovation Award',
      issuer: 'StartupXYZ',
      date: '2020',
      description:
        'Recognized for designing and shipping the real-time collaboration feature that became the product\'s highest-rated capability in customer surveys.',
    },
    {
      id: 'award3',
      title: 'Open Source Contributor of the Month',
      issuer: 'DEV Community',
      date: '2022',
      description:
        'Featured for AuthKit library contributions and community support, with 200+ merged pull requests in major open source projects.',
    },
  ],

  contact: [
    { id: 'c1', type: 'email',    value: 'sarah.johnson@email.com',      label: 'Email'    },
    { id: 'c2', type: 'phone',    value: '+1 (555) 123-4567',            label: 'Phone'    },
    { id: 'c3', type: 'linkedin', value: 'linkedin.com/in/sarahjohnson', label: 'LinkedIn' },
    { id: 'c4', type: 'github',   value: 'github.com/sarahjohnson',      label: 'GitHub'   },
    { id: 'c5', type: 'website',  value: 'sarahjohnson.dev',             label: 'Website'  },
    { id: 'c6', type: 'twitter',  value: 'twitter.com/sarahj_dev',       label: 'Twitter'  },
  ],
};

export const getEmptyCV = (): CVData => ({
  personal: {
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
  },
  summary: '',
  experience: [],
  skills: [],
  education: [],
});
