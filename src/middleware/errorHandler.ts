import { NextFunction, Request, Response } from 'express';
import { HttpCode } from '../constants';
import { AppError } from '../errors/AppError';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
	if (err instanceof AppError && err.isOperational) {
		res.status(err.statusCode).json({
			error: err.message,
		});

		return;
	}

	console.error(err);

	res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
		error: 'Internal server error',
	});
}

export { errorHandler };
