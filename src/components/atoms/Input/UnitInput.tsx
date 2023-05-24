import { ChangeEvent, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { InputProps } from './InputControl';

const UnitInput: React.FC<InputProps> = ({
  registeredName,
  label,
  placeholder,
  type,
  unit,
  children,
}) => {
  const [input, setInput] = useState<number>(0);

  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { name } = register(registeredName);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(Number(e.target.value));
    console.log(input);
  };

  return (
    <>
      <label className='text-textGrayLight text-sm'>{label}</label>
      <div className='block'>
        <input
          {...register(registeredName, {
            valueAsNumber: true,
          })}
          name={name}
          placeholder={placeholder}
          type={type}
          className='border border-borderGray text-base bg-bgWhite rounded-md px-4 py-2 text-textBlack w-full'
          onChange={(e) => handleInput(e)}
        />
        <span className='ml-[-4rem] text-textBlack'>{unit}</span>
      </div>

      <div className='text-sm text-textBlack'>{children}</div>
      <ErrorMessage
        errors={errors}
        name={registeredName}
        render={({ message }) => (
          <p className='text-warning text-sm'>{message}</p>
        )}
      />
    </>
  );
};

export default UnitInput;
