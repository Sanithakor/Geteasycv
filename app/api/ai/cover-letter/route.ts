import { NextResponse } from 'next/server';
import { getAuthFromRequest } from '@/lib/middleware/auth';

export async function POST(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    const body = await req.json();
    const { jobTitle = 'Software Engineer', companyName = 'Tech Corp', jobDescription = '', candidateName = 'Job Seeker', skills = [] } = body;

    // AI Cover Letter Draft Generator
    const skillsList = Array.isArray(skills) && skills.length > 0 ? skills.join(', ') : 'modern software development tools and methodologies';

    const coverLetterText = `Dear Hiring Team at ${companyName},

I am writing to express my enthusiastic interest in the ${jobTitle} position. With a strong background in ${skillsList}, I am confident in my ability to make an immediate, meaningful impact on your team.

Throughout my career, I have consistently focused on delivering clean, scalable solutions and driving business outcomes. In reviewing the requirements for the ${jobTitle} role, I noticed a strong emphasis on expertise in ${skillsList}. These directly align with my hands-on experience and professional strengths.

At ${companyName}, I would welcome the opportunity to leverage my expertise to help accelerate your core product goals. Thank you for your time and consideration. I look forward to discussing how my background and technical capabilities fit your needs.

Sincerely,
${candidateName}`;

    return NextResponse.json({
      success: true,
      coverLetter: coverLetterText,
    });
  } catch (error) {
    console.error('[AI_COVER_LETTER_API_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to generate AI cover letter' },
      { status: 500 }
    );
  }
}
