import { logger } from '@/infrastructure/logger';
import type { PoolClient, PoolConfig } from 'pg';
import { Pool } from 'pg';

let pool: Pool | null = null;

/**
 * Получает конфигурацию для PostgreSQL pool из переменных окружения
 */
function getPoolConfig(): PoolConfig {
	const connectionString = process.env.DATABASE_URL;

	// Базовая конфигурация pool
	const poolConfig: PoolConfig = {
		// Максимальное количество клиентов в пуле
		max: Number(process.env.DB_POOL_MAX ?? 10),

		// Минимальное количество клиентов (всегда активных)
		min: Number(process.env.DB_POOL_MIN ?? 2),

		// Время ожидания подключения из пула (30 секунд)
		connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT ?? 30000),

		// Время простоя клиента перед закрытием (30 секунд)
		idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT ?? 30000),

		// Максимальное время жизни клиента (30 минут)
		maxLifetimeSeconds: Number(process.env.DB_MAX_LIFETIME ?? 1800),

		// Таймаут выполнения запроса (10 секунд)
		query_timeout: Number(process.env.DB_QUERY_TIMEOUT ?? 10000),

		// PostgreSQL statement_timeout (15 секунд)
		statement_timeout: Number(process.env.DB_STATEMENT_TIMEOUT ?? 15000),
	};

	// Если указан connection string, используем его
	if (connectionString) {
		poolConfig.connectionString = connectionString;
	} else {
		// Иначе используем отдельные параметры
		poolConfig.host = process.env.DB_HOST ?? 'localhost';
		poolConfig.port = Number(process.env.DB_PORT ?? 5432);
		poolConfig.user = process.env.DB_USER;
		poolConfig.password = process.env.DB_PASSWORD;
		poolConfig.database = process.env.DB_NAME;
	}

	return poolConfig;
}

function createPool(): Pool {
	const config = getPoolConfig();

	logger.info(
		{
			max: config.max,
			min: config.min,
			connectionTimeout: config.connectionTimeoutMillis,
			idleTimeout: config.idleTimeoutMillis,
			queryTimeout: config.query_timeout,
		},
		'Creating PostgreSQL pool',
	);

	return new Pool(config);
}

export function getPool(): Pool {
	if (!pool) {
		pool = createPool();

		// Обработка ошибок pool
		pool.on('error', (err) => {
			logger.error({ err }, 'Unexpected error on idle PostgreSQL client');
		});

		// Логирование подключения нового клиента
		pool.on('connect', () => {
			logger.debug('New PostgreSQL client connected');
		});

		// Логирование получения клиента из pool
		pool.on('acquire', () => {
			logger.debug('PostgreSQL client acquired from pool');
		});

		// Логирование возврата клиента в pool
		pool.on('remove', () => {
			logger.debug('PostgreSQL client removed from pool');
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