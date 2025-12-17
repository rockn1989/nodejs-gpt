import { HttpCode } from '../constants';
import { AppError } from './AppError';

class ValidationError extends AppError {
	constructor(message = 'Validation failed') {
		super(message, HttpCode.BAD_REQUEST);
	}
}

export { ValidationError };
