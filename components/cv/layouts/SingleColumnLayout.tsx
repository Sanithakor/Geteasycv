// Single Column Layout - Clean, linear layout for traditional resumes

import React from 'react';
import { Theme } from '../../../data/themes';
import { Layout } from '../../../data/layouts';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages, Awards } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant, AwardsVariant } from '../variants/sectionVariants';

export type SingleColumnLayoutProps = {
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

const SingleColumnLayout: React.FC<SingleColumnLayoutProps> = ({
  data,
  theme,
  headerVariant = 'centered',
  experienceVariant = 'timeline',
  skillsVariant = 'tags',
  educationVariant = 'list',
  projectsVariant = 'cards',
  certificationsVariant = 'list',
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
      <Header data={data.personal} theme={theme} variant={headerVariant} />
      {data.summary && <Summary data={data.summary} theme={theme} />}
      {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
      {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
      {data.skills.length > 0 && <Skills data={data.skills} theme={theme} variant={skillsVariant} />}
      {data.projects && data.projects.length > 0 && <Projects data={data.projects} theme={theme} variant={projectsVariant} />}
      {data.certifications && data.certifications.length > 0 && <Certifications data={data.certifications} theme={theme} variant={certificationsVariant} />}
      {data.languages && data.languages.length > 0 && <Languages data={data.languages} theme={theme} variant={languagesVariant} />}
      {data.awards && data.awards.length > 0 && <Awards data={data.awards} theme={theme} variant={awardsVariant} />}
    </div>
  );
};

export default SingleColumnLayout;