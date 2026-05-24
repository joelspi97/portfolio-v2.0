import type { ChangeEvent as ReactChangeEvent, ReactElement } from 'react';

export type FormFieldProps<FieldId extends string> = {
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

export function FormField<FieldId extends string>(props: FormFieldProps<FieldId>): ReactElement {
  const { error, id, label, maxLength, minLength, onChange, placeholder = '', readOnly, type, required, 
          value } = props;
  
  const counterId = `${id}-character-count`;
  const errorId = `${id}-error`;
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
              aria-describedby={error ? `${counterId} ${errorId}` : counterId}
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
            aria-describedby={error ? errorId : undefined}
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

      {error && <span className='contact-form__error' id={errorId}>{error}</span>}
    </>
  );
}
