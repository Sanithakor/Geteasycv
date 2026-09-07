'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ResumeExample } from '@/data/resumeExamplesData';
import {
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  BookOpen,
  Link2,
  Languages as LanguagesIcon,
  CheckCircle2,
} from 'lucide-react';

interface FullResumeDocumentViewProps {
  example: ResumeExample;
}

export default function FullResumeDocumentView({ example }: FullResumeDocumentViewProps) {
  const [copied, setCopied] = useState(false);
  const fullResume = example.fullResumeData;

  const handleCopyText = async () => {
    if (!fullResume) return;

    let text = `${fullResume.contact.fullName}\n${fullResume.contact.title}\n`;
    text += `${fullResume.contact.email} | ${fullResume.contact.phone} | ${fullResume.contact.location}\n`;
    if (fullResume.contact.linkedin) text += `LinkedIn: ${fullResume.contact.linkedin}\n`;
    if (fullResume.contact.github) text += `GitHub: ${fullResume.contact.github}\n`;
    if (fullResume.contact.portfolio) text += `Portfolio: ${fullResume.contact.portfolio}\n`;
    text += `\n=========================================\n`;
    text += `PROFESSIONAL SUMMARY\n=========================================\n${fullResume.summary}\n\n`;

    if (fullResume.skillsGrouped && fullResume.skillsGrouped.length > 0) {
      text += `=========================================\nCORE COMPETENCIES & TECHNICAL SKILLS\n=========================================\n`;
      fullResume.skillsGrouped.forEach((g) => {
        text += `${g.category}: ${g.skills.join(', ')}\n`;
      });
      text += `\n`;
    }

    if (fullResume.workExperience && fullResume.workExperience.length > 0) {
      text += `=========================================\nPROFESSIONAL EXPERIENCE\n=========================================\n`;
      fullResume.workExperience.forEach((exp) => {
        text += `${exp.role} | ${exp.company} (${exp.location})\n${exp.period}\n`;
        exp.bullets.forEach((b) => {
          text += `• ${b}\n`;
        });
        text += `\n`;
      });
    }

    if (fullResume.education && fullResume.education.length > 0) {
      text += `=========================================\nEDUCATION\n=========================================\n`;
      fullResume.education.forEach((edu) => {
        text += `${edu.degree}\n${edu.school} — ${edu.location} (${edu.year})\n`;
        if (edu.details && edu.details.length > 0) {
          edu.details.forEach((d) => {
            text += `• ${d}\n`;
          });
        }
        text += `\n`;
      });
    }

    if (fullResume.projects && fullResume.projects.length > 0) {
      text += `=========================================\nKEY PROJECTS\n=========================================\n`;
      fullResume.projects.forEach((proj) => {
        text += `${proj.title} — ${proj.subtitle}\n`;
        if (proj.technologies) text += `Technologies: ${proj.technologies.join(', ')}\n`;
        text += `${proj.description}\nImpact: ${proj.impact}\n\n`;
      });
    }

    if (fullResume.certifications && fullResume.certifications.length > 0) {
      text += `=========================================\nCERTIFICATIONS & LICENSES\n=========================================\n`;
      fullResume.certifications.forEach((c) => {
        text += `• ${c.name} — ${c.issuer} (${c.year})${c.credentialId ? ` [ID: ${c.credentialId}]` : ''}\n`;
      });
      text += `\n`;
    }

    if (fullResume.awards && fullResume.awards.length > 0) {
      text += `=========================================\nHONORS & AWARDS\n=========================================\n`;
      fullResume.awards.forEach((a) => {
        text += `• ${a.title} — ${a.issuer} (${a.year}): ${a.description}\n`;
      });
      text += `\n`;
    }

    if (fullResume.languages && fullResume.languages.length > 0) {
      text += `=========================================\nLANGUAGES\n=========================================\n`;
      text += fullResume.languages.map((l) => `${l.language} (${l.proficiency})`).join(' | ') + `\n`;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (!fullResume) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div
        className="rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border"
        style={{
          background: '#FFFFFF',
          borderColor: 'rgba(17, 17, 17, 0.08)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0"
            style={{ background: '#FFE0CF', color: '#111111' }}
          >
            A4
          </div>
          <div>
            <div className="text-sm font-bold text-[#111111] flex items-center gap-2">
              <span>Interactive ATS Resume Sample</span>
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: '#C9AFE8', color: '#111111' }}
              >
                100% Recruiter Approved
              </span>
            </div>
            <p className="text-xs text-[#666666]">
              Copy the plain text version or customize directly in the live builder.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-2xs cursor-pointer border"
            style={{
              background: copied ? '#B5C3F7' : '#FFFFFF',
              color: '#111111',
              borderColor: 'rgba(17, 17, 17, 0.15)',
            }}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#111111]" />
                <span>Copy Raw Resume Text</span>
              </>
            )}
          </button>

          <Link
            href={`/builder?template=${example.recommendedTemplateId || 'sidebar-left-minimal-gray'}&role=${encodeURIComponent(example.roleTitle)}`}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
            style={{ background: '#FF5F5F' }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Customize This Resume</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </Link>
        </div>
      </div>

      {/* Document Sheet (Visual A4 Resume) */}
      <div
        className="rounded-3xl border shadow-lg overflow-hidden transition-all"
        style={{
          background: '#FFFFFF',
          borderColor: 'rgba(17, 17, 17, 0.12)',
        }}
      >
        {/* Top Accent Strip */}
        <div
          className="h-2 w-full"
          style={{
            background: 'linear-gradient(90deg, #FF5F5F 0%, #C9AFE8 50%, #B5C3F7 100%)',
          }}
        />

        <div className="p-6 sm:p-12 space-y-8 max-w-4xl mx-auto">
          {/* Resume Header */}
          <header className="border-b pb-6 space-y-3" style={{ borderColor: 'rgba(17, 17, 17, 0.1)' }}>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
                  {fullResume.contact.fullName}
                </h1>
                <p className="text-base sm:text-lg font-bold mt-1" style={{ color: '#FF5F5F' }}>
                  {fullResume.contact.title}
                </p>
              </div>
              <div className="text-xs text-[#555555] font-medium flex sm:text-right flex-col sm:items-end gap-1">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#888888]" />
                  {fullResume.contact.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#888888]" />
                  {fullResume.contact.email}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#888888]" />
                  {fullResume.contact.phone}
                </span>
              </div>
            </div>

            {/* Social / Portfolio links */}
            {(fullResume.contact.linkedin || fullResume.contact.github || fullResume.contact.portfolio) && (
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-[#444444]">
                {fullResume.contact.linkedin && (
                  <span className="inline-flex items-center gap-1 bg-[#F8F8F6] px-2.5 py-1 rounded-md border border-black/5">
                    <Link2 className="w-3 h-3 text-[#0077b5]" />
                    {fullResume.contact.linkedin}
                  </span>
                )}
                {fullResume.contact.github && (
                  <span className="inline-flex items-center gap-1 bg-[#F8F8F6] px-2.5 py-1 rounded-md border border-black/5">
                    <Code2 className="w-3 h-3 text-[#111111]" />
                    {fullResume.contact.github}
                  </span>
                )}
                {fullResume.contact.portfolio && (
                  <span className="inline-flex items-center gap-1 bg-[#F8F8F6] px-2.5 py-1 rounded-md border border-black/5">
                    <Globe className="w-3 h-3 text-[#FF5F5F]" />
                    {fullResume.contact.portfolio}
                  </span>
                )}
              </div>
            )}
          </header>

          {/* Section: Professional Summary */}
          <section className="space-y-2.5">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#111111] pb-1 border-b border-black/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: '#FF5F5F' }} />
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#333333] font-normal">
              {fullResume.summary}
            </p>
          </section>

          {/* Section: Core Competencies & Skills */}
          {fullResume.skillsGrouped && fullResume.skillsGrouped.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#111111] pb-1 border-b border-black/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: '#B5C3F7' }} />
                Skills & Technical Expertise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fullResume.skillsGrouped.map((grp, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border bg-[#F8F8F6]/70"
                    style={{ borderColor: 'rgba(17, 17, 17, 0.06)' }}
                  >
                    <div className="text-xs font-bold text-[#111111] mb-1.5 flex items-center gap-1.5">
                      <Code2 className="w-3 h-3 text-[#555555]" />
                      <span>{grp.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {grp.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-white text-[#222222] border border-black/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Work Experience */}
          {fullResume.workExperience && fullResume.workExperience.length > 0 && (
            <section className="space-y-5">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#111111] pb-1 border-b border-black/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: '#C9AFE8' }} />
                Work Experience
              </h2>
              <div className="space-y-5">
                {fullResume.workExperience.map((exp, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h3 className="text-sm font-extrabold text-[#111111]">{exp.role}</h3>
                        <p className="text-xs font-semibold text-[#555555]">
                          {exp.company} &bull; <span className="text-[#777777] font-normal">{exp.location}</span>
                        </p>
                      </div>
                      <span
                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-full self-start sm:self-center"
                        style={{ background: '#FFE0CF', color: '#111111' }}
                      >
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-1.5 pl-3 list-disc text-xs sm:text-[13px] text-[#333333] leading-relaxed marker:text-[#FF5F5F]">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Projects (if present) */}
          {fullResume.projects && fullResume.projects.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#111111] pb-1 border-b border-black/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: '#FF5F5F' }} />
                Key Projects & Impact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {fullResume.projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border space-y-2 bg-[#F8F8F6]/50"
                    style={{ borderColor: 'rgba(17, 17, 17, 0.08)' }}
                  >
                    <div>
                      <div className="text-xs font-bold text-[#111111]">{proj.title}</div>
                      <div className="text-[11px] text-[#666666] font-medium">{proj.subtitle}</div>
                    </div>
                    {proj.technologies && (
                      <div className="flex flex-wrap gap-1">
                        {proj.technologies.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white text-[#444444] border border-black/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-[11px] sm:text-xs text-[#444444] leading-relaxed">
                      {proj.description}
                    </p>
                    <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                      <strong>Impact:</strong> {proj.impact}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Education & Certifications (Two-Column Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Education */}
            {fullResume.education && fullResume.education.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#111111] pb-1 border-b border-black/10 flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-[#111111]" />
                  Education
                </h2>
                <div className="space-y-3">
                  {fullResume.education.map((edu, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-xs font-bold text-[#111111]">{edu.degree}</div>
                      <div className="text-xs text-[#555555] font-medium">
                        {edu.school}, {edu.location}
                      </div>
                      <div className="text-[11px] text-[#888888]">{edu.year}</div>
                      {edu.details && (
                        <ul className="list-disc pl-3 text-[11px] text-[#444444] space-y-0.5 marker:text-[#888888]">
                          {edu.details.map((d, dIdx) => (
                            <li key={dIdx}>{d}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications / Awards */}
            {(fullResume.certifications || fullResume.awards) && (
              <section className="space-y-3">
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#111111] pb-1 border-b border-black/10 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#111111]" />
                  Certifications & Honors
                </h2>
                <div className="space-y-2.5">
                  {fullResume.certifications?.map((c, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="font-bold text-[#111111] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{c.name}</span>
                      </div>
                      <div className="text-[11px] text-[#666666] pl-4.5">
                        {c.issuer} &bull; {c.year} {c.credentialId ? `(ID: ${c.credentialId})` : ''}
                      </div>
                    </div>
                  ))}
                  {fullResume.awards?.map((a, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="font-bold text-[#111111]">{a.title}</div>
                      <div className="text-[11px] text-[#666666]">
                        {a.issuer} &bull; {a.year} — {a.description}
                      </div>
                    </div>
                  ))}
                  {fullResume.languages && (
                    <div className="pt-2 border-t border-black/5">
                      <div className="text-[11px] font-bold text-[#111111] uppercase tracking-wider mb-1">
                        Languages
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-[#444444]">
                        {fullResume.languages.map((l, lIdx) => (
                          <span key={lIdx} className="bg-[#F8F8F6] px-2 py-0.5 rounded text-[11px] border border-black/5">
                            <strong>{l.language}</strong> ({l.proficiency})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
