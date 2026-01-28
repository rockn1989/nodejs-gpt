import { NOTE_SCHEMA } from '@/constants';
import { content, title } from '@/schema/note.base.schema';
import Joi from 'joi';

export const NoteCreateSchema = Joi.object({
	title: title.required().messages({
		'any.required': NOTE_SCHEMA.TITLE_EMPTY,
	}),

	content: content.required().messages({
		'any.required': NOTE_SCHEMA.CONTENT_EMPTY,
	}),
});
