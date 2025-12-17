import { Request, Response } from 'express';

import { HttpCode } from '../constants';
import * as notesService from '../service/notesService';
import { NoteIdParam } from '../types/note';

const getAll = async (req: Request, res: Response) => {
	const notes = await notesService.getAllNotes();
	res.status(HttpCode.OK).json(notes);
};

const getOne = async (req: Request<NoteIdParam>, res: Response) => {
	const { id } = req.params;
	const note = await notesService.getNoteById(id);
	res.status(HttpCode.OK).json(note);
};

const create = async (req: Request, res: Response) => {
	const newNote = await notesService.createNote(req.body);
	res.status(HttpCode.CREATED).json(newNote);
};

const update = async (req: Request<NoteIdParam>, res: Response) => {
	const updatedNote = await notesService.updateNote(req.params.id, req.body);
	res.json(updatedNote);
};

const remove = async (req: Request<NoteIdParam>, res: Response) => {
	const deleted = await notesService.deleteNote(req.params.id);
	res.status(HttpCode.DELETED).json(deleted);
};

export { create, getAll, getOne, remove, update };
