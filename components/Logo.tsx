import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showLink?: boolean;
}

export default function Logo({ className = 'h-10 w-auto object-contain', showLink = true }: LogoProps) {
  const logoElement = (
    <img
      src="/logo.svg"
      alt="GetEasyCV"
      className={className}
    />
  );

  if (showLink) {
    return (
      <Link href="/" className="inline-flex items-center">
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}
