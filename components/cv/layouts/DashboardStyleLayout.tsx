// Dashboard Style Layout - Professional dashboard-inspired layout

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';

export type DashboardStyleLayoutProps = {
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

const DashboardStyleLayout: React.FC<DashboardStyleLayoutProps> = ({
  data,
  theme,
  headerVariant = 'compact',
  experienceVariant = 'compact',
  skillsVariant = 'progress-bars',
  educationVariant = 'compact',
  projectsVariant = 'grid',
  certificationsVariant = 'badges',
  languagesVariant = 'progress',
}) => {
  return (
    <div
      className="w-full"
      style={{
        backgroundColor: theme.backgroundAlt,
        fontFamily: theme.fontFamily,
        color: theme.text,
        overflow: 'hidden',
      }}
    >
      {/* Top Bar */}
      <div
        className="p-4 flex justify-between items-center"
        style={{
          background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})`,
          color: '#fff',
        }}
      >
        <div className="flex items-center gap-3">
          {data.personal.avatar && (
            <img
              src={data.personal.avatar}
              alt={`${data.personal.firstName} ${data.personal.lastName}`}
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
          )}
          <div>
            <h1 className="text-[28px] font-bold leading-[1.15]" style={{ fontFamily: theme.fontFamilyHeading }}>
              {data.personal.firstName} {data.personal.lastName}
            </h1>
            <p className="text-[14px] font-semibold leading-[1.25] opacity-90">{data.personal.title}</p>
          </div>
        </div>
        <div className="flex gap-3 text-[10.5px] font-medium leading-normal">
          <span>{data.personal.email}</span>
          <span>•</span>
          <span>{data.personal.location}</span>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-5" style={{ backgroundColor: theme.backgroundAlt }}>
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          <div className="p-3 rounded-md" style={{ backgroundColor: theme.background }}>
            <div className="text-xl font-bold" style={{ color: theme.primary }}>{data.experience.length}</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>Experience</div>
          </div>
          <div className="p-3 rounded-md" style={{ backgroundColor: theme.background }}>
            <div className="text-xl font-bold" style={{ color: theme.primary }}>{data.skills.length}</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>Skills</div>
          </div>
          <div className="p-3 rounded-md" style={{ backgroundColor: theme.background }}>
            <div className="text-xl font-bold" style={{ color: theme.primary }}>{data.projects?.length || 0}</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>Projects</div>
          </div>
          <div className="p-3 rounded-md" style={{ backgroundColor: theme.background }}>
            <div className="text-xl font-bold" style={{ color: theme.primary }}>{data.education.length}</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>Education</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-4">
            {data.summary && <Summary data={data.summary} theme={theme} variant="standard" />}
            {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
            {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
          </div>
          <div className="space-y-4">
            {data.skills.length > 0 && <Skills data={data.skills} theme={theme} variant={skillsVariant} />}
            {data.projects && data.projects.length > 0 && <Projects data={data.projects} theme={theme} variant={projectsVariant} />}
            {data.certifications && data.certifications.length > 0 && <Certifications data={data.certifications} theme={theme} variant={certificationsVariant} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStyleLayout;