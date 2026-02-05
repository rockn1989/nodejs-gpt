import { randomUUID } from 'crypto';
import type { NextFunction, Request, Response } from 'express';

export function requestId(req: Request, res: Response, next: NextFunction) {
	const id = req.header('x-request-id') ?? randomUUID();
	(req as any).requestId = id;
	res.setHeader('x-request-id', id);
	next();
}

export function getRequestId(req: Request): string | undefined {
	return (req as any).requestId;
}
