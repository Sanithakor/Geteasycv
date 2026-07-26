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

  // Standardized Contact Bar with Lucide Icons
  const renderContactBar = (justifyClass = 'justify-center', textClass = 'text-[11px]') => (
    <div
      className={`flex flex-wrap ${justifyClass} items-center gap-x-4 gap-y-1.5 mt-2.5 text-[11px] font-medium`}
      style={{ color: theme.textSecondary, fontFamily: 'Poppins, sans-serif' }}
    >
      {data.email && (
        <a href={`mailto:${data.email}`} className="hover:opacity-80 transition-opacity flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
          <span>{data.email}</span>
        </a>
      )}
      {data.phone && (
        <span className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
          <span>{data.phone}</span>
        </span>
      )}
      {data.location && (
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
          <span>{data.location}</span>
        </span>
      )}
      {data.website && (
        <a href={data.website} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
          <span>{data.website.replace(/^https?:\/\//, '')}</span>
        </a>
      )}
      {data.linkedin && (
        <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity flex items-center gap-1.5">
          <Link2 className="w-3.5 h-3.5" />
          <span>{data.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'linkedin.com/in/')}</span>
        </a>
      )}
    </div>
  );

  if (variant === 'centered') {
    return (
      <div id="cv-section-personal" className="w-full text-center pb-6">
        {!hideAvatar && avatar && (
          <div className="mb-4 flex justify-center">
            <img
              src={avatar}
              alt={`${data.firstName} ${data.lastName}`}
              onError={(e) => { (e.target as HTMLImageElement).src = DUMMY_AVATAR; }}
              className="w-20 h-20 rounded-full object-cover shadow-sm border-2"
              style={{ borderColor: theme.primary }}
            />
          </div>
        )}
        <h1
          className="text-3xl font-bold leading-tight tracking-tight"
          style={{ fontFamily: 'Poppins, sans-serif', color: theme.text }}
        >
          {data.firstName} <span style={{ color: theme.primary }}>{data.lastName}</span>
        </h1>
        <p
          className="text-[13px] font-semibold tracking-wider uppercase mt-1"
          style={{ fontFamily: 'Poppins, sans-serif', color: theme.primary }}
        >
          {data.title}
        </p>
        {renderContactBar('justify-center')}
      </div>
    );
  }

  if (variant === 'split') {
    return (
      <div id="cv-section-personal" className="w-full flex items-center justify-between pb-6 border-b border-slate-200" style={{ borderColor: `${theme.primary}20` }}>
        <div className="flex-1">
          <h1
            className="text-3xl font-bold leading-tight tracking-tight"
            style={{ fontFamily: 'Poppins, sans-serif', color: theme.text }}
          >
            {data.firstName} <span style={{ color: theme.primary }}>{data.lastName}</span>
          </h1>
          <p
            className="text-[13px] font-semibold tracking-wider uppercase mt-1"
            style={{ fontFamily: 'Poppins, sans-serif', color: theme.primary }}
          >
            {data.title}
          </p>
          {renderContactBar('justify-start')}
        </div>
        {!hideAvatar && avatar && (
          <div className="pl-6 shrink-0">
            <img
              src={avatar}
              alt={`${data.firstName} ${data.lastName}`}
              onError={(e) => { (e.target as HTMLImageElement).src = DUMMY_AVATAR; }}
              className="w-20 h-20 rounded-lg object-cover shadow-sm border"
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
        className="w-full relative overflow-hidden rounded-xl mb-6 shadow-sm"
        style={{
          background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})`,
        }}
      >
        <div className="relative px-8 py-8 flex items-center gap-6 text-white">
          {!hideAvatar && avatar && (
            <img
              src={avatar}
              alt={`${data.firstName} ${data.lastName}`}
              onError={(e) => { (e.target as HTMLImageElement).src = DUMMY_AVATAR; }}
              className="w-20 h-20 rounded-full object-cover border-2 border-white/50 shadow-md shrink-0"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {data.firstName} {data.lastName}
            </h1>
            <p className="text-[13px] font-semibold tracking-wider uppercase mt-1 text-white/90" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {data.title}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-[11px] text-white/90 font-medium">
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
    <div id="cv-section-personal" className="w-full pb-5">
      <h1
        className="text-[28px] font-bold leading-tight tracking-tight"
        style={{ fontFamily: 'Poppins, sans-serif', color: theme.text }}
      >
        {data.firstName} {data.lastName}
      </h1>
      <p
        className="text-[13px] font-semibold tracking-wider uppercase mt-1"
        style={{ fontFamily: 'Poppins, sans-serif', color: theme.primary }}
      >
        {data.title}
      </p>
      {renderContactBar('justify-start')}
    </div>
  );
};

export default Header;