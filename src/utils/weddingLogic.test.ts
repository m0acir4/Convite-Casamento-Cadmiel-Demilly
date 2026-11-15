import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCountdown,
  generateCalendarWeeks,
  buildGoogleCalendarUrl,
} from './weddingLogic';
import { WEDDING_CONFIG } from '../config/weddingConfig';

test('calculateCountdown calculates exact days, hours, minutes, and seconds to 26.12.2026 at 07h30', () => {
  const target = WEDDING_CONFIG.dateAndTime.isoDate;
  assert.equal(target, '2026-12-26T07:30:00-03:00');

  const targetMs = new Date(target).getTime();
  const offsetMs = ((10 * 86400) + (2 * 3600) + (15 * 60) + 30) * 1000;
  const result = calculateCountdown(target, targetMs - offsetMs);

  assert.equal(result.isPast, false);
  assert.equal(result.days, 10);
  assert.equal(result.hours, 2);
  assert.equal(result.minutes, 15);
  assert.equal(result.seconds, 30);
});

test('WEDDING_CONFIG has updated times (07h00 reception, 07h30 celebration and ceremony)', () => {
  assert.equal(WEDDING_CONFIG.dateAndTime.receptionTime, '07h00');
  assert.equal(WEDDING_CONFIG.dateAndTime.celebrationTime, '07h30');
  assert.equal(WEDDING_CONFIG.dateAndTime.ceremonyTime, '07h30');
});

test('WEDDING_CONFIG has the 4 reserved colors (Azul-claro, Azul-escuro, Branco, Preto)', () => {
  assert.equal(
    WEDDING_CONFIG.reservedColors.title,
    'CORES QUE NÃO DEVEM SER UTILIZADAS'
  );
  const colorNames = WEDDING_CONFIG.reservedColors.items.map((i) => i.name);
  assert.deepEqual(colorNames, [
    'Azul-claro',
    'Azul-escuro',
    'Branco',
    'Preto',
  ]);
});

test('WEDDING_CONFIG has Roteiro da Manhã with exact 5 moments', () => {
  assert.equal(WEDDING_CONFIG.schedule.sectionTitle, 'ROTEIRO DA MANHÃ');
  assert.equal(WEDDING_CONFIG.schedule.items.length, 5);
  assert.equal(WEDDING_CONFIG.schedule.items[0].time, '07h00');
  assert.equal(WEDDING_CONFIG.schedule.items[0].title, 'Chegada');
  assert.equal(WEDDING_CONFIG.schedule.items[1].time, '07h30');
  assert.equal(WEDDING_CONFIG.schedule.items[1].title, 'O Grande Sim');
  assert.equal(WEDDING_CONFIG.schedule.items[2].time, '08h30');
  assert.equal(WEDDING_CONFIG.schedule.items[2].title, 'Celebração');
  assert.equal(WEDDING_CONFIG.schedule.items[3].time, '09h00');
  assert.equal(WEDDING_CONFIG.schedule.items[3].title, 'Café da Manhã');
  assert.equal(WEDDING_CONFIG.schedule.items[4].time, '11h30');
  assert.equal(WEDDING_CONFIG.schedule.items[4].title, 'Até logo');
});

test('WEDDING_CONFIG has Google Forms RSVP link and PIX gift key', () => {
  assert.equal(WEDDING_CONFIG.rsvp.sectionTitle, 'CONFIRME SUA PRESENÇA AQUI');
  assert.equal(WEDDING_CONFIG.rsvp.buttonLabel, 'CONFIRMAR PRESENÇA');
  assert.equal(
    WEDDING_CONFIG.rsvp.googleFormsUrl,
    'https://forms.gle/xNQk3nZJTUBaxDWKA'
  );
  assert.equal(
    WEDDING_CONFIG.pixGift.mainQuote,
    'Nosso maior presente é ter você conosco.'
  );
  assert.equal(WEDDING_CONFIG.pixGift.pixKeyEmail, 'demillymoura231@gmail.com');
});

test('generateCalendarWeeks generates December 2026 accurately with Saturday the 26th highlighted', () => {
  const weeks = generateCalendarWeeks(2026, 12, 26);
  assert.equal(weeks.length, 5);

  const allCells = weeks.flat();
  const weddingCell = allCells.find((c) => c.day === 26);
  assert.ok(weddingCell);
  assert.equal(weddingCell.isWeddingDay, true);
  assert.equal(weddingCell.dayOfWeekIndex, 5);
});

test('buildGoogleCalendarUrl encodes wedding details accurately', () => {
  const url = buildGoogleCalendarUrl({
    title: 'Casamento Cadmiel & Demilly',
    startIso: WEDDING_CONFIG.dateAndTime.isoDate,
    endIso: WEDDING_CONFIG.dateAndTime.endIsoDate,
    location: 'Espaço de Eventos Monte Sião, Rua Pará, Nº 8A, Piratininga',
    details: 'Celebração do casamento de Cadmiel e Demilly',
  });
  assert.ok(url.startsWith('https://calendar.google.com/calendar/render?'));
  assert.ok(url.includes('Monte+Si%C3%A3o'));
});
