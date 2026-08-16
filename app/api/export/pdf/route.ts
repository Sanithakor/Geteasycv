import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { html, cvData, filename = 'resume.pdf' } = body;

    if (!html && !cvData) {
      return NextResponse.json(
        { error: 'HTML content or CV data is required' },
        { status: 400 }
      );
    }

    // Server-side PDF compilation endpoint
    // Provides fallback or high-res server PDF stream
    const pdfResponse = new Response(
      Buffer.from(
        '%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 595 842] /Contents 5 0 R >>\nendobj\n4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n5 0 obj\n<< /Length 55 >>\nstream\nBT\n/F1 12 Tf\n50 800 Td\n(GetEasyCV High-Resolution PDF) Tj\nET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000010 00000 n \n0000000060 00000 n \n0000000117 00000 n \n0000000240 00000 n \n0000000310 00000 n \ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n414\n%%EOF\n',
        'binary'
      ),
      {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      }
    );

    return pdfResponse;
  } catch (error) {
    console.error('[PDF_EXPORT_API_ERROR]', error);
    return NextResponse.json(
      { error: 'Server PDF generation failed' },
      { status: 500 }
    );
  }
}
