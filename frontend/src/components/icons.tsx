import React from 'react';

// Inline SVG icons for brands not included in lucide-react v1.28

export interface BrandIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const GithubIcon: React.FC<BrandIconProps> = ({ size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    width={props.width ?? size ?? 24}
    height={props.height ?? size ?? 24}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6.2-1.6 6.2-7A5.5 5.5 0 0 0 18 4a4.9 4.9 0 0 0-.1-3.8S16.7.6 14 2.5a13.4 13.4 0 0 0-7 0C4.3.6 3.1 1 3.1 1A4.9 4.9 0 0 0 3 4.8a5.5 5.5 0 0 0-1.5 3.8c0 5.4 3.2 6.7 6.2 7a3.6 3.6 0 0 0-1 2.2v4" />
    <path d="M9 18c-4 2-5-2-7-2" />
  </svg>
);

export const LinkedinIcon: React.FC<BrandIconProps> = ({ size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    width={props.width ?? size ?? 24}
    height={props.height ?? size ?? 24}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const TwitterIcon: React.FC<BrandIconProps> = ({ size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    width={props.width ?? size ?? 24}
    height={props.height ?? size ?? 24}
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export const TelegramIcon: React.FC<BrandIconProps> = ({ size, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    width={props.width ?? size ?? 24}
    height={props.height ?? size ?? 24}
    {...props}
  >
    <path d="m21.5 2-19 9.5 6.5 3M21.5 2l-10 14.5-3-2M8.5 14.5v5.5l3.5-3.5" />
  </svg>
);
