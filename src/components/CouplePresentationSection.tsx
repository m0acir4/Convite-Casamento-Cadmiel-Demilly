import React from 'react';
import { CalendarPlus, Download, MapPin } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingConfig';
import {
  buildGoogleCalendarUrl,
  buildIcsContent,
} from '../utils/weddingLogic';
import {
  BotanicalDivider,
  CoralSprigsHeader,
  CornerFoliageFrame,
} from './BotanicalOrnament';

/**
 * 02. APRESENTAÇÃO DOS NOIVOS & 03. INFORMAÇÕES DO CASAMENTO
 * Apresenta Cadmiel & Demilly na nova identidade Azul Royal & Azul Celeste,
 * com os horários atualizados:
 * - Celebração: 07h30
 * - Recepção dos convidados: 07h00
 * - Início da cerimônia: 07h30
 */
export const CouplePresentationSection: React.FC = () => {
  const { couple, presentation, dateAndTime, location } = WEDDING_CONFIG;

  const googleCalUrl = buildGoogleCalendarUrl({
    title: `Casamento ${couple.fullTitle}`,
    startIso: dateAndTime.isoDate,
    endIso: dateAndTime.endIsoDate,
    location: `${location.venueName} - ${location.fullAddress}`,
    details: `${presentation.invitationMessage}\n\nRecepção: ${dateAndTime.receptionTime} | Cerimônia: ${dateAndTime.ceremonyTime}\nLocal: ${location.venueName} (${location.googleMapsShortUrl})`,
  });

  const handleDownloadIcs = () => {
    const icsData = buildIcsContent({
      title: `Casamento ${couple.fullTitle}`,
      startIso: dateAndTime.isoDate,
      endIso: dateAndTime.endIsoDate,
      location: `${location.venueName} - ${location.fullAddress}`,
      details: `${presentation.invitationMessage} — Recepção: ${dateAndTime.receptionTime} | Cerimônia: ${dateAndTime.ceremonyTime} — Mapa: ${location.googleMapsShortUrl}`,
    });

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'casamento-cadmiel-e-demilly.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="casamento"
      aria-labelledby="heading-noivos"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto"
    >
      {/* Main Framed Invitation Card in White & Azul Celeste border */}
      <div className="relative bg-white border border-[#C9DDF3] rounded-2xl p-6 sm:p-14 shadow-[0_14px_40px_rgba(27,68,140,0.07)] overflow-hidden">
        {/* Corner Botanical Frames in Royal & Celeste */}
        <div className="absolute top-3 left-3">
          <CornerFoliageFrame position="top-left" />
        </div>
        <div className="absolute bottom-3 right-3">
          <CornerFoliageFrame position="bottom-right" />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto py-4">
          {/* Botanical Sprigs in Azul Royal & Celeste */}
          <CoralSprigsHeader className="mb-3" />

          <p className="text-xs sm:text-sm tracking-[0.22em] text-[#2C4A7A] font-medium">
            {presentation.kicker}
          </p>

          {/* 02. Apresentação dos Noivos */}
          <h1
            id="heading-noivos"
            className="mt-4 font-script text-5xl sm:text-7xl text-[#0F2347] leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {couple.groomName} {couple.connector} {couple.brideName}
          </h1>

          <p className="mt-3 font-serif-display italic text-lg sm:text-xl text-[#1B448C]">
            {presentation.headline}
          </p>

          <p className="mt-6 text-sm sm:text-base text-[#2C4A7A] leading-relaxed max-w-xl mx-auto">
            {presentation.invitationMessage}
          </p>

          {/* Romantic Biblical Quote */}
          <blockquote className="mt-6 pt-5 border-t border-[#C9DDF3]/80 max-w-lg mx-auto">
            <p className="font-serif-display italic text-base sm:text-lg text-[#0F2347]">
              {presentation.quote}
            </p>
            <cite className="mt-1.5 block not-italic text-xs text-[#5A78A3]">
              {presentation.quoteReference}
            </cite>
          </blockquote>

          <BotanicalDivider className="my-10" />

          {/* 03. Informações do Casamento */}
          <div aria-labelledby="heading-info-casamento">
            <h2
              id="heading-info-casamento"
              className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#0F2347] tracking-tight"
            >
              Informações da Cerimônia e Recepção
            </h2>

            {/* Date & Celebration Time Composition */}
            <div className="mt-8 flex flex-col items-center">
              <p className="text-xs sm:text-sm text-[#1B448C] font-medium">
                A celebração acontecerá às
              </p>
              <p className="mt-1 font-serif-display text-4xl sm:text-5xl font-semibold text-[#0F2347] tabular-nums">
                {dateAndTime.celebrationTime}
              </p>

              {/* 3-Column Date Lockup: SÁBADO | 26 | DEZEMBRO */}
              <div className="mt-6 w-full max-w-md grid grid-cols-3 items-center border-y border-[#C9DDF3] py-4 bg-[#F4F8FD]/60 rounded-lg">
                <div className="text-center border-r border-[#C9DDF3] px-2">
                  <span className="text-xs sm:text-sm font-medium text-[#2C4A7A]">
                    {dateAndTime.dayOfWeek}
                  </span>
                </div>
                <div className="text-center px-2">
                  <span className="font-serif-display text-4xl sm:text-5xl font-semibold text-[#1B448C] tabular-nums">
                    {dateAndTime.day}
                  </span>
                </div>
                <div className="text-center border-l border-[#C9DDF3] px-2">
                  <span className="text-xs sm:text-sm font-medium text-[#2C4A7A]">
                    {dateAndTime.monthName}
                  </span>
                </div>
              </div>

              <p className="mt-3 font-serif-display text-2xl sm:text-3xl text-[#0F2347] tabular-nums">
                {dateAndTime.year}
              </p>
            </div>

            {/* Reception (07h00) & Ceremony (07h30) Times Summary */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-center">
              <div className="p-4 rounded-xl bg-[#F4F8FD] border border-[#C9DDF3]">
                <p className="text-xs text-[#5A78A3]">Recepção dos Convidados</p>
                <p className="mt-1 font-serif-display text-2xl font-semibold text-[#0F2347] tabular-nums">
                  {dateAndTime.receptionTime}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#E6F0FA]/70 border border-[#89C2FA]">
                <p className="text-xs text-[#1B448C] font-medium">Início da Cerimônia</p>
                <p className="mt-1 font-serif-display text-2xl font-semibold text-[#1B448C] tabular-nums">
                  {dateAndTime.ceremonyTime}
                </p>
              </div>
            </div>

            {/* Venue & Address Highlight */}
            <div className="mt-8 pt-6 border-t border-[#C9DDF3]/70">
              <p className="text-xs text-[#5A78A3]">Local da Cerimônia e Recepção</p>
              <h3 className="mt-1 font-serif-display text-2xl sm:text-3xl font-semibold text-[#0F2347]">
                {location.venueName}
              </h3>
              <p className="mt-1.5 text-sm sm:text-base font-medium text-[#1B448C]">
                {location.streetAddress} · {location.cityState}
              </p>
              <p className="mt-3 text-xs sm:text-sm text-[#2C4A7A] max-w-lg mx-auto leading-relaxed">
                {location.additionalInfo}
              </p>
            </div>

            {/* Action Buttons: Add to Calendar & View Map */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={googleCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1B448C] hover:bg-[#122E63] text-white text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Adicionar ao Google Agenda</span>
              </a>

              <button
                type="button"
                onClick={handleDownloadIcs}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F4F8FD] hover:bg-[#E6F0FA] text-[#0F2347] border border-[#C9DDF3] text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#1B448C]" />
                <span>Salvar no Calendário (iPhone / .ics)</span>
              </button>

              <a
                href="#localizacao"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[#2C4A7A] hover:text-[#0F2347] text-xs sm:text-sm font-medium underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
              >
                <MapPin className="w-4 h-4 text-[#1B448C]" />
                <span>Ver mapa do local</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
