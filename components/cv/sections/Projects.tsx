// Projects section component with variant support

import React from 'react';
import { Theme } from '../../../data/themes';
import { ProjectsVariant, getCardStyles, getShadowStyle, getGlassStyle } from '../variants/sectionVariants';
import { ProjectItem } from '../../../data/sampleCV';

export type ProjectsProps = {
  data: ProjectItem[];
  theme: Theme;
  variant?: ProjectsVariant;
};

const Projects: React.FC<ProjectsProps> = ({ data, theme, variant = 'cards' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

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
          Projects
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
                <h3
                  className="text-lg font-semibold"
                  style={{ fontFamily: theme.fontFamily, color: theme.text }}
                >
                  {item.name}
                </h3>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-3 py-1 rounded-full transition-all hover:scale-105"
                    style={{
                      background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})`,
                      color: '#fff',
                    }}
                  >
                    View
                  </a>
                )}
              </div>
              <p
                className="mb-1.5 text-sm"
                style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
              >
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-1.5">
                {item.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      backgroundColor: `${theme.primary}15`,
                      color: theme.primary,
                      fontFamily: theme.fontFamily,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {item.achievements && item.achievements.length > 0 && (
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

  // Grid variant
  if (variant === 'grid') {
    return (
      <div className="w-full" style={{ marginBottom: '0.5rem' }}>
        <h2
          className="text-xl font-semibold mb-1"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Projects
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="cv-block p-4"
              style={{
                ...cardStyles,
                boxShadow: shadowStyle,
              }}
            >
              <h3
                className="font-semibold mb-1"
                style={{ fontFamily: theme.fontFamily, color: theme.text }}
              >
                {item.name}
              </h3>
              <p
                className="text-sm mb-1"
                style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
              >
                {item.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {item.technologies.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${theme.primary}15`,
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

  // Portfolio variant
  return (
    <div className="w-full" style={{ marginBottom: '0.5rem' }}>
      <h2
        className="text-xl font-semibold mb-1"
        style={{
          fontFamily: theme.fontFamilyHeading,
          color: theme.primary,
        }}
      >
        Featured Projects
      </h2>
      <div className="space-y-3.5">
        {data.map((item, index) => (
          <div
            key={item.id}
            className="cv-block p-4"
            style={{
              ...cardStyles,
              boxShadow: shadowStyle,
              borderLeft: `4px solid ${theme.primary}`,
            }}
          >
            <div className="flex justify-between items-start mb-1.5">
              <div>
                <h3
                  className="text-xl font-semibold"
                  style={{ fontFamily: theme.fontFamily, color: theme.text }}
                >
                  {item.name}
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full"
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
                  className="text-sm px-4 py-2 rounded-lg transition-all hover:scale-105"
                  style={{
                    background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})`,
                    color: '#fff',
                  }}
                >
                  View Project
                </a>
              )}
            </div>
            <p
              className="text-sm"
              style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;