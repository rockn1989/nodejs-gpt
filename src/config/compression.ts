import type { Request, Response } from 'express';
import compression from 'compression';

/**
 * Конфигурация compression middleware
 * Сжимает ответы с помощью gzip/deflate для уменьшения размера
 */
export const compressionConfig: compression.CompressionOptions = {
	// Фильтр: когда сжимать ответы
	filter: (req: Request, res: Response): boolean => {
		// Не сжимать, если клиент явно отказался
		if (req.headers['x-no-compression']) {
			return false;
		}

		// Использовать дефолтную логику compression
		// Она автоматически не сжимает:
		// - уже сжатые форматы (images, video, pdf)
		// - очень маленькие ответы (<1KB)
		return compression.filter(req, res);
	},

	// Уровень сжатия: 0 (нет) - 9 (максимум)
	// 6 - оптимальный баланс скорость/размер
	level: Number(process.env.COMPRESSION_LEVEL ?? 6),

	// Минимальный размер ответа для сжатия (байты)
	// Не сжимать ответы меньше 1KB (накладные расходы > выгода)
	threshold: Number(process.env.COMPRESSION_THRESHOLD ?? 1024),

	// Размер буфера для сжатия (байты)
	// По умолчанию 16KB
	chunkSize: 16 * 1024,

	// Уровень памяти для zlib: 1-9
	// 8 - дефолт, хороший баланс
	memLevel: 8,

	// Стратегия сжатия для zlib
	// Z_DEFAULT_STRATEGY (0) - универсальная стратегия
	strategy: 0,
};
