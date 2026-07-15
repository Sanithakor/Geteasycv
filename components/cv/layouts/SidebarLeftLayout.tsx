// Sidebar Left Layout - Modern layout with sidebar

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages, Contact } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant, ContactVariant } from '../variants/sectionVariants';
import { DUMMY_AVATAR } from '../../../data/sampleCV';

export type SidebarLeftLayoutProps = {
  data: CVData;
  theme: Theme;
  headerVariant?: HeaderVariant;
  experienceVariant?: ExperienceVariant;
  skillsVariant?: SkillsVariant;
  educationVariant?: EducationVariant;
  projectsVariant?: ProjectsVariant;
  certificationsVariant?: CertificationsVariant;
  languagesVariant?: LanguagesVariant;
  contactVariant?: ContactVariant;
};

const SidebarLeftLayout: React.FC<SidebarLeftLayoutProps> = ({
  data,
  theme,
  headerVariant = 'minimal',
  experienceVariant = 'cards',
  skillsVariant = 'progress-bars',
  educationVariant = 'cards',
  projectsVariant = 'cards',
  certificationsVariant = 'badges',
  languagesVariant = 'tags',
  contactVariant = 'icons',
}) => {
  const avatar = data.personal.avatar || DUMMY_AVATAR;

  return (
    <div
      className="w-full max-w-[900px] mx-auto overflow-hidden"
      style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
        borderRadius: theme.borderRadius,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Sidebar */}
      <div
        className="p-6"
        style={{
          background: `linear-gradient(180deg, ${theme.primary} 0%, ${theme.primary}CC 100%)`,
          color: '#fff',
        }}
      >
        {avatar && (
          <div className="mb-6 flex justify-center">
            <img
              src={avatar}
              alt={`${data.personal.firstName} ${data.personal.lastName}`}
              className="w-28 h-28 rounded-full object-cover border-4 border-white/30"
            />
          </div>
        )}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold mb-1" style={{ fontFamily: theme.fontFamilyHeading }}>
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <p className="text-sm opacity-90" style={{ fontFamily: theme.fontFamily }}>
            {data.personal.title}
          </p>
        </div>
        <div className="space-y-3 mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider opacity-70" style={{ fontFamily: theme.fontFamily }}>
            Contact
          </h2>
          {data.personal.email && <div className="text-sm break-words">{data.personal.email}</div>}
          {data.personal.phone && <div className="text-sm">{data.personal.phone}</div>}
          {data.personal.location && <div className="text-sm">{data.personal.location}</div>}
        </div>
        {data.skills.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider opacity-70" style={{ fontFamily: theme.fontFamily }}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.slice(0, 10).map((skill) => (
                <span key={skill.id} className="text-xs px-2 py-1 rounded-full bg-white/20" style={{ fontFamily: theme.fontFamily }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-6" style={{ backgroundColor: theme.background }}>
        <Header data={data.personal} theme={theme} variant={headerVariant} />
        {data.summary && <Summary data={data.summary} theme={theme} />}
        {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
        {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
        {data.projects && data.projects.length > 0 && <Projects data={data.projects} theme={theme} variant={projectsVariant} />}
        {data.certifications && data.certifications.length > 0 && <Certifications data={data.certifications} theme={theme} variant={certificationsVariant} />}
        {data.languages && data.languages.length > 0 && <Languages data={data.languages} theme={theme} variant={languagesVariant} />}
      </div>
    </div>
  );
};

export default SidebarLeftLayout;