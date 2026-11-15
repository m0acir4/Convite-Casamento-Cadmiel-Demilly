import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const RSVP_FILE = path.join(DATA_DIR, 'rsvps.json');

interface StoredRsvp {
  id: string;
  fullName: string;
  attending: 'yes' | 'no';
  companionsCount: number;
  totalPeople: number;
  phone: string;
  dietaryNotes: string;
  createdAt: string;
}

function readRsvps(): StoredRsvp[] {
  try {
    if (!fs.existsSync(RSVP_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(RSVP_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRsvps(records: StoredRsvp[]): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(RSVP_FILE, JSON.stringify(records, null, 2), 'utf-8');
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '1mb' }));

  // API: Listar confirmações de presença reais
  app.get('/api/rsvp', (_req, res) => {
    const records = readRsvps();
    res.json({ records });
  });

  // API: Registrar nova confirmação de presença real
  app.post('/api/rsvp', (req, res) => {
    const body = req.body || {};
    const fullName = String(body.fullName || '').trim().replace(/\s+/g, ' ');
    const attending = body.attending === 'yes' ? 'yes' : body.attending === 'no' ? 'no' : '';
    const rawCompanions = Number.isFinite(Number(body.companionsCount))
      ? Math.max(0, Math.min(10, Math.floor(Number(body.companionsCount))))
      : 0;
    const phone = String(body.phone || '').trim().slice(0, 40);
    const dietaryNotes = String(body.dietaryNotes || '').trim().slice(0, 400);

    if (fullName.length < 3 || !attending) {
      res.status(400).json({
        error: 'Informe seu nome completo e selecione se poderá comparecer.',
      });
      return;
    }

    const effectiveCompanions = attending === 'yes' ? rawCompanions : 0;
    const newRecord: StoredRsvp = {
      id: `rsvp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      fullName,
      attending,
      companionsCount: effectiveCompanions,
      totalPeople: attending === 'yes' ? 1 + effectiveCompanions : 0,
      phone,
      dietaryNotes,
      createdAt: new Date().toISOString(),
    };

    const existing = readRsvps();
    const updated = [newRecord, ...existing];
    writeRsvps(updated);

    res.status(201).json({
      record: newRecord,
      records: updated,
    });
  });

  // API: Remover um registro de RSVP (para gestão dos noivos)
  app.delete('/api/rsvp/:id', (req, res) => {
    const { id } = req.params;
    const existing = readRsvps();
    const updated = existing.filter((item) => item.id !== id);
    writeRsvps(updated);
    res.json({ records: updated });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Wedding Invitation Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
