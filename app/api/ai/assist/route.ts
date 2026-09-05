/**
 * POST /api/ai/assist
 * Centralized AI field-level content optimization for resume fields.
 * Respects per-user AI credit limits & rate limiting.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthFromRequest } from '@/lib/middleware/auth';
import { prisma } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/middleware/rateLimit';
import { executeAITask } from '@/lib/ai/openaiService';
import { buildFieldPolishPrompts } from '@/lib/ai/prompts';

// Rule-based fallback generator when OpenAI key is absent or API fails
function generateFallbackSuggestion(fieldName: string, fieldValue: string): {
  original: string;
  suggestion: string;
  fieldName: string;
  explanation: string;
} {
  const normalized = fieldName.toLowerCase();
  let suggestion = fieldValue.trim();

  if (normalized.includes('summary')) {
    const sentences = fieldValue.split('.').filter((s) => s.trim().length > 0);
    if (sentences.length > 0) {
      const first = sentences[0]
        .trim()
        .replace(/^I am a?n?\s*/i, '')
        .replace(/^I have/i, 'Bringing')
        .replace(/^I /i, 'Accomplished professional who ');
      suggestion = [first + '.', ...sentences.slice(1)].join(' ').trim();
    }
  } else if (normalized.includes('description') || normalized.includes('role')) {
    const actionVerbs = ['Spearheaded', 'Orchestrated', 'Delivered', 'Championed', 'Engineered'];
    const verb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
    suggestion = fieldValue.replace(/^(Worked on|Was responsible for|Helped with|Did)/i, verb);
  } else if (normalized.includes('achievement') || normalized.includes('accomplishment')) {
    const lines = fieldValue.split('\n').filter((l) => l.trim());
    suggestion = lines
      .map((line) => {
        const clean = line.replace(/^[•\-*]\s*/, '').trim();
        return `• ${clean.charAt(0).toUpperCase() + clean.slice(1)}`;
      })
      .join('\n');
  } else {
    const trimmed = fieldValue.trim();
    const cap = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    suggestion = cap.endsWith('.') ? cap : cap + '.';
  }

  return {
    original: fieldValue,
    suggestion,
    fieldName,
    explanation: 'Enhanced clarity and active verb structure for improved ATS readability.',
  };
}

export async function POST(req: NextRequest) {
  // 1. Rate Limit: 20 requests per 10 minutes per IP
  const rateLimit = checkRateLimit(req, {
    windowMs: 10 * 60 * 1000,
    max: 20,
    keyPrefix: 'ai_assist',
  });

  if (!rateLimit.success) {
    return createRateLimitResponse(
      rateLimit.retryAfter,
      'Too many AI assist requests. Please wait a few minutes before trying again.'
    );
  }

  try {
    const auth = await getAuthFromRequest(req);
    const body = await req.json();
    const {
      fieldName = 'content',
      fieldValue = '',
      jobTitle = 'Professional',
      templateCategory = 'Professional',
      templateTone = 'Modern',
      context = '',
    } = body;

    if (!fieldValue || typeof fieldValue !== 'string' || fieldValue.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please provide valid text content to optimize.' },
        { status: 400 }
      );
    }

    let creditsRemaining: number | null = null;
    let creditsLimit: number | null = null;
    let isUnlimited = false;

    // 2. Check AI Credits & Plan Access if User is Authenticated
    if (auth?.userId) {
      const planTier = (auth.subscriptionTier || 'free').toLowerCase();

      // Starter plan does not include the AI Resume Bullet Rewriter
      if (planTier === 'starter') {
        return NextResponse.json(
          {
            error: 'AI Resume Bullet Rewriter is an exclusive feature of Pro and Lifetime plans. Upgrade to Pro or Lifetime to unlock unlimited AI suggestions.',
            code: 'PLAN_UPGRADE_REQUIRED',
            requiredPlan: 'pro',
          },
          { status: 403 }
        );
      }

      isUnlimited = planTier === 'pro' || planTier === 'lifetime' || planTier === 'premium';
      creditsLimit = isUnlimited ? null : 10;

      if (!isUnlimited) {
        try {
          const sub = await prisma.subscription.findUnique({
            where: { userId: auth.userId },
          });

          const currentCredits = sub?.aiCredits ?? 10;

          if (currentCredits <= 0) {
            return NextResponse.json(
              {
                error: 'AI credit limit reached (0 credits remaining). Upgrade to Pro for unlimited AI suggestions.',
                code: 'AI_CREDITS_EXHAUSTED',
                creditsRemaining: 0,
                creditsLimit: 10,
                isUnlimited: false,
              },
              { status: 429 }
            );
          }

          if (sub) {
            const updatedSub = await prisma.subscription.update({
              where: { userId: auth.userId },
              data: { aiCredits: { decrement: 1 } },
            });
            creditsRemaining = updatedSub.aiCredits;
          } else {
            creditsRemaining = currentCredits - 1;
          }
        } catch (dbErr) {
          console.warn('[AI_ASSIST_DB_CREDIT_WARN]', dbErr);
        }
      }
    }

    // 3. Build Prompts & Execute via Centralized OpenAI Service
    const { systemPrompt, userPrompt } = buildFieldPolishPrompts({
      fieldName,
      fieldValue,
      jobTitle,
      templateCategory,
      templateTone,
      context,
    });

    const aiResult = await executeAITask({
      featureName: `field_assist_${fieldName}`,
      systemPrompt,
      userPrompt,
      fallbackFn: () => generateFallbackSuggestion(fieldName, fieldValue),
    });

    // 4. Log Activity for Analytics / Audit
    if (auth?.userId) {
      try {
        await prisma.activityLog.create({
          data: {
            userId: auth.userId,
            action: 'AI_FIELD_ASSIST',
            details: `Optimized field "${fieldName}" for ${jobTitle}. Tokens: ${aiResult.tokensUsed?.totalTokens || 0}`,
          },
        });
      } catch (logErr) {
        // Non-blocking
      }
    }

    return NextResponse.json({
      success: true,
      original: aiResult.data.original || fieldValue,
      suggestion: aiResult.data.suggestion,
      fieldName: aiResult.data.fieldName || fieldName,
      explanation: aiResult.data.explanation || '',
      isFallback: aiResult.isFallback,
      creditsRemaining,
      creditsLimit,
      isUnlimited,
    });
  } catch (error) {
    console.error('[AI_ASSIST_API_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to process AI assist request. Please try again.' },
      { status: 500 }
    );
  }
}
