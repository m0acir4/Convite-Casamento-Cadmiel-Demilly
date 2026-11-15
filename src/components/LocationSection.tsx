import React, { useState } from 'react';
import { Check, Copy, ExternalLink, MapPin, Navigation } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingConfig';

/**
 * 07. LOCALIZAÇÃO DO EVENTO
 * Espaço de Eventos Monte Sião — Rua Pará, Nº 8A, Piratininga.
 * Estilizado em Azul Royal e Azul Celeste.
 */
export const LocationSection: React.FC = () => {
  const { location } = WEDDING_CONFIG;
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(
        `${location.venueName} - ${location.fullAddress}`
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="localizacao"
      aria-labelledby="heading-localizacao"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto"
    >
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-xs sm:text-sm text-[#1B448C] font-medium">
          Onde celebraremos nossa união
        </p>
        <h2
          id="heading-localizacao"
          className="mt-1 font-serif-display text-3xl sm:text-4xl font-semibold text-[#0F2347] tracking-tight"
        >
          Local da Cerimônia e Recepção
        </h2>

        <h3 className="mt-4 font-serif-display text-2xl sm:text-3xl font-semibold text-[#1B448C]">
          {location.venueName}
        </h3>
        <p className="mt-1.5 text-sm sm:text-base text-[#0F2347] font-medium">
          {location.streetAddress}
        </p>
        <p className="text-xs sm:text-sm text-[#5A78A3]">{location.cityState}</p>
      </div>

      {/* Map Card in White & Azul Celeste Border */}
      <div className="bg-white border border-[#C9DDF3] rounded-2xl p-3 sm:p-5 shadow-[0_14px_38px_rgba(27,68,140,0.07)]">
        <div className="relative w-full h-[360px] sm:h-[440px] rounded-xl overflow-hidden border border-[#C9DDF3] bg-[#E6F0FA]">
          {/* Detailed Cartographic Street-Map Underlay in Soft Blue & Alabaster */}
          <svg
            viewBox="0 0 800 440"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          >
            <rect width="800" height="440" fill="#E6F0FA" />
            {/* Celeste park / botanical blocks */}
            <path d="M460 40 L680 40 L680 180 L460 180 Z" fill="#D4E6FA" />
            <path d="M80 260 L290 260 L290 410 L80 410 Z" fill="#D9EAFC" />
            {/* City blocks */}
            <rect x="60" y="50" width="180" height="90" rx="6" fill="#F6FAFE" />
            <rect x="260" y="50" width="180" height="90" rx="6" fill="#F6FAFE" />
            <rect x="60" y="160" width="180" height="80" rx="6" fill="#F6FAFE" />
            <rect x="260" y="160" width="180" height="80" rx="6" fill="#F6FAFE" />
            <rect x="310" y="260" width="210" height="140" rx="6" fill="#F6FAFE" />
            <rect x="540" y="200" width="210" height="200" rx="6" fill="#F6FAFE" />
            {/* Major & Secondary Streets (Piratininga grid) */}
            <g stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round">
              <line x1="0" y1="150" x2="800" y2="150" />
              <line x1="0" y1="250" x2="800" y2="250" />
              <line x1="250" y1="0" x2="250" y2="440" />
              <line x1="450" y1="0" x2="450" y2="440" />
              <line x1="530" y1="150" x2="530" y2="440" />
            </g>
            {/* Highlighted Route along Rua Pará in Azul Royal */}
            <path
              d="M120 250 L400 250 L400 210"
              stroke="#1B448C"
              strokeWidth="5"
              strokeDasharray="8 6"
              fill="none"
            />
            {/* Street Labels */}
            <text x="330" y="245" fill="#2C4A7A" fontSize="11" fontWeight="600" letterSpacing="0.06em">
              RUA PARÁ · PIRATININGA
            </text>
            <text x="510" y="145" fill="#5A78A3" fontSize="10" fontWeight="500" letterSpacing="0.05em">
              MARACANAÚ — CE
            </text>
            {/* Azul Royal Map Pin at Center (Espaço de Eventos Monte Sião) */}
            <g transform="translate(400, 195)">
              <circle cx="0" cy="18" r="14" fill="rgba(27, 68, 140, 0.22)" />
              <path
                d="M0 -22 C-12 -22 -20 -13 -20 -2 C-20 11 0 26 0 26 C0 26 20 11 20 -2 C20 -13 12 -22 0 -22 Z"
                fill="#1B448C"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
              <circle cx="0" cy="-3" r="6" fill="#89C2FA" />
            </g>
            <text
              x="428"
              y="196"
              fill="#0F2347"
              fontSize="14"
              fontWeight="700"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Espaço de Eventos Monte Sião
            </text>
            <text
              x="428"
              y="213"
              fill="#2C4A7A"
              fontSize="11"
              fontWeight="500"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Rua Pará, Nº 8A — Piratininga
            </text>
          </svg>

          {/* Floating Overlay Card */}
          <div className="absolute top-3 left-3 z-20 max-w-[260px] sm:max-w-xs bg-white/95 backdrop-blur-md border border-[#C9DDF3] rounded-xl p-3.5 shadow-md">
            <p className="font-serif-display text-lg font-semibold text-[#0F2347] leading-snug">
              {location.venueName}
            </p>
            <p className="mt-0.5 text-xs text-[#2C4A7A]">
              {location.streetAddress}
            </p>
            <a
              href={location.googleMapsShortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B448C] hover:text-[#122E63] transition-colors whitespace-nowrap"
            >
              <span>Abrir no Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <iframe
            title={`Mapa de localização — ${location.venueName}`}
            src={location.embedMapUrl}
            className="relative z-10 w-full h-full border-0 bg-transparent mix-blend-multiply"
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        {/* Action Buttons Bar Below Map */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href={location.googleMapsShortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1B448C] hover:bg-[#122E63] text-white text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0"
          >
            <MapPin className="w-4 h-4" />
            <span>Abrir no Google Maps</span>
          </a>

          <a
            href={location.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F2347] hover:bg-[#1B448C] text-white text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0"
          >
            <Navigation className="w-4 h-4" />
            <span>Como chegar</span>
          </a>

          <button
            type="button"
            onClick={handleCopyAddress}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F4F8FD] hover:bg-[#E6F0FA] text-[#0F2347] border border-[#C9DDF3] text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#1B448C]" />
                <span>Endereço copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#1B448C]" />
                <span>Copiar endereço</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
