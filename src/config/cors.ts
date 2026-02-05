import type { CorsOptions } from 'cors';

/**
 * Парсинг списка разрешённых origins из переменной окружения
 * Формат: http://localhost:3000,http://127.0.0.1:3000,https://example.com
 */
function parseAllowedOrigins(): Set<string> {
	const originsEnv = process.env.ALLOWED_ORIGINS;

	// Дефолтные origins для development (если переменная не указана)
	if (!originsEnv) {
		const isDev = process.env.NODE_ENV !== 'production';
		return isDev 
			? new Set(['http://localhost:3000', 'http://127.0.0.1:3000'])
			: new Set(); // В production требуем явно указать origins
	}

	// Парсим список через запятую и убираем пробелы
	return new Set(
		originsEnv
			.split(',')
			.map((origin) => origin.trim())
			.filter(Boolean)
	);
}

const allowedOrigins = parseAllowedOrigins();

// Логируем разрешённые origins при инициализации (полезно для отладки)
if (allowedOrigins.size > 0) {
	console.log('[CORS] Allowed origins:', Array.from(allowedOrigins).join(', '));
} else {
	console.warn('[CORS] No allowed origins configured! All origins will be blocked in production.');
}

export const corsConfig: CorsOptions = {
	origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
		// Запросы без Origin (Postman, curl, server-to-server)
		if (!origin) {
			return callback(null, true);
		}

		// Проверяем, разрешён ли origin
		if (allowedOrigins.has(origin)) {
			return callback(null, true);
		}

		// В production строго блокируем неразрешённые origins
		const isDev = process.env.NODE_ENV !== 'production';
		if (isDev) {
			// В development логируем предупреждение, но разрешаем
			console.warn(`[CORS] Origin "${origin}" not in allowed list, but allowed in development mode`);
			return callback(null, true);
		}

		return callback(new Error('Not allowed by CORS'));
	},
	credentials: false,
};
