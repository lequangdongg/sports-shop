import React from 'react';
import { FormFieldProps } from '@/lib/types';
import { classField, labelField } from '@/app/helpers/class-form';

const TextArea: React.FC<FormFieldProps> = ({
  label,
  name,
  register,
  errors,
  rules = {},
}) => {
  return (
    <div>
      <label htmlFor="message" className={labelField(errors, name)}>
        {label}
      </label>
      <textarea
        id="message"
        rows={4}
        className={classField(errors, name)}
        {...register(name, {
          ...rules,
        })}
      />
    </div>
  );
};

export default TextArea;
