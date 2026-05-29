import type { IPostMailRequestDto } from '../models/postMail.dto.js';

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type validationDefinition = {
  label: string;
  maxLength: number;
  minLength: number;
  required: boolean;
};

const fieldValidations: Record<keyof IPostMailRequestDto, validationDefinition> = {
  email: { label: 'Email', maxLength: 254, minLength: 7, required: true },
  message: { label: 'Message', maxLength: 2000, minLength: 10, required: true },
  name: { label: 'Full Name', maxLength: 80, minLength: 2, required: true },
  subject: { label: 'Subject', maxLength: 120, minLength: 3, required: false }
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function validatePostMailRequestBody(body: unknown): string[] {
  if (
    typeof body !== 'object' ||
    body === null ||
    Array.isArray(body)
  ) {
    return ['Request body must be an object.'];
  }

  return (Object.keys(fieldValidations) as Array<keyof IPostMailRequestDto>).reduce<string[]>((accumulator, key) => {
    const requestBody = body as Partial<Record<keyof IPostMailRequestDto, unknown>>;
    const value = requestBody[key];
    const validation = fieldValidations[key];
    const trimmedValue = typeof value === 'string' ? value.trim() : '';

    if (value !== undefined && typeof value !== 'string') {
      accumulator.push(`${validation.label} must be of type string.`);

    } else if (!isNonEmptyString(value)) {
      if (validation.required) accumulator.push(`${validation.label} is required.`);

    } else if (trimmedValue.length < validation.minLength) {
      accumulator.push(`${validation.label} must be at least ${validation.minLength} characters.`);

    } else if (key === 'email' && !emailRegex.test(trimmedValue)) {
      accumulator.push('Email must use a valid format.');

    } else if (value.length > validation.maxLength) {
      accumulator.push(`${validation.label} must be ${validation.maxLength} characters or less.`);
    }

    return accumulator;
  }, []);
}
