// Experience section component with variant support

import React from 'react';
import { Theme } from '../../../data/themes';
import { ExperienceVariant, getCardStyles, getShadowStyle, getDividerStyle, getGlassStyle } from '../variants/sectionVariants';
import { ExperienceItem } from '../../../data/sampleCV';

export type ExperienceProps = {
  data: ExperienceItem[];
  theme: Theme;
  variant?: ExperienceVariant;
};

const Experience: React.FC<ExperienceProps> = ({ data, theme, variant = 'timeline' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);
  const dividerStyle = getDividerStyle(theme);

  // Timeline variant
  if (variant === 'timeline') {
    return (
      <div className="w-full" style={{ marginBottom: '0.5rem' }}>
        <h2
          className="text-xl font-semibold mb-1"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Experience
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-0.5"
            style={{ backgroundColor: theme.border }}
          />
          <div className="space-y-3.5">
            {data.map((item) => (
              <div key={item.id} className="cv-block relative pl-10">
                {/* Timeline dot */}
                <div
                  className="absolute left-2.5 top-1 w-3 h-3 rounded-full"
                  style={{ backgroundColor: theme.primary }}
                />
                <div
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
                        {item.position}
                      </h3>
                      <p
                        className="font-medium"
                        style={{ fontFamily: theme.fontFamily, color: theme.primary }}
                      >
                        {item.company}
                      </p>
                    </div>
                    <div className="text-right text-sm" style={{ color: theme.textSecondary }}>
                      <div>
                        {item.startDate} - {item.current ? 'Present' : item.endDate}
                      </div>
                      {item.location && <div>{item.location}</div>}
                    </div>
                  </div>
                  <p
                    className="mb-1.5 text-sm"
                    style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
                  >
                    {item.description}
                  </p>
                  {item.achievements.length > 0 && (
                    <ul className="space-y-1">
                      {item.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm"
                          style={{ fontFamily: theme.fontFamily, color: theme.text }}
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
          Experience
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
                    {item.position}
                  </h3>
                  <p
                    className="font-medium"
                    style={{ fontFamily: theme.fontFamily, color: theme.primary }}
                  >
                    {item.company}
                  </p>
                </div>
                <div className="text-right text-sm" style={{ color: theme.textSecondary }}>
                  <div>
                    {item.startDate} - {item.current ? 'Present' : item.endDate}
                  </div>
                  {item.location && <div>{item.location}</div>}
                </div>
              </div>
              <p
                className="mb-1.5 text-sm"
                style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
              >
                {item.description}
              </p>
              {item.achievements.length > 0 && (
                <ul className="space-y-1">
                  {item.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm"
                      style={{ fontFamily: theme.fontFamily, color: theme.text }}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Bordered variant
  if (variant === 'bordered') {
    return (
      <div className="w-full" style={{ marginBottom: '0.5rem' }}>
        <h2
          className="text-xl font-semibold mb-1"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Experience
        </h2>
        <div className="space-y-2.5">
          {data.map((item, index) => (
            <div key={item.id} className="cv-block p-4" style={{ border: `1px solid ${theme.border}`, borderRadius: theme.borderRadius }}>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ fontFamily: theme.fontFamily, color: theme.text }}
                  >
                    {item.position}
                  </h3>
                  <p
                    className="font-medium"
                    style={{ fontFamily: theme.fontFamily, color: theme.primary }}
                  >
                    {item.company}
                  </p>
                </div>
                <div className="text-right text-sm" style={{ color: theme.textSecondary }}>
                  <div>
                    {item.startDate} - {item.current ? 'Present' : item.endDate}
                  </div>
                </div>
              </div>
              <p
                className="mb-1 text-sm"
                style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
              >
                {item.description}
              </p>
              {item.achievements.length > 0 && (
                <ul className="space-y-1">
                  {item.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm"
                      style={{ fontFamily: theme.fontFamily, color: theme.text }}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Compact variant
  return (
    <div className="w-full" style={{ marginBottom: '0.5rem' }}>
      <h2
        className="text-xl font-semibold mb-1"
        style={{
          fontFamily: theme.fontFamilyHeading,
          color: theme.primary,
        }}
      >
        Experience
      </h2>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={item.id} className="cv-block">
            <div className="flex justify-between items-start">
              <div>
                <h3
                  className="font-semibold"
                  style={{ fontFamily: theme.fontFamily, color: theme.text }}
                >
                  {item.position} at {item.company}
                </h3>
                <p
                  className="text-sm"
                  style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
                >
                  {item.startDate} - {item.current ? 'Present' : item.endDate}
                </p>
              </div>
            </div>
            {index < data.length - 1 && <div className="mt-3" style={{ borderBottom: dividerStyle }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;