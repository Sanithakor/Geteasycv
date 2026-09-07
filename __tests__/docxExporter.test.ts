import { describe, it, expect } from 'vitest';
import { buildDocxDocument } from '@/lib/export/docxExporter';
import type { DocxResumeData } from '@/lib/export/docxExporter';

describe('Native Word (.docx) Exporter', () => {
  it('successfully constructs a valid Document from full user resume data', () => {
    const data: DocxResumeData = {
      personal: {
        firstName: 'Elizabeth',
        lastName: 'Taylor',
        jobTitle: 'Senior Product Manager',
        email: 'elizabeth@example.com',
        phone: '+1 555 019 283',
        location: 'Seattle, WA',
        linkedin: 'linkedin.com/in/elizabethtaylor',
        summary: 'Seasoned Product Leader with 8+ years experience scaling SaaS platforms.',
      },
      experience: [
        {
          position: 'Senior Product Manager',
          company: 'Stripe',
          location: 'Seattle, WA',
          startDate: '2021',
          endDate: 'Present',
          current: true,
          description: 'Led developer experience and checkout optimization.',
          highlights: [
            'Increased payment conversion rates by 18.5%.',
            'Oversaw 9-member cross-functional engineering squad.',
          ],
        },
      ],
      education: [
        {
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          institution: 'University of Washington',
          location: 'Seattle, WA',
          startDate: '2015',
          endDate: '2019',
          gpa: '3.9',
        },
      ],
      skills: [
        { name: 'Product Strategy' },
        { name: 'UX/UI Design' },
        { name: 'Agile / Scrum' },
      ],
    };


    const doc = buildDocxDocument(data);
    expect(doc).not.toBeNull();
    expect(doc instanceof Object).toBe(true);
  });

  it('handles minimal or partial data without throwing errors', () => {
    const data: DocxResumeData = {
      personal: {
        firstName: 'Alex',
      },
    };

    const doc = buildDocxDocument(data);
    expect(doc).not.toBeNull();
  });
});
