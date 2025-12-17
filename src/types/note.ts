export type NoteBase = {
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	id: string;
};

export type CreateNote = Pick<NoteBase, 'title' | 'content'>;

export type NoteIdParam = {
	id: string;
};
