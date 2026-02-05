# 🔐 UUID Валидация

## Что проверяется

Все endpoints с параметром `:id` проверяют, что ID является валидным **UUID v4**.

### Защищённые endpoints:

- `GET /api/notes/:id`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`

---

## ✅ Валидные запросы

### Пример 1: Получить заметку
```bash
GET /api/notes/550e8400-e29b-41d4-a716-446655440000
```

**Ответ: 200 OK**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "My Note",
  "content": "Content here",
  "createdAt": "2024-02-04T10:00:00Z",
  "updatedAt": "2024-02-04T10:00:00Z"
}
```

---

## ❌ Невалидные запросы

### Пример 1: Неправильный формат

```bash
GET /api/notes/abc123
```

**Ответ: 400 Bad Request**
```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "ID must be a valid UUID v4",
    "details": null,
    "requestId": "req_123abc"
  }
}
```

### Пример 2: Пустой ID

```bash
GET /api/notes/
```

**Ответ: 404 Not Found** (роут не найден)

### Пример 3: Невалидный UUID (неправильная версия)

```bash
GET /api/notes/550e8400-e29b-11d4-a716-446655440000
# Это UUID v1, а не v4
```

**Ответ: 400 Bad Request**
```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "ID must be a valid UUID v4",
    "details": null,
    "requestId": "req_456def"
  }
}
```

### Пример 4: Числовой ID

```bash
GET /api/notes/123
```

**Ответ: 400 Bad Request**
```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "ID must be a valid UUID v4",
    "details": null,
    "requestId": "req_789ghi"
  }
}
```

---

## 🎯 Что это предотвращает

### 1. **SQL Injection** (частично)
Валидация UUID предотвращает некоторые SQL injection атаки:
```sql
-- ❌ Невозможно:
SELECT * FROM notes WHERE id = 'abc' OR '1'='1'
-- Joi отклонит это ДО запроса в БД
```

### 2. **PostgreSQL ошибки**
Без валидации PostgreSQL выдал бы:
```
ERROR: invalid input syntax for type uuid: "abc123"
```

С валидацией возвращается понятная ошибка:
```json
{ "message": "ID must be a valid UUID v4" }
```

### 3. **Лишние запросы к БД**
Невалидные ID отклоняются на уровне middleware, не доходя до БД.

---

## 🧪 Тестирование

### С curl:

```bash
# ✅ Валидный UUID
curl http://localhost:3000/api/notes/550e8400-e29b-41d4-a716-446655440000

# ❌ Невалидный UUID
curl http://localhost:3000/api/notes/invalid-id

# ❌ Числовой ID
curl http://localhost:3000/api/notes/123
```

### С Postman:

1. Создайте коллекцию запросов
2. В переменных окружения добавьте `{{validUUID}}` и `{{invalidUUID}}`
3. Протестируйте все endpoints с обоими значениями

---

## 📝 Реализация

### Schema (`src/schema/params.schema.ts`):

```typescript
export const idParamSchema = Joi.object({
  id: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required()
    .messages({
      'string.empty': 'ID cannot be empty',
      'string.guid': 'ID must be a valid UUID v4',
      'any.required': 'ID is required',
    }),
});
```

### Middleware (`src/middleware/validateParams.ts`):

```typescript
export const validateParams = (schema: ObjectSchema) => 
  (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.params);
    if (error) {
      throw new ValidationError(error.message);
    }
    req.params = value;
    next();
  };
```

### Routes (`src/routes/notesRoutes.ts`):

```typescript
// Валидация применяется ко всем endpoints с :id
notesRoutes.get('/:id', validateParams(idParamSchema), controller.getOne);
notesRoutes.put('/:id', validateParams(idParamSchema), controller.update);
notesRoutes.delete('/:id', validateParams(idParamSchema), controller.remove);
```

---

## 🔍 Формат UUID v4

Правильный формат: `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`

Где:
- `x` — любая hex цифра (0-9, a-f)
- `4` — версия UUID (всегда 4)
- `y` — одна из: 8, 9, a, b

**Пример валидного UUID v4:**
```
550e8400-e29b-41d4-a716-446655440000
    ^             ^- 4 (версия)
    └- 8 символов
```

---

## 🛡️ Безопасность

✅ **Защита от:**
- Некорректных форматов ID
- Случайных опечаток
- Некоторых SQL injection попыток
- Лишней нагрузки на БД

❌ **Не защищает от:**
- Подбора валидных UUID (UUID v4 достаточно большой для защиты)
- Доступа к чужим заметкам (нужна авторизация)

---

## 💡 Best Practices

1. **Всегда валидируйте ID** на уровне роутов
2. **Возвращайте понятные ошибки** вместо технических PostgreSQL ошибок
3. **Логируйте попытки** использования невалидных ID (возможная атака)
4. **Используйте UUID v4** для генерации ID (встроено в PostgreSQL)
