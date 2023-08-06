import React from 'react';
import { clsx } from 'clsx';

interface ITextInput {
  name: string;
  placeholder: string;
  type?: string;
  error?: string;
  register: any;
}

const Input: React.FC<ITextInput> = ({
  name,
  placeholder,
  type = 'text',
  error,
  register,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={clsx(
          'w-[90%] md:w-[calc(100vh-30rem)] py-2 px-4',
          'border-2 border-secondary-light-blue rounded',
          'appearance-none text-main-smoky-black leading-tight placeholder-secondary-light-blue',
          'focus:outline-none',
        )}
      />
      {error && <i className="text-main-error text-[16px]">{error}</i>}
    </div>
  );
};

export default Input;
