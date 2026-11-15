import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingConfig';
import { BotanicalDivider } from './BotanicalOrnament';

/**
 * 06. GALERIA DE FOTOS
 * Exibe exclusivamente o título "Galeria de Fotografias" no topo e as 5 fotos
 * oficiais do casal sem textos/descrições sobrepostas, com Lightbox ao clicar.
 */
export const PhotoGallerySection: React.FC = () => {
  const { gallery } = WEDDING_CONFIG;
  const photos = gallery.photos;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % photos.length
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev - 1 + photos.length) % photos.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, photos.length]);

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <section
      id="galeria"
      aria-labelledby="heading-galeria"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      {/* Header: apenas "Galeria de Fotografias" */}
      <div className="text-center mb-10">
        <h2
          id="heading-galeria"
          className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#0F2347] tracking-tight"
        >
          {gallery.sectionTitle}
        </h2>
        <BotanicalDivider className="mt-4 mb-2" />
      </div>

      {/* Sophisticated Bento Grid for the 5 Couple Photos (No descriptions on photos) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
        {photos.map((photo, index) => {
          // Photo 1 (Proposal) highlighted on the left; Photos 2, 3, 4, 5 in a balanced 2x2 grid on the right
          const gridSpanClass =
            index === 0
              ? 'sm:col-span-2 lg:col-span-6 lg:row-span-2 min-h-[380px] sm:min-h-[480px] lg:h-[640px]'
              : 'sm:col-span-1 lg:col-span-3 min-h-[300px] sm:min-h-[310px] lg:h-[310px]';

          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Ampliar ${photo.alt}`}
              className={`group relative overflow-hidden rounded-2xl bg-white border border-[#C9DDF3] shadow-[0_10px_30px_rgba(27,68,140,0.07)] hover:shadow-[0_16px_38px_rgba(27,68,140,0.14)] transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B448C] ${gridSpanClass}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />

              {/* Subtle expand icon in the corner on hover — no text descriptions */}
              <span
                aria-hidden="true"
                className="absolute bottom-3 right-3 p-2.5 rounded-full bg-[#0F2347]/55 backdrop-blur-xs text-white opacity-80 group-hover:opacity-100 group-hover:bg-[#1B448C] transition-all"
              >
                <Expand className="w-4 h-4" />
              </span>
            </button>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal (Clean, without descriptions) */}
      {activePhoto !== null && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de Fotografias em Tela Cheia"
          className="fixed inset-0 z-50 bg-[#0F2347]/92 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setActiveIndex(null)}
        >
          {/* Top Bar: Counter & Close Button */}
          <div
            className="max-w-5xl w-full mx-auto flex items-center justify-between text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs sm:text-sm font-medium tabular-nums text-white/85">
              {activeIndex + 1} / {photos.length}
            </span>

            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Fechar galeria em tela cheia"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Fechar</span>
            </button>
          </div>

          {/* Center Media & Prev/Next Controls */}
          <div
            className="relative max-w-4xl w-full mx-auto my-auto flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() =>
                setActiveIndex((activeIndex - 1 + photos.length) % photos.length)
              }
              aria-label="Fotografia anterior"
              className="absolute left-1 sm:-left-12 z-20 p-3 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="max-h-[82vh] flex items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 sm:p-2 border border-[#C9DDF3] shadow-2xl">
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                referrerPolicy="no-referrer"
                className="max-h-[78vh] w-auto object-contain rounded-xl mx-auto"
              />
            </div>

            <button
              type="button"
              onClick={() => setActiveIndex((activeIndex + 1) % photos.length)}
              aria-label="Próxima fotografia"
              className="absolute right-1 sm:-right-12 z-20 p-3 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div aria-hidden="true" className="h-4" />
        </div>
      )}
    </section>
  );
};
