import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { WEDDING_CONFIG } from './config/weddingConfig';
import { TopNavbar } from './components/TopNavbar';
import { CoverSection } from './components/CoverSection';
import { CouplePresentationSection } from './components/CouplePresentationSection';
import { CountdownAndCalendarSection } from './components/CountdownAndCalendarSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { LocationSection } from './components/LocationSection';
import { DressCodeSection } from './components/DressCodeSection';
import { ScheduleSection } from './components/ScheduleSection';
import { RsvpSection } from './components/RsvpSection';
import { PixGiftSection } from './components/PixGiftSection';
import { CoralSprigsHeader } from './components/BotanicalOrnament';

export default function App() {
  const [isOpened, setIsOpened] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('autostart') === '1';
  });

  useEffect(() => {
    if (isOpened && window.location.search.includes('autostart=1')) {
      const target = document.getElementById('casamento');
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpened]);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    const nextSection = document.getElementById('casamento');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToRsvp = () => {
    setIsOpened(true);
    const rsvpElement = document.getElementById('rsvp');
    if (rsvpElement) {
      rsvpElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col paper-texture text-[#0F2347]">
      {/* 3-Zone Top Navigation Bar in Azul Royal & Azul Celeste */}
      <TopNavbar onOpenRsvpSection={handleScrollToRsvp} />

      <main className="flex-1">
        {/* 01. Capa Principal */}
        <CoverSection
          isOpened={isOpened}
          onOpenInvitation={handleOpenInvitation}
        />

        {/* 02. Apresentação dos Noivos & 03. Informações do Casamento */}
        <CouplePresentationSection />

        {/* 04. Contagem Regressiva & 05. Calendário Mensal */}
        <CountdownAndCalendarSection />

        {/* 06. Galeria de Fotos */}
        <PhotoGallerySection />

        {/* 07. Localização do Evento (Espaço de Eventos Monte Sião) */}
        <LocationSection />

        {/* 08. Cores que não devem ser utilizadas */}
        <DressCodeSection />

        {/* 09. Programação do Evento (Roteiro da Manhã) */}
        <ScheduleSection />

        {/* 10. Confirmação de Presença (Google Forms) */}
        <RsvpSection />

        {/* 11. Seção Especial de Presente via PIX */}
        <PixGiftSection />
      </main>

      {/* Romantic Editorial Footer in Azul Royal & Azul Celeste */}
      <footer className="border-t border-[#C9DDF3] bg-white py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <CoralSprigsHeader className="mb-3" />
          <p className="font-script text-4xl sm:text-5xl text-[#0F2347]">
            {WEDDING_CONFIG.couple.groomName} {WEDDING_CONFIG.couple.connector}{' '}
            {WEDDING_CONFIG.couple.brideName}
          </p>
          <p className="mt-2 font-serif-display text-lg text-[#1B448C]">
            {WEDDING_CONFIG.dateAndTime.formattedDateDots} ·{' '}
            {WEDDING_CONFIG.dateAndTime.celebrationTime} ·{' '}
            {WEDDING_CONFIG.location.venueName}
          </p>
          <p className="mt-1 text-xs text-[#5A78A3]">
            {WEDDING_CONFIG.location.streetAddress} ·{' '}
            {WEDDING_CONFIG.location.cityState}
          </p>

          <div className="mt-6 pt-6 border-t border-[#C9DDF3]/70 flex items-center justify-center gap-1.5 text-xs text-[#5A78A3]">
            <span>Esperamos você para celebrar conosco esta manhã inesquecível</span>
            <Heart className="w-3.5 h-3.5 text-[#1B448C] fill-[#63A4E8]" />
          </div>
        </div>
      </footer>
    </div>
  );
}
