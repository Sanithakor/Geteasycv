// Editorial Layout - Editorial-style layout with sophisticated typography

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';

export type EditorialLayoutProps = {
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

const EditorialLayout: React.FC<EditorialLayoutProps> = ({
  data,
  theme,
  headerVariant = 'centered',
  experienceVariant = 'bordered',
  skillsVariant = 'tags',
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
        gridTemplateColumns: '1fr 260px',
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
      }}
    >
      {/* Main Content */}
      <div className="p-5" style={{ backgroundColor: theme.background }}>
        <div className="border-b-2 pb-4 mb-5" style={{ borderColor: theme.primary }}>
          <h1 className="text-[28px] font-bold leading-[1.15] mb-1" style={{ fontFamily: theme.fontFamilyHeading, color: theme.text }}>
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <p className="text-[14px] font-semibold leading-[1.25]" style={{ fontFamily: theme.fontFamily, color: theme.primary }}>
            {data.personal.title}
          </p>
        </div>

        {data.summary && (
          <div className="mb-5">
            <p className="text-[11.5px] leading-[1.45] italic" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
              {data.summary}
            </p>
          </div>
        )}

        <div className="space-y-4">
          {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
          {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
          {data.projects && data.projects.length > 0 && <Projects data={data.projects} theme={theme} variant={projectsVariant} />}
        </div>
      </div>

      {/* Sidebar */}
      <div className="p-5" style={{ backgroundColor: theme.backgroundAlt }}>
        {data.personal.avatar && (
          <div className="mb-5">
            <img
              src={data.personal.avatar}
              alt={`${data.personal.firstName} ${data.personal.lastName}`}
              className="w-full rounded-md object-cover aspect-square grayscale"
            />
          </div>
        )}

        <div className="space-y-5">
          <div>
            <h3 className="text-[14px] font-bold uppercase tracking-wider leading-[1.25] mb-2" style={{ color: theme.primary }}>Contact</h3>
            <div className="space-y-1 text-[10.5px] font-medium leading-normal" style={{ color: theme.textSecondary }}>
              <div className="break-words">{data.personal.email}</div>
              <div>{data.personal.phone}</div>
              <div>{data.personal.location}</div>
            </div>
          </div>

          {data.skills.length > 0 && (
            <div>
              <h3 className="text-[14px] font-bold uppercase tracking-wider leading-[1.25] mb-2" style={{ color: theme.primary }}>Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded border"
                    style={{
                      borderColor: `${theme.primary}30`,
                      color: theme.text,
                    }}
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

export default EditorialLayout;