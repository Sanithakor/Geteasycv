// Dashboard Style Layout - Professional dashboard-inspired layout

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';
import { DUMMY_AVATAR } from '../../../data/sampleCV';

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
      className="w-full max-w-[1000px] mx-auto"
      style={{
        backgroundColor: theme.backgroundAlt,
        fontFamily: theme.fontFamily,
        color: theme.text,
        borderRadius: theme.borderRadius,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
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
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
          )}
          <div>
            <h1 className="font-bold" style={{ fontFamily: theme.fontFamilyHeading }}>
              {data.personal.firstName} {data.personal.lastName}
            </h1>
            <p className="text-sm opacity-90">{data.personal.title}</p>
          </div>
        </div>
        <div className="flex gap-4 text-sm">
          <span>{data.personal.email}</span>
          <span>{data.personal.location}</span>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6" style={{ backgroundColor: theme.backgroundAlt }}>
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg" style={{ backgroundColor: theme.background, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div className="text-2xl font-bold" style={{ color: theme.primary }}>{data.experience.length}</div>
            <div className="text-sm" style={{ color: theme.textSecondary }}>Experience</div>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: theme.background, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div className="text-2xl font-bold" style={{ color: theme.primary }}>{data.skills.length}</div>
            <div className="text-sm" style={{ color: theme.textSecondary }}>Skills</div>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: theme.background, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div className="text-2xl font-bold" style={{ color: theme.primary }}>{data.projects?.length || 0}</div>
            <div className="text-sm" style={{ color: theme.textSecondary }}>Projects</div>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: theme.background, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div className="text-2xl font-bold" style={{ color: theme.primary }}>{data.education.length}</div>
            <div className="text-sm" style={{ color: theme.textSecondary }}>Education</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            {data.summary && <Summary data={data.summary} theme={theme} variant="standard" />}
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
    </div>
  );
};

export default DashboardStyleLayout;