// Sidebar Right Layout - Alternative with sidebar on right

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages, Contact } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant, ContactVariant } from '../variants/sectionVariants';
import { DUMMY_AVATAR } from '../../../data/sampleCV';

export type SidebarRightLayoutProps = {
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

const SidebarRightLayout: React.FC<SidebarRightLayoutProps> = ({
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
      className="w-full overflow-hidden"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 260px',
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
      }}
    >
      {/* Main Content */}
      <div className="p-5" style={{ backgroundColor: theme.background }}>
        <Header data={data.personal} theme={theme} variant={headerVariant} hideAvatar={true} />
        {data.summary && <Summary data={data.summary} theme={theme} />}
        {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
        {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
        {data.projects && data.projects.length > 0 && <Projects data={data.projects} theme={theme} variant={projectsVariant} />}
        {data.certifications && data.certifications.length > 0 && <Certifications data={data.certifications} theme={theme} variant={certificationsVariant} />}
        {data.languages && data.languages.length > 0 && <Languages data={data.languages} theme={theme} variant={languagesVariant} />}
      </div>

      {/* Sidebar */}
      <div
        className="p-5"
        style={{
          background: `linear-gradient(180deg, ${theme.primary} 0%, ${theme.primary}CC 100%)`,
          color: '#fff',
        }}
      >
        {avatar && (
          <div className="mb-5 flex justify-center">
            <img
              src={avatar}
              alt={`${data.personal.firstName} ${data.personal.lastName}`}
              className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
            />
          </div>
        )}
        <div className="text-center mb-5">
          <h1 className="text-[33.6px] font-bold leading-[1.15] mb-1" style={{ fontFamily: theme.fontFamilyHeading }}>
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <p className="text-[16.8px] font-semibold leading-[1.25] opacity-90" style={{ fontFamily: theme.fontFamily }}>
            {data.personal.title}
          </p>
        </div>
        <div className="space-y-3 mb-5">
          <h2 className="text-[16.8px] font-bold uppercase tracking-wider leading-[1.25] opacity-90" style={{ fontFamily: theme.fontFamily }}>
            Contact
          </h2>
          {data.personal.email && <div className="text-[12.6px] font-medium leading-normal break-words">{data.personal.email}</div>}
          {data.personal.phone && <div className="text-[12.6px] font-medium leading-normal">{data.personal.phone}</div>}
          {data.personal.location && <div className="text-[12.6px] font-medium leading-normal">{data.personal.location}</div>}
        </div>
        {data.skills.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-[16.8px] font-bold uppercase tracking-wider leading-[1.25] opacity-90" style={{ fontFamily: theme.fontFamily }}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill) => (
                <span key={skill.id} className="text-[13.2px] font-semibold px-2 py-0.5 rounded bg-white/15 text-white">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarRightLayout;