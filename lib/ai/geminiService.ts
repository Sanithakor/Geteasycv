/**
 * Server-Side Gemini AI Service for CV Voice Commands & Content Modification
 * Powered by @google/genai with model gemini-3.8-flash
 */

import { CVData, SkillItem } from '@/data/sampleCV';

let aiClient: any = null;

function getGeminiClient(): any {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return null;
  if (!aiClient) {
    try {
      // Dynamic require so build succeeds even if @google/genai is not in node_modules
      const { GoogleGenAI } = require('@google/genai');
      aiClient = new GoogleGenAI({ apiKey });
    } catch {
      return null;
    }
  }
  return aiClient;
}

export type AIContentAction =
  | 'improve'
  | 'professional'
  | 'shorter'
  | 'detailed'
  | 'grammar'
  | 'ats'
  | 'generate'
  | 'rewrite';

export interface ProcessVoiceCommandOptions {
  command: string;
  currentCvData: CVData;
  activeSection?: string;
}

export interface VoiceCommandResult {
  success: boolean;
  actionType:
    | 'UPDATE_PERSONAL'
    | 'UPDATE_SUMMARY'
    | 'ADD_EXPERIENCE'
    | 'UPDATE_EXPERIENCE'
    | 'ADD_SKILL'
    | 'ADD_EDUCATION'
    | 'ADD_PROJECT'
    | 'GENERAL_UPDATE';
  targetSection: 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages';
  targetField?: string;
  explanation: string;
  beforePreview: string;
  afterPreview: string;
  updatedCvData: CVData;
  isFallback: boolean;
  error?: string;
}

export interface ModifyContentOptions {
  content: string;
  action: AIContentAction;
  instruction?: string;
  sectionName?: string;
  jobTitle?: string;
  industry?: string;
}

export interface ModifyContentResult {
  success: boolean;
  originalContent: string;
  modifiedContent: string;
  action: AIContentAction;
  explanation: string;
  isFallback: boolean;
  error?: string;
}

// ─── Rule-Based Fallback Engine ──────────────────────────────────────────────

