/**
 * ============================================================================
 * ARQUIVO CENTRAL DE CONFIGURAÇÃO DO CONVITE DE CASAMENTO
 * ============================================================================
 * Identidade Visual: Azul Royal & Azul Celeste
 * Noivos: Cadmiel & Demilly — 26.12.2026 às 07h30
 */

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
  iconType: 'arrival' | 'vows' | 'celebration' | 'breakfast' | 'farewell';
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  aspect: 'tall' | 'wide' | 'square';
  isPlaceholder?: boolean;
}

export interface ReservedColorItem {
  id: string;
  name: string;
  hex: string;
  borderHex: string;
  note: string;
}

export const WEDDING_CONFIG = {
  // 1. IDENTIDADE E NOIVOS
  couple: {
    groomName: 'Cadmiel',
    brideName: 'Demilly',
    fullTitle: 'Cadmiel & Demilly',
    connector: 'e',
    monogram: 'C & D',
    hashtag: '#CadmielEDemilly2026',
  },

  // 2. CAPA PRINCIPAL DO CONVITE
  cover: {
    imagePath: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_21.14.39_d2d6ba40.jpeg',
    imageAlt: 'Convite de Casamento Original — Cadmiel e Demilly — 26.12.26 — Rua Pará, Nº 8A, Piratininga',
    topKicker: 'SAVE THE DATE',
    openButtonLabel: 'Abrir Convite',
  },

  // 3. APRESENTAÇÃO DOS NOIVOS
  presentation: {
    kicker: 'Celebração do Nosso Amor',
    headline: 'Com a bênção de Deus e de nossas famílias',
    invitationMessage:
      'Há momentos na vida que se tornam ainda mais especiais quando compartilhados com quem amamos. Com o coração repleto de alegria e gratidão, convidamos você para testemunhar e celebrar conosco o início da nossa caminhada como marido e mulher.',
    quote: '“O amor é paciente, o amor é bondoso... Tudo sofre, tudo crê, tudo espera, tudo suporta.”',
    quoteReference: '1 Coríntios 13:4-7',
  },

  // 4. DATA E HORÁRIOS ATUALIZADOS DO CASAMENTO
  // Recepção: 07h00 | Celebração / Cerimônia: 07h30
  dateAndTime: {
    isoDate: '2026-12-26T07:30:00-03:00',
    endIsoDate: '2026-12-26T12:00:00-03:00',
    year: 2026,
    month: 12, // Dezembro
    day: 26,
    monthName: 'Dezembro',
    dayOfWeek: 'Sábado',
    formattedDateDots: '26 . 12 . 26',
    formattedDateFull: '26 de Dezembro de 2026',
    celebrationTime: '07h30',
    receptionTime: '07h00',
    ceremonyTime: '07h30',
    timeConfirmationNote: 'Pedimos carinho especial com a pontualidade para começarmos nossa manhã juntos.',
  },

  // 5. LOCALIZAÇÃO DO EVENTO
  location: {
    venueName: 'Espaço de Eventos Monte Sião',
    streetAddress: 'Rua Pará, Nº 8A, Piratininga',
    cityState: 'Maracanaú — CE',
    fullAddress: 'Rua Pará, Nº 8A — Piratininga, Maracanaú - CE, 61905-125',
    googleMapsShortUrl: 'https://maps.app.goo.gl/jTtucva2q66SJX4f6',
    coordinates: {
      lat: -3.8728926,
      lng: -38.6290181,
    },
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-3.8728926,-38.6290181',
    embedMapUrl:
      'https://maps.google.com/maps?q=-3.8728926,-38.6290181+(Espa%C3%A7o%20de%20Eventos%20Monte%20Si%C3%A3o)&t=&z=17&ie=UTF8&iwloc=&output=embed',
    additionalInfo:
      'Cerimônia e recepção serão realizadas no mesmo local. O espaço conta com ambiente acolhedor para celebrarmos nossa manhã especial.',
  },

  // 6. GALERIA DE FOTOS DOS NOIVOS (5 Fotos Oficiais, sem descrições)
  gallery: {
    sectionTitle: 'Galeria de Fotografias',
    photos: [
      {
        id: 'photo-1',
        src: '/assets/aistudio/Foto_1_1b77706d.PNG',
        alt: 'Fotografia 1 — Cadmiel e Demilly',
        caption: '',
        aspect: 'tall',
      },
      {
        id: 'photo-2',
        src: '/assets/aistudio/Foto_2_ccfe829f.PNG',
        alt: 'Fotografia 2 — Cadmiel e Demilly',
        caption: '',
        aspect: 'square',
      },
      {
        id: 'photo-3',
        src: '/assets/aistudio/Foto_3_4666d16e.PNG',
        alt: 'Fotografia 3 — Cadmiel e Demilly',
        caption: '',
        aspect: 'square',
      },
      {
        id: 'photo-4',
        src: '/assets/aistudio/Foto_4_94299249.PNG',
        alt: 'Fotografia 4 — Cadmiel e Demilly',
        caption: '',
        aspect: 'square',
      },
      {
        id: 'photo-5',
        src: '/assets/aistudio/Foto_5_3a80f815.PNG',
        alt: 'Fotografia 5 — Cadmiel e Demilly',
        caption: '',
        aspect: 'square',
      },
    ] as GalleryPhoto[],
  },

  // 7. CORES QUE NÃO DEVEM SER UTILIZADAS (Substitui o antigo Dress Code)
  reservedColors: {
    sectionKicker: 'Orientação Carinhosa aos Convidados',
    title: 'CORES QUE NÃO DEVEM SER UTILIZADAS',
    subtitle:
      'Para que a harmonia visual da nossa cerimônia e das fotografias fique ainda mais especial, reservamos algumas tonalidades exclusivamente para os noivos e o cortejo. Pedimos, com todo o carinho, que evitem utilizar as cores abaixo em seus trajes:',
    gentleNote:
      'Todas as demais cores e tonalidades estão livres para você celebrar conosco com leveza e elegância!',
    items: [
      {
        id: 'color-light-blue',
        name: 'Azul-claro',
        hex: '#89C2FA',
        borderHex: '#63A4E8',
        note: 'Tonalidade reservada para a identidade do casamento',
      },
      {
        id: 'color-dark-blue',
        name: 'Azul-escuro',
        hex: '#1B3F8B',
        borderHex: '#122E63',
        note: 'Tonalidade reservada para o cortejo oficial',
      },
      {
        id: 'color-white',
        name: 'Branco',
        hex: '#FFFFFF',
        borderHex: '#C9DDF3',
        note: 'Exclusivo da noiva (inclui off-white e marfim)',
      },
      {
        id: 'color-black',
        name: 'Preto',
        hex: '#161B26',
        borderHex: '#2D3748',
        note: 'Solicitamos evitar em nossa celebração matinal',
      },
    ] as ReservedColorItem[],
  },

  // 8. PROGRAMAÇÃO DO EVENTO — ROTEIRO DA MANHÃ
  schedule: {
    sectionKicker: 'Programação do Casamento',
    sectionTitle: 'ROTEIRO DA MANHÃ',
    sectionSubtitle:
      'Preparamos uma manhã cheia de amor, comunhão e alegria para celebrarmos juntos cada instante.',
    items: [
      {
        id: 'sched-1',
        time: '07h00',
        title: 'Chegada',
        description: 'Um café fresquinho espera por você para começarmos o dia.',
        iconType: 'arrival',
      },
      {
        id: 'sched-2',
        time: '07h30',
        title: 'O Grande Sim',
        description: 'Cerimônia evangélica com efeito civil no local.',
        iconType: 'vows',
      },
      {
        id: 'sched-3',
        time: '08h30',
        title: 'Celebração',
        description: 'Bênçãos, fotos e abraços apertados.',
        iconType: 'celebration',
      },
      {
        id: 'sched-4',
        time: '09h00',
        title: 'Café da Manhã',
        description: 'Um banquete matinal preparado com muito carinho para comermos juntos.',
        iconType: 'breakfast',
      },
      {
        id: 'sched-5',
        time: '11h30',
        title: 'Até logo',
        description: 'Despedida dos noivos.',
        iconType: 'farewell',
      },
    ] as ScheduleItem[],
  },

  // 9. CONFIRMAÇÃO DE PRESENÇA (RSVP via Google Forms)
  rsvp: {
    sectionKicker: 'Confirmação de Presença',
    sectionTitle: 'CONFIRME SUA PRESENÇA AQUI',
    sectionSubtitle:
      'Sua presença tornará a nossa manhã ainda mais especial! Para que possamos preparar a recepção e o nosso café da manhã com todo o cuidado, clique no botão abaixo e preencha sua confirmação rápida.',
    buttonLabel: 'CONFIRMAR PRESENÇA',
    googleFormsUrl: 'https://forms.gle/xNQk3nZJTUBaxDWKA',
  },

  // 10. SEÇÃO ESPECIAL DE PRESENTE VIA PIX
  pixGift: {
    mainQuote: 'Nosso maior presente é ter você conosco.',
    interactiveHint: 'Toque no presente acima caso deseje nos abençoar com uma lembrança',
    modalTitle: 'Carinho em Forma de Presente',
    modalDescription:
      'Sua presença em nosso casamento já é a nossa maior alegria! Caso deseje nos presentear, você pode escanear o QR Code abaixo pelo aplicativo do seu banco.',
    alternativeLabel: 'Não conseguiu escanear o QR Code? Utilize a chave PIX (E-mail):',
    pixKeyEmail: 'demillymoura231@gmail.com',
    copyButtonLabel: 'Copiar chave PIX',
    copiedConfirmationLabel: 'Chave PIX copiada!',
    // Caminho para o arquivo original do QR Code do PIX anexado (sem recriação).
    qrCodeImagePath: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_19.41.21_46dcb358.jpeg',
    qrCodeAlt: 'QR Code PIX oficial para presentear os noivos Cadmiel e Demilly',
  },
} as const;
