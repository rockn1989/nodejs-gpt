import { logger } from '@/infrastructure/logger';
import { Pool, PoolClient } from 'pg';

let pool: Pool | null = null;

function createPool(): Pool {
	const connectionString = process.env.DATABASE_URL;

	if (connectionString) {
		return new Pool({ connectionString });
	}

	return new Pool({
		host: process.env.DB_HOST ?? 'localhost',
		port: Number(process.env.DB_PORT ?? 5432),
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	});
}

export function getPool(): Pool {
	if (!pool) {
		pool = createPool();

		pool.on('error', (err) => {
			logger.error({ err }, 'Postgres pool error');
		});
	}

	return pool;
}

/**
 * Инициализация БД: проверяем, что можем подключиться.
 * Это не "SELECT 1", а проверка реального соединения + release.
 */
export async function dbInit(): Promise<void> {
	const p = getPool();
	const client: PoolClient = await p.connect();
	try {
		// минимальный запрос для уверенности, что всё реально работает
		await client.query('SELECT 1');
		logger.info('DB connected ✅');
	} finally {
		client.release();
	}
}

/**
 * Корректное завершение: закрываем пул.
 */
export async function dbClose(): Promise<void> {
	if (!pool) return;
	await pool.end();
	pool = null;
	logger.info('DB closed 📴');
}

/**
 * Удобный помощник для запросов (если не хочешь везде светить getPool()).
 */
export async function dbQuery<T = any>(text: string, params?: any[]): Promise<{ rows: T[] }> {
	const p = getPool();
	const res = await p.query(text, params);
	return { rows: res.rows as T[] };
}

/**
 * Проверка здоровья БД для health check endpoint.
 * Выполняет простой запрос для проверки подключения.
 */
export async function dbHealthCheck(): Promise<void> {
	const p = getPool();
	const client: PoolClient = await p.connect();
	try {
		await client.query('SELECT 1');
	} finally {
		client.release();
	}
}