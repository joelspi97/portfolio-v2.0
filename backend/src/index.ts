import cors from 'cors';
import dotenv from 'dotenv';
import express, { type ErrorRequestHandler, type Express } from 'express';
import swaggerUi from 'swagger-ui-express';

import { createSwaggerSpec } from './utilities/createSwaggerSpec.js';

import { mailRouter } from './routes/mail.routes.js';

const isNotProduction = process.env.NODE_ENV !== 'production';

if (isNotProduction) dotenv.config();

const REQUIRED_ENV_VARS = ['ALLOWED_ORIGIN', 'RESEND_API_KEY'] as const;
type RequiredEnvVar = (typeof REQUIRED_ENV_VARS)[number];

function getRequiredEnv(): Record<RequiredEnvVar, string> {
  const missing = REQUIRED_ENV_VARS.filter((name) => !process.env[name]);

  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return REQUIRED_ENV_VARS.reduce<Record<RequiredEnvVar, string>>((environment, name) => {
    environment[name] = process.env[name] as string;
    return environment;
  }, {} as Record<RequiredEnvVar, string>);
}

const env = getRequiredEnv();
const PORT = process.env.PORT || 3000;

const app: Express = express();
app.use(cors({ origin: env.ALLOWED_ORIGIN }));
app.use(express.json());

const jsonErrorHandler: ErrorRequestHandler = (error, _request, response, next) => {
  if (error instanceof SyntaxError) {
    response.status(400).json({ errors: ['Invalid JSON body'] });
    return;
  }

  next(error);
};

app.use('/mail', mailRouter);
app.use(jsonErrorHandler);

if (isNotProduction) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(createSwaggerSpec(Number(PORT))));
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (isNotProduction) console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
