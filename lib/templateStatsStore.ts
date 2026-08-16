/**
 * In-memory template download count tracking.
 * Starts from 0 for all templates and increments dynamically on user downloads.
 */

const globalForStats = globalThis as unknown as {
  templateDownloadsMap: Map<string, number> | undefined;
};

const downloadsMap = globalForStats.templateDownloadsMap ?? new Map<string, number>();
if (process.env.NODE_ENV !== 'production') {
  globalForStats.templateDownloadsMap = downloadsMap;
}

export function getTemplateDownloadCount(templateId: string): number {
  if (!templateId) return 0;
  return downloadsMap.get(templateId) || 0;
}

export function incrementTemplateDownloadCount(templateId: string): number {
  if (!templateId) return 1;
  const current = getTemplateDownloadCount(templateId);
  const updated = current + 1;
  downloadsMap.set(templateId, updated);
  return updated;
}

export function getAllTemplateDownloadCounts(): Record<string, number> {
  const result: Record<string, number> = {};
  downloadsMap.forEach((count, id) => {
    result[id] = count;
  });
  return result;
}

export function formatDownloadCount(count: number): string {
  if (!count || count <= 0) return '0';
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return count.toLocaleString();
}
