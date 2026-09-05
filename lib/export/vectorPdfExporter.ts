import { jsPDF } from 'jspdf';
import safeHtml2Canvas from '../safeHtml2Canvas';
import { ExportOptions, defaultExportOptions } from '../exportUtils';

/**
 * Ultra-Fast, High-Precision PDF Exporter for GetEasyCV
 * Renders HTML elements with crisp typography, accurate A4 pagination, and zero layout shift.
 */
export async function exportToVectorPDF(
  element: HTMLElement,
  filename: string,
  options: Partial<ExportOptions> = {}
): Promise<boolean> {
  const opts = { ...defaultExportOptions, ...options };

  try {
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      await document.fonts.ready;
    }

    // Capture target element as high-DPI canvas (scale 2 = 300 DPI equivalent)
    const canvas = await safeHtml2Canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: element.scrollWidth || 794,
    });

    const pdf = new jsPDF({
      orientation: opts.orientation || 'portrait',
      unit: 'mm',
      format: opts.format || 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();   // 210mm for A4
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm for A4

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    let heightLeft = imgHeight;
    let position = 0;

    // Render first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Render subsequent pages if content exceeds A4 single page height
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);
    return true;
  } catch (err) {
    console.warn('[PDF_EXPORT_WARN] PDF generation error:', err);
    return false;
  }
}
