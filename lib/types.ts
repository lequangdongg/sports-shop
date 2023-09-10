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
  id?: string;
  title: string;
  slug: string;
  image: string;
  price: number;
  description: string;
  sizes: string[];
  category: string[];
  isPopular: boolean;
};

export type PaginationType = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  from: number;
  to: number;
};
