import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 40 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 200" 
      width={size} 
      height={size}
      className={className}
    >
      <defs>
        <linearGradient id="green1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00D084"/>
          <stop offset="100%" stopColor="#009E60"/>
        </linearGradient>
        <linearGradient id="green2" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#A8E063"/>
          <stop offset="100%" stopColor="#56AB2F"/>
        </linearGradient>
        <mask id="hole">
          <rect width="200" height="200" fill="white"/>
          <circle cx="100" cy="100" r="28" fill="black"/>
        </mask>
      </defs>
      <g mask="url(#hole)">
        <path 
          d="M100 100 L190 100 A90 90 0 0 1 127.28 172.72 Z"
          fill="url(#green1)" 
          transform="rotate(-20 100 100)" 
        />
        <path 
          d="M100 100 L190 100 A90 90 0 0 1 127.28 172.72 Z"
          fill="url(#green2)" 
          transform="rotate(160 100 100)" 
        />
      </g>
    </svg>
  );
};

export default Logo;