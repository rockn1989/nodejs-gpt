# 🔧 Установка ESLint для проекта

## 📦 Установка зависимостей

Выполните команду:

```bash
npm install --save-dev \
  eslint \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  eslint-config-prettier
```

## 🚀 Доступные команды

После установки будут доступны:

```bash
# Проверить код на ошибки
npm run lint

# Автоматически исправить ошибки
npm run lint:fix

# Проверить только типы TypeScript
npm run type-check

# Проверить всё (типы + lint)
npm run check
```

## 📋 Что проверяет ESLint

### 🔴 **Критичные проверки** (error)

- ❌ `no-debugger` — запрет `debugger` в коде
- ❌ `no-await-in-loop` — неэффективные await в циклах
- ❌ `@typescript-eslint/no-floating-promises` — промисы без обработки
- ❌ `@typescript-eslint/no-unused-vars` — неиспользуемые переменные
- ❌ `@typescript-eslint/require-await` — async функции без await

### 🟠 **Предупреждения** (warn)

- ⚠️ `no-console` — использование console.log
- ⚠️ `@typescript-eslint/no-explicit-any` — использование type any
- ⚠️ `@typescript-eslint/no-unsafe-*` — небезопасные операции с типами

### ✅ **Стиль кода**

- `@typescript-eslint/consistent-type-imports` — использовать `import type`
- `@typescript-eslint/consistent-type-definitions` — использовать `type` вместо `interface`
- `@typescript-eslint/naming-convention` — правила именования

## 🎯 Примеры ошибок

### ❌ Неиспользуемые переменные

```typescript
// ❌ Плохо
const unused = 'test';

// ✅ Хорошо (если переменная не нужна, удалить)
// или использовать _ префикс для игнорирования
const _unused = 'test';
```

### ❌ Floating promises

```typescript
// ❌ Плохо
async function bad() {
  doSomethingAsync(); // Promise не обработан!
}

// ✅ Хорошо
async function good() {
  await doSomethingAsync();
  // или
  void doSomethingAsync(); // явно игнорируем
}
```

### ❌ Type any

```typescript
// ❌ Плохо
function process(data: any) {
  return data;
}

// ✅ Хорошо
function process(data: unknown) {
  // валидация типа
  if (typeof data === 'string') {
    return data;
  }
}
```

### ⚠️ console.log

```typescript
// ⚠️ Предупреждение (но не ошибка)
console.log('Debug message');

// ✅ Используйте logger
logger.info('Debug message');
```

## 🔧 Интеграция с VSCode

Установите расширение **ESLint** в VSCode.

Добавьте в `.vscode/settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "eslint.validate": ["typescript"]
}
```

## 📝 Настройка под себя

Если какое-то правило слишком строгое, можно изменить в `.eslintrc.json`:

```json
{
  "rules": {
    // Изменить с error на warn
    "@typescript-eslint/no-explicit-any": "warn",
    
    // Или отключить совсем
    "no-console": "off"
  }
}
```

## 🚫 Игнорирование файлов

Отредактируйте `.eslintignore` для игнорирования дополнительных файлов.
