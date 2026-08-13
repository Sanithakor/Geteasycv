// Startup Style Layout - Modern startup-style layout

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages, Awards } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';

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
        gridTemplateColumns: '260px 1fr',
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
        overflow: 'hidden',
      }}
    >
      {/* Sidebar */}
      <div
        className="p-5"
        style={{
          background: `linear-gradient(180deg, ${theme.primary} 0%, ${theme.primary}CC 100%)`,
          color: '#fff',
        }}
      >
        {data.personal.avatar && (
          <div className="mb-5 flex justify-center">
            <img
              src={data.personal.avatar}
              alt={`${data.personal.firstName} ${data.personal.lastName}`}
              className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
            />
          </div>
        )}
        <div className="text-center mb-5">
          <h1 className="text-[28px] font-bold leading-[1.15] mb-1" style={{ fontFamily: theme.fontFamilyHeading }}>
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <p className="text-[14px] font-semibold leading-[1.25] opacity-90">{data.personal.title}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-[14px] font-bold uppercase tracking-wider leading-[1.25] opacity-90 mb-2">Contact</h3>
            <div className="space-y-1 text-[10.5px] font-medium leading-normal opacity-90">
              <div className="break-words">{data.personal.email}</div>
              <div>{data.personal.phone}</div>
              <div>{data.personal.location}</div>
            </div>
          </div>

          {data.skills.length > 0 && (
            <div>
              <h3 className="text-[14px] font-bold uppercase tracking-wider leading-[1.25] opacity-90 mb-2">Top Skills</h3>
              <div className="space-y-2">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-[11px] font-semibold mb-0.5">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full h-1 rounded-full bg-white/20">
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
        </div>
      </div>

      {/* Main Content */}
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
};

export default StartupStyleLayout;