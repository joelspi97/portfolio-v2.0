import { beforeEach, describe, expect, it, vi } from 'vitest';

const { resendConstructorMock, sendMock } = vi.hoisted(() => {
  const send = vi.fn();

  return {
    resendConstructorMock: vi.fn(function Resend() {
      return {
        emails: {
          send
        }
      };
    }),
    sendMock: send
  };
});

vi.mock(import('resend'), () => ({
  Resend: resendConstructorMock as unknown as typeof import('resend').Resend
}));

import { sendContactEmail } from './mail.service.js';

const validRequestBody = {
  email: 'john@example.com',
  message: 'Testing a valid message.',
  name: 'John Doe',
  subject: 'Mail subject'
};

describe('sendContactEmail', (): void => {
  beforeEach((): void => {
    vi.stubEnv('RESEND_FROM_EMAIL', 'portfolio@example.com');
    vi.stubEnv('RESEND_TO_EMAIL', 'owner@example.com');
    resendConstructorMock.mockClear();
    sendMock.mockReset();
    sendMock.mockResolvedValue({ error: null });
  });

  it('sends the expected contact email payload', async (): Promise<void> => {
    await sendContactEmail(validRequestBody);

    expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
      from: 'portfolio@example.com',
      html: expect.stringContaining('<strong>Sender name</strong>: John Doe'),
      subject: 'Message from portfolio - Mail subject',
      to: 'owner@example.com'
    }));
    expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
      html: expect.stringContaining('<strong>Sender email</strong>: john@example.com')
    }));
    expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
      html: expect.stringContaining('<strong>Message</strong>: Testing a valid message.')
    }));
  });

  it('uses the sender name as the subject fallback', async (): Promise<void> => {
    await sendContactEmail({ ...validRequestBody, subject: ' ' });

    expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
      subject: 'Message from portfolio - John Doe'
    }));
  });

  it('escapes HTML in sender fields', async (): Promise<void> => {
    await sendContactEmail({
      email: 'john&jane@example.com',
      message: `<b>"Hello" & 'bye'</b>`,
      name: '<John & "Jane">',
      subject: 'Mail subject'
    });

    expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
      html: expect.stringContaining('&lt;John &amp; &quot;Jane&quot;&gt;')
    }));
    expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
      html: expect.stringContaining('john&amp;jane@example.com')
    }));
    expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
      html: expect.stringContaining('&lt;b&gt;&quot;Hello&quot; &amp; &#39;bye&#39;&lt;/b&gt;')
    }));
  });

  it('throws when the email provider returns an error', async (): Promise<void> => {
    sendMock.mockResolvedValueOnce({ error: { message: 'Provider failed' } });
    await expect(sendContactEmail(validRequestBody)).rejects.toThrow('Provider failed');
  });
});
