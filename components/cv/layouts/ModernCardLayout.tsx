// Modern Card Layout - Card-based modern layout with hover effects

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';
import { getCardStyles, getShadowStyle } from '../variants/sectionVariants';

export type ModernCardLayoutProps = {
  data: CVData;
  theme: Theme;
  headerVariant?: HeaderVariant;
  experienceVariant?: ExperienceVariant;
  skillsVariant?: SkillsVariant;
  educationVariant?: EducationVariant;
  projectsVariant?: ProjectsVariant;
  certificationsVariant?: CertificationsVariant;
  languagesVariant?: LanguagesVariant;
};

const ModernCardLayout: React.FC<ModernCardLayoutProps> = ({
  data,
  theme,
  headerVariant = 'centered',
  experienceVariant = 'cards',
  skillsVariant = 'tags',
  educationVariant = 'cards',
  projectsVariant = 'cards',
  certificationsVariant = 'badges',
  languagesVariant = 'tags',
}) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

  return (
    <div
      className="w-full p-5"
      style={{
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
      }}
    >
      {/* Header Card */}
      <div
        className="p-4 mb-4 rounded-md"
        style={{
          ...cardStyles,
          boxShadow: shadowStyle,
        }}
      >
        <div className="flex items-center gap-4">
          {data.personal.avatar && (
            <img
              src={data.personal.avatar}
              alt={`${data.personal.firstName} ${data.personal.lastName}`}
              className="w-16 h-16 rounded-md object-cover"
            />
          )}
          <div className="flex-1">
            <h1 className="text-[28px] font-bold leading-[1.15]" style={{ fontFamily: theme.fontFamilyHeading, color: theme.text }}>
              {data.personal.firstName} {data.personal.lastName}
            </h1>
            <p className="text-[14px] font-semibold leading-[1.25] mt-0.5" style={{ color: theme.primary }}>{data.personal.title}</p>
            <div className="flex gap-3 mt-1.5 text-[10.5px] font-medium leading-normal" style={{ color: theme.textSecondary }}>
              <span>{data.personal.email}</span>
              <span>{data.personal.phone}</span>
              <span>{data.personal.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      {data.summary && (
        <div
          className="p-3.5 mb-4 rounded-md"
          style={{
            ...cardStyles,
            boxShadow: shadowStyle,
            borderLeft: `3px solid ${theme.primary}`,
          }}
        >
          <p className="text-[11.5px] leading-[1.45]" style={{ fontFamily: theme.fontFamily, color: theme.text }}>{data.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
          {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
        </div>
        <div className="space-y-4">
          {data.skills.length > 0 && <Skills data={data.skills} theme={theme} variant={skillsVariant} />}
          {data.projects && data.projects.length > 0 && <Projects data={data.projects} theme={theme} variant={projectsVariant} />}
          {data.certifications && data.certifications.length > 0 && <Certifications data={data.certifications} theme={theme} variant={certificationsVariant} />}
          {data.languages && data.languages.length > 0 && <Languages data={data.languages} theme={theme} variant={languagesVariant} />}
        </div>
      </div>
    </div>
  );
};

export default ModernCardLayout;