// Premium Dark Layout - Elegant dark-themed layout

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages, Awards } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';

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
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
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
              <h3 className="text-[14px] font-bold uppercase tracking-wider leading-[1.25] opacity-90 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/15 text-white"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <div>
              <h3 className="text-[14px] font-bold uppercase tracking-wider leading-[1.25] opacity-90 mb-2">Certifications</h3>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="mb-1.5">
                  <div className="text-[12px] font-bold leading-snug">{cert.name}</div>
                  <div className="text-[10.5px] opacity-80">{cert.issuer}</div>
                </div>
              ))}
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
      </div>
    </div>
  );
};

export default PremiumDarkLayout;