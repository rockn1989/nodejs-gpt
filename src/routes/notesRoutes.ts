import * as notesController from '@/controllers/notesController';
import { noteValidate } from '@/middleware/noteValidate';
import { validateParams } from '@/middleware/validateParams';
import { NoteCreateSchema } from '@/schema/note.create.schema';
import { NoteUpdateSchema } from '@/schema/note.update.schema';
import { idParamSchema } from '@/schema/params.schema';
import { Router } from 'express';

const notesRoutes = Router();

notesRoutes.get('/', notesController.getAll);

notesRoutes.get('/:id', validateParams(idParamSchema), notesController.getOne);

notesRoutes.post('/', noteValidate(NoteCreateSchema), notesController.create);

notesRoutes.put('/:id', validateParams(idParamSchema), noteValidate(NoteUpdateSchema), notesController.update);

notesRoutes.delete('/:id', validateParams(idParamSchema), notesController.remove);

export default notesRoutes;
