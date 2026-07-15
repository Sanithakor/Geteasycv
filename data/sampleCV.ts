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
  name: string;
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

// Dummy user image - professional placeholder avatar
export const DUMMY_AVATAR = 'https://i.pravatar.cc/400?img=32';

export const sampleCV: CVData = {
  personal: {
    firstName: 'Sarah',
    lastName: 'Johnson',
    title: 'Senior Full Stack Developer',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://sarahjohnson.dev',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    avatar: DUMMY_AVATAR,
  },
  summary:
    'Results-driven Senior Full Stack Developer with 8+ years of experience building scalable web applications. Proven track record of leading technical teams, optimizing performance, and delivering high-quality solutions. Passionate about clean code, best practices, and continuous learning.',
  experience: [
    {
      id: 'exp1',
      company: 'TechCorp Inc.',
      position: 'Senior Full Stack Developer',
      startDate: '2021-03',
      endDate: 'Present',
      current: true,
      description:
        'Leading the development of enterprise-level web applications serving 1M+ users.',
      achievements: [
        'Reduced application load time by 40% through performance optimization',
        'Led a team of 5 developers, conducting code reviews and mentoring junior engineers',
        'Architected and implemented microservices architecture, improving system scalability',
        'Introduced CI/CD pipelines, reducing deployment time by 60%',
      ],
      location: 'San Francisco, CA',
    },
    {
      id: 'exp2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      description:
        'Developed and maintained multiple client-facing web applications using React and Node.js.',
      achievements: [
        'Built real-time collaboration features used by 50,000+ daily active users',
        'Implemented automated testing coverage increasing from 30% to 85%',
        'Mentored 3 junior developers through onboarding and skill development',
      ],
      location: 'New York, NY',
    },
    {
      id: 'exp3',
      company: 'WebAgency Co.',
      position: 'Frontend Developer',
      startDate: '2016-01',
      endDate: '2018-05',
      current: false,
      description:
        'Created responsive, accessible web interfaces for diverse client projects.',
      achievements: [
        'Delivered 20+ client projects on time and under budget',
        'Implemented design system used across all client projects',
        'Improved website accessibility compliance to WCAG 2.1 AA standards',
      ],
      location: 'Los Angeles, CA',
    },
  ],
  skills: [
    { id: 's1', name: 'React', level: 95, category: 'technical' },
    { id: 's2', name: 'TypeScript', level: 90, category: 'technical' },
    { id: 's3', name: 'Node.js', level: 88, category: 'technical' },
    { id: 's4', name: 'Next.js', level: 92, category: 'technical' },
    { id: 's5', name: 'PostgreSQL', level: 85, category: 'technical' },
    { id: 's6', name: 'GraphQL', level: 80, category: 'technical' },
    { id: 's7', name: 'AWS', level: 75, category: 'technical' },
    { id: 's8', name: 'Docker', level: 78, category: 'technical' },
    { id: 's9', name: 'Team Leadership', level: 90, category: 'soft' },
    { id: 's10', name: 'Problem Solving', level: 95, category: 'soft' },
    { id: 's11', name: 'Communication', level: 88, category: 'soft' },
    { id: 's12', name: 'Project Management', level: 82, category: 'soft' },
  ],
  education: [
    {
      id: 'edu1',
      institution: 'Stanford University',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: '2014-09',
      endDate: '2016-06',
      gpa: '3.9/4.0',
      honors: ["Dean's List", 'Graduate Research Fellowship'],
    },
    {
      id: 'edu2',
      institution: 'UC Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2010-09',
      endDate: '2014-05',
      gpa: '3.8/4.0',
      honors: ['Summa Cum Laude', "President's Honor Roll"],
    },
  ],
  projects: [
    {
      id: 'proj1',
      name: 'E-Commerce Platform',
      description:
        'Built a full-featured e-commerce platform with real-time inventory management.',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
      link: 'https://github.com/sarahjohnson/ecommerce',
      achievements: [
        'Processed $1M+ in transactions in the first year',
        'Achieved 99.9% uptime through robust error handling',
      ],
    },
    {
      id: 'proj2',
      name: 'Task Management App',
      description:
        'Collaborative task management application with real-time updates.',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      link: 'https://github.com/sarahjohnson/taskapp',
    },
    {
      id: 'proj3',
      name: 'Analytics Dashboard',
      description: 'Real-time analytics dashboard with interactive charts and visualizations.',
      technologies: ['Vue.js', 'D3.js', 'Python', 'FastAPI'],
      link: 'https://github.com/sarahjohnson/analytics',
    },
  ],
  certifications: [
    {
      id: 'cert1',
      name: 'AWS Solutions Architect Professional',
      issuer: 'Amazon Web Services',
      date: '2023-01',
      link: 'https://aws.amazon.com/certification',
    },
    {
      id: 'cert2',
      name: 'Google Cloud Professional',
      issuer: 'Google',
      date: '2022-06',
    },
    {
      id: 'cert3',
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '2021-09',
    },
  ],
  languages: [
    { id: 'lang1', name: 'English', proficiency: 'native' },
    { id: 'lang2', name: 'Spanish', proficiency: 'professional' },
    { id: 'lang3', name: 'Mandarin', proficiency: 'basic' },
  ],
  interests: ['Open Source Contributing', 'Tech Blogging', 'Hiking', 'Photography', 'Travel'],
  awards: [
    {
      id: 'award1',
      name: 'Employee of the Year',
      issuer: 'TechCorp Inc.',
      date: '2023',
      description: 'Recognized for outstanding contributions to company success',
    },
    {
      id: 'award2',
      name: 'Best Innovation Award',
      issuer: 'StartupXYZ',
      date: '2020',
      description: 'Awarded for developing a novel real-time collaboration feature',
    },
  ],
  contact: [
    { id: 'c1', type: 'email', value: 'sarah.johnson@email.com', label: 'Email' },
    { id: 'c2', type: 'phone', value: '+1 (555) 123-4567', label: 'Phone' },
    { id: 'c3', type: 'linkedin', value: 'linkedin.com/in/sarahjohnson', label: 'LinkedIn' },
    { id: 'c4', type: 'github', value: 'github.com/sarahjohnson', label: 'GitHub' },
    { id: 'c5', type: 'website', value: 'sarahjohnson.dev', label: 'Website' },
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