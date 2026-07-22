// Education section component with variant support

import React from 'react';
import { Theme } from '../../../data/themes';
import { EducationVariant, getCardStyles, getShadowStyle, getDividerStyle, getGlassStyle } from '../variants/sectionVariants';
import { EducationItem } from '../../../data/sampleCV';

export type EducationProps = {
  data: EducationItem[];
  theme: Theme;
  variant?: EducationVariant;
};

const Education: React.FC<EducationProps> = ({ data, theme, variant = 'cards' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);
  const dividerStyle = getDividerStyle(theme);

  // Cards variant
  if (variant === 'cards') {
    return (
      <div className="w-full" style={{ marginBottom: '0.5rem' }}>
        <h2
          className="text-xl font-semibold mb-1"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Education
        </h2>
        <div className="grid gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="cv-block p-3.5"
              style={{
                ...cardStyles,
                boxShadow: shadowStyle,
              }}
            >
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ fontFamily: theme.fontFamily, color: theme.text }}
                  >
                    {item.institution}
                  </h3>
                  <p
                    className="font-medium"
                    style={{ fontFamily: theme.fontFamily, color: theme.primary }}
                  >
                    {item.degree} in {item.field}
                  </p>
                </div>
                <div className="text-right text-sm" style={{ color: theme.textSecondary }}>
                  <div>
                    {item.startDate} - {item.endDate}
                  </div>
                  {item.gpa && (
                    <div className="font-medium" style={{ color: theme.primary }}>
                      GPA: {item.gpa}
                    </div>
                  )}
                </div>
              </div>
              {item.honors && item.honors.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.honors.map((honor, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${theme.primary}15`,
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

  // Compact variant
  if (variant === 'compact') {
    return (
      <div className="w-full" style={{ marginBottom: '0.5rem' }}>
        <h2
          className="text-xl font-semibold mb-1"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Education
        </h2>
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div
                className="w-2 h-2 mt-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: theme.primary }}
              />
              <div className="flex-1">
                <h3
                  className="font-semibold"
                  style={{ fontFamily: theme.fontFamily, color: theme.text }}
                >
                  {item.institution}
                </h3>
                <p
                  className="text-sm"
                  style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
                >
                  {item.degree} in {item.field} | {item.startDate} - {item.endDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // List variant (default)
  return (
    <div className="w-full" style={{ marginBottom: '0.5rem' }}>
      <h2
        className="text-xl font-semibold mb-1"
        style={{
          fontFamily: theme.fontFamilyHeading,
          color: theme.primary,
        }}
      >
        Education
      </h2>
      <div className="space-y-2.5">
        {data.map((item, index) => (
          <div key={item.id} className="cv-block">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{ fontFamily: theme.fontFamily, color: theme.text }}
                >
                  {item.institution}
                </h3>
                <p
                  className="font-medium"
                  style={{ fontFamily: theme.fontFamily, color: theme.primary }}
                >
                  {item.degree} in {item.field}
                </p>
              </div>
              <div className="text-right text-sm" style={{ color: theme.textSecondary }}>
                <div>
                  {item.startDate} - {item.endDate}
                </div>
                {item.gpa && (
                  <div className="font-medium" style={{ color: theme.primary }}>
                    GPA: {item.gpa}
                  </div>
                )}
              </div>
            </div>
            {item.honors && item.honors.length > 0 && (
              <p
                className="text-sm italic"
                style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
              >
                Honors: {item.honors.join(', ')}
              </p>
            )}
            {index < data.length - 1 && <div className="mt-4" style={{ borderBottom: dividerStyle }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;