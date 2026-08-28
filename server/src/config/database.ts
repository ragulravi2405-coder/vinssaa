import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

export async function connectDatabase(): Promise<void> {
  if (!MONGODB_URI) {
    console.warn('⚠️  MONGODB_URI is not set. Running in standalone mode (no database).');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: process.env.DB_NAME || 'vins_college',
    });
    console.log(`🟢 MongoDB Connected Successfully → db: ${mongoose.connection.name}`);
  } catch (error: any) {
    console.error('❌ MongoDB Connection Error:', error.message);
    // Don't crash the server — let endpoints handle the lack of DB gracefully
  }

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB Unexpected Error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB Disconnected. Attempting to reconnect...');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('🟢 MongoDB Reconnected Successfully');
  });
}

export default mongoose;
