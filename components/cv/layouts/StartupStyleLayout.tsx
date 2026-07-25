// Startup Style Layout - Modern startup-style layout

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';
import { DUMMY_AVATAR } from '../../../data/sampleCV';

export type StartupStyleLayoutProps = {
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

const StartupStyleLayout: React.FC<StartupStyleLayoutProps> = ({
  data,
  theme,
  headerVariant = 'centered',
  experienceVariant = 'cards',
  skillsVariant = 'progress-bars',
  educationVariant = 'cards',
  projectsVariant = 'grid',
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
              className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
            />
          </div>
        )}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold mb-1" style={{ fontFamily: theme.fontFamilyHeading }}>
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <p className="text-sm opacity-90">{data.personal.title}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">Contact</h3>
            <div className="space-y-1 text-sm">
              <div>{data.personal.email}</div>
              <div>{data.personal.phone}</div>
              <div>{data.personal.location}</div>
            </div>
          </div>

          {data.skills.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">Top Skills</h3>
              <div className="space-y-2">
                {data.skills.slice(0, 5).map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/20">
                      <div
                        className="h-full rounded-full bg-white"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.languages && data.languages.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">Languages</h3>
              {data.languages.map((lang) => (
                <div key={lang.id} className="text-sm mb-1">
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
            className="p-4 mb-6 rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}10 0%, ${theme.secondary} 100%)`,
            }}
          >
            <p style={{ fontFamily: theme.fontFamily, color: theme.text }}>{data.summary}</p>
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

export default StartupStyleLayout;