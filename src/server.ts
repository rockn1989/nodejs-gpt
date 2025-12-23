'use strict';

import express from 'express';
import { errorHandler } from './middleware/errorHandler';

import { logger } from './infrastructure/logger/logger';
import { requestLogger } from './middleware/requestLogger';
import notesRoutes from './routes/notesRoutes';
const app = express();

app.use(express.json());
app.use(requestLogger);
app.use('/api/notes', notesRoutes);

app.use(errorHandler);

app.listen(3000, () => {
	logger.info('Server started');
});
