// Contact section component with variant support

import React from 'react';
import { Theme } from '../../../data/themes';
import { ContactVariant, getCardStyles, getShadowStyle } from '../variants/sectionVariants';
import { ContactItem } from '../../../data/sampleCV';

export type ContactProps = {
  data: ContactItem[];
  theme: Theme;
  variant?: ContactVariant;
};

const Contact: React.FC<ContactProps> = ({ data, theme, variant = 'icons' }) => {
  const cardStyles = getCardStyles(theme);
  const shadowStyle = getShadowStyle(theme);

  return (
    <div className="w-full mb-4">
      <h2
        className="text-[14px] font-bold uppercase tracking-wider leading-[1.25] mb-2"
        style={{
          fontFamily: theme.fontFamilyHeading,
          color: theme.primary,
        }}
      >
        Contact
      </h2>
      <div
        className="p-2.5 flex flex-wrap gap-2 rounded-md"
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
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xs text-[10.5px] font-medium leading-normal transition-all"
            style={{
              background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}15, ${theme.gradient.end}15)`,
              color: theme.primary,
              fontFamily: theme.fontFamily,
            }}
          >
            <span>{item.label || item.value}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contact;