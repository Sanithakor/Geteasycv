// Languages section component with variant support

import React from 'react';
import { Theme } from '../../../data/themes';
import { LanguagesVariant, getCardStyles, getShadowStyle } from '../variants/sectionVariants';
import { LanguageItem } from '../../../data/sampleCV';

export type LanguagesProps = {
  data: LanguageItem[];
  theme: Theme;
  variant?: LanguagesVariant;
};

const Languages: React.FC<LanguagesProps> = ({ data, theme, variant = 'tags' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

  const renderHeader = () => (
    <div className="flex items-center gap-4 mb-4">
      <h2
        className="text-[14px] font-bold uppercase tracking-wider whitespace-nowrap"
        style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}
      >
        Languages
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: `${theme.primary}20` }} />
    </div>
  );

  if (variant === 'tags') {
    return (
      <div id="cv-section-languages" className="w-full mb-6">
        {renderHeader()}
        <div className="flex flex-wrap gap-2">
          {data.map((item) => (
            <span
              key={item.id}
              className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm"
              style={{
                backgroundColor: `${theme.primary}10`,
                color: theme.primary,
                fontFamily: theme.fontFamily,
              }}
            >
              {item.name} <span className="opacity-50 mx-1">-</span> {item.proficiency}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'flags') {
    return (
      <div id="cv-section-languages" className="w-full mb-6">
        {renderHeader()}
        <div className="grid grid-cols-3 gap-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-3.5 text-center rounded-lg border"
              style={{
                ...cardStyles,
                boxShadow: shadowStyle,
                borderColor: `${theme.primary}20`,
              }}
            >
              <div className="text-xl mb-1">{item.flag || '🌐'}</div>
              <h3 className="text-[11px] font-bold" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                {item.name}
              </h3>
              <p className="text-[9px] font-semibold uppercase tracking-wider mt-0.5" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                {item.proficiency}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Progress variant (default)
  return (
    <div id="cv-section-languages" className="w-full mb-6">
      {renderHeader()}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {data.map((item) => {
          const proficiencyLevel = {
            native: 100,
            fluent: 85,
            professional: 70,
            basic: 40,
          }[item.proficiency.toLowerCase()] || 50;

          return (
            <div key={item.id}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[11px] font-bold" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                  {item.name}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                  {item.proficiency}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: `${theme.primary}20` }}>
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
  );
};

export default Languages;