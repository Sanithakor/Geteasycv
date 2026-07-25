// Portfolio Hybrid Layout - Combines resume with portfolio showcase

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';
import { DUMMY_AVATAR } from '../../../data/sampleCV';

export type PortfolioHybridLayoutProps = {
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

const PortfolioHybridLayout: React.FC<PortfolioHybridLayoutProps> = ({
  data,
  theme,
  headerVariant = 'centered',
  experienceVariant = 'bordered',
  skillsVariant = 'pills',
  educationVariant = 'list',
  projectsVariant = 'portfolio',
  certificationsVariant = 'list',
  languagesVariant = 'tags',
}) => {
  return (
    <div
      className="w-full"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
        
        
      }}
    >
      {/* Main Content */}
      <div className="p-6" style={{ backgroundColor: theme.background }}>
        <Header data={data.personal} theme={theme} variant={headerVariant} />
        {data.summary && <Summary data={data.summary} theme={theme} />}
        {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
        {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
      </div>

      {/* Sidebar */}
      <div className="p-6" style={{ backgroundColor: theme.backgroundAlt }}>
        {data.personal.avatar && (
          <div className="mb-6">
            <img
              src={data.personal.avatar}
              alt={`${data.personal.firstName} ${data.personal.lastName}`}
              className="w-full rounded-xl object-cover aspect-square"
            />
          </div>
        )}
        
        <div className="mb-6">
          <h3 className="font-semibold mb-3" style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}>Contact</h3>
          <div className="space-y-2 text-sm" style={{ color: theme.textSecondary }}>
            <div>{data.personal.email}</div>
            <div>{data.personal.phone}</div>
            <div>{data.personal.location}</div>
            {data.personal.website && <a href={data.personal.website} style={{ color: theme.primary }}>Website</a>}
          </div>
        </div>

        {data.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-3" style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}>Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}15, ${theme.gradient.end}15)`,
                    color: theme.primary,
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.projects && data.projects.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-3" style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}>Featured Projects</h3>
            <div className="space-y-3">
              {data.projects.slice(0, 3).map((proj) => (
                <div key={proj.id} className="p-3 rounded-lg" style={{ backgroundColor: theme.background }}>
                  <div className="font-medium text-sm">{proj.name}</div>
                  <div className="text-xs mt-1" style={{ color: theme.textSecondary }}>
                    {proj.technologies.slice(0, 2).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.certifications && data.certifications.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3" style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}>Certifications</h3>
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-sm">
                  <div className="font-medium">{cert.name}</div>
                  <div className="text-xs" style={{ color: theme.textSecondary }}>{cert.issuer}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioHybridLayout;