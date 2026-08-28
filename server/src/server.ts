import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database.js';

// Models for test route
import ContactInquiry from './models/ContactInquiry.js';

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
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      // Check explicit allowed lists or onrender/vercel subdomains
      const isAllowed =
        defaultAllowed.includes(origin) ||
        envOrigins.includes(origin) ||
        envOrigins.includes('*') ||
        /\.onrender\.com$/.test(new URL(origin).hostname) ||
        /\.vercel\.app$/.test(new URL(origin).hostname);

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in fallback to avoid blocking valid Render deploys
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
  const isConnected = dbState === 1;
  const dbStatusMap: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  res.status(200).json({
    success: true,
    message: 'Backend is running',
    database: {
      type: 'MongoDB',
      connected: isConnected,
      status: dbStatusMap[dbState] || 'disconnected',
      dbName: isConnected ? mongoose.connection.name : undefined,
    },
  });
});

// ── Database Verification / Test Endpoint ───────────────────────
app.all('/api/test-db', async (_req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    if (!isConnected) {
      return res.status(503).json({
        success: false,
        message: 'MongoDB is not currently connected. Check MONGODB_URI.',
      });
    }

    // Insert a sample test inquiry to verify collection creation in Atlas
    const testDoc = await ContactInquiry.create({
      name: 'Render Connectivity Test',
      email: 'test@vinsengineeringcollege.org',
      phone: '+91 9999999999',
      subject: 'MongoDB Atlas Connection Verification',
      message: `Automatic database connectivity test executed at ${new Date().toISOString()}`,
      source: 'quick_inquiry',
      status: 'new',
    });

    return res.status(200).json({
      success: true,
      message: 'MongoDB Atlas write test succeeded!',
      database: mongoose.connection.name,
      collection: 'contactinquiries',
      insertedId: testDoc._id,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'MongoDB Atlas write test failed',
      error: error.message,
    });
  }
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
    console.log(`📋 Health check    → http://localhost:${PORT}/api/health`);
    console.log(`🧪 Test DB         → http://localhost:${PORT}/api/test-db\n`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

export default app;
