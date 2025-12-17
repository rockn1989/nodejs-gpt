import { NextFunction, Request, Response } from 'express';

import Joi, { ObjectSchema } from 'joi';
import { ValidationError } from '../errors/ValidationError';

const noteValidate = (schema: ObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
	const { title, content } = req.body;

	try {
		await schema.validateAsync({ title, content }, { abortEarly: false });
	} catch (error) {
		if (error instanceof Joi.ValidationError) {
			const messages = error.details.map((d) => d.message).join(', ');

			throw new ValidationError(messages);
		}

		throw error;
	}

	next();
};

export { noteValidate };
