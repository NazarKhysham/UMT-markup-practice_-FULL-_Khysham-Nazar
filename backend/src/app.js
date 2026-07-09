import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';

import bouquetsRouter from './routes/bouquetsRouter.js';
import ordersRouter from './routes/ordersRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import HttpError from './helpers/HttpError.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export const app = express();

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
  }),
);
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '../public')));

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'docs/swagger.json'), 'utf-8'),
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/bouquets', bouquetsRouter);
app.use('/api/orders', ordersRouter);

app.use((req, res, next) => {
  next(new HttpError(404, 'Route not found'));
});

app.use(errorHandler);
