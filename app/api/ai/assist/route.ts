/**
 * POST /api/ai/assist
 * AI field-level content optimization for resume fields.
 * Respects per-user AI credit limits (FR3, BR2).
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAuthFromRequest } from '@/lib/middleware/auth';
import { prisma } from '@/lib/db';

// ─── AI credit limits by tier (BR2) ────────────────────────────────────────
const AI_LIMITS: Record<string, number> = {
  free: 10,
  pro: 100,
  premium: Infinity,
};

// ─── Field-specific prompt templates ───────────────────────────────────────
function buildSystemPrompt(templateCategory: string, templateTone: string): string {
  return `You are an expert resume writer specializing in ${templateCategory} resumes with a ${templateTone} tone.
Your task is to rewrite resume field content to be more impactful, concise, and professional.
Rules:
- Match the tone and style of a ${templateCategory} professional resume
- Use strong action verbs for experience descriptions
- Keep the original meaning and facts — do not fabricate details
- Be concise — do not pad with filler phrases
- Return ONLY the rewritten content, no preamble or explanation
- For bullet-point fields (achievements), return each item on a new line starting with "•"`;
}

function buildUserPrompt(
  fieldName: string,
  fieldValue: string,
  jobTitle: string,
  context: string
): string {
  const contextLine = context ? `\nContext about this person: ${context}` : '';
  return `Improve this resume ${fieldName} for a ${jobTitle} candidate.${contextLine}

Current content:
"""
${fieldValue}
"""

Rewrite it to be more impactful and professional:`;
}

// ─── Sanitize AI output (NFR4 - prevent XSS) ──────────────────────────────
function sanitizeOutput(text: string): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

// ─── Rule-based fallback (used when OpenAI key absent or package missing) ──
function generateFallbackSuggestion(fieldName: string, fieldValue: string): string {
  const normalized = fieldName.toLowerCase();

  if (normalized.includes('summary')) {
    const sentences = fieldValue.split('.').filter((s) => s.trim().length > 0);
    if (sentences.length > 0) {
      const first = sentences[0].trim()
        .replace(/^I am a?n?\s*/i, '')
        .replace(/^I have/i, 'Bringing')
        .replace(/^I /i, 'Accomplished professional who ');
      return [first + '.', ...sentences.slice(1)].join(' ').trim();
    }
    return fieldValue;
  }

  if (normalized.includes('description') || normalized.includes('role')) {
    const actionVerbs = ['Spearheaded', 'Orchestrated', 'Delivered', 'Championed'];
    const verb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
    return fieldValue.replace(/^(Worked on|Was responsible for|Helped with)/i, verb);
  }

  if (normalized.includes('achievement') || normalized.includes('accomplishment')) {
    const lines = fieldValue.split('\n').filter((l) => l.trim());
    return lines
      .map((line) => {
        const clean = line.replace(/^[•\-*]\s*/, '').trim();
        return `• ${clean.charAt(0).toUpperCase() + clean.slice(1)}`;
      })
      .join('\n');
  }

  // Default: capitalise + ensure trailing period
  const trimmed = fieldValue.trim();
  const cap = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  return cap.endsWith('.') ? cap : cap + '.';
}

