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
    <div className="flex items-center gap-4 mb-4">
      <h2
        className="text-[14px] font-bold uppercase tracking-wider whitespace-nowrap"
        style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}
      >
        Awards & Achievements
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: `${theme.primary}20` }} />
    </div>
  );

  if (variant === 'cards') {
    return (
      <div className="w-full mb-6">
        {renderHeader()}
        <div className="grid gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-lg border-l-4 border-t border-r border-b"
              style={{
                ...cardStyles,
                boxShadow: shadowStyle,
                borderLeftColor: theme.primary,
                borderTopColor: `${theme.primary}10`,
                borderRightColor: `${theme.primary}10`,
                borderBottomColor: `${theme.primary}10`,
              }}
            >
              <div className="flex flex-wrap justify-between items-baseline mb-1.5 gap-2">
                <div>
                  <h3 className="text-[12px] font-bold" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                    {item.name}
                  </h3>
                  <p className="text-[10px] font-medium mt-0.5" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                    {item.issuer}
                  </p>
                </div>
                <div className="text-[9px] font-bold px-2 py-0.5 rounded-sm shrink-0" style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}>
                  {item.date}
                </div>
              </div>
              {item.description && (
                <p className="text-[11px] leading-relaxed mt-2 pt-2 border-t" style={{ fontFamily: theme.fontFamily, color: theme.text, borderColor: `${theme.primary}10` }}>
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'badges') {
    return (
      <div className="w-full mb-6">
        {renderHeader()}
        <div className="flex flex-wrap gap-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="px-4 py-2.5 rounded-lg text-center"
              style={{
                background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}10, ${theme.gradient.end}10)`,
                border: `1px solid ${theme.primary}20`,
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" style={{ color: theme.primary }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div className="text-left">
                  <h3 className="font-bold text-[11px]" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                    {item.name}
                  </h3>
                  <p className="text-[9px] font-semibold uppercase tracking-wider" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                    {item.issuer} <span className="mx-1">|</span> {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // List variant (default)
  return (
    <div className="w-full mb-6">
      {renderHeader()}
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <div
              className="w-6 h-6 rounded shrink-0 flex items-center justify-center mt-1"
              style={{ background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})` }}
            >
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <h3 className="text-[12px] font-bold leading-tight" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                {item.name}
              </h3>
              <p className="text-[10px] font-medium mt-0.5" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                {item.issuer} <span className="opacity-50 mx-1">|</span> {item.date}
              </p>
              {item.description && (
                <p className="text-[11px] leading-relaxed mt-1" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
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