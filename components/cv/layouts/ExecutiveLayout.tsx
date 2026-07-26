// Executive Layout - Sophisticated layout for senior executives

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages, Awards } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant, AwardsVariant } from '../variants/sectionVariants';
import { DUMMY_AVATAR } from '../../../data/sampleCV';

export type ExecutiveLayoutProps = {
  data: CVData;
  theme: Theme;
  headerVariant?: HeaderVariant;
  experienceVariant?: ExperienceVariant;
  skillsVariant?: SkillsVariant;
  educationVariant?: EducationVariant;
  projectsVariant?: ProjectsVariant;
  certificationsVariant?: CertificationsVariant;
  languagesVariant?: LanguagesVariant;
  awardsVariant?: AwardsVariant;
};

const ExecutiveLayout: React.FC<ExecutiveLayoutProps> = ({
  data,
  theme,
  headerVariant = 'centered',
  experienceVariant = 'bordered',
  skillsVariant = 'tags',
  educationVariant = 'list',
  projectsVariant = 'cards',
  certificationsVariant = 'list',
  languagesVariant = 'tags',
  awardsVariant = 'cards',
}) => {
  return (
    <div
      className="w-full"
      style={{
        display: 'grid',
        gridTemplateColumns: '350px 1fr',
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
              {data.personal.website && <a href={data.personal.website} style={{ color: theme.primary }}>Website</a>}
              {data.personal.linkedin && <a href={data.personal.linkedin} style={{ color: theme.primary }}>LinkedIn</a>}
            </div>
          </div>

          {data.skills.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: theme.primary }}>Core Competencies</h3>
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

          {data.education.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: theme.primary }}>Education</h3>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <div className="font-medium">{edu.institution}</div>
                  <div className="text-sm" style={{ color: theme.textSecondary }}>
                    {edu.degree} in {edu.field}
                  </div>
                  <div className="text-xs" style={{ color: theme.textMuted }}>
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
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

          {data.awards && data.awards.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: theme.primary }}>Awards</h3>
              {data.awards.map((award) => (
                <div key={award.id} className="mb-2 text-sm">
                  <div className="font-medium">{award.name}</div>
                  <div style={{ color: theme.textSecondary }}>{award.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6" style={{ backgroundColor: theme.background }}>
        <Header data={data.personal} theme={theme} variant={headerVariant} hideAvatar={true} />
        {data.summary && <Summary data={data.summary} theme={theme} variant="highlight" />}
        {data.experience.length > 0 && <Experience data={data.experience} theme={theme} variant={experienceVariant} />}
        {data.projects && data.projects.length > 0 && <Projects data={data.projects} theme={theme} variant={projectsVariant} />}
      </div>
    </div>
  );
};

export default ExecutiveLayout;