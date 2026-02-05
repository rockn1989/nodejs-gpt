import { HttpCode } from '@/constants';
import { dbHealthCheck } from '@/db';
import type { Request, Response } from 'express';

/**
 * Health check endpoint
 * Проверяет работоспособность сервера и подключение к БД
 */
const healthCheck = async (req: Request, res: Response) => {
	try {
		// Проверяем подключение к БД
		await dbHealthCheck();

		res.status(HttpCode.OK).json({
			status: 'healthy',
			timestamp: new Date().toISOString(),
			checks: {
				server: 'ok',
				database: 'ok',
			},
		});
	} catch (error) {
		// Если БД недоступна, возвращаем 503 Service Unavailable
		res.status(HttpCode.SERVICE_UNAVAILABLE).json({
			status: 'unhealthy',
			timestamp: new Date().toISOString(),
			checks: {
				server: 'ok',
				database: 'error',
			},
			error: error instanceof Error ? error.message : 'Database connection failed',
		});
	}
};

export { healthCheck };

