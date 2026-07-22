// Awards section component with variant support

import React from 'react';
import { Theme } from '../../../data/themes';
import { AwardsVariant, getCardStyles, getShadowStyle, getGlassStyle } from '../variants/sectionVariants';
import { AwardItem } from '../../../data/sampleCV';

export type AwardsProps = {
  data: AwardItem[];
  theme: Theme;
  variant?: AwardsVariant;
};

const Awards: React.FC<AwardsProps> = ({ data, theme, variant = 'cards' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

  // Cards variant
  if (variant === 'cards') {
    return (
      <div className="cv-block w-full" style={{ marginBottom: '0.5rem' }}>
        <h2
          className="text-xl font-semibold mb-1"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Awards & Achievements
        </h2>
        <div className="grid gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-3.5"
              style={{
                ...cardStyles,
                boxShadow: shadowStyle,
                borderLeft: `4px solid ${theme.primary}`,
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3
                    className="font-semibold"
                    style={{ fontFamily: theme.fontFamily, color: theme.text }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
                  >
                    {item.issuer}
                  </p>
                </div>
                <span
                  className="text-sm px-2 py-1 rounded"
                  style={{
                    backgroundColor: `${theme.primary}15`,
                    color: theme.primary,
                  }}
                >
                  {item.date}
                </span>
              </div>
              {item.description && (
                <p
                  className="text-sm mt-2"
                  style={{ fontFamily: theme.fontFamily, color: theme.textMuted }}
                >
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Badges variant
  if (variant === 'badges') {
    return (
      <div className="cv-block w-full" style={{ marginBottom: '0.5rem' }}>
        <h2
          className="text-xl font-semibold mb-1"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Awards & Achievements
        </h2>
        <div className="flex flex-wrap gap-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="px-4 py-3 rounded-xl text-center"
              style={{
                background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}15, ${theme.gradient.end}15)`,
                border: `1px solid ${theme.primary}30`,
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" style={{ color: theme.primary }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div>
                  <h3
                    className="font-semibold text-sm"
                    style={{ fontFamily: theme.fontFamily, color: theme.text }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="text-xs"
                    style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
                  >
                    {item.issuer} | {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // List variant
  return (
    <div className="cv-block w-full" style={{ marginBottom: '0.5rem' }}>
      <h2
        className="text-xl font-semibold mb-1"
        style={{
          fontFamily: theme.fontFamilyHeading,
          color: theme.primary,
        }}
      >
        Awards & Achievements
      </h2>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})` }}
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <h3
                className="font-semibold"
                style={{ fontFamily: theme.fontFamily, color: theme.text }}
              >
                {item.name}
              </h3>
              <p
                className="text-sm"
                style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
              >
                {item.issuer} | {item.date}
              </p>
              {item.description && (
                <p
                  className="text-sm mt-1"
                  style={{ fontFamily: theme.fontFamily, color: theme.textMuted }}
                >
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Awards;