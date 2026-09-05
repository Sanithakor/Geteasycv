import { NextRequest, NextResponse } from 'next/server';
import { processVoiceCvCommand } from '@/lib/ai/geminiService';
import { checkRateLimit, createRateLimitResponse } from '@/lib/middleware/rateLimit';

export async function POST(req: NextRequest) {
  // Rate limit: 30 voice commands per 10 minutes
  const rateLimit = checkRateLimit(req, {
    windowMs: 10 * 60 * 1000,
    max: 30,
    keyPrefix: 'ai_voice_command',
  });

  if (!rateLimit.success) {
    return createRateLimitResponse(
      rateLimit.retryAfter,
      'Too many voice requests. Please wait a moment before trying again.'
    );
  }

  try {
    const body = await req.json();
    const { command, currentCvData, activeSection } = body;

    if (!command || typeof command !== 'string' || command.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide a valid voice or text command.' },
        { status: 400 }
      );
    }

    if (!currentCvData || typeof currentCvData !== 'object') {
      return NextResponse.json(
        { error: 'Invalid CV data payload provided.' },
        { status: 400 }
      );
    }

    const result = await processVoiceCvCommand({
      command: command.trim(),
      currentCvData,
      activeSection,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error in /api/ai/voice-command:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process voice command.' },
      { status: 500 }
    );
  }
}
