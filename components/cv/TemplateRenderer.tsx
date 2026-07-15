// Template Renderer - Dynamically renders templates based on configuration

import React from 'react';
import { CVData } from '../../data/sampleCV';
import { GeneratedTemplate } from '../../lib/generateTemplates';
import {
  SingleColumnATSLayout,
  SidebarLeftLayout,
  SidebarRightLayout,
  TwoColumnSplitLayout,
  TimelineLayout,
  BentoGridLayout,
  DashboardStyleLayout,
  PortfolioHybridLayout,
  MagazineStyleLayout,
  LuxuryMinimalLayout,
  GlassmorphismLayout,
  GradientAccentLayout,
  CompactATSLayout,
  CreativeDesignerLayout,
  ExecutiveLayout,
  ModernCardLayout,
  CenteredLayout,
  EditorialLayout,
  StartupStyleLayout,
  PremiumDarkLayout,
} from './layouts';
import {
  HeaderVariant,
  ExperienceVariant,
  SkillsVariant,
  ProjectsVariant,
  EducationVariant,
  CertificationsVariant,
  LanguagesVariant,
  ContactVariant,
  AwardsVariant,
} from './variants/sectionVariants';

export type TemplateRendererProps = {
  template: GeneratedTemplate;
  data: CVData;
  scale?: number;
};

const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  template,
  data,
  scale = 1,
}) => {
  const { layout, theme, sectionVariants } = template;

  // Render the appropriate layout based on layout ID
  const renderLayout = () => {
    switch (layout.id) {
      case 'single-column-ats':
        return (
          <SingleColumnATSLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );

      case 'sidebar-left':
        return (
          <SidebarLeftLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
            contactVariant={sectionVariants.contactVariant as ContactVariant}
          />
        );

      case 'sidebar-right':
        return (
          <SidebarRightLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
            contactVariant={sectionVariants.contactVariant as ContactVariant}
          />
        );

      case 'two-column-split':
        return (
          <TwoColumnSplitLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );

      case 'timeline':
        return (
          <TimelineLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );

      case 'bento-grid':
        return (
          <BentoGridLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );

      case 'dashboard':
        return (
          <DashboardStyleLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );

      case 'portfolio-hybrid':
        return (
          <PortfolioHybridLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );

      case 'magazine':
        return (
          <MagazineStyleLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );

      case 'luxury-minimal':
        return (
          <LuxuryMinimalLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );

      case 'glassmorphism':
        return (
          <GlassmorphismLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );

      case 'gradient-accent':
        return (
          <GradientAccentLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );

      case 'compact-ats':
        return (
          <CompactATSLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );

      case 'creative-designer':
        return (
          <CreativeDesignerLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );

      case 'executive':
        return (
          <ExecutiveLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
            awardsVariant={sectionVariants.awardsVariant as AwardsVariant}
          />
        );

      case 'modern-card':
        return (
          <ModernCardLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );

      case 'centered':
        return (
          <CenteredLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );

      case 'editorial':
        return (
          <EditorialLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );

      case 'startup-style':
        return (
          <StartupStyleLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );

      case 'premium-dark':
        return (
          <PremiumDarkLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );

      default:
        return (
          <SingleColumnATSLayout
            data={data}
            theme={theme}
            headerVariant={sectionVariants.headerVariant as HeaderVariant}
            experienceVariant={sectionVariants.experienceVariant as ExperienceVariant}
            skillsVariant={sectionVariants.skillsVariant as SkillsVariant}
            educationVariant={sectionVariants.educationVariant as EducationVariant}
            projectsVariant={sectionVariants.projectsVariant as ProjectsVariant}
            certificationsVariant={sectionVariants.certificationsVariant as CertificationsVariant}
            languagesVariant={sectionVariants.languagesVariant as LanguagesVariant}
          />
        );
    }
  };

  return (
    <div
      className="template-renderer"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        width: '100%',
        minHeight: `${100 / scale}px`,
      }}
    >
      {renderLayout()}
    </div>
  );
};

export default TemplateRenderer;