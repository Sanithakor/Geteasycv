// Centered Layout - Centered content with symmetrical design

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';

export type CenteredLayoutProps = {
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

const CenteredLayout: React.FC<CenteredLayoutProps> = ({
  data,
  theme,
  headerVariant = 'centered',
  experienceVariant = 'timeline',
  skillsVariant = 'tags',
  educationVariant = 'list',
  projectsVariant = 'cards',
  certificationsVariant = 'list',
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
      {/* Centered Header */}
      <div className="text-center mb-6">
        {data.personal.avatar && (
          <div className="mb-3 flex justify-center">
            <img
              src={data.personal.avatar}
              alt={`${data.personal.firstName} ${data.personal.lastName}`}
              className="w-20 h-20 rounded-full object-cover border-2"
              style={{ borderColor: theme.primary }}
            />
          </div>
        )}
        <h1 className="text-[28px] font-bold leading-[1.15] mb-1" style={{ fontFamily: theme.fontFamilyHeading, color: theme.text }}>
          {data.personal.firstName} {data.personal.lastName}
        </h1>
        <p className="text-[14px] font-semibold leading-[1.25] mb-2" style={{ color: theme.primary }}>{data.personal.title}</p>
        <div className="flex justify-center gap-3 text-[10.5px] font-medium leading-normal" style={{ color: theme.textSecondary }}>
          <span>{data.personal.email}</span>
          <span>|</span>
          <span>{data.personal.phone}</span>
          <span>|</span>
          <span>{data.personal.location}</span>
        </div>
      </div>

      {data.summary && (
        <div className="mb-6 text-center max-w-xl mx-auto">
          <p className="text-[11.5px] leading-[1.45]" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
            {data.summary}
          </p>
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

export default CenteredLayout;