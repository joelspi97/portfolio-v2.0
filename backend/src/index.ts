import dotenv from 'dotenv';

import { createApp } from './app.js';

const isNotProduction = process.env.NODE_ENV !== 'production';

if (isNotProduction) dotenv.config();

const REQUIRED_ENV_VARS = ['ALLOWED_ORIGIN', 'RESEND_API_KEY', 'RESEND_FROM_EMAIL', 'RESEND_TO_EMAIL'] as const;
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
const app = createApp({ allowedOrigin: env.ALLOWED_ORIGIN, isNotProduction, port: Number(PORT) });
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (isNotProduction) console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
