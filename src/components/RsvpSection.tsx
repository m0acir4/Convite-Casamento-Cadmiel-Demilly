import React from 'react';
import { ExternalLink, UserCheck } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingConfig';
import { CornerFoliageFrame } from './BotanicalOrnament';

/**
 * 10. CONFIRMAÇÃO DE PRESENÇA (RSVP)
 * Seção simplificada e direta intitulada "CONFIRME SUA PRESENÇA AQUI",
 * direcionando o convidado diretamente para o Google Forms oficial dos noivos.
 */
export const RsvpSection: React.FC = () => {
  const { rsvp } = WEDDING_CONFIG;

  return (
    <section
      id="rsvp"
      aria-labelledby="heading-rsvp"
      className="py-14 sm:py-20 px-4 sm:px-6 max-w-3xl mx-auto"
    >
      <div className="relative bg-white border border-[#C9DDF3] rounded-2xl p-8 sm:p-14 shadow-[0_14px_40px_rgba(27,68,140,0.07)] overflow-hidden text-center">
        <div className="absolute top-3 left-3">
          <CornerFoliageFrame position="top-left" />
        </div>
        <div className="absolute bottom-3 right-3">
          <CornerFoliageFrame position="bottom-right" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto">
          <p className="text-xs sm:text-sm text-[#1B448C] font-medium">
            {rsvp.sectionKicker}
          </p>

          <h2
            id="heading-rsvp"
            className="mt-1.5 font-serif-display text-2xl sm:text-4xl font-semibold text-[#0F2347] tracking-tight"
          >
            {rsvp.sectionTitle}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#2C4A7A] leading-relaxed">
            {rsvp.sectionSubtitle}
          </p>

          <div className="mt-8 flex flex-col items-center">
            <a
              href={rsvp.googleFormsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#1B448C] hover:bg-[#122E63] text-white text-sm sm:text-base font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
            >
              <UserCheck className="w-5 h-5" />
              <span>{rsvp.buttonLabel}</span>
              <ExternalLink className="w-4 h-4 opacity-85" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
