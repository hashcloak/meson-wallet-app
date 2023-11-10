import React, { ChangeEvent } from 'react';

export type Props = {
  placeholder?: string;
  type: string;
  value?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = ({ placeholder, type, value, handleChange }) => {
  return (
    <>
      <input
        placeholder={placeholder}
        type={type}
        className='border border-borderGray text-base bg-bgWhite rounded-md px-4 py-2 text-textBlack w-full'
        onChange={
          handleChange
            ? (e: ChangeEvent<HTMLInputElement>) => handleChange(e)
            : undefined
        }
        value={value != null && value ? value : undefined}
      />
    </>
  );
};

export default Input;
