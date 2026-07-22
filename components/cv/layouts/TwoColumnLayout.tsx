// Two Column Layout - Balanced layout for maximum information density

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant } from '../variants/sectionVariants';

export type TwoColumnLayoutProps = {
  data: CVData;
  theme: Theme;
  headerVariant?: HeaderVariant;
  experienceVariant?: ExperienceVariant;
  skillsVariant?: SkillsVariant;
  educationVariant?: EducationVariant;
};

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  data,
  theme,
  headerVariant = 'centered',
  experienceVariant = 'cards',
  skillsVariant = 'progress-bars',
  educationVariant = 'compact',
}) => {
  return (
    <div
      className="w-full max-w-[900px] mx-auto"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
        padding: '2.5rem',
        borderRadius: theme.borderRadius,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Left Column */}
      <div className="space-y-6">
        {/* Header */}
        <Header data={data.personal} theme={theme} variant={headerVariant} />

        {/* Summary */}
        {data.summary && <Summary data={data.summary} theme={theme} />}

        {/* Experience */}
        {data.experience.length > 0 && (
          <Experience data={data.experience} theme={theme} variant={experienceVariant} />
        )}
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Education */}
        {data.education.length > 0 && (
          <Education data={data.education} theme={theme} variant={educationVariant} />
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <Skills data={data.skills} theme={theme} variant={skillsVariant} />
        )}
      </div>
    </div>
  );
};

export default TwoColumnLayout;