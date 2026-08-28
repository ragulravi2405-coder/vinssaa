import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDatabase(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn('⚠️  MONGODB_URI is not set. Backend running in standalone mode.');
    return;
  }

  try {
    await mongoose.connect(mongoUri, {
      dbName: process.env.DB_NAME || 'vins_college',
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`🟢 MongoDB Connected Successfully (Database: ${mongoose.connection.name})`);
  } catch (error: any) {
    console.error(`🔴 MongoDB Connection Error: ${error.message}`);
  }

  mongoose.connection.on('error', (err: any) => {
    console.error(`🔴 MongoDB Connection Error: ${err.message}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB Disconnected. Attempting reconnection...');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('🟢 MongoDB Reconnected Successfully');
  });
}

export default mongoose;
