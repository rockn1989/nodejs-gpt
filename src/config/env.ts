export function validateEnv() {
	const required = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];

	for (const key of required) {
		if (!process.env[key]) {
			throw new Error(`Missing env var: ${key}`);
		}
	}
}
