'use strict';

import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './middleware/logger';
import notesRoutes from './routes/notesRoutes';

const app = express();

app.use(express.json());
app.use(logger);
app.use('/api/notes', notesRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log('Server started'));
