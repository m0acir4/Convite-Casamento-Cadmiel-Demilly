import React from 'react';
import { WEDDING_CONFIG } from '../config/weddingConfig';

interface TopNavbarProps {
  onOpenRsvpSection: () => void;
}

/**
 * Follows the strict 3-Zone Top Bar Contract in Azul Royal & Azul Celeste:
 * [Zone 1: Brand Title, 1 line] — [Zone 2: 5 concise single-line nav links] — [Zone 3: 1 primary action]
 */
export const TopNavbar: React.FC<TopNavbarProps> = ({ onOpenRsvpSection }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#F4F8FD]/95 backdrop-blur-md border-b border-[#C9DDF3]">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-8 h-14 sm:h-16">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#capa"
          className="font-serif-display text-xl sm:text-2xl font-semibold tracking-tight text-[#0F2347] whitespace-nowrap shrink-0 hover:text-[#1B448C] transition-colors"
        >
          {WEDDING_CONFIG.couple.fullTitle}
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Navegação do convite"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#2C4A7A]"
        >
          <a
            href="#casamento"
            className="hover:text-[#0F2347] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            O Casamento
          </a>
          <a
            href="#galeria"
            className="hover:text-[#0F2347] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Galeria
          </a>
          <a
            href="#localizacao"
            className="hover:text-[#0F2347] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Localização
          </a>
          <a
            href="#cores-reservadas"
            className="hover:text-[#0F2347] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Cores Reservadas
          </a>
          <a
            href="#programacao"
            className="hover:text-[#0F2347] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Roteiro
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenRsvpSection}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#1B448C] hover:bg-[#122E63] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B448C]"
          >
            Confirmar Presença
          </button>
        </div>
      </div>
    </header>
  );
};
