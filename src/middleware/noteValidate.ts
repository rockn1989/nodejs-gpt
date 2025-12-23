import { NextFunction, Request, Response } from 'express';

import Joi, { ObjectSchema } from 'joi';
import { ValidationError } from '../errors/ValidationError';
import { CreateNote } from '../types/note';

const noteValidate = (schema: ObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
	const data: CreateNote = req.body;

	try {
		await schema.validateAsync(data, { abortEarly: false });
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
