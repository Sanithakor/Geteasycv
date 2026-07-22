// Skills section component with variant support

import React from 'react';
import { Theme } from '../../../data/themes';
import { SkillsVariant, getCardStyles, getShadowStyle, getGlassStyle, getPillStyle } from '../variants/sectionVariants';
import { SkillItem } from '../../../data/sampleCV';

export type SkillsProps = {
  data: SkillItem[];
  theme: Theme;
  variant?: SkillsVariant;
};

const Skills: React.FC<SkillsProps> = ({ data, theme, variant = 'tags' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

  // Group skills by category
  const skillsByCategory = data.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, SkillItem[]>);

  // Tags variant
  if (variant === 'tags') {
    return (
      <div className="cv-block w-full" style={{ marginBottom: '0.5rem' }}>
        <h2
          className="text-xl font-semibold mb-1"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Skills
        </h2>
        <div
          className="p-3.5"
          style={{
            ...cardStyles,
            boxShadow: shadowStyle,
          }}
        >
          <div className="flex flex-wrap gap-2">
            {data.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1.5 text-sm font-medium rounded-full transition-all hover:scale-105"
                style={{
                  backgroundColor: `${theme.primary}15`,
                  color: theme.primary,
                  fontFamily: theme.fontFamily,
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Progress bars variant
  if (variant === 'progress-bars') {
    return (
      <div className="cv-block w-full" style={{ marginBottom: '0.5rem' }}>
        <h2
          className="text-xl font-semibold mb-1"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Skills
        </h2>
        <div
          className="p-3.5"
          style={{
            ...cardStyles,
            boxShadow: shadowStyle,
          }}
        >
          <div className="space-y-2.5">
            {data.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between mb-1">
                  <span
                    className="text-sm font-medium"
                    style={{ fontFamily: theme.fontFamily, color: theme.text }}
                  >
                    {skill.name}
                  </span>
                  <span
                    className="text-sm"
                    style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: theme.border }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${skill.level}%`,
                      background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Circles variant
  if (variant === 'circles') {
    return (
      <div className="cv-block w-full" style={{ marginBottom: '0.5rem' }}>
        <h2
          className="text-xl font-semibold mb-1"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Skills
        </h2>
        <div
          className="p-3.5"
          style={{
            ...cardStyles,
            boxShadow: shadowStyle,
          }}
        >
          <div className="grid grid-cols-4 gap-4">
            {data.map((skill) => (
              <div key={skill.id} className="flex flex-col items-center">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke={theme.border}
                      strokeWidth="4"
                      fill="transparent"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke={theme.primary}
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={`${(skill.level / 100) * 176} 176`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: theme.primary }}>
                    {skill.level}
                  </div>
                </div>
                <span
                  className="text-xs mt-1 text-center"
                  style={{ fontFamily: theme.fontFamily, color: theme.text }}
                >
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Pills variant
  return (
    <div className="cv-block w-full" style={{ marginBottom: '0.5rem' }}>
      <h2
        className="text-xl font-semibold mb-1"
        style={{
          fontFamily: theme.fontFamilyHeading,
          color: theme.primary,
        }}
      >
        Skills
      </h2>
      <div
        className="p-3.5"
        style={{
          ...cardStyles,
          boxShadow: shadowStyle,
        }}
      >
        <div className="space-y-2.5">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category}>
              <h3
                className="text-sm font-semibold mb-1 capitalize"
                style={{
                  fontFamily: theme.fontFamily,
                  color: theme.primary,
                }}
              >
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 text-sm rounded-full transition-all hover:scale-105"
                    style={getPillStyle(theme)}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;