// Awards section component with variant support

import React from 'react';
import { Theme } from '../../../data/themes';
import { AwardsVariant, getCardStyles, getShadowStyle } from '../variants/sectionVariants';
import { AwardItem } from '../../../data/sampleCV';

export type AwardsProps = {
  data: AwardItem[];
  theme: Theme;
  variant?: AwardsVariant;
};

const Awards: React.FC<AwardsProps> = ({ data, theme, variant = 'cards' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

  const renderHeader = () => (
    <div className="flex items-center gap-2 mb-2">
      <h2
        className="text-[14px] font-bold uppercase tracking-wider leading-[1.25] whitespace-nowrap"
        style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}
      >
        Awards & Achievements
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: `${theme.primary}20` }} />
    </div>
  );

  if (variant === 'cards') {
    return (
      <div className="w-full mb-4">
        {renderHeader()}
        <div className="grid gap-2.5">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-2.5 rounded-md border-l-4 border-t border-r border-b"
              style={{
                ...cardStyles,
                boxShadow: shadowStyle,
                borderLeftColor: theme.primary,
                borderTopColor: `${theme.primary}10`,
                borderRightColor: `${theme.primary}10`,
                borderBottomColor: `${theme.primary}10`,
              }}
            >
              <div className="flex flex-wrap justify-between items-baseline mb-1 gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-[13px] font-bold leading-[1.25]" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                    {item.title}
                  </h3>
                  <p className="text-[11.5px] font-semibold leading-[1.45] mt-0.5" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                    {item.issuer}
                  </p>
                </div>
                <div className="text-[10px] font-bold px-2 py-0.5 rounded-xs shrink-0" style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}>
                  {item.date}
                </div>
              </div>
              {item.description && (
                <p className="text-[11.5px] leading-[1.45] mt-1 pt-1 border-t" style={{ fontFamily: theme.fontFamily, color: theme.text, borderColor: `${theme.primary}10` }}>
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Badges / Fallback variant
  return (
    <div className="w-full mb-4">
      {renderHeader()}
      <div className="flex flex-wrap gap-2">
        {data.map((item) => (
          <div
            key={item.id}
            className="px-3 py-1.5 rounded-md text-left"
            style={{
              background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}10, ${theme.gradient.end}10)`,
              border: `1px solid ${theme.primary}20`,
            }}
          >
            <h3 className="text-[12.5px] font-bold leading-snug" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
              {item.title}
            </h3>
            <p className="text-[10.5px] font-semibold uppercase tracking-wider mt-0.5" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
              {item.issuer} <span className="mx-1">|</span> {item.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Awards;
