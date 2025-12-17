import Joi from 'joi';
import { NOTE_SCHEMA } from '../constants';
import { content, title } from './note.base.schema';

export const NoteCreateSchema = Joi.object({
	title: title.required().messages({
		'any.required': NOTE_SCHEMA.TITLE_EMPTY,
	}),

	content: content.required().messages({
		'any.required': NOTE_SCHEMA.CONTENT_EMPTY,
	}),
});
