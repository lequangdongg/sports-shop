import { classField, labelField } from '@/app/helpers/class-form';
import { FormFieldProps } from '@/lib/types';
import React from 'react';

const Input: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  register,
  errors,
  rules = {},
}) => {
  return (
    <div>
      <label htmlFor="first_name" className={labelField(errors, name)}>
        {label}
      </label>
      <input
        type={type}
        id="first_name"
        placeholder="Vui lòng nhập"
        className={classField(errors, name)}
        {...register(name, {
          required: true,
          ...rules,
        })}
      />
    </div>
  );
};

export default Input;
