import { classField, labelField } from '@/app/helpers/class-form';
import { FormFieldProps } from '@/lib/types';
import React from 'react';

const Select: React.FC<FormFieldProps> = ({ label, name, register, errors }) => {
  return (
    <div>
      <label
        htmlFor="countries"
        className={labelField(errors, name)}>
        {label}
      </label>
      <select
        id="countries"
        multiple
        className={classField(errors, name)}
        {...register(name, { required: 'asd' })}
      >
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
    </div>
  );
};

export default Select;
