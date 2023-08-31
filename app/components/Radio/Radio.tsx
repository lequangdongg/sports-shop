import { FormFieldProps } from '@/lib/types';
import React from 'react';

const Radio: React.FC<FormFieldProps> = ({ name, register, errors }) => {
  return (
    <div className="flex items-center">
      <input
        id="default-radio-2"
        type="radio"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        {...register(name)}
      />
      <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Checked state
      </label>
    </div>
  );
};

export default Radio;
