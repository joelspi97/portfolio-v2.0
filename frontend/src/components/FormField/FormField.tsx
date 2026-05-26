import './form-field.scss';

import type { ChangeEvent as ReactChangeEvent, ReactElement } from 'react';

export type FormFieldProps<FieldId extends string> = {
  autoComplete?: string;
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
  const { autoComplete, error, id, label, maxLength, minLength, onChange, placeholder = '', readOnly,
          required, type, value } = props;
  
  const counterId = `${id}-character-count`;
  const errorId = `${id}-error`;
  const inputClassName = `form-field__input${error ? ' form-field__input--error' : ''}`;

  return (
    <div className='form-field'>
      <label className='form-field__label' htmlFor={id}>
        {label}
        {required && <span aria-hidden='true' className='form-field__required-mark'> *</span>}
      </label>
    
      {type === 'textarea'
        ? <div className='form-field__textarea-field'>
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

            <span className='form-field__character-count' id={counterId}>
              {value.length} / {maxLength}
            </span>
          </div>
        : <input
            autoComplete={autoComplete}
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

      {error && <span className='form-field__error' id={errorId}>{error}</span>}
    </div>
  );
}
