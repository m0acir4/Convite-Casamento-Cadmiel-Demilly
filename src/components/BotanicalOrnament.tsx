import React from 'react';

/**
 * Delicate botanical line-art SVG ornaments in the new Azul Royal (#1B448C)
 * and Azul Celeste (#63A4E8) visual identity.
 */
export const CoralSprigsHeader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-8 sm:gap-14 select-none ${className}`} aria-hidden="true">
    {/* Left Celeste/Royal Branch */}
    <svg
      width="84"
      height="44"
      viewBox="0 0 84 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 sm:w-20 h-auto text-[#1B448C] opacity-90"
    >
      <path
        d="M8 38C22 25 45 14 76 6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M22 27C18 19 20 13 26 9C28 15 26 22 22 27Z"
        stroke="#63A4E8"
        strokeWidth="1"
        fill="rgba(99, 164, 232, 0.18)"
      />
      <path
        d="M38 19C35 12 38 6 44 3C45 9 42 15 38 19Z"
        stroke="#63A4E8"
        strokeWidth="1"
        fill="rgba(99, 164, 232, 0.18)"
      />
      <path
        d="M55 12C53 6 56 2 62 1C62 6 59 10 55 12Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="rgba(27, 68, 140, 0.12)"
      />
      <path
        d="M27 25C35 28 42 26 47 21C40 20 33 21 27 25Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="rgba(99, 164, 232, 0.15)"
      />
      <path
        d="M45 17C53 19 60 17 65 13C58 12 51 14 45 17Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="rgba(99, 164, 232, 0.15)"
      />
    </svg>

    {/* Right Celeste/Royal Branch (mirrored) */}
    <svg
      width="84"
      height="44"
      viewBox="0 0 84 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 sm:w-20 h-auto text-[#1B448C] opacity-90 scale-x-[-1]"
    >
      <path
        d="M8 38C22 25 45 14 76 6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M22 27C18 19 20 13 26 9C28 15 26 22 22 27Z"
        stroke="#63A4E8"
        strokeWidth="1"
        fill="rgba(99, 164, 232, 0.18)"
      />
      <path
        d="M38 19C35 12 38 6 44 3C45 9 42 15 38 19Z"
        stroke="#63A4E8"
        strokeWidth="1"
        fill="rgba(99, 164, 232, 0.18)"
      />
      <path
        d="M55 12C53 6 56 2 62 1C62 6 59 10 55 12Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="rgba(27, 68, 140, 0.12)"
      />
      <path
        d="M27 25C35 28 42 26 47 21C40 20 33 21 27 25Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="rgba(99, 164, 232, 0.15)"
      />
      <path
        d="M45 17C53 19 60 17 65 13C58 12 51 14 45 17Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="rgba(99, 164, 232, 0.15)"
      />
    </svg>
  </div>
);

export const BotanicalDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-4 my-6 select-none ${className}`} aria-hidden="true">
    <div className="h-px w-16 sm:w-28 bg-[#89C2FA]/70" />
    <svg
      width="36"
      height="20"
      viewBox="0 0 36 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#1B448C]"
    >
      <path
        d="M2 10C10 10 14 4 18 4C22 4 26 10 34 10"
        stroke="#63A4E8"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M18 3C15 7 15 13 18 17C21 13 21 7 18 3Z"
        fill="rgba(99, 164, 232, 0.25)"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M11 10C8 7 6 8 5 11C8 13 10 12 11 10Z"
        fill="rgba(99, 164, 232, 0.2)"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M25 10C28 7 30 8 31 11C28 13 26 12 25 10Z"
        fill="rgba(99, 164, 232, 0.2)"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
    <div className="h-px w-16 sm:w-28 bg-[#89C2FA]/70" />
  </div>
);

export const CornerFoliageFrame: React.FC<{ position: 'top-left' | 'bottom-right' }> = ({
  position,
}) => {
  const isTopLeft = position === 'top-left';
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`pointer-events-none select-none w-16 h-16 sm:w-24 sm:h-24 ${
        isTopLeft ? '' : 'rotate-180'
      }`}
    >
      {/* Extending Azul Celeste lines */}
      <line x1="36" y1="8" x2="92" y2="8" stroke="#63A4E8" strokeWidth="1.1" />
      <line x1="8" y1="36" x2="8" y2="92" stroke="#63A4E8" strokeWidth="1.1" />
      {/* Curved Azul Royal & Celeste botanical sprig */}
      <path
        d="M8 34C9 19 19 9 34 8"
        stroke="#63A4E8"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="5"
        ry="2.5"
        transform="rotate(-45 16 16)"
        fill="rgba(99, 164, 232, 0.28)"
        stroke="#1B448C"
        strokeWidth="0.9"
      />
      <ellipse
        cx="25"
        cy="10"
        rx="4.5"
        ry="2.2"
        transform="rotate(-20 25 10)"
        fill="rgba(99, 164, 232, 0.28)"
        stroke="#1B448C"
        strokeWidth="0.9"
      />
      <ellipse
        cx="10"
        cy="25"
        rx="4.5"
        ry="2.2"
        transform="rotate(-70 10 25)"
        fill="rgba(99, 164, 232, 0.28)"
        stroke="#1B448C"
        strokeWidth="0.9"
      />
    </svg>
  );
};
