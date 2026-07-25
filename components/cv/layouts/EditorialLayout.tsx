// Editorial Layout - Editorial-style layout with sophisticated typography

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';
import { DUMMY_AVATAR } from '../../../data/sampleCV';

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
        gridTemplateColumns: '1fr 280px',
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
        
        
      }}
    >
      {/* Main Content */}
      <div className="p-6" style={{ backgroundColor: theme.background }}>
        <div className="border-b-2 pb-6 mb-6" style={{ borderColor: theme.primary }}>
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: theme.fontFamilyHeading, color: theme.text }}>
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <p className="text-xl" style={{ fontFamily: theme.fontFamily, color: theme.primary }}>
            {data.personal.title}
          </p>
        </div>

        {data.summary && (
          <div className="mb-8">
            <p className="text-lg leading-relaxed italic" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
              {data.summary}
            </p>
          </div>
        )}

        {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
        {data.education.length > 0 && <Education data={data.education} theme={theme} variant={educationVariant} />}
        {data.projects && data.projects.length > 0 && <Projects data={data.projects} theme={theme} variant={projectsVariant} />}
      </div>

      {/* Sidebar */}
      <div className="p-6" style={{ backgroundColor: theme.backgroundAlt }}>
        {data.personal.avatar && (
          <div className="mb-6">
            <img
              src={data.personal.avatar}
              alt={`${data.personal.firstName} ${data.personal.lastName}`}
              className="w-full rounded-lg object-cover aspect-square grayscale"
            />
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: theme.primary }}>Contact</h3>
            <div className="space-y-2 text-sm" style={{ color: theme.textSecondary }}>
              <div className="break-words">{data.personal.email}</div>
              <div>{data.personal.phone}</div>
              <div>{data.personal.location}</div>
            </div>
          </div>

          {data.skills.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: theme.primary }}>Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-xs px-2 py-1 rounded border"
                    style={{
                      borderColor: theme.primary,
                      color: theme.primary,
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: theme.primary }}>Certifications</h3>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="mb-2 text-sm">
                  <div className="font-medium">{cert.name}</div>
                  <div style={{ color: theme.textSecondary }}>{cert.issuer}</div>
                </div>
              ))}
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
      </div>
    </div>
  );
};

export default EditorialLayout;