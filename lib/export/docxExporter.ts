/**
 * Native Word (.docx) Exporter
 * Generates 100% compliant, genuine zipped OpenXML Microsoft Word packages (.docx)
 * using the official 'docx' package, ensuring flawless opening in all versions of
 * Microsoft Word, Apple Pages, Google Docs, and LibreOffice.
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
} from 'docx';

export interface DocxResumeData {
  personal?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    location?: string;
    jobTitle?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    summary?: string;
  };
  experience?: Array<{
    position?: string;
    company?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    current?: boolean;
    description?: string;
    highlights?: string[];
  }>;
  education?: Array<{
    degree?: string;
    field?: string;
    institution?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    gpa?: string;
  }>;
  skills?: Array<{
    name?: string;
    level?: string;
    category?: string;
  }>;
  projects?: Array<{
    title?: string;
    description?: string;
    technologies?: string[];
    link?: string;
  }>;
  certifications?: Array<{
    name?: string;
    issuer?: string;
    date?: string;
  }>;
}

const PRIMARY_COLOR = '1E3A8A'; // Deep Navy / Royal
const TEXT_MUTED = '475569';    // Slate 600

function createSectionHeading(title: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120 },
    border: {
      bottom: {
        color: PRIMARY_COLOR,
        space: 4,
        style: BorderStyle.SINGLE,
        size: 12,
      },
    },
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: 24, // 12pt
        color: PRIMARY_COLOR,
        font: 'Calibri',
      }),
    ],
  });
}

/**
 * Builds the docx Document object from structured resume data
 */
