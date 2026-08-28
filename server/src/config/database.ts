import mysql, { Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create MySQL connection pool with production-ready settings
export const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'vins_college',
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  charset: 'utf8mb4',
});

/**
 * Execute a parameterized SQL query safely using connection pooling
 */
export async function executeQuery<T = any>(sql: string, params: any[] = []): Promise<T> {
  const [results] = await pool.execute(sql, params);
  return results as T;
}

/**
 * Verify MySQL database connectivity with a safe SELECT 1 probe
 */
export async function testDbConnection(): Promise<boolean> {
  try {
    const connection = await pool.getConnection();
    await connection.query('SELECT 1');
    connection.release();
    console.log('🟢 MySQL Connected Successfully');
    return true;
  } catch (error: any) {
    console.error(`🔴 MySQL Connection Error: ${error.message}`);
    return false;
  }
}

export default pool;
