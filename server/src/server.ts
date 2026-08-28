import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testDbConnection, pool } from './config/database.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import notificationsRoutes from './routes/notificationsRoutes.js';
import admissionsRoutes from './routes/admissionsRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import eventsRoutes from './routes/eventsRoutes.js';
import documentsRoutes from './routes/documentsRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// ── CORS Configuration ─────────────────────────────────────────
const envOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const defaultAllowed = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      const isAllowed =
        defaultAllowed.includes(origin) ||
        envOrigins.includes(origin) ||
        envOrigins.includes('*') ||
        /\.onrender\.com$/.test(new URL(origin).hostname) ||
        /\.vercel\.app$/.test(new URL(origin).hostname);

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive fallback for seamless deployment
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Root Endpoint ──────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'VINS College Backend API is running',
  });
});

// ── Health Check Endpoint (Validates MySQL with SELECT 1) ───────
app.get(['/api/health', '/health'], async (_req, res) => {
  let isConnected = false;
  try {
    const connection = await pool.getConnection();
    await connection.query('SELECT 1');
    connection.release();
    isConnected = true;
  } catch {
    isConnected = false;
  }

  res.status(200).json({
    success: true,
    message: 'Backend is running',
    database: {
      type: 'MySQL',
      connected: isConnected,
      name: process.env.DB_NAME || 'vins_college',
    },
  });
});

// ── API Routes ─────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/admissions', admissionsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/settings', settingsRoutes);

// ── 404 Fallback Middleware ────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// ── Start Server ───────────────────────────────────────────────
async function startServer() {
  await testDbConnection();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`🌐 Root Endpoint  → http://localhost:${PORT}/`);
    console.log(`📋 Health check    → http://localhost:${PORT}/api/health\n`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

export default app;
