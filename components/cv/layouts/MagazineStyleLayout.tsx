// Magazine Style Layout - Editorial magazine-style layout

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';
import { DUMMY_AVATAR } from '../../../data/sampleCV';

export type MagazineStyleLayoutProps = {
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

const MagazineStyleLayout: React.FC<MagazineStyleLayoutProps> = ({
  data,
  theme,
  headerVariant = 'banner',
  experienceVariant = 'cards',
  skillsVariant = 'tags',
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
        gridTemplateColumns: '300px 1fr',
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
        
        
      }}
    >
      {/* Left Sidebar */}
      <div className="p-6" style={{ backgroundColor: theme.backgroundAlt }}>
        {data.personal.avatar && (
          <div className="mb-6">
            <img
              src={data.personal.avatar}
              alt={`${data.personal.firstName} ${data.personal.lastName}`}
              className="w-full rounded-xl object-cover aspect-square"
              style={{ border: `4px solid ${theme.primary}` }}
            />
          </div>
        )}
        
        <div className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: theme.primary }}>Contact</h3>
          <div className="space-y-2 text-sm" style={{ color: theme.textSecondary }}>
            <div className="break-words">{data.personal.email}</div>
            <div>{data.personal.phone}</div>
            <div>{data.personal.location}</div>
          </div>
        </div>

        {data.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: theme.primary }}>Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    backgroundColor: `${theme.primary}15`,
                    color: theme.primary,
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.languages && data.languages.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: theme.primary }}>Languages</h3>
            {data.languages.map((lang) => (
              <div key={lang.id} className="text-sm mb-1" style={{ color: theme.textSecondary }}>
                {lang.name} - {lang.proficiency}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-6" style={{ backgroundColor: theme.background }}>
        <Header data={data.personal} theme={theme} variant={headerVariant} />
        {data.summary && (
          <div className="mb-6 p-6" style={{ background: `linear-gradient(135deg, ${theme.primary}10 0%, ${theme.secondary} 100%)`,  }}>
            <p className="text-lg leading-relaxed" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
              {data.summary}
            </p>
          </div>
        )}
        {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
        {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
        {data.projects && data.projects.length > 0 && <Projects data={data.projects} theme={theme} variant={projectsVariant} />}
        {data.certifications && data.certifications.length > 0 && <Certifications data={data.certifications} theme={theme} variant={certificationsVariant} />}
      </div>
    </div>
  );
};

export default MagazineStyleLayout;