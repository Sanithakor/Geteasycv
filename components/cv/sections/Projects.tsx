// Projects section component with variant support & Lucide icons

import React from 'react';
import { Theme } from '../../../data/themes';
import { ProjectsVariant, getCardStyles, getShadowStyle } from '../variants/sectionVariants';
import { ProjectItem } from '../../../data/sampleCV';
import { FolderGit2 } from 'lucide-react';

export type ProjectsProps = {
  data: ProjectItem[];
  theme: Theme;
  variant?: ProjectsVariant;
};

const Projects: React.FC<ProjectsProps> = ({ data, theme, variant = 'cards' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

  const renderHeader = () => (
    <div className="flex items-center gap-2 mb-2">
      <FolderGit2 className="w-4 h-4 shrink-0" style={{ color: theme.primary }} />
      <h2
        className="text-[14px] font-bold uppercase tracking-wider leading-[1.25] whitespace-nowrap"
        style={{ fontFamily: 'Roboto, sans-serif', color: theme.primary }}
      >
        Projects
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: `${theme.primary}20` }} />
    </div>
  );

  if (variant === 'cards') {
    return (
      <div id="cv-section-projects" className="w-full mb-4">
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
                <h3 className="text-[13px] font-bold leading-[1.25] min-w-0 flex-1" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                  {item.name}
                </h3>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold px-2 py-0.5 rounded-xs shrink-0"
                    style={{
                      background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})`,
                      color: '#fff',
                    }}
                  >
                    View
                  </a>
                )}
              </div>
              
              {item.description && (
                <p className="text-[11.5px] leading-[1.45] mb-1.5" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                  {item.description}
                </p>
              )}
              
              <div className="flex flex-wrap gap-1 mb-1">
                {item.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-xs"
                    style={{
                      backgroundColor: `${theme.primary}10`,
                      color: theme.primary,
                      fontFamily: theme.fontFamily,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {item.achievements && item.achievements.length > 0 && (
                <ul className="space-y-0.5 mt-1.5 pt-1.5 border-t" style={{ borderColor: `${theme.primary}10` }}>
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[11.5px] leading-[1.45]" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 opacity-60" style={{ backgroundColor: theme.primary }} />
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

  if (variant === 'grid') {
    return (
      <div id="cv-section-projects" className="w-full mb-4">
        {renderHeader()}
        <div className="grid grid-cols-2 gap-2.5">
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
                <h3 className="text-[13px] font-bold leading-[1.25] min-w-0 flex-1" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                  {item.name}
                </h3>
              </div>
              
              {item.description && (
                <p className="text-[11.5px] leading-[1.45] mb-1.5" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                  {item.description}
                </p>
              )}
              
              <div className="flex flex-wrap gap-1 mt-auto">
                {item.technologies.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-xs"
                    style={{
                      backgroundColor: `${theme.primary}10`,
                      color: theme.primary,
                      fontFamily: theme.fontFamily,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Portfolio variant (default)
  return (
    <div id="cv-section-projects" className="w-full mb-4">
      {renderHeader()}
      <div className="space-y-2.5">
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
            <div className="flex flex-wrap justify-between items-start mb-1 gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-[13px] font-bold leading-[1.25]" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                  {item.name}
                </h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-xs"
                      style={{
                        background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}15, ${theme.gradient.end}15)`,
                        color: theme.primary,
                        fontFamily: theme.fontFamily,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold px-2.5 py-1 rounded-xs shrink-0"
                  style={{
                    background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})`,
                    color: '#fff',
                  }}
                >
                  View Live
                </a>
              )}
            </div>
            {item.description && (
              <p className="text-[11.5px] leading-[1.45] mt-1.5 pt-1.5 border-t" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary, borderColor: `${theme.primary}10` }}>
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;