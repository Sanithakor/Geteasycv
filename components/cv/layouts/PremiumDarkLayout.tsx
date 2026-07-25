// Premium Dark Layout - Elegant dark-themed layout

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';
import { DUMMY_AVATAR } from '../../../data/sampleCV';

export type PremiumDarkLayoutProps = {
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

const PremiumDarkLayout: React.FC<PremiumDarkLayoutProps> = ({
  data,
  theme,
  headerVariant = 'centered',
  experienceVariant = 'cards',
  skillsVariant = 'tags',
  educationVariant = 'cards',
  projectsVariant = 'cards',
  certificationsVariant = 'badges',
  languagesVariant = 'tags',
}) => {
  return (
    <div
      className="w-full"
      style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
        
        
        overflow: 'hidden',
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
        {data.personal.avatar && (
          <div className="mb-6 flex justify-center">
            <img
              src={data.personal.avatar}
              alt={`${data.personal.firstName} ${data.personal.lastName}`}
              className="w-28 h-28 rounded-full object-cover border-4 border-white/20"
            />
          </div>
        )}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold mb-1" style={{ fontFamily: theme.fontFamilyHeading }}>
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <p className="text-sm opacity-80">{data.personal.title}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-2">Contact</h3>
            <div className="space-y-1 text-sm opacity-90">
              <div className="break-words">{data.personal.email}</div>
              <div>{data.personal.phone}</div>
              <div>{data.personal.location}</div>
            </div>
          </div>

          {data.skills.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-xs px-2 py-1 rounded-full bg-white/10"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-2">Certifications</h3>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-sm opacity-90 mb-2">
                  <div className="font-medium">{cert.name}</div>
                  <div className="text-xs opacity-70">{cert.issuer}</div>
                </div>
              ))}
            </div>
          )}

          {data.languages && data.languages.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-2">Languages</h3>
              {data.languages.map((lang) => (
                <div key={lang.id} className="text-sm opacity-90 mb-1">
                  {lang.name} - {lang.proficiency}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6" style={{ backgroundColor: theme.background }}>
        {data.summary && (
          <div
            className="p-5 mb-6 rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}20 0%, ${theme.primary}05 100%)`,
              borderLeft: `4px solid ${theme.primary}`,
            }}
          >
            <p style={{ fontFamily: theme.fontFamily, color: theme.text }}>{data.summary}</p>
          </div>
        )}

        {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
        {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
        {data.projects && data.projects.length > 0 && <Projects data={data.projects} theme={theme} variant={projectsVariant} />}
      </div>
    </div>
  );
};

export default PremiumDarkLayout;