import express, { type Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { sendContactEmail } from '../services/mail.service.js';
import { mailRouter } from './mail.routes.js';

vi.mock(import('../services/mail.service.js'), () => ({
  sendContactEmail: vi.fn()
}));

const sendContactEmailMock = vi.mocked(sendContactEmail);

const validRequestBody = {
  email: 'john@example.com',
  message: 'Testing a valid message.',
  name: 'John Doe',
  subject: 'Mail subject'
};

function createTestApp(): Express {
  const app = express();
  app.use(express.json());
  app.use('/mail', mailRouter);
  return app;
}

describe('mailRouter', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  it('returns validation errors for an invalid request body', async (): Promise<void> => {
    const response = await request(createTestApp())
      .post('/mail')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: ['Email is required.', 'Message is required.', 'Full Name is required.']
    });
    expect(sendContactEmailMock).not.toHaveBeenCalled();
  });

  it('sends a contact email for a valid request body', async (): Promise<void> => {
    sendContactEmailMock.mockResolvedValueOnce();

    const response = await request(createTestApp())
      .post('/mail')
      .send(validRequestBody);

    expect(response.status).toBe(204);
    expect(sendContactEmailMock).toHaveBeenCalledWith(validRequestBody);
  });

  it('returns a generic error when sending the contact email fails', async (): Promise<void> => {
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation((): void => {});
    sendContactEmailMock.mockRejectedValueOnce(new Error('Internal provider error'));

    const response = await request(createTestApp())
      .post('/mail')
      .send(validRequestBody);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ errors: ['Unable to send message. Please try again later.'] });
    expect(response.text).not.toContain('Internal provider error');
    consoleErrorMock.mockRestore();
  });
});
