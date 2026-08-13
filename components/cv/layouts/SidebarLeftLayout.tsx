// Sidebar Left Layout - Modern layout with sidebar (Optimized for Canvas)

import React, { memo } from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Education, Projects, Certifications, Languages, Awards } from '../sections';
import { HeaderVariant, ExperienceVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant, AwardsVariant } from '../variants/sectionVariants';
import { DUMMY_AVATAR } from '../../../data/sampleCV';

export type SidebarLeftLayoutProps = {
  data: CVData;
  theme: Theme;
  headerVariant?: HeaderVariant;
  experienceVariant?: ExperienceVariant;
  educationVariant?: EducationVariant;
  projectsVariant?: ProjectsVariant;
  certificationsVariant?: CertificationsVariant;
  languagesVariant?: LanguagesVariant;
};

const SidebarLeftLayout: React.FC<SidebarLeftLayoutProps> = memo(({
  data,
  theme,
  headerVariant = 'minimal',
  experienceVariant = 'cards',
  educationVariant = 'cards',
  projectsVariant = 'cards',
  certificationsVariant = 'badges',
  languagesVariant = 'tags',
}) => {
  const avatar = data.personal.avatar || DUMMY_AVATAR;
  
  // Optimize skills rendering for canvas — show all skills, no arbitrary cap
  const displaySkills = React.useMemo(() => data.skills, [data.skills]);

  return (
    <div
      className="w-full max-w-full overflow-hidden"
      style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
        minHeight: '297mm', // A4 height for proper canvas rendering
        width: '210mm', // A4 width for proper canvas rendering
      }}
    >
      {/* Sidebar - Optimized for Canvas */}
      <div
        className="p-5"
        style={{
          background: `linear-gradient(180deg, ${theme.primary} 0%, ${theme.primary}CC 100%)`,
          color: '#fff',
          willChange: 'transform', // Optimize for canvas rendering
        }}
      >
        {avatar && (
          <div className="mb-5 flex justify-center">
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundImage: `url(${avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '3px solid rgba(255, 255, 255, 0.4)',
                imageRendering: 'auto' as const,
              }}
              aria-label={`${data.personal.firstName} ${data.personal.lastName} profile photo`}
            />
          </div>
        )}
        
        <div className="text-center mb-5">
          <h1 
            className="text-[28px] font-bold leading-[1.15] mb-1" 
            style={{ 
              fontFamily: theme.fontFamilyHeading,
              wordWrap: 'break-word'
            }}
          >
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <p 
            className="text-[14px] font-semibold leading-[1.25] opacity-90" 
            style={{ 
              fontFamily: theme.fontFamily,
            }}
          >
            {data.personal.title}
          </p>
        </div>
        
        <div className="space-y-3 mb-5">
          <h2 className="text-[14px] font-bold uppercase tracking-wider leading-[1.25] opacity-90" style={{ fontFamily: theme.fontFamily }}>
            Contact
          </h2>
          {data.personal.email && <div className="text-[10.5px] font-medium leading-normal break-words">{data.personal.email}</div>}
          {data.personal.phone && <div className="text-[10.5px] font-medium leading-normal">{data.personal.phone}</div>}
          {data.personal.location && <div className="text-[10.5px] font-medium leading-normal">{data.personal.location}</div>}
          {data.personal.website && <div className="text-[10.5px] font-medium leading-normal break-words">{data.personal.website}</div>}
          {data.personal.linkedin && <div className="text-[10.5px] font-medium leading-normal break-words">{data.personal.linkedin}</div>}
        </div>

        {displaySkills && displaySkills.length > 0 && (
          <div className="space-y-3 mb-5">
            <h2 className="text-[14px] font-bold uppercase tracking-wider leading-[1.25] opacity-90" style={{ fontFamily: theme.fontFamily }}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {displaySkills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white/15 text-white"
                  style={{ fontFamily: theme.fontFamily }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="p-5" style={{ backgroundColor: theme.background }}>
        {data.summary && <Summary data={data.summary} theme={theme} />}
        {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
        {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
        {data.projects && data.projects.length > 0 && <Projects data={data.projects} theme={theme} variant={projectsVariant} />}
        {data.certifications && data.certifications.length > 0 && <Certifications data={data.certifications} theme={theme} variant={certificationsVariant} />}
        {data.languages && data.languages.length > 0 && <Languages data={data.languages} theme={theme} variant={languagesVariant} />}
      </div>
    </div>
  );
});

SidebarLeftLayout.displayName = 'SidebarLeftLayout';

export default SidebarLeftLayout;