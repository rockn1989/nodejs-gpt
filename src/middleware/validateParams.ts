import { ValidationError } from '@/errors/ValidationError';
import type { NextFunction, Request, Response } from 'express';
import type { ObjectSchema } from 'joi';

export const validateParams = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction): void => {
	const { error, value } = schema.validate(req.params, { abortEarly: false, stripUnknown: true });
	if (error) {
		const messages = error.details.map((d) => d.message).join(', ');
		throw new ValidationError(messages);
	}
	req.params = value;
	next();
};
