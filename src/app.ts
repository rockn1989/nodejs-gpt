import { corsConfig } from '@/config/cors';
import { limiter } from '@/config/limiter';
import { healthCheck } from '@/controllers/healthController';
import { errorHandler } from '@/middleware/errorHandler';
import { requestId } from '@/middleware/requestId';
import { requestLogger } from '@/middleware/requestLogger';
import notesRoutes from '@/routes/notesRoutes';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

export function createApp() {
	const app = express();

	app.set('trust proxy', 1);

	app.use(cors(corsConfig));
	app.use(helmet());

	app.use(express.json());
	app.use(requestId);
	app.use(requestLogger);

	app.get('/health', healthCheck);

	app.use('/api/', limiter);
	app.use('/api/notes', notesRoutes);
	app.use(errorHandler);

	return app;
}
