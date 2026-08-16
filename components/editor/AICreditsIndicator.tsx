'use client';

/**
 * AICreditsIndicator — shows remaining AI credits in the editor header (BR2)
 */

import React from 'react';
import { Sparkles, Infinity as InfinityIcon } from 'lucide-react';

interface AICreditsIndicatorProps {
  creditsRemaining: number | null;
  creditsLimit: number | null;
  isUnlimited: boolean;
  plan: string;
}

const AICreditsIndicator: React.FC<AICreditsIndicatorProps> = ({
  creditsRemaining,
  creditsLimit,
  isUnlimited,
  plan,
}) => {
  if (isUnlimited) {
    return (
      <div
        className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-violet-200 bg-violet-50"
        title="Unlimited AI assists (Premium)"
        aria-label="Unlimited AI credits"
      >
        <Sparkles className="w-3.5 h-3.5 text-violet-600" aria-hidden="true" />
        <span className="text-[10px] font-bold text-violet-700">AI: Unlimited</span>
      </div>
    );
  }

  const remaining = creditsRemaining ?? 0;
  const limit = creditsLimit ?? 10;
  const pct = Math.max(0, Math.min(100, (remaining / limit) * 100));
  const colorClass =
    remaining === 0
      ? 'text-rose-600 border-rose-200 bg-rose-50'
      : remaining <= 2
      ? 'text-amber-600 border-amber-200 bg-amber-50'
      : 'text-violet-600 border-violet-200 bg-violet-50';

  return (
    <div
      className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${colorClass}`}
      title={`${remaining} of ${limit} AI assists remaining (${plan} plan)`}
      aria-label={`${remaining} AI credits remaining`}
    >
      <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
      <span className="text-[10px] font-bold">
        AI: {remaining}/{limit}
      </span>
      {remaining === 0 && (
        <a
          href="/pricing"
          className="text-[9px] font-bold underline ml-1"
          title="Upgrade for more AI credits"
        >
          Upgrade
        </a>
      )}
    </div>
  );
};

export default AICreditsIndicator;
