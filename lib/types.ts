import type {
  FieldErrors,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

export type FormFieldProps<T extends FieldValues = FormProducts> = {
  label?: string;
  type?: string;
  name: keyof T;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  rules?: RegisterOptions<T, FieldPath<T>>;
};

export type FormProducts = {
  title: string;
  slug: string;
  image: string;
  price: number;
  description: string;
  descriptionDetail: string;
  highlights?: string;
  sizes: string[];
  category: string[];
  isPublish: boolean;
};
