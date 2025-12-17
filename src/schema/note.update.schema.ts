import Joi from 'joi';
import { content, title } from './note.base.schema';

export const NoteUpdateSchema = Joi.object({
	title,
	content,
}).min(1);
