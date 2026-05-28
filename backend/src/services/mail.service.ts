import { Resend } from 'resend';

import type { IPostMailRequestDto } from '../models/postMail.dto.js';

let resend: Resend | null = null;

function getResendClient(): Resend {
  resend ??= new Resend(process.env.RESEND_API_KEY);
  return resend;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function sendContactEmail({ email, message, name, subject }: IPostMailRequestDto): Promise<void> {
  const emailSubject = (typeof subject === 'string' && subject.trim()) ? subject.trim() : name;

  const result = await getResendClient().emails.send({
    from: 'onboarding@resend.dev',
    to: 'joelspi97@gmail.com',
    subject: `Message from portfolio - ${emailSubject}`,
    html: `<p>
      <strong>Sender name</strong>: ${escapeHtml(name)}
      <br />
      <strong>Sender email</strong>: ${escapeHtml(email)}
      <br />
      <strong>Message</strong>: ${escapeHtml(message)}
    </p>`
  });

  if (result.error) {
    throw new Error(result.error.message);
  }
}
