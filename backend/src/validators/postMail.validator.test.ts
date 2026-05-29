import { describe, expect, it } from 'vitest';

import { validatePostMailRequestBody } from './postMail.validator.js';

const validRequestBody = {
  email: 'john@example.com',
  message: 'Testing a valid message.',
  name: 'John Doe',
  subject: 'Mail subject' 
};

describe('validatePostMailRequestBody', (): void => {
  it('accepts a valid request body', (): void => {
    const result = validatePostMailRequestBody(validRequestBody);
    expect(result).toEqual([]);
  });

  it('accepts omitted and empty optional subject values', (): void => {
    const { subject, ...bodyWithoutSubject } = validRequestBody;
    expect(validatePostMailRequestBody(bodyWithoutSubject)).toEqual([]);
    expect(validatePostMailRequestBody({ ...bodyWithoutSubject, subject: '' })).toEqual([]);
  });

  it('accepts values exactly at minimum length', (): void => {
    const result = validatePostMailRequestBody({
      email: 'a@b.com',
      message: '1234567890',
      name: 'Jo',
      subject: 'Hey'
    });

    expect(result).toEqual([]);
  });

  it('accepts values exactly at maximum length', (): void => {
    const result = validatePostMailRequestBody({
      email: `${'a'.repeat(242)}@test.com`,
      message: 'm'.repeat(2000),
      name: 'n'.repeat(80),
      subject: 's'.repeat(120)
    });

    expect(result).toEqual([]);
  });

  it('accepts padded values exactly at maximum length after trimming', (): void => {
    const result = validatePostMailRequestBody({
      email: ` ${'a'.repeat(242)}@test.com `,
      message: ` ${'m'.repeat(2000)} `,
      name: ` ${'n'.repeat(80)} `,
      subject: ` ${'s'.repeat(120)} `
    });

    expect(result).toEqual([]);
  });

  it('validates minimum length after trimming whitespace', (): void => {
    const result = validatePostMailRequestBody({
      email: ' john@example.com ',
      message: ' 123456789 ',
      name: ' J ',
      subject: ' Hi '
    });

    expect(result).toEqual([
      'Message must be at least 10 characters.',
      'Full Name must be at least 2 characters.',
      'Subject must be at least 3 characters.'
    ]);
  });

  it('rejects a non-object request body', (): void => {
    expect(validatePostMailRequestBody(null)).toEqual(['Request body must be an object.']);
    expect(validatePostMailRequestBody([])).toEqual(['Request body must be an object.']);
    expect(validatePostMailRequestBody('invalid')).toEqual(['Request body must be an object.']);
  });

  it('rejects missing required properties', (): void => {
    const result = validatePostMailRequestBody({ email: '', message: '', name: '', subject: '' });
    expect(result).toEqual(['Email is required.', 'Message is required.', 'Full Name is required.']);
  });

  it('rejects required properties containing only whitespace', (): void => {
    const result = validatePostMailRequestBody({ email: ' ', message: ' ', name: ' ', subject: ' ' });
    expect(result).toEqual(['Email is required.', 'Message is required.', 'Full Name is required.']);
  });

  it('rejects required properties shorter than the minimum length', (): void => {
    const result = validatePostMailRequestBody({
      email: 'a@b.c',
      message: 'Too short',
      name: 'J',
      subject: 'Hi'
    });

    expect(result).toEqual([
      'Email must be at least 7 characters.',
      'Message must be at least 10 characters.',
      'Full Name must be at least 2 characters.',
      'Subject must be at least 3 characters.'
    ]);
  });

  it('rejects properties longer than the maximum length', (): void => {
    const result = validatePostMailRequestBody({
      email: `${'a'.repeat(246)}@test.com`,
      message: 'm'.repeat(2001),
      name: 'n'.repeat(81),
      subject: 's'.repeat(121)
    });

    expect(result).toEqual([
      'Email must be 254 characters or less.',
      'Message must be 2000 characters or less.',
      'Full Name must be 80 characters or less.',
      'Subject must be 120 characters or less.'
    ]);
  });

  it('rejects non-string properties', (): void => {
    const result = validatePostMailRequestBody({ email: 123, message: true, name: {}, subject: null });

    expect(result).toEqual([
      'Email must be of type string.', 
      'Message must be of type string.', 
      'Full Name must be of type string.', 
      'Subject must be of type string.'
    ]);
  });

  it('rejects invalid email format', (): void => {
    const result = validatePostMailRequestBody({  
      email: 'purposefully-wrong-email',
      message: 'Testing a valid message.',
      name: 'John Doe',
      subject: 'Mail subject' 
    });

    expect(result).toEqual(['Email must use a valid format.']);
  });

  it('ignores unknown properties', (): void => {
    const result = validatePostMailRequestBody({ ...validRequestBody, extra: 'ignored' });
    expect(result).toEqual([]);
  });
});
