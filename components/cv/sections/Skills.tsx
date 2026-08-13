// Skills section component with variant support & Lucide icons

import React from 'react';
import { Theme } from '../../../data/themes';
import { SkillsVariant, getCardStyles, getShadowStyle, getPillStyle } from '../variants/sectionVariants';
import { SkillItem } from '../../../data/sampleCV';
import { Code2 } from 'lucide-react';

export type SkillsProps = {
  data: SkillItem[];
  theme: Theme;
  variant?: SkillsVariant;
};

const Skills: React.FC<SkillsProps> = ({ data, theme, variant = 'tags' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

  const renderHeader = () => (
    <div className="flex items-center gap-2 mb-2">
      <Code2 className="w-4 h-4 shrink-0" style={{ color: theme.primary }} />
      <h2
        className="text-[14px] font-bold uppercase tracking-wider leading-[1.25] whitespace-nowrap"
        style={{ fontFamily: 'Roboto, sans-serif', color: theme.primary }}
      >
        Skills
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: `${theme.primary}20` }} />
    </div>
  );

  if (variant === 'tags') {
    return (
      <div id="cv-section-skills" className="w-full mb-4">
        {renderHeader()}
        <div className="flex flex-wrap gap-1.5">
          {data.map((skill) => (
            <span
              key={skill.id}
              className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs"
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
      <div id="cv-section-skills" className="w-full mb-4">
        {renderHeader()}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {data.map((skill) => (
            <div key={skill.id}>
              <div className="flex justify-between items-baseline mb-0.5">
                <span className="text-[11.5px] font-semibold leading-snug" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                  {skill.name}
                </span>
                <span className="text-[10.5px] font-bold leading-snug" style={{ fontFamily: theme.fontFamily, color: theme.primary }}>
                  {skill.level}%
                </span>
              </div>
              <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: `${theme.primary}20` }}>
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

  // Fallback / Pills / Circles
  return (
    <div id="cv-section-skills" className="w-full mb-4">
      {renderHeader()}
      <div className="flex flex-wrap gap-1.5">
        {data.map((skill) => (
          <span
            key={skill.id}
            className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
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
  );
};

export default Skills;