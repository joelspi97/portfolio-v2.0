import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from './app.js';

const allowedOrigin = 'http://localhost:5173';

describe('createApp', (): void => {
  it('mounts the mail route', async (): Promise<void> => {
    const app = createApp({ allowedOrigin, isNotProduction: false, port: 3000 });

    const response = await request(app)
      .post('/mail')
      .send({});

    expect(response.status).toBe(400);
  });

  it('sets the configured CORS origin', async (): Promise<void> => {
    const app = createApp({ allowedOrigin, isNotProduction: false, port: 3000 });

    const response = await request(app)
      .post('/mail')
      .set('Origin', allowedOrigin)
      .send({});

    expect(response.headers['access-control-allow-origin']).toBe(allowedOrigin);
  });

  it('returns a 400 response for invalid JSON', async (): Promise<void> => {
    const app = createApp({ allowedOrigin, isNotProduction: false, port: 3000 });

    const response = await request(app)
      .post('/mail')
      .set('Content-Type', 'application/json')
      .send('{');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ errors: ['Invalid JSON body'] });
  });

  it('mounts API docs outside production', async (): Promise<void> => {
    const app = createApp({ allowedOrigin, isNotProduction: true, port: 3000 });

    const response = await request(app).get('/api-docs/');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });

  it('does not mount API docs in production', async (): Promise<void> => {
    const app = createApp({ allowedOrigin, isNotProduction: false, port: 3000 });

    const response = await request(app).get('/api-docs/');

    expect(response.status).toBe(404);
  });
});
