// Languages section component with variant support

import React from 'react';
import { Theme } from '../../../data/themes';
import { LanguagesVariant, getCardStyles, getShadowStyle, getGlassStyle } from '../variants/sectionVariants';
import { LanguageItem } from '../../../data/sampleCV';

export type LanguagesProps = {
  data: LanguageItem[];
  theme: Theme;
  variant?: LanguagesVariant;
};

const Languages: React.FC<LanguagesProps> = ({ data, theme, variant = 'tags' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

  // Tags variant
  if (variant === 'tags') {
    return (
      <div className="w-full" style={{ marginBottom: '1rem' }}>
        <h2
          className="text-xl font-semibold mb-4"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Languages
        </h2>
        <div
          className="p-4 flex flex-wrap gap-2"
          style={{
            ...cardStyles,
            boxShadow: shadowStyle,
          }}
        >
          {data.map((item) => (
            <span
              key={item.id}
              className="px-3 py-1.5 text-sm font-medium rounded-lg"
              style={{
                background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}15, ${theme.gradient.end}15)`,
                color: theme.primary,
                fontFamily: theme.fontFamily,
              }}
            >
              {item.name} - {item.proficiency}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Flags variant
  if (variant === 'flags') {
    return (
      <div className="w-full" style={{ marginBottom: '1rem' }}>
        <h2
          className="text-xl font-semibold mb-4"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Languages
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-4 text-center"
              style={{
                ...cardStyles,
                boxShadow: shadowStyle,
              }}
            >
              <div className="text-2xl mb-2">{item.flag || '🌐'}</div>
              <h3
                className="font-semibold"
                style={{ fontFamily: theme.fontFamily, color: theme.text }}
              >
                {item.name}
              </h3>
              <p
                className="text-sm capitalize"
                style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
              >
                {item.proficiency}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Progress variant
  return (
    <div className="w-full" style={{ marginBottom: '1rem' }}>
      <h2
        className="text-xl font-semibold mb-4"
        style={{
          fontFamily: theme.fontFamilyHeading,
          color: theme.primary,
        }}
      >
        Languages
      </h2>
      <div
        className="p-4"
        style={{
          ...cardStyles,
          boxShadow: shadowStyle,
        }}
      >
        <div className="space-y-3">
          {data.map((item) => {
            const proficiencyLevel = {
              native: 100,
              fluent: 90,
              professional: 75,
              basic: 50,
            }[item.proficiency];

            return (
              <div key={item.id}>
                <div className="flex justify-between mb-1">
                  <span
                    className="font-medium"
                    style={{ fontFamily: theme.fontFamily, color: theme.text }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="text-sm capitalize"
                    style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
                  >
                    {item.proficiency}
                  </span>
                </div>
                <div
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: theme.border }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${proficiencyLevel}%`,
                      background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Languages;