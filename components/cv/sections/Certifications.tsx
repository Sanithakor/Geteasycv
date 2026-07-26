// Certifications section component with variant support & Lucide icons

import React from 'react';
import { Theme } from '../../../data/themes';
import { CertificationsVariant, getCardStyles, getShadowStyle } from '../variants/sectionVariants';
import { CertificationItem } from '../../../data/sampleCV';
import { Award, CheckCircle } from 'lucide-react';

export type CertificationsProps = {
  data: CertificationItem[];
  theme: Theme;
  variant?: CertificationsVariant;
};

const Certifications: React.FC<CertificationsProps> = ({ data, theme, variant = 'list' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

  const renderHeader = () => (
    <div className="flex items-center gap-3 mb-4">
      <Award className="w-4 h-4 shrink-0" style={{ color: theme.primary }} />
      <h2
        className="text-[14px] font-bold uppercase tracking-wider whitespace-nowrap"
        style={{ fontFamily: 'Poppins, sans-serif', color: theme.primary }}
      >
        Certifications
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: `${theme.primary}20` }} />
    </div>
  );

  if (variant === 'list') {
    return (
      <div id="cv-section-certifications" className="w-full mb-6">
        {renderHeader()}
        <div className="space-y-2">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-lg border flex flex-wrap justify-between items-center gap-4"
              style={{
                ...cardStyles,
                boxShadow: shadowStyle,
                borderColor: `${theme.primary}20`,
              }}
            >
              <div>
                <h3 className="text-[12px] font-bold" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                  {item.name}
                </h3>
                <p className="text-[10px] font-medium mt-0.5" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                  {item.issuer} <span className="opacity-50 mx-1">|</span> {item.date}
                </p>
              </div>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold px-3 py-1 rounded-sm shrink-0"
                  style={{
                    backgroundColor: `${theme.primary}15`,
                    color: theme.primary,
                  }}
                >
                  Verify
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'badges') {
    return (
      <div id="cv-section-certifications" className="w-full mb-6">
        {renderHeader()}
        <div className="flex flex-wrap gap-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="px-4 py-2.5 rounded-lg text-center"
              style={{
                background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}10, ${theme.gradient.end}10)`,
                border: `1px solid ${theme.primary}20`,
              }}
            >
              <h3 className="text-[11px] font-bold" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                {item.name}
              </h3>
              <p className="text-[9px] font-semibold uppercase tracking-wide mt-0.5" style={{ fontFamily: theme.fontFamily, color: theme.primary }}>
                {item.issuer}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Cards variant
  return (
    <div id="cv-section-certifications" className="w-full mb-6">
      {renderHeader()}
      <div className="grid grid-cols-2 gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-lg border"
            style={{
              ...cardStyles,
              boxShadow: shadowStyle,
              borderColor: `${theme.primary}20`,
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded shrink-0 flex items-center justify-center"
                style={{ background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})` }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h3 className="text-[11px] font-bold leading-tight" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                  {item.name}
                </h3>
                <p className="text-[10px] font-medium mt-0.5" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                  {item.issuer}
                </p>
                <p className="text-[9px] font-bold mt-1" style={{ fontFamily: theme.fontFamily, color: theme.primary }}>
                  {item.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;