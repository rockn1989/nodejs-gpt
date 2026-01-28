import { dbQuery } from '@/db';

type NoteRow = {
	id: string;
	title: string;
	content: string;
	created_at: string;
	updated_at: string;
};

export type DbNote = {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
};

const mapRowToDbNote = (row: NoteRow): DbNote => ({
	id: row.id,
	title: row.title,
	content: row.content,
	createdAt: row.created_at,
	updatedAt: row.updated_at,
});

const findAll = async (): Promise<DbNote[]> => {
	const { rows } = await dbQuery<NoteRow>(
		`SELECT id, title, content, created_at, updated_at
     FROM notes
     ORDER BY created_at DESC`,
	);

	return rows.map(mapRowToDbNote);
};

const findById = async (id: string): Promise<DbNote | null> => {
	const { rows } = await dbQuery<NoteRow>(
		`SELECT id, title, content, created_at, updated_at
     FROM notes
     WHERE id = $1`,
		[id],
	);

	return rows[0] ? mapRowToDbNote(rows[0]) : null;
};

const create = async (data: { title: string; content: string }): Promise<DbNote> => {
	const { rows } = await dbQuery<NoteRow>(
		`INSERT INTO notes (title, content)
     VALUES ($1, $2)
     RETURNING id, title, content, created_at, updated_at`,
		[data.title, data.content],
	);

	return mapRowToDbNote(rows[0]!);
};

const updatePartial = async (id: string, data: { title?: string; content?: string }): Promise<DbNote | null> => {
	const { rows } = await dbQuery<NoteRow>(
		`UPDATE notes
     SET title = COALESCE($2, title),
         content = COALESCE($3, content)
     WHERE id = $1
     RETURNING id, title, content, created_at, updated_at`,
		[id, data.title ?? null, data.content ?? null],
	);

	return rows[0] ? mapRowToDbNote(rows[0]) : null;
};

const remove = async (id: string): Promise<DbNote | null> => {
	const { rows } = await dbQuery<NoteRow>(
		`DELETE FROM notes
     WHERE id = $1
     RETURNING id, title, content, created_at, updated_at`,
		[id],
	);

	return rows[0] ? mapRowToDbNote(rows[0]) : null;
};

export const NotesRepository = { findAll, findById, create, updatePartial, remove };
