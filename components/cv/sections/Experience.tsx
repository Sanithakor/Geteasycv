// Experience section component with variant support & Lucide icons

import React from 'react';
import { Theme } from '../../../data/themes';
import { ExperienceVariant, getCardStyles, getShadowStyle, getDividerStyle } from '../variants/sectionVariants';
import { ExperienceItem } from '../../../data/sampleCV';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export type ExperienceProps = {
  data: ExperienceItem[];
  theme: Theme;
  variant?: ExperienceVariant;
};

const Experience: React.FC<ExperienceProps> = ({ data, theme, variant = 'timeline' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);
  const dividerStyle = getDividerStyle(theme);

  const renderHeader = () => (
    <div className="flex items-center gap-3 mb-4">
      <Briefcase className="w-4 h-4 shrink-0" style={{ color: theme.primary }} />
      <h2
        className="text-[14px] font-bold uppercase tracking-wider whitespace-nowrap"
        style={{ fontFamily: 'Poppins, sans-serif', color: theme.primary }}
      >
        Experience
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: `${theme.primary}20` }} />
    </div>
  );

  if (variant === 'timeline') {
    return (
      <div id="cv-section-experience" className="w-full mb-6">
        {renderHeader()}
        <div className="relative pl-3">
          {/* Timeline line */}
          <div
            className="absolute left-[3px] top-2 bottom-2 w-px opacity-30"
            style={{ backgroundColor: theme.primary }}
          />
          <div className="space-y-5">
            {data.map((item) => (
              <div key={item.id} className="relative pl-6">
                {/* Timeline dot */}
                <div
                  className="absolute left-[-2px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                  style={{ backgroundColor: theme.primary, boxShadow: `0 0 0 2px ${theme.background}` }}
                />
                
                <div className="flex flex-wrap justify-between items-baseline mb-1 gap-2">
                  <div>
                    <h3 className="text-[13px] font-bold" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                      {item.position}
                    </h3>
                    <p className="text-[12px] font-semibold" style={{ fontFamily: theme.fontFamily, color: theme.primary }}>
                      {item.company}
                    </p>
                  </div>
                  <div className="text-[10px] font-medium text-right shrink-0" style={{ color: theme.textSecondary }}>
                    <div>{item.startDate} - {item.current ? 'Present' : item.endDate}</div>
                    {item.location && <div>{item.location}</div>}
                  </div>
                </div>
                
                {item.description && (
                  <p className="text-[11px] leading-relaxed mb-2 mt-1.5" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                    {item.description}
                  </p>
                )}
                
                {item.achievements.length > 0 && (
                  <ul className="space-y-1 mt-1.5">
                    {item.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] leading-relaxed" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 opacity-60" style={{ backgroundColor: theme.primary }} />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <div id="cv-section-experience" className="w-full mb-6">
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
              <div className="flex flex-wrap justify-between items-baseline mb-2 gap-2">
                <div>
                  <h3 className="text-[13px] font-bold" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                    {item.position}
                  </h3>
                  <p className="text-[12px] font-semibold" style={{ fontFamily: theme.fontFamily, color: theme.primary }}>
                    {item.company}
                  </p>
                </div>
                <div className="text-[10px] font-medium text-right shrink-0" style={{ color: theme.textSecondary }}>
                  <div className="bg-slate-100/50 px-2 py-0.5 rounded-sm">{item.startDate} - {item.current ? 'Present' : item.endDate}</div>
                  {item.location && <div className="mt-0.5">{item.location}</div>}
                </div>
              </div>
              
              {item.description && (
                <p className="text-[11px] leading-relaxed mb-2" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                  {item.description}
                </p>
              )}
              
              {item.achievements.length > 0 && (
                <ul className="space-y-1 mt-2">
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] leading-relaxed" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 opacity-60" style={{ backgroundColor: theme.primary }} />
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

  if (variant === 'bordered') {
    return (
      <div id="cv-section-experience" className="w-full mb-6">
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
                    {item.position}
                  </h3>
                  <p className="text-[12px] font-semibold" style={{ fontFamily: theme.fontFamily, color: theme.primary }}>
                    {item.company}
                  </p>
                </div>
                <div className="text-[10px] font-medium text-right shrink-0" style={{ color: theme.textSecondary }}>
                  <div>{item.startDate} - {item.current ? 'Present' : item.endDate}</div>
                  {item.location && <div>{item.location}</div>}
                </div>
              </div>
              
              {item.description && (
                <p className="text-[11px] leading-relaxed mb-2 mt-1" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                  {item.description}
                </p>
              )}
              
              {item.achievements.length > 0 && (
                <ul className="space-y-1 mt-1.5">
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] leading-relaxed" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 opacity-60" style={{ backgroundColor: theme.primary }} />
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

  // Compact variant (default)
  return (
    <div id="cv-section-experience" className="w-full mb-6">
      {renderHeader()}
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="relative">
            <div className="flex flex-wrap justify-between items-baseline mb-1 gap-2">
              <h3 className="text-[12px]" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                <span className="font-bold">{item.position}</span>
                <span className="opacity-60 mx-1">at</span>
                <span className="font-semibold" style={{ color: theme.primary }}>{item.company}</span>
              </h3>
              <p className="text-[10px] font-medium shrink-0" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                {item.startDate} - {item.current ? 'Present' : item.endDate}
              </p>
            </div>
            
            {item.description && (
              <p className="text-[11px] leading-relaxed mb-1" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                {item.description}
              </p>
            )}
            
            {item.achievements.length > 0 && (
              <ul className="space-y-0.5 mt-1">
                {item.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] leading-relaxed" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                    <span className="mt-1.5 w-[3px] h-[3px] rounded-full shrink-0" style={{ backgroundColor: theme.textSecondary }} />
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
};

export default Experience;