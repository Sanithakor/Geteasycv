/**
 * In-memory template download count tracking.
 * Maintains baseline and live download counts per template ID.
 */

const globalForStats = globalThis as unknown as {
  templateDownloadsMap: Map<string, number> | undefined;
};

const downloadsMap = globalForStats.templateDownloadsMap ?? new Map<string, number>();
if (process.env.NODE_ENV !== 'production') {
  globalForStats.templateDownloadsMap = downloadsMap;
}

// Generate deterministic baseline download count from template ID
function getBaselineCount(templateId: string): number {
  let hash = 0;
  for (let i = 0; i < templateId.length; i++) {
    hash = (hash << 5) - hash + templateId.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);
  // Returns baseline count between 320 and 2450
  return 320 + (positiveHash % 2130);
}

export function getTemplateDownloadCount(templateId: string): number {
  if (!templateId) return 450;
  if (!downloadsMap.has(templateId)) {
    downloadsMap.set(templateId, getBaselineCount(templateId));
  }
  return downloadsMap.get(templateId) || 450;
}

export function incrementTemplateDownloadCount(templateId: string): number {
  if (!templateId) return 450;
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
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return count.toLocaleString();
}
