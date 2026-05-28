import { Router, type Request, type Response } from 'express';

import { Resend } from 'resend';

import type { IPostMailRequestDto, IPostMailErrorResponseDto } from '../models/postMail.dto.js';

export const mailRouter: Router = Router();

function isNonEmptyString(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

mailRouter.post('/', (
  request: Request<{}, {}, IPostMailRequestDto>, 
  response: Response<IPostMailErrorResponseDto>
): void => {
  if (
    typeof request.body !== 'object' ||
    Array.isArray(request.body)
  ) {
    response.status(400).json({ errors: ['Request body must be an object.'] });
    return;
  }

  const body = request.body;
  const { email, message, name, subject } = body;

  const errorMessages = (Object.keys(request.body) as Array<keyof IPostMailRequestDto>)
    .reduce<string[]>((accumulator, key) => {
      if (key === 'subject' && subject && typeof subject !== 'string') {
        accumulator.push("Field 'subject' must be of type string.");

      } else if (!isNonEmptyString(request.body[key])) {
        accumulator.push(`Field '${key}' must be of type string and have a value.`);
      }

      return accumulator;
    }, []);

  if (errorMessages.length) {
    response.status(400).json({ errors: errorMessages });
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'joelspi97@gmail.com',
    subject: `Message from portfolio - ${subject ?? name}`,
    html: `<p>
      <strong>Sender name</strong>: ${name}
      <br />
      <strong>Sender email</strong>: ${email}
      <br />
      <strong>Message</strong>: ${message}
    </p>`
  });

  response.sendStatus(204);
});
