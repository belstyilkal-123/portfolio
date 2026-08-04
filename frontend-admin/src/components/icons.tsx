import React from 'react';

export interface BrandIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const GithubIcon: React.FC<BrandIconProps> = ({ size, ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={props.width ?? size ?? 24} height={props.height ?? size ?? 24} {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6.2-1.6 6.2-7A5.5 5.5 0 0 0 18 4a4.9 4.9 0 0 0-.1-3.8S16.7.6 14 2.5a13.4 13.4 0 0 0-7 0C4.3.6 3.1 1 3.1 1A4.9 4.9 0 0 0 3 4.8a5.5 5.5 0 0 0-1.5 3.8c0 5.4 3.2 6.7 6.2 7a3.6 3.6 0 0 0-1 2.2v4" />
    <path d="M9 18c-4 2-5-2-7-2" />
  </svg>
);
