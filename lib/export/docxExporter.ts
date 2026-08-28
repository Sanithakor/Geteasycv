/**
 * Native Word (.docx) Exporter
 * Constructs clean OpenXML-based Microsoft Word document structures
 * without HTML MIME wrapper warnings in MS Word or Google Docs.
 */

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
}

/**
 * Escapes special XML characters
 */
function escapeXml(str: string = ''): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generates OpenXML WordprocessingML content for native .docx documents
 */
export function generateWordprocessingML(data: DocxResumeData): string {
  const p = data.personal || {};
  const fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'Resume';

  let bodyXml = `
    <w:p>
      <w:pPr><w:jc w:val="center"/><w:spacing w:after="120"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="48"/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t>${escapeXml(fullName)}</w:t></w:r>
    </w:p>
  `;

  if (p.jobTitle) {
    bodyXml += `
      <w:p>
        <w:pPr><w:jc w:val="center"/><w:spacing w:after="180"/></w:pPr>
        <w:r><w:rPr><w:b/><w:color w:val="333333"/><w:sz w:val="28"/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t>${escapeXml(p.jobTitle)}</w:t></w:r>
      </w:p>
    `;
  }

  const contactItems = [p.email, p.phone, p.location, p.linkedin, p.github].filter(Boolean);
  if (contactItems.length > 0) {
    bodyXml += `
      <w:p>
        <w:pPr><w:jc w:val="center"/><w:spacing w:after="240"/></w:pPr>
        <w:r><w:rPr><w:color w:val="555555"/><w:sz w:val="20"/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t>${escapeXml(contactItems.join(' | '))}</w:t></w:r>
      </w:p>
    `;
  }

  // Summary Section
  if (p.summary) {
    bodyXml += `
      <w:p><w:pPr><w:spacing w:before="240" w:after="120"/><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="4" w:color="2B4C7E"/></w:pBdr></w:pPr>
      <w:r><w:rPr><w:b/><w:color w:val="2B4C7E"/><w:sz w:val="28"/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t>PROFESSIONAL SUMMARY</w:t></w:r></w:p>
      <w:p><w:pPr><w:spacing w:after="240"/></w:pPr>
      <w:r><w:rPr><w:sz w:val="22"/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t>${escapeXml(p.summary)}</w:t></w:r></w:p>
    `;
  }

  // Experience Section
  if (data.experience && data.experience.length > 0) {
    bodyXml += `
      <w:p><w:pPr><w:spacing w:before="240" w:after="120"/><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="4" w:color="2B4C7E"/></w:pBdr></w:pPr>
      <w:r><w:rPr><w:b/><w:color w:val="2B4C7E"/><w:sz w:val="28"/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t>WORK EXPERIENCE</w:t></w:r></w:p>
    `;

    data.experience.forEach((exp) => {
      const titleLine = `${exp.position || 'Position'} - ${exp.company || 'Company'}`;
      const dates = `${exp.startDate || ''} ${exp.startDate || exp.endDate ? 'to' : ''} ${exp.current ? 'Present' : exp.endDate || ''}`.trim();

      bodyXml += `
        <w:p><w:pPr><w:spacing w:before="120" w:after="60"/></w:pPr>
        <w:r><w:rPr><w:b/><w:sz w:val="24"/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t>${escapeXml(titleLine)}</w:t></w:r>
        ${dates ? `<w:r><w:rPr><w:i/><w:color w:val="666666"/><w:sz w:val="20"/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t>  (${escapeXml(dates)})</w:t></w:r>` : ''}
        </w:p>
      `;

      if (exp.description) {
        bodyXml += `
          <w:p><w:pPr><w:spacing w:after="120"/></w:pPr>
          <w:r><w:rPr><w:sz w:val="22"/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t>${escapeXml(exp.description)}</w:t></w:r></w:p>
        `;
      }

      if (exp.highlights && exp.highlights.length > 0) {
        exp.highlights.forEach((h) => {
          bodyXml += `
            <w:p><w:pPr><w:spacing w:after="60"/><w:ind w:left="360"/></w:pPr>
            <w:r><w:rPr><w:b/><w:color w:val="2B4C7E"/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t>• </w:t></w:r>
            <w:r><w:rPr><w:sz w:val="22"/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t>${escapeXml(h)}</w:t></w:r></w:p>
          `;
        });
      }
    });
  }

  // Skills Section
  if (data.skills && data.skills.length > 0) {
    const skillList = data.skills.map((s) => s.name || '').filter(Boolean).join(', ');
    bodyXml += `
      <w:p><w:pPr><w:spacing w:before="240" w:after="120"/><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="4" w:color="2B4C7E"/></w:pBdr></w:pPr>
      <w:r><w:rPr><w:b/><w:color w:val="2B4C7E"/><w:sz w:val="28"/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t>SKILLS</w:t></w:r></w:p>
      <w:p><w:pPr><w:spacing w:after="240"/></w:pPr>
      <w:r><w:rPr><w:sz w:val="22"/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t>${escapeXml(skillList)}</w:t></w:r></w:p>
    `;
  }

  // Education Section
  if (data.education && data.education.length > 0) {
    bodyXml += `
      <w:p><w:pPr><w:spacing w:before="240" w:after="120"/><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="4" w:color="2B4C7E"/></w:pBdr></w:pPr>
      <w:r><w:rPr><w:b/><w:color w:val="2B4C7E"/><w:sz w:val="28"/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t>EDUCATION</w:t></w:r></w:p>
    `;

    data.education.forEach((edu) => {
      const titleLine = `${edu.degree || 'Degree'} ${edu.field ? `in ${edu.field}` : ''} - ${edu.institution || 'Institution'}`;
      bodyXml += `
        <w:p><w:pPr><w:spacing w:before="120" w:after="120"/></w:pPr>
        <w:r><w:rPr><w:b/><w:sz w:val="24"/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr><w:t>${escapeXml(titleLine)}</w:t></w:r>
        </w:p>
      `;
    });
  }

  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${bodyXml}
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/>
    </w:sectPr>
  </w:body>
</w:document>`;

  return documentXml;
}

/**
 * Triggers clean download of native Word Document
 */
export function exportToNativeDocx(data: DocxResumeData, filename: string = 'resume.docx'): void {
  const xmlContent = generateWordprocessingML(data);
  const blob = new Blob([xmlContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename.endsWith('.docx') ? filename : `${filename}.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
