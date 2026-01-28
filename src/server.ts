import { createApp } from '@/app';
import { PORT } from '@/constants';
import { dbClose, dbInit } from '@/db';
import { setupGracefulShutdown } from '@/gracefulShutdown';
import { logger } from '@/infrastructure/logger';

async function bootstrap() {
	await dbInit();

	const app = createApp();

	const server = app.listen(PORT, () => {
		logger.info('Server started');
	});

	setupGracefulShutdown({
		server,
		onShutdown: dbClose,
		logger: {
			info: (msg) => logger.info(msg),
			error: (msg, err) => logger.error(err ? `${msg}: ${String(err)}` : msg),
		},
	});
}

bootstrap().catch((err) => {
	console.error('Startup failed:', err);
	process.exit(1);
});
