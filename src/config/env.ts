export function validateEnv() {
	const required = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];

	// Проверка обязательных переменных
	for (const key of required) {
		if (!process.env[key]) {
			throw new Error(`Missing env var: ${key}`);
		}
	}

	// В production режиме требуем явно указать ALLOWED_ORIGINS
	const isProduction = process.env.NODE_ENV === 'production';
	if (isProduction && !process.env.ALLOWED_ORIGINS) {
		throw new Error('ALLOWED_ORIGINS must be set in production mode');
	}

	// Валидация формата PORT
	const port = Number(process.env.PORT);
	if (process.env.PORT && (isNaN(port) || port < 1 || port > 65535)) {
		throw new Error('PORT must be a valid number between 1 and 65535');
	}

	// Валидация формата DB_PORT
	const dbPort = Number(process.env.DB_PORT);
	if (isNaN(dbPort) || dbPort < 1 || dbPort > 65535) {
		throw new Error('DB_PORT must be a valid number between 1 and 65535');
	}
}
