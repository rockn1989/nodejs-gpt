import Joi from 'joi';
import { NOTE_SCHEMA } from '../constants';

const title = Joi.string()
	.pattern(/^[A-Za-zА-Яа-яёЁ0-9]+$/)
	.max(100)
	.messages({
		'string.empty': NOTE_SCHEMA.TITLE_EMPTY,
		'string.pattern.base': NOTE_SCHEMA.TITLE,
		'string.max': NOTE_SCHEMA.TITLE_MAX,
	});

const content = Joi.string()
	.pattern(/^[A-Za-zА-Яа-яёЁ0-9]+$/)
	.max(300)
	.messages({
		'string.empty': NOTE_SCHEMA.CONTENT_EMPTY,
		'string.pattern.base': NOTE_SCHEMA.CONTENT,
		'string.max': NOTE_SCHEMA.CONTENT_MAX,
	});

export { content, title };
