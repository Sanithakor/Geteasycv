// Certifications section component with variant support

import React from 'react';
import { Theme } from '../../../data/themes';
import { CertificationsVariant, getCardStyles, getShadowStyle, getGlassStyle } from '../variants/sectionVariants';
import { CertificationItem } from '../../../data/sampleCV';

export type CertificationsProps = {
  data: CertificationItem[];
  theme: Theme;
  variant?: CertificationsVariant;
};

const Certifications: React.FC<CertificationsProps> = ({ data, theme, variant = 'list' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

  // List variant
  if (variant === 'list') {
    return (
      <div className="w-full" style={{ marginBottom: '1rem' }}>
        <h2
          className="text-xl font-semibold mb-4"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Certifications
        </h2>
        <div className="space-y-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-4 flex justify-between items-center"
              style={{
                ...cardStyles,
                boxShadow: shadowStyle,
              }}
            >
              <div>
                <h3
                  className="font-semibold"
                  style={{ fontFamily: theme.fontFamily, color: theme.text }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-sm"
                  style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
                >
                  {item.issuer} | {item.date}
                </p>
              </div>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-3 py-1 rounded"
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

  // Badges variant
  if (variant === 'badges') {
    return (
      <div className="w-full" style={{ marginBottom: '1rem' }}>
        <h2
          className="text-xl font-semibold mb-4"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Certifications
        </h2>
        <div className="flex flex-wrap gap-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="px-4 py-3 rounded-xl text-center"
              style={{
                background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}15, ${theme.gradient.end}15)`,
                border: `1px solid ${theme.primary}30`,
              }}
            >
              <h3
                className="font-semibold text-sm"
                style={{ fontFamily: theme.fontFamily, color: theme.text }}
              >
                {item.name}
              </h3>
              <p
                className="text-xs mt-1"
                style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
              >
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
    <div className="w-full" style={{ marginBottom: '1rem' }}>
      <h2
        className="text-xl font-semibold mb-4"
        style={{
          fontFamily: theme.fontFamilyHeading,
          color: theme.primary,
        }}
      >
        Certifications
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="p-4"
            style={{
              ...cardStyles,
              boxShadow: shadowStyle,
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})` }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h3
                  className="font-semibold"
                  style={{ fontFamily: theme.fontFamily, color: theme.text }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-sm"
                  style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
                >
                  {item.issuer}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ fontFamily: theme.fontFamily, color: theme.textMuted }}
                >
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