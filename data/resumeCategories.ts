// Category-Based Resume Data Management System
// Professionally written, industry-specific resume content for all categories

import { CVData } from './sampleCV';

export type ResumeCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  popularRoles: string[];
  requiredSkills: string[];
  sampleData: CVData;
  isActive: boolean;
  sortOrder: number;
};

export const resumeCategories: ResumeCategory[] = [
  {
    id: 'software-development',
    name: 'Software Development',
    description: 'For software engineers, developers, and programmers across all tech stacks',
    icon: '💻',
    color: '#4F46E5',
    popularRoles: [
      'Software Engineer',
      'Full Stack Developer',
      'Backend Developer',
      'Frontend Developer',
      'Mobile Developer',
      'DevOps Engineer'
    ],
    requiredSkills: [
      'JavaScript', 'Python', 'React', 'Node.js', 'Git', 'SQL', 'AWS', 'Docker'
    ],
    isActive: true,
    sortOrder: 1,
    sampleData: {
      personal: {
        firstName: 'Alex',
        lastName: 'Rodriguez',
        title: 'Senior Full Stack Developer',
        email: 'alex.rodriguez@email.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        website: 'https://alexrodriguez.dev',
        linkedin: 'https://linkedin.com/in/alexrodriguez',
      },
      summary: 'Passionate Full Stack Developer with 6+ years of experience building scalable web applications and microservices. Expertise in React, Node.js, Python, and cloud infrastructure. Proven track record of delivering high-quality software solutions that drive business growth and improve user experience. Strong advocate for clean code, test-driven development, and agile methodologies.',
      experience: [
        {
          id: 'exp1',
          company: 'TechFlow Solutions',
          position: 'Senior Full Stack Developer',
          startDate: 'Jun 2022',
          endDate: 'Present',
          current: true,
          location: 'San Francisco, CA',
          description: 'Lead development of enterprise SaaS platform serving 100K+ users, managing full development lifecycle from requirements to deployment.',
          achievements: [
            'Architected microservices infrastructure that improved system performance by 45% and reduced server costs by $200K annually',
            'Led a cross-functional team of 5 engineers in migrating legacy PHP application to modern React/Node.js stack',
            'Implemented CI/CD pipeline reducing deployment time from 4 hours to 15 minutes with zero-downtime deployments',
            'Designed RESTful APIs handling 10M+ requests daily with 99.9% uptime using Node.js, Express, and PostgreSQL',
            'Mentored 3 junior developers, conducting code reviews and establishing best practices that improved code quality by 30%'
          ],
        },
        {
          id: 'exp2',
          company: 'Digital Innovations Inc.',
          position: 'Full Stack Developer',
          startDate: 'Mar 2020',
          endDate: 'May 2022',
          current: false,
          location: 'Austin, TX',
          description: 'Developed and maintained multiple client-facing web applications using modern JavaScript frameworks and cloud services.',
          achievements: [
            'Built responsive e-commerce platform with React and Redux, increasing client sales by 35% within 6 months',
            'Integrated payment systems (Stripe, PayPal) processing $2M+ in transactions with 99.95% success rate',
            'Optimized database queries and implemented caching strategies, reducing page load times by 60%',
            'Collaborated with UX/UI designers to implement pixel-perfect interfaces with excellent accessibility standards'
          ],
        },
        {
          id: 'exp3',
          company: 'CodeCraft Solutions',
          position: 'Frontend Developer',
          startDate: 'Jan 2018',
          endDate: 'Feb 2020',
          current: false,
          location: 'Remote',
          description: 'Specialized in creating modern, responsive user interfaces for web and mobile applications.',
          achievements: [
            'Developed component library used across 12 projects, reducing development time by 40%',
            'Implemented Progressive Web App (PWA) features increasing user engagement by 25%',
            'Collaborated with backend team to design and consume RESTful APIs for dynamic content management'
          ],
        }
      ],
      skills: [
        { id: 's1', name: 'JavaScript', level: 95, category: 'technical' },
        { id: 's2', name: 'React', level: 92, category: 'technical' },
        { id: 's3', name: 'Node.js', level: 90, category: 'technical' },
        { id: 's4', name: 'TypeScript', level: 88, category: 'technical' },
        { id: 's5', name: 'Python', level: 85, category: 'technical' },
        { id: 's6', name: 'PostgreSQL', level: 82, category: 'technical' },
        { id: 's7', name: 'AWS', level: 80, category: 'technical' },
        { id: 's8', name: 'Docker', level: 78, category: 'technical' },
        { id: 's9', name: 'Redux', level: 85, category: 'technical' },
        { id: 's10', name: 'GraphQL', level: 75, category: 'technical' },
        { id: 's11', name: 'Git & GitHub', level: 95, category: 'tool' },
        { id: 's12', name: 'Jenkins', level: 72, category: 'tool' },
        { id: 's13', name: 'Jira', level: 80, category: 'tool' },
        { id: 's14', name: 'Problem Solving', level: 95, category: 'soft' },
        { id: 's15', name: 'Team Leadership', level: 85, category: 'soft' },
        { id: 's16', name: 'Agile Methodology', level: 90, category: 'soft' }
      ],
      education: [
        {
          id: 'edu1',
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: 'Sep 2014',
          endDate: 'May 2018',
          gpa: '3.7 / 4.0',
          honors: ["Dean's List", 'Computer Science Honor Society']
        }
      ],
      projects: [
        {
          id: 'proj1',
          name: 'TaskMaster Pro',
          description: 'Full-stack project management application with real-time collaboration, file sharing, and team analytics. Built with React, Node.js, Socket.io, and MongoDB.',
          technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis', 'AWS S3'],
          link: 'https://github.com/alexrodriguez/taskmaster-pro',
          achievements: [
            'Serves 5,000+ active users with real-time updates and 99.9% uptime',
            'Implemented WebSocket architecture supporting concurrent collaboration for 100+ users per workspace'
          ]
        },
        {
          id: 'proj2',
          name: 'WeatherAPI Dashboard',
          description: 'Modern weather dashboard consuming multiple APIs with interactive charts, geolocation, and push notifications. Features offline-first PWA capabilities.',
          technologies: ['Vue.js', 'D3.js', 'Service Workers', 'IndexedDB', 'OpenWeather API'],
          link: 'https://github.com/alexrodriguez/weather-dashboard',
          achievements: [
            'Achieved 95+ Lighthouse performance score with advanced caching strategies',
            'Integrated with 3 weather APIs providing reliable forecast data with 99.5% availability'
          ]
        }
      ],
      certifications: [
        {
          id: 'cert1',
          name: 'AWS Certified Solutions Architect',
          issuer: 'Amazon Web Services',
          date: 'Mar 2023',
          credentialId: 'AWS-SAA-2023-445'
        },
        {
          id: 'cert2',
          name: 'Meta React Developer Certificate',
          issuer: 'Meta',
          date: 'Jan 2023',
          credentialId: 'META-REACT-2023-776'
        }
      ],
      languages: [
        { id: 'lang1', name: 'English', proficiency: 'native', flag: '🇺🇸' },
        { id: 'lang2', name: 'Spanish', proficiency: 'fluent', flag: '🇪🇸' }
      ],
      interests: [
        'Open Source Contributing',
        'Machine Learning',
        'Cloud Architecture',
        'Hiking',
        'Photography',
        'Tech Meetups'
      ],
      awards: [
        {
          id: 'award1',
          title: 'Developer of the Year',
          issuer: 'TechFlow Solutions',
          date: '2023',
          description: 'Recognized for outstanding technical contributions and leadership in modernizing the entire platform architecture.'
        }
      ]
    }
  },

  {
    id: 'ui-ux-design',
    name: 'UI/UX Design',
    description: 'For user interface designers, user experience designers, and design systems specialists',
    icon: '🎨',
    color: '#EC4899',
    popularRoles: [
      'UI/UX Designer',
      'Product Designer',
      'Visual Designer',
      'Interaction Designer',
      'Design Systems Designer',
      'User Researcher'
    ],
    requiredSkills: [
      'Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems', 'HTML/CSS', 'JavaScript'
    ],
    isActive: true,
    sortOrder: 2,
    sampleData: {
      personal: {
        firstName: 'Maya',
        lastName: 'Chen',
        title: 'Senior Product Designer',
        email: 'maya.chen@email.com',
        phone: '+1 (555) 345-6789',
        location: 'New York, NY',
        website: 'https://mayachen.design',
        linkedin: 'https://linkedin.com/in/mayachen',
      },
      summary: 'Creative Product Designer with 5+ years of experience crafting user-centered digital experiences for web and mobile applications. Expertise in design thinking, user research, prototyping, and design systems. Proven track record of improving user engagement by 40% and reducing user drop-off rates through data-driven design decisions. Passionate about creating accessible, inclusive designs that solve real user problems.',
      experience: [
        {
          id: 'exp1',
          company: 'Spotify',
          position: 'Senior Product Designer',
          startDate: 'Aug 2022',
          endDate: 'Present',
          current: true,
          location: 'New York, NY',
          description: 'Lead design for premium subscription experience serving 200M+ users, collaborating with product managers, engineers, and data scientists.',
          achievements: [
            'Redesigned onboarding flow increasing premium conversion rate by 32% and reducing drop-off by 45%',
            'Led design system initiative creating 150+ reusable components used across 12 product teams',
            'Conducted user research with 500+ participants, uncovering insights that shaped 3 major product features',
            'Collaborated with engineering to implement design tokens, reducing design-to-development handoff time by 50%',
            'Mentored 2 junior designers and established design critique processes improving team design quality'
          ],
        },
        {
          id: 'exp2',
          company: 'Airbnb',
          position: 'Product Designer',
          startDate: 'Jun 2020',
          endDate: 'Jul 2022',
          current: false,
          location: 'San Francisco, CA',
          description: 'Designed end-to-end user experiences for host and guest platforms, focusing on trust, safety, and community building.',
          achievements: [
            'Designed trust and safety features reducing fraudulent bookings by 25% and improving host confidence scores',
            'Created responsive booking flow increasing mobile conversion rates by 28% across iOS and Android platforms',
            'Led cross-functional workshops with 20+ stakeholders to align on product vision and design strategy',
            'Prototyped and tested 15+ design concepts using Figma, Principle, and user testing tools'
          ],
        },
        {
          id: 'exp3',
          company: 'Robinhood',
          position: 'UI/UX Designer',
          startDate: 'Jan 2019',
          endDate: 'May 2020',
          current: false,
          location: 'Menlo Park, CA',
          description: 'Focused on designing intuitive financial interfaces and educational experiences for first-time investors.',
          achievements: [
            'Designed educational content system increasing user financial literacy engagement by 60%',
            'Simplified investment portfolio interface reducing user confusion by 40% based on usability testing',
            'Created accessibility guidelines ensuring WCAG 2.1 AA compliance across all product features'
          ],
        }
      ],
      skills: [
        { id: 's1', name: 'Figma', level: 98, category: 'technical' },
        { id: 's2', name: 'Sketch', level: 90, category: 'technical' },
        { id: 's3', name: 'Adobe XD', level: 85, category: 'technical' },
        { id: 's4', name: 'Principle', level: 88, category: 'technical' },
        { id: 's5', name: 'Framer', level: 80, category: 'technical' },
        { id: 's6', name: 'InVision', level: 85, category: 'technical' },
        { id: 's7', name: 'Adobe Creative Suite', level: 92, category: 'technical' },
        { id: 's8', name: 'HTML/CSS', level: 75, category: 'technical' },
        { id: 's9', name: 'JavaScript', level: 65, category: 'technical' },
        { id: 's10', name: 'Design Systems', level: 95, category: 'technical' },
        { id: 's11', name: 'User Research', level: 90, category: 'soft' },
        { id: 's12', name: 'Design Thinking', level: 95, category: 'soft' },
        { id: 's13', name: 'Prototyping', level: 92, category: 'soft' },
        { id: 's14', name: 'Usability Testing', level: 88, category: 'soft' },
        { id: 's15', name: 'Workshop Facilitation', level: 85, category: 'soft' },
        { id: 's16', name: 'Cross-team Collaboration', level: 90, category: 'soft' }
      ],
      education: [
        {
          id: 'edu1',
          institution: 'Rhode Island School of Design',
          degree: 'Bachelor of Fine Arts',
          field: 'Graphic Design',
          startDate: 'Sep 2015',
          endDate: 'May 2019',
          gpa: '3.8 / 4.0',
          honors: ['Magna Cum Laude', 'RISD Honor Society']
        }
      ],
      projects: [
        {
          id: 'proj1',
          name: 'EcoTrade Mobile App',
          description: 'Sustainable marketplace mobile app connecting eco-conscious consumers with local green businesses. Complete UX research, design system, and high-fidelity prototypes.',
          technologies: ['Figma', 'Principle', 'Maze', 'Hotjar', 'User Interviews'],
          link: 'https://mayachen.design/ecotrade',
          achievements: [
            'Conducted user research with 50+ participants revealing key insights about sustainable shopping behaviors',
            '95% task completion rate in usability testing with average SUS score of 89/100'
          ]
        },
        {
          id: 'proj2',
          name: 'FinanceFlow Dashboard',
          description: 'Enterprise financial dashboard redesign focusing on data visualization and workflow optimization for financial analysts and executives.',
          technologies: ['Figma', 'D3.js', 'Tableau', 'Miro', 'UserVoice'],
          link: 'https://mayachen.design/financeflow',
          achievements: [
            'Reduced task completion time by 45% through simplified navigation and improved data hierarchy',
            'Designed accessible color system meeting WCAG AAA standards for critical financial data'
          ]
        }
      ],
      certifications: [
        {
          id: 'cert1',
          name: 'Google UX Design Certificate',
          issuer: 'Google',
          date: 'Feb 2023',
          credentialId: 'GOOGLE-UX-2023-334'
        },
        {
          id: 'cert2',
          name: 'Certified Usability Analyst',
          issuer: 'Human Factors International',
          date: 'Nov 2022',
          credentialId: 'HFI-CUA-2022-887'
        }
      ],
      languages: [
        { id: 'lang1', name: 'English', proficiency: 'native', flag: '🇺🇸' },
        { id: 'lang2', name: 'Mandarin', proficiency: 'native', flag: '🇨🇳' }
      ],
      interests: [
        'Design Systems',
        'Accessibility Design',
        'Digital Art',
        'Photography',
        'Sustainable Design',
        'Design Communities'
      ],
      awards: [
        {
          id: 'award1',
          title: 'Design Excellence Award',
          issuer: 'Spotify',
          date: '2023',
          description: 'Awarded for exceptional design impact on premium subscription experience and design system leadership.'
        }
      ]
    }
  },

  {
    id: 'marketing',
    name: 'Marketing',
    description: 'For digital marketers, content creators, and brand strategists',
    icon: '📈',
    color: '#10B981',
    popularRoles: [
      'Digital Marketing Manager',
      'Content Marketing Specialist',
      'Social Media Manager',
      'Marketing Coordinator',
      'Brand Manager',
      'Growth Marketing Manager'
    ],
    requiredSkills: [
      'Google Analytics', 'SEO', 'SEM', 'Content Strategy', 'Social Media', 'Email Marketing', 'A/B Testing', 'Marketing Automation'
    ],
    isActive: true,
    sortOrder: 3,
    sampleData: {
      personal: {
        firstName: 'Jordan',
        lastName: 'Taylor',
        title: 'Digital Marketing Manager',
        email: 'jordan.taylor@email.com',
        phone: '+1 (555) 456-7890',
        location: 'Chicago, IL',
        website: 'https://jordantaylor.marketing',
        linkedin: 'https://linkedin.com/in/jordantaylor',
      },
      summary: 'Results-driven Digital Marketing Manager with 7+ years of experience developing and executing comprehensive marketing strategies that drive growth and brand awareness. Expertise in SEO, SEM, content marketing, and marketing automation. Proven track record of increasing website traffic by 250%, generating $2M+ in qualified leads, and managing marketing budgets up to $500K annually.',
      experience: [
        {
          id: 'exp1',
          company: 'HubSpot',
          position: 'Senior Digital Marketing Manager',
          startDate: 'Apr 2021',
          endDate: 'Present',
          current: true,
          location: 'Boston, MA (Remote)',
          description: 'Lead integrated marketing campaigns for enterprise segment, managing $400K annual budget and cross-functional team of 8 marketing professionals.',
          achievements: [
            'Increased qualified lead generation by 180% through strategic SEO optimization and content marketing initiatives',
            'Launched account-based marketing program targeting Fortune 500 companies, generating $1.8M in pipeline within 6 months',
            'Reduced customer acquisition cost by 35% while improving lead quality scores by 50% through marketing automation',
            'Managed Google Ads campaigns with $200K monthly spend, achieving 4.2x ROAS and 28% conversion rate improvement',
            'Built and optimized marketing attribution model providing clear ROI insights across all channels and campaigns'
          ],
        },
        {
          id: 'exp2',
          company: 'Mailchimp',
          position: 'Digital Marketing Specialist',
          startDate: 'Jun 2019',
          endDate: 'Mar 2021',
          current: false,
          location: 'Atlanta, GA',
          description: 'Executed multi-channel marketing campaigns focusing on small business segment, managing email marketing, social media, and paid advertising.',
          achievements: [
            'Grew email subscriber base by 320% through lead magnets, webinar campaigns, and referral programs',
            'Increased organic search traffic by 150% in 18 months through comprehensive SEO strategy and content creation',
            'Managed social media presence across 5 platforms, growing follower base by 200% and engagement by 85%',
            'A/B tested 50+ email campaigns achieving 25% average open rate and 4.8% click-through rate'
          ],
        },
        {
          id: 'exp3',
          company: 'Buffer',
          position: 'Content Marketing Coordinator',
          startDate: 'Aug 2017',
          endDate: 'May 2019',
          current: false,
          location: 'San Francisco, CA',
          description: 'Created and distributed content across multiple channels to drive brand awareness and customer engagement.',
          achievements: [
            'Produced 200+ blog posts, case studies, and whitepapers generating 500K+ monthly organic page views',
            'Launched podcast series reaching 10K+ monthly downloads and featuring 50+ industry thought leaders',
            'Collaborated with design team to create visual content achieving 40% higher engagement than text-only posts'
          ],
        }
      ],
      skills: [
        { id: 's1', name: 'Google Analytics', level: 95, category: 'technical' },
        { id: 's2', name: 'Google Ads', level: 90, category: 'technical' },
        { id: 's3', name: 'Facebook Ads', level: 88, category: 'technical' },
        { id: 's4', name: 'HubSpot', level: 92, category: 'technical' },
        { id: 's5', name: 'Salesforce', level: 80, category: 'technical' },
        { id: 's6', name: 'SEO/SEM', level: 93, category: 'technical' },
        { id: 's7', name: 'Email Marketing', level: 90, category: 'technical' },
        { id: 's8', name: 'Marketing Automation', level: 85, category: 'technical' },
        { id: 's9', name: 'A/B Testing', level: 88, category: 'technical' },
        { id: 's10', name: 'Content Strategy', level: 92, category: 'soft' },
        { id: 's11', name: 'Brand Management', level: 85, category: 'soft' },
        { id: 's12', name: 'Project Management', level: 88, category: 'soft' },
        { id: 's13', name: 'Data Analysis', level: 87, category: 'soft' },
        { id: 's14', name: 'Creative Thinking', level: 90, category: 'soft' },
        { id: 's15', name: 'Cross-team Collaboration', level: 92, category: 'soft' }
      ],
      education: [
        {
          id: 'edu1',
          institution: 'Northwestern University',
          degree: 'Bachelor of Arts',
          field: 'Marketing & Communications',
          startDate: 'Sep 2013',
          endDate: 'Jun 2017',
          gpa: '3.6 / 4.0',
          honors: ['Marketing Society President', 'Digital Marketing Certificate']
        }
      ],
      projects: [
        {
          id: 'proj1',
          name: 'B2B SaaS Growth Campaign',
          description: 'Comprehensive growth marketing campaign for enterprise software company including SEO, content marketing, paid advertising, and marketing automation workflows.',
          technologies: ['HubSpot', 'Google Analytics', 'SEMrush', 'Canva', 'Hotjar'],
          achievements: [
            'Generated 500+ qualified leads monthly with 45% conversion rate to sales opportunities',
            'Achieved 300% ROI on paid advertising spend across Google Ads and LinkedIn campaigns'
          ]
        }
      ],
      certifications: [
        {
          id: 'cert1',
          name: 'Google Analytics Certified',
          issuer: 'Google',
          date: 'Jan 2023',
          credentialId: 'GOOGLE-GA-2023-445'
        },
        {
          id: 'cert2',
          name: 'HubSpot Content Marketing Certification',
          issuer: 'HubSpot',
          date: 'Oct 2022',
          credentialId: 'HUBSPOT-CM-2022-667'
        },
        {
          id: 'cert3',
          name: 'Facebook Blueprint Certified',
          issuer: 'Meta',
          date: 'Sep 2022',
          credentialId: 'META-FB-2022-889'
        }
      ],
      languages: [
        { id: 'lang1', name: 'English', proficiency: 'native', flag: '🇺🇸' },
        { id: 'lang2', name: 'French', proficiency: 'professional', flag: '🇫🇷' }
      ],
      interests: [
        'Growth Hacking',
        'Marketing Technology',
        'Data Visualization',
        'Content Creation',
        'Digital Trends',
        'Marketing Conferences'
      ],
      awards: [
        {
          id: 'award1',
          title: 'Marketing Campaign of the Year',
          issuer: 'HubSpot',
          date: '2022',
          description: 'Recognized for innovative ABM campaign that exceeded pipeline targets by 220% and became company case study.'
        }
      ]
    }
  },
  // Continue with additional categories...
  {
    id: 'sales',
    name: 'Sales',
    description: 'For sales representatives, account managers, and business development professionals',
    icon: '🤝',
    color: '#F59E0B',
    popularRoles: [
      'Sales Representative',
      'Account Manager',
      'Business Development Manager',
      'Sales Manager',
      'Inside Sales Rep',
      'Account Executive'
    ],
    requiredSkills: [
      'CRM (Salesforce)', 'Lead Generation', 'Prospecting', 'Negotiation', 'Account Management', 'Sales Strategy', 'Customer Relationship Management'
    ],
    isActive: true,
    sortOrder: 4,
    sampleData: {
      personal: {
        firstName: 'Michael',
        lastName: 'Johnson',
        title: 'Senior Sales Manager',
        email: 'michael.johnson@email.com',
        phone: '+1 (555) 567-8901',
        location: 'Dallas, TX',
        website: 'https://michaeljohnson.sales',
        linkedin: 'https://linkedin.com/in/michaeljohnson',
      },
      summary: 'Results-oriented Sales Manager with 8+ years of experience exceeding revenue targets and building high-performing sales teams. Proven track record of generating $10M+ in annual revenue, managing enterprise accounts, and developing strategic partnerships. Expert in consultative selling, CRM management, and sales process optimization.',
      experience: [
        {
          id: 'exp1',
          company: 'Salesforce',
          position: 'Senior Enterprise Sales Manager',
          startDate: 'Jan 2021',
          endDate: 'Present',
          current: true,
          location: 'Dallas, TX',
          description: 'Manage enterprise sales territory generating $3M+ annual revenue, leading team of 6 sales representatives and managing 50+ strategic accounts.',
          achievements: [
            'Exceeded annual quota by 145% for three consecutive years, generating $12M in total revenue',
            'Closed largest deal in company history worth $2.1M with Fortune 100 manufacturing client',
            'Built and managed high-performing sales team achieving 128% of team quota and 95% retention rate',
            'Developed strategic partnership program increasing qualified leads by 65% and shortening sales cycle by 30%',
            'Implemented sales automation tools reducing administrative time by 40% and improving forecast accuracy to 95%'
          ],
        },
        {
          id: 'exp2',
          company: 'Oracle',
          position: 'Account Executive',
          startDate: 'Mar 2018',
          endDate: 'Dec 2020',
          current: false,
          location: 'Austin, TX',
          description: 'Managed portfolio of 75+ mid-market accounts focusing on cloud infrastructure and database solutions.',
          achievements: [
            'Achieved 135% of annual quota consistently, ranking in top 10% of global sales organization',
            'Grew existing account revenue by 180% through upselling and cross-selling cloud migration services',
            'Won "Rookie of the Year" award for exceptional performance and fastest ramp-up in company history',
            'Conducted 200+ product demonstrations and technical presentations to C-level executives'
          ],
        },
        {
          id: 'exp3',
          company: 'HubSpot',
          position: 'Inside Sales Representative',
          startDate: 'Jun 2016',
          endDate: 'Feb 2018',
          current: false,
          location: 'Boston, MA',
          description: 'Generated qualified leads and closed deals with small to medium-sized businesses using inbound sales methodology.',
          achievements: [
            'Consistently achieved 120%+ of monthly quota through consultative selling and relationship building',
            'Converted 35% of qualified leads to closed-won deals, exceeding company average by 15%',
            'Completed 500+ prospecting calls monthly and maintained detailed activity tracking in CRM'
          ],
        }
      ],
      skills: [
        { id: 's1', name: 'Salesforce CRM', level: 95, category: 'technical' },
        { id: 's2', name: 'HubSpot Sales', level: 90, category: 'technical' },
        { id: 's3', name: 'Lead Generation', level: 92, category: 'technical' },
        { id: 's4', name: 'Sales Analytics', level: 88, category: 'technical' },
        { id: 's5', name: 'Pipeline Management', level: 95, category: 'technical' },
        { id: 's6', name: 'Prospecting', level: 90, category: 'soft' },
        { id: 's7', name: 'Negotiation', level: 93, category: 'soft' },
        { id: 's8', name: 'Relationship Building', level: 95, category: 'soft' },
        { id: 's9', name: 'Consultative Selling', level: 92, category: 'soft' },
        { id: 's10', name: 'Account Management', level: 90, category: 'soft' },
        { id: 's11', name: 'Team Leadership', level: 88, category: 'soft' },
        { id: 's12', name: 'Strategic Planning', level: 85, category: 'soft' },
        { id: 's13', name: 'Presentation Skills', level: 92, category: 'soft' },
        { id: 's14', name: 'Customer Success', level: 90, category: 'soft' }
      ],
      education: [
        {
          id: 'edu1',
          institution: 'University of Texas at Austin',
          degree: 'Bachelor of Business Administration',
          field: 'Marketing & Sales',
          startDate: 'Sep 2012',
          endDate: 'May 2016',
          gpa: '3.5 / 4.0',
          honors: ['Sales Excellence Award', 'Business Honor Society']
        }
      ],
      certifications: [
        {
          id: 'cert1',
          name: 'Salesforce Certified Administrator',
          issuer: 'Salesforce',
          date: 'Jun 2022',
          credentialId: 'SF-ADMIN-2022-334'
        },
        {
          id: 'cert2',
          name: 'Challenger Sale Methodology',
          issuer: 'Challenger',
          date: 'Mar 2021',
          credentialId: 'CHALLENGER-2021-556'
        }
      ],
      languages: [
        { id: 'lang1', name: 'English', proficiency: 'native', flag: '🇺🇸' },
        { id: 'lang2', name: 'Spanish', proficiency: 'professional', flag: '🇪🇸' }
      ],
      interests: [
        'Sales Technology',
        'Revenue Operations',
        'Customer Success',
        'Golf',
        'Networking Events',
        'Sales Training'
      ],
      awards: [
        {
          id: 'award1',
          title: 'Top Sales Performer',
          issuer: 'Salesforce',
          date: '2023',
          description: 'Ranked #2 globally out of 1,200+ sales professionals for exceeding quota and revenue generation.'
        }
      ]
    }
  },

  {
    id: 'data-science',
    name: 'Data Science',
    description: 'For data scientists, analysts, and machine learning engineers',
    icon: '📊',
    color: '#8B5CF6',
    popularRoles: [
      'Data Scientist',
      'Machine Learning Engineer',
      'Data Analyst',
      'Research Scientist',
      'AI Engineer',
      'Business Intelligence Analyst'
    ],
    requiredSkills: [
      'Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'TensorFlow', 'PyTorch', 'Tableau', 'Power BI'
    ],
    isActive: true,
    sortOrder: 5,
    sampleData: {
      personal: {
        firstName: 'Dr. Emily',
        lastName: 'Zhang',
        title: 'Senior Data Scientist',
        email: 'emily.zhang@email.com',
        phone: '+1 (555) 678-9012',
        location: 'Seattle, WA',
        website: 'https://emilyzhang.science',
        linkedin: 'https://linkedin.com/in/emilyzhang',
      },
      summary: 'Experienced Data Scientist with 6+ years of expertise in machine learning, statistical analysis, and predictive modeling. Ph.D. in Statistics with proven track record of developing ML models that drive $5M+ in business value. Expert in Python, R, SQL, and cloud platforms. Passionate about transforming complex data into actionable business insights.',
      experience: [
        {
          id: 'exp1',
          company: 'Netflix',
          position: 'Senior Data Scientist',
          startDate: 'Sep 2021',
          endDate: 'Present',
          current: true,
          location: 'Los Gatos, CA (Remote)',
          description: 'Lead data science initiatives for recommendation systems and content optimization, serving 230M+ global subscribers.',
          achievements: [
            'Developed recommendation algorithm improving user engagement by 23% and reducing churn rate by 15%',
            'Built predictive models for content success scoring that influenced $2B+ in content acquisition decisions',
            'Led A/B testing framework serving 50M+ users, increasing experiment velocity by 300% across product teams',
            'Implemented real-time ML pipeline processing 100TB+ daily data with 99.9% uptime using AWS and Spark',
            'Mentored team of 4 junior data scientists and established ML best practices adopted company-wide'
          ],
        },
        {
          id: 'exp2',
          company: 'Uber',
          position: 'Data Scientist II',
          startDate: 'Jan 2019',
          endDate: 'Aug 2021',
          current: false,
          location: 'San Francisco, CA',
          description: 'Focused on demand forecasting and pricing optimization for ride-sharing platform across 65+ cities globally.',
          achievements: [
            'Created dynamic pricing models increasing driver earnings by 12% while maintaining rider satisfaction',
            'Developed demand forecasting system with 94% accuracy reducing driver wait times by 18%',
            'Built fraud detection models preventing $10M+ in annual fraudulent activity with 99.2% precision',
            'Collaborated with product and engineering teams to deploy 15+ ML models to production'
          ],
        },
        {
          id: 'exp3',
          company: 'Microsoft',
          position: 'Data Scientist',
          startDate: 'Jun 2017',
          endDate: 'Dec 2018',
          current: false,
          location: 'Redmond, WA',
          description: 'Applied machine learning to improve Azure cloud services performance and customer experience.',
          achievements: [
            'Designed anomaly detection system reducing Azure service downtime by 35% across global data centers',
            'Built customer usage prediction models enabling proactive capacity planning and $50M cost savings',
            'Published 3 research papers on distributed machine learning with 200+ citations'
          ],
        }
      ],
      skills: [
        { id: 's1', name: 'Python', level: 98, category: 'technical' },
        { id: 's2', name: 'R', level: 90, category: 'technical' },
        { id: 's3', name: 'SQL', level: 95, category: 'technical' },
        { id: 's4', name: 'TensorFlow', level: 92, category: 'technical' },
        { id: 's5', name: 'PyTorch', level: 88, category: 'technical' },
        { id: 's6', name: 'Scikit-learn', level: 95, category: 'technical' },
        { id: 's7', name: 'Pandas', level: 98, category: 'technical' },
        { id: 's8', name: 'NumPy', level: 95, category: 'technical' },
        { id: 's9', name: 'Apache Spark', level: 85, category: 'technical' },
        { id: 's10', name: 'AWS', level: 88, category: 'technical' },
        { id: 's11', name: 'Docker', level: 80, category: 'technical' },
        { id: 's12', name: 'Tableau', level: 85, category: 'technical' },
        { id: 's13', name: 'Statistics', level: 98, category: 'technical' },
        { id: 's14', name: 'Machine Learning', level: 95, category: 'technical' },
        { id: 's15', name: 'Deep Learning', level: 90, category: 'technical' },
        { id: 's16', name: 'Research & Analysis', level: 95, category: 'soft' }
      ],
      education: [
        {
          id: 'edu1',
          institution: 'Stanford University',
          degree: 'Ph.D.',
          field: 'Statistics',
          startDate: 'Sep 2013',
          endDate: 'Jun 2017',
          gpa: '3.9 / 4.0',
          honors: ['NSF Graduate Research Fellowship', 'Outstanding Dissertation Award']
        },
        {
          id: 'edu2',
          institution: 'UC Berkeley',
          degree: 'Bachelor of Science',
          field: 'Mathematics & Computer Science',
          startDate: 'Sep 2009',
          endDate: 'May 2013',
          gpa: '3.8 / 4.0',
          honors: ['Summa Cum Laude', 'Phi Beta Kappa']
        }
      ],
      projects: [
        {
          id: 'proj1',
          name: 'COVID-19 Spread Prediction Model',
          description: 'Developed epidemiological model predicting COVID-19 spread across US counties using mobility data, demographics, and policy interventions. Published in Nature Medicine.',
          technologies: ['Python', 'TensorFlow', 'Pandas', 'SEIR Models', 'Time Series Analysis'],
          link: 'https://github.com/emilyzhang/covid-prediction',
          achievements: [
            'Achieved 92% prediction accuracy for 14-day case forecasts across 3,000+ US counties',
            'Research cited by CDC and used to inform public health policy in 5 states'
          ]
        }
      ],
      certifications: [
        {
          id: 'cert1',
          name: 'AWS Certified Machine Learning',
          issuer: 'Amazon Web Services',
          date: 'Apr 2023',
          credentialId: 'AWS-ML-2023-778'
        },
        {
          id: 'cert2',
          name: 'TensorFlow Developer Certificate',
          issuer: 'Google',
          date: 'Jan 2022',
          credentialId: 'TF-DEV-2022-445'
        }
      ],
      languages: [
        { id: 'lang1', name: 'English', proficiency: 'native', flag: '🇺🇸' },
        { id: 'lang2', name: 'Mandarin', proficiency: 'native', flag: '🇨🇳' },
        { id: 'lang3', name: 'Python', proficiency: 'native', flag: '🐍' }
      ],
      interests: [
        'Machine Learning Research',
        'Open Source Contributing',
        'Data Visualization',
        'Statistics',
        'AI Ethics',
        'Academic Publishing'
      ],
      awards: [
        {
          id: 'award1',
          title: 'Data Science Excellence Award',
          issuer: 'Netflix',
          date: '2023',
          description: 'Recognized for outstanding contributions to recommendation systems and ML infrastructure improvements.'
        }
      ]
    }
  },

  {
    id: 'finance',
    name: 'Finance',
    description: 'For financial analysts, investment professionals, and finance managers',
    icon: '💰',
    color: '#059669',
    popularRoles: [
      'Financial Analyst',
      'Investment Banker',
      'Finance Manager',
      'Budget Analyst',
      'Risk Analyst',
      'Portfolio Manager'
    ],
    requiredSkills: [
      'Financial Modeling', 'Excel', 'Bloomberg Terminal', 'SQL', 'Valuation', 'Risk Management', 'Financial Analysis', 'PowerBI'
    ],
    isActive: true,
    sortOrder: 6,
    sampleData: {
      personal: {
        firstName: 'Sarah',
        lastName: 'Williams',
        title: 'Senior Financial Analyst',
        email: 'sarah.williams@email.com',
        phone: '+1 (555) 789-0123',
        location: 'New York, NY',
        website: 'https://sarahwilliams.finance',
        linkedin: 'https://linkedin.com/in/sarahwilliams',
      },
      summary: 'Detail-oriented Senior Financial Analyst with 7+ years of experience in financial planning, analysis, and modeling. CPA certified with expertise in budgeting, forecasting, and variance analysis. Proven track record of identifying $2M+ in cost savings opportunities and improving financial processes that reduced month-end close by 5 days.',
      experience: [
        {
          id: 'exp1',
          company: 'Goldman Sachs',
          position: 'Senior Financial Analyst',
          startDate: 'Mar 2020',
          endDate: 'Present',
          current: true,
          location: 'New York, NY',
          description: 'Lead financial analysis and modeling for investment banking division, supporting $500M+ in annual transactions.',
          achievements: [
            'Built comprehensive financial models for 25+ M&A transactions totaling $2.3B in deal value',
            'Reduced financial reporting cycle from 10 to 5 business days through process automation and optimization',
            'Identified $3.2M in cost reduction opportunities through variance analysis and operational efficiency improvements',
            'Managed annual budgeting process for 3 business units with combined $150M operating budget',
            'Presented monthly financial results and strategic recommendations to C-level executive team'
          ],
        },
        {
          id: 'exp2',
          company: 'JPMorgan Chase',
          position: 'Financial Analyst II',
          startDate: 'Jun 2018',
          endDate: 'Feb 2020',
          current: false,
          location: 'New York, NY',
          description: 'Performed financial analysis and reporting for commercial banking division serving Fortune 500 clients.',
          achievements: [
            'Conducted credit risk analysis for commercial loans totaling $500M+ with 99.2% accuracy rate',
            'Developed automated reporting dashboards reducing manual reporting time by 70%',
            'Supported due diligence for 15+ acquisition targets with combined enterprise value of $800M',
            'Maintained and enhanced financial models used for portfolio management and risk assessment'
          ],
        },
        {
          id: 'exp3',
          company: 'Deloitte',
          position: 'Financial Analyst',
          startDate: 'Aug 2017',
          endDate: 'May 2018',
          current: false,
          location: 'Chicago, IL',
          description: 'Provided financial advisory services to mid-market clients across various industries.',
          achievements: [
            'Completed valuation analysis for 20+ companies ranging from $10M to $500M enterprise value',
            'Assisted in preparation of financial statements and SEC filings for public company clients',
            'Conducted financial due diligence for private equity transactions totaling $200M+'
          ],
        }
      ],
      skills: [
        { id: 's1', name: 'Financial Modeling', level: 95, category: 'technical' },
        { id: 's2', name: 'Excel (Advanced)', level: 98, category: 'technical' },
        { id: 's3', name: 'Bloomberg Terminal', level: 90, category: 'technical' },
        { id: 's4', name: 'SQL', level: 85, category: 'technical' },
        { id: 's5', name: 'Python', level: 75, category: 'technical' },
        { id: 's6', name: 'Power BI', level: 88, category: 'technical' },
        { id: 's7', name: 'Tableau', level: 82, category: 'technical' },
        { id: 's8', name: 'SAP', level: 78, category: 'technical' },
        { id: 's9', name: 'Financial Analysis', level: 95, category: 'soft' },
        { id: 's10', name: 'Budgeting & Forecasting', level: 92, category: 'soft' },
        { id: 's11', name: 'Risk Management', level: 88, category: 'soft' },
        { id: 's12', name: 'Valuation', level: 90, category: 'soft' },
        { id: 's13', name: 'Strategic Planning', level: 85, category: 'soft' },
        { id: 's14', name: 'Presentation Skills', level: 88, category: 'soft' }
      ],
      education: [
        {
          id: 'edu1',
          institution: 'Wharton School, University of Pennsylvania',
          degree: 'Master of Business Administration',
          field: 'Finance',
          startDate: 'Sep 2015',
          endDate: 'May 2017',
          gpa: '3.8 / 4.0',
          honors: ['Beta Gamma Sigma', 'Finance Club President']
        },
        {
          id: 'edu2',
          institution: 'New York University',
          degree: 'Bachelor of Science',
          field: 'Finance',
          startDate: 'Sep 2011',
          endDate: 'May 2015',
          gpa: '3.7 / 4.0',
          honors: ['Magna Cum Laude', 'Finance Honor Society']
        }
      ],
      certifications: [
        {
          id: 'cert1',
          name: 'Certified Public Accountant (CPA)',
          issuer: 'AICPA',
          date: 'Nov 2017',
          credentialId: 'CPA-NY-2017-887'
        },
        {
          id: 'cert2',
          name: 'Chartered Financial Analyst (CFA) Level II',
          issuer: 'CFA Institute',
          date: 'Jun 2019',
          credentialId: 'CFA-L2-2019-334'
        }
      ],
      languages: [
        { id: 'lang1', name: 'English', proficiency: 'native', flag: '🇺🇸' },
        { id: 'lang2', name: 'Spanish', proficiency: 'professional', flag: '🇪🇸' }
      ],
      interests: [
        'Financial Markets',
        'Investment Strategy',
        'Economic Research',
        'Financial Technology',
        'Sustainable Finance',
        'Professional Development'
      ],
      awards: [
        {
          id: 'award1',
          title: 'Outstanding Performance Award',
          issuer: 'Goldman Sachs',
          date: '2023',
          description: 'Recognized for exceptional financial analysis and process improvement contributions to investment banking division.'
        }
      ]
    }
  },

  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'For healthcare professionals, medical practitioners, and healthcare administrators',
    icon: '🏥',
    color: '#DC2626',
    popularRoles: [
      'Registered Nurse',
      'Medical Doctor',
      'Healthcare Administrator',
      'Medical Assistant',
      'Physical Therapist',
      'Healthcare Analyst'
    ],
    requiredSkills: [
      'Patient Care', 'Medical Records', 'HIPAA Compliance', 'Clinical Skills', 'Healthcare Systems', 'EMR Systems', 'Medical Terminology'
    ],
    isActive: true,
    sortOrder: 7,
    sampleData: {
      personal: {
        firstName: 'Dr. Maria',
        lastName: 'Garcia',
        title: 'Registered Nurse, BSN',
        email: 'maria.garcia@email.com',
        phone: '+1 (555) 890-1234',
        location: 'Los Angeles, CA',
        website: '',
        linkedin: 'https://linkedin.com/in/mariagarcia',
      },
      summary: 'Compassionate and dedicated Registered Nurse with 8+ years of experience in critical care and emergency medicine. BSN-educated with expertise in patient assessment, medication administration, and family education. Proven track record of improving patient outcomes and satisfaction scores while maintaining compliance with all healthcare regulations.',
      experience: [
        {
          id: 'exp1',
          company: 'Cedars-Sinai Medical Center',
          position: 'Senior ICU Registered Nurse',
          startDate: 'Jan 2020',
          endDate: 'Present',
          current: true,
          location: 'Los Angeles, CA',
          description: 'Provide comprehensive nursing care for critically ill patients in 32-bed Level I Trauma ICU, serving as charge nurse and preceptor.',
          achievements: [
            'Maintained 98% patient satisfaction scores and zero medication errors over 3-year period',
            'Led implementation of new patient monitoring system reducing response times by 25%',
            'Precepted 15+ new graduate nurses with 95% retention rate after one year',
            'Served on hospital quality improvement committee resulting in 20% reduction in hospital-acquired infections',
            'Coordinated care for complex patients requiring ventilator support, dialysis, and multiple vasoactive drips'
          ],
        },
        {
          id: 'exp2',
          company: 'UCLA Medical Center',
          position: 'Emergency Department RN',
          startDate: 'Jun 2017',
          endDate: 'Dec 2019',
          current: false,
          location: 'Los Angeles, CA',
          description: 'Provided acute nursing care in high-volume Level I Trauma emergency department treating 400+ patients daily.',
          achievements: [
            'Triaged and treated patients across all acuity levels with average patient throughput of 25 patients per shift',
            'Assisted in trauma resuscitations and cardiac arrests with 100% protocol compliance',
            'Maintained BLS, ACLS, and TNCC certifications with annual skills validation',
            'Collaborated with multidisciplinary team including physicians, residents, and specialists'
          ],
        },
        {
          id: 'exp3',
          company: 'Kaiser Permanente',
          position: 'Medical-Surgical RN',
          startDate: 'Aug 2015',
          endDate: 'May 2017',
          current: false,
          location: 'San Diego, CA',
          description: 'Provided nursing care for post-operative and medical patients on 36-bed telemetry unit.',
          achievements: [
            'Managed patient assignments of 6-8 patients per shift including medication administration and assessments',
            'Achieved Joint Commission compliance in all nursing documentation and patient care standards',
            'Participated in rapid response team with positive patient outcomes in 95% of calls'
          ],
        }
      ],
      skills: [
        { id: 's1', name: 'Critical Care Nursing', level: 95, category: 'technical' },
        { id: 's2', name: 'Emergency Nursing', level: 90, category: 'technical' },
        { id: 's3', name: 'EPIC EMR', level: 92, category: 'technical' },
        { id: 's4', name: 'Medication Administration', level: 98, category: 'technical' },
        { id: 's5', name: 'Patient Assessment', level: 95, category: 'technical' },
        { id: 's6', name: 'IV Therapy', level: 95, category: 'technical' },
        { id: 's7', name: 'Wound Care', level: 88, category: 'technical' },
        { id: 's8', name: 'Ventilator Management', level: 85, category: 'technical' },
        { id: 's9', name: 'Patient Advocacy', level: 95, category: 'soft' },
        { id: 's10', name: 'Family Communication', level: 92, category: 'soft' },
        { id: 's11', name: 'Crisis Management', level: 90, category: 'soft' },
        { id: 's12', name: 'Team Collaboration', level: 95, category: 'soft' },
        { id: 's13', name: 'Cultural Competency', level: 88, category: 'soft' },
        { id: 's14', name: 'Leadership', level: 85, category: 'soft' }
      ],
      education: [
        {
          id: 'edu1',
          institution: 'UCLA School of Nursing',
          degree: 'Bachelor of Science in Nursing',
          field: 'Nursing',
          startDate: 'Sep 2011',
          endDate: 'Jun 2015',
          gpa: '3.6 / 4.0',
          honors: ['Sigma Theta Tau International Honor Society', 'Clinical Excellence Award']
        }
      ],
      certifications: [
        {
          id: 'cert1',
          name: 'Registered Nurse License',
          issuer: 'California Board of Registered Nursing',
          date: 'Jul 2015',
          credentialId: 'RN-CA-2015-445567'
        },
        {
          id: 'cert2',
          name: 'Advanced Cardiac Life Support (ACLS)',
          issuer: 'American Heart Association',
          date: 'Mar 2023',
          credentialId: 'AHA-ACLS-2023-889'
        },
        {
          id: 'cert3',
          name: 'Trauma Nursing Core Course (TNCC)',
          issuer: 'Emergency Nurses Association',
          date: 'Jan 2023',
          credentialId: 'ENA-TNCC-2023-445'
        }
      ],
      languages: [
        { id: 'lang1', name: 'English', proficiency: 'native', flag: '🇺🇸' },
        { id: 'lang2', name: 'Spanish', proficiency: 'fluent', flag: '🇪🇸' }
      ],
      interests: [
        'Patient Advocacy',
        'Healthcare Quality Improvement',
        'Continuing Education',
        'Community Health',
        'Nursing Research',
        'Volunteer Work'
      ],
      awards: [
        {
          id: 'award1',
          title: 'Nurse Excellence Award',
          issuer: 'Cedars-Sinai Medical Center',
          date: '2022',
          description: 'Recognized for exceptional patient care, leadership, and commitment to nursing excellence in critical care.'
        }
      ]
    }
  }
];

// Helper functions for category management
export const getCategoryById = (id: string): ResumeCategory | undefined => {
  return resumeCategories.find(category => category.id === id);
};

export const getActiveCategories = (): ResumeCategory[] => {
  return resumeCategories
    .filter(category => category.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
};

export const getCategoryNames = (): { id: string; name: string }[] => {
  return resumeCategories.map(category => ({
    id: category.id,
    name: category.name
  }));
};

export const generateEmptyDataForCategory = (categoryId: string): CVData => {
  const category = getCategoryById(categoryId);
  if (!category) {
    // Return generic empty data if category not found
    return {
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
    };
  }

  // Return category sample data as starting template
  return category.sampleData;
};