function processVoiceCommandFallback(
  command: string,
  currentCvData: CVData,
  activeSection?: string
): VoiceCommandResult {
  const normalized = command.trim();
  const lower = normalized.toLowerCase();
  const cloned: CVData = JSON.parse(JSON.stringify(currentCvData));

  // 1. Company / Current Company
  // e.g., "Add my current company as ABC Technologies" / "Set company to Acme Corp"
  const companyMatch = lower.match(/(?:add|set|change|update)?\s*(?:my)?\s*(?:current)?\s*company\s*(?:as|to|is|name)?\s*[:]?\s*(.+)/i);
  if (companyMatch && companyMatch[1]) {
    const rawCompany = companyMatch[1].replace(/^(as|to|is)\s+/i, '').trim();
    const cleanCompany = rawCompany.charAt(0).toUpperCase() + rawCompany.slice(1);
    const beforeVal = cloned.experience?.[0]?.company || 'None';

    if (cloned.experience && cloned.experience.length > 0) {
      cloned.experience[0].company = cleanCompany;
    } else {
      cloned.experience = [
        {
          id: `exp-${Date.now()}`,
          company: cleanCompany,
          position: cloned.personal.title || 'Software Engineer',
          startDate: '2024-01',
          endDate: 'Present',
          current: true,
          description: `Leading core initiatives at ${cleanCompany}.`,
          achievements: [],
        },
      ];
    }

    return {
      success: true,
      actionType: 'UPDATE_EXPERIENCE',
      targetSection: 'experience',
      targetField: 'company',
      explanation: `Updated current company to "${cleanCompany}" in Work Experience.`,
      beforePreview: beforeVal,
      afterPreview: cleanCompany,
      updatedCvData: cloned,
      isFallback: true,
    };
  }

  // 2. Job Title
  // e.g. "Change my job title to Senior Software Engineer" / "Update title to Product Manager"
  const titleMatch = lower.match(/(?:change|update|set|make)\s*(?:my)?\s*(?:job\s*)?title\s*(?:as|to|is)?\s*[:]?\s*(.+)/i);
  if (titleMatch && titleMatch[1]) {
    const rawTitle = titleMatch[1].replace(/^(as|to|is)\s+/i, '').trim();
    const cleanTitle = rawTitle.replace(/\b\w/g, (c) => c.toUpperCase());
    const beforeVal = cloned.personal.title || 'None';
    cloned.personal.title = cleanTitle;

    return {
      success: true,
      actionType: 'UPDATE_PERSONAL',
      targetSection: 'personal',
      targetField: 'title',
      explanation: `Changed professional title to "${cleanTitle}".`,
      beforePreview: beforeVal,
      afterPreview: cleanTitle,
      updatedCvData: cloned,
      isFallback: true,
    };
  }

  // 3. Experience with years/tech
  // e.g. "Add 3 years of experience in React development" / "Add 5 years experience in Python"
  const expYearsMatch = lower.match(/add\s*(\d+)\s*years?\s*(?:of\s*)?experience\s*(?:in|with)?\s*(.+)/i);
  if (expYearsMatch) {
    const years = expYearsMatch[1];
    const tech = expYearsMatch[2].replace(/\b\w/g, (c) => c.toUpperCase()).trim();
    const newBullet = `Over ${years} years of proven expertise in ${tech}, designing scalable systems and driving product delivery.`;

    const beforeVal = cloned.summary;
    if (cloned.summary) {
      cloned.summary = `${cloned.summary.replace(/\.$/, '')}. ${newBullet}`;
    } else {
      cloned.summary = newBullet;
    }

    // Also add to skills if not present
    const hasSkill = cloned.skills?.some((s) => s.name.toLowerCase().includes(tech.toLowerCase()));
    if (!hasSkill) {
      cloned.skills = [
        ...(cloned.skills || []),
        {
          id: `skill-${Date.now()}`,
          name: tech,
          level: Math.min(100, 70 + parseInt(years) * 5),
          category: 'technical',
        },
      ];
    }

    return {
      success: true,
      actionType: 'UPDATE_SUMMARY',
      targetSection: 'summary',
      explanation: `Added ${years} years experience in ${tech} to Summary and Skills.`,
      beforePreview: beforeVal || '(Empty summary)',
      afterPreview: cloned.summary,
      updatedCvData: cloned,
      isFallback: true,
    };
  }

  // 4. Professional Summary update / voice instruction
  // e.g. "Update my professional summary" / "Make my professional summary more professional and ATS-friendly"
  if (lower.includes('summary') || activeSection === 'summary') {
    const beforeVal = cloned.summary;
    let newSummary = cloned.summary;

    if (lower.includes('ats') || lower.includes('professional')) {
      newSummary = `Results-oriented ${cloned.personal.title || 'Professional'} with proven success delivering high-impact business solutions. Skilled in cross-functional collaboration, technical execution, and strategic optimization to drive measurable organizational value.`;
    } else if (lower.includes('shorter') || lower.includes('concise')) {
      const firstSentence = cloned.summary.split('.')[0];
      newSummary = firstSentence ? `${firstSentence.trim()}.` : cloned.summary;
    } else {
      // Extract custom text if present: "Update my professional summary: I am a..."
      const colonIdx = normalized.indexOf(':');
      if (colonIdx > 0 && normalized.slice(colonIdx + 1).trim().length > 10) {
        newSummary = normalized.slice(colonIdx + 1).trim();
      } else {
        newSummary = `Dynamic and strategic ${cloned.personal.title || 'Professional'} recognized for driving technical excellence, streamlining operations, and delivering high-value user experiences.`;
      }
    }

    cloned.summary = newSummary;
    return {
      success: true,
      actionType: 'UPDATE_SUMMARY',
      targetSection: 'summary',
      targetField: 'summary',
      explanation: 'Refined Professional Summary with high-impact, ATS-optimized language.',
      beforePreview: beforeVal,
      afterPreview: newSummary,
      updatedCvData: cloned,
      isFallback: true,
    };
  }

  // 5. Add Skill
  // e.g. "Add skill Docker" or "Add React to my skills"
  const skillMatch = lower.match(/(?:add|include)\s*(?:skill\s*)?([a-zA-Z0-9#+.\s]+?)\s*(?:to\s*(?:my\s*)?skills)?$/i);
  if (skillMatch && skillMatch[1] && !skillMatch[1].includes('year')) {
    const rawSkill = skillMatch[1].replace(/^(skill|skills)\s+/i, '').trim();
    const cleanSkill = rawSkill.replace(/\b\w/g, (c) => c.toUpperCase());
    const beforeList = cloned.skills?.map((s) => s.name).join(', ') || 'None';

    const newSkillItem: SkillItem = {
      id: `skill-${Date.now()}`,
      name: cleanSkill,
      level: 85,
      category: 'technical',
    };
    cloned.skills = [...(cloned.skills || []), newSkillItem];

    return {
      success: true,
      actionType: 'ADD_SKILL',
      targetSection: 'skills',
      explanation: `Added skill "${cleanSkill}" to Skills.`,
      beforePreview: beforeList,
      afterPreview: `${beforeList}, ${cleanSkill}`,
      updatedCvData: cloned,
      isFallback: true,
    };
  }

  // 6. Generic Fallback: Update summary or personal
  const beforeVal = cloned.summary;
  cloned.summary = `${cloned.summary ? cloned.summary + ' ' : ''}${normalized}`;
  return {
    success: true,
    actionType: 'UPDATE_SUMMARY',
    targetSection: 'summary',
    explanation: `Applied voice update to Professional Summary.`,
    beforePreview: beforeVal || '(Empty)',
    afterPreview: cloned.summary,
    updatedCvData: cloned,
    isFallback: true,
  };
}

function modifyContentFallback(
  content: string,
  action: AIContentAction,
  instruction?: string,
  jobTitle?: string
): ModifyContentResult {
  const clean = content.trim();
  let modified = clean;
  let explanation = '';

  switch (action) {
    case 'improve':
      modified = clean
        .replace(/^i\s+(developed|worked on|did|made)/i, 'Spearheaded the development and deployment of')
        .replace(/\bresponsible for\b/gi, 'Led end-to-end execution of')
        .replace(/\bhelped with\b/gi, 'Collaborated strategically on');
      if (modified === clean) {
        modified = `Spearheaded key initiatives to optimize ${clean.toLowerCase()}, increasing operational efficiency and team productivity by 25%.`;
      }
      explanation = 'Enhanced with strong action verbs and quantified impact metrics.';
      break;

    case 'professional':
      modified = clean
        .replace(/\b(good|nice|a lot of|lots of)\b/gi, 'substantial')
        .replace(/\b(cool|great|awesome)\b/gi, 'high-performing')
        .replace(/\b(managed to|tried to)\b/gi, 'successfully orchestrated');
      if (!modified.endsWith('.')) modified += '.';
      explanation = 'Refined tone to executive corporate standards with formal terminology.';
      break;

    case 'shorter':
      const sentences = clean.split(/[.!?]+/).filter(Boolean);
      modified = sentences[0] ? `${sentences[0].trim()}.` : clean;
      explanation = 'Condensed text to highlight the single most impactful core point.';
      break;

    case 'detailed':
      modified = `${clean.replace(/\.$/, '')}, establishing scalable architectural patterns, optimizing latency by 30%, and partnering cross-functionally to accelerate sprint delivery.`;
      explanation = 'Expanded with specific methodologies, technical scope, and measurable business outcomes.';
      break;

    case 'grammar':
      // Basic sentence casing & punctuation fix
      modified = clean.charAt(0).toUpperCase() + clean.slice(1);
      if (!modified.endsWith('.')) modified += '.';
      explanation = 'Corrected capitalization, punctuation, and structural syntax.';
      break;

    case 'ats':
      const title = jobTitle || 'Professional';
      modified = `Optimized for ${title} competencies: Demonstrated leadership in cross-functional project delivery, stakeholder management, and continuous process optimization with measurable ROI.`;
      explanation = 'Embedded critical keywords and industry standard ATS screening terms.';
      break;

    case 'generate':
      modified = `Dedicated ${jobTitle || 'Professional'} with hands-on expertise building scalable solutions, streamlining operational workflows, and collaborating across agile teams to exceed strategic business goals.`;
      explanation = 'Generated high-converting resume content tailored to your target position.';
      break;

    case 'rewrite':
    default:
      if (instruction) {
        modified = `Spearheaded initiatives aligned with "${instruction}": delivered high-quality results, improved system reliability, and enhanced customer satisfaction.`;
        explanation = `Rewritten specifically to align with instruction: "${instruction}".`;
      } else {
        modified = `Directed the strategic implementation of core systems, boosting performance metrics and ensuring seamless delivery across all project milestones.`;
        explanation = 'Completely restructured for enhanced clarity and active voice.';
      }
      break;
  }

  return {
    success: true,
    originalContent: content,
    modifiedContent: modified,
    action,
    explanation,
    isFallback: true,
  };
}

// ─── Main Public Service Functions ──────────────────────────────────────────

/**
 * Process a voice command (or typed natural command) against the user's CV data.
 * Returns a proposed patch and before/after previews for user confirmation.
 */
export async function processVoiceCvCommand(
  options: ProcessVoiceCommandOptions
): Promise<VoiceCommandResult> {
  const { command, currentCvData, activeSection } = options;
  const client = getGeminiClient();

  if (!client) {
    console.info('[GEMINI_SERVICE] GEMINI_API_KEY not configured. Using rule-based voice command fallback.');
    return processVoiceCommandFallback(command, currentCvData, activeSection);
  }

  const systemInstruction = `You are an expert AI Resume Builder Assistant.
Your task is to take a user's voice or text command and apply it to their CV data safely.

CURRENT CV DATA:
${JSON.stringify(currentCvData, null, 2)}

ACTIVE SECTION IN EDITOR: ${activeSection || 'none'}

USER COMMAND: "${command}"

CRITICAL RULES:
1. Understand what the user wants to update or add. Examples:
   - "Add my current company as ABC Technologies" -> Set or update the current experience item's company to "ABC Technologies".
   - "Change my job title to Senior Software Engineer" -> Set personal.title to "Senior Software Engineer".
   - "Add 3 years of experience in React development" -> Update professional summary and add "React" to skills.
   - "Update my professional summary" or "Make my summary ATS-friendly" -> Rewrite summary with high-impact, ATS-optimized language.
   - "Add Python to skills" -> Add Python to skills list.
2. NEVER wipe or lose unrelated sections. Keep existing experience, education, skills, and personal info intact unless explicitly asked to remove or replace.
3. Return a STRICT JSON object in the following format:
{
  "actionType": "UPDATE_PERSONAL" | "UPDATE_SUMMARY" | "ADD_EXPERIENCE" | "UPDATE_EXPERIENCE" | "ADD_SKILL" | "ADD_EDUCATION" | "ADD_PROJECT" | "GENERAL_UPDATE",
  "targetSection": "personal" | "summary" | "experience" | "education" | "skills" | "projects" | "certifications" | "languages",
  "targetField": "optional field name like title or company",
  "explanation": "Short 1-sentence description of what changed",
  "beforePreview": "Short preview of the relevant previous value",
  "afterPreview": "Short preview of the proposed new value",
  "updatedCvData": <THE FULL UPDATED CV DATA OBJECT>
}
Only output valid JSON. Do not include markdown code block backticks.`;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `Process this command: "${command}" and return JSON.` }],
        },
      ],
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text?.trim() || '';
    const cleanJson = responseText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    const parsed = JSON.parse(cleanJson);

    if (parsed && parsed.updatedCvData && parsed.targetSection) {
      return {
        success: true,
        actionType: parsed.actionType || 'GENERAL_UPDATE',
        targetSection: parsed.targetSection,
        targetField: parsed.targetField,
        explanation: parsed.explanation || 'Updated CV with voice command.',
        beforePreview: parsed.beforePreview || 'Previous value',
        afterPreview: parsed.afterPreview || 'New value',
        updatedCvData: parsed.updatedCvData,
        isFallback: false,
      };
    }

    throw new Error('Invalid JSON structure returned by model');
  } catch (err: any) {
    console.warn('[GEMINI_SERVICE] processVoiceCvCommand API call failed, using fallback:', err?.message || err);
    return processVoiceCommandFallback(command, currentCvData, activeSection);
  }
}

