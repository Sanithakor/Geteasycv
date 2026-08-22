// Certifications section component with variant support & Lucide icons

import React from 'react';
import { Theme } from '../../../data/themes';
import { CertificationsVariant, getCardStyles, getShadowStyle } from '../variants/sectionVariants';
import { CertificationItem } from '../../../data/sampleCV';
import { Award } from 'lucide-react';

export type CertificationsProps = {
  data: CertificationItem[];
  theme: Theme;
  variant?: CertificationsVariant;
};

const Certifications: React.FC<CertificationsProps> = ({ data, theme, variant = 'list' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

  const renderHeader = () => (
    <div className="flex items-center gap-2 mb-2">
      <Award className="w-4 h-4 shrink-0" style={{ color: theme.primary }} />
      <h2
        className="text-[16.8px] font-bold uppercase tracking-wider leading-[1.25] whitespace-nowrap"
        style={{ fontFamily: 'Roboto, sans-serif', color: theme.primary }}
      >
        Certifications
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: `${theme.primary}20` }} />
    </div>
  );

  if (variant === 'list') {
    return (
      <div id="cv-section-certifications" className="w-full mb-4">
        {renderHeader()}
        <div className="space-y-2">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-2.5 rounded-md border flex flex-wrap justify-between items-center gap-2"
              style={{
                ...cardStyles,
                boxShadow: shadowStyle,
                borderColor: `${theme.primary}20`,
              }}
            >
              <div className="min-w-0 flex-1">
                <h3 className="text-[15.6px] font-bold leading-[1.25]" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
                  {item.name}
                </h3>
                <p className="text-[13.8px] font-medium leading-[1.45] mt-0.5" style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}>
                  {item.issuer} <span className="opacity-50 mx-1">|</span> <span className="text-[12px]">{item.date}</span>
                </p>
              </div>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] font-bold px-2 py-0.5 rounded-xs shrink-0 hover:opacity-80 transition-opacity"
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

  // Badges / Fallback variant
  return (
    <div id="cv-section-certifications" className="w-full mb-4">
      {renderHeader()}
      <div className="flex flex-wrap gap-2">
        {data.map((item) => (
          <div
            key={item.id}
            className="px-3 py-1.5 rounded-md text-left"
            style={{
              background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}10, ${theme.gradient.end}10)`,
              border: `1px solid ${theme.primary}20`,
            }}
          >
            <h3 className="text-[14.4px] font-bold leading-snug" style={{ fontFamily: theme.fontFamily, color: theme.text }}>
              {item.name}
            </h3>
            <p className="text-[12px] font-semibold uppercase tracking-wider mt-0.5" style={{ fontFamily: theme.fontFamily, color: theme.primary }}>
              {item.issuer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
