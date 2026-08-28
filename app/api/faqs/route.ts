import { NextResponse } from 'next/server';
import { ALL_FAQS } from '@/data/faqs';

export async function GET() {
  return NextResponse.json({ success: true, data: ALL_FAQS });
}
