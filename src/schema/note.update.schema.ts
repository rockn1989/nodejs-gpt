import { content, title } from '@/schema/note.base.schema';
import Joi from 'joi';

export const NoteUpdateSchema = Joi.object({
	title,
	content,
}).min(1);
