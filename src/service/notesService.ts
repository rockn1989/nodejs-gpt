import { CreateNote, NoteResponse, UpdateNote } from '@/types/note';

import { mapNoteToResponseDto } from '@/dto/notes.dto';
import { NotFoundError } from '@/errors/NotFoundError';
import { NotesRepository } from '@/repositories/notesRepository';

const getAllNotes = async (): Promise<NoteResponse[]> => {
	const notes = await NotesRepository.findAll();
	return notes.map(mapNoteToResponseDto);
};

const createNote = async (data: CreateNote): Promise<NoteResponse> => {
	const { title, content } = data;
	const created = await NotesRepository.create({ title, content });

	return mapNoteToResponseDto(created);
};

const getNoteById = async (id: string): Promise<NoteResponse> => {
	const note = await NotesRepository.findById(id);
	if (!note) throw new NotFoundError('Note not found');
	return mapNoteToResponseDto(note);
};

const updateNote = async (id: string, data: UpdateNote): Promise<NoteResponse> => {
	const patch: { title?: string; content?: string } = {};
	if (data.title !== undefined) patch.title = data.title;
	if (data.content !== undefined) patch.content = data.content;

	const updated = await NotesRepository.updatePartial(id, patch);

	if (!updated) throw new NotFoundError('Note not found');

	return mapNoteToResponseDto(updated);
};

const deleteNote = async (id: string): Promise<NoteResponse> => {
	const deleted = await NotesRepository.remove(id);

	if (!deleted) throw new NotFoundError('Note not found');

	return mapNoteToResponseDto(deleted);
};
export { createNote, deleteNote, getAllNotes, getNoteById, updateNote };
