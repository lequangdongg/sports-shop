import type {
  FieldErrors,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

export type FormFieldProps = {
  label?: string;
  type?: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  rules?: RegisterOptions<FieldValues, FieldPath<FieldValues>>;
};
