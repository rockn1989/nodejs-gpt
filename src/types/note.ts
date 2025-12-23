export type NoteResponse = {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
};

export interface INote {
	id: string;
	title: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
}

export type CreateNote = Pick<NoteResponse, 'title' | 'content'>;

export type UpdateNote = Partial<CreateNote>;

export type NoteIdParam = {
	id: string;
};
