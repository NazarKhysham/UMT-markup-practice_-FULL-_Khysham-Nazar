# Flora Backend

REST API for the Flora bouquets catalog. Express + PostgreSQL (via Sequelize), Joi validation, Multer file uploads, Swagger docs.

## Stack

- Node.js (LTS) + Express
- PostgreSQL + Sequelize
- Joi validation
- Multer (photo uploads: `/temp` → `/public/photos`)
- `swagger-ui-express` (docs at `/api-docs`)

## Project structure

```
server.js              # entry point
src/
  app.js               # express app: middleware, routes, error handler
  config/db.js         # Sequelize instance + connectDb()
  models/              # Bouquet, Order
  controllers/         # request/response handling
  services/            # DB access via Sequelize
  routes/              # route wiring
  middlewares/         # validateBody, errorHandler, upload (multer)
  schemas/             # Joi schemas
  helpers/             # HttpError, ctrlWrapper
  docs/swagger.json     # OpenAPI spec served at /api-docs
temp/                  # multer staging area (gitignored except .gitkeep)
public/photos/         # permanent bouquet photos, served at /public/photos/*
```

## Running locally

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL for your Postgres instance
npm run seed            # creates tables and seeds the initial bouquets
npm run dev              # starts the server with nodemon
```

The API is served at `http://localhost:3000/api`, Swagger UI at `http://localhost:3000/api-docs`.

## Environment variables

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on (default 3000) |
| `DATABASE_URL` | Full Postgres connection string |
| `DB_SSL` | Set to `false` to disable SSL (needed for some local Postgres setups) |
| `BACKEND_URL` | Public base URL of this backend, used to build absolute `photoURL` values |
| `CORS_ORIGIN` | Comma-separated list of allowed origins |

## API

See `src/docs/swagger.json` or `/api-docs` for the full spec. Summary:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/bouquets` | List all bouquets |
| GET | `/api/bouquets/:id` | Get one bouquet |
| POST | `/api/bouquets` | Create a bouquet |
| PUT | `/api/bouquets/:id` | Update a bouquet |
| DELETE | `/api/bouquets/:id` | Delete a bouquet |
| PATCH | `/api/bouquets/:id/favorite` | Toggle favorite status |
| PATCH | `/api/bouquets/:id/photo` | Upload/replace a bouquet's photo (`multipart/form-data`, field `photo`) |
| POST | `/api/orders` | Create an order for a bouquet |

## Deploying to Render

1. Create a PostgreSQL instance on Render (or Neon/Supabase) and copy its connection string.
2. Create a new Web Service on Render pointing at this repo's `backend/` directory (Root Directory: `backend`).
3. Build command: `npm install`. Start command: `npm start`.
4. Set the environment variables above (`DATABASE_URL`, `BACKEND_URL` = the Render service's own public URL, `CORS_ORIGIN` = the deployed frontend's origin).
5. After the first deploy, run `npm run seed` once (via Render's shell) to create tables and seed initial data.
