export type ErrorCode = 'BAD_REQUEST' | 'NOT_FOUND' | 'CONFLICT' | 'INTERNAL_ERROR';

class AppError extends Error {
	readonly statusCode: number;
	readonly code: ErrorCode;
	readonly isOperational: boolean;
	readonly details?: unknown;

	constructor(params: { message: string; statusCode: number; code: ErrorCode; details?: unknown }) {
		super(params.message);
		this.statusCode = params.statusCode;
		this.code = params.code;
		this.details = params.details;
		this.isOperational = true;

		Error.captureStackTrace?.(this, this.constructor);
	}
}

export { AppError };
