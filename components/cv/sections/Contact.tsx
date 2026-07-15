// Contact section component with variant support

import React from 'react';
import { Theme } from '../../../data/themes';
import { ContactVariant, getCardStyles, getShadowStyle, getGlassStyle } from '../variants/sectionVariants';
import { ContactItem } from '../../../data/sampleCV';

export type ContactProps = {
  data: ContactItem[];
  theme: Theme;
  variant?: ContactVariant;
};

const Contact: React.FC<ContactProps> = ({ data, theme, variant = 'icons' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'phone':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case 'github':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case 'website':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
    }
  };

  // Icons variant
  if (variant === 'icons') {
    return (
      <div className="w-full" style={{ marginBottom: '1rem' }}>
        <h2
          className="text-xl font-semibold mb-4"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Contact
        </h2>
        <div
          className="p-4 flex flex-wrap gap-3"
          style={{
            ...cardStyles,
            boxShadow: shadowStyle,
          }}
        >
          {data.map((item) => (
            <a
              key={item.id}
              href={item.type === 'email' ? `mailto:${item.value}` : `https://${item.value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105"
              style={{
                background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}15, ${theme.gradient.end}15)`,
                color: theme.primary,
              }}
            >
              {getIcon(item.type)}
              <span className="text-sm" style={{ fontFamily: theme.fontFamily }}>
                {item.label || item.value}
              </span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Cards variant
  if (variant === 'cards') {
    return (
      <div className="w-full" style={{ marginBottom: '1rem' }}>
        <h2
          className="text-xl font-semibold mb-4"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.primary,
          }}
        >
          Contact
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {data.map((item) => (
            <a
              key={item.id}
              href={item.type === 'email' ? `mailto:${item.value}` : `https://${item.value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 flex items-center gap-3 rounded-lg transition-all hover:scale-105"
              style={{
                ...cardStyles,
                boxShadow: shadowStyle,
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})` }}
              >
                <div className="text-white">{getIcon(item.type)}</div>
              </div>
              <div>
                <p
                  className="text-xs"
                  style={{ fontFamily: theme.fontFamily, color: theme.textMuted }}
                >
                  {item.label}
                </p>
                <p
                  className="text-sm font-medium truncate max-w-[150px]"
                  style={{ fontFamily: theme.fontFamily, color: theme.text }}
                >
                  {item.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  // List variant
  return (
    <div className="w-full" style={{ marginBottom: '1rem' }}>
      <h2
        className="text-xl font-semibold mb-4"
        style={{
          fontFamily: theme.fontFamilyHeading,
          color: theme.primary,
        }}
      >
        Contact
      </h2>
      <div
        className="p-4 space-y-2"
        style={{
          ...cardStyles,
          boxShadow: shadowStyle,
        }}
      >
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div style={{ color: theme.primary }}>{getIcon(item.type)}</div>
            <span
              className="text-sm"
              style={{ fontFamily: theme.fontFamily, color: theme.textSecondary }}
            >
              {item.label}:
            </span>
            <a
              href={item.type === 'email' ? `mailto:${item.value}` : `https://${item.value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm"
              style={{ fontFamily: theme.fontFamily, color: theme.primary }}
            >
              {item.value}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;