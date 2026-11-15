/**
 * Pure business logic for the Web Wedding Invitation:
 * - Real-time countdown calculation
 * - Monthly calendar matrix generation (Monday-first, matching reference PDF)
 * - RSVP input validation & sanitization
 * - CSV export formatting for confirmed guests
 * - ICS / Google Calendar link generation
 */

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isPast: boolean;
}

export interface CalendarCell {
  day: number | null;
  isCurrentMonth: boolean;
  isWeddingDay: boolean;
  dayOfWeekIndex: number; // 0 = Seg, 6 = Dom
}

export interface RsvpSubmissionInput {
  fullName: string;
  attending: 'yes' | 'no' | '';
  companionsCount: number;
  phone?: string;
  dietaryNotes?: string;
}

export interface RsvpRecord {
  id: string;
  fullName: string;
  attending: 'yes' | 'no';
  companionsCount: number;
  totalPeople: number;
  phone: string;
  dietaryNotes: string;
  createdAt: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: {
    fullName?: string;
    attending?: string;
    companionsCount?: string;
    phone?: string;
  };
  sanitized?: {
    fullName: string;
    attending: 'yes' | 'no';
    companionsCount: number;
    totalPeople: number;
    phone: string;
    dietaryNotes: string;
  };
}

/**
 * Calculates remaining days, hours, minutes, and seconds until target ISO date.
 */
export function calculateCountdown(targetIsoDate: string, nowMs: number = Date.now()): CountdownTime {
  const targetMs = new Date(targetIsoDate).getTime();
  if (Number.isNaN(targetMs)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0, isPast: false };
  }

  const diffMs = targetMs - nowMs;
  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0, isPast: true };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    isPast: false,
  };
}

/**
 * Generates a Monday-first ("seg.", "ter.", "qua.", "qui.", "sex.", "sáb.", "dom.")
 * calendar weeks matrix for a given year and 1-indexed month (1 = Jan, 12 = Dec).
 */
export function generateCalendarWeeks(
  year: number,
  month: number,
  weddingDay: number
): CalendarCell[][] {
  const firstDayOfMonth = new Date(Date.UTC(year, month - 1, 1));
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

  // Convert JS UTC day (0=Sun, 1=Mon, ..., 6=Sat) to Monday-first index (0=Mon, ..., 6=Sun)
  const jsDay = firstDayOfMonth.getUTCDay();
  const mondayFirstOffset = (jsDay + 6) % 7;

  const weeks: CalendarCell[][] = [];
  let currentWeek: CalendarCell[] = [];

  for (let i = 0; i < mondayFirstOffset; i++) {
    currentWeek.push({
      day: null,
      isCurrentMonth: false,
      isWeddingDay: false,
      dayOfWeekIndex: i,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayOfWeekIndex = currentWeek.length;
    currentWeek.push({
      day,
      isCurrentMonth: true,
      isWeddingDay: day === weddingDay,
      dayOfWeekIndex,
    });

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({
        day: null,
        isCurrentMonth: false,
        isWeddingDay: false,
        dayOfWeekIndex: currentWeek.length,
      });
    }
    weeks.push(currentWeek);
  }

  return weeks;
}

/**
 * Validates RSVP form input strictly without substituting fake fallback names.
 */
export function validateRsvpInput(
  input: RsvpSubmissionInput,
  maxCompanions: number = 5
): ValidationResult {
  const errors: ValidationResult['errors'] = {};
  const trimmedName = (input.fullName || '').trim().replace(/\s+/g, ' ');

  if (!trimmedName) {
    errors.fullName = 'Por favor, informe seu nome completo.';
  } else if (trimmedName.length < 3) {
    errors.fullName = 'O nome deve ter pelo menos 3 caracteres.';
  }

  if (input.attending !== 'yes' && input.attending !== 'no') {
    errors.attending = 'Selecione se você poderá comparecer ao casamento.';
  }

  const rawCompanions = Number.isFinite(input.companionsCount)
    ? Math.floor(input.companionsCount)
    : 0;

  if (rawCompanions < 0 || rawCompanions > maxCompanions) {
    errors.companionsCount = `O número de acompanhantes deve estar entre 0 e ${maxCompanions}.`;
  }

  const trimmedPhone = (input.phone || '').trim();
  if (trimmedPhone && trimmedPhone.replace(/\D/g, '').length < 8) {
    errors.phone = 'Informe um telefone/WhatsApp válido com DDD ou deixe em branco.';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  const attending = input.attending as 'yes' | 'no';
  const effectiveCompanions = attending === 'yes' ? rawCompanions : 0;

  return {
    valid: true,
    errors: {},
    sanitized: {
      fullName: trimmedName,
      attending,
      companionsCount: effectiveCompanions,
      totalPeople: attending === 'yes' ? 1 + effectiveCompanions : 0,
      phone: trimmedPhone,
      dietaryNotes: (input.dietaryNotes || '').trim().slice(0, 400),
    },
  };
}

/**
 * Computes summary statistics from real RSVP records.
 */
export function computeRsvpStats(records: RsvpRecord[]) {
  let confirmedFamilies = 0;
  let declinedFamilies = 0;
  let totalConfirmedGuests = 0;

  for (const rec of records) {
    if (rec.attending === 'yes') {
      confirmedFamilies += 1;
      totalConfirmedGuests += rec.totalPeople;
    } else {
      declinedFamilies += 1;
    }
  }

  return {
    totalResponses: records.length,
    confirmedFamilies,
    declinedFamilies,
    totalConfirmedGuests,
  };
}

/**
 * Formats RSVP records into a valid UTF-8 CSV string.
 */
export function formatRsvpCsv(records: RsvpRecord[]): string {
  const header = [
    'Nome do Convidado',
    'Confirmado',
    'Acompanhantes',
    'Total de Pessoas',
    'Telefone/WhatsApp',
    'Observacoes',
    'Data de Confirmacao',
  ];

  const escapeCsvCell = (val: string | number) => {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = records.map((r) =>
    [
      r.fullName,
      r.attending === 'yes' ? 'Sim' : 'Não',
      r.companionsCount,
      r.totalPeople,
      r.phone,
      r.dietaryNotes,
      r.createdAt,
    ]
      .map(escapeCsvCell)
      .join(',')
  );

  return [header.join(','), ...rows].join('\n');
}

/**
 * Builds a Google Calendar event creation URL.
 */
export function buildGoogleCalendarUrl(params: {
  title: string;
  startIso: string;
  endIso: string;
  location: string;
  details: string;
}): string {
  const formatGCalDate = (iso: string) =>
    new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const dates = `${formatGCalDate(params.startIso)}/${formatGCalDate(params.endIso)}`;
  const searchParams = new URLSearchParams({
    action: 'TEMPLATE',
    text: params.title,
    dates,
    location: params.location,
    details: params.details,
  });

  return `https://calendar.google.com/calendar/render?${searchParams.toString()}`;
}

/**
 * Builds an RFC 5545 .ics calendar file string for mobile/desktop calendar apps.
 */
export function buildIcsContent(params: {
  title: string;
  startIso: string;
  endIso: string;
  location: string;
  details: string;
}): string {
  const formatIcsDate = (iso: string) =>
    new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Cadmiel e Demilly//Convite de Casamento//PT',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `DTSTART:${formatIcsDate(params.startIso)}`,
    `DTEND:${formatIcsDate(params.endIso)}`,
    `SUMMARY:${params.title}`,
    `LOCATION:${params.location}`,
    `DESCRIPTION:${params.details.replace(/\n/g, '\\n')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
