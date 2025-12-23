import { CreateNote, NoteResponse } from '../types/note';

function createNote({ title, content }: CreateNote) {
	const now = new Date().toISOString();

	return {
		id: crypto.randomUUID(),
		title,
		content,
		createdAt: now,
		updatedAt: now,
	};
}

function updateNote(note: NoteResponse, data: Partial<CreateNote>) {
	return {
		...note,
		...data,
		updatedAt: new Date().toISOString(),
	};
}

export { createNote, updateNote };
