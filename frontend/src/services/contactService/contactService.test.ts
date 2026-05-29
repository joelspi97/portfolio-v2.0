import { sendContactMessage, type ContactMessagePayload } from './contactService';

describe('sendContactMessage', (): void => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach((): void => {
    fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('VITE_SERVER_URL', 'https://api.example.com');
  });

  afterEach((): void => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  const payload: ContactMessagePayload = {
    email: 'test@example.com',
    message: 'Test message with at least 10 chars.',
    name: 'John Doe',
    subject: 'Portfolio'
  };

  it('uses the right request config', async (): Promise<void> => {
    await expect(sendContactMessage(payload)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/mail',
      {
        body: JSON.stringify(payload),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        method: 'POST'
      }
    );
  });
  
  it('throws joined backend errors when response is not ok', async (): Promise<void> => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      json: vi.fn().mockResolvedValue({ errors: ['Name is required.', 'Email is invalid.'] })
    });

    await expect(sendContactMessage(payload)).rejects.toThrow('Name is required. Email is invalid.');
  });

  it('throws fallback message when response is not ok and errors is empty', async (): Promise<void> => {
    fetchMock.mockResolvedValueOnce({ ok: false, json: vi.fn().mockResolvedValue({ errors: [] }) });
    await expect(sendContactMessage(payload)).rejects.toThrow('Something went wrong.');
  });

  it('throws fallback message when response is not ok and no errors exist', async (): Promise<void> => {
    fetchMock.mockResolvedValueOnce({ ok: false, json: vi.fn().mockResolvedValue({}) });
    await expect(sendContactMessage(payload)).rejects.toThrow('Something went wrong.');
  });

  it('throws fallback message when response is not ok and body cannot be parsed', async (): Promise<void> => {
    fetchMock.mockResolvedValueOnce({ ok: false, json: vi.fn().mockRejectedValue(new Error('Invalid JSON')) });
    await expect(sendContactMessage(payload)).rejects.toThrow('Something went wrong.');
  });
});
