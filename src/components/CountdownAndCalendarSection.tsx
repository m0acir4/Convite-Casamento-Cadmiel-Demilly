import React, { useEffect, useMemo, useState } from 'react';
import { Heart } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingConfig';
import {
  calculateCountdown,
  generateCalendarWeeks,
} from '../utils/weddingLogic';
import { BotanicalDivider } from './BotanicalOrnament';

const WEEKDAY_HEADERS = ['seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.', 'dom.'];

/**
 * 04. CONTAGEM REGRESSIVA & 05. CALENDÁRIO MENSAL
 * Contador regressivo em tempo real até 26/12/2026 às 07h30 + calendário mensal
 * em Azul Royal & Azul Celeste.
 */
export const CountdownAndCalendarSection: React.FC = () => {
  const { dateAndTime } = WEDDING_CONFIG;

  const [countdown, setCountdown] = useState(() =>
    calculateCountdown(dateAndTime.isoDate)
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(calculateCountdown(dateAndTime.isoDate));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [dateAndTime.isoDate]);

  const calendarWeeks = useMemo(
    () =>
      generateCalendarWeeks(
        dateAndTime.year,
        dateAndTime.month,
        dateAndTime.day
      ),
    [dateAndTime.year, dateAndTime.month, dateAndTime.day]
  );

  const padTwo = (n: number) => String(n).padStart(2, '0');

  return (
    <section
      aria-labelledby="heading-contagem"
      className="py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto"
    >
      <div className="text-center">
        <p className="text-xs sm:text-sm text-[#1B448C] font-medium">
          Falta pouco para o grande dia
        </p>
        <h2
          id="heading-contagem"
          className="mt-1 font-serif-display text-3xl sm:text-4xl font-semibold text-[#0F2347] tracking-tight"
        >
          Contagem Regressiva
        </h2>

        {/* 04. Real-Time Countdown Cards */}
        {countdown.isPast ? (
          <div className="mt-8 p-6 rounded-2xl bg-white border border-[#C9DDF3] max-w-lg mx-auto">
            <p className="font-serif-display text-2xl text-[#1B448C] font-semibold">
              Chegou o grande dia do nosso casamento!
            </p>
          </div>
        ) : (
          <div
            role="timer"
            aria-label="Tempo restante até o casamento"
            className="mt-8 grid grid-cols-4 gap-2.5 sm:gap-5 max-w-xl mx-auto"
          >
            <div className="bg-white border border-[#C9DDF3] rounded-xl py-4 sm:py-6 px-2 shadow-xs">
              <span
                data-testid="countdown-days"
                className="block font-serif-display text-3xl sm:text-5xl font-semibold text-[#0F2347] tabular-nums"
              >
                {countdown.days}
              </span>
              <span className="mt-1 block text-xs sm:text-sm text-[#5A78A3]">
                Dias
              </span>
            </div>

            <div className="bg-white border border-[#C9DDF3] rounded-xl py-4 sm:py-6 px-2 shadow-xs">
              <span
                data-testid="countdown-hours"
                className="block font-serif-display text-3xl sm:text-5xl font-semibold text-[#0F2347] tabular-nums"
              >
                {padTwo(countdown.hours)}
              </span>
              <span className="mt-1 block text-xs sm:text-sm text-[#5A78A3]">
                Horas
              </span>
            </div>

            <div className="bg-white border border-[#C9DDF3] rounded-xl py-4 sm:py-6 px-2 shadow-xs">
              <span
                data-testid="countdown-minutes"
                className="block font-serif-display text-3xl sm:text-5xl font-semibold text-[#0F2347] tabular-nums"
              >
                {padTwo(countdown.minutes)}
              </span>
              <span className="mt-1 block text-xs sm:text-sm text-[#5A78A3]">
                Minutos
              </span>
            </div>

            <div className="bg-[#E6F0FA]/60 border border-[#89C2FA] rounded-xl py-4 sm:py-6 px-2 shadow-xs">
              <span
                data-testid="countdown-seconds"
                className="block font-serif-display text-3xl sm:text-5xl font-semibold text-[#1B448C] tabular-nums"
              >
                {padTwo(countdown.seconds)}
              </span>
              <span className="mt-1 block text-xs sm:text-sm text-[#1B448C] font-medium">
                Segundos
              </span>
            </div>
          </div>
        )}

        <BotanicalDivider className="my-12" />

        {/* 05. Monthly Calendar Card in Azul Royal & Azul Celeste */}
        <div className="max-w-md mx-auto bg-white border border-[#C9DDF3] rounded-2xl p-6 sm:p-8 shadow-[0_12px_34px_rgba(27,68,140,0.06)]">
          <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#0F2347] lowercase">
            {dateAndTime.monthName.toLowerCase()} de {dateAndTime.year}
          </h3>
          <p className="mt-1 text-xs text-[#5A78A3]">
            Marque esta manhã especial em sua agenda
          </p>

          <div className="mt-6">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 pb-3 border-b border-[#63A4E8]/50 text-xs font-medium text-[#1B448C]">
              {WEEKDAY_HEADERS.map((weekday) => (
                <div key={weekday} className="text-center">
                  {weekday}
                </div>
              ))}
            </div>

            {/* Calendar Weeks Matrix */}
            <div
              className="mt-3 space-y-1.5"
              role="grid"
              aria-label={`Calendário de ${dateAndTime.monthName} de ${dateAndTime.year}`}
            >
              {calendarWeeks.map((week, weekIdx) => (
                <div key={weekIdx} role="row" className="grid grid-cols-7 items-center">
                  {week.map((cell, cellIdx) => {
                    if (!cell.day) {
                      return <div key={cellIdx} role="gridcell" className="h-10 sm:h-11" />;
                    }

                    if (cell.isWeddingDay) {
                      return (
                        <div
                          key={cellIdx}
                          role="gridcell"
                          aria-selected="true"
                          aria-label={`Dia ${cell.day} de ${dateAndTime.monthName} de ${dateAndTime.year} — Dia do Casamento`}
                          className="relative h-10 sm:h-11 flex items-center justify-center"
                        >
                          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1B448C] text-white font-semibold text-sm shadow-sm ring-2 ring-[#89C2FA]">
                            <Heart
                              aria-hidden="true"
                              className="absolute -top-1 -right-1 w-3.5 h-3.5 fill-[#63A4E8] text-white"
                            />
                            <span className="tabular-nums">{cell.day}</span>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={cellIdx}
                        role="gridcell"
                        className="h-10 sm:h-11 flex items-center justify-center text-sm text-[#2C4A7A] tabular-nums"
                      >
                        {cell.day}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#C9DDF3] flex items-center justify-between text-xs text-[#2C4A7A]">
            <span>{dateAndTime.dayOfWeek}, {dateAndTime.formattedDateDots}</span>
            <span className="font-medium text-[#1B448C]">
              Recepção {dateAndTime.receptionTime} · Cerimônia {dateAndTime.ceremonyTime}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
