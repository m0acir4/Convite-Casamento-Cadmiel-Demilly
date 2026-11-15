import React, { useState } from 'react';
import { ChevronDown, Maximize2, X } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingConfig';

interface CoverSectionProps {
  isOpened: boolean;
  onOpenInvitation: () => void;
}

/**
 * 01. CAPA PRINCIPAL
 * Exibe o arquivo JPEG original do convite emoldurado pela nova identidade
 * Azul Royal e Azul Celeste.
 */
export const CoverSection: React.FC<CoverSectionProps> = ({
  isOpened,
  onOpenInvitation,
}) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  return (
    <section
      id="capa"
      aria-label="Capa do Convite de Casamento"
      className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-4 sm:py-6 px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient Azul Celeste & Azul Royal halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[22rem] h-[28rem] sm:w-[34rem] sm:h-[40rem] rounded-full bg-[#89C2FA]/25 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md sm:max-w-lg mx-auto flex flex-col items-center">
        {/* Framed Original Wedding Invitation JPEG */}
        <div className="relative w-full rounded-2xl bg-white p-2 sm:p-3 shadow-[0_20px_50px_rgba(15,35,71,0.12)] border border-[#C9DDF3] transition-transform duration-300">
          <div className="relative overflow-hidden rounded-xl border border-[#C9DDF3]/70 bg-[#F4F8FD]">
            <img
              src={WEDDING_CONFIG.cover.imagePath}
              alt={WEDDING_CONFIG.cover.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[62vh] sm:max-h-[65vh] object-contain mx-auto block select-none"
            />

            {/* Discreet fullscreen button to inspect the original invitation artwork */}
            <button
              type="button"
              onClick={() => setIsZoomOpen(true)}
              aria-label="Ampliar imagem da capa do convite"
              className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#1B448C] border border-[#C9DDF3] shadow-sm transition-colors cursor-pointer"
              title="Ver convite em tela cheia"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Opening CTA in Azul Royal */}
        <div className="mt-4 sm:mt-5 flex flex-col items-center text-center">
          <button
            type="button"
            onClick={onOpenInvitation}
            className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#1B448C] hover:bg-[#122E63] text-white text-sm sm:text-base font-medium shadow-md transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B448C]"
          >
            <span>{isOpened ? 'Ver Detalhes do Casamento' : WEDDING_CONFIG.cover.openButtonLabel}</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>

          <p className="mt-2 text-xs text-[#5A78A3]">
            Toque para explorar o roteiro da manhã, localização e confirmar presença
          </p>
        </div>
      </div>

      {/* Fullscreen Lightbox for the Original Invitation Cover */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Convite Original Ampliado"
          className="fixed inset-0 z-50 bg-[#0F2347]/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              aria-label="Fechar visualização ampliada"
              className="mb-3 self-end inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-[#0F2347] text-xs font-medium shadow hover:bg-[#E6F0FA] cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Fechar</span>
            </button>
            <img
              src={WEDDING_CONFIG.cover.imagePath}
              alt={WEDDING_CONFIG.cover.imageAlt}
              referrerPolicy="no-referrer"
              className="max-h-[82vh] w-auto object-contain rounded-xl shadow-2xl border border-[#C9DDF3]"
            />
          </div>
        </div>
      )}
    </section>
  );
};
