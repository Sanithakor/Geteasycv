// Education section component with variant support

import React from 'react';
import { Theme } from '../../../data/themes';
import { EducationVariant, getCardStyles, getShadowStyle, getDividerStyle } from '../variants/sectionVariants';
import { EducationItem } from '../../../data/sampleCV';

export type EducationProps = {
  data: EducationItem[];
  theme: Theme;
  variant?: EducationVariant;
};

const Education: React.FC<EducationProps> = ({ data, theme, variant = 'cards' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

  const renderHeader = () => (
    <div className="flex items-center gap-4 mb-4">
      <h2
        className="text-[14px] font-bold uppercase tracking-wider whitespace-nowrap"
        style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}
      >
        Education
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
              className="p-4 rounded-lg border"
              style={{
                ...cardStyles,
                boxShadow: shadowStyle,
                borderColor: `${theme.primary}20`,
              }}
            >
              <div className="flex flex-wrap justify-between items-baseline mb-1 gap-2">
                <div>
                  <h3 className="text-[13px] font-bold" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                    {item.institution}
                  </h3>
                  <p className="text-[12px] font-semibold" style={{ fontFamily: theme.fontFamily, color: theme.primary }}>
                    {item.degree} in {item.field}
                  </p>
                </div>
                <div className="text-[10px] font-medium text-right shrink-0" style={{ color: theme.textSecondary }}>
                  <div className="bg-slate-100/50 px-2 py-0.5 rounded-sm">{item.startDate} - {item.endDate}</div>
                  {item.gpa && <div className="mt-0.5 font-bold" style={{ color: theme.primary }}>GPA: {item.gpa}</div>}
                </div>
              </div>
              
              {item.honors && item.honors.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {item.honors.map((honor, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm"
                      style={{
                        backgroundColor: `${theme.primary}10`,
                        color: theme.primary,
                        fontFamily: theme.fontFamily,
                      }}
                    >
                      {honor}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="w-full mb-6">
        {renderHeader()}
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.id} className="relative">
              <div className="flex flex-wrap justify-between items-baseline mb-1 gap-2">
                <h3 className="text-[12px]" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                  <span className="font-bold">{item.degree} in {item.field}</span>
                  <span className="opacity-60 mx-1">at</span>
                  <span className="font-semibold" style={{ color: theme.primary }}>{item.institution}</span>
                </h3>
                <div className="text-[10px] font-medium text-right shrink-0 flex gap-2 items-center" style={{ color: theme.textSecondary }}>
                  {item.gpa && <span className="font-bold" style={{ color: theme.primary }}>GPA: {item.gpa}</span>}
                  <span>{item.startDate} - {item.endDate}</span>
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
      <div className="space-y-0">
        {data.map((item, index) => (
          <div 
            key={item.id} 
            className="py-4 border-b last:border-b-0" 
            style={{ borderColor: `${theme.primary}20` }}
          >
            <div className="flex flex-wrap justify-between items-baseline mb-1 gap-2">
              <div>
                <h3 className="text-[13px] font-bold" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                  {item.institution}
                </h3>
                <p className="text-[12px] font-semibold" style={{ fontFamily: theme.fontFamily, color: theme.primary }}>
                  {item.degree} in {item.field}
                </p>
              </div>
              <div className="text-[10px] font-medium text-right shrink-0" style={{ color: theme.textSecondary }}>
                <div>{item.startDate} - {item.endDate}</div>
                {item.gpa && <div className="font-bold mt-0.5" style={{ color: theme.primary }}>GPA: {item.gpa}</div>}
              </div>
            </div>
            {item.honors && item.honors.length > 0 && (
              <p className="text-[11px] italic mt-1.5" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                Honors: {item.honors.join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;