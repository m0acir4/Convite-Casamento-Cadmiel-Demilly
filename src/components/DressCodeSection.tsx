import React from 'react';
import { Heart } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingConfig';
import { CornerFoliageFrame } from './BotanicalOrnament';

/**
 * 08. CORES QUE NÃO DEVEM SER UTILIZADAS (Substitui o Dress Code)
 * Apresenta de forma delicada, elegante e intuitiva as 4 cores reservadas:
 * - Azul-claro
 * - Azul-escuro
 * - Branco
 * - Preto
 */
export const DressCodeSection: React.FC = () => {
  const { reservedColors } = WEDDING_CONFIG;

  return (
    <section
      id="cores-reservadas"
      aria-labelledby="heading-cores-reservadas"
      className="py-14 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto"
    >
      <div className="relative bg-white border border-[#C9DDF3] rounded-2xl p-6 sm:p-12 shadow-[0_12px_34px_rgba(27,68,140,0.06)] overflow-hidden">
        <div className="absolute top-3 left-3">
          <CornerFoliageFrame position="top-left" />
        </div>
        <div className="absolute bottom-3 right-3">
          <CornerFoliageFrame position="bottom-right" />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-[#1B448C] font-medium">
            {reservedColors.sectionKicker}
          </p>
          <h2
            id="heading-cores-reservadas"
            className="mt-1.5 font-serif-display text-2xl sm:text-4xl font-semibold text-[#0F2347] tracking-tight"
          >
            {reservedColors.title}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#2C4A7A] leading-relaxed">
            {reservedColors.subtitle}
          </p>

          {/* 4 Elegant Reserved Color Cards with Circles */}
          <div
            role="list"
            aria-label="Cores reservadas que não devem ser utilizadas pelos convidados"
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5"
          >
            {reservedColors.items.map((colorItem) => (
              <div
                key={colorItem.id}
                role="listitem"
                className="flex flex-col items-center p-4 sm:p-5 rounded-2xl bg-[#F4F8FD] border border-[#C9DDF3] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {/* Color Swatch Circle */}
                <div
                  aria-hidden="true"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-sm flex items-center justify-center border-2"
                  style={{
                    backgroundColor: colorItem.hex,
                    borderColor: colorItem.borderHex,
                  }}
                />

                {/* Color Name */}
                <h3 className="mt-3.5 font-serif-display text-lg sm:text-xl font-semibold text-[#0F2347] whitespace-nowrap">
                  {colorItem.name}
                </h3>

                {/* Gentle Description */}
                <p className="mt-1 text-[11px] sm:text-xs text-[#5A78A3] leading-snug">
                  {colorItem.note}
                </p>
              </div>
            ))}
          </div>

          {/* Gentle closing note */}
          <div className="mt-8 pt-6 border-t border-[#C9DDF3]/80 flex items-center justify-center gap-2 text-xs sm:text-sm text-[#1B448C] font-medium">
            <Heart className="w-4 h-4 text-[#63A4E8] fill-[#63A4E8] shrink-0" />
            <span>{reservedColors.gentleNote}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