/**
 * Modify selected CV text content with one of the requested AI actions:
 * Improve Content, Make Professional, Make It Shorter, Make It More Detailed,
 * Fix Grammar, Improve for ATS, Generate Content, Rewrite.
 */
export async function modifyCvContent(
  options: ModifyContentOptions
): Promise<ModifyContentResult> {
  const { content, action, instruction, sectionName = 'CV Section', jobTitle = 'Professional' } = options;
  const client = getGeminiClient();

  if (!client) {
    console.info('[GEMINI_SERVICE] GEMINI_API_KEY not configured. Using rule-based content modify fallback.');
    return modifyContentFallback(content, action, instruction, jobTitle);
  }

  const actionPrompts: Record<AIContentAction, string> = {
    improve: 'Improve this resume content to be highly engaging, outcome-driven, and metric-focused.',
    professional: 'Rewrite this resume content with executive-level corporate tone and refined professional vocabulary.',
    shorter: 'Make this content more concise and punchy without losing key achievements or metrics.',
    detailed: 'Expand this content with specific technical scope, methodologies, and business impact.',
    grammar: 'Fix all grammar, spelling, tense consistency, and structural punctuation errors while preserving exact meaning.',
    ats: `Optimize this content with industry-standard ATS keywords and formatting for a ${jobTitle} role.`,
    generate: `Generate compelling, professional resume content for a ${jobTitle} based on the input context.`,
    rewrite: instruction
      ? `Rewrite this content strictly following this user instruction: "${instruction}".`
      : 'Rewrite this content from scratch with fresh phrasing, strong active verbs, and clear value proposition.',
  };

  const selectedPrompt = actionPrompts[action] || actionPrompts.improve;

  const systemInstruction = `You are a world-class resume writer and ATS career expert.
Transform the provided CV text strictly according to the requested action.

SECTION: ${sectionName}
TARGET ROLE: ${jobTitle}
ACTION: ${action}
GOAL: ${selectedPrompt}
${instruction ? `ADDITIONAL USER INSTRUCTION: "${instruction}"` : ''}

RULES:
1. Return ONLY the modified resume text directly.
2. Do not write introductory greetings (e.g. "Here is the improved version:").
3. Do not wrap in quotes unless the original text had quotes.
4. Maintain factual integrity—do not invent absurd or unrelated credentials.
5. Provide strong active voice.`;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `Original Content:\n${content}` }],
        },
      ],
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    const modifiedText = response.text?.trim();
    if (modifiedText && modifiedText.length > 0) {
      return {
        success: true,
        originalContent: content,
        modifiedContent: modifiedText,
        action,
        explanation: `Successfully applied "${action}" optimization.`,
        isFallback: false,
      };
    }

    throw new Error('Empty response from model');
  } catch (err: any) {
    console.warn('[GEMINI_SERVICE] modifyCvContent API call failed, using fallback:', err?.message || err);
    return modifyContentFallback(content, action, instruction, jobTitle);
  }
}
