import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Express } from 'express';
import swaggerUi from 'swagger-ui-express';

import { createSwaggerSpec } from './utilities/createSwaggerSpec.js';

import { mailRouter } from './routes/mail.routes.js';

const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment) dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Express = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());
app.use('/mail', mailRouter);

if (isDevelopment) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(createSwaggerSpec(Number(PORT))));
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (isDevelopment) console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
