/**
 * POST /api/ai/cover-letter
 * Centralized AI Cover Letter Generator.
 * Generates tailored, structured cover letters using OpenAI or fallback logic.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthFromRequest } from '@/lib/middleware/auth';
import { prisma } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/middleware/rateLimit';
import { executeAITask } from '@/lib/ai/openaiService';
import { buildCoverLetterPrompts } from '@/lib/ai/prompts';

interface CoverLetterResult {
  recipient: string;
  salutation: string;
  openingParagraph: string;
  bodyParagraphs: string[];
  closingParagraph: string;
  fullText: string;
}

function generateFallbackCoverLetter(
  candidateName: string,
  jobTitle: string,
  companyName: string,
  skills: string[]
): CoverLetterResult {
  const skillsList = Array.isArray(skills) && skills.length > 0 ? skills.join(', ') : 'modern software development tools and methodologies';

  const openingParagraph = `I am writing to express my enthusiastic interest in the ${jobTitle} position at ${companyName}. With a strong background in ${skillsList}, I am confident in my ability to make an immediate, meaningful impact on your team.`;
  
  const body1 = `Throughout my career, I have consistently focused on delivering scalable solutions, streamlining workflows, and driving key product outcomes. In reviewing the requirements for the ${jobTitle} role, I noticed a strong emphasis on expertise in ${skillsList}. These directly align with my hands-on experience and professional strengths.`;
  
  const body2 = `I am particularly drawn to ${companyName}'s vision and culture of innovation. I welcome the opportunity to leverage my technical skills and collaborative approach to help accelerate your core team initiatives.`;

  const closingParagraph = `Thank you for your time and consideration. I look forward to discussing how my background and capabilities fit your team's needs.`;

  const fullText = `Dear Hiring Team at ${companyName},\n\n${openingParagraph}\n\n${body1}\n\n${body2}\n\n${closingParagraph}\n\nSincerely,\n${candidateName}`;

  return {
    recipient: `Hiring Team at ${companyName}`,
    salutation: `Dear Hiring Team at ${companyName},`,
    openingParagraph,
    bodyParagraphs: [body1, body2],
    closingParagraph,
    fullText,
  };
}

export async function POST(req: NextRequest) {
  // 1. Rate Limit: 10 requests per 10 minutes per IP
  const rateLimit = checkRateLimit(req, {
    windowMs: 10 * 60 * 1000,
    max: 10,
    keyPrefix: 'ai_cover_letter',
  });

  if (!rateLimit.success) {
    return createRateLimitResponse(
      rateLimit.retryAfter,
      'Too many cover letter generation requests. Please wait a few minutes before trying again.'
    );
  }

  try {
    const auth = await getAuthFromRequest(req);
    const body = await req.json();
    const {
      jobTitle = 'Software Engineer',
      companyName = 'Tech Corp',
      jobDescription = '',
      candidateName = 'Job Seeker',
      skills = [],
      experienceSummary = '',
      tone = 'Professional',
    } = body;

    let creditsRemaining: number | null = null;

    // 2. Check AI Credits
    if (auth?.userId) {
      try {
        const sub = await prisma.subscription.findUnique({
          where: { userId: auth.userId },
        });

        if (sub && sub.plan === 'free' && sub.aiCredits <= 0) {
          return NextResponse.json(
            {
              error: 'AI credit limit reached (0 credits remaining). Upgrade to Pro for unlimited cover letter generations.',
              code: 'AI_CREDITS_EXHAUSTED',
            },
            { status: 429 }
          );
        }

        if (sub && sub.plan === 'free' && sub.aiCredits > 0) {
          const updatedSub = await prisma.subscription.update({
            where: { userId: auth.userId },
            data: { aiCredits: { decrement: 1 } },
          });
          creditsRemaining = updatedSub.aiCredits;
        }
      } catch (dbErr) {
        console.warn('[AI_COVER_LETTER_DB_WARN]', dbErr);
      }
    }

    // 3. Build Prompts & Execute via Centralized OpenAI Service
    const { systemPrompt, userPrompt } = buildCoverLetterPrompts({
      candidateName,
      jobTitle,
      companyName,
      jobDescription,
      skills,
      experienceSummary,
      tone,
    });

    const aiResult = await executeAITask<CoverLetterResult>({
      featureName: 'cover_letter_generator',
      systemPrompt,
      userPrompt,
      fallbackFn: () => generateFallbackCoverLetter(candidateName, jobTitle, companyName, skills),
    });

    // 4. Log Activity
    if (auth?.userId) {
      try {
        await prisma.activityLog.create({
          data: {
            userId: auth.userId,
            action: 'AI_COVER_LETTER',
            details: `Generated cover letter for ${jobTitle} at ${companyName}. Tokens: ${aiResult.tokensUsed?.totalTokens || 0}`,
          },
        });
      } catch (logErr) {
        // Non-blocking
      }
    }

    return NextResponse.json({
      success: true,
      coverLetter: aiResult.data.fullText,
      structuredData: aiResult.data,
      isFallback: aiResult.isFallback,
      creditsRemaining,
    });
  } catch (error) {
    console.error('[AI_COVER_LETTER_API_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to generate AI cover letter' },
      { status: 500 }
    );
  }
}
