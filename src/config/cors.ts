import type { CorsOptions } from 'cors';

const allowedOrigins = new Set<string>(['http://localhost:3000', 'http://127.0.0.1:3000']);

export const corsConfig: CorsOptions = {
	origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
		// запросы без Origin (Postman, curl, server-to-server)
		if (!origin) {
			return callback(null, true);
		}

		if (allowedOrigins.has(origin)) {
			return callback(null, true);
		}

		return callback(new Error('Not allowed by CORS'));
	},
	credentials: false,
};
