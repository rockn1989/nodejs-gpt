import { NextFunction, Request, Response } from 'express';
import { logger } from '../infrastructure/logger/logger';

function requestLogger(req: Request, res: Response, next: NextFunction): void {
	const start = process.hrtime.bigint();

	res.on('finish', () => {
		const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;

		const logData = {
			method: req.method,
			url: req.originalUrl,
			statusCode: res.statusCode,
			durationMs: Math.round(durationMs),
		};

		if (res.statusCode >= 500) {
			logger.error(logData, 'HTTP request failed');
			return;
		}

		if (res.statusCode >= 400) {
			logger.warn(logData, 'HTTP client error');
			return;
		}

		logger.info(logData, 'HTTP request');
	});

	next();
}

export { requestLogger };
