import '../scss/components/contact-form.scss';

import { 
  useEffect,
  useRef,
  useState, 
  type ChangeEvent as ReactChangeEvent, 
  type SubmitEvent as ReactSubmitEvent, 
  type ReactElement 
} from 'react';

enum FieldIds {
  Body = 'body',
  Email  = 'email',
  Name = 'name',
  Subject = 'subject',
}

interface IFormFieldProps {
  error: string | null;
  id: FieldIds;
  label: string;
  onChange: (value: ReactChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  readOnly: boolean;
  type: 'email' | 'text' | 'textarea';
  value: string;
}

type FormFieldConfig = Omit<IFormFieldProps, 'error' | 'onChange' | 'readOnly' | 'value'>;
type FormValueMap = Record<string, { error: string | null; value: string }>;
type SubmitStatus = { 
  loading: boolean; 
  message: string | null; 
  type: 'error' | 'success' | null; 
};

const fields: FormFieldConfig[] = [
  { id: FieldIds.Name, label: 'Full Name', placeholder: 'e.g. Jhon Doe', type: 'text' },
  { id: FieldIds.Email, label: 'Email', placeholder: 'example@email.com', type: 'email' },
  { id: FieldIds.Subject, label: 'Subject', type: 'text' },
  { id: FieldIds.Body, label: 'Message', type: 'textarea' }
];

function createDefaultFormValues(): FormValueMap {
  return fields.reduce<FormValueMap>((formValues, field) => {
    formValues[field.id] = { error: null, value: '' };
    return formValues;
  }, {});
}

function createDefaultSubmitStatus(): SubmitStatus {
  return { loading: false, message: null, type: null };
}

function FormField(props: IFormFieldProps): ReactElement {
  const { error, id, label, onChange, placeholder = '', readOnly, type, value } = props;

  return (
    <>
      <label htmlFor={id}>{label}</label>
    
      {type === 'textarea'
        ? <textarea
            className='contact-form__input'
            id={id}
            name={id}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            required
            rows={9}
            value={value}
          />
        : <input
            className='contact-form__input'
            id={id}
            name={id}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            required
            type={type}
            value={value}
          />
      }

      {error && <span>{error}</span>}
    </>
  );
}

export function ContactForm(): ReactElement {
  const [formValues, setFormValues] = useState<FormValueMap>(createDefaultFormValues);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(createDefaultSubmitStatus);

  const statusResetTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return clearStatusResetTimeout;
  }, []);

  function clearStatusResetTimeout(): void {
    if (!statusResetTimeoutId.current) return;
    clearTimeout(statusResetTimeoutId.current);
    statusResetTimeoutId.current = null;
  }
  
  function scheduleStatusReset(): void {
    clearStatusResetTimeout();
  
    statusResetTimeoutId.current = setTimeout(() => {
      setSubmitStatus(createDefaultSubmitStatus());
      statusResetTimeoutId.current = null;
    }, 10000);
  }

  async function submitMessage(event: ReactSubmitEvent<HTMLFormElement>): Promise<void> { 
    event.preventDefault();
    
    if (submitStatus.loading) return;
    
    setSubmitStatus({ loading: true, message: null, type: null });

    try {
      const payload = Object
        .keys(formValues)
        .reduce<Record<string, string>>((formattedFormValues, formValueKey) => {
          formattedFormValues[formValueKey] = formValues[formValueKey].value;
          return formattedFormValues;
        }, {});

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

  function updateFormValues(id: FieldIds, value: string): void {

    switch(id) {
      
    }

    setFormValues(prevValue => ({ ...prevValue, [id]: { ...prevValue[id], value } }));
  }

  return (
    <form className='contact-form' onSubmit={event => submitMessage(event)}>
      {fields.map(({ id, label, placeholder, type }): ReactElement => (
        <FormField
          error={formValues[id].error}
          id={id} 
          key={id}
          label={label}
          onChange={event => updateFormValues(id, event.target.value)} 
          placeholder={placeholder}
          readOnly={submitStatus.loading} 
          type={type}
          value={formValues[id].value}
        />
      ))}

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
        disabled={submitStatus.loading} 
        type='submit'
      >
        Send message
      </button>
    </form>
  );
}
