// Timeline Layout - Vertical timeline design

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';

export type TimelineLayoutProps = {
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

const TimelineLayout: React.FC<TimelineLayoutProps> = ({
  data,
  theme,
  headerVariant = 'banner',
  experienceVariant = 'timeline',
  skillsVariant = 'tags',
  educationVariant = 'list',
  projectsVariant = 'portfolio',
  certificationsVariant = 'badges',
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
      <div className="flex flex-col items-center mb-6">
        {data.personal.avatar && (
          <img
            src={data.personal.avatar}
            alt={`${data.personal.firstName} ${data.personal.lastName}`}
            className="w-20 h-20 rounded-full object-cover border-2 mb-3"
            style={{ borderColor: theme.primary }}
          />
        )}
        <h1 className="text-[28px] font-bold text-center leading-[1.15] mb-1" style={{ fontFamily: theme.fontFamilyHeading, color: theme.text }}>
          {data.personal.firstName} {data.personal.lastName}
        </h1>
        <p className="text-[14px] font-semibold text-center leading-[1.25] mb-1.5" style={{ fontFamily: theme.fontFamily, color: theme.primary }}>
          {data.personal.title}
        </p>
        <p className="text-[10.5px] font-medium text-center leading-normal" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
          {data.personal.location} | {data.personal.email}
        </p>
      </div>
      {data.summary && <Summary data={data.summary} theme={theme} variant="highlight" />}
      {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
      {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
      {data.skills.length > 0 && <Skills data={data.skills} theme={theme} variant={skillsVariant} />}
      {data.projects && data.projects.length > 0 && <Projects data={data.projects} theme={theme} variant={projectsVariant} />}
      {data.certifications && data.certifications.length > 0 && <Certifications data={data.certifications} theme={theme} variant={certificationsVariant} />}
      {data.languages && data.languages.length > 0 && <Languages data={data.languages} theme={theme} variant={languagesVariant} />}
    </div>
  );
};

export default TimelineLayout;