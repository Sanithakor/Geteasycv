// Creative Designer Layout - Bold, creative layout for designers

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';
import { DUMMY_AVATAR } from '../../../data/sampleCV';

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
      className="w-full max-w-[1000px] mx-auto"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
        borderRadius: theme.borderRadius,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
      }}
    >
      {/* Main Content */}
      <div className="p-6" style={{ backgroundColor: theme.background }}>
        <div
          className="p-6 mb-6 rounded-xl"
          style={{
            background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})`,
            color: '#fff',
          }}
        >
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: theme.fontFamilyHeading }}>
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <p className="text-lg opacity-90">{data.personal.title}</p>
        </div>

        {data.summary && (
          <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: `${theme.primary}08` }}>
            <p style={{ fontFamily: theme.fontFamily, color: theme.text }}>{data.summary}</p>
          </div>
        )}

        {data.projects && data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4" style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}>Portfolio</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.projects.slice(0, 4).map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}15 0%, ${theme.secondary} 100%)`,
                  }}
                >
                  <h3 className="font-semibold mb-1">{proj.name}</h3>
                  <p className="text-sm mb-2" style={{ color: theme.textSecondary }}>{proj.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.slice(0, 2).map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: theme.primary, color: '#fff' }}>
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
      <div className="p-6" style={{ background: `linear-gradient(180deg, ${theme.primary} 0%, ${theme.primary}CC 100%)`, color: '#fff' }}>
        {data.personal.avatar && (
          <div className="mb-6">
            <img
              src={data.personal.avatar}
              alt={`${data.personal.firstName} ${data.personal.lastName}`}
              className="w-full rounded-xl object-cover aspect-square border-4 border-white/30"
            />
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-3">Contact</h3>
            <div className="space-y-2 text-sm">
              <div>{data.personal.email}</div>
              <div>{data.personal.phone}</div>
              <div>{data.personal.location}</div>
            </div>
          </div>

          {data.skills.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span key={skill.id} className="text-xs px-2 py-1 rounded-full bg-white/20">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-3">Certifications</h3>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-sm mb-2">
                  <div className="font-medium">{cert.name}</div>
                  <div className="opacity-70">{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}

          {data.languages && data.languages.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-3">Languages</h3>
              {data.languages.map((lang) => (
                <div key={lang.id} className="text-sm mb-1">
                  {lang.name} - {lang.proficiency}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeDesignerLayout;