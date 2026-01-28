import { PATH_OF_API_LOG } from '@/constants';
import pino from 'pino';

const isProd = process.env.NODE_ENV === 'production';

// Для production используем файловое логирование
// Для dev - stdout (pino-pretty обработает вывод)
const destination = isProd 
	? pino.destination({
			dest: PATH_OF_API_LOG,
			sync: false,
			minLength: 4096,
	  })
	: process.stdout;

const logger = pino(
	{
		name: 'api',
		level: process.env.LOG_LEVEL ?? (isProd ? 'info' : 'debug'),
	},
	destination,
);

export { logger };

