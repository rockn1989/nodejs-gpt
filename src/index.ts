import { validateEnv } from '@/config/env';
import 'dotenv/config';

// Валидация переменных окружения перед запуском приложения
try {
	validateEnv();
} catch (err) {
	console.error('Environment validation failed:', err);
	process.exit(1);
}

import '@/server';

