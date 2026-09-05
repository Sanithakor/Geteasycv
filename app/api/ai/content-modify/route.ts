import { NextRequest, NextResponse } from 'next/server';
import { modifyCvContent, AIContentAction } from '@/lib/ai/geminiService';
import { checkRateLimit, createRateLimitResponse } from '@/lib/middleware/rateLimit';

const ALLOWED_ACTIONS: AIContentAction[] = [
  'improve',
  'professional',
  'shorter',
  'detailed',
  'grammar',
  'ats',
  'generate',
  'rewrite',
];

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, {
    windowMs: 10 * 60 * 1000,
    max: 40,
    keyPrefix: 'ai_content_modify',
  });

  if (!rateLimit.success) {
    return createRateLimitResponse(
      rateLimit.retryAfter,
      'Too many AI requests. Please wait a moment before trying again.'
    );
  }

  try {
    const body = await req.json();
    const {
      content = '',
      action = 'improve',
      instruction = '',
      sectionName = 'Section',
      jobTitle = 'Professional',
      industry = 'General',
    } = body;

    // Check action
    const validatedAction: AIContentAction = ALLOWED_ACTIONS.includes(action)
      ? action
      : 'improve';

    // If generating from scratch, empty content is acceptable if jobTitle or instruction exists
    if (!content && validatedAction !== 'generate' && !instruction) {
      return NextResponse.json(
        { error: 'Please select or provide content to modify.' },
        { status: 400 }
      );
    }

    const result = await modifyCvContent({
      content: content || `Target position: ${jobTitle}`,
      action: validatedAction,
      instruction,
      sectionName,
      jobTitle,
      industry,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error in /api/ai/content-modify:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to modify content with AI.' },
      { status: 500 }
    );
  }
}
