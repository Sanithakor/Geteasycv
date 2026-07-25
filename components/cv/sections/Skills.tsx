// Skills section component with variant support

import React from 'react';
import { Theme } from '../../../data/themes';
import { SkillsVariant, getCardStyles, getShadowStyle, getPillStyle } from '../variants/sectionVariants';
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

  const renderHeader = () => (
    <div className="flex items-center gap-4 mb-4">
      <h2
        className="text-[14px] font-bold uppercase tracking-wider whitespace-nowrap"
        style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}
      >
        Skills
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: `${theme.primary}20` }} />
    </div>
  );

  if (variant === 'tags') {
    return (
      <div className="w-full mb-6">
        {renderHeader()}
        <div className="flex flex-wrap gap-2">
          {data.map((skill) => (
            <span
              key={skill.id}
              className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm"
              style={{
                backgroundColor: `${theme.primary}10`,
                color: theme.primary,
                fontFamily: theme.fontFamily,
              }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'progress-bars') {
    return (
      <div className="w-full mb-6">
        {renderHeader()}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {data.map((skill) => (
            <div key={skill.id}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[11px] font-bold" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                  {skill.name}
                </span>
                <span className="text-[9px] font-bold" style={{ fontFamily: theme.fontFamily, color: theme.primary }}>
                  {skill.level}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: `${theme.primary}20` }}>
                <div
                  className="h-full rounded-full"
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
    );
  }

  if (variant === 'circles') {
    return (
      <div className="w-full mb-6">
        {renderHeader()}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
          {data.map((skill) => (
            <div key={skill.id} className="flex flex-col items-center">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle cx="24" cy="24" r="20" stroke={`${theme.primary}20`} strokeWidth="3" fill="transparent" />
                  <circle
                    cx="24" cy="24" r="20"
                    stroke={theme.primary}
                    strokeWidth="3"
                    fill="transparent"
                    strokeDasharray={`${(skill.level / 100) * 125.6} 125.6`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold" style={{ color: theme.primary }}>
                  {skill.level}
                </div>
              </div>
              <span className="text-[10px] font-semibold mt-2 text-center" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Pills variant
  return (
    <div className="w-full mb-6">
      {renderHeader()}
      <div className="space-y-4">
        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <div key={category} className="flex items-start gap-4">
            <h3
              className="text-[11px] font-bold uppercase tracking-wider pt-1.5 w-24 shrink-0 text-right"
              style={{ fontFamily: theme.fontFamily, color: theme.primary }}
            >
              {category}
            </h3>
            <div className="flex flex-wrap gap-2 flex-1">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-[11px] font-semibold px-3 py-1 rounded-sm border"
                  style={{
                    backgroundColor: `${theme.primary}05`,
                    borderColor: `${theme.primary}20`,
                    color: theme.text,
                    fontFamily: theme.fontFamily,
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;