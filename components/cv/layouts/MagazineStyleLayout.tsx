// Magazine Style Layout - Editorial magazine-style layout

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';

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
        gridTemplateColumns: '260px 1fr',
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
      }}
    >
      {/* Left Sidebar */}
      <div className="p-5" style={{ backgroundColor: theme.backgroundAlt }}>
        {data.personal.avatar && (
          <div className="mb-5">
            <img
              src={data.personal.avatar}
              alt={`${data.personal.firstName} ${data.personal.lastName}`}
              className="w-full rounded-md object-cover aspect-square"
              style={{ border: `3px solid ${theme.primary}` }}
            />
          </div>
        )}
        
        <div className="mb-5">
          <h3 className="text-[16.8px] font-bold uppercase tracking-wider leading-[1.25] mb-2" style={{ color: theme.primary }}>Contact</h3>
          <div className="space-y-1 text-[12.6px] font-medium leading-normal" style={{ color: theme.textSecondary }}>
            <div className="break-words">{data.personal.email}</div>
            <div>{data.personal.phone}</div>
            <div>{data.personal.location}</div>
          </div>
        </div>

        {data.skills.length > 0 && (
          <div className="mb-5">
            <h3 className="text-[16.8px] font-bold uppercase tracking-wider leading-[1.25] mb-2" style={{ color: theme.primary }}>Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-[13.2px] font-semibold px-2 py-0.5 rounded"
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
            <h3 className="text-[16.8px] font-bold uppercase tracking-wider leading-[1.25] mb-2" style={{ color: theme.primary }}>Languages</h3>
            {data.languages.map((lang) => (
              <div key={lang.id} className="text-[13.2px] font-medium leading-snug mb-1" style={{ color: theme.textSecondary }}>
                {lang.name} - {lang.proficiency}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-5" style={{ backgroundColor: theme.background }}>
        <Header data={data.personal} theme={theme} variant={headerVariant} hideAvatar={true} />
        {data.summary && <Summary data={data.summary} theme={theme} />}
        {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
        {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
        {data.projects && data.projects.length > 0 && <Projects data={data.projects} theme={theme} variant={projectsVariant} />}
        {data.certifications && data.certifications.length > 0 && <Certifications data={data.certifications} theme={theme} variant={certificationsVariant} />}
      </div>
    </div>
  );
};

export default MagazineStyleLayout;