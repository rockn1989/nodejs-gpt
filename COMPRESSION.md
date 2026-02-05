# 🗜️ HTTP Compression

## Что это?

HTTP Compression (gzip/deflate) сжимает тело ответа сервера перед отправкой клиенту, уменьшая размер передаваемых данных.

### Пример эффекта:

| Тип данных | Без сжатия | С gzip | Экономия |
|------------|------------|--------|----------|
| JSON (1000 notes) | 150 KB | 15 KB | **90%** |
| JSON (API response) | 5 KB | 1.2 KB | **76%** |
| HTML страница | 50 KB | 10 KB | **80%** |
| Уже сжатое (JPEG) | 100 KB | 100 KB | 0% |

---

## 🚀 Как это работает

### 1. **Клиент отправляет запрос:**

```http
GET /api/notes HTTP/1.1
Accept-Encoding: gzip, deflate
```

### 2. **Сервер сжимает ответ:**

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Encoding: gzip
Content-Length: 1234

[сжатые данные]
```

### 3. **Браузер автоматически распаковывает**

Пользователь получает обычный JSON, но с экономией трафика!

---

## ⚙️ Конфигурация

### Параметры в `.env`

```env
# Уровень сжатия: 0 (нет) - 9 (максимум)
COMPRESSION_LEVEL=6

