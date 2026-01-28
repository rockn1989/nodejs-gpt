import type { Server } from 'http';

type ShutdownOptions = {
	server: Server;
	onShutdown: () => Promise<void>;
	logger?: { info: (msg: string) => void; error: (msg: string, err?: unknown) => void };
};

export function setupGracefulShutdown({ server, onShutdown, logger }: ShutdownOptions): void {
	let isShuttingDown = false;

	const shutdown = (signal: string) => {
		if (isShuttingDown) return;
		isShuttingDown = true;

		logger?.info?.(`Received ${signal}. Shutting down...`) ?? logger?.info?.(`\nReceived ${signal}. Shutting down...`);

		server.close(async (err) => {
			if (err) {
				logger?.error?.('HTTP server close error', err) ?? console.error('HTTP server close error:', err);
				process.exitCode = 1;
			}

			try {
				await onShutdown();
			} catch (e) {
				logger?.error?.('Shutdown hook error', e) ?? console.error('Shutdown hook error:', e);
				process.exitCode = 1;
			}
		});
	};

	process.on('SIGINT', () => void shutdown('SIGINT'));
	process.on('SIGTERM', () => void shutdown('SIGTERM'));
}
