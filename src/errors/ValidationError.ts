import { HttpCode } from '@/constants';
import { AppError } from '@/errors/AppError';

class ValidationError extends AppError {
	constructor(message = 'Validation failed') {
		super({ message, statusCode: HttpCode.BAD_REQUEST, code: 'BAD_REQUEST' });
	}
}

export { ValidationError };
