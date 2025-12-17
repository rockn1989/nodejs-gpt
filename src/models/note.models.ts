import { CreateNote, NoteBase } from '../types/note';

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

function updateNote(note: NoteBase, data: Partial<CreateNote>) {
	return {
		...note,
		...data,
		updatedAt: new Date().toISOString(),
	};
}

export { createNote, updateNote };
