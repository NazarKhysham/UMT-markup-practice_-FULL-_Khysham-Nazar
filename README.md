# Flora — Full-Stack Project

Full-stack проєкт для курсу GOIT **«Практикум з сучасних методологій розробки ПЗ»**.

Проєкт складається з frontend частини сайту Flora та backend API для роботи з букетами і замовленнями.

## Структура

```text
frontend/   HTML, CSS, JavaScript сайт Flora
backend/    Express API + PostgreSQL + Sequelize
```

## Технології

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- PostgreSQL
- Sequelize
- Neon
- Swagger UI

## Функціонал

- перегляд каталогу букетів;
- відображення популярних букетів;
- пошук букетів;
- кнопка Show More;
- модальне вікно з деталями букета;
- форма оформлення замовлення;
- збереження замовлень через backend API;
- API-документація через Swagger.

## Локальний запуск

### Backend

```bash
cd backend
npm install
```

Створіть файл `.env` у папці `backend`:

```env
PORT=3000
DATABASE_URL=your_neon_database_url
DB_SSL=true
BACKEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:4500
```

Заповнення бази тестовими даними:

```bash
npm run seed
```

Запуск backend:

```bash
npm run dev
```

Backend буде доступний за адресою:

```text
http://localhost:3000
```

Перевірка API:

```text
http://localhost:3000/api/bouquets
```

Swagger UI:

```text
http://localhost:3000/api-docs
```

### Frontend

Відкрийте другий термінал:

```bash
cd frontend
npm install
npx serve . -l 4500
```

Frontend буде доступний за адресою:

```text
http://localhost:4500
```

## API

```http
GET /api/bouquets
```

Отримати список букетів.

```http
GET /api/bouquets/:id
```

Отримати один букет за `id`.

```http
POST /api/orders
```

Створити нове замовлення.

## Деплой

Frontend розгортається через **GitHub Pages**.

Backend розгортається через **Render**.

Після деплою backend URL потрібно вказати у файлі:

```text
frontend/js/api.js
```

у змінній:

```js
DEPLOYED_API_BASE_URL
```

## Важливо

Файл `.env` не потрібно додавати в GitHub, тому що він містить приватні дані для підключення до бази даних.

## Автор

Nazar Khysham