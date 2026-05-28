import { Resend } from 'resend';

import type { IPostMailRequestDto } from '../models/postMail.dto.js';

export function sendContactEmail({ email, message, name, subject }: IPostMailRequestDto): void {
  const emailSubject = (typeof subject === 'string' && subject.trim()) ? subject.trim() : name;
  const resend = new Resend(process.env.RESEND_API_KEY);

  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'joelspi97@gmail.com',
    subject: `Message from portfolio - ${emailSubject}`,
    html: `<p>
      <strong>Sender name</strong>: ${name}
      <br />
      <strong>Sender email</strong>: ${email}
      <br />
      <strong>Message</strong>: ${message}
    </p>`
  });
}
