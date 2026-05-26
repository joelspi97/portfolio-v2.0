import type { FormFieldProps } from '../FormField/FormField';

export type FieldId = 'body' | 'email' | 'name' | 'subject';
export type ContactFieldProps = FormFieldProps<FieldId>;
export type FormFieldConfig = Omit<
  ContactFieldProps,
  'error' | 'id' | 'onChange' | 'readOnly' | 'value'
>;
export type FormValueMap = Record<FieldId, { error: string | null; value: string }>;
export type SubmitStatus = { 
  loading: boolean; 
  message: string | null; 
  type: 'error' | 'success' | null; 
};

export const fields: Record<FieldId, FormFieldConfig> = {
  name: {
    autoComplete: 'name',
    label: 'Full Name',
    maxLength: 80,
    minLength: 2,
    placeholder: 'e.g. John Doe',
    required: true,
    type: 'text'
  },
  email: {
    autoComplete: 'email',
    label: 'Email',
    maxLength: 254,
    minLength: 7,
    placeholder: 'example@email.com',
    required: true,
    type: 'email'
  },
  subject: {
    autoComplete: 'on',
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
