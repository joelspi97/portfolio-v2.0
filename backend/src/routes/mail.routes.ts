import { Router, type Request, type Response } from 'express';

import { Resend } from 'resend';

import type { IPostMailRequestDto, IPostMailErrorResponseDto } from '../models/postMail.dto.js';

export const mailRouter: Router = Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const requiredFields: Array<keyof Pick<IPostMailRequestDto, 'email' | 'message' | 'name'>> = ['email', 'message', 'name'];

type validationDefinition = { label: string; maxLength: number; minLength: number; };
const fieldValidations: Record<keyof IPostMailRequestDto, validationDefinition> = {
  email: { label: 'Email', maxLength: 254, minLength: 7 },
  message: { label: 'Message', maxLength: 2000, minLength: 10 },
  name: { label: 'Full Name', maxLength: 80, minLength: 2 },
  subject: { label: 'Subject', maxLength: 120, minLength: 3 }
};

function isNonEmptyString(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

mailRouter.post('/', (
  request: Request<{}, {}, IPostMailRequestDto>, 
  response: Response<IPostMailErrorResponseDto>
): void => {
  if (
    typeof request.body !== 'object' ||
    request.body === null ||
    Array.isArray(request.body)
  ) {
    response.status(400).json({ errors: ['Request body must be an object.'] });
    return;
  }

  const body = request.body;
  const { email, message, name, subject } = body;

  const errorMessages = requiredFields.reduce<string[]>((accumulator, key) => {
    const value = body[key];
    const validation = fieldValidations[key];
    const trimmedValue = typeof value === 'string' ? value.trim() : '';

    if (!isNonEmptyString(value)) {
      accumulator.push(`${validation.label} is required.`);

    } else if (trimmedValue.length < validation.minLength) {
      accumulator.push(`${validation.label} must be at least ${validation.minLength} characters.`);

    } else if (key === 'email' && !emailRegex.test(trimmedValue)) {
      accumulator.push('Email must use a valid format.');

    } else if (value.length > validation.maxLength) {
      accumulator.push(`${validation.label} must be ${validation.maxLength} characters or less.`);
    }

    return accumulator;
  }, []);

  if (subject !== undefined && subject !== null) {
    const validation = fieldValidations.subject;

    if (typeof subject !== 'string') {
      errorMessages.push("Field 'subject' must be of type string.");

    } else if (subject.trim()) {
      if (subject.trim().length < validation.minLength) {
        errorMessages.push(`${validation.label} must be at least ${validation.minLength} characters.`);

      } else if (subject.length > validation.maxLength) {
        errorMessages.push(`${validation.label} must be ${validation.maxLength} characters or less.`);
      }
    }
  }

  if (errorMessages.length) {
    response.status(400).json({ errors: errorMessages });
    return;
  }

  const emailSubject = typeof subject === 'string' && subject.trim() ? subject.trim() : name;
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

  response.sendStatus(204);
});
