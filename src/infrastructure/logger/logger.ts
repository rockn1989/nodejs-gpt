import pino from 'pino';
import { PATH_OF_API_LOG } from '../../constants';

const isProd = process.env.NODE_ENV === 'production';

const logger = pino(
	{
		name: 'api',
		level: process.env.LOG_LEVEL ?? (isProd ? 'info' : 'debug'),
	},
	isProd ? pino.destination(PATH_OF_API_LOG) : pino.destination(1),
);

export { logger };
