import { ChangeEvent } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

export type InputProps = {
  registeredName: string;
  label: string;
  placeholder?: string;
  type: string;
  unit?: string;
  value?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactElement;
};

const InputControl: React.FC<InputProps> = ({
  registeredName,
  label,
  placeholder,
  type,
  value,
  handleChange,
  children,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { name } = register(registeredName);

  return (
    <div>
      <label className='text-textGrayLight text-sm'>{label}</label>
      <input
        {...register(registeredName)}
        name={name}
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
      <div className='text-sm text-textBlack'>{children}</div>
      <ErrorMessage
        errors={errors}
        name={registeredName}
        render={({ message }) => (
          <p className='text-alert text-sm'>{message}</p>
        )}
      />
    </div>
  );
};

export default InputControl;
