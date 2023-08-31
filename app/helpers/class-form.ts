import classNames from 'classnames';
import type { FieldErrors, FieldValues } from 'react-hook-form';

export const classField = (
  errors: FieldErrors<FieldValues>,
  name: string,
): string =>
  classNames(
    'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    {
      'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400':
        !!errors?.[name],
    },
  );

export const labelField = (
  errors: FieldErrors<FieldValues>,
  name: string,
): string =>
  classNames('block mb-2 text-sm font-medium text-gray-900 dark:text-white', {
    'text-red-700 dark:text-red-500': !!errors?.[name],
  });
