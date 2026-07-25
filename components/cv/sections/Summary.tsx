// Summary section component with variant support

import React from 'react';
import { Theme } from '../../../data/themes';
import { SummaryVariant, getCardStyles, getShadowStyle } from '../variants/sectionVariants';

export type SummaryProps = {
  data: string;
  theme: Theme;
  variant?: SummaryVariant;
};

const Summary: React.FC<SummaryProps> = ({ data, theme, variant = 'standard' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

  if (!data) return null;

  const renderHeader = () => (
    <div className="flex items-center gap-4 mb-4">
      <h2
        className="text-[14px] font-bold uppercase tracking-wider whitespace-nowrap"
        style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}
      >
        Professional Summary
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: `${theme.primary}20` }} />
    </div>
  );

  if (variant === 'standard') {
    return (
      <div className="w-full mb-6">
        {renderHeader()}
        <p className="text-[11px] leading-relaxed text-justify" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
          {data}
        </p>
      </div>
    );
  }

  if (variant === 'highlight') {
    return (
      <div className="w-full mb-6">
        {renderHeader()}
        <div
          className="p-4 rounded-lg border-l-4"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}05 0%, ${theme.primary}10 100%)`,
            borderLeftColor: theme.primary,
          }}
        >
          <p className="text-[11px] leading-relaxed text-justify" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
            {data}
          </p>
        </div>
      </div>
    );
  }

  // Minimal variant
  return (
    <div className="w-full mb-6">
      {renderHeader()}
      <p
        className="text-[11px] leading-relaxed italic pl-3 border-l-2"
        style={{
          fontFamily: theme.fontFamily,
          color: theme.text,
          borderColor: theme.primary,
        }}
      >
        {data}
      </p>
    </div>
  );
};

export default Summary;