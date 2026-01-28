import { AppError } from './AppError';

type PgError = Error & { code?: string; detail?: string; constraint?: string };

export function mapPgError(err: unknown): AppError | null {
	if (!(err instanceof Error)) return null;

	const e = err as PgError;

	if (!e.code) return null;

	switch (e.code) {
		case '22P02':
			return new AppError({
				statusCode: 400,
				code: 'BAD_REQUEST',
				message: 'Invalid input format',
				details: { pg: { code: e.code } },
			});

		case '23505':
			return new AppError({
				statusCode: 409,
				code: 'CONFLICT',
				message: 'Resource already exists',
				details: { pg: { code: e.code, constraint: e.constraint, detail: e.detail } },
			});

		case '23503':
			return new AppError({
				statusCode: 409,
				code: 'CONFLICT',
				message: 'Invalid reference',
				details: { pg: { code: e.code, constraint: e.constraint, detail: e.detail } },
			});

		case '23502':
		case '22001':
			return new AppError({
				statusCode: 400,
				code: 'BAD_REQUEST',
				message: 'Invalid input',
				details: { pg: { code: e.code, constraint: e.constraint, detail: e.detail } },
			});

		default:
			return null;
	}
}
