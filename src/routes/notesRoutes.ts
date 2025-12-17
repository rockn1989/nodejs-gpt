'use strict';

import { Router } from 'express';
import * as notesController from '../controllers/notesController';
import { noteValidate } from '../middleware/noteValidate';
import { NoteCreateSchema } from '../schema/note.create.schema';
import { NoteUpdateSchema } from '../schema/note.update.schema';

const notesRoutes = Router();

notesRoutes.get('/', notesController.getAll);

notesRoutes.get('/:id', notesController.getOne);

notesRoutes.post('/', noteValidate(NoteCreateSchema), notesController.create);

notesRoutes.put('/:id', noteValidate(NoteUpdateSchema), notesController.update);

notesRoutes.delete('/:id', notesController.remove);

export default notesRoutes;
