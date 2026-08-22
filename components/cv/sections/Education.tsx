// Education section component with variant support & Lucide icons

import React from 'react';
import { Theme } from '../../../data/themes';
import { EducationVariant, getCardStyles, getShadowStyle, getDividerStyle } from '../variants/sectionVariants';
import { EducationItem } from '../../../data/sampleCV';
import { GraduationCap } from 'lucide-react';

export type EducationProps = {
  data: EducationItem[];
  theme: Theme;
  variant?: EducationVariant;
};

const Education: React.FC<EducationProps> = ({ data, theme, variant = 'cards' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

  const renderHeader = () => (
    <div className="flex items-center gap-2 mb-2">
      <GraduationCap className="w-4 h-4 shrink-0" style={{ color: theme.primary }} />
      <h2
        className="text-[16.8px] font-bold uppercase tracking-wider leading-[1.25] whitespace-nowrap"
        style={{ fontFamily: 'Roboto, sans-serif', color: theme.primary }}
      >
        Education
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: `${theme.primary}20` }} />
    </div>
  );

  if (variant === 'cards') {
    return (
      <div id="cv-section-education" className="w-full mb-4">
        {renderHeader()}
        <div className="grid gap-2.5">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-2.5 rounded-md border"
              style={{
                ...cardStyles,
                boxShadow: shadowStyle,
                borderColor: `${theme.primary}20`,
              }}
            >
              <div className="flex flex-wrap justify-between items-baseline mb-1 gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15.6px] font-bold leading-[1.25]" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                    {item.institution}
                  </h3>
                  <p className="text-[14.4px] font-semibold leading-[1.45]" style={{ fontFamily: theme.fontFamily, color: theme.primary }}>
                    {item.degree} in {item.field}
                  </p>
                </div>
                <div className="text-[12px] font-medium leading-normal text-right shrink-0" style={{ color: theme.textSecondary }}>
                  <div className="bg-slate-100/50 px-1.5 py-0.5 rounded-xs">{item.startDate} - {item.endDate}</div>
                  {item.gpa && <div className="mt-0.5 font-bold text-[12px]" style={{ color: theme.primary }}>GPA: {item.gpa}</div>}
                </div>
              </div>
              
              {item.honors && item.honors.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {item.honors.map((honor, i) => (
                    <span
                      key={i}
                      className="text-[12px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-xs"
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

  // List & Compact variant
  return (
    <div id="cv-section-education" className="w-full mb-4">
      {renderHeader()}
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.id} className="relative">
            <div className="flex flex-wrap justify-between items-baseline gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-[15.6px] font-bold leading-[1.25]" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                  {item.institution}
                </h3>
                <p className="text-[14.4px] font-semibold leading-[1.45]" style={{ fontFamily: theme.fontFamily, color: theme.primary }}>
                  {item.degree} in {item.field}
                </p>
              </div>
              <div className="text-[12px] font-medium leading-normal text-right shrink-0" style={{ color: theme.textSecondary }}>
                <div>{item.startDate} - {item.endDate}</div>
                {item.gpa && <div className="font-bold text-[12px]" style={{ color: theme.primary }}>GPA: {item.gpa}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;