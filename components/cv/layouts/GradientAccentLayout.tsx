// Gradient Accent Layout - Bold gradient accents

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';

export type GradientAccentLayoutProps = {
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

const GradientAccentLayout: React.FC<GradientAccentLayoutProps> = ({
  data,
  theme,
  headerVariant = 'centered',
  experienceVariant = 'cards',
  skillsVariant = 'progress-bars',
  educationVariant = 'cards',
  projectsVariant = 'cards',
  certificationsVariant = 'cards',
  languagesVariant = 'tags',
}) => {
  return (
    <div
      className="w-full"
      style={{
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
        padding: '1.5rem',
      }}
    >
      {/* Header with gradient accent */}
      <div className="relative mb-5 p-5 rounded-md overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})`,
            opacity: 0.1,
          }}
        />
        <div className="relative flex items-center gap-4">
          {data.personal.avatar && (
            <img
              src={data.personal.avatar}
              alt={`${data.personal.firstName} ${data.personal.lastName}`}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-[33.6px] font-bold leading-[1.15]" style={{ fontFamily: theme.fontFamilyHeading, color: theme.text }}>
              {data.personal.firstName} {data.personal.lastName}
            </h1>
            <p className="text-[16.8px] font-semibold leading-[1.25] mt-1" style={{ color: theme.primary }}>{data.personal.title}</p>
          </div>
        </div>
      </div>

      {data.summary && (
        <div className="mb-5 p-3.5 rounded-md" style={{ background: `linear-gradient(90deg, ${theme.primary}20 0%, transparent 100%)` }}>
          <p className="text-[13.8px] leading-[1.45]" style={{ fontFamily: theme.fontFamily, color: theme.text }}>{data.summary}</p>
        </div>
      )}

      <div className="space-y-4">
        {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
        {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
        {data.skills.length > 0 && <Skills data={data.skills} theme={theme} variant={skillsVariant} />}
        {data.projects && data.projects.length > 0 && <Projects data={data.projects} theme={theme} variant={projectsVariant} />}
        {data.certifications && data.certifications.length > 0 && <Certifications data={data.certifications} theme={theme} variant={certificationsVariant} />}
        {data.languages && data.languages.length > 0 && <Languages data={data.languages} theme={theme} variant={languagesVariant} />}
      </div>
    </div>
  );
};

export default GradientAccentLayout;