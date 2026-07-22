// Header section component with variant support

import React from 'react';
import { Theme } from '../../../data/themes';
import { HeaderVariant, getCardStyles, getShadowStyle, getGlassStyle, getGradientText } from '../variants/sectionVariants';
import { DUMMY_AVATAR } from '../../../data/sampleCV';

export type HeaderProps = {
  data: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    avatar?: string;
  };
  theme: Theme;
  variant?: HeaderVariant;
};

const Header: React.FC<HeaderProps> = ({ data, theme, variant = 'centered' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);
  const avatar = data.avatar || DUMMY_AVATAR;

  // Centered variant
  if (variant === 'centered') {
    return (
      <div
        className="w-full p-8 text-center"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}10 0%, ${theme.secondary} 100%)`,
          borderRadius: theme.borderRadius,
          marginBottom: '0.5rem',
        }}
      >
        {avatar && (
          <div className="mb-1 flex justify-center">
            <img
              src={avatar}
              alt={`${data.firstName} ${data.lastName}`}
              className="w-24 h-24 rounded-full object-cover border-4"
              style={{
                borderColor: theme.primary,
                boxShadow: shadowStyle,
              }}
            />
          </div>
        )}
        <h1
          className="text-3xl font-bold mb-1"
          style={{
            fontFamily: theme.fontFamilyHeading,
            color: theme.text,
          }}
        >
          {data.firstName} <span style={{ color: theme.primary }}>{data.lastName}</span>
        </h1>
        <p
          className="text-xl mb-1"
          style={{
            fontFamily: theme.fontFamily,
            color: theme.textSecondary,
          }}
        >
          {data.title}
        </p>
        <div
          className="flex flex-wrap justify-center gap-4 text-sm"
          style={{ color: theme.textSecondary }}
        >
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="hover:opacity-80 transition-opacity"
              style={{ color: theme.primary }}
            >
              {data.email}
            </a>
          )}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
        {(data.website || data.linkedin) && (
          <div className="flex justify-center gap-4 mt-4">
            {data.website && (
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-2 rounded-full transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})`,
                  color: '#fff',
                }}
              >
                Website
              </a>
            )}
            {data.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-2 rounded-full transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})`,
                  color: '#fff',
                }}
              >
                LinkedIn
              </a>
            )}
          </div>
        )}
      </div>
    );
  }

  // Split variant
  if (variant === 'split') {
    return (
      <div
        className="cv-block w-full p-4"
        style={{
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primary}CC 100%)`,
          borderRadius: theme.borderRadius,
          marginBottom: '0.5rem',
        }}
      >
        <div className="flex items-center gap-4">
          {avatar && (
            <img
              src={avatar}
              alt={`${data.firstName} ${data.lastName}`}
              className="w-20 h-20 rounded-full object-cover border-4 border-white"
            />
          )}
          <div className="flex-1">
            <h1
              className="text-2xl font-bold text-white"
              style={{ fontFamily: theme.fontFamilyHeading }}
            >
              {data.firstName} {data.lastName}
            </h1>
            <p className="text-white/90 text-lg">{data.title}</p>
          </div>
          <div className="text-right text-white/90 text-sm space-y-1">
            {data.email && <div>{data.email}</div>}
            {data.phone && <div>{data.phone}</div>}
            {data.location && <div>{data.location}</div>}
          </div>
        </div>
        {(data.website || data.linkedin) && (
          <div className="flex gap-3 mt-4 pt-4 border-t border-white/20">
            {data.website && (
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                Website
              </a>
            )}
            {data.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            )}
          </div>
        )}
      </div>
    );
  }

  // Banner variant
  if (variant === 'banner') {
    return (
      <div
        className="w-full relative overflow-hidden"
        style={{
          background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})`,
          borderRadius: theme.borderRadius,
          marginBottom: '0.5rem',
          padding: '3rem 2rem',
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative flex flex-col items-center text-center text-white">
          {avatar && (
            <img
              src={avatar}
              alt={`${data.firstName} ${data.lastName}`}
              className="w-28 h-28 rounded-full object-cover border-4 border-white mb-1 shadow-lg"
            />
          )}
          <h1
            className="text-4xl font-bold mb-1"
            style={{ fontFamily: theme.fontFamilyHeading }}
          >
            {data.firstName} {data.lastName}
          </h1>
          <p className="text-xl opacity-90 mb-1">{data.title}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm opacity-80">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.location && <span>{data.location}</span>}
          </div>
        </div>
      </div>
    );
  }

  // Minimal variant
  return (
    <div className="cv-block w-full p-4 border-b-2" style={{ borderColor: theme.primary, marginBottom: '0.5rem' }}>
      <div className="flex justify-between items-center">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{
              fontFamily: theme.fontFamilyHeading,
              color: theme.text,
            }}
          >
            {data.firstName} {data.lastName}
          </h1>
          <p
            className="text-lg"
            style={{
              fontFamily: theme.fontFamily,
              color: theme.primary,
            }}
          >
            {data.title}
          </p>
        </div>
        <div className="text-right text-sm" style={{ color: theme.textSecondary }}>
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.location && <div>{data.location}</div>}
        </div>
      </div>
    </div>
  );
};

export default Header;