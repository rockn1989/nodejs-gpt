import fs from 'fs';
import path from 'path';
import { NoteResponse } from '../types/note';

const file = process.env.NODE_ENV === 'test' ? 'data.test.json' : 'data.json';

const filePath = path.join(__dirname, `../data/${file}`);

const loadNotes = async (): Promise<NoteResponse[]> => {
	if (!fs.existsSync(filePath)) return [];
	return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

export default loadNotes;
