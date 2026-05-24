import '../scss/components/contact-form.scss';

import { 
  useEffect,
  useRef,
  useState, 
  type ChangeEvent as ReactChangeEvent, 
  type SubmitEvent as ReactSubmitEvent, 
  type ReactElement 
} from 'react';

type FieldId = 'body' | 'email' | 'name' | 'subject';
type FormFieldProps = {
  error: string | null;
  id: FieldId;
  label: string;
  maxLength: number;
  minLength: number;
  onChange: (value: ReactChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  readOnly: boolean;
  required: boolean;
  type: 'email' | 'text' | 'textarea';
  value: string;
};
type FormFieldConfig = Omit<FormFieldProps, 'error' | 'id' | 'onChange' | 'readOnly' | 'value'>;
type FormValueMap = Record<FieldId, { error: string | null; value: string }>;
type SubmitStatus = { 
  loading: boolean; 
  message: string | null; 
  type: 'error' | 'success' | null; 
};

const fields: Record<FieldId, FormFieldConfig> = {  
  name: {
    label: 'Full Name',
    maxLength: 80,
    minLength: 2,
    placeholder: 'e.g. John Doe',
    required: true,
    type: 'text'
  },
  email: {
    label: 'Email',
    maxLength: 254,
    minLength: 7,
    placeholder: 'example@email.com',
    required: true,
    type: 'email'
  },
  subject: {
    label: 'Subject',
    maxLength: 120,
    minLength: 3,
    required: false,
    type: 'text'
  },
  body: {
    label: 'Message',
    maxLength: 2000,
    minLength: 10,
    required: true,
    type: 'textarea'
  }
};

function createDefaultFormValues(): FormValueMap {
  return {
    body: { error: null, value: '' },
    email: { error: null, value: '' },
    name: { error: null, value: '' },
    subject: { error: null, value: '' }
  };
}

function createDefaultSubmitStatus(): SubmitStatus {
  return { loading: false, message: null, type: null };
}

function FormField(props: FormFieldProps): ReactElement {
  const { error, id, label, maxLength, minLength, onChange, placeholder = '', readOnly, type,
          required, value } = props;
  const counterId = `${id}-character-count`;
  const inputClassName = `contact-form__input${error ? ' contact-form__input--error' : ''}`;

  return (
    <>
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden='true' className='contact-form__required-mark'> *</span>}
      </label>
    
      {type === 'textarea'
        ? <div className='contact-form__textarea-field'>
            <textarea
              aria-describedby={counterId}
              aria-invalid={Boolean(error)}
              className={inputClassName}
              id={id}
              minLength={minLength}
              name={id}
              onChange={onChange}
              placeholder={placeholder}
              readOnly={readOnly}
              required={required}
              rows={9}
              value={value}
            />

            <span className='contact-form__character-count' id={counterId}>
              {value.length} / {maxLength}
            </span>
          </div>
        : <input
            autoComplete='on'
            aria-invalid={Boolean(error)}
            className={inputClassName}
            id={id}
            minLength={minLength}
            name={id}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            required={required}
            type={type}
            value={value}
          />
      }

      {error && <span className='contact-form__error'>{error}</span>}
    </>
  );
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

export function ContactForm(): ReactElement {
  const [formValues, setFormValues] = useState<FormValueMap>(createDefaultFormValues);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(createDefaultSubmitStatus);

  const hasVisibleErrors = Object.values(formValues).some(({ error }): boolean => Boolean(error));
  const statusResetTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearStatusResetTimeout(): void {
    if (!statusResetTimeoutId.current) return;
    clearTimeout(statusResetTimeoutId.current);
    statusResetTimeoutId.current = null;
  }

  useEffect(() => {
    return clearStatusResetTimeout;
  }, []);
  
  function scheduleStatusReset(): void {
    clearStatusResetTimeout();
  
    statusResetTimeoutId.current = setTimeout((): void => {
      setSubmitStatus(createDefaultSubmitStatus());
      statusResetTimeoutId.current = null;
    }, 10000);
  }

  async function submitMessage(event: ReactSubmitEvent<HTMLFormElement>): Promise<void> { 
    event.preventDefault();
    
    if (submitStatus.loading) return;
    
    setSubmitStatus({ loading: true, message: null, type: null });

    try {
      const payload: Record<FieldId, string> = {
        body: formValues.body.value,
        email: formValues.email.value,
        name: formValues.name.value,
        subject: formValues.subject.value
      };

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/mail`, 
        {
          body: JSON.stringify(payload),
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          method: 'POST'
        }
      );
      const data = await response.json();

      if (response.ok) {
        setFormValues(createDefaultFormValues());
        setSubmitStatus({ 
          loading: false, 
          message: 'Your message has been delivered successfully!', 
          type: 'success' 
        });

      } else {
        setSubmitStatus({ loading: false, message: data.errorMessage, type: 'error' });
      }

    } catch (error) {
      setSubmitStatus({
        loading: false, 
        message: error instanceof Error ? error.message : 'Something went wrong.', 
        type: 'error' 
      });
    
    } finally {
      scheduleStatusReset();
    }
  }

  function updateFormValues(id: FieldId, value: string): void {
    const error: string | null = validateFormField(id, value);
    setFormValues(prevValue => ({ ...prevValue, [id]: { error, value } }));
  }

  return (
    <form className='contact-form' onSubmit={event => submitMessage(event)}>
      <p className='contact-form__required-note'>
        Fields marked with an asterisk (
        <span aria-hidden='true' className='contact-form__required-mark'>*</span>
        ) are required.
      </p>

      {(Object.entries(fields) as [FieldId, FormFieldConfig][]).map(
        ([id, field]): ReactElement => (
          <FormField 
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
        <div 
          aria-live='assertive' 
          className={`contact-form__state-msg contact-form__state-msg--${submitStatus.type}`}
        >
          {submitStatus.message}
        </div> 
      )}
      
      {submitStatus.loading && (
        <div aria-live='assertive' className='contact-form__loading-spinner'>
          <span className='sr-only'>Sending message.</span>
        </div>
      )}

      <button 
        className='portfolio-btn' 
        disabled={submitStatus.loading || hasVisibleErrors} 
        type='submit'
      >
        Send message
      </button>
    </form>
  );
}
