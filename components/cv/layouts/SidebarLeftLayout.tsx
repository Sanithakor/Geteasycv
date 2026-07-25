// Sidebar Left Layout - Modern layout with sidebar (Optimized for Canvas)

import React, { memo } from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';
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
  
  // Optimize skills rendering for canvas
  const displaySkills = React.useMemo(() => 
    data.skills.slice(0, 8), // Limit to 8 skills for performance
    [data.skills]
  );

  return (
    <div
      className="w-full max-w-full  overflow-hidden"
      style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
        
        
        minHeight: '297mm', // A4 height for proper canvas rendering
        width: '210mm', // A4 width for proper canvas rendering
      }}
    >
      {/* Sidebar - Optimized for Canvas */}
      <div
        className="p-6"
        style={{
          background: `linear-gradient(180deg, ${theme.primary} 0%, ${theme.primary}CC 100%)`,
          color: '#fff',
          willChange: 'transform', // Optimize for canvas rendering
        }}
      >
        {avatar && (
          <div className="mb-6 flex justify-center">
            <div
              style={{
                width: '112px',
                height: '112px',
                borderRadius: '50%',
                backgroundImage: `url(${avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '4px solid rgba(255, 255, 255, 0.3)',
                imageRendering: 'auto' as const, // Better canvas rendering
              }}
              aria-label={`${data.personal.firstName} ${data.personal.lastName} profile photo`}
            />
          </div>
        )}
        
        <div className="text-center mb-6">
          <h1 
            className="text-xl font-bold mb-1" 
            style={{ 
              fontFamily: theme.fontFamilyHeading,
              lineHeight: '1.2',
              wordWrap: 'break-word'
            }}
          >
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <p 
            className="text-sm opacity-90" 
            style={{ 
              fontFamily: theme.fontFamily,
              lineHeight: '1.3'
            }}
          >
            {data.personal.title}
          </p>
        </div>
        
        <div className="space-y-3 mb-6">
          <h2 
            className="text-xs font-semibold uppercase tracking-wider opacity-70" 
            style={{ fontFamily: theme.fontFamily }}
          >
            Contact
          </h2>
          {data.personal.email && (
            <div className="text-sm break-words" style={{ wordBreak: 'break-all' }}>
              {data.personal.email}
            </div>
          )}
          {data.personal.phone && (
            <div className="text-sm">{data.personal.phone}</div>
          )}
          {data.personal.location && (
            <div className="text-sm">{data.personal.location}</div>
          )}
        </div>
        
        {displaySkills.length > 0 && (
          <div className="space-y-3">
            <h2 
              className="text-xs font-semibold uppercase tracking-wider opacity-70" 
              style={{ fontFamily: theme.fontFamily }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {displaySkills.map((skill) => (
                <span 
                  key={skill.id} 
                  className="text-xs px-2 py-1 rounded-full bg-white/20" 
                  style={{ 
                    fontFamily: theme.fontFamily,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content - Optimized for Canvas */}
      <div 
        className="p-6" 
        style={{ 
          backgroundColor: theme.background,
          willChange: 'transform' // Optimize for canvas rendering
        }}
      >
        <Header data={data.personal} theme={theme} variant={headerVariant} />
        {data.summary && <Summary data={data.summary} theme={theme} />}
        {data.experience.length > 0 && (
          <Experience data={data.experience} theme={theme} variant={experienceVariant} />
        )}
        {data.education.length > 0 && (
          <Education data={data.education} theme={theme} variant={educationVariant} />
        )}
        {data.projects && data.projects.length > 0 && (
          <Projects data={data.projects} theme={theme} variant={projectsVariant} />
        )}
        {data.certifications && data.certifications.length > 0 && (
          <Certifications data={data.certifications} theme={theme} variant={certificationsVariant} />
        )}
        {data.languages && data.languages.length > 0 && (
          <Languages data={data.languages} theme={theme} variant={languagesVariant} />
        )}
      </div>
    </div>
  );
});

SidebarLeftLayout.displayName = 'SidebarLeftLayout';

export default SidebarLeftLayout;