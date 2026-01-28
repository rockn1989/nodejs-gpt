import { DbNote } from '@/repositories/notesRepository';
import { NoteResponse } from '@/types/note';

export function mapNoteToResponseDto(note: DbNote): NoteResponse {
	return {
		id: note.id,
		title: note.title,
		content: note.content,
		createdAt: new Date(note.createdAt).toISOString(),
		updatedAt: new Date(note.updatedAt).toISOString(),
	};
}
