// Compact ATS Layout - Space-efficient ATS-friendly layout

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';

export type CompactATSLayoutProps = {
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

const CompactATSLayout: React.FC<CompactATSLayoutProps> = ({
  data,
  theme,
  headerVariant = 'minimal',
  experienceVariant = 'compact',
  skillsVariant = 'tags',
  educationVariant = 'compact',
  projectsVariant = 'grid',
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
        padding: '1.5rem',
        borderRadius: theme.borderRadius,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Header data={data.personal} theme={theme} variant={headerVariant} />
      {data.summary && <Summary data={data.summary} theme={theme} variant="minimal" />}
      {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
      {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
      {data.skills.length > 0 && <Skills data={data.skills} theme={theme} variant={skillsVariant} />}
      {data.projects && data.projects.length > 0 && <Projects data={data.projects} theme={theme} variant={projectsVariant} />}
      {data.certifications && data.certifications.length > 0 && <Certifications data={data.certifications} theme={theme} variant={certificationsVariant} />}
      {data.languages && data.languages.length > 0 && <Languages data={data.languages} theme={theme} variant={languagesVariant} />}
    </div>
  );
};

export default CompactATSLayout;