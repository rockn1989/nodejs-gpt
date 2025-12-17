import { NoteBase } from '../types/note';

import fs from 'fs/promises';
import { dirname, resolve } from 'path';

const file = process.env.NODE_ENV === 'test' ? 'data.test.json' : 'data.json';

async function saveNotes(notes: NoteBase[]) {
	const filePath = resolve(__dirname, `../data/${file}`);
	const dir = dirname(filePath);

	await fs.mkdir(dir, { recursive: true });

	await fs.writeFile(filePath, JSON.stringify(notes, null, 2));
}

export default saveNotes;
