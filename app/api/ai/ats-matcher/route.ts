/**
 * POST /api/ai/ats-matcher
 * Centralized AI ATS & Job Description Matcher API.
 * Compares candidate resume against target job description and returns structured match metrics.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthFromRequest } from '@/lib/middleware/auth';
import { prisma } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/middleware/rateLimit';
import { executeAITask } from '@/lib/ai/openaiService';
import { buildATSMatcherPrompts } from '@/lib/ai/prompts';

interface ATSMatcherResult {
  matchScore: number;
  summary: string;
  matchingKeywords: string[];
  missingKeywords: string[];
  matchingSkills: string[];
  missingSkills: string[];
  experienceGaps: string[];
  sectionRecommendations: Array<{
    section: string;
    advice: string;
  }>;
}

function generateFallbackATSAnalysis(
  resumeContent: string,
  jobDescription: string,
  targetRole: string
): ATSMatcherResult {
  const resumeLower = resumeContent.toLowerCase();
  const jdWords = Array.from(
    new Set(
      jobDescription
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 3)
    )
  );

  const matched = jdWords.filter((word) => resumeLower.includes(word));
  const missing = jdWords.filter((word) => !resumeLower.includes(word));

  const total = jdWords.length || 1;
  const score = Math.min(95, Math.max(55, Math.round((matched.length / total) * 100)));

  return {
    matchScore: score,
    summary: `Your resume demonstrates good overall alignment for ${targetRole || 'the target position'}. Adding missing technical keywords will further increase your ATS pass rate.`,
    matchingKeywords: matched.slice(0, 8),
    missingKeywords: missing.slice(0, 8),
    matchingSkills: matched.slice(0, 5),
    missingSkills: missing.slice(0, 5),
    experienceGaps: ['Quantitative metrics could be enhanced in your experience section.'],
    sectionRecommendations: [
      {
        section: 'Skills',
        advice: `Include target keywords such as ${missing.slice(0, 3).join(', ')} in your core skills list.`,
      },
      {
        section: 'Experience',
        advice: 'Ensure job titles match the exact target position phrasing used in the job description.',
      },
    ],
  };
}

export async function POST(req: NextRequest) {
  // 1. Rate Limit: 10 requests per 10 minutes per IP
  const rateLimit = checkRateLimit(req, {
    windowMs: 10 * 60 * 1000,
    max: 10,
    keyPrefix: 'ai_ats_matcher',
  });

  if (!rateLimit.success) {
    return createRateLimitResponse(
      rateLimit.retryAfter,
      'Too many ATS analysis requests. Please wait a few minutes before trying again.'
    );
  }

  try {
    const auth = await getAuthFromRequest(req);
    const body = await req.json();
    const {
      resumeContent = '',
      jobDescription = '',
      targetRole = 'Target Position',
    } = body;

    if (!jobDescription || jobDescription.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a valid job description (minimum 10 characters).' },
        { status: 400 }
      );
    }

    if (!resumeContent || resumeContent.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide resume content to evaluate against the job description.' },
        { status: 400 }
      );
    }

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
              error: 'AI credit limit reached (0 credits remaining). Upgrade to Pro for unlimited ATS matcher scans.',
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
        console.warn('[AI_ATS_MATCHER_DB_WARN]', dbErr);
      }
    }

    // 3. Build Prompts & Execute via Centralized OpenAI Service
    const { systemPrompt, userPrompt } = buildATSMatcherPrompts({
      resumeContent,
      jobDescription,
      targetRole,
    });

    const aiResult = await executeAITask<ATSMatcherResult>({
      featureName: 'ats_matcher_scan',
      systemPrompt,
      userPrompt,
      fallbackFn: () => generateFallbackATSAnalysis(resumeContent, jobDescription, targetRole),
    });

    // 4. Log Activity
    if (auth?.userId) {
      try {
        await prisma.activityLog.create({
          data: {
            userId: auth.userId,
            action: 'AI_ATS_MATCHER',
            details: `Scanned ATS match score: ${aiResult.data.matchScore}% for ${targetRole}. Tokens: ${aiResult.tokensUsed?.totalTokens || 0}`,
          },
        });
      } catch (logErr) {
        // Non-blocking
      }
    }

    return NextResponse.json({
      success: true,
      analysis: aiResult.data,
      isFallback: aiResult.isFallback,
      creditsRemaining,
      disclaimer: 'ATS score analysis is designed for optimization guidance and does not guarantee job interview callbacks.',
    });
  } catch (error) {
    console.error('[AI_ATS_MATCHER_API_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to perform ATS job matcher scan' },
      { status: 500 }
    );
  }
}
