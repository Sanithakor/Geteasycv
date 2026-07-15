// Luxury Minimal Layout - Sophisticated minimal design

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';

export type LuxuryMinimalLayoutProps = {
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

const LuxuryMinimalLayout: React.FC<LuxuryMinimalLayoutProps> = ({
  data,
  theme,
  headerVariant = 'minimal',
  experienceVariant = 'bordered',
  skillsVariant = 'tags',
  educationVariant = 'list',
  projectsVariant = 'cards',
  certificationsVariant = 'list',
  languagesVariant = 'tags',
}) => {
  return (
    <div
      className="w-full max-w-[800px] mx-auto"
      style={{
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
        padding: '3rem',
        borderRadius: theme.borderRadius,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: theme.fontFamilyHeading, color: theme.text }}>
          {data.personal.firstName} {data.personal.lastName}
        </h1>
        <p className="text-lg mb-4" style={{ fontFamily: theme.fontFamily, color: theme.primary }}>
          {data.personal.title}
        </p>
        <div className="flex justify-center gap-6 text-sm" style={{ color: theme.textSecondary }}>
          <span>{data.personal.email}</span>
          <span>{data.personal.phone}</span>
          <span>{data.personal.location}</span>
        </div>
      </div>

      {data.summary && (
        <div className="mb-8">
          <p className="text-lg leading-relaxed" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
            {data.summary}
          </p>
        </div>
      )}

      <div className="space-y-8">
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

export default LuxuryMinimalLayout;