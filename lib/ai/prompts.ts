/**
 * Centralized AI Prompt Templates & Anti-Hallucination Engineering
 * For GetEasyCV OpenAI API Integration
 */

export const ANTI_HALLUCINATION_INSTRUCTIONS = `
CRITICAL ANTI-HALLUCINATION & FACTUAL INTEGRITY RULES:
1. Preserve all candidate facts provided (company names, dates, degrees, certifications, job titles, and tech stack).
2. NEVER invent, fabricate, or assume metrics, percentages, dollar amounts, revenue figures, team sizes, or dates not present in the user's input.
3. If quantitative impact is missing, use strong qualitative action-verbs (e.g., "Spearheaded", "Architected", "Streamlined") or prompt the candidate to insert their own metric placeholder (e.g., "[X]%") without inventing fake numbers.
4. Keep all suggestions professional, concise, active-voice, and free from unnecessary filler or fluff phrases.
`;

export interface FieldPolishInput {
  fieldName: string;
  fieldValue: string;
  jobTitle?: string;
  industry?: string;
  templateCategory?: string;
  templateTone?: string;
  context?: string;
}

export function buildFieldPolishPrompts(input: FieldPolishInput) {
  const category = input.templateCategory || 'Professional';
  const tone = input.templateTone || 'Modern';
  const title = input.jobTitle || 'Professional Candidate';

  const systemPrompt = `You are a world-class senior executive resume writer and ATS specialist crafting content for a ${category} resume with a ${tone} tone.
${ANTI_HALLUCINATION_INSTRUCTIONS}
Your goal is to optimize the field "${input.fieldName}" for a ${title} position.

Respond ONLY with a valid, clean JSON object matching this schema:
{
  "original": "The original text provided",
  "suggestion": "The improved, polished, professional version",
  "fieldName": "${input.fieldName}",
  "explanation": "A 1-sentence explanation of why this improvement enhances ATS or recruiter impact"
}`;

  const userPrompt = `Field Name: ${input.fieldName}
Job Title / Target Role: ${title}
${input.context ? `Candidate Context: ${input.context}\n` : ''}
Current Content:
"""
${input.fieldValue}
"""

Provide the JSON response:`;

  return { systemPrompt, userPrompt };
}

export interface CoverLetterInput {
  candidateName: string;
  jobTitle: string;
  companyName: string;
  jobDescription?: string;
  skills?: string[];
  experienceSummary?: string;
  tone?: string;
}

export function buildCoverLetterPrompts(input: CoverLetterInput) {
  const tone = input.tone || 'professional, confident, and articulate';
  const skillsList = Array.isArray(input.skills) && input.skills.length > 0 ? input.skills.join(', ') : '';

  const systemPrompt = `You are an expert career consultant writing a tailored cover letter.
${ANTI_HALLUCINATION_INSTRUCTIONS}
Tone: ${tone}.
Generate a compelling, well-structured cover letter personalized for ${input.companyName} for the ${input.jobTitle} position.

Respond ONLY with a valid, clean JSON object matching this schema:
{
  "recipient": "Hiring Team at ${input.companyName}",
  "salutation": "Dear Hiring Manager at ${input.companyName},",
  "openingParagraph": "Strong hook expressing interest in the ${input.jobTitle} role...",
  "bodyParagraphs": [
    "Paragraph 1 connecting core skills to job requirements...",
    "Paragraph 2 highlighting relevant experience and impact..."
  ],
  "closingParagraph": "Polite call to action and appreciation...",
  "fullText": "The complete merged cover letter text ready to copy or export"
}`;

  const userPrompt = `Candidate Name: ${input.candidateName}
Target Role: ${input.jobTitle}
Company Name: ${input.companyName}
${skillsList ? `Key Candidate Skills: ${skillsList}\n` : ''}
${input.experienceSummary ? `Candidate Summary/Experience: ${input.experienceSummary}\n` : ''}
${input.jobDescription ? `Job Description:\n"""\n${input.jobDescription}\n"""\n` : ''}

Generate the tailored cover letter JSON:`;

  return { systemPrompt, userPrompt };
}

export interface ATSMatcherInput {
  resumeContent: string;
  jobDescription: string;
  targetRole?: string;
}

export function buildATSMatcherPrompts(input: ATSMatcherInput) {
  const systemPrompt = `You are an advanced Applicant Tracking System (ATS) parser and recruiter evaluation engine.
${ANTI_HALLUCINATION_INSTRUCTIONS}
Analyze the provided candidate resume against the target job description.

Respond ONLY with a valid, clean JSON object matching this schema:
{
  "matchScore": number (0 to 100),
  "summary": "2-3 sentence overview of overall alignment",
  "matchingKeywords": ["keyword1", "keyword2"],
  "missingKeywords": ["keyword3", "keyword4"],
  "matchingSkills": ["skill1", "skill2"],
  "missingSkills": ["skill3", "skill4"],
  "experienceGaps": ["gap description if any"],
  "sectionRecommendations": [
    {
      "section": "Summary / Experience / Skills",
      "advice": "Specific actionable suggestion"
    }
  ]
}`;

  const userPrompt = `Target Role: ${input.targetRole || 'Not specified'}

Job Description:
"""
${input.jobDescription}
"""

Candidate Resume:
"""
${input.resumeContent}
"""

Provide the ATS analysis JSON:`;

  return { systemPrompt, userPrompt };
}

export interface ResumeImproveInput {
  content: string;
  action: 'improve_bullet' | 'optimize_ats' | 'add_impact' | 'make_professional' | 'make_concise';
  jobTitle?: string;
  industry?: string;
  jobDescription?: string;
}

export function buildResumeImprovePrompts(input: ResumeImproveInput) {
  const systemPrompt = `You are an executive resume editor specializing in high-impact resume improvements.
${ANTI_HALLUCINATION_INSTRUCTIONS}
Action requested: ${input.action}.

Respond ONLY with a valid, clean JSON object matching this schema:
{
  "original": "Original text",
  "improvedContent": "The enhanced content",
  "action": "${input.action}",
  "keywordsAdded": ["action_verb", "industry_keyword"],
  "explanation": "Brief breakdown of the optimization"
}`;

  const userPrompt = `Action: ${input.action}
${input.jobTitle ? `Job Title: ${input.jobTitle}\n` : ''}
${input.jobDescription ? `Target Job Description:\n"""\n${input.jobDescription}\n"""\n` : ''}
Content to Improve:
"""
${input.content}
"""

Provide the JSON response:`;

  return { systemPrompt, userPrompt };
}
