import { NoteResponse } from '../types/note';

export function mapNoteToResponseDto(note: any): NoteResponse {
	return {
		id: note.id,
		title: note.title,
		content: note.content,
		createdAt: note.createdAt.toISOString(),
		updatedAt: note.updatedAt.toISOString(),
	};
}
