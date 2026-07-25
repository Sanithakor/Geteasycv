// Glassmorphism Layout - Modern glassmorphism effect

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';
import { getGlassStyle } from '../variants/sectionVariants';
import { DUMMY_AVATAR } from '../../../data/sampleCV';

export type GlassmorphismLayoutProps = {
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

const GlassmorphismLayout: React.FC<GlassmorphismLayoutProps> = ({
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
  const glassStyle = getGlassStyle(theme);

  return (
    <div
      className="w-full  p-8"
      style={{
        background: `linear-gradient(135deg, ${theme.primary}20 0%, ${theme.secondary} 50%, ${theme.primary}10 100%)`,
        
        
      }}
    >
      <div
        className="p-6 mb-6"
        style={glassStyle}
      >
        <div className="flex items-center gap-6">
          {data.personal.avatar && (
            <img
              src={data.personal.avatar}
              alt={`${data.personal.firstName} ${data.personal.lastName}`}
              className="w-20 h-20 rounded-full object-cover border-2"
              style={{ borderColor: theme.primary }}
            />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold" style={{ fontFamily: theme.fontFamilyHeading, color: theme.text }}>
              {data.personal.firstName} {data.personal.lastName}
            </h1>
            <p style={{ color: theme.primary }}>{data.personal.title}</p>
            <div className="flex gap-4 mt-2 text-sm" style={{ color: theme.textSecondary }}>
              <span>{data.personal.email}</span>
              <span>{data.personal.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          {data.summary && (
            <div className="p-5" style={glassStyle}>
              <p className="text-sm" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                {data.summary}
              </p>
            </div>
          )}
          {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
          {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
        </div>
        <div className="space-y-6">
          {data.skills.length > 0 && <Skills data={data.skills} theme={theme} variant={skillsVariant} />}
          {data.projects && data.projects.length > 0 && <Projects data={data.projects} theme={theme} variant={projectsVariant} />}
          {data.certifications && data.certifications.length > 0 && <Certifications data={data.certifications} theme={theme} variant={certificationsVariant} />}
          {data.languages && data.languages.length > 0 && <Languages data={data.languages} theme={theme} variant={languagesVariant} />}
        </div>
      </div>
    </div>
  );
};

export default GlassmorphismLayout;