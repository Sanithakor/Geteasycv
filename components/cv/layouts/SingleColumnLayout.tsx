// Single Column Layout - Clean, linear layout for traditional resumes

import React from 'react';
import { Theme } from '../../../data/themes';
import { Layout } from '../../../data/layouts';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant } from '../variants/sectionVariants';

export type SingleColumnLayoutProps = {
  data: CVData;
  theme: Theme;
  headerVariant?: HeaderVariant;
  experienceVariant?: ExperienceVariant;
  skillsVariant?: SkillsVariant;
  educationVariant?: EducationVariant;
};

const SingleColumnLayout: React.FC<SingleColumnLayoutProps> = ({
  data,
  theme,
  headerVariant = 'centered',
  experienceVariant = 'timeline',
  skillsVariant = 'tags',
  educationVariant = 'list',
}) => {
  return (
    <div
      className="w-full max-w-[800px] mx-auto"
      style={{
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
        padding: '2rem',
        borderRadius: theme.borderRadius,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Header Section */}
      <Header data={data.personal} theme={theme} variant={headerVariant} />

      {/* Summary Section */}
      {data.summary && <Summary data={data.summary} theme={theme} />}

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <Experience data={data.experience} theme={theme} variant={experienceVariant} />
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <Education data={data.education} theme={theme} variant={educationVariant} />
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <Skills data={data.skills} theme={theme} variant={skillsVariant} />
      )}
    </div>
  );
};

export default SingleColumnLayout;