// Bento Grid Layout - Modern bento-style grid layout

import React from 'react';
import { Theme } from '../../../data/themes';
import { CVData } from '../../../data/sampleCV';
import { Header, Summary, Experience, Skills, Education, Projects, Certifications, Languages } from '../sections';
import { HeaderVariant, ExperienceVariant, SkillsVariant, EducationVariant, ProjectsVariant, CertificationsVariant, LanguagesVariant } from '../variants/sectionVariants';
import { DUMMY_AVATAR } from '../../../data/sampleCV';

export type BentoGridLayoutProps = {
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

const BentoGridLayout: React.FC<BentoGridLayoutProps> = ({
  data,
  theme,
  headerVariant = 'centered',
  experienceVariant = 'cards',
  skillsVariant = 'circles',
  educationVariant = 'cards',
  projectsVariant = 'grid',
  certificationsVariant = 'badges',
  languagesVariant = 'tags',
}) => {
  return (
    <div
      className="w-full max-w-[1000px] mx-auto p-6"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'auto auto auto auto',
        gap: '1rem',
        backgroundColor: theme.background,
        fontFamily: theme.fontFamily,
        color: theme.text,
        borderRadius: theme.borderRadius,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Header Card - Spans 2 columns */}
      <div
        className="col-span-2 p-6"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}10 0%, ${theme.secondary} 100%)`,
          borderRadius: theme.borderRadius,
          gridColumn: 'span 2',
        }}
      >
        <div className="flex items-center gap-4">
          {data.personal.avatar && (
            <img
              src={data.personal.avatar}
              alt={`${data.personal.firstName} ${data.personal.lastName}`}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: theme.fontFamilyHeading, color: theme.text }}>
              {data.personal.firstName} {data.personal.lastName}
            </h1>
            <p style={{ color: theme.primary }}>{data.personal.title}</p>
          </div>
        </div>
      </div>

      {/* Contact Card */}
      <div
        className="p-4"
        style={{
          backgroundColor: theme.background,
          border: `1px solid ${theme.border}`,
          borderRadius: theme.borderRadius,
        }}
      >
        <h3 className="font-semibold mb-2" style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}>Contact</h3>
        <div className="space-y-1 text-sm" style={{ color: theme.textSecondary }}>
          <div>{data.personal.email}</div>
          <div>{data.personal.phone}</div>
          <div>{data.personal.location}</div>
        </div>
      </div>

      {/* Summary Card - Spans 2 columns */}
      {data.summary && (
        <div
          className="col-span-2 p-4"
          style={{
            backgroundColor: theme.background,
            border: `1px solid ${theme.border}`,
            borderRadius: theme.borderRadius,
            gridColumn: 'span 2',
          }}
        >
          <h3 className="font-semibold mb-2" style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}>Summary</h3>
          <p className="text-sm" style={{ color: theme.textSecondary }}>{data.summary}</p>
        </div>
      )}

      {/* Skills Card */}
      {data.skills.length > 0 && (
        <div
          className="p-4"
          style={{
            backgroundColor: theme.background,
            border: `1px solid ${theme.border}`,
            borderRadius: theme.borderRadius,
          }}
        >
          <h3 className="font-semibold mb-2" style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}>Skills</h3>
          <div className="flex flex-wrap gap-1">
            {data.skills.slice(0, 8).map((skill) => (
              <span
                key={skill.id}
                className="text-xs px-2 py-0.5 rounded"
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

      {/* Experience Card - Spans 2 columns */}
      {data.experience.length > 0 && (
        <div
          className="col-span-2 p-4"
          style={{
            backgroundColor: theme.background,
            border: `1px solid ${theme.border}`,
            borderRadius: theme.borderRadius,
            gridColumn: 'span 2',
          }}
        >
          <h3 className="font-semibold mb-3" style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}>Experience</h3>
          <div className="space-y-3">
            {data.experience.slice(0, 2).map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <span className="font-medium">{exp.position}</span>
                  <span className="text-sm" style={{ color: theme.textSecondary }}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-sm" style={{ color: theme.primary }}>{exp.company}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Card */}
      {data.education.length > 0 && (
        <div
          className="p-4"
          style={{
            backgroundColor: theme.background,
            border: `1px solid ${theme.border}`,
            borderRadius: theme.borderRadius,
          }}
        >
          <h3 className="font-semibold mb-2" style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}>Education</h3>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="font-medium">{edu.institution}</div>
              <div className="text-sm" style={{ color: theme.textSecondary }}>
                {edu.degree} in {edu.field}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects Card - Spans 2 columns */}
      {data.projects && data.projects.length > 0 && (
        <div
          className="col-span-2 p-4"
          style={{
            backgroundColor: theme.background,
            border: `1px solid ${theme.border}`,
            borderRadius: theme.borderRadius,
            gridColumn: 'span 2',
          }}
        >
          <h3 className="font-semibold mb-2" style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}>Projects</h3>
          <div className="grid grid-cols-2 gap-2">
            {data.projects.slice(0, 4).map((proj) => (
              <div key={proj.id} className="p-2 rounded" style={{ backgroundColor: `${theme.primary}08` }}>
                <div className="font-medium text-sm">{proj.name}</div>
                <div className="text-xs" style={{ color: theme.textSecondary }}>{proj.technologies.slice(0, 3).join(', ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Card */}
      {data.certifications && data.certifications.length > 0 && (
        <div
          className="p-4"
          style={{
            backgroundColor: theme.background,
            border: `1px solid ${theme.border}`,
            borderRadius: theme.borderRadius,
          }}
        >
          <h3 className="font-semibold mb-2" style={{ fontFamily: theme.fontFamilyHeading, color: theme.primary }}>Certifications</h3>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="text-sm mb-1">
              <div className="font-medium">{cert.name}</div>
              <div className="text-xs" style={{ color: theme.textSecondary }}>{cert.issuer}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BentoGridLayout;