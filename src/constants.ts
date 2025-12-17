const NOTE_SCHEMA = {
	TITLE: 'Текст заголовка не должен содержать специальных символов',
	TITLE_EMPTY: 'Пустой заголовок',
	TITLE_MIN: 'Пустой заголовок',
	TITLE_MAX: 'Текст содержит слишком много символов',
	CONTENT: 'Текст заметки не должен содержать специальных символов',
	CONTENT_EMPTY: 'Пустой контент',
	CONTENT_MAX: 'Текст заметки содержит слишком много символов',
};

const HttpCode = {
	OK: 200,
	CREATED: 201,
	DELETED: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
};

export { HttpCode, NOTE_SCHEMA };
