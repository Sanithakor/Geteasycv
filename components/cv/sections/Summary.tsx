// Summary section component with variant support

import React from 'react';
import { Theme } from '../../../data/themes';
import { SummaryVariant, getCardStyles, getShadowStyle, getGlassStyle, getGradientText } from '../variants/sectionVariants';

export type SummaryProps = {
  data: string;
  theme: Theme;
  variant?: SummaryVariant;
};

const Summary: React.FC<SummaryProps> = ({ data, theme, variant = 'standard' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

  if (!data) return null;

  // Standard variant
  if (variant === 'standard') {
    return (
      <div
        className="cv-block w-full p-4"
        style={{
          ...cardStyles,
          boxShadow: shadowStyle,
          marginBottom: '0.5rem',
        }}
      >
        <h2
          className="text-xl font-semibold mb-1.5"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Professional Summary
        </h2>
        <p
          className="leading-relaxed"
          style={{
            fontFamily: theme.fontFamily,
            color: theme.text,
            lineHeight: 1.4,
          }}
        >
          {data}
        </p>
      </div>
    );
  }

  // Highlight variant
  if (variant === 'highlight') {
    return (
      <div
        className="cv-block w-full p-4"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}10 0%, ${theme.secondary} 100%)`,
          borderRadius: theme.borderRadius,
          borderLeft: `4px solid ${theme.primary}`,
          marginBottom: '0.5rem',
        }}
      >
        <h2
          className="text-xl font-semibold mb-1.5"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Professional Summary
        </h2>
        <p
          className="leading-relaxed"
          style={{
            fontFamily: theme.fontFamily,
            color: theme.text,
            lineHeight: 1.4,
          }}
        >
          {data}
        </p>
      </div>
    );
  }

  // Minimal variant
  return (
    <div className="cv-block w-full p-4" style={{ marginBottom: '0.5rem' }}>
      <p
        className="leading-relaxed italic"
        style={{
          fontFamily: theme.fontFamily,
          color: theme.textSecondary,
          lineHeight: 1.4,
          borderLeft: `3px solid ${theme.primary}`,
          paddingLeft: '1rem',
        }}
      >
        {data}
      </p>
    </div>
  );
};

export default Summary;