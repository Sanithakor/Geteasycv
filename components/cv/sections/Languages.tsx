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
    <div className="flex items-center gap-2 mb-2">
      <h2
        className="text-[16.8px] font-bold uppercase tracking-wider leading-[1.25] whitespace-nowrap"
        style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}
      >
        Languages
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: `${theme.primary}20` }} />
    </div>
  );

  if (variant === 'tags') {
    return (
      <div id="cv-section-languages" className="w-full mb-4">
        {renderHeader()}
        <div className="flex flex-wrap gap-1.5">
          {data.map((item) => (
            <span
              key={item.id}
              className="text-[13.2px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs"
              style={{
                backgroundColor: `${theme.primary}10`,
                color: theme.primary,
                fontFamily: theme.fontFamily,
              }}
            >
              {item.name} <span className="opacity-50 mx-0.5">-</span> {item.proficiency}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Progress & Fallback variant
  return (
    <div id="cv-section-languages" className="w-full mb-4">
      {renderHeader()}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {data.map((item) => (
          <div key={item.id}>
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="text-[13.8px] font-semibold leading-snug" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                {item.name}
              </span>
              <span className="text-[12.6px] font-medium leading-normal" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                {item.proficiency}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Languages;