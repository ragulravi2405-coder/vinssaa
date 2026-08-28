import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database.js';

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

// ── Middleware ─────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:3000,https://vinssaa.vercel.app').split(',');
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin ${origin} not allowed`));
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

// ── Health Check Endpoints ─────────────────────────────────────
app.get(['/api/health', '/health'], (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  const currentDbStatus = dbStatusMap[dbState] || 'disconnected';

  res.status(200).json({
    success: true,
    message: 'Backend is running',
    database: 'MongoDB',
    dbStatus: currentDbStatus,
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
  await connectDatabase();
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
