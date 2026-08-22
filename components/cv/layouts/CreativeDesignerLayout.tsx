// Creative Designer Layout - Bold, creative layout for designers

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';

export type CreativeDesignerLayoutProps = {
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

const CreativeDesignerLayout: React.FC<CreativeDesignerLayoutProps> = ({
  data,
  theme,
  headerVariant = 'banner',
  experienceVariant = 'cards',
  skillsVariant = 'pills',
  educationVariant = 'cards',
  projectsVariant = 'portfolio',
  certificationsVariant = 'badges',
  languagesVariant = 'tags',
}) => {
  return (
    <div
      className="w-full"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 280px',
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
        overflow: 'hidden',
      }}
    >
      {/* Main Content */}
      <div className="p-5" style={{ backgroundColor: theme.background }}>
        <div
          className="p-5 mb-5 rounded-md"
          style={{
            background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})`,
            color: '#fff',
          }}
        >
          <h1 className="text-[33.6px] font-bold leading-[1.15] mb-1" style={{ fontFamily: theme.fontFamilyHeading }}>
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <p className="text-[16.8px] font-semibold leading-[1.25] opacity-90">{data.personal.title}</p>
        </div>

        {data.summary && (
          <div className="mb-5 p-3.5 rounded-md" style={{ backgroundColor: `${theme.primary}08` }}>
            <p className="text-[13.8px] leading-[1.45]" style={{ fontFamily: theme.fontFamily, color: theme.text }}>{data.summary}</p>
          </div>
        )}

        {data.projects && data.projects.length > 0 && (
          <div className="mb-5">
            <h2 className="text-[16.8px] font-bold uppercase tracking-wider leading-[1.25] mb-3" style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}>Portfolio</h2>
            <div className="grid grid-cols-2 gap-3">
              {data.projects.slice(0, 4).map((proj) => (
                <div
                  key={proj.id}
                  className="p-3 rounded-md"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}15 0%, ${theme.secondary} 100%)`,
                  }}
                >
                  <h3 className="text-[15.6px] font-bold leading-[1.25] mb-1">{proj.name}</h3>
                  <p className="text-[13.8px] leading-[1.45] mb-2" style={{ color: theme.textSecondary }}>{proj.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.slice(0, 2).map((tech, i) => (
                      <span key={i} className="text-[12px] font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: theme.primary, color: '#fff' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
        {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
      </div>

      {/* Sidebar */}
      <div className="p-5" style={{ background: `linear-gradient(180deg, ${theme.primary} 0%, ${theme.primary}CC 100%)`, color: '#fff' }}>
        <div className="space-y-4">
          <div>
            <h3 className="text-[16.8px] font-bold uppercase tracking-wider leading-[1.25] mb-2 text-white/90">Contact</h3>
            <div className="space-y-1 text-[12.6px] font-medium leading-normal text-white/90">
              <div>{data.personal.email}</div>
              <div>{data.personal.phone}</div>
              <div>{data.personal.location}</div>
            </div>
          </div>

          {data.skills.length > 0 && (
            <div>
              <h3 className="text-[16.8px] font-bold uppercase tracking-wider leading-[1.25] mb-2 text-white/90">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-[13.2px] font-semibold px-2 py-0.5 rounded bg-white/15 text-white"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeDesignerLayout;