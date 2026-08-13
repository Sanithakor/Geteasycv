// Two Column Layout - Balanced layout for maximum information density

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages, Awards } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant, AwardsVariant } from '../variants/sectionVariants';

export type TwoColumnLayoutProps = {
  data: CVData;
  theme: Theme;
  headerVariant?: HeaderVariant;
  experienceVariant?: ExperienceVariant;
  skillsVariant?: SkillsVariant;
  educationVariant?: EducationVariant;
  projectsVariant?: ProjectsVariant;
  certificationsVariant?: CertificationsVariant;
  languagesVariant?: LanguagesVariant;
  awardsVariant?: AwardsVariant;
};

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  data,
  theme,
  headerVariant = 'centered',
  experienceVariant = 'cards',
  skillsVariant = 'progress-bars',
  educationVariant = 'compact',
  projectsVariant = 'grid',
  certificationsVariant = 'badges',
  languagesVariant = 'tags',
  awardsVariant = 'cards',
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
      {/* Full-width header */}
      <div className="mb-4">
        <Header data={data.personal} theme={theme} variant={headerVariant} />
        {data.summary && <Summary data={data.summary} theme={theme} />}
      </div>

      {/* Two-column body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Left Column */}
        <div className="space-y-4">
          {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
          {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
          {data.awards && data.awards.length > 0 && <Awards data={data.awards} theme={theme} variant={awardsVariant} />}
        </div>

        {/* Right Column */}
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

export default TwoColumnLayout;