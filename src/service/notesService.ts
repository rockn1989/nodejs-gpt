import { NoteBase } from '../types/note';

import * as NoteModel from '../models/note.models';

import { NotFoundError } from '../errors/NotFoundError';
import loadNotes from '../utils/loadNotes.utils';
import saveNotes from '../utils/saveNotes.utils';

const getAllNotes = async () => loadNotes();

const getNoteById = async (id: string): Promise<NoteBase> => {
	const notes = await loadNotes();
	const note = notes.find((n) => n.id === id);

	if (!note) throw new NotFoundError('Note not found');
	return note;
};

const createNote = async (data: NoteBase): Promise<NoteBase> => {
	const notes = await loadNotes();

	const { title, content } = data;

	const newNote = NoteModel.createNote({
		title,
		content,
	});

	notes.push(newNote);
	await saveNotes(notes);

	return newNote;
};

const updateNote = async (id: string, data: Pick<NoteBase, 'title' | 'content'>): Promise<NoteBase> => {
	const notes = await loadNotes();
	const index = notes.findIndex((n) => n.id === id);
	const note = notes[index];

	if (!note) {
		throw new NotFoundError('Note not found');
	}

	const { title, content } = data;

	const updateNotes = {
		title: title ?? note.title,
		content: content ?? note.content,
	};

	const updatedNote = NoteModel.updateNote(note, updateNotes);
	notes[index] = updatedNote;

	await saveNotes(notes);

	return updatedNote;
};

const deleteNote = async (id: string): Promise<NoteBase> => {
	const notes = await loadNotes();
	const index = notes.findIndex((n) => n.id === id);

	if (index === -1) throw new NotFoundError('Note not found');
	const deleted = notes[index];

	if (!deleted) {
		throw new NotFoundError('Note not found');
	}

	notes.splice(index, 1);
	await saveNotes(notes);

	return deleted;
};

export { createNote, deleteNote, getAllNotes, getNoteById, updateNote };