export function buildDocxDocument(data: DocxResumeData): Document {
  const p = data.personal || {};
  const fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'Resume';

  const children: Paragraph[] = [];

  // ==========================================
  // 1. CANDIDATE HEADER (Name & Job Title)
  // ==========================================
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
      children: [
        new TextRun({
          text: fullName,
          bold: true,
          size: 40, // 20pt
          font: 'Calibri',
          color: '0F172A',
        }),
      ],
    })
  );

  if (p.jobTitle) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 140 },
        children: [
          new TextRun({
            text: p.jobTitle,
            bold: true,
            size: 24, // 12pt
            font: 'Calibri',
            color: PRIMARY_COLOR,
          }),
        ],
      })
    );
  }

  // ==========================================
  // 2. CONTACT INFORMATION BAR
  // ==========================================
  const contactItems = [
    p.email,
    p.phone,
    p.location,
    p.linkedin,
    p.github,
    p.website,
  ].filter(Boolean);

  if (contactItems.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 220 },
        children: [
          new TextRun({
            text: contactItems.join('  •  '),
            size: 19, // 9.5pt
            font: 'Calibri',
            color: TEXT_MUTED,
          }),
        ],
      })
    );
  }

  // ==========================================
  // 3. PROFESSIONAL SUMMARY / COVER LETTER BODY
  // ==========================================
  if (p.summary && p.summary.trim()) {
    children.push(createSectionHeading('Professional Summary'));
    
    // Support multi-line summaries or paragraphs
    const paragraphs = p.summary.split('\n\n').filter(Boolean);
    paragraphs.forEach((paraText) => {
      children.push(
        new Paragraph({
          spacing: { before: 60, after: 120 },
          children: [
            new TextRun({
              text: paraText.trim(),
              size: 21, // 10.5pt
              font: 'Calibri',
              color: '1E293B',
            }),
          ],
        })
      );
    });
  }

  // ==========================================
  // 4. WORK EXPERIENCE
  // ==========================================
  if (data.experience && data.experience.length > 0) {
    children.push(createSectionHeading('Work Experience'));

    data.experience.forEach((exp) => {
      const roleText = `${exp.position || 'Position'}${exp.company ? ` | ${exp.company}` : ''}`;
      const datesLocation = [
        exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : exp.startDate || '',
        exp.location || '',
      ].filter(Boolean).join('  •  ');

      children.push(
        new Paragraph({
          spacing: { before: 140, after: 40 },
          children: [
            new TextRun({
              text: roleText,
              bold: true,
              size: 22, // 11pt
              font: 'Calibri',
              color: '0F172A',
            }),
            datesLocation ? new TextRun({
              text: `   (${datesLocation})`,
              italics: true,
              size: 19, // 9.5pt
              font: 'Calibri',
              color: TEXT_MUTED,
            }) : new TextRun({ text: '' }),
          ],
        })
      );

      if (exp.description && exp.description.trim()) {
        children.push(
          new Paragraph({
            spacing: { before: 40, after: 60 },
            children: [
              new TextRun({
                text: exp.description.trim(),
                size: 21, // 10.5pt
                font: 'Calibri',
                color: '334155',
              }),
            ],
          })
        );
      }

      if (exp.highlights && exp.highlights.length > 0) {
        exp.highlights.forEach((highlight) => {
          if (!highlight.trim()) return;
          children.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { before: 20, after: 40 },
              children: [
                new TextRun({
                  text: highlight.trim(),
                  size: 21,
                  font: 'Calibri',
                  color: '334155',
                }),
              ],
            })
          );
        });
      }
    });
  }

  // ==========================================
  // 5. EDUCATION
  // ==========================================
  if (data.education && data.education.length > 0) {
    children.push(createSectionHeading('Education'));

    data.education.forEach((edu) => {
      const degreeText = `${edu.degree || 'Degree'}${edu.field ? ` in ${edu.field}` : ''}`;
      const instLocation = [
        edu.institution,
        edu.location,
        edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.endDate || edu.startDate || '',
      ].filter(Boolean).join('  •  ');

      children.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({
              text: degreeText,
              bold: true,
              size: 22,
              font: 'Calibri',
              color: '0F172A',
            }),
            instLocation ? new TextRun({
              text: `   (${instLocation})`,
              italics: true,
              size: 19,
              font: 'Calibri',
              color: TEXT_MUTED,
            }) : new TextRun({ text: '' }),
          ],
        })
      );

      if (edu.gpa) {
        children.push(
          new Paragraph({
            spacing: { before: 20, after: 40 },
            children: [
              new TextRun({
                text: `GPA / Honors: ${edu.gpa}`,
                size: 20,
                font: 'Calibri',
                color: '334155',
              }),
            ],
          })
        );
      }
    });
  }

  // ==========================================
  // 6. SKILLS
  // ==========================================
  if (data.skills && data.skills.length > 0) {
    children.push(createSectionHeading('Skills & Competencies'));

    const skillNames = data.skills.map((s) => s.name || '').filter(Boolean);
    if (skillNames.length > 0) {
      children.push(
        new Paragraph({
          spacing: { before: 80, after: 120 },
          children: [
            new TextRun({
              text: skillNames.join('   •   '),
              size: 21,
              font: 'Calibri',
              color: '1E293B',
            }),
          ],
        })
      );
    }
  }

  // ==========================================
  // 7. PROJECTS (Optional)
  // ==========================================
  if (data.projects && data.projects.length > 0) {
    children.push(createSectionHeading('Key Projects'));

    data.projects.forEach((proj) => {
      children.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({
              text: proj.title || 'Project',
              bold: true,
              size: 22,
              font: 'Calibri',
              color: '0F172A',
            }),
            proj.link ? new TextRun({
              text: `  [${proj.link}]`,
              size: 19,
              font: 'Calibri',
              color: PRIMARY_COLOR,
            }) : new TextRun({ text: '' }),
          ],
        })
      );

      if (proj.description) {
        children.push(
          new Paragraph({
            spacing: { before: 20, after: 40 },
            children: [
              new TextRun({
                text: proj.description,
                size: 21,
                font: 'Calibri',
                color: '334155',
              }),
            ],
          })
        );
      }
    });
  }

  // Build standard A4 Document with 1-inch margins
  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,    // 1 inch = 1440 dxa
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children,
      },
    ],
  });
}

/**
 * Triggers clean download of native zipped Word Document (.docx)
 */
export async function exportToNativeDocx(
  data: DocxResumeData,
  filename: string = 'resume.docx'
): Promise<void> {
  const doc = buildDocxDocument(data);
  const blob = await Packer.toBlob(doc);

  const cleanFilename = filename.endsWith('.docx') ? filename : `${filename}.docx`;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = cleanFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
