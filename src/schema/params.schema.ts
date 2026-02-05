import Joi from 'joi';

export const idParamSchema = Joi.object({
	id: Joi.string()
		.uuid({ version: 'uuidv4' })
		.required()
		.messages({
			'string.empty': 'ID cannot be empty',
			'string.guid': 'ID must be a valid UUID v4',
			'any.required': 'ID is required',
		}),
});
