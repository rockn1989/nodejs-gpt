export type NoteResponse = {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
};

export type CreateNote = Pick<NoteResponse, 'title' | 'content'>;

export type UpdateNote = Partial<CreateNote>;

export type NoteIdParam = {
	id: string;
};
