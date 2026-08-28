import { jsPDF } from 'jspdf';
import { ExportOptions, defaultExportOptions } from '../exportUtils';

/**
 * High-precision Vector PDF Exporter
 * Renders HTML elements directly as native PDF vector text and paths.
 * Ensures text in exported PDF is 100% selectable, searchable by ATS parsers, and links are clickable.
 */
export async function exportToVectorPDF(
  element: HTMLElement,
  filename: string,
  options: Partial<ExportOptions> = {}
): Promise<boolean> {
  const opts = { ...defaultExportOptions, ...options };

  try {
    // Wait for fonts and images inside element
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    const pdf = new jsPDF({
      orientation: opts.orientation,
      unit: 'mm',
      format: opts.format,
      compress: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = opts.margin;

    // Use jsPDF's html rendering engine for true vector text & clickable link parsing
    await pdf.html(element, {
      callback: (doc) => {
        doc.save(filename);
      },
      x: margin,
      y: margin,
      width: pageWidth - margin * 2,
      windowWidth: element.scrollWidth || 794,
      autoPaging: 'text',
      html2canvas: {
        scale: 0.75,
        useCORS: true,
        allowTaint: true,
        logging: false,
      },
    });

    return true;
  } catch (err) {
    console.warn('[VECTOR_PDF_WARN] Vector PDF generation fallback:', err);
    return false;
  }
}
