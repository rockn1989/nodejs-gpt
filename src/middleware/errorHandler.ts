import { AppError } from '@/errors/AppError';
import { mapPgError } from '@/errors/pgErrorMap';
import type { NextFunction, Request, Response } from 'express';

import { logger } from '@/infrastructure/logger';
import { getRequestId } from './requestId';

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
	const requestId = getRequestId(req);

	// 1) Postgres errors
	const pgMapped = mapPgError(err);
	if (pgMapped) {
		logger.warn({ err, requestId }, 'Handled DB error');
		return res.status(pgMapped.statusCode).json({
			error: {
				code: pgMapped.code,
				message: pgMapped.message,
				details: pgMapped.details ?? null,
				requestId,
			},
		});
	}

	// 2) App errors
	if (err instanceof AppError && err.isOperational) {
		logger.info({ err, requestId }, 'Handled app error');
		return res.status(err.statusCode).json({
			error: {
				code: err.code,
				message: err.message,
				details: err.details ?? null,
				requestId,
			},
		});
	}

	// 3) Unknown errors
	logger.error({ err, requestId }, 'Unhandled error');
	return res.status(500).json({
		error: {
			code: 'INTERNAL_ERROR',
			message: 'Internal server error',
			details: null,
			requestId,
		},
	});
}
