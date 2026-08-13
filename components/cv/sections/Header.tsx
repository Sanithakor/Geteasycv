// Header section component with variant support & Lucide icons

import React from 'react';
import { Theme } from '../../../data/themes';
import { HeaderVariant, getCardStyles, getShadowStyle, getGlassStyle, getGradientText } from '../variants/sectionVariants';
import { DUMMY_AVATAR } from '../../../data/sampleCV';
import { Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

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
  hideAvatar?: boolean;
};

const Header: React.FC<HeaderProps> = ({ data, theme, variant = 'centered', hideAvatar = false }) => {
  const avatar = data.avatar || DUMMY_AVATAR;

  const renderContactBar = (justifyClass = 'justify-center') => (
    <div
      className={`flex flex-wrap ${justifyClass} items-center gap-x-2.5 gap-y-1 mt-1.5 text-[10.5px] font-medium leading-normal`}
      style={{ color: theme.textSecondary, fontFamily: 'Roboto, sans-serif' }}
    >
      {data.email && (
        <a href={`mailto:${data.email}`} className="hover:opacity-80 transition-opacity flex items-center gap-1">
          <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
          <span>{data.email}</span>
        </a>
      )}
      {data.phone && (
        <span className="flex items-center gap-1">
          <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
          <span>{data.phone}</span>
        </span>
      )}
      {data.location && (
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
          <span>{data.location}</span>
        </span>
      )}
      {data.website && (
        <a href={data.website} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity flex items-center gap-1">
          <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
          <span>{data.website.replace(/^https?:\/\//, '')}</span>
        </a>
      )}
      {data.linkedin && (
        <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity flex items-center gap-1">
          <Link2 className="w-3.5 h-3.5 shrink-0" />
          <span>{data.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'linkedin.com/in/')}</span>
        </a>
      )}
    </div>
  );

  if (variant === 'centered') {
    return (
      <div id="cv-section-personal" className="w-full text-center pb-4">
        {!hideAvatar && avatar && (
          <div className="mb-2.5 flex justify-center">
            <img
              src={avatar}
              alt={`${data.firstName} ${data.lastName}`}
              onError={(e) => { (e.target as HTMLImageElement).src = DUMMY_AVATAR; }}
              className="w-16 h-16 rounded-full object-cover shadow-sm border-2"
              style={{ borderColor: theme.primary }}
            />
          </div>
        )}
        <h1
          className="text-[28px] font-bold leading-[1.15] tracking-tight"
          style={{ fontFamily: 'Roboto, sans-serif', color: theme.text }}
        >
          {data.firstName} <span style={{ color: theme.primary }}>{data.lastName}</span>
        </h1>
        <p
          className="text-[14px] font-semibold tracking-wider uppercase leading-[1.25] mt-1"
          style={{ fontFamily: 'Roboto, sans-serif', color: theme.primary }}
        >
          {data.title}
        </p>
        {renderContactBar('justify-center')}
      </div>
    );
  }

  if (variant === 'split') {
    return (
      <div id="cv-section-personal" className="w-full flex items-center justify-between pb-4 border-b border-slate-200" style={{ borderColor: `${theme.primary}20` }}>
        <div className="flex-1 min-w-0">
          <h1
            className="text-[28px] font-bold leading-[1.15] tracking-tight"
            style={{ fontFamily: 'Roboto, sans-serif', color: theme.text }}
          >
            {data.firstName} <span style={{ color: theme.primary }}>{data.lastName}</span>
          </h1>
          <p
            className="text-[14px] font-semibold tracking-wider uppercase leading-[1.25] mt-1"
            style={{ fontFamily: 'Roboto, sans-serif', color: theme.primary }}
          >
            {data.title}
          </p>
          {renderContactBar('justify-start')}
        </div>
        {!hideAvatar && avatar && (
          <div className="pl-5 shrink-0">
            <img
              src={avatar}
              alt={`${data.firstName} ${data.lastName}`}
              onError={(e) => { (e.target as HTMLImageElement).src = DUMMY_AVATAR; }}
              className="w-20 h-20 rounded-md object-cover shadow-sm border"
              style={{ borderColor: `${theme.primary}30` }}
            />
          </div>
        )}
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div
        id="cv-section-personal"
        className="w-full relative overflow-hidden rounded-md mb-4 shadow-sm"
        style={{
          background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})`,
        }}
      >
        <div className="relative px-5 py-5 flex items-center gap-4 text-white">
          {!hideAvatar && avatar && (
            <img
              src={avatar}
              alt={`${data.firstName} ${data.lastName}`}
              onError={(e) => { (e.target as HTMLImageElement).src = DUMMY_AVATAR; }}
              className="w-20 h-20 rounded-full object-cover border-2 border-white/50 shadow-md shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-[28px] font-bold leading-[1.15]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {data.firstName} {data.lastName}
            </h1>
            <p className="text-[14px] font-semibold tracking-wider uppercase leading-[1.25] mt-1 text-white/90" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {data.title}
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10.5px] text-white/90 font-medium leading-normal">
              {data.email && <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{data.email}</span>}
              {data.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{data.phone}</span>}
              {data.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{data.location}</span>}
              {data.website && <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" />{data.website.replace(/^https?:\/\//, '')}</span>}
              {data.linkedin && <span className="flex items-center gap-1.5"><Link2 className="w-3.5 h-3.5" />{data.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'linkedin.com/in/')}</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Minimal variant (default fallback)
  return (
    <div id="cv-section-personal" className="w-full pb-3.5">
      <h1
        className="text-[28px] font-bold leading-[1.15] tracking-tight"
        style={{ fontFamily: 'Roboto, sans-serif', color: theme.text }}
      >
        {data.firstName} {data.lastName}
      </h1>
      <p
        className="text-[14px] font-semibold tracking-wider uppercase leading-[1.25] mt-1"
        style={{ fontFamily: 'Roboto, sans-serif', color: theme.primary }}
      >
        {data.title}
      </p>
      {renderContactBar('justify-start')}
    </div>
  );
};

export default Header;