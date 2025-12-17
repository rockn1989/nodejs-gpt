import { HttpCode } from '../constants';
import { AppError } from './AppError';

class NotFoundError extends AppError {
	constructor(message = 'Resource not found') {
		super(message, HttpCode.NOT_FOUND);
	}
}

export { NotFoundError };
