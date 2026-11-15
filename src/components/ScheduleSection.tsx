import React from 'react';
import {
  Camera,
  Coffee,
  Heart,
  Sparkles,
  Utensils,
} from 'lucide-react';
import { ScheduleItem, WEDDING_CONFIG } from '../config/weddingConfig';
import { BotanicalDivider } from './BotanicalOrnament';

const ScheduleIcon: React.FC<{ type: ScheduleItem['iconType'] }> = ({ type }) => {
  switch (type) {
    case 'arrival':
      return <Coffee className="w-4 h-4 text-[#1B448C]" />;
    case 'vows':
      return <Heart className="w-4 h-4 text-[#1B448C] fill-[#89C2FA]/40" />;
    case 'celebration':
      return <Camera className="w-4 h-4 text-[#1B448C]" />;
    case 'breakfast':
      return <Utensils className="w-4 h-4 text-[#1B448C]" />;
    case 'farewell':
      return <Sparkles className="w-4 h-4 text-[#1B448C]" />;
  }
};

/**
 * 09. PROGRAMAÇÃO DO EVENTO — ROTEIRO DA MANHÃ
 * Linha do tempo vertical elegante com os 5 momentos oficiais:
 * - 07h00 | Chegada
 * - 07h30 | O Grande Sim
 * - 08h30 | Celebração
 * - 09h00 | Café da Manhã
 * - 11h30 | Até logo
 */
export const ScheduleSection: React.FC = () => {
  const { schedule } = WEDDING_CONFIG;

  return (
    <section
      id="programacao"
      aria-labelledby="heading-programacao"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto"
    >
      <div className="text-center max-w-xl mx-auto">
        <p className="text-xs sm:text-sm text-[#1B448C] font-medium">
          {schedule.sectionKicker}
        </p>
        <h2
          id="heading-programacao"
          className="mt-1 font-serif-display text-3xl sm:text-4xl font-semibold text-[#0F2347] tracking-tight"
        >
          {schedule.sectionTitle}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#2C4A7A]">
          {schedule.sectionSubtitle}
        </p>
      </div>

      <BotanicalDivider className="my-8" />

      {/* Vertical Timeline Card in Azul Royal & Azul Celeste */}
      <div className="relative bg-white border border-[#C9DDF3] rounded-2xl p-6 sm:p-12 shadow-[0_14px_38px_rgba(27,68,140,0.06)]">
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical Guide Hairline in Azul Celeste */}
          <div
            aria-hidden="true"
            className="absolute left-[4.9rem] sm:left-[6.75rem] top-4 bottom-4 w-px bg-gradient-to-b from-[#89C2FA] via-[#1B448C]/40 to-[#89C2FA]"
          />

          <ol className="space-y-8 sm:space-y-10">
            {schedule.items.map((item) => (
              <li
                key={item.id}
                className="relative grid grid-cols-[4rem_2.25rem_1fr] sm:grid-cols-[5.5rem_2.75rem_1fr] items-start gap-2.5 sm:gap-4"
              >
                {/* Highlighted Time Column */}
                <div className="text-right pt-1">
                  <span className="font-serif-display text-xl sm:text-2xl font-bold text-[#1B448C] tabular-nums">
                    {item.time}
                  </span>
                </div>

                {/* Node Circle on the Timeline */}
                <div className="relative z-10 flex items-center justify-center pt-0.5">
                  <div className="w-9 h-9 rounded-full bg-[#F4F8FD] border-2 border-[#63A4E8] flex items-center justify-center shadow-xs">
                    <ScheduleIcon type={item.iconType} />
                  </div>
                </div>

                {/* Moment Title & Description */}
                <div className="pt-0.5 pb-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-[#63A4E8] hidden sm:inline" aria-hidden="true">
                      |
                    </span>
                    <h3 className="font-serif-display text-xl sm:text-2xl font-semibold text-[#0F2347]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-[#2C4A7A] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
