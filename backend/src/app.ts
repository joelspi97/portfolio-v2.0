import cors from 'cors';
import express, { type ErrorRequestHandler, type Express } from 'express';
import swaggerUi from 'swagger-ui-express';

import { mailRouter } from './routes/mail.routes.js';
import { createSwaggerSpec } from './utilities/createSwaggerSpec.js';

type CreateAppOptions = {
  allowedOrigin: string;
  isNotProduction: boolean;
  port: number;
};

export function createApp({ allowedOrigin, isNotProduction, port }: CreateAppOptions): Express {
  const app: Express = express();
  app.use(cors({ origin: allowedOrigin }));
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
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(createSwaggerSpec(port)));
  }

  return app;
}