# Минимальный размер для сжатия (байты)
COMPRESSION_THRESHOLD=1024
```

### Уровни сжатия

| Уровень | Степень сжатия | Скорость | Рекомендация |
|---------|----------------|----------|--------------|
| 0 | Нет | Мгновенно | Только для отладки |
| 1 | Слабое (~60%) | Очень быстро | Если CPU - узкое место |
| **6** | **Среднее (~75%)** | **Быстро** | **✅ Рекомендуется** |
| 9 | Максимум (~80%) | Медленно | Только для статики |

**Почему 6?**
- ✅ Хорошее сжатие (~75%)
- ✅ Быстрое выполнение
- ✅ Оптимальный баланс CPU/размер

**Уровень 9:**
- ✅ На 5% лучше сжатие
- ❌ В 2-3 раза медленнее
- ❌ Не стоит дополнительной нагрузки на CPU

---

## 📊 Что сжимается, что нет

### ✅ **Сжимается автоматически:**

- `application/json` — API ответы
- `text/html` — HTML страницы
- `text/css` — CSS файлы
- `application/javascript` — JS файлы
- `text/plain` — Текстовые файлы
- `text/xml` — XML данные

### ❌ **НЕ сжимается (уже сжато):**

- `image/jpeg`, `image/png`, `image/webp` — Изображения
- `video/*` — Видео
- `application/pdf` — PDF документы
- `application/zip` — Архивы
- `audio/*` — Аудио

### 📏 **Не сжимается (слишком маленькое):**

- Ответы < 1024 байт (1 KB)
- Заголовки сжатия (20-30 байт) больше выгоды

---

## 🎯 Примеры использования

### Пример 1: GET /api/notes

**Запрос:**
```bash
curl -H "Accept-Encoding: gzip" http://localhost:3000/api/notes
```

**Без compression:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 45328

[{"id":"...","title":"..."}...]
```
📦 Размер: **45.3 KB**

**С compression:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Encoding: gzip
Content-Length: 4891

[сжатые данные]
```
📦 Размер: **4.9 KB** (экономия **89%**)

---

### Пример 2: Отключение сжатия

Иногда нужно отключить сжатие (например, для тестирования):

```bash
curl -H "X-No-Compression: true" http://localhost:3000/api/notes
```

Сервер вернёт несжатый ответ.

---

## 🔍 Проверка работы compression

### Способ 1: Заголовок Content-Encoding

```bash
curl -I -H "Accept-Encoding: gzip" http://localhost:3000/api/notes
```

**Если работает:**
```
Content-Encoding: gzip
```

**Если не работает:**
```
(заголовок Content-Encoding отсутствует)
```

### Способ 2: Сравнение размера

```bash
# Без сжатия
curl http://localhost:3000/api/notes | wc -c

# Со сжатием (автоматически распаковывается curl)
curl -H "Accept-Encoding: gzip" http://localhost:3000/api/notes | wc -c

# Сжатые данные (не распаковывать)
curl -H "Accept-Encoding: gzip" --compressed http://localhost:3000/api/notes | wc -c
```

### Способ 3: Browser DevTools

1. Откройте DevTools (F12)
2. Перейдите в Network tab
3. Сделайте запрос к API
4. Посмотрите колонку **Size** и **Content-Encoding**

**Пример:**
```
Size: 4.9 KB / 45.3 KB
Content-Encoding: gzip
```
Первое число — сжатый размер, второе — оригинальный.

---

## 📈 Производительность

### CPU vs Network Trade-off

| Сценарий | CPU | Network | Результат |
|----------|-----|---------|-----------|
| Быстрый интернет (100 Mbps) | +5ms сжатие | -50ms передача | ✅ **Выигрыш 45ms** |
| Медленный интернет (1 Mbps) | +5ms сжатие | -500ms передача | ✅ **Выигрыш 495ms** |
| Локальная сеть (1 Gbps) | +5ms сжатие | -2ms передача | ❌ **Проигрыш 3ms** |

**Вывод:**
- ✅ Compression почти всегда полезен
- ✅ Особенно для мобильных клиентов (медленный интернет)
- ❌ Только в локальной сети может быть накладные расходы

### Настройки для разных сценариев

#### **Production (интернет-клиенты):**
```env
COMPRESSION_LEVEL=6        # Оптимально
COMPRESSION_THRESHOLD=1024 # Не сжимать <1KB
```

#### **High-performance (много запросов, мощный CPU):**
```env
COMPRESSION_LEVEL=4        # Быстрее сжатие
COMPRESSION_THRESHOLD=2048 # Не сжимать <2KB
```

#### **Low-bandwidth (медленный интернет клиентов):**
```env
COMPRESSION_LEVEL=8        # Лучше сжатие
COMPRESSION_THRESHOLD=512  # Сжимать даже маленькие
```

---

## 🛡️ Безопасность

### BREACH Attack

**Что это:**
BREACH — это атака на HTTPS, использующая compression для извлечения секретов.

**Когда опасно:**
```javascript
// ❌ Плохо: секрет и пользовательский ввод в одном ответе
res.json({
  csrfToken: "secret123",
  userInput: req.query.search // Атакующий контролирует
});
```

**Решение:**
```javascript
// ✅ Хорошо: секреты в заголовках (не сжимаются)
res.header('X-CSRF-Token', csrfToken);
res.json({
  userInput: req.query.search
});

// ✅ Или отключить compression для чувствительных endpoint
if (req.path.includes('/auth')) {
  req.headers['x-no-compression'] = 'true';
}
```

**Для notes API:**
- ✅ Нет секретов в ответах
- ✅ BREACH не актуален
- ✅ Compression безопасен

---

## 🔧 Кастомизация

### Отключить compression для определённых путей

Отредактируйте `src/config/compression.ts`:

```typescript
filter: (req: Request, res: Response): boolean => {
  // Не сжимать файлы
  if (req.path.endsWith('.jpg') || req.path.endsWith('.png')) {
    return false;
  }

  // Не сжимать WebSocket upgrade
  if (req.headers.upgrade === 'websocket') {
    return false;
  }

  return compression.filter(req, res);
}
```

### Изменить уровень сжатия динамически

```typescript
// Для больших ответов использовать лучшее сжатие
const responseSize = Buffer.byteLength(JSON.stringify(data));
const level = responseSize > 100000 ? 8 : 6;
```

---

## 📊 Мониторинг

### Метрики для отслеживания:

1. **Compression Ratio** — сколько % экономится
2. **Compression Time** — сколько времени тратится на сжатие
3. **CPU Usage** — нагрузка на сервер
4. **Response Time** — общее время ответа

### Добавить метрики (будущее):

```typescript
// Middleware для логирования compression
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    const uncompressedSize = Buffer.byteLength(data);
    logger.info({
      path: req.path,
      uncompressedSize,
      // compressedSize доступен после compression
    });
    return originalSend.call(this, data);
  };
  next();
});
```

---

## 💡 Best Practices

1. ✅ **Всегда включайте compression** в production
2. ✅ **Используйте уровень 6** для баланса
3. ✅ **Не сжимайте <1KB** (накладные расходы)
4. ✅ **Кэшируйте сжатые ответы** на CDN/nginx
5. ✅ **Мониторьте CPU** — если высокая нагрузка, понизьте уровень
6. ❌ **Не сжимайте уже сжатые** форматы (images, video)
7. ❌ **Не используйте уровень 9** (не стоит затрат)

---

## 🔗 Дополнительные материалы

- [compression npm package](https://www.npmjs.com/package/compression)
- [HTTP Compression (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Compression)
- [gzip compression algorithm](https://en.wikipedia.org/wiki/Gzip)
- [BREACH attack explained](https://en.wikipedia.org/wiki/BREACH)

---

## 📝 Итого

### Что даёт compression:

- 🚀 **Быстрее загрузка** — в 5-10 раз меньше данных
- 💰 **Экономия трафика** — меньше платите за bandwidth
- 📱 **Лучше для мобильных** — меньше расход мобильного интернета
- 🌍 **Лучше UX** — быстрее для медленных соединений

### Стоимость:

- 🔥 **CPU:** +5-10ms на сжатие (незначительно)
- 💾 **Память:** +16KB буфер на соединение (минимально)

### Вывод:

✅ **Compression — must-have для production API!**
