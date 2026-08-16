/**
 * POST /api/ai/resume-improve
 * Centralized AI Resume Section & Bullet Point Improvement API.
 * Optimizes statements for impact, ATS readability, professional tone, or brevity.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthFromRequest } from '@/lib/middleware/auth';
import { prisma } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/middleware/rateLimit';
import { executeAITask } from '@/lib/ai/openaiService';
import { buildResumeImprovePrompts } from '@/lib/ai/prompts';

interface ResumeImproveResult {
  original: string;
  improvedContent: string;
  action: string;
  keywordsAdded: string[];
  explanation: string;
}

function generateFallbackImprovement(
  content: string,
  action: string,
  jobTitle: string
): ResumeImproveResult {
  const cleanInput = content.trim().replace(/^[-•*]\s*/, '');
  const lowerInput = cleanInput.toLowerCase();
  let suggestion = cleanInput;

  if (action === 'optimize_ats') {
    if (lowerInput.includes('customer') || lowerInput.includes('support')) {
      suggestion = 'Drove customer satisfaction through strategic relationship management and proactive conflict resolution';
    } else if (lowerInput.includes('code') || lowerInput.includes('develop') || lowerInput.includes('app')) {
      suggestion = `Architected and deployed scalable ${jobTitle || 'software'} solutions utilizing modern frameworks, reducing load latency and improving system uptime`;
    } else {
      suggestion = `Optimized ${cleanInput.toLowerCase()} by integrating industry-aligned technical workflows and compliance standards to maximize ATS readability`;
    }
  } else if (action === 'add_impact') {
    suggestion = `Spearheaded ${cleanInput.toLowerCase()}, achieving a [X]% increase in operational efficiency and saving [N] hours per week`;
  } else if (action === 'make_professional') {
    suggestion = `Directed core responsibilities for ${cleanInput.toLowerCase()}, ensuring high standards of execution and seamless team collaboration`;
  } else if (action === 'make_concise') {
    suggestion = `Streamlined ${cleanInput.toLowerCase()} to accelerate project delivery timelines`;
  } else {
    const actionVerbs = ['Spearheaded', 'Orchestrated', 'Delivered', 'Championed'];
    const verb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
    suggestion = `${verb} ${cleanInput.toLowerCase()} to drive core functional performance`;
  }

  return {
    original: content,
    improvedContent: suggestion,
    action,
    keywordsAdded: ['optimized', 'spearheaded'],
    explanation: 'Enhanced using high-impact active verbs and clear outcome structure.',
  };
}

export async function POST(req: NextRequest) {
  // 1. Rate Limit: 15 requests per 10 minutes per IP
  const rateLimit = checkRateLimit(req, {
    windowMs: 10 * 60 * 1000,
    max: 15,
    keyPrefix: 'ai_resume_improve',
  });

  if (!rateLimit.success) {
    return createRateLimitResponse(
      rateLimit.retryAfter,
      'Too many AI requests. Please wait a few minutes before trying again.'
    );
  }

  try {
    const auth = await getAuthFromRequest(req);
    const body = await req.json();
    const {
      content = '',
      action = 'improve_bullet',
      jobTitle = 'Professional',
      industry = 'General',
      jobDescription = '',
    } = body;

    if (!content || typeof content !== 'string' || content.trim().length < 3) {
      return NextResponse.json(
        { error: 'Please provide valid resume content to improve (minimum 3 characters).' },
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
              error: 'AI credit limit reached (0 credits remaining). Upgrade to Pro for unlimited AI suggestions.',
              code: 'AI_CREDITS_EXHAUSTED',
              creditsRemaining: 0,
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
        } else if (sub) {
          creditsRemaining = sub.aiCredits;
        }
      } catch (dbErr) {
        console.warn('[AI_IMPROVE_DB_WARN]', dbErr);
      }
    }

    // 3. Build Prompts & Execute via Centralized OpenAI Service
    const { systemPrompt, userPrompt } = buildResumeImprovePrompts({
      content,
      action: action as any,
      jobTitle,
      industry,
      jobDescription,
    });

    const aiResult = await executeAITask<ResumeImproveResult>({
      featureName: `resume_improve_${action}`,
      systemPrompt,
      userPrompt,
      fallbackFn: () => generateFallbackImprovement(content, action, jobTitle),
    });

    // 4. Log Activity
    if (auth?.userId) {
      try {
        await prisma.activityLog.create({
          data: {
            userId: auth.userId,
            action: 'AI_RESUME_IMPROVE',
            details: `Action: ${action} for ${jobTitle}. Tokens: ${aiResult.tokensUsed?.totalTokens || 0}`,
          },
        });
      } catch (logErr) {
        // Non-blocking
      }
    }

    return NextResponse.json({
      success: true,
      original: content,
      improvedContent: aiResult.data.improvedContent,
      action: aiResult.data.action || action,
      keywordsAdded: aiResult.data.keywordsAdded || [],
      explanation: aiResult.data.explanation || '',
      isFallback: aiResult.isFallback,
      creditsRemaining,
    });
  } catch (error) {
    console.error('[AI_RESUME_IMPROVE_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to improve resume content. Please try again.' },
      { status: 500 }
    );
  }
}
