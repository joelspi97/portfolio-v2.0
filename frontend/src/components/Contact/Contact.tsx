import './contact.scss';

import { 
  useEffect,
  useRef,
  useState, 
  type SubmitEvent as ReactSubmitEvent, 
  type ReactElement 
} from 'react';

import { useReducedMotion } from 'framer-motion';

import { sendContactMessage, type ContactMessagePayload } from '../../services/contactService/contactService';
import {
  fields,
  type FieldId,
  type FormFieldConfig,
  type FormValueMap,
  type SubmitStatus
} from './Contact.types';

import { AnimatedDiv } from '../reusable/AnimatedDiv';
import { FormField } from '../FormField/FormField';

function createDefaultFormValues(): FormValueMap {
  return {
    email: { error: null, value: '' },
    message: { error: null, value: '' },
    name: { error: null, value: '' },
    subject: { error: null, value: '' }
  };
}

function createDefaultSubmitStatus(): SubmitStatus {
  return { loading: false, message: null, type: null };
}

function validateFormField(id: FieldId, value: string): string | null {
  const { label, maxLength, minLength, required } = fields[id];
  const trimmedValue = value.trim();

  if (!trimmedValue) return required ? `${label} is required.` : null;
  if (trimmedValue.length < minLength) return `${label} must be at least ${minLength} characters.`;
  if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
    return 'Email must use a valid format.';
  }

  if (value.length > maxLength) return `${label} must be ${maxLength} characters or less.`;
  return null;
}

export function Contact(): ReactElement {
  const [formValues, setFormValues] = useState<FormValueMap>(createDefaultFormValues);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(createDefaultSubmitStatus);

  const hasVisibleErrors = Object.values(formValues).some(({ error }): boolean => Boolean(error));
  const invalidFieldFocusId = useRef<FieldId | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const statusMessage = submitStatus.loading ? 'Sending message.' : submitStatus.message ?? '';

  useEffect(() => {
    if (!invalidFieldFocusId.current) return;
    document.getElementById(invalidFieldFocusId.current)?.focus();
    invalidFieldFocusId.current = null;
  }, [formValues]);

  function createValidatedFormValues(): FormValueMap {
    return (Object.entries(formValues) as [FieldId, FormValueMap[FieldId]][]).reduce<FormValueMap>(
      (validatedValues, [id, fieldValue]) => {
        validatedValues[id] = {
          error: validateFormField(id, fieldValue.value),
          value: fieldValue.value
        };
        return validatedValues;
      },
      createDefaultFormValues()
    );
  }

  function getFirstInvalidFieldId(validatedFormValues: FormValueMap): FieldId | null {
    const invalidFieldEntry = (Object.entries(validatedFormValues) as [FieldId, FormValueMap[FieldId]][])
      .find(([, fieldValue]): boolean => Boolean(fieldValue.error));

    return invalidFieldEntry?.[0] ?? null;
  }

  async function submitMessage(event: ReactSubmitEvent<HTMLFormElement>): Promise<void> { 
    event.preventDefault();
    
    if (submitStatus.loading) return;

    const validatedFormValues = createValidatedFormValues();
    const firstInvalidFieldId = getFirstInvalidFieldId(validatedFormValues);

    if (firstInvalidFieldId) {
      invalidFieldFocusId.current = firstInvalidFieldId;
      setFormValues(validatedFormValues);
      return;
    }
    
    setSubmitStatus({ loading: true, message: null, type: null });

    try {
      const payload: ContactMessagePayload = {
        email: formValues.email.value,
        message: formValues.message.value,
        name: formValues.name.value,
        subject: formValues.subject.value
      };

      await sendContactMessage(payload);

      setFormValues(createDefaultFormValues());
      setSubmitStatus({ 
        loading: false, 
        message: 'Your message has been delivered successfully!', 
        type: 'success' 
      });

    } catch (error: unknown) {
      setSubmitStatus({
        loading: false, 
        message: error instanceof Error ? (error as Error).message : 'Something went wrong.', 
        type: 'error' 
      });
    }
  }

  function updateFormValues(id: FieldId, value: string): void {
    const error: string | null = validateFormField(id, value);

    if (submitStatus.message) {
      setSubmitStatus(createDefaultSubmitStatus());
    }

    setFormValues(prevValue => ({ ...prevValue, [id]: { error, value } }));
  }

  function dismissSubmitStatus(): void {
    setSubmitStatus(createDefaultSubmitStatus());
  }

  return (
    <section className='contact section' id='contact'>
      <div className='section-decoration' />
      <div className='section-decoration section-decoration--left' />
      <div className='section-decoration section-decoration--right' />

      <AnimatedDiv className='contact__heading'>
        <h2 className='section-heading'>Get in touch!</h2>
        <p>Send a short note about the product, team, or problem you want help with.</p>
      </AnimatedDiv>

      <AnimatedDiv className='contact__form-wrapper'>
        <form className='contact-form' noValidate onSubmit={event => submitMessage(event)}>
          <p className='contact-form__required-note'>
            Fields marked with an asterisk (
            <span aria-hidden='true' className='contact-form__required-mark'>*</span>
            ) are required.
          </p>

          <p aria-atomic='true' aria-live='polite' className='sr-only' role='status'>
            {statusMessage}
          </p>

          {(Object.entries(fields) as [FieldId, FormFieldConfig][]).map(
            ([id, field]): ReactElement => (
              <FormField 
                autoComplete={field.autoComplete}
                error={formValues[id].error}
                id={id} 
                key={id}
                label={field.label}
                maxLength={field.maxLength}
                minLength={field.minLength}
                onChange={event => updateFormValues(id, event.target.value)} 
                placeholder={field.placeholder}
                readOnly={submitStatus.loading} 
                required={field.required}
                type={field.type}
                value={formValues[id].value}
              />
            )
          )}

          {submitStatus.message && (
            <div className={`contact-form__state-msg contact-form__state-msg--${submitStatus.type}`}>
              <span>{submitStatus.message}</span>
              
              <button
                aria-label='Dismiss message.'
                className='contact-form__dismiss-btn'
                onClick={dismissSubmitStatus}
                type='button'
              >
                <span aria-hidden='true' className='contact-form__dismiss-icon'></span>
              </button>
            </div> 
          )}
          
          {submitStatus.loading && (
            shouldReduceMotion
              ? <p aria-hidden='true' className='contact-form__loading-message'>
                  Sending message...
                </p>
              : <div aria-hidden='true' className='contact-form__loading-spinner'></div>
          )}

          <button 
            className='portfolio-btn' 
            disabled={submitStatus.loading || hasVisibleErrors} 
            type='submit'
          >
            Send message
          </button>
        </form>
      </AnimatedDiv>
    </section>
  );
}
