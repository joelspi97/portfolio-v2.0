import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import { Contact } from './Contact';
import type { ContactMessagePayload } from '../../services/contactService/contactService';

type SendContactMessage = (payload: ContactMessagePayload) => Promise<void>;

const { sendContactMessageMock } = vi.hoisted((): { sendContactMessageMock: ReturnType<typeof vi.fn<SendContactMessage>> } => ({
  sendContactMessageMock: vi.fn<SendContactMessage>()
}));

vi.mock(import('../../services/contactService/contactService'), () => ({
  sendContactMessage: sendContactMessageMock
}));

const validMessage: ContactMessagePayload = {
  email: 'john@example.com',
  message: 'This is a valid message.',
  name: 'John Doe',
  subject: 'Portfolio'
};

async function fillValidForm(user: ReturnType<typeof userEvent.setup>): Promise<void> {
  await user.type(screen.getByLabelText(/full name/i), validMessage.name);
  await user.type(screen.getByLabelText(/email/i), validMessage.email);
  await user.type(screen.getByLabelText(/subject/i), validMessage.subject);
  await user.type(screen.getByLabelText(/message/i), validMessage.message);
}

describe('Contact.tsx', (): void => {
  beforeEach((): void => {
    sendContactMessageMock.mockResolvedValue(undefined);
  });

  afterEach((): void => {
    vi.clearAllMocks();
  });

  it('renders all the fields', (): void => {
    render(<Contact />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  }); 

  it("shows field errors on empty submit and doesn't call the service", async (): Promise<void> => {
    const user = userEvent.setup();

    render(<Contact />);

    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/full name is required\./i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required\./i)).toBeInTheDocument();
    expect(await screen.findByText(/message is required\./i)).toBeInTheDocument();
    expect(sendContactMessageMock).not.toHaveBeenCalled();
  }); 

  it('shows an invalid email error and disables submit while errors are visible', async (): Promise<void> => {
    const user = userEvent.setup();

    render(<Contact />);

    await user.type(screen.getByLabelText(/email/i), 'invalid-email');

    expect(screen.getByText(/email must use a valid format\./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled();
    expect(sendContactMessageMock).not.toHaveBeenCalled();
  });

  it('calls the service with the form values on valid submit', async (): Promise<void> => {
    const user = userEvent.setup();

    render(<Contact />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor((): void => {
      expect(sendContactMessageMock).toHaveBeenCalledWith(validMessage);
    });
    expect(sendContactMessageMock).toHaveBeenCalledOnce();
  });

  it('clears fields and shows a success message after successful submit', async (): Promise<void> => {
    const user = userEvent.setup();

    render(<Contact />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(
      /your message has been delivered successfully!/i,
      { selector: '.contact-form__state-msg span' }
    )).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/subject/i)).toHaveValue('');
    expect(screen.getByLabelText(/message/i)).toHaveValue('');
  });

  it('shows the thrown error message after failed submit', async (): Promise<void> => {
    const user = userEvent.setup();
    sendContactMessageMock.mockRejectedValueOnce(new Error('Server is unavailable.'));

    render(<Contact />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(
      /server is unavailable\./i,
      { selector: '.contact-form__state-msg span' }
    )).toBeInTheDocument();
  });

  it('shows loading state and prevents duplicate submit while submitting', async (): Promise<void> => {
    const user = userEvent.setup();
    let resolveSubmit: () => void = (): void => {};
    sendContactMessageMock.mockReturnValueOnce(new Promise<void>(resolve => {
      resolveSubmit = resolve;
    }));

    render(<Contact />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/sending message\.\.\./i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(sendContactMessageMock).toHaveBeenCalledOnce();

    resolveSubmit();
    expect(await screen.findByText(
      /your message has been delivered successfully!/i,
      { selector: '.contact-form__state-msg span' }
    )).toBeInTheDocument();
  }); 
});
