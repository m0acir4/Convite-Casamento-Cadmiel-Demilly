import React, { useEffect, useState } from 'react';
import { Check, Copy, Gift, X } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingConfig';
import { BotanicalDivider } from './BotanicalOrnament';

/**
 * 11. SEÇÃO ESPECIAL DE PRESENTE VIA PIX
 * Apresenta uma ilustração elegante e interativa de presente em Azul Royal & Azul Celeste
 * acima da frase "Nosso maior presente é ter você conosco."
 * Ao clicar, abre o modal com o QR Code original do PIX e botão para copiar a chave:
 * demillymoura231@gmail.com
 */
export const PixGiftSection: React.FC = () => {
  const { pixGift } = WEDDING_CONFIG;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleCopyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(pixGift.pixKeyEmail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = pixGift.pixKeyEmail;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section
      id="presente"
      aria-labelledby="heading-presente-pix"
      className="py-12 sm:py-20 px-4 sm:px-6 max-w-3xl mx-auto"
    >
      <BotanicalDivider className="mb-10" />

      <div className="flex flex-col items-center text-center">
        {/* Interactive Gift Illustration Button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          aria-label="Abrir informações de presente via PIX"
          className="group relative flex flex-col items-center focus:outline-none cursor-pointer"
        >
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border-2 border-[#89C2FA] shadow-[0_12px_30px_rgba(27,68,140,0.12)] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[#1B448C] group-hover:shadow-[0_16px_36px_rgba(27,68,140,0.2)]">
            {/* Custom Royal & Celeste Gift Box Illustration */}
            <svg
              viewBox="0 0 80 80"
              className="w-14 h-14 sm:w-16 sm:h-16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="40" cy="42" r="28" fill="#E6F0FA" />
              <path
                d="M40 26C33 16 22 18 24 25C25 29 33 28 40 26Z"
                fill="#89C2FA"
                stroke="#1B448C"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M40 26C47 16 58 18 56 25C55 29 47 28 40 26Z"
                fill="#89C2FA"
                stroke="#1B448C"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <rect
                x="18"
                y="26"
                width="44"
                height="10"
                rx="2.5"
                fill="#FFFFFF"
                stroke="#1B448C"
                strokeWidth="2"
              />
              <rect
                x="21"
                y="36"
                width="38"
                height="26"
                rx="3"
                fill="#FFFFFF"
                stroke="#1B448C"
                strokeWidth="2"
              />
              <rect x="37" y="26" width="6" height="36" fill="#1B448C" />
              <rect x="21" y="46" width="38" height="5" fill="#63A4E8" />
            </svg>
          </div>

          <span className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E6F0FA] text-[#1B448C] text-xs font-medium border border-[#C9DDF3] group-hover:bg-[#1B448C] group-hover:text-white transition-colors">
            <Gift className="w-3.5 h-3.5" />
            <span>Presentear os Noivos</span>
          </span>
        </button>

        {/* Main Phrase Required by User */}
        <h2
          id="heading-presente-pix"
          className="mt-5 font-serif-display italic text-2xl sm:text-4xl font-semibold text-[#0F2347] max-w-xl"
          style={{ textWrap: 'balance' }}
        >
          “{pixGift.mainQuote}”
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-[#5A78A3]">
          {pixGift.interactiveHint}
        </p>
      </div>

      {/* Elegant PIX Gift Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-pix-title"
          className="fixed inset-0 z-50 bg-[#0F2347]/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-white border border-[#C9DDF3] rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-center max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Fechar janela de presente"
              className="absolute top-4 right-4 p-2 rounded-full text-[#2C4A7A] hover:text-[#0F2347] hover:bg-[#F4F8FD] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#E6F0FA] border border-[#89C2FA] flex items-center justify-center mx-auto text-[#1B448C]">
              <Gift className="w-6 h-6" />
            </div>

            <h3
              id="modal-pix-title"
              className="mt-3 font-serif-display text-2xl sm:text-3xl font-semibold text-[#0F2347]"
            >
              {pixGift.modalTitle}
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-[#2C4A7A] leading-relaxed">
              {pixGift.modalDescription}
            </p>

            {/* 1. Original PIX QR Code Image (Exact Attached File) */}
            <div className="mt-5 p-3 sm:p-4 rounded-2xl bg-[#F4F8FD] border border-[#C9DDF3] flex flex-col items-center justify-center">
              <img
                src={pixGift.qrCodeImagePath}
                alt={pixGift.qrCodeAlt}
                referrerPolicy="no-referrer"
                className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-xl bg-white p-1.5 border border-[#C9DDF3] shadow-xs select-none"
              />
            </div>

            {/* 2. Alternative: PIX Email Key + Copy Button */}
            <div className="mt-5 pt-5 border-t border-[#C9DDF3]">
              <p className="text-xs text-[#2C4A7A] font-medium">
                {pixGift.alternativeLabel}
              </p>

              <div className="mt-2.5 p-3.5 rounded-xl bg-[#F4F8FD] border border-[#C9DDF3] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span
                  data-testid="pix-key-email"
                  className="text-xs sm:text-sm font-semibold text-[#0F2347] select-all whitespace-nowrap"
                >
                  {pixGift.pixKeyEmail}
                </span>

                <button
                  type="button"
                  onClick={handleCopyPixKey}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#1B448C] hover:bg-[#122E63] text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{pixGift.copiedConfirmationLabel}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{pixGift.copyButtonLabel}</span>
                    </>
                  )}
                </button>
              </div>

              {copied && (
                <p
                  role="status"
                  aria-live="polite"
                  className="mt-2 text-xs font-medium text-[#1B448C]"
                >
                  {pixGift.copiedConfirmationLabel}
                </p>
              )}
            </div>

            {/* Close Action */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#F4F8FD] hover:bg-[#E6F0FA] text-[#0F2347] border border-[#C9DDF3] text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
