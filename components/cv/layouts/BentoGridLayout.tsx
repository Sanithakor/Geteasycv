// Bento Grid Layout - Modern bento-style grid layout

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';
import { DUMMY_AVATAR } from '../../../data/sampleCV';

export type BentoGridLayoutProps = {
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

const BentoGridLayout: React.FC<BentoGridLayoutProps> = ({
  data,
  theme,
  headerVariant = 'centered',
  experienceVariant = 'cards',
  skillsVariant = 'circles',
  educationVariant = 'cards',
  projectsVariant = 'grid',
  certificationsVariant = 'badges',
  languagesVariant = 'tags',
}) => {
  return (
    <div
      className="w-full p-5"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'auto auto auto auto',
        gap: '0.75rem',
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
      }}
    >
      {/* Header Card - Spans 2 columns */}
      <div
        className="col-span-2 p-5 rounded-md"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}10 0%, ${theme.secondary} 100%)`,
          gridColumn: 'span 2',
        }}
      >
        <div className="flex items-center gap-4">
          {data.personal.avatar && (
            <img
              src={data.personal.avatar}
              alt={`${data.personal.firstName} ${data.personal.lastName}`}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-[28px] font-bold leading-[1.15]" style={{ fontFamily: theme.fontFamilyHeading, color: theme.text }}>
              {data.personal.firstName} {data.personal.lastName}
            </h1>
            <p className="text-[14px] font-semibold leading-[1.25] mt-0.5" style={{ color: theme.primary }}>{data.personal.title}</p>
          </div>
        </div>
      </div>

      {/* Contact Card */}
      <div
        className="p-4 rounded-md"
        style={{
          backgroundColor: theme.background,
          border: `1px solid ${theme.border}`,
        }}
      >
        <h3 className="text-[14px] font-bold uppercase tracking-wider leading-[1.25] mb-2" style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}>Contact</h3>
        <div className="space-y-1 text-[10.5px] font-medium leading-normal" style={{ color: theme.textSecondary }}>
          <div>{data.personal.email}</div>
          <div>{data.personal.phone}</div>
          <div>{data.personal.location}</div>
        </div>
      </div>

      {/* Summary Card - Spans 2 columns */}
      {data.summary && (
        <div
          className="col-span-2 p-4 rounded-md"
          style={{
            backgroundColor: theme.background,
            border: `1px solid ${theme.border}`,
            gridColumn: 'span 2',
          }}
        >
          <h3 className="text-[14px] font-bold uppercase tracking-wider leading-[1.25] mb-1.5" style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}>Summary</h3>
          <p className="text-[11.5px] leading-[1.45]" style={{ color: theme.text }}>{data.summary}</p>
        </div>
      )}

      {/* Main Content Area */}
      <div className="col-span-3 space-y-4">
        {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
        {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
        {data.skills.length > 0 && <Skills data={data.skills} theme={theme} variant={skillsVariant} />}
        {data.projects && data.projects.length > 0 && <Projects data={data.projects} theme={theme} variant={projectsVariant} />}
      </div>
    </div>
  );
};

export default BentoGridLayout;