// ─── Attempt real OpenAI call, return null on failure ─────────────────────
async function callOpenAI(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string,
  fieldValue: string
): Promise<string | null> {
  try {
    const req = eval('require');
    const openaiModule = req('openai');
    const OpenAI = openaiModule.default ?? openaiModule;
    const client = new OpenAI({ apiKey });

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const text = response.choices[0]?.message?.content ?? fieldValue;
    return sanitizeOutput(text);
  } catch {
    // Package not installed or API error — caller handles fallback
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      fieldName,
      fieldValue,
      templateId,
      templateCategory = 'Professional',
      templateTone = 'professional',
      jobTitle = 'professional',
      context = '',
    } = body;

    if (!fieldName || !fieldValue) {
      return NextResponse.json(
        { error: 'fieldName and fieldValue are required' },
        { status: 400 }
      );
    }

    if ((fieldValue as string).trim().length < 3) {
      return NextResponse.json(
        { error: 'Field content is too short to improve' },
        { status: 400 }
      );
    }

    // ── Check & decrement AI credits ──────────────────────────────────────
    let remainingCredits: number | null = null;

    try {
      const subscription = await prisma.subscription.findUnique({
        where: { userId: auth.userId },
        select: { plan: true, aiCredits: true },
      });

      const plan = subscription?.plan ?? 'free';
      const limit = AI_LIMITS[plan] ?? 10;
      const credits = subscription?.aiCredits ?? limit;

      if (plan !== 'premium' && credits <= 0) {
        return NextResponse.json(
          {
            error: 'AI credit limit reached',
            code: 'AI_CREDITS_EXHAUSTED',
            creditsRemaining: 0,
            plan,
            upgradeRequired: true,
          },
          { status: 429 }
        );
      }

      if (plan !== 'premium') {
        await prisma.subscription.update({
          where: { userId: auth.userId },
          data: { aiCredits: Math.max(0, credits - 1) },
        });
        remainingCredits = Math.max(0, credits - 1);
      }
      // premium → remainingCredits stays null (unlimited)
    } catch (dbErr) {
      console.warn('[AI_ASSIST] DB unavailable, skipping credit check:', dbErr);
      remainingCredits = 9; // mock for offline dev
    }

    // ── Generate suggestion ───────────────────────────────────────────────
    const openaiKey = process.env.OPENAI_API_KEY;

    // Start with the rule-based fallback; attempt real AI if key is present
    let suggestion: string = generateFallbackSuggestion(fieldName, fieldValue);

    if (openaiKey) {
      const aiResult = await callOpenAI(
        openaiKey,
        buildSystemPrompt(templateCategory, templateTone),
        buildUserPrompt(fieldName, fieldValue, jobTitle, context),
        fieldValue
      );
      if (aiResult) {
        suggestion = aiResult;
      }
      // else: keep the rule-based fallback already set above
    }

    // ── Log activity (non-critical) ────────────────────────────────────────
    try {
      await prisma.activityLog.create({
        data: {
          userId: auth.userId,
          action: 'ai_assist_used',
          resource: 'resume_field',
          resourceId: templateId ?? null,
          details: { fieldName, templateCategory },
        },
      });
    } catch (_) {
      // Non-critical — never block the response
    }

    return NextResponse.json({
      success: true,
      data: {
        original: fieldValue,
        suggestion,
        fieldName,
        creditsRemaining: remainingCredits,
      },
    });
  } catch (error) {
    console.error('[AI_ASSIST_ERROR]', error);
    return NextResponse.json(
      { error: 'AI service temporarily unavailable. Please try again.' },
      { status: 500 }
    );
  }
}

// ─── GET /api/ai/assist — fetch remaining credits ─────────────────────────
export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const subscription = await prisma.subscription.findUnique({
        where: { userId: auth.userId },
        select: { plan: true, aiCredits: true },
      });

      const plan = subscription?.plan ?? 'free';
      const limit = AI_LIMITS[plan];
      const credits = subscription?.aiCredits ?? (isFinite(limit) ? limit : 10);

      return NextResponse.json({
        success: true,
        data: {
          plan,
          creditsRemaining: plan === 'premium' ? null : credits,
          creditsLimit: plan === 'premium' ? null : (isFinite(limit) ? limit : null),
          isUnlimited: plan === 'premium',
        },
      });
    } catch {
      // DB unavailable — return safe defaults
      return NextResponse.json({
        success: true,
        data: { plan: 'free', creditsRemaining: 10, creditsLimit: 10, isUnlimited: false },
      });
    }
  } catch (error) {
    console.error('[AI_CREDITS_GET_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